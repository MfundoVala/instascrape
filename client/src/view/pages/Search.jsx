import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../application/store";
import { getPostsByHashtag, scrapePostsByHashtag } from "../../application/api";
import { PostCard, HoverCard } from "../components";

function Search() {
  const store = useStateContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState("CapeTown");
  const [isScraping, setIsScraping] = useState(false);

  let items = useRef(null);
  let postsCount = useRef(0);

  useEffect(() => {
    getPostsByHashtag(query).then((res) => {
      console.log(res);
      items.current = res;
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    // trigger refresh  if items change
    console.log(isScraping);
    if (document.getElementById("refresh-icon") === null) return;
    if (isScraping === true) {
      document.getElementById("refresh-icon").classList.add("animate-spin");
      document.querySelectorAll(".insta-card").forEach((card) => {
        card.classList.add("animate-pulse");
      });
    } else {
      document.getElementById("refresh-icon").classList.remove("animate-spin");
      document.querySelectorAll(".insta-card").forEach((card) => {
        card.classList.remove("animate-pulse");
      });
    }
  }, [isScraping]);

  const handleShowPosts = (hashtag) => {
    setIsLoaded(false);
    getPostsByHashtag(hashtag).then((res) => {
      console.log(res);
      items.current = res;
      setIsLoaded(true);
    });
  };

  const handleScrape = (hashtag) => {
    setIsScraping(true);
    console.log("scraping");
    if (items.current.length < 1) {
      setIsLoaded(false);
    }
    scrapePostsByHashtag(hashtag).then((res) => {
      console.log(res);
      items.current = res;
      setIsLoaded(true);
      setIsScraping(false);
    });
  };

  return (
    <div>
      <>
        <div className="w-full flex flex-row items-center justify-center p-4">
          {/* <select class="block cursor-pointer appearance-none w-14 bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none focus:shadow-outline mr-4 mt-32">
            <option value="" disabled selected>
              Max Posts
            </option>
            <option value="option1">1</option>
            <option value="option2">2</option>
            <option value="option3">3</option>
          </select> */}

          <input
            className="w-full max-w-[500px] p-4 border-2 rounded-lg border-gray-200 shadow-md mt-32"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-primary-purple hover:bg-purple-dark text-white font-bold py-2 px-4 rounded-lg ml-4 mt-32"
            onClick={() => handleShowPosts(query)}
          >
            See Posts
          </button>
        </div>
        {isLoaded ? (
          <div className="flex flex-column">
            <div className="w-full items-center justify-center flex flex-col">
              <div className="flex flex-row justify-end md:w-[80%]">
                <div className="group flex">
                  <button
                    className="bg-transparent hover:bg-accent-purple  p-2 text-purple font-bold rounded-sm self-end"
                    onClick={() => handleScrape(query)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 25 25"
                      stroke="none"
                      fill="#714CF9"
                      className="scale-x-1"
                      id="refresh-icon"
                    >
                      <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
                    </svg>
                  </button>
                  <div className="relative z-10 top-full left-0 mt-2 bg-ttagz-yellow text-black p-2 rounded-full px-4 shadow-md opacity-0 group-hover:opacity-80 transition-opacity">
                    Scrape fresh posts
                  </div>
                </div>
              </div>

              <div className="md:w-[80%] flex-wrap gap-2 self-center items-start justify-start flex px-12">
                {items.current.length === 0 ? (
                  <div className="w-full items-center justify-center flex flex-col">
                    <div className="text-2xl font-bold text-center">
                      No posts found... <br />{" "}
                    </div>
                    <div className="text-md font-regular text-center">
                      Press the refresh button to scrape new posts or try
                      another hashtag.
                    </div>
                  </div>
                ) : (
                  items.current.map((item) => {
                    return (
                      <HoverCard
                        key={item.id}
                        username={item.owner_username}
                        imageUrl={
                          item.image_base64
                            ? item.image_base64
                            : item.image_standard_resolution_url
                        }
                        likes={item.likes_count}
                        comments={item.comments_count}
                        caption={item.caption}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full items-center justify-center flex">
            <div className="md:w-[80%] flex-wrap gap-2 self-center items-start justify-start flex p-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                return <HoverCard key={item} isLoading={true} />;
              })}
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Search;

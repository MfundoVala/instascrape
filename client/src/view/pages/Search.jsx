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
                    className="bg-transparent hover:bg-accent-purple  p-3 mb-2 text-purple font-bold rounded-full self-end"
                    onClick={() => handleScrape(query)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="#714CF9"
                      fill="#714CF9"
                      className="scale-x-1"
                      id="refresh-icon"
                    >
                      <path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z" />
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

import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../application/store";
import { getPostsByHashtag, scrapePostsByHashtag } from "../../application/api";
import { PostCard, HoverCard } from "../components";

function Search() {
  const store = useStateContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState("CapeTown");

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
    if (items.current !== null) {
      postsCount.current = items.current.length;
      document.getElementById(
        "post-count"
      ).innerHTML = `Posts count: ${postsCount.current}`;
    }
  }, [items.current]);

  const handleScrape = (hashtag) => {
    setIsLoaded(false);
    getPostsByHashtag(hashtag).then((res) => {
      console.log(res);
      items.current = res;
      setIsLoaded(true);
    });

    if (items.current.length === 0) {
      console.log("Scraping");
      setIsLoaded(false);
    }

    console.log(hashtag);
    scrapePostsByHashtag(hashtag).then((res) => {
      console.log(res);
      items.current = res;
      setIsLoaded(false);
      setIsLoaded(true);
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
            onClick={() => handleScrape(query)}
          >
            See Posts
          </button>
        </div>
        {isLoaded ? (
          <>
            <h1
              id="post-count"
              className="text-center text-4xl font-bold mt-12 mb-4"
            >
              Posts count: {postsCount.current}
            </h1>
            <div className="w-full items-center justify-center flex">
              <div className="md:w-[80%] flex-wrap gap-2 self-center items-start justify-start flex p-12">
                {items.current.map((item) => {
                  return (
                    // <PostCard
                    //   key={item.id}
                    //   username={item.owner_username}
                    //   imageUrl={
                    //     item.image_base64
                    //       ? item.image_base64
                    //       : item.image_standard_resolution_url
                    //   }
                    //   likes={item.likes_count}
                    //   comments={item.comments_count}
                    //   caption={item.caption}
                    // />
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
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex space-x-4 p-16">
            <div className="w-20 h-20 bg-gray-300 animate-pulse"></div>
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-gray-300 animate-pulse"></div>
              <div className="h-4 bg-gray-300 animate-pulse"></div>
              <div className="h-4 bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Search;

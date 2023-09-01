"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { data } from "autoprefixer";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {data.map((post) => {
        console.log("MILGIYAAAAAAA", post);

        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchProps = async () => {
      const response = await fetch("/api/prompt");
      console.log("RESPONSE api:::::::::::::::::", response);

      const data = await response.json();
      console.log("RESPONSE api:::::::::::::::::", data);

      setPost(data);
    };

    console.log("RESPONSE api::", post);

    fetchProps();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="rounded-lg w-full text-sm p-3 outline-none text-gray-500"
        />
      </form>

      <PromptCardList data={post} handleTagClick={{}} />
    </section>
  );
};

export default Feed;

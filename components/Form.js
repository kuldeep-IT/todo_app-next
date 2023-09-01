import Link from "next/link";
import React from "react";

export const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>
      <p className="desc">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered info.
      </p>

      <form
        className="flex glassmorphism max-w-full w-full p-3 mt-10 rounded-xl
        flex-col gap-7 mb-10
        "
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi text-gray-900 font-semibold ">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your text"
            required
            className="p-3 mt-2 max-w-full w-full rounded-lg outline-none h-[200px] text-gray-700"
          ></textarea>
        </label>

        <label>
          <span className="font-satoshi text-gray-900 font-semibold ">
            Tag
            <span className="font-normal">(#product, #tech)</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="p-3 mt-2 max-w-full w-full rounded-lg outline-none h-[40px] text-gray-700"
          ></input>
        </label>

        <div className="flex-end flex-row">
          <Link className="flex-end text-center  mx-3 mb-3" href={"/"}>
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full text-white font-medium bg-orange-400 mb-3 px-4 py-1.5"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

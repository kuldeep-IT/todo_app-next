"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  // const [all, setall] = useState(second);

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    // <div className="break-inside-avoid lg:flex-col flex-1 sm:flex p-3 md:w-[340px] bg-slate-100 rounded-lg h-fit">
    <div className="prompt_card">
      <div className="flex">
        <Image
          src={"./assets/icons/copy.svg"}
          width={40}
          height={40}
          alt={"copy"}
        />

        <div className="flex flex-start flex-col mx-3 ">
          <h3 className="text-black text-lg">{post.creator.username}</h3>
          <p className="text-gray-500 text-sm">{post.creator.email}</p>
        </div>

        <div className="flex-end mt-3 ml-10 " onClick={handleCopy}>
          <Image
            className="bg-gray-200 rounded-lg"
            src={
              copied === post.prompt
                ? "./assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={15}
            height={15}
            alt={"copy"}
          />
        </div>
      </div>

      <div className="flex flex-col my-4 min-[320px]:flex-col">
        <p className="text-sm text-gray-700 mb-2">{post.prompt}</p>
        <p
          className="cursor-pointer text-blue-600"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="flex gap-5 flex-center">
          <p className="cursor-pointer text-blue-700" onClick={handleEdit}>
            Edit
          </p>
          <p className="cursor-pointer text-red-700" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;

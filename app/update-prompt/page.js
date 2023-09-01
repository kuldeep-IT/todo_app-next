"use client";

import { Form } from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setsubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const editPrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error:::Create prompt::", error);
    } finally {
      setsubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default UpdatePrompt;

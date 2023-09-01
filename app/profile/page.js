"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  const handleDeleteData = async (post) => {
    const hasConfirmed = confirm(`Are you confirm to delete this post`);
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filterdPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filterdPosts);
      } catch (error) {}
    }
  };

  const handleEditData = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchUserData();
  }, []);

  return (
    <Profile
      name="My"
      desc="I'm Krushna"
      data={posts}
      handleEdit={handleEditData}
      handleDelete={handleDeleteData}
    />
  );
};

export default MyProfile;

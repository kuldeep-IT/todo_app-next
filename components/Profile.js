import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text  font-satoshi">
        <span className="blue_gradient text-left flex ">{name} Profile</span>
      </h1>
      <p className="mt-3 text-base text-gray-500">{desc}</p>

      <div className="mt-3">
        {data.map((post) => {
          console.log("MILGIYAAAAAAA PROFILE", post);

          return (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Profile;

"use client";
import React from "react";
import BlogCard from "./BlogCard";
import { useBlogs } from "@/hooks";
import Loading from "@/app/Loading";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center max-w-xl">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            key={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate="2nd Feb 2024"
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;

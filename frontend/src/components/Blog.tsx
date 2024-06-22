"use client";

import { Avatar } from "./BlogCard";

const Blog = ({
  blog,
}: {
  blog: {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
    };
  };
}) => {
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full pt-12 md:max-w-screen-xl gap-8 md:gap-24">
        <div className="md:col-span-8">
          <div className="text-3xl md:text-4xl font-extrabold">
            {blog.title}
          </div>
          <div className="text-slate-500 pt-2">Post on 2nd December 2023</div>
          <div className="pt-4">{blog.content}</div>
        </div>
        <div className="md:col-span-4">
          <div className="text-slate-500 text-lg">Author</div>
          <div className="flex w-full mt-1">
            <div className="pr-2 pt-1">
              <Avatar name={blog.author.name} size={6} />
            </div>
            <div>
              <div className="text-xl font-bold">{blog.author.name}</div>
              <div className="pt-2 text-slate-500">
                Founder of Cyber NOW Education | Husband & Father | Published
                Author | Instructor | Master Mason | 3D Printing & Modeling |
                Astrophotography
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

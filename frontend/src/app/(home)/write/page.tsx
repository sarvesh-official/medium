"use client";
import NavBar from "@/components/NavBar";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  return (
    <>
      <div className="flex justify-center flex-col items-center w-full px-2">
        <div className="max-w-screen-lg w-full pt-20">
          <TextEditor />
        </div>
      </div>
    </>
  );
};

export default page;

function TextEditor() {
  const [blog, setBlog] = useState({
    title: "Hi Hello",
    content:
      "My name is Scott Chow, and I am going to show you how to start blogging today. I have been building blogs and websites since 2002. In that time I have launched several of my own blogs, and helped hundreds of others do the same.",
  });
  const router = useRouter();
  return (
    <div>
      <div className="w-full border border-gray-200 rounded-lg bg-gray-50 ">
        {/* <div className="flex items-center justify-between px-3 py-2 border-b "> */}
        <div className="w-full active:bottom-0">
          <input
            type="text"
            onChange={(e) => {
              setBlog((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
            placeholder="Title"
            className="block w-full p-4 text-gray-900 border font-bold rounded-lg bg-gray-50 text-xl focus:ring-blue-500 focus:border-blue-500 "
          />
        </div>
        {/* </div> */}
        <div className="px-4 py-2 bg-white rounded-b-lg ">
          <textarea
            onChange={(e) => {
              setBlog((prev) => ({
                ...prev,
                content: e.target.value,
              }));
            }}
            rows={8}
            className="block w-full px-2 pt-1 text-md text-gray-800 bg-white border-0  focus:ring-0"
            placeholder="Write you content..."
            required
          ></textarea>
        </div>
      </div>
      <button
        onClick={() => {
          axios
            .post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title: blog.title,
                content: blog.content,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              router.push(`/blogs/${res.data.id}`);
            });
        }}
        type="submit"
        className="inline-flex mt-2 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-blue-200 "
      >
        Publish post
      </button>
    </div>
  );
}

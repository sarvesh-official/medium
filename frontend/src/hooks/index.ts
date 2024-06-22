"use client";

import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Blog {
  title: string;
  content: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const res = axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setBlog(res.data.id);
        setLoading(false);
      });
  }, []);

  return { blog, loading };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const res = axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      });
  }, []);
  return { loading, blogs };
};

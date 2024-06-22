"use client";
import Loading from "@/app/Loading";
import Blog from "@/components/Blog";
import NavBar from "@/components/NavBar";
import { useBlog } from "@/hooks";
import { useParams } from "next/navigation";

const page = () => {
  const params: {
    id: string;
  } = useParams();
  const { loading, blog } = useBlog(params.id);
  console.log(blog);
  if (loading) return <Loading />;
  if (!blog) return;
  return (
    <div>
      <NavBar />
      <Blog blog={blog} />
    </div>
  );
};

export default page;

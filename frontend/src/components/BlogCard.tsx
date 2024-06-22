import clsx from "clsx";
import Link from "next/link";

interface BlogCardProps {
  authorName: string;
  title: string;
  id: number;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link href={`/blogs/${id}`}>
      <div className="border-b border-slate-200 pb-4 p-4 min-w-min cursor-pointer hover:scale-105 hover:animate-pulse">
        <div className="flex gap-1">
          <div className="flex justify-center flex-col">
            <SmallAvatar name={authorName} />
          </div>
          <div className="font-light pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex items-center justify-center">
            <div className="h-1 w-1 bg-slate-500 rounded-full ml-2"></div>
          </div>
          <div className="pl-2 text-slate-800 flex justify-center flex-col text-sm font-extralight">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold mt-3 ml-1">{title}</div>
        <div className="text-md font-light ml-1   ">
          {content.slice(0, 100) + "..."}{" "}
        </div>
        <div className="w-full text-sm font-thin text-slate-500 ml-1">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export default BlogCard;

export function Avatar({ name, size = 6 }: { name: string; size?: number }) {
  return (
    <div
      className={
        "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-600 h-10 w-10"
      }
    >
      <span className="font-sm text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
export function SmallAvatar({
  name,
  size = 6,
}: {
  name: string;
  size?: number;
}) {
  return (
    <div
      className={
        "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-600 h-6 w-6"
      }
    >
      <span className="font-sm text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}

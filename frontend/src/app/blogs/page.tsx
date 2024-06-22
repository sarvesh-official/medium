import Blogs from "@/components/Blogs";
import NavBar from "@/components/NavBar";

const page = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-10">
        <Blogs />
      </div>
    </div>
  );
};

export default page;

"use client";
import Image from "next/image";
import { Avatar } from "./BlogCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";
import UserModal from "./UserModal";

export interface UserDetails {
  id: number;
  name: string;
  email: string;
}

const NavBar = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/user/userDetails`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setUserDetails(res.data.details);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        router.push("/signin");
      });
  }, [router]);

  if (!userDetails) {
    return null;
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="border-b pt-1 flex justify-between sticky top-0 z-10 bg-white px-1 md:px-10 items-center">
      <Link href={"/"} className="flex items-center justify-center">
        <Image src={"/logo.png"} height={50} width={50} alt="logo" />
        <h1 className="hidden md:inline text-xl font-medium">Medium</h1>
      </Link>

      <div className="flex">
        <Link href={"/write"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
            Write
          </button>
        </Link>
        <div onClick={toggleModal} className="cursor-pointer">
          <Avatar name={userDetails.name} size={10} />
        </div>
        {isModalOpen && (
          <UserModal userDetails={userDetails} onClose={toggleModal} />
        )}
      </div>
    </div>
  );
};

export default NavBar;

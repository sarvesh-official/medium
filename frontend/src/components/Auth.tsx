"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";
import { AuthInput } from "@sarveshofficial/medium-common";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<AuthInput>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );
      const jwt = await response.data.token;
      localStorage.setItem("token", jwt);
      router.push("/blogs");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="border p-4 md:p-8 border-gray-300 rounded-md">
          <div>
            <div className="text-3xl font-bold text-center">
              {type === "signup"
                ? "Create an account"
                : "Log in to your account"}
            </div>
            <div className="text-slate-400 text-center text-sm">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account"}
              <Link
                href={type === "signup" ? "/signin" : "/signup"}
                className="pl-1 underline"
              >
                {type === "signup" ? "Sign In" : "Sign Up"}
              </Link>
            </div>
          </div>
          <div className="flex mt-10 flex-col gap-5">
            {type === "signup" && (
              <LabelledInput
                label="Name"
                type="text"
                placeholder="Sarvesh"
                onChange={(e) => {
                  setPostInputs((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
              />
            )}
            <LabelledInput
              type="text"
              label="Email"
              placeholder="sarvesh@gmail.com"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="test@123"
              type="password"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

interface LabelledInputType {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

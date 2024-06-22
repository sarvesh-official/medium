"use client";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    async function getLoader() {
      const { tailChase } = await import("ldrs");
      tailChase.register();
    }
    getLoader();
  }, []);
  return (
    <div className="h-[90vh] w-screen flex items-center justify-center">
      <l-tail-chase speed={1.75} size={50} color={"black"} />
    </div>
  );
};

export default Loading;

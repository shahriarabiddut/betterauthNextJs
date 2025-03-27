"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Loading = () => {
  // Manually Prefetch
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/services/video");
    router.prefetch("/services/image");
    router.prefetch("/services/3d-animation");
    router.prefetch("/services/3d-rendering");
    router.prefetch("/services/web-development");
  }, [router]);
  //
  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-800 bg-opacity-50">
      <div className="relative w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-4 h-4 bg-blue-300 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

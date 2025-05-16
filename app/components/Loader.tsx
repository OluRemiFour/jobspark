import React from "react";

interface LoaderProps {
  fullScreen?: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = true,
  message = "Loading...",
}) => {
  if (fullScreen) {
    return (
      // <div className="fixed inset-0 flex flex-col items-center justify-center bg-background dark:bg-gray-900 z-50">
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background bg-white z-50">
        <div className="flex flex-col items-center justify-center max-w-md text-center p-8">
          <div className="relative">
            {/* Minimalist geometric loader animation */}
            <div className="flex space-x-2">
              <div className="w-3 h-20 bg-black dark:bg-black animate-[pulse_1s_ease-in-out_infinite]"></div>
              <div className="w-3 h-20 bg-black dark:bg-black animate-[pulse_1s_ease-in-out_0.2s_infinite]"></div>
              <div className="w-3 h-20 bg-black dark:bg-black animate-[pulse_1s_ease-in-out_0.4s_infinite]"></div>
              <div className="w-3 h-20 bg-black dark:bg-black animate-[pulse_1s_ease-in-out_0.6s_infinite]"></div>
              <div className="w-3 h-20 bg-black dark:bg-black animate-[pulse_1s_ease-in-out_0.8s_infinite]"></div>
            </div>
          </div>
          <p className="mt-8 text-lg font-medium text-gray-700 dark:text-gray-300">
            {message}
          </p>
          <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 mt-6 overflow-hidden">
            <div className="h-full bg-black dark:bg-white w-1/2 animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex space-x-1">
        <div className="w-2 h-8 bg-black dark:bg-white animate-[pulse_1s_ease-in-out_infinite]"></div>
        <div className="w-2 h-8 bg-black dark:bg-white animate-[pulse_1s_ease-in-out_0.2s_infinite]"></div>
        <div className="w-2 h-8 bg-black dark:bg-white animate-[pulse_1s_ease-in-out_0.4s_infinite]"></div>
      </div>
      {message && (
        <p className="ml-3 text-sm font-medium text-gray-800 dark:text-gray-800">
          {message}
        </p>
      )}
    </div>
  );
};

// Shimmer animation for the loader
const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}
`;

// Add the keyframes to the document
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = shimmerKeyframes;
  document.head.appendChild(style);
}

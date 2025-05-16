const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center md:my-16 text-black">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold animate-pulse">Coming Soon...</h1>
        <div className="flex justify-center space-x-2">
          <span className="w-3 h-3 bg-black rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

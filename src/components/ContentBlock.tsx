function ContentBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-[#f7f8fa] shadow-sm rounded-md overflow-hidden ">
      {children}
    </div>
  );
}

export default ContentBlock;

export const Separator = ({ id }: { id?: string }) => {
  return (
    <div
      id={id}
      className="flex items-center justify-center my-8 gap-4 transition-all duration-500 hover:scale-105"
    >
      <div className="flex-grow h-px bg-yellow-500" />
      <span className="text-yellow-500 text-xl">✦</span>
      <div className="flex-grow h-px bg-yellow-500" />
    </div>
  );
};

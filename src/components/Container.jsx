export default function Container({ children, className }) {
  return (
    <article
      className={`flex flex-col px-5 pb-4 mt-10 w-[90vw] md:w-[80%] text-base bg-indigo-50 shadow-sm rounded-[30px] text-neutral-600 md:px-20 ${className}`}
    >
      {children}
    </article>
  );
}

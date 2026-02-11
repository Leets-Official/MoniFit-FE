export const StampSkeleton = () => {
  return (
    <section className="border-primary-60 mt-12 flex min-h-122 w-75 flex-col rounded-[10px] border px-5 pt-6 pb-4">
      <div className="flex flex-col gap-2">
        <div className="h-7 w-48 animate-pulse rounded-md bg-gray-700"></div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-36 animate-pulse rounded bg-gray-700"></div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-700"></div>
            <div className="h-4 w-4 animate-pulse rounded bg-gray-700"></div>
          </div>
        </div>

        <div className="mt-4 w-full border border-gray-50"></div>
      </div>

      <div className="mt-7 grid w-full grid-cols-5 gap-3">
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div className="h-11.5 w-11.5 animate-pulse rounded-full bg-gray-700"></div>
            <div className="h-3 w-12 animate-pulse rounded bg-gray-700"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

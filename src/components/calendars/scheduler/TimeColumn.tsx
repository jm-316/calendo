export default function TimeColumn() {
  return (
    <div>
      {new Array(25).fill(null).map((_, index) => (
        <div
          className="flex flex-col items-center w-14 h-14 text-xs lg:w-20"
          key={index}>
          {index === 0 ? (
            <div className="mx-auto relative dark:text-white text-xs">
              GMT+09
            </div>
          ) : (
            <div className="mx-auto relative dark:text-white -top-2">{`${index}:00`}</div>
          )}
        </div>
      ))}
    </div>
  );
}

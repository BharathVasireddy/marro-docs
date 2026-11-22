export const Flow = ({ steps = [] }) => (
  <ol className="not-prose my-8 flex list-none p-0">
    {steps.map((step, i) => (
      <li key={i} className="flex flex-1 flex-col items-center min-w-0">
        <div className="flex w-full items-center">
          <span className={i === 0 ? "h-px flex-1" : "h-px flex-1 bg-emerald-200 dark:bg-emerald-400/30"} />
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-semibold text-white dark:bg-emerald-500">
            {i + 1}
          </span>
          <span className={i === steps.length - 1 ? "h-px flex-1" : "h-px flex-1 bg-emerald-200 dark:bg-emerald-400/30"} />
        </div>
        <span className="mt-2.5 px-1.5 text-center text-[13px] leading-snug text-gray-700 dark:text-gray-300">{step}</span>
      </li>
    ))}
  </ol>
);

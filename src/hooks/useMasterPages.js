import { useCallback, useEffect, useState } from "react";

const PAGES_DEFAULT = [
  {
    name: "steps",
    title: "Шаги",
    isDone: false,
  },
  {
    name: "people",
    title: "Люди",
    isDone: false,
  },
  {
    name: "schedule",
    title: "Расписание",
    isDone: false,
  },
  {
    name: "launch",
    title: "Запуск",
    isDone: false,
  },
];

const useMasterPages = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(PAGES_DEFAULT);

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const isDone = !pages.some((page) => page.isDone === false);

    setIsDone(isDone);
  }, [JSON.stringify(pages)]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
    setPages(
      pages.map((page, i) =>
        i <= currentPage ? { ...page, isDone: true } : page
      )
    );
  }, [currentPage]);

  return { pages, nextPage, isDone, currentPage, setCurrentPage };
};

export default useMasterPages;

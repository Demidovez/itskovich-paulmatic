import { MdDone } from "react-icons/md";

const PaginationCreateSequence = ({ pages, currentIndex, setCurrentIndex }) => {
  return (
    <>
      {pages.map((page, index) => (
        <div
          key={page.name}
          className={`flex-fill d-flex align-items-center page-sequence-item ${
            index === currentIndex ? "current" : ""
          } ${page.isDone ? "done" : ""}`}
          onClick={() => setCurrentIndex(index)}
          s
          //   style={{ background: index % 2 ? "red" : "green" }}
        >
          {index > 0 ? (
            <div class="page-sequence-arrow">
              <div class="page-sequence-arrow-top"></div>
              <div class="page-sequence-arrow-bottom"></div>
            </div>
          ) : null}
          <div className={`page-sequence-icon`}>
            {page.isDone ? (
              <MdDone />
            ) : (
              <div style={{ fontSize: 12 }}>{index + 1}</div>
            )}
          </div>
          <span>{page.title}</span>
        </div>
      ))}
    </>
  );
};

export default PaginationCreateSequence;

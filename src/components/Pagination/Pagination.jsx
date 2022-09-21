import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { shiftPage } from "store/slices/b2bFilterSlice";
import { moveToPage } from "store/slices/b2bFilterSlice";
import { isIndexShowed } from "utils/utils";

const PaginationCustom = ({ allCount = 0, page, moveToPage, countOnPage }) => {
  const countPages = Math.ceil(allCount / countOnPage);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <p className="m-0">
        Найдено: <strong>{allCount}</strong>
      </p>
      {allCount > countOnPage && (
        <nav aria-label="...">
          <Pagination
            className="pagination justify-content-end mb-0 ml-4"
            listClassName="justify-content-end mb-0"
          >
            <PaginationItem>
              <PaginationLink
                onClick={() => (page - 1 >= 0 ? moveToPage(page - 1) : null)}
              >
                <i className="fas fa-angle-left" />
              </PaginationLink>
            </PaginationItem>
            {Array(countPages)
              .fill()
              .map((_, index) => {
                if (countPages <= 5) {
                  return (
                    <PaginationItem
                      className={`${index === page ? "active" : ""}`}
                      key={index}
                    >
                      <PaginationLink onClick={() => moveToPage(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else {
                  if (isIndexShowed(page, index, countPages, 3, 5)) {
                    return (
                      <PaginationItem
                        className={`${index === page ? "active" : ""}`}
                        key={index}
                      >
                        <PaginationLink onClick={() => moveToPage(index)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else {
                    return null;
                  }
                }
              })}

            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  page + 1 < countPages ? moveToPage(page + 1) : null
                }
              >
                <i className="fas fa-angle-right" />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
      )}
    </div>
  );
};

export default PaginationCustom;

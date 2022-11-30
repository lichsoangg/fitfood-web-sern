import { createSearchParams, Link } from 'react-router-dom';
import './Pagination.scss';
import path from '../../constants/path';

const RANGE = 2;
export default function Pagination({ queryConfig, pageSize }) {
  const currentPage = Number(queryConfig.page);

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    const renderDotAfter = (pageNumber) => {
      if (!dotAfter) {
        dotAfter = true;
        return <span key={pageNumber}>...</span>;
      }
      return null;
    };

    const renderDotBefore = (pageNumber) => {
      if (!dotBefore) {
        dotBefore = true;
        return <span key={pageNumber}>...</span>;
      }
      return null;
    };

    const renderPageNumber = (pageNumber) => {
      return (
        <Link
          to={{
            pathname: path.admin,
            search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
          }}
          key={pageNumber}
        >
          {pageNumber}
        </Link>
      );
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        if (pageNumber <= RANGE || pageNumber > pageSize - RANGE) {
          return renderPageNumber(pageNumber);
        } else if (pageNumber > currentPage - RANGE - 1 && pageNumber < currentPage + RANGE + 1) {
          return renderPageNumber(pageNumber);
        } else if (pageNumber <= currentPage - RANGE - 1) {
          return renderDotBefore(pageNumber);
        } else {
          return renderDotAfter(pageNumber);
        }
      });
  };
  return <div>{renderPagination()}</div>;
}

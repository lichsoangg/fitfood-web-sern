import PropTypes from 'prop-types'
import { createSearchParams, Link } from 'react-router-dom'
import './Pagination.scss'

const RANGE = 2
export default function Pagination({ stylePagination, queryConfig, pageSize, pathname }) {
  const currentPage = Number(queryConfig?.page) || 1
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (pageNumber) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={pageNumber} className='pagination__item'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotBefore = (pageNumber) => {
      if (!dotBefore) {
        dotBefore = true

        return (
          <span key={pageNumber} className='pagination__item'>
            ...
          </span>
        )
      }
      return null
    }

    const renderPageNumber = (pageNumber) => {
      return (
        <Link
          to={{
            pathname: pathname,
            search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
          }}
          className={`pagination__item ${pageNumber === currentPage ? 'pagination__item-active' : ''}`}
          key={pageNumber}
        >
          {pageNumber}
        </Link>
      )
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (pageNumber <= RANGE || pageNumber > pageSize - RANGE) {
          return renderPageNumber(pageNumber)
        } else if (pageNumber > currentPage - RANGE - 1 && pageNumber < currentPage + RANGE + 1) {
          return renderPageNumber(pageNumber)
        } else if (pageNumber <= currentPage - RANGE - 1) {
          return renderDotBefore(pageNumber)
        } else {
          return renderDotAfter(pageNumber)
        }
      })
  }
  return (
    <div className='pagination' style={{ ...stylePagination }}>
      {currentPage > 1 && (
        <Link
          to={{
            pathname: pathname,
            search: createSearchParams({ ...queryConfig, page: (currentPage - 1).toString() }).toString()
          }}
          className='pagination__item'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
            <path d='M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
          </svg>
        </Link>
      )}

      {renderPagination()}
      {currentPage < pageSize && (
        <Link
          to={{
            pathname: pathname,
            search: createSearchParams({ ...queryConfig, page: (currentPage + 1).toString() }).toString()
          }}
          className='pagination__item'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
            <path d='M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z' />
          </svg>
        </Link>
      )}
    </div>
  )
}

Pagination.propTypes = {
  queryConfig: PropTypes.object.isRequired,
  pageSize: PropTypes.number,
  stylePagination: PropTypes.object,
  pathname: PropTypes.string
}

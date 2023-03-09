import './ProductRating.scss'
import { v4 as uuid } from 'uuid'
export default function ProductRating({ rating }) {
  const handleWidthRating = (value) => {
    const score = rating - value
    if (score >= 0) {
      return '100%'
    } else if (score < -1) {
      return '0%'
    } else {
      return `${(1 + score) * 100}%`
    }
  }
  return (
    <>
      {rating ? (
        <div className='product-rating'>
          {[...Array(5).keys()].map((value) => {
            return (
              <div className='product-rating__star' key={uuid()}>
                <div className='star-filled' style={{ width: `${handleWidthRating(value + 1)}` }}>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                    />
                  </svg>
                </div>
                <div className='star-non-filled'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                    />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

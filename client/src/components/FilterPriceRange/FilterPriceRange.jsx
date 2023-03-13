import { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utils/utils'
import './FilterPriceRange.scss'

export default function FilterPriceRange({ priceMin, priceMax, queryConfig }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [minValue, setMinValue] = useState(50000)
  const [maxValue, setMaxValue] = useState(1400000)

  useEffect(() => {
    if (queryConfig.price_min) {
      setMinValue(queryConfig.price_min)
    }
    if (queryConfig.price_max) {
      setMaxValue(queryConfig.price_max)
    }
  }, [queryConfig])
  const handleMinValueChange = (event) => {
    const value = Math.min(Number(event.target.value), Number(maxValue) - 1)
    setMinValue(value)
  }

  const handleMaxValueChange = (event) => {
    const value = Math.max(Number(event.target.value), Number(minValue) + 1)
    setMaxValue(value)
  }
  const handleClickFilterRange = () => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        ...queryConfig,
        page: 1,
        price_max: maxValue,
        price_min: minValue
      }).toString()
    })
  }
  return (
    <div className='price-filter-range'>
      <div className='slider'>
        <div
          className='progress'
          style={{ left: `${(minValue / priceMax) * 100}%`, right: `${(1 - maxValue / priceMax) * 100}%` }}
        ></div>
      </div>
      <div className='range'>
        <input
          type='range'
          className='min'
          min={priceMin}
          max={priceMax}
          value={minValue}
          onChange={handleMinValueChange}
        />
        <input
          type='range'
          className='max'
          min={priceMin}
          max={priceMax}
          value={maxValue}
          onChange={handleMaxValueChange}
        />
      </div>
      <div className='output'>
        <span>{formatCurrency(minValue)}đ</span>
        <span>{formatCurrency(maxValue)}đ</span>
      </div>
      <div className='accept-button' onClick={() => handleClickFilterRange()}>
        Áp dụng
      </div>
    </div>
  )
}

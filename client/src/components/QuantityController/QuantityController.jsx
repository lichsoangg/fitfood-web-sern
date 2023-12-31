import { useState } from 'react'
import './QuantityController.scss'
export default function QuantityController({
  value,
  maxValue,
  onChangeFunc,
  onIncreaseFunc,
  onDecreaseFunc,
  stylesInput,
  onBlur
}) {
  const [localValue, setLocalValue] = useState(value || 1)
  const handleInputChange = (e) => {
    const value = e.target.value
    if (/^[0-9]+$/.test(value) || value === '') {
      setLocalValue(handleNumberValue({ value, minValue: 1, maxValue }))
      onChangeFunc && onChangeFunc(handleNumberValue({ value, minValue: 1, maxValue }))
    }
  }
  const handleInputDecrease = () => {
    setLocalValue((prevNumber) => handleNumberValue({ value: Number(prevNumber) - 1, minValue: 1, maxValue }))
    onChangeFunc && onChangeFunc(handleNumberValue({ value: Number(localValue) - 1, minValue: 1, maxValue }))
    onDecreaseFunc && onDecreaseFunc(handleNumberValue({ value: Number(localValue) - 1, minValue: 1, maxValue }))
  }
  const handleInputIncrease = () => {
    setLocalValue((prevNumber) => handleNumberValue({ value: Number(prevNumber) + 1, minValue: 1, maxValue }))
    onChangeFunc && onChangeFunc(handleNumberValue({ value: Number(localValue) + 1, minValue: 1, maxValue }))
    onIncreaseFunc && onIncreaseFunc(handleNumberValue({ value: Number(localValue) + 1, minValue: 1, maxValue }))
  }
  const handleInputBlur = (e) => {
    const value = e.target.value
    onBlur && onBlur(value)
  }
  return (
    <div className='quantity-controller'>
      <div
        className={`quantity-controller__minus ${value <= 1 ? 'quantity-controller-disabled' : ''}`}
        onClick={handleInputDecrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </div>
      <input
        value={value || localValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        style={{ ...stylesInput }}
      />

      <div
        className={`quantity-controller__plus ${value >= Number(maxValue) ? 'quantity-controller-disabled' : ''}`}
        onClick={handleInputIncrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </div>
    </div>
  )
}

function handleNumberValue({ value, minValue, maxValue }) {
  if (value > maxValue) {
    return maxValue
  } else if (value < 1) {
    return minValue
  } else {
    return value
  }
}

import { useCallback, useEffect, useState } from 'react'

const useHover = (ref, callbackMouseOver, callbackMouseOut) => {
  const [isHovered, setIsHovered] = useState()
  const node = ref.current
  const handleMouseOver = useCallback(() => {
    setIsHovered(true)
    callbackMouseOver()
  }, [callbackMouseOver])
  const handleMouseOut = useCallback(() => {
    setIsHovered(false)
    callbackMouseOut()
  }, [callbackMouseOut])
  useEffect(() => {
    const nodeElement = ref.current
    if (nodeElement) {
      nodeElement.addEventListener('mouseover', handleMouseOver)
      nodeElement.addEventListener('mouseout', handleMouseOut)
      return () => {
        nodeElement.removeEventListener('mouseover', handleMouseOver)
        nodeElement.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [node, ref, handleMouseOver, handleMouseOut])
  return { isHovered }
}

export default useHover

import { useCallback, useEffect, useRef, useState } from 'react'

export function useModal() {
  const [open, setOpen] = useState(false)
  const [rect, setRect] = useState(null)
  const activeModalRef = useRef(null)

  const handleClickOpenModal = useCallback(
    (e) => {
      if (activeModalRef.current) {
        setRect(activeModalRef.current.getBoundingClientRect())
        setOpen(true)
      }
    },
    [activeModalRef]
  )
  const handleClickOutside = () => {
    setOpen(false)
  }
  useEffect(() => {
    const nodeActiveModal = activeModalRef.current
    if (nodeActiveModal) {
      activeModalRef.current.addEventListener('click', handleClickOpenModal)
    }
    return () => {
      if (nodeActiveModal) {
        nodeActiveModal.removeEventListener('click', handleClickOpenModal)
      }
    }
  }, [handleClickOpenModal])

  return {
    open,
    handleClickOutside,
    rect,
    activeModalRef,
    setOpen
  }
}

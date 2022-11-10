import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

export function useModal() {
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const modalRef = useRef(null);
    const activeModalRef=useRef(null);

    const handleClickOpenModal =(e) => {
            setRect(e.target.getBoundingClientRect());
            setOpen(true);
    }
    const handleOutside =useCallback((e) => {
        if (modalRef.current &&
            !modalRef.current.contains(e.target)
            && activeModalRef.current &&
            !activeModalRef.current.contains(e.target)
        ) {
          setOpen(false);
        }
    },[modalRef]);
    useEffect(() => {
        window.addEventListener("click", handleOutside);
        const nodeActiveModal=activeModalRef.current;
        if (nodeActiveModal){
         
            activeModalRef.current.addEventListener("click",handleClickOpenModal)
         };
        return () => {
            window.removeEventListener("click", handleOutside);
            if(nodeActiveModal){
                nodeActiveModal.removeEventListener("click", handleClickOpenModal)
            }
        };
    }, []);

    return {
        open,
        setOpen,
        rect,
        activeModalRef,
        modalRef,
    };
}

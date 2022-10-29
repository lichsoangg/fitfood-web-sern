import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export function useClickOutsideModal() {
    const [open, setOpen] = useState(false);
    const modalRef = useRef();

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return {
        open,
        setOpen,
        modalRef
    };
}

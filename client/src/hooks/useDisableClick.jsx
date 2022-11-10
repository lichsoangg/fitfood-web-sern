import { useEffect } from "react";


export const useDisableClick=(isLoading)=>{
    useEffect(() => {
        isLoading ? document.body.style.pointerEvents = "none" : document.body.style.pointerEvents = "unset";
    }, [isLoading])

    return null;
}
import style from "./page.module.css"

import { useRef, useEffect } from "react"

//Animation library
import { animate } from "motion"

function Loading() {

    //variable to store the name of the spinner in the DOM
    const ref = useRef(null)

    useEffect(() => {

        //Verify if the re.current is null (if the ref hook have already retrieved the exact DOM element name .spinner)
        if (!ref.current) return
        animate(
            ref.current, {rotate: 360} ,
            {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            });
    }, []);

    return (
            <div ref={ref} className={style.spinner}></div>
    )
}

export default Loading
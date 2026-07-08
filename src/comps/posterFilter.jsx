import React, { useState, useEffect, useRef } from 'react';
export default function MovieFilter(props) {
    const [gogo, setGo] = useState(0)
    const lastVal = useRef(0);
    const choices = ['a','b','c','d','e']
    useEffect(() => {
        let cool;
        do {
            cool = Math.ceil(Math.floor(Math.random() * 4));
        } while (cool === lastVal.current);
        setGo(cool);
        lastVal.current = cool;
    }, []);
    return (
    <div className={`filter ${choices[gogo]}`} >
        {Array.from({ length: 3 }).map((_, index) => {
            const myStyle = {
                left: `${Math.ceil(Math.random() * 100)}%`,
                height: `${Math.floor(Math.random() * 99)}%`,
                width: `${Math.ceil(Math.random() * 3)}%`,
            };
            return <img key={index} src={`/Line1.png`} style={myStyle} />;
        })}
    </div>
    )
}
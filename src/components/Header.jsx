import React, { useEffect, useRef, useState } from 'react';
import menu from '../assets/menu-icon.svg'

const Header = (props) => {

    const [isHovered, setIsHovered] = useState(null)
    const whereToWatchRef = useRef(null)

    const handleScrollToNext = () => {
        if (props.nextSection && props.nextSection.current) {
            props.nextSection.current.scrollIntoView({
                behavior: "smooth"
            })
        }
    }

    useEffect(() => {

    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-20 flex justify-between items-center px-8 z-999">
            <img
                onClick={() => {
                    props.setIsMenuOpen(true)
                }}
                src={menu}
                className="hover:scale-105 cursor-pointer tranition-all duration-300 ease-in-out w-8 aspect-square"
            />
            <div className="flex justify-center items-start gap-3 h-11">
                <button ref={whereToWatchRef} className="relative w-40 h-full flex justify-center items-center bg-translarent cursor-pointer text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl group">
                    <p className="text-center group-hover:scale-105 transition-all duration-300 ease-in-out">Where to watch</p>
                    <div className="absolute top-13 left-0 w-full h-full flex justify-start items-center flex-col gap-2">
                        <button className="w-40 py-2 bg-translarent cursor-pointer text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl text-center group-hover:scale-105 transition-all duration-300 ease-in-out">Where to watch</button>
                        <button className="w-40 py-2 bg-translarent cursor-pointer text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl text-center group-hover:scale-105 transition-all duration-300 ease-in-out">Where to watch</button>
                        <button className="w-40 py-2 bg-translarent cursor-pointer text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl text-center group-hover:scale-105 transition-all duration-300 ease-in-out">Where to watch</button>
                    </div>
                </button>
                <button onClick={handleScrollToNext} className="px-5 h-full bg-green-500 border-2 border-green-500 rounded-full cursor-pointer text-black text-base font-medium font-satoshi hover:scale-105 transition-transform duration-300 ease-in-out">Explore the franchise</button>
            </div>
        </div>
    );
};

export default Header;
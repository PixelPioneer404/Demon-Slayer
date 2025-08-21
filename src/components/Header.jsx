import React from 'react';
import menu from '../assets/menu-icon.svg'

const Header = (props) => {

    const handleScrollToNext = () => {
        if (props.nextSection && props.nextSection.current) {
            props.nextSection.current.scrollIntoView({
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-20 flex justify-between items-center px-8 z-999">
            <img
                onClick={() => {
                    props.setIsMenuOpen(true)
                }}
                src={menu}
                className="hover:scale-105 cursor-pointer tranition-all duration-300 ease-in-out w-8 aspect-square"
            />
            <button onClick={handleScrollToNext} className="px-5 py-2 bg-green-500 rounded-full cursor-pointer text-black text-base font-medium font-satoshi hover:scale-105 transition-all duration-300 ease-in-out">Explore the franchise</button>
        </div>
    );
};

export default Header;
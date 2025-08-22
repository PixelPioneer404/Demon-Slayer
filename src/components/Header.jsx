import React, { useEffect, useRef, useState } from 'react';
import menu from '../assets/menu-icon.svg'
import gsap from 'gsap';

const Header = (props) => {

    const [isWTWOpen, setIsWTWOpen] = useState(null)
    const whereToWatchRef = useRef(null)

    const toggleWhereToWatch = () => {
        if (isWTWOpen === null) {
            setIsWTWOpen(true)
            return
        }
        setIsWTWOpen(prev => !prev)
    }

    const handleScrollToNext = () => {
        if (props.nextSection && props.nextSection.current) {
            props.nextSection.current.scrollIntoView({
                behavior: "smooth"
            })
        }
    }

    useEffect(() => {

        const elements = whereToWatchRef.current.querySelectorAll("button")
        let WTWTl = gsap.timeline({ paused: true })

        WTWTl
            .fromTo(elements, {
                y: -60,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.inOut"
            })

        if (isWTWOpen) WTWTl.play()
        else WTWTl.reverse(0)

        return () => {
            if (WTWTl) WTWTl.kill()
        }
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
                <div onClick={toggleWhereToWatch} className="relative w-40 h-full flex justify-center items-center bg-translarent cursor-pointer text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl group">
                    <p className="text-center hover:scale-105 transition-all duration-300 ease-in-out">Where to watch</p>
                    <div ref={whereToWatchRef} className="absolute top-13 left-0 w-full h-full justify-start items-center flex-col gap-2">
                        <button className="w-40 py-2 bg-translarent cursor-pointer text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl text-center hover:scale-105 transition-all duration-300 ease-in-out">Where to watch</button>
                        <button className="w-40 py-2 bg-translarent cursor-pointer text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl text-center hover:scale-105 transition-all duration-300 ease-in-out">Where to watch</button>
                        <button className="w-40 py-2 bg-translarent cursor-pointer text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl text-center hover:scale-105 transition-all duration-300 ease-in-out">Where to watch</button>
                    </div>
                </div>
                <button onClick={handleScrollToNext} className="px-5 h-full bg-green-500 border-2 border-green-500 rounded-full cursor-pointer text-black text-base font-medium font-satoshi hover:scale-105 transition-transform duration-300 ease-in-out">Explore the franchise</button>
            </div>
        </div>
    );
};

export default Header;
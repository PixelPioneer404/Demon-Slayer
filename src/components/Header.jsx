import React, { useEffect, useRef, useState } from 'react';
import menu from '../assets/menu-icon.svg'
import crunchyrollLogo from '../assets/crunchyroll-logo.jpeg'
import netflixLogo from '../assets/netflix-logo.jpg'
import primeVideoLogo from '../assets/prime-video-logo.png'
import gsap from 'gsap';

const Header = (props) => {

    const [isWTWOpen, setIsWTWOpen] = useState(null)
    const whereToWatchRef = useRef(null)
    const crunchyrollRef = useRef(null)
    const netflixRef = useRef(null)
    const primeVideoRef = useRef(null)

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

    const handleButtonHover = (buttonRef) => {
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            })
        }
    }

    const handleButtonLeave = (buttonRef) => {
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            })
        }
    }

    useEffect(() => {

        const container = whereToWatchRef.current
        const elements = container.querySelectorAll("button")

        let WTWTl = gsap.timeline({ paused: true })

        WTWTl
            .fromTo(elements, {
                y: -20,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.inOut"
            }, "-=0.1")

        if (isWTWOpen === true) {
            WTWTl.play()
        } else if (isWTWOpen === false) {
            WTWTl.reverse(0)
        }
        // Don't do anything if isWTWOpen is null (initial state)

        return () => {
            if (WTWTl) WTWTl.kill()
        }
    }, [isWTWOpen])

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
                <div onClick={toggleWhereToWatch} className="relative w-40 h-12 flex justify-center items-center bg-translarent cursor-pointer text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl group">
                    <p className="text-center hover:scale-105 transition-all duration-300 ease-in-out">Where to watch</p>
                    <div ref={whereToWatchRef} className="absolute top-14 left-0 w-full h-full flex justify-stary items-center flex-col gap-2">
                        <a href="https://www.crunchyroll.com/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba?utm_campaign=media_actions&utm_medium=deep_link&utm_source=google" target='_blank'>
                            <button
                                ref={crunchyrollRef}
                                onMouseEnter={() => handleButtonHover(crunchyrollRef)}
                                onMouseLeave={() => handleButtonLeave(crunchyrollRef)}
                                className={`${isWTWOpen ? "pointer-events-auto" : "pointer-events-none"} opacity-0 w-40 h-12 bg-translarent cursor-pointer bg-black text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl text-center`}>
                                <img src={crunchyrollLogo} alt="Crunchyroll" className="scale-80 w-full h-full overflow-hidden rounded-4xl object-cover object-center" />
                            </button>
                        </a>
                        <a href="https://www.netflix.com/in/title/81091393?source=35&fromWatch=true" target='_blank'>
                            <button
                                ref={netflixRef}
                                onMouseEnter={() => handleButtonHover(netflixRef)}
                                onMouseLeave={() => handleButtonLeave(netflixRef)}
                                className={`${isWTWOpen ? "pointer-events-auto" : "pointer-events-none"} opacity-0 w-40 h-12 bg-translarent cursor-pointer bg-[#111111] text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl text-center`}>
                                <img src={netflixLogo} alt="Netflix" className="scale-80 w-full h-full overflow-hidden rounded-4xl object-cover object-center" />
                            </button>
                        </a>
                        <a href="https://www.primevideo.com/dp/amzn1.dv.gti.2199a15f-f79b-45f8-91c2-0d5552179c94?autoplay=0&ref_=atv_cf_strg_wb" target='_blank'>
                            <button
                                ref={primeVideoRef}
                                onMouseEnter={() => handleButtonHover(primeVideoRef)}
                                onMouseLeave={() => handleButtonLeave(primeVideoRef)}
                                className={`${isWTWOpen ? "pointer-events-auto" : "pointer-events-none"} opacity-0 w-40 h-12 bg-translarent cursor-pointer bg-[#212A37] text-white border-2 border-white font-satoshi font-medium text-base rounded-4xl text-center`}>
                                <img src={primeVideoLogo} alt="Prime Video" className="scale-60 w-full h-full overflow-hidden rounded-4xl object-cover object-center" />
                            </button>
                        </a>
                    </div>
                </div>
                <button onClick={handleScrollToNext} className="px-5 h-full bg-green-500 border-2 border-green-500 rounded-full cursor-pointer text-black text-base font-medium font-satoshi hover:scale-105 transition-transform duration-300 ease-in-out">Explore the franchise</button>
            </div>
        </div>
    );
};

export default Header;
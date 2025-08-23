import React, { useEffect, useRef, useState } from 'react';
import '../footer.css'
import trio from '../assets/footer-trio.png'
import nezuko from '../assets/nezuko-footer.png'
import mmm from '../assets/mmm.png'
import running from '../assets/trio-running.png'
import trioOutro from '../assets/outro.webm'
import gsap from 'gsap';

const Footer = () => {

    const outroRef = useRef(null)
    const outroVideoRef = useRef(null)

    const [isClicked, setIsClicked] = useState(null)
    const [isVideoEnded, setIsVideoEnded] = useState(false)

    const handleIsClicked = () => {
        if (isClicked === null) {
            setIsClicked(true)
            return
        }
        setIsClicked(prev => !prev)
    }

    useEffect(() => {
        let outroFadeIn
        let outroFadeOut

        if (isClicked) {
            outroFadeIn = gsap.fromTo(outroRef.current, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.inOut"
            })
            if (outroVideoRef.current) {
                outroVideoRef.current.currentTime = 0
                outroVideoRef.current.play().catch(console.error)
            }
        } else if (isClicked === false) {
            outroFadeOut = gsap.fromTo(outroRef.current, {
                opacity: 1
            }, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut"
            })
            if (outroVideoRef.current) {
                outroVideoRef.current.pause()
                setTimeout(() => {
                    outroVideoRef.current.currentTime = 0
                }, 550)
            }
        }

        return () => {
            if (outroFadeIn) outroFadeIn.kill()
            if (outroFadeOut) outroFadeOut.kill()
        }

    }, [isClicked])

    return (
        <>
            <div className="relative w-full h-full bg-black flex justify-evenly items-center">
                <div className="absolute bottom-0 left-0 h-1/2">
                    <img src={mmm} alt="mmm" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full scale-60 origin-bottom" />
                    <img src={nezuko} alt="logo" className="h-full object-fit object-center" />
                </div>
                <img src={trio} alt="center-logo" className="w-1/2 absolute bottom-0 right-0 object-fit object-center drop-shadow-2xl" />
                <button onClick={handleIsClicked} className="btn scale-160 absolute top-2/3 -translate-y-1/2 left-1/4 translate-x-2/3 flex justify-center items-center gap-1 whitespace-nowrap">
                    <p className="absolute top-1 left-1/2 -translate-x-1/2 text-center text-xl"><span>✧</span>The Little Extra</p>
                    <img src={running} alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 object-center object-cover h-5/6" />
                </button>
            </div>
            <div
                onClick={() => {
                    if (isVideoEnded) {
                        setIsClicked(false)
                        setIsVideoEnded(false)
                    }
                }}
                ref={outroRef}
                className={`opacity-0 fixed bottom-0 left-0 flex justify-center items-center w-screen h-screen bg-black/90 z-9999 ${isClicked ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
                <video
                    ref={outroVideoRef}
                    src={trioOutro}
                    className="video-fade-mask w-[100%] h-[100%]"
                    playsInline
                    preload="auto"
                    onEnded={() => {
                        console.log("Video ended!")
                        setIsVideoEnded(true)
                    }}
                    onLoadedData={() => {
                        // Ensure video is ready for smooth playback
                        if (outroVideoRef.current) {
                            outroVideoRef.current.currentTime = 0
                        }
                    }}
                ></video>
            </div>
        </>
    );
};

export default Footer;
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo from '/Demon-slayer-logo.png'
import FlowingMenu from './FlowingMenu';
import { X } from 'lucide-react';

const Menu = (props) => {

    let currentYear = new Date().getFullYear();

    const menuRef = useRef(null)
    const iconRef = useRef(null)
    const flowingMenuRef = useRef(null)
    const logoRef = useRef(null)

    const sectionlist = {
        "ic": props.icSection,
        "ht": props.htSection,
        "sv": props.svSection,
        "ed": props.edSection,
        "mt": props.mtSection
    }

    useEffect(() => {

        if (props.isMenuOpen === null) return

        let menuTl = gsap.timeline({ paused: true })

        menuTl
            .fromTo(menuRef.current, {
                height: "0"
            }, {
                height: "100%",
                duration: 1,
                ease: "power4.inOut"
            })
            .fromTo(logoRef.current, {
                y: -100,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut"
            }, "0.3")
            .fromTo(flowingMenuRef.current, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut"
            }, "<")
            .fromTo(iconRef.current, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut"
            }, "<")


        if (props.isMenuOpen) {
            menuTl.play()
        }
        else {
            menuTl.reverse(0)
        }

        return () => {
            menuTl.kill()
        }
    }, [props.isMenuOpen])

    const handleScrollToNext = (key) => {
        if (key === props.heroSection) {
            // Special case for hero section - scroll to top since it's fixed
            props.setIsMenuOpen(false)
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }, 300)
        } else if (key && key.current) {
            props.setIsMenuOpen(false)
            setTimeout(() => {
                console.log(key.current)
                key.current.scrollIntoView({
                    behavior: "smooth"
                })
            }, 300)
        }
    }

    const navItems = [
        { action: () => handleScrollToNext(sectionlist["ic"]), text: 'Infinity Castle', image: '/posters/infinity-castel-poster.avif' },
        { action: () => handleScrollToNext(sectionlist["ht"]), text: 'Hashira Training', image: '/posters/hasira-training-poster.jpg' },
        { action: () => handleScrollToNext(sectionlist["sv"]), text: 'Swordsmith Village', image: '/posters/swordsmith-village-poster.jpg' },
        { action: () => handleScrollToNext(sectionlist["ed"]), text: 'Entertainment District', image: '/posters/entertainment-district-poster.jpg' },
        { action: () => handleScrollToNext(sectionlist["mt"]), text: 'Mugen Train', image: '/posters/mugen-train.jpg' }
    ];

    return (
        <div ref={menuRef} className="select-none fixed top-0 left-0 z-9999 overflow-hidden w-screen h-0 bg-black flex flex-col justify-center items-center gap-5">
            <div ref={iconRef}
                onClick={() => {
                    if (props.isMenuOpen) props.setIsMenuOpen(false)
                }}
                className="absolute top-30 left-30 cursor-pointer hover:rotate-90 transition-all duration-300 ease-in-out">
                <X size={60} color='white' />
            </div>
            <img onClick={() => { handleScrollToNext(props.heroSection) }} ref={logoRef} src={logo} alt="logo" className="cursor-pointer absolute top-30 left-1/2 -translate-x-1/2 h-45 object-center object-cover" />
            <div ref={flowingMenuRef} className="flex-1 relative mt-60 w-full h-1/2 p-30">
                <FlowingMenu items={navItems} />
            </div>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white font-satoshi font-medium">
                © {currentYear} | Made with ❤️ by Rajbeer Saha
            </p>
        </div>
    );
};

export default Menu;
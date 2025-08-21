import React from 'react';
import { gsap } from 'gsap';

function FlowingMenu({ items = [] }) {
    return (
        <div className="w-full h-full overflow-hidden">
            <nav className="flex flex-col h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem key={idx} {...item} />
                ))}
            </nav>
        </div>
    );
}

function MenuItem({ action, text, image }) {
    const itemRef = React.useRef(null);
    const marqueeRef = React.useRef(null);
    const marqueeInnerRef = React.useRef(null);
    const timelineRef = React.useRef(null);

    const animationDefaults = { duration: 0.6, ease: 'expo' };

    // Cleanup effect
    React.useEffect(() => {
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, []);

    const findClosestEdge = (mouseX, mouseY, width, height) => {
        const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
        const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    const handleMouseEnter = (ev) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        
        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }
        
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        timelineRef.current = gsap.timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-100%' : '100%' })
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '100%' : '-100%' })
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
    };

    const handleMouseLeave = (ev) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        
        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }
        
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(
            ev.clientX - rect.left,
            ev.clientY - rect.top,
            rect.width,
            rect.height
        );

        timelineRef.current = gsap.timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-100%' : '100%' })
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '100%' : '-100%' }, '<');
    };

    const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
        <React.Fragment key={idx}>
            <span className="text-[#060010] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0] whitespace-nowrap">
                {text}
            </span>
            <div
                className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center bg-gray-300 flex-shrink-0"
                style={{ 
                    backgroundImage: image ? `url(${image})` : 'none',
                    backgroundColor: image ? 'transparent' : '#ccc'
                }}
                onError={(e) => {
                    console.log('Image failed to load:', image);
                    e.target.style.backgroundImage = 'none';
                    e.target.style.backgroundColor = '#666';
                }}
            />
        </React.Fragment>
    ));

    return (
        <div className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" ref={itemRef}>
            <a
                onClick={action}
                className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {text}
            </a>
            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-full"
                ref={marqueeRef}
            >
                <div className="h-full w-[200%] flex translate-y-full" ref={marqueeInnerRef}>
                    <div className="flex items-center relative h-full w-[200%] will-change-transform marquee">
                        {repeatedMarqueeContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlowingMenu;

// Note: this is also needed
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       translate: {
//         '101': '101%',
//       },
//       keyframes: {
//         marquee: {
//           'from': { transform: 'translateX(0%)' },
//           'to': { transform: 'translateX(-50%)' }
//         }
//       },
//       animation: {
//         marquee: 'marquee 15s linear infinite'
//       }
//     }
//   },
//   plugins: [],
// };
import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import HeroFooter from './components/HeroFooter'
import gsap from 'gsap'
import { CustomEase } from "gsap/CustomEase"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ArcSection from './components/ArcSection'
import arcData from "./data/ArcData.json"
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import TrailerPage from './pages/TrailerPage'
import Menu from './components/Menu'
gsap.registerPlugin(CustomEase, ScrollTrigger)


function App() {
  const location = useLocation()
  const [hasNavigated, setHasNavigated] = useState(false)
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const splashRef = useRef(null)
  const logoRef = useRef(null)
  const buttonRef = useRef(null)
  const nextSectionRef = useRef(null)
  const heroRef = useRef(null)
  const firstArcRef = useRef(null)

  // Force scroll to top on page load/reload
  useEffect(() => {
    // Always scroll to top immediately on page load
    window.scrollTo(0, 0)
    
    // Also use history.scrollRestoration to prevent browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Reset scroll position to ensure it stays at top
    const resetScroll = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0)
      }
    }
    
    // Listen for any scroll attempts during initial load
    window.addEventListener('scroll', resetScroll)
    
    // Clean up after a short delay to allow normal scrolling
    const timer = setTimeout(() => {
      window.removeEventListener('scroll', resetScroll)
    }, 1000)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', resetScroll)
      // Restore default scroll restoration when component unmounts
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
  }, [])

  // Create refs for all arc sections (components)
  const arcSectionRefs = [
    useRef(null), // arcData[0] - Infinity Castle Arc
    useRef(null), // arcData[1] - Hashira Training Arc  
    useRef(null), // arcData[2] - Swordsmith Village Arc
    useRef(null), // arcData[3] - Entertainment District Arc
    useRef(null), // arcData[4] - Mugen Train Arc
  ]

  // Create refs for section elements (for triggering)
  const sectionRefs = [
    nextSectionRef, // First section (already exists)
    useRef(null),   // Second section
    useRef(null),   // Third section
    useRef(null),   // Fourth section
    useRef(null),   // Fifth section
  ]

  const [muted, setMuted] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(null)

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !muted
      audioRef.current.muted = newMutedState
      setMuted(newMutedState)

      // If unmuting, make sure audio is playing
      if (!newMutedState && audioRef.current.paused) {
        audioRef.current.play().catch(console.error)
      }
    }
  }

  useEffect(() => {
    // Reset all element states to initial values on component mount
    if (splashRef.current) {
      gsap.set(splashRef.current, { height: '100vh' })
    }
    if (heroRef.current) {
      gsap.set(heroRef.current, { opacity: 1 })
    }
    if (firstArcRef.current) {
      gsap.set(firstArcRef.current, { opacity: 0, y: 50 })
    }
    
    // Reset all arc sections to visible state
    arcSectionRefs.forEach(ref => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 1, y: 0, scale: 1 })
      }
    })

    let timer;
    let splashTl;
    let heroScrollTrigger;
    let nextSectionScrollTrigger; //for opacity only
    let firstArcScrollTrigger; // for first arc animation
    let arcFadeOutTriggers = []; // Array to store all arc fade-out animations
    let scrollTl;

    timer = setTimeout(() => {
      // Splash screen and logo animation
      if (splashRef.current && logoRef.current && buttonRef.current) {
        // Set initial states for logo and button
        gsap.set(logoRef.current, { opacity: 0, scale: 0.5 })
        gsap.set(buttonRef.current, { opacity: 0 })
        
        splashTl = gsap.timeline()
        splashTl
          .to(splashRef.current, {
            height: 0,
            duration: 0.5,
            ease: CustomEase.create("custom", "1,0,0.2,1")
          })
          .to(logoRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.inOut"
          }, "-=0.3")
          .to(buttonRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut"
          }, "-=0.3")
      }

      // Hero section fade out on scroll
      if (heroRef.current && nextSectionRef.current) {
        heroScrollTrigger = gsap.to(heroRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: nextSectionRef.current,
            start: "top 50%",
            end: "top top",
            scrub: 1,
            onEnter: () => {
              if (videoRef.current) {
                videoRef.current.pause()
              }
            },
            onLeaveBack: () => {
              if (videoRef.current) {
                videoRef.current.play().catch(console.error)
              }
            }
          }
        })

        nextSectionScrollTrigger = gsap.from(nextSectionRef.current, {
          opacity: 0.2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: nextSectionRef.current,
            start: "top bottom",
            end: "top 40%",
            scrub: 1
          }
        })
      }

      // First Arc animation - Special first section with fade in
      if (firstArcRef.current && sectionRefs[1].current) {
        // Set initial state
        gsap.set(firstArcRef.current, { opacity: 0, y: 50 })

        firstArcScrollTrigger = gsap.timeline({
          scrollTrigger: {
            trigger: firstArcRef.current,
            start: "top 80%",
            endTrigger: sectionRefs[1].current,
            end: "top 20%",
            scrub: 1
          }
        })
          .to(firstArcRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3
          })
          .to(firstArcRef.current, {
            opacity: 1,
            duration: 0.4
          })
          .to(firstArcRef.current, {
            opacity: 0,
            duration: 0.3,
            scale: 0.8
          })
      }

      // General fade-out system for arc sections (skip index 0 as it's handled by firstArcRef)
      for (let i = 1; i < arcSectionRefs.length; i++) {
        const currentRef = arcSectionRefs[i]
        const nextSectionRef = sectionRefs[i + 1]

        console.log(`Arc ${i}:`, {
          currentRefExists: !!currentRef.current,
          nextSectionRefExists: !!(nextSectionRef && nextSectionRef.current),
          nextSectionIndex: i + 1
        })

        if (currentRef.current) {
          // Set initial visible state for components
          gsap.set(currentRef.current, { opacity: 1 })

          // Create fade-out animation when next section comes into view (if there is a next section)
          if (nextSectionRef && nextSectionRef.current) {
            const fadeOutAnimation = gsap.to(currentRef.current, {
              opacity: 0,
              y: -100, // Add upward movement for more visible effect
              scale: 0.8, // Add scale down effect
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: nextSectionRef.current,
                start: "top 80%", // Start earlier for longer animation
                end: "top 20%", // End later for longer animation
                scrub: 1
              }
            })

            arcFadeOutTriggers.push(fadeOutAnimation)
            console.log(`Created fade-out animation for arc ${i}`)
          } else {
            // For the last section, fade out based on scroll position
            const fadeOutAnimation = gsap.to(currentRef.current, {
              opacity: 0,
              y: -100,
              scale: 0.8,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRefs[i].current,
                start: "bottom 90%",
                end: "bottom 60%",
                scrub: 1
              }
            })

            arcFadeOutTriggers.push(fadeOutAnimation)
            console.log(`Created last section fade-out animation for arc ${i}`)
          }
        }
      }

      // Logo and button fade out on scroll
      if (buttonRef.current && logoRef.current && nextSectionRef.current) {
        scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: nextSectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1
          }
        })

        scrollTl
          .to(logoRef.current, {
            opacity: 0,
            scale: 0.5,
            ease: "power2.inOut"
          })
          .to(buttonRef.current, {
            opacity: 0,
            ease: "power2.inOut"
          }, "<")
      }

      // Play video and audio after animation starts
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(console.error)
        }
        if (audioRef.current) {
          audioRef.current.muted = muted
          audioRef.current.play().catch(console.error)
        }
      }, 100)

    }, 500)

    // Cleanup function
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      if (splashTl) {
        splashTl.kill()
      }
      if (heroScrollTrigger) {
        heroScrollTrigger.kill()
      }
      if (nextSectionScrollTrigger) {
        nextSectionScrollTrigger.kill()
      }
      if (firstArcScrollTrigger) {
        firstArcScrollTrigger.kill()
      }
      // Clean up all arc fade-out animations
      arcFadeOutTriggers.forEach(animation => {
        if (animation) animation.kill()
      })
      if (scrollTl) {
        scrollTl.kill()
      }
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Track navigation and reset animations when navigating back to home page
  useEffect(() => {
    if (location.pathname !== '/') {
      setHasNavigated(true)
    } else if (location.pathname === '/' && hasNavigated) {
      // Only reset when navigating back to home after visiting another page

      // Kill all existing ScrollTriggers first
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      // Force scroll to top immediately
      window.scrollTo({ top: 0, behavior: 'instant' })

      // Reset all elements to initial state
      if (splashRef.current) {
        gsap.set(splashRef.current, { height: '100vh' })
      }
      if (heroRef.current) {
        gsap.set(heroRef.current, { opacity: 1 })
      }
      if (firstArcRef.current) {
        gsap.set(firstArcRef.current, { opacity: 0, y: 50 })
      }
      
      // Reset all arc sections
      arcSectionRefs.forEach(ref => {
        if (ref.current) {
          gsap.set(ref.current, { opacity: 1, y: 0, scale: 1 })
        }
      })

      // Reset video and audio
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(console.error)
      }

      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.muted = muted
        audioRef.current.play().catch(console.error)
      }

      setHasNavigated(false)

      // Force a page reload to restart all animations properly
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  }, [location.pathname, hasNavigated, muted])

  return (
    <Routes>
      <Route path="/watch-trailer" element={<TrailerPage />} />
      <Route path="/watch-trailer/:arcID" element={<TrailerPage />} />
      <Route path="/" element={
        <>
          <div className="w-screen h-screen absolute inset-0 bg-transparent">
            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} icSection={nextSectionRef} htSection={sectionRefs[1]} svSection={sectionRefs[2]} edSection={sectionRefs[3]} mtSection={sectionRefs[4]} />
          </div>
          <section className="relative">
            <Header nextSection={nextSectionRef} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div ref={heroRef} className="w-screen h-screen flex justify-center items-center fixed z-10">
              <div ref={splashRef} className="h-screen absolute inset-0 z-9999 bg-black origin-top w-screen"></div>
              <video ref={videoRef} src="/bg-video-hero.webm" className="w-full h-full flex-1 object-cover object-center" muted loop></video>
              <audio
                ref={audioRef}
                src="/infinity-castel-ost.mp3"
                loop
                muted={muted}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-10">
                <img ref={logoRef} src="/Infinity-castel-logo.png" alt="center-logo" className="w-115 h-110 object-fit object-center drop-shadow-2xl" />
                <Link to='/watch-trailer/infinity-castle' ><button ref={buttonRef} className="px-5 py-3 rounded-full border-2 border-green-500 text-lg text-center text-white font-medium font-satoshi hover:bg-green-500 hover:border-white transition-colors duration-300 ease-in-out cursor-pointer">Watch the trailer</button></Link>
              </div>
              <HeroFooter muted={muted} toggleMute={toggleMute} nextSection={nextSectionRef} />
            </div>
          </section>

          <section className="relative w-screen h-screen z-9 bg-black"></section>

          <section ref={nextSectionRef} className="relative w-screen h-screen z-11 bg-black">
            <ArcSection ref={firstArcRef} arcData={arcData[0]} to="/watch-trailer/infinity-castle" />
          </section>
          <section ref={sectionRefs[1]} className="relative w-screen h-screen z-11 bg-black">
            <ArcSection ref={arcSectionRefs[1]} arcData={arcData[1]} to="/watch-trailer/hashira-training" />
          </section>
          <section ref={sectionRefs[2]} className="relative w-screen h-screen z-11 bg-black">
            <ArcSection ref={arcSectionRefs[2]} arcData={arcData[2]} to="/watch-trailer/swordsmith-village" />
          </section>
          <section ref={sectionRefs[3]} className="relative w-screen h-screen z-11 bg-black">
            <ArcSection ref={arcSectionRefs[3]} arcData={arcData[3]} to="/watch-trailer/entertainment-district" />
          </section>
          <section ref={sectionRefs[4]} className="relative w-screen h-screen z-11 bg-black">
            <ArcSection ref={arcSectionRefs[4]} arcData={arcData[4]} to="/watch-trailer/mugen-train" />
          </section>
        </>
      } />
    </Routes>
  )
}

export default App
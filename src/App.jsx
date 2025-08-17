import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import HeroFooter from './components/HeroFooter'
import gsap from 'gsap'
import { CustomEase } from "gsap/CustomEase"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Volume2, VolumeOff } from 'lucide-react'
gsap.registerPlugin(CustomEase, ScrollTrigger)


function App() {

  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const splashRef = useRef(null)
  const logoRef = useRef(null)
  const buttonRef = useRef(null)
  const nextSectionRef = useRef(null)
  const heroRef = useRef(null)

  const [muted, setMuted] = useState(true)

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
    let timer;
    let splashTl;
    let heroScrollTrigger;
    let scrollTl;

    timer = setTimeout(() => {
      // Splash screen and logo animation
      if (splashRef.current && logoRef.current && buttonRef.current) {
        splashTl = gsap.timeline()
        splashTl
          .to(splashRef.current, {
            height: 0,
            duration: 0.5,
            ease: "custom",
            ease: CustomEase.create("custom", "1,0,0.2,1")
          })
          .from(logoRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            ease: "power2.inOut"
          }, "-=0.3")
          .from(buttonRef.current, {
            opacity: 0,
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
      if (scrollTl) {
        scrollTl.kill()
      }
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <div className="relative">
        <Header />
        <section ref={heroRef} className="w-screen h-screen flex justify-center items-center fixed z-10">
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
            <button ref={buttonRef} className="px-5 py-3 rounded-full border-2 border-green-500 text-lg text-center text-white font-medium font-satoshi hover:bg-green-500 hover:border-white transition-colors duration-300 ease-in-out cursor-pointer">Watch the trailer</button>
          </div>
          <HeroFooter muted={muted} toggleMute={toggleMute} />
        </section>
      </div>
      <section className="relative w-screen h-screen z-9 bg-black"></section>
      <section ref={nextSectionRef} className="relative w-screen h-screen z-11 bg-black"></section>
      <section className="relative w-screen h-screen z-11 bg-white"></section>
      <section className="relative w-screen h-screen z-11 bg-red-600"></section>
    </>
  )
}

export default App
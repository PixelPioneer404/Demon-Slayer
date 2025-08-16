import { useState } from 'react'
import Header from './components/Header'
import HeroFooter from './components/HeroFooter'

function App() {

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center relative">
        <Header />
        <video src="/bg-video-hero.webm" className="w-full h-full flex-1 object-cover object-center" autoPlay muted loop></video>
        <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center gap-10">
          <img src="/Infinity-castel-logo.png" alt="center-logo" className="w-120 h-115 object-fit object-center drop-shadow-2xl" />
          <button className="px-5 py-3 rounded-full border-2 border-green-500 text-lg text-center text-white font-medium font-satoshi hover:bg-green-500 hover:border-white transition-colors duration-300 ease-in-out cursor-pointer">Watch the trailer</button>
        </div>
        <HeroFooter />
      </div>
    </>
  )
}

export default App
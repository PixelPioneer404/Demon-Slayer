import React from 'react';
import arrowSVG from '../assets/arrow.svg'
import { Facebook, Github, Instagram, Linkedin, Twitter, Volume2, VolumeOff } from 'lucide-react';

const HeroFooter = (props) => {
    return (
        <div className="absolute bottom-0 left-0 w-full h-20 flex justify-between items-center px-8 z-999">
            <span className="text-white text-[32px] mb-20">
                <img src={arrowSVG} alt="Arrow" className="w-20 h-20 animate-up-down hover:scale-120 active:scale-100 cursor-pointer transition-all duration-300 ease-in-out" />
            </span>
            <div className="flex justify-center items-center gap-8 mb-5 mr-5">
                <Instagram size={28} color="white" className="hover:text-gray-300 hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out" />
                <Github size={28} color="white" className="hover:text-gray-300 hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out" />
                <Facebook size={28} color="white" className="hover:text-gray-300 hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out" />
                <Linkedin size={28} color="white" className="hover:text-gray-300 hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out" />
                <div className="h-10 border-1 border-white"></div>
                <button onClick={props.toggleMute} className="cursor-pointer">{props.muted ? <VolumeOff size={28} color="white" /> : <Volume2 size={28} color="white" />}</button>
            </div>
        </div>
    );
};

export default HeroFooter;
import { Calendar, Clapperboard } from 'lucide-react';
import React, { forwardRef } from 'react';
import IMDbLogo from "../assets/IMDb-logo.svg"
import { Link } from 'react-router-dom';

const ArcSection = forwardRef((props, ref) => {
    return (
        <div ref={ref} className="absolute inset-0 w-full h-full flex justify-items-center items-center p-20 px-50 pt-25 z-12">
            <div className="w-full h-full flex justify-center items-center gap-6">
                <img src={props.arcData.img} alt={props.arcData.name} className="h-full object-cover object-center" />
                <div className="h-full flex-1 flex flex-col gap-15 p-6 pt-0 justify-start items-start">
                    <h1 className="text-left text-white text-6xl font-satoshi font-bold leading-15">Demon Slayer: kimetsu no Yaiba<br /><span className="text-white/80 text-4xl">{props.arcData.name}</span></h1>
                    <div className="h-8 flex justify-start items-center gap-3 -mb-7 -mt-3">
                        <span className="inline-flex px-3 h-full rounded-full bg-transparent border-2 border-white/50 text-white text-sm font-medium font-satoshi justify-start items-center gap-2"><Calendar size={16} />{props.arcData.date}</span>
                        <span className="inline-flex px-3 h-full rounded-full bg-[#F4C000] text-sm text-black font-satoshi font-medium justify-start items-center gap-1"><img src={IMDbLogo} alt="IMDb" className="w-10 h-full" /> {props.arcData.imdb} / 10</span>
                    </div>
                    <p className="text-left text-white/60 font-satoshi text-xl font-medium leading-10 pr-28">
                        {props.arcData.desc}
                    </p>
                    <div className="flex justify-start items-center gap-4">
                        <Link to={props.to} ><button className="h-full py-4 px-8 border-2 border-green-500 rounded-full bg-transparent text-lg text-white font-medium font-satoshi hover:bg-green-500 cursor-pointer transition-all duration-300 ease-in-out flex justify-center items-center gap-2"><Clapperboard size={20} /> Watch Trailer</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ArcSection;
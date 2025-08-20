import React, { useEffect, useRef } from 'react';
import trailerdata from '../data/TrailerData.json'
import { useParams } from 'react-router-dom';
import Player from '../components/Player';

const TrailerPage = () => {

    const videoRef = useRef(null)

    useEffect(() => {
        Object.values(trailerdata).forEach(trailer => {
            const video = document.createElement('video')
            video.src = trailer.url
            video.preload = 'metadata'
            video.load()
        })
    }, [])

    const { arcID } = useParams()
    let currentTrailer = trailerdata[arcID]

    return (
        <div className="w-screen h-screen overflow-hidden bg-black flex justify-center items-center">
            <video
                ref={videoRef}
                src={currentTrailer.url}
                width="100%"
                height="100%"
                poster={currentTrailer.poster}
            >
                Can't play video
            </video>
            <Player ref={videoRef} title={currentTrailer.name} />
        </div>
    );
};

export default TrailerPage;
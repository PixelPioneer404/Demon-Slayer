import React, { useState, useEffect, forwardRef } from "react";
import { Play, Pause, Maximize, House } from "lucide-react";
import logo from '/Demon-slayer-logo.png'
import { Link } from "react-router-dom";
import arrowSVG from '../assets/arrow.svg'

const Player = forwardRef(({ title }, videoRef) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showUI, setShowUI] = useState(true);
    const [isProgressHovered, setIsProgressHovered] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);

    let hideTimer;

    // Format mm:ss
    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Toggle play/pause
    const togglePlay = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    // Fullscreen toggle
    const toggleFullscreen = () => {
        if (!videoRef.current) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoRef.current.requestFullscreen();
        }
    };

    // Handle keyboard controls
    const handleKeyDown = (e) => {
        if (!videoRef.current) return;

        // Only handle keyboard events when the video player area is focused or no input is focused
        const activeElement = document.activeElement;
        const isInputFocused = activeElement && (
            activeElement.tagName === 'TEXTAREA'
            // Removed INPUT and BUTTON from exclusion so progress bar and buttons don't block keyboard
        );

        if (isInputFocused) return;

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                e.stopPropagation();
                // Unfocus any focused elements
                if (document.activeElement && document.activeElement.tagName === 'INPUT') {
                    document.activeElement.blur();
                }
                togglePlay();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                e.stopPropagation();
                const newTimeLeft = Math.max(0, videoRef.current.currentTime - 10);
                videoRef.current.currentTime = newTimeLeft;
                break;
            case 'ArrowRight':
                e.preventDefault();
                e.stopPropagation();
                const newTimeRight = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
                videoRef.current.currentTime = newTimeRight;
                break;
        }
    };

    // Progress update and video event listeners
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            if (!isSeeking) { // Only update if not currently seeking
                setCurrentTime(video.currentTime);
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        const setMeta = () => setDuration(video.duration);

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener("timeupdate", updateProgress);
        video.addEventListener("loadedmetadata", setMeta);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);

        return () => {
            video.removeEventListener("timeupdate", updateProgress);
            video.removeEventListener("loadedmetadata", setMeta);
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
        };
    }, [videoRef]);

    const handleSeek = (e) => {
        if (!videoRef.current) return;
        const rect = e.target.getBoundingClientRect();
        const clickX = e.nativeEvent.offsetX;
        const width = rect.width;
        const percentage = (clickX / width) * 100;
        const newTime = (percentage / 100) * duration;

        videoRef.current.currentTime = newTime;
        setProgress(percentage);
        setCurrentTime(newTime);
    };

    const handleSeekStart = () => {
        setIsSeeking(true);
    };

    const handleSeekEnd = () => {
        setIsSeeking(false);
        // Blur the input after seeking to prevent keyboard conflicts
        if (document.activeElement && document.activeElement.tagName === 'INPUT') {
            document.activeElement.blur();
        }
    };

    const handleSeekChange = (e) => {
        if (!videoRef.current || !duration) return;

        const newProgress = parseFloat(e.target.value);
        const newTime = (newProgress / 100) * duration;

        setProgress(newProgress);
        setCurrentTime(newTime);
        videoRef.current.currentTime = newTime;
    };

    // Auto-hide logic and keyboard events
    useEffect(() => {
        const resetHideTimer = () => {
            setShowUI(true);
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => setShowUI(false), 3000); // 3s
        };

        // Attach listeners to whole window for user activity
        const handleMouseMove = resetHideTimer;
        const handleClick = resetHideTimer;
        const handleTouchStart = resetHideTimer;

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", handleTouchStart);

        resetHideTimer(); // Start timer immediately

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchstart", handleTouchStart);
            clearTimeout(hideTimer);
        };
    }, [videoRef]); // Add videoRef as dependency

    return (
        <div
            className={`select-none absolute top-0 left-0 w-full h-full flex flex-col justify-between text-white transition-opacity duration-500 ${showUI ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            onClick={togglePlay} // Click anywhere to toggle play/pause
        >
            {/* Top Title */}
            <div className="absolute top-10 left-5 flex flex-col justify-center items-start gap-5" onClick={(e) => e.stopPropagation()}>
                <Link to='/' ><img src={arrowSVG} alt="back-to-home" className="ml-10 rotate-90 w-18 h-18 object-center object-contain hover:-translate-x-1 transition-all duration-300 ease-in-out" /></Link>
                <h1 className="text-left text-4xl font-semibold font-satoshi text-white/90 drop-shadow-lg flex justify-start items-center">
                    <span><img src={logo} className="h-20" /></span>
                    <p className="-ml-3">Demon Slayer: Kimetsu no Yaiba | {title} | Trailer</p>
                </h1>
            </div>

            {/* Center Play/Pause */}
            <div className="flex-1 flex items-center justify-center">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                    }}
                    className="bg-black/40 hover:bg-black/60 p-4 rounded-full transition"
                >
                    {isPlaying ? <Pause size={48} /> : <Play size={48} />}
                </button>
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-center items-center gap-3 p-4 bg-gradient-to-t from-black/70 to-transparent" onClick={(e) => e.stopPropagation()}>
                {/* Current Time */}
                <span className="text-sm font-satoshi">{formatTime(currentTime)}</span>

                {/* Progress Bar */}
                <div
                    className="flex-1 relative group cursor-pointer flex justify-center items-center"
                    onMouseEnter={() => setIsProgressHovered(true)}
                    onMouseLeave={() => setIsProgressHovered(false)}
                >
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress}
                        onChange={handleSeekChange}
                        onMouseDown={handleSeekStart}
                        onMouseUp={handleSeekEnd}
                        onTouchStart={handleSeekStart}
                        onTouchEnd={handleSeekEnd}
                        onKeyDown={(e) => {
                            // Allow arrow keys on progress bar but prevent space
                            if (e.code === 'Space') {
                                e.preventDefault();
                                e.stopPropagation();
                                togglePlay();
                            } else if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                                // Let the progress bar handle its own arrow keys
                                e.stopPropagation();
                            }
                        }}
                        tabIndex="-1"
                        className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer outline-none
                                   [&::-webkit-slider-thumb]:appearance-none
                                   [&::-webkit-slider-thumb]:h-4
                                   [&::-webkit-slider-thumb]:w-4
                                   [&::-webkit-slider-thumb]:rounded-full
                                   [&::-webkit-slider-thumb]:bg-white
                                   [&::-webkit-slider-thumb]:shadow-lg
                                   [&::-webkit-slider-thumb]:border-2
                                   [&::-webkit-slider-thumb]:border-white
                                   [&::-webkit-slider-thumb]:transition-all
                                   [&::-webkit-slider-thumb]:duration-200
                                   [&::-moz-range-thumb]:h-4
                                   [&::-moz-range-thumb]:w-4
                                   [&::-moz-range-thumb]:rounded-full
                                   [&::-moz-range-thumb]:bg-white
                                   [&::-moz-range-thumb]:border-2
                                   [&::-moz-range-thumb]:border-white
                                   [&::-moz-range-thumb]:cursor-pointer
                                   [&::-moz-range-thumb]:border-none
                                   hover:[&::-webkit-slider-thumb]:scale-125
                                   hover:[&::-moz-range-thumb]:scale-125"
                        style={{
                            background: `linear-gradient(to right, #ffffff 0%, #ffffff ${progress}%, rgba(255,255,255,0.3) ${progress}%, rgba(255,255,255,0.3) 100%)`
                        }}
                    />
                    {/* Show thumb only on hover */}
                    <style jsx>{`
                        input[type="range"]::-webkit-slider-thumb {
                            opacity: ${isProgressHovered ? '1' : '0'};
                        }
                        input[type="range"]::-moz-range-thumb {
                            opacity: ${isProgressHovered ? '1' : '0'};
                        }
                    `}</style>
                </div>

                {/* Duration */}
                <span className="text-sm font-satoshi">{formatTime(duration)}</span>

                {/* Fullscreen */}
                <button onClick={toggleFullscreen} className="ml-2 hover:scale-110 transition-transform">
                    <Maximize size={20} />
                </button>
            </div>
        </div>
    );
});

export default Player;
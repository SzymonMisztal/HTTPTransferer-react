import React, { useEffect, useRef, useState } from 'react';

interface VideoWatcherProps {
    videoUrl: string;
}

const VideoWatcher: React.FC<VideoWatcherProps> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.src = videoUrl;
            video.load();
        }
    }, [videoUrl]);

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div>
            <video className="video-container" ref={videoRef} controls />
        </div>
    );
};

export default VideoWatcher;

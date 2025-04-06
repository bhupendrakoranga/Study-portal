'use client';
import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { BACKGROUND_YELLOW, GREY } from '@/styles/color';
import Image from '@/component/ui/Image';
import { guttersPx } from '@/styles/variables';
import { getImages, playOrPauseVideo } from '@/utils/constant';
import { urls } from '@/utils/constant/Data';
import ChatMessage from '@/component/common/ChatBot/ChatMessage';
import { data } from '@/_layouts/student/courses/TabComponents';
import { mqMax } from '@/styles/base';

const VideoPlayerWrapper = styled.div`
  position: relative;
  width: 912px;
  height: 581px;
  background-color: #333;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  ${mqMax.max} {
    width: max-content;
    height: auto;
  }
`;

const MainWrapper = styled.div`
  margin-bottom: 100px;
`;

const VideoFrame = styled.video`
  width: 100%;
  height: 513px;
  border: none;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.mediumHalf};
  justify-content: space-between;
  width: calc(100% - 0px);
  height: 68px;
  background: ${GREY};
  padding: ${guttersPx.mediumHalf} ${guttersPx.medium};
`;

const PlayButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.3); /* Semi-transparent white */
  border-radius: 5px;
  margin: 10px 0;
  position: relative;
  backdrop-filter: blur(10px); /* Adjust the blur intensity as needed */
`;

const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${BACKGROUND_YELLOW};
  border-radius: 5px;
  width: ${({ progress }: { progress: number }) => `${progress}%`};
`;

const ChatConatiner = styled.div`
  #chatWrapper {
    width: 912px;
  }
`;

const VideoPlayer = ({
  videoUrl,
  search,
  isMessage = false,
}: {
  videoUrl?: string;
  search: any;
  isMessage?: boolean;
}) => {
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const percentage =
        (videoElement.currentTime / videoElement.duration) * 100;
      setProgress(percentage);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [videoSrc, isPlaying]); // Update event listeners when videoSrc changes

  useEffect(() => {
    const videoElement = videoRef.current;
    playOrPauseVideo(videoElement, isPlaying);
  }, [isPlaying, videoSrc]); // Update play/pause state when videoSrc changes

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const progressBarRect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - progressBarRect.left;
    const clickPercentage = (clickX / progressBarRect.width) * 100;
    if (videoRef.current) {
      videoRef.current.currentTime =
        (clickPercentage / 100) * videoRef.current.duration;
    }
  };

  function getUrl(id: number) {
    const videoInfo = urls.find((item) => item.id === id);
    return videoInfo?.url;
  }

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    function fetchVideoSrc() {
      const url = getUrl(Number(search));
      setVideoSrc(url);
    }
    fetchVideoSrc();
  }, [search]);

  return search && videoSrc ? (
    <MainWrapper>
      <VideoPlayerWrapper>
        <VideoFrame key={videoSrc} ref={videoRef} controls={false}>
          <source src={videoSrc} type="video/mp4" />
          <track src={videoSrc} kind="subtitles" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </VideoFrame>
        <ControlsContainer>
          <PlayButton onClick={handlePlayPause}>
            <Image
              src={`/assets/png/${getImages(isPlaying)}`}
              alt="play/pause"
              width={56}
              height={56}
            />
          </PlayButton>
          <ProgressBar onClick={handleProgressClick}>
            <ProgressFill progress={progress} />
          </ProgressBar>
        </ControlsContainer>
      </VideoPlayerWrapper>
      {isMessage && (
        <ChatConatiner>
          {' '}
          <ChatMessage data={data} />
        </ChatConatiner>
      )}
    </MainWrapper>
  ) : (
    <></>
  );
};

export default VideoPlayer;

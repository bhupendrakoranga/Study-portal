import { Sentence } from '@/types/global';
import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  sentences: Sentence[];
  speed?: number;
  autoplay?: boolean;
  pauseDuration?: number; // Duration to pause after each sentence before deleting it
}

interface UseTypewriterReturn {
  displayText: string;
  currentSentenceIndex: number;
}

const useTypewriter = ({
  sentences,
  speed = 100,
  autoplay = true,
  pauseDuration = 2000, // Default pause duration of 2 seconds
}: UseTypewriterProps): UseTypewriterReturn => {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true); // Set the flag to true when the component is mounted
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Reset the typewriter state when the sentences prop changes
      setDisplayText('');
      setCurrentSentenceIndex(0);
      setIsTyping(false);
    }
  }, [sentences, isMounted]);

  useEffect(() => {
    if (autoplay && isMounted) {
      setIsTyping(true);
    }
  }, [autoplay, isMounted]);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;
    let deletingInterval: NodeJS.Timeout;

    const startTyping = () => {
      let i = 0;
      typingInterval = setInterval(() => {
        if (i <= sentences[currentSentenceIndex].text.length) {
          setDisplayText(sentences[currentSentenceIndex].text.substring(0, i));
          i++;
        } else {
          clearInterval(typingInterval);
          // Pause at the end of the sentence
          pauseTimeout = setTimeout(() => {
            let j = sentences[currentSentenceIndex].text.length;
            deletingInterval = setInterval(() => {
              if (j > 0) {
                setDisplayText((prevText) => prevText.slice(0, -1));
                j--;
              } else {
                clearInterval(deletingInterval);
                setIsTyping(false);
              }
            }, speed);
          }, pauseDuration);
        }
      }, speed);
    };

    if (isTyping) {
      startTyping();
    }

    return () => {
      clearInterval(typingInterval);
      clearTimeout(pauseTimeout);
      clearInterval(deletingInterval);
    };
  }, [isTyping, sentences, currentSentenceIndex, speed, pauseDuration]);

  useEffect(() => {
    if (!isTyping && autoplay && isMounted) {
      const timeout = setTimeout(() => {
        setCurrentSentenceIndex(
          (prevIndex) => (prevIndex + 1) % sentences.length,
        );
        setDisplayText('');
        setIsTyping(true);
      }, sentences[currentSentenceIndex].duration);

      return () => clearTimeout(timeout);
    }
  }, [isTyping, autoplay, isMounted, sentences, currentSentenceIndex]);

  return { displayText, currentSentenceIndex };
};

export default useTypewriter;

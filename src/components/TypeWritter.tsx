"use client";
import React, { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  phrases: string[];
  typeSpeed?: number;
  eraseSpeed?: number;
  delayBetweenPhrases?: number;
}

const Typewriter = ({
  phrases,
  typeSpeed = 100,
  eraseSpeed = 50,
  delayBetweenPhrases = 1000,
}: TypewriterProps) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTyping) {
      if (displayedText.length < phrases[phraseIndex].length) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplayedText((prevText) =>
            phrases[phraseIndex].substring(0, prevText.length + 1)
          );
        }, typeSpeed);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenPhrases);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplayedText((prevText) =>
            prevText.substring(0, prevText.length - 1)
          );
        }, eraseSpeed);
      } else {
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    // Clear timeout on unmount or before setting a new one
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayedText,
    isTyping,
    phraseIndex,
    phrases,
    typeSpeed,
    eraseSpeed,
    delayBetweenPhrases,
  ]);

  return (
    <div className="text-xl font-large tracking-wide text-white underline decoration-emerald underline-offset-8 h-10">
      {displayedText}
    </div>
  );
};

export default Typewriter;

import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  delay: number; // delay between characters in ms
  className?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({ text, delay, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, delay, currentIndex]);

  return <span className={className}>{displayedText}</span>;
};
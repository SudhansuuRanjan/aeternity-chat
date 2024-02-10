import React, { useState, useEffect } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TypingText = ({ inputText, setScroll, setTyping }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = inputText;

  useEffect(() => {
    let textIndex = 0;
    let typingInterval;

    if (isTyping) {
      setTyping(true);
      typingInterval = setInterval(() => {
        setText(fullText.slice(0, textIndex + 1)); // Fix 1: Increment textIndex after using it
        if (textIndex === fullText.length - 1) { // Fix 2: Check against the length - 1
          setIsTyping(false);
          clearInterval(typingInterval);
        }
        setScroll(fullText.slice(0, textIndex + 1)); // Fix 3: Increment textIndex after using it
        textIndex++; // Fix 4: Increment textIndex within the interval function
      }, 60);
    } else {
      setTyping(false);
    }

    return () => {
      clearInterval(typingInterval);
    };
  }, [isTyping, fullText, setScroll, setTyping]); // Fix 5: Add missing dependencies

  return <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>;
};

export default TypingText;

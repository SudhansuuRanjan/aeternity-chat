import React, { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const TypingText = ({ inputText, setScroll }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = inputText;

  useEffect(() => {
    let textIndex = 0;
    let typingInterval;

    if (isTyping) {
      typingInterval = setInterval(() => {
        setText(fullText.slice(0, ++textIndex));
        if (textIndex === fullText.length) {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
        setScroll(fullText.slice(0, ++textIndex));
      }, 60);
    }

    return () => {
      clearInterval(typingInterval);
    };
  }, [isTyping]);

  return <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>;
};

export default TypingText;

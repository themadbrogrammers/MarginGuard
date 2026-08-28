import React, { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';

const TypewriterText = ({ lines, speed = 40, onComplete }) => {
  const { ref, isInView } = useInView({ threshold: 0.5, once: true });
  
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isInView || isComplete) return;

    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      
      // Handle gap lines
      if (currentLine.type === 'gap') {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = { ...currentLine, text: '' };
          return newLines;
        });
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        return;
      }

      const textToType = currentLine.text;

      if (currentCharIndex < textToType.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            const prefix = currentLine.type === 'command' ? '> ' : '';
            if (!newLines[currentLineIndex]) {
              newLines[currentLineIndex] = { ...currentLine, typed: prefix + textToType[currentCharIndex] };
            } else {
              newLines[currentLineIndex].typed += textToType[currentCharIndex];
            }
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Move to next line
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, speed * 5); // small pause between lines
        return () => clearTimeout(timeout);
      }
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [isInView, currentLineIndex, currentCharIndex, lines, speed, isComplete, onComplete]);

  const getColor = (type) => {
    switch (type) {
      case 'command': return 'text-[#00ff88]';
      case 'info': return 'text-slate-400';
      case 'alert': return 'text-[#ffaa00]';
      case 'danger': return 'text-[#ff3366]';
      case 'success': return 'text-[#00ff88]';
      case 'result': return 'text-[#00e5ff]';
      case 'data': return 'text-[#f0f4f8]';
      default: return 'text-gray-300';
    }
  };

  return (
    <div ref={ref} className="font-mono text-sm sm:text-base leading-relaxed p-4 rounded-lg bg-[#06080c]/80 border border-white/[0.08] shadow-2xl overflow-hidden">
      {displayedLines.map((line, idx) => (
        <div key={idx} className={`${getColor(line.type)} min-h-[1.5rem]`}>
          {line.typed}
          {idx === currentLineIndex && !isComplete && (
            <span className="inline-block w-2 h-4 bg-[#00ff88] ml-1 animate-pulse align-middle" />
          )}
        </div>
      ))}
      {isComplete && (
        <div className="min-h-[1.5rem]">
          <span className="inline-block w-2 h-4 bg-[#00ff88] ml-1 animate-pulse align-middle opacity-50" />
        </div>
      )}
    </div>
  );
};

export default TypewriterText;

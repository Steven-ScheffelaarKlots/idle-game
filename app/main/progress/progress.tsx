import React, { useEffect, useState, useRef } from 'react';

export interface ProgressProps {
  /** Duration in milliseconds for the progress bar to fill completely */
  duration: number;
  /** Function called when the progress bar completes */
  onComplete?: () => void;
  /** Color of the progress bar (default: '#4caf50') */
  color?: string;
  /** Background color of the progress container (default: '#e0e0e0') */
  backgroundColor?: string;
  /** Height of the progress bar in pixels (default: 10) */
  height?: number;
}

export const ProgressBar: React.FC<ProgressProps> = ({
  duration,
  onComplete,
  color = '#4caf50',
  backgroundColor = '#e0e0e0',
  height = 10,
}) => {
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = (timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const newProgress = Math.min((elapsed / duration) * 100, 100);
    
    setProgress(newProgress);
    
    if (newProgress < 100) {
      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // Progress complete
      if (onComplete) {
        onComplete();
      }
      
      // Reset for restart
      startTimeRef.current = null;
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, onComplete]);

  return (
    <div 
      style={{
        width: '100%',
        backgroundColor,
        borderRadius: height / 2,
        overflow: 'hidden',
        height: `${height}px`,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: height / 2,
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
};

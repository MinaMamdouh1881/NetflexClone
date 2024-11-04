'use client';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useRef, useEffect } from 'react';

const Animation = ({ children }: { children: React.ReactNode }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (direction: 'left' | 'right') => {
    let scrollAmount: number;
    if (direction === 'right') {
      scrollAmount = sliderRef.current?.offsetWidth ?? 0;
      setScrollPosition((prevPosition): number => {
        if (prevPosition + scrollAmount >= maxScroll) {
          return maxScroll;
        }
        return prevPosition + scrollAmount;
      });
    } else {
      scrollAmount = -(sliderRef.current?.offsetWidth ?? 0);
      setScrollPosition((prevPosition): number => {
        if (prevPosition + scrollAmount <= 0) {
          return 0;
        }
        return prevPosition + scrollAmount;
      });
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      const maxScrollValue =
        (sliderRef.current.scrollWidth ?? 0) -
        (sliderRef.current.offsetWidth ?? 0);
      setMaxScroll(maxScrollValue);
    }
  }, [sliderRef?.current?.scrollWidth, sliderRef?.current?.offsetWidth]);

  return (
    <div className='relative'>
      <button
        className='absolute top-1/2 left-0 -translate-y-1/2 z-50 h-full'
        onClick={() => scrollHandler('left')}
        disabled={scrollPosition === 0}
      >
        <ArrowBackIosIcon />
      </button>
      <div
        ref={sliderRef}
        className='flex transition-transform duration-500 ease-out'
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {children}
      </div>

      <button
        className='absolute top-1/2 right-0 -translate-y-1/2 z-50 h-full'
        onClick={() => scrollHandler('right')}
        disabled={scrollPosition >= maxScroll}
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};
export default Animation;

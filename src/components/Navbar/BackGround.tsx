'use client';
import React, { useState, useEffect } from 'react';

function BackGround({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center p-4 gap-8 fixed top-0 left-0 right-0 z-50 duration-300 ${
        scrollY > 0
          ? 'bg-main'
          : 'bg-gradient-to-t from-transparent to-black/50'
      }`}
    >
      {children}
    </div>
  );
}
export default BackGround;

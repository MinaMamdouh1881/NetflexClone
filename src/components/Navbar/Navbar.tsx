import Image from 'next/image';
import React from 'react';
import MyAvatar from '@/components/Navbar/MyAvatar';
import BackGround from '@/components/Navbar/BackGround';
import Link from 'next/link';

function Navbar() {
  return (
    <BackGround>
      <div className='hidden md:block'>
        <Image
          src='/logo.png'
          alt='netflix-logo'
          width={100}
          height={100}
          style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
          priority
        />
      </div>
      <div className='grow'>
        <ul className='flex items-center gap-4' key={'nav-links'}>
          <Link
            href={'/'}
          >
            <li key={'home'}>Home</li>
          </Link>

          <Link
            href={'/tv-shows'}
            
          >
            <li key={'tv-shows'}>TV Shows</li>
          </Link>

          <Link
            href={'/movies'}
          >
            <li key={'movies'}>Movies</li>
          </Link>
        </ul>
      </div>
      <div>
        <div className='flex items-center gap-4'>
          <MyAvatar />
        </div>
      </div>
    </BackGround>
  );
}

export default Navbar;

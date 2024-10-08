import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const LoginButton = dynamic(
  () => import('@/components/AuthNavbar/LoginButton'),
  { ssr: false }
);

function Navbar() {
  return (
    <div className='flex justify-between items-center p-5 shrink-0 bg-gray-100 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 m-4'>
      <Image
        src='/logo.png'
        alt='netflex_logo'
        width={100}
        height={100}
        priority
        style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
      />
      <LoginButton />
    </div>
  );
}

export default Navbar;

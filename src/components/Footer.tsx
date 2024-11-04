import Image from 'next/image';
import React from 'react';

function Footer() {
  return (
    <div className='p-5 bg-[#000002] flex justify-center items-center gap-5'>
      <Image
        src='/logo.png'
        alt='netflix-logo'
        width={100}
        height={100}
        style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
        priority
      />
      <h3 className='text-3xl text-red-500'>
        &copy; 2024 Copyright : Mina Mamdouh
      </h3>
    </div>
  );
}

export default Footer;

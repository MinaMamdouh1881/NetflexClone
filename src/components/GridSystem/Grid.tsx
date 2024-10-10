'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MOVIE } from '@/types/movie';
import { useEffect, useState } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

function Grid({ item }: { item: MOVIE }) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered && shouldPlay) {
      timer = setTimeout(() => {
        setShouldPlay(true);
      }, 500);
    } else {
      setShouldPlay(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered, shouldPlay]);
  return (
    <div
      key={item._id}
      className='flex justify-center items-center h-[100%] w-[100%] mx-auto group relative hover:scale-110 hover:shadow-[0px_0px_12px_0px_#f7fafc] duration-300 hover:-translate-y-52 aspect-video bg-black'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full h-[150px] ${
          isHovered ? 'opacity-0 hidden' : 'opacity-100 block'
        }`}
      >
        <img
          src={item.img}
          loading='lazy'
          alt='logo'
          className={`duration-500 object-cover w-full h-full ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
      <div
        className={`w-full h-full ${
          isHovered ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}
      >
        <ReactPlayer
          light={true}
          url={item.trailer}
          width='100%'
          height='100%'
          controls={true}
          playing={shouldPlay}
          config={{
            youtube: {
              playerVars: { showinfo: 0 },
            },
          }}
          onReady={() => setShouldPlay(true)}
          onPlay={() => setShouldPlay(true)}
          onPause={() => setShouldPlay(false)}
        />
      </div>
      <div className='w-full opacity-0 hidden bg-main absolute group-hover:opacity-100 group-hover:block top-full left-0 delay-200 duration-300 ease-out'>
        <h3 className='text-center my-2'>{item.title}</h3>
        <ul className='flex justify-center gap-4'>
          <li key={`${item._id}-play`}>
            <Link
              href={{
                pathname: `/video/`,
                query: { id: item._id },
              }}
            >
              <PlayArrowOutlinedIcon />
            </Link>
          </li>
          <li key={`${item._id}-add`}>
            <AddOutlinedIcon />
          </li>
          <li key={`${item._id}-like`}>
            <ThumbUpOutlinedIcon />
          </li>
          <li key={`${item._id}-dislike`}>
            <ThumbDownAltOutlinedIcon />
          </li>
        </ul>
        <p className='text-center text-gray-500 mt-2'>
          1 hour 14 mins | +16 | 1999
        </p>
        <p className='text-center text-ellipsis overflow-hidden mt-2 line-clamp-2'>
          {item.desc}
        </p>
        <p className='text-center mt-2'>{item.genre}</p>
      </div>
    </div>
  );
}

export default Grid;

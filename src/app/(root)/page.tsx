import Slider from '@/components/Slider/Slider';
import getMovieForHome from '@/utils/getMovieForHome';
import getTopComedy from '@/utils/getTopComedy';
import getTopMovies from '@/utils/getTopMovies';
import getTopSeries from '@/utils/getTopSeries';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import { MOVIE } from '@/types/movie';
import { LIST } from '@/types/list';

export const revalidate = 1;

export default async function Home() {
  const [movie, comedy, movies, series]: [MOVIE[], LIST[], LIST[], LIST[]] =
    await Promise.all([
      getMovieForHome(),
      getTopComedy(),
      getTopMovies(),
      getTopSeries(),
    ]);
  const imageUrl = `${movie[0].img}?timestamp=${new Date().getTime()}`;

  return (
    <div className='overflow-hidden'>
      <div
        className='bg-cover bg-center h-screen w-full pt-24 flex justify-center bg-no-repeat'
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className='w-11/12 md:w-10/12 flex items-end h-5/6'>
          <div className='bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 p-10'>
            <h4 className='text-black font-bold text-3xl'>{movie[0].title}</h4>
            <p className='mt-5 max-w-[500px] text-black text-xl'>
              {movie[0].desc}
            </p>

            <div className='flex gap-4 flex-row mt-5'>
              <Button
                variant='contained'
                startIcon={<PlayArrowIcon />}
                sx={{ background: 'white', color: 'black' }}
              >
                Play
              </Button>
              <Button
                variant='contained'
                startIcon={<InfoIcon />}
                sx={{ background: 'gray', color: 'white' }}
              >
                Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=''>
        <h1 className='text-4xl font-bold text-center p-10'>
          {movies[0].title}
        </h1>
        <Slider array={movies[0].content} />
      </div>

      <div className=''>
        <h1 className='text-4xl font-bold text-center p-10'>
          {series[0].title}
        </h1>
        <Slider array={series[0].content} />
        <h6></h6>
      </div>

      <div className=''>
        <h1 className='text-4xl font-bold text-center p-10'>
          {comedy[0].title}
        </h1>
        <Slider array={comedy[0].content} />
        <h6></h6>
      </div>
      {/* Footer */}
      <div className='mt-10'></div>
    </div>
  );
}

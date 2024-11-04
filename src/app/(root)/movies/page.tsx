import Genre from '@/components/Genre';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import getMovieForHome from '@/utils/getMovieForHome';
import getAllMovies from '@/utils/getAllMovies';
import { MOVIE } from '@/types/movie';
import GridSystem from '@/components/GridSystem/GridSystem';
import Link from 'next/link';


export default async function Page() {
  const [movie, allMovies]: [MOVIE[], MOVIE[]] = await Promise.all([
    getMovieForHome(),
    getAllMovies(),
  ]);

  const imageUrl = `${movie[0].img}?timestamp=${new Date().getTime()}`;

  return (
    <div className=''>
      <div
        className='bg-cover bg-center h-screen w-full pt-24 flex justify-center'
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className='w-11/12 md:w-10/12 flex items-start justify-between h-5/6 flex-col'>
          <div className='bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 w-[300px] p-5 shadow-[inset_0px_0px_50px_0px_#f7fafc]'>
            <h3 className='text-black font-bold text-xl mb-2'>Movies</h3>
            <Genre />
          </div>
          <div className='shadow-[inset_0px_0px_50px_0px_#f7fafc] bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 p-10'>
            <h4 className='text-black font-bold text-3xl'>{movie[0].title}</h4>
            <p className='mt-5 max-w-[500px] text-black text-xl'>
              {movie[0].desc}
            </p>

            <div className='flex gap-4 flex-row mt-5'>
              <Link
                href={{
                  pathname: `/video/`,
                  query: { id: movie[0]._id },
                }}
              >
                <Button
                  variant='contained'
                  startIcon={<PlayArrowIcon />}
                  sx={{ background: 'white', color: 'black' }}
                >
                  Play
                </Button>
              </Link>
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
      <h3 className='font-bold text-3xl p-10 text-center'>Movies</h3>
      <GridSystem movies={allMovies} />
    </div>
  );
}

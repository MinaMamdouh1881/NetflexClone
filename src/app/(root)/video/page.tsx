import { MOVIE } from '@/types/movie';
import getMovieById from '@/utils/getMovieById';
export default async function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const movie: MOVIE = await getMovieById(searchParams.id);
  const imageUrl = `${movie.img}?timestamp=${new Date().getTime()}`;

  return (
    <div
      className='bg-cover bg-center h-screen w-full pt-24 flex justify-center items-center'
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
        <video
          src={`${process.env.NEXT_PUBLIC_API_URL}${movie.video}`}
          controls
          className='w-4/5'
        ></video>
    </div>
  );
}

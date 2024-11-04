import { MOVIE } from '@/types/movie';
import Grid from '@/components/GridSystem/Grid';

function GridSystem({ movies }: { movies: MOVIE[] }) {
  return (
    <div className='grid max-sm:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {movies.map((movie) => (
        <Grid key={movie._id} item={movie} />
      ))}
    </div>
  );
}

export default GridSystem;

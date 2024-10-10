import Animation from '@/components/Slider/Animation';
import Slide from '@/components/Slider/Slide';
import { MOVIE } from '@/types/movie';

export default function Slider({ array }: { array: MOVIE[] }) {
  return (
    <Animation>
      {array.map((item) => (
        <Slide item={item} key={item._id} />
      ))}
    </Animation>
  );
}

import { MOVIE } from '@/types/movie';
export type LIST = {
  _id: string;
  title: string;
  type: string;
  genre: string;
  content: MOVIE[];
};

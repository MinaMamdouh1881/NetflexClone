'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Genre() {
  const [genre, setGenre] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const genres = [
    'action',
    'adventure',
    'comedy',
    'crime',
    'fantasy',
    'historical',
    'horror',
    'romance',
    'sci-fi',
    'thriller',
    'western',
    'animation',
    'drama',
    'documentary',
  ];

  useEffect(() => {
    if (pathname === '/movies' || pathname === '/tv-shows') return;
    if (genres.some((genre) => genre === pathname.replace('/movies/', ''))) {
      setGenre(pathname.replace('/movies/', ''));
    } else if (
      genres.some((genre) => genre === pathname.replace('/tv-shows/', ''))
    ) {
      setGenre(pathname.replace('/tv-shows/', ''));
    } else router.push('/404');
  }, []);

  useEffect(() => {
    if (genre) {
      if (pathname.includes('/movies')) router.push(`/movies/${genre}`);
      else if (pathname.includes('/tv-shows'))
        router.push(`/tv-shows/${genre}`);
    }
  }, [genre]);

  const handleChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  return (
    <Box
      sx={{
        maxWidth: 300,
        color: 'white',
        outlineColor: 'white',
        borderColor: 'white',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label' sx={{ color: 'black' }}>
          Genre
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={genre}
          label='genre'
          onChange={handleChange}
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            '& .MuiSvgIcon-root': {
              color: 'black',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
          }}
        >
          {genres.map((genre) => (
            <MenuItem value={genre} key={genre}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

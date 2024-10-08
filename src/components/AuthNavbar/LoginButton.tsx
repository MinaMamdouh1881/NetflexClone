'use client';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useState } from 'react';

function LoginButton() {
  const [path, setPath] = useState(window.location.pathname);

  return (
    <Button
      component={Link}
      href={path.includes('/login') ? '/sign-up' : '/login'}
      variant='contained'
      color='error'
      sx={{ textTransform: 'none', fontWeight: 'bold' }}
      onClick={() =>
        setPath((prev) => (prev === '/login' ? '/sign-up' : '/login'))
      }
    >
      {path.includes('/login') ? 'sign-up' : 'login'}
    </Button>
  );
}

export default LoginButton;

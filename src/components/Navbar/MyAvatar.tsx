'use client';

import Button from '@mui/material/Button';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function MyAvatar() {
  const router = useRouter();
  const logOut = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  return (
    <div>
      <Button id='basic-button' color='error' onClick={logOut}>
        logOut
      </Button>
    </div>
  );
}

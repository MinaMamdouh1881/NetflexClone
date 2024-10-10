'use client';

import login from '@/actions/login';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';
import { loginErrors } from '@/types/loginErrors';

function Page() {
  const [error, formAction] = useFormState(
    login as any,
    undefined as loginErrors | undefined
  );

  return (
    <div className='grow flex justify-center items-center w-full'>
      <div className='bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 rounded-3xl w-96 p-10'>
        <form className='flex flex-col gap-10' action={formAction}>
          <h1 className='text-3xl font-semibold'>Login</h1>
          <TextField
            name='email'
            id='email'
            label='Email'
            variant='outlined'
            fullWidth
            type='text'
            sx={{
              color: 'white',
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-error fieldset': {
                  borderColor: 'error.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
              '& .MuiInputLabel-root.Mui-error': {
                color: 'error.main',
              },
            }}
            autoComplete='off'
            autoCorrect='off'
            error={!!error?.email}
            helperText={error?.email}
          />
          <TextField
            name='password'
            id='password'
            label='Password'
            variant='outlined'
            fullWidth
            type='password'
            sx={{
              color: 'white',
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-error fieldset': {
                  borderColor: 'error.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
              '& .MuiInputLabel-root.Mui-error': {
                color: 'error.main',
              },
            }}
            autoComplete='off'
            error={!!error?.password}
            helperText={error?.password}
          />
          <LoginButton />
        </form>
        {error?.res && (
          <p className='text-red-500 font-semibold text-xl mt-5 text-center'>
            {error?.res}
          </p>
        )}
      </div>
    </div>
  );
}

export default Page;

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      onClick={handleClick}
      aria-disabled={pending}
      variant='contained'
      color='error'
      sx={{ textTransform: 'none', fontWeight: 'bold' }}
      type='submit'
    >
      {pending ? <CircularProgress size={24} color='inherit' /> : 'Login'}
    </Button>
  );
}

import login from '@/actions/login';
import { Button, TextField } from '@mui/material';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

function page({
  searchParams,
}: {
  searchParams: {
    passwordError?: string;
    emailError?: string;
    res?: string;
    success?: string;
  };
}) {
  if (searchParams?.success === 'true') {
    if (cookies().get('token')) {
      redirect('/');
    }
  }
  return (
    <div className='grow flex justify-center items-center w-full'>
      <div className='bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 rounded-3xl w-96 p-10'>
        <form className='flex flex-col gap-10' action={login}>
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
            error={!!searchParams?.emailError}
            helperText={searchParams?.emailError}
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
            error={!!searchParams?.passwordError}
            helperText={searchParams?.passwordError}
          />

          <Button
            variant='contained'
            color='error'
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
            type='submit'
          >
            Login
          </Button>
        </form>
        {searchParams?.res && (
          <p className='text-red-500 font-semibold text-xl mt-5 text-center'>
            {searchParams?.res}
          </p>
        )}
      </div>
    </div>
  );
}

export default page;

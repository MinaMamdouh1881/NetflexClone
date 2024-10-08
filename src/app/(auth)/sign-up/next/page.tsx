import { Button, TextField } from '@mui/material';
import signUp from '@/actions/signup';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

function page({
  searchParams,
}: {
  searchParams: {
    passwordError?: string;
    usernameError?: string;
    success?: string;
  };
}) {
  if (searchParams?.success === 'true') {
    if (cookies().get('token')) {
      redirect('/');
    }
  }
  return (
    <>
      <form
        className='flex flex-col gap-y-5 justify-center w-[95%] md:w-[70%] lg:w-[50%] mt-10'
        action={signUp}
      >
        <div className='flex-1'>
          <TextField
            id='username'
            name='username'
            label='Username'
            variant='filled'
            placeholder='Mina Mamdouh'
            type='text'
            fullWidth
            sx={{
              flexGrow: 1,
              '& .MuiFilledInput-root': {
                color: 'white',
                '&:before': {
                  borderBottom: '2px solid rgba(255, 255, 255)', // الخط قبل الفوكس
                },
                '&:hover:before': {
                  borderBottom: '2px solid rgba(255, 255, 255)', // الخط عند التحويم
                },
                '&:after': {
                  borderBottom: '2px solid white', // الخط بعد الفوكس
                },
                '&.Mui-error fieldset': {
                  borderColor: 'error.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255)', // لون الـlabel قبل الفوكس
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // لون الـlabel بعد الفوكس
              },
              '& .MuiInputLabel-root.Mui-error': {
                color: 'error.main',
              },
            }}
            autoComplete='off'
            error={!!searchParams?.usernameError}
            helperText={searchParams?.usernameError}
          />
        </div>
        <div className='flex-1'>
          <TextField
            id='password'
            label='Password'
            variant='filled'
            placeholder='************'
            type='password'
            name='password'
            fullWidth
            sx={{
              flexGrow: 1,
              '& .MuiFilledInput-root': {
                color: 'white',
                '&:before': {
                  borderBottom: '2px solid rgba(255, 255, 255)', // الخط قبل الفوكس
                },
                '&:hover:before': {
                  borderBottom: '2px solid rgba(255, 255, 255)', // الخط عند التحويم
                },
                '&:after': {
                  borderBottom: '2px solid white', // الخط بعد الفوكس
                },
                '&.Mui-error fieldset': {
                  borderColor: 'error.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255)',
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
        </div>
        <Button
          variant='contained'
          color='error'
          type='submit'
          sx={{ textTransform: 'none', fontWeight: 'bold', p: 1, flexGrow: 1 }}
        >
          Start
        </Button>
      </form>
    </>
  );
}

export default page;

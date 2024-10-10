'use client';
import { Button, CircularProgress, TextField } from '@mui/material';
import signUp from '@/actions/signup';
import { useFormState, useFormStatus } from 'react-dom';
import { signUpErrors } from '@/types/signUpErrors';

function page() {
  const [error, formAction, isPending] = useFormState(
    signUp as any,
    undefined as signUpErrors | undefined
  );

  console.log(isPending);

  return (
    <>
      <form
        className='flex flex-col gap-y-5 justify-center w-[95%] md:w-[70%] lg:w-[50%] mt-10'
        action={formAction}
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
            error={!!error?.username}
            helperText={error?.username}
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
            error={!!error?.password}
            helperText={error?.password}
          />
        </div>
        <SignUpButton />
      </form>
    </>
  );
}

export default page;

function SignUpButton() {
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
      {pending ? <CircularProgress size={24} color='inherit' /> : 'Start'}
    </Button>
  );
}

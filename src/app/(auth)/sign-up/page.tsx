import signUpFirst from '@/actions/signupFirst';
import { Button, TextField } from '@mui/material';
import { cookies } from 'next/headers';

function page({
  searchParams,
}: {
  searchParams?: { error?: string; res?: string };
}) {
  return (
    <form className='flex flex-col' action={signUpFirst}>
      <div className='grid grid-cols-5 w-[500px]'>
        <div className='col-span-4'>
          <TextField
            id='email'
            label='Email'
            variant='filled'
            placeholder='mina@gmail.com'
            name='email'
            fullWidth
            sx={{
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
            error={!!searchParams?.error || !!searchParams?.res}
            helperText={searchParams?.error}
            defaultValue={cookies().get('email')?.value || ''}
          />
        </div>
        <Button
          variant='contained'
          color='error'
          type='submit'
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}
        >
          Get Started
        </Button>
      </div>
      {searchParams?.res && (
        <p className='text-red-500 font-semibold text-xl mt-5'>
          {searchParams?.res}
        </p>
      )}
    </form>
  );
}

export default page;

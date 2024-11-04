import { CircularProgress } from '@mui/material';

function loading() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <h1 className='text-5xl text-red-500 tracking-widest'>
        L<CircularProgress className='text-red-500 mx-2' size={25} />
        ading
      </h1>
    </div>
  );
}

export default loading;

import { Skeleton } from '@mui/material';
export default function () {
  return (
    <div className='h-screen w-full pt-24 flex justify-center'>
      <div className='w-11/12 md:w-10/12 flex items-start justify-between h-5/6 flex-col'>
        <div className='w-[300px] p-5'>
          <Skeleton
            variant='text'
            width={120}
            height={32}
            sx={{ bgcolor: 'grey.900' }}
          />
          <Skeleton
            variant='rectangular'
            width={300}
            height={200}
            sx={{ bgcolor: 'grey.900' }}
          />
        </div>
        <div className='p-10'>
          <Skeleton
            variant='text'
            width={240}
            height={40}
            sx={{ bgcolor: 'grey.900' }}
          />
          <Skeleton
            variant='text'
            width={500}
            height={80}
            sx={{ bgcolor: 'grey.900' }}
          />
          <div className='flex gap-4 flex-row mt-5'>
            <Skeleton
              variant='rectangular'
              width={100}
              height={36}
              sx={{ bgcolor: 'grey.900' }}
            />
            <Skeleton
              variant='rectangular'
              width={100}
              height={36}
              sx={{ bgcolor: 'grey.900' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

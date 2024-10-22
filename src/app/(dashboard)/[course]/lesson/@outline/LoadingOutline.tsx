import React from 'react';

const LoadingOutline = () => {
  return (
    <div>
      <div className='h-3 w-full rounded-full mb-2 skeleton'></div>
      <div className='flex flex-col gap-5'>
        <div className='skeleton w-full h-15 rounded-lg'></div>
        <div className='skeleton w-full h-15 rounded-lg'></div>
      </div>
    </div>
  );
};

export default LoadingOutline;

import React from 'react';
import { BiBell } from 'react-icons/bi';
import { PiQuestionMarkBold, PiQuestionMarkFill } from 'react-icons/pi';

function InteractiviyComponent() {
  return (
    <section className='flex flex-row space-x-4'>
      <div className='flex items-center space-x-4 text-black-1'>
        <PiQuestionMarkBold className='w-6 h-6' />
      </div>
      <div className='flex items-center space-x-4 text-black-1'>
        <BiBell className='w-6 h-6' />
      </div>
    </section>
  );
}

export default InteractiviyComponent;

import React from 'react';

interface ISpeechGenerator {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextInput = ({ onChange }: ISpeechGenerator) => {
  return (
    <div className='text-wrapper'>
      <div className='text'>
        <textarea
          className='text-input scroll'
          placeholder='Describe what you want to generate.'
          onChange={onChange}
        />
      </div>
    </div>
  );
};

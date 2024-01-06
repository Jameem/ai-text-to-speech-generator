import React, { useState } from 'react';
import OpenAI from 'openai';

import './styles.css';
import { TextInput } from './TextInput';
import { Footer } from '../Footer';
import { Loader } from '../Loader';
import { SelectVoice, VoiceType } from './SelectVoice';
import { Header } from '../Header';

const gibberish = require('gibberish-detective')({ useCache: false });
const badWordsFilter = require('bad-words');

const filter = new badWordsFilter();
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const AppContainer = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState<VoiceType>('alloy');
  const [audio, setAudio] = useState<string | undefined>();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const onClickGenerate = async () => {
    if (!text) {
      setError('Please enter a meaningful text!');
      return;
    }

    if (gibberish.detect(text)) {
      setError('Please enter a meaningful text!');
      return;
    }

    if (filter.isProfane(text)) {
      setError('Please use profane language!');
      return;
    }

    setGenerating(true);
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice,
      input: text,
    });
    const blob = await mp3.blob();
    const url = URL.createObjectURL(blob);

    setAudio(url);
    setGenerating(false);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError('');
    setText(e.target.value);
  };

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVoice(e.target.value as VoiceType);
  };

  return (
    <div className='app-wrapper'>
      <Header />
      <TextInput onChange={onChangeText} />
      <SelectVoice onChangeType={onChangeType} />
      <Loader isGenerating={generating} />
      {audio && <audio controls autoPlay src={audio} className='audio' />}
      {error && <div className='error'>{error}</div>}
      <button
        className='button'
        disabled={!text || generating}
        onClick={onClickGenerate}
      >
        Generate Audio
      </button>

      <Footer />
    </div>
  );
};

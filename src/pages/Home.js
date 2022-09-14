import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState('');
  const onTextChange = ev => {
    // console.log(ev);
    setInput(ev.target.value);
    // console.log(input);
  };
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(response => {
        return response.json();
      })
      .then(finalResponse => {
        console.log(finalResponse);
      });
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onTextChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {/* when i press the input key on the input element then onKeyDown event will fire */}
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;

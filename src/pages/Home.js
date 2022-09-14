import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';
const Home = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const onTextChange = ev => {
    // console.log(ev);
    setInput(ev.target.value);
    // console.log(input);
  };
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/shows?q=${input}`).then(res => {
      setResult(res);
    });
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const renderResults = () => {
    if (result && result.length === 0) {
      return <div>No Result </div>;
    }
    if (result && result.length > 0) {
      return (
        <div>
          {result.map(item => {
            return <div key={item.id}>{item.show.name}</div>;
          })}
        </div>
      );
    }
    return null;
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
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;

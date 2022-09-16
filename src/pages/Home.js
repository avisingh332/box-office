import React, { useState } from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import { apiGet } from '../misc/config';
const Home = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShow = searchOption === 'shows';

  const onTextChange = ev => {
    // console.log(ev);
    setInput(ev.target.value);
    // console.log(input);
  };
  const onRadioChange = ev => {
    // console.log(ev);
    setResult(null);
    setSearchOption(ev.target.value);
  };
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${input}`).then(res => {
      setResult(res);
      console.log(res);
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
      if (searchOption === 'people') {
        return <ActorGrid data={result} />;
      }
      return <ShowGrid data={result} />;
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
        placeholder="Shows/Actors"
      />
      {/* when i press the input key on the input element then onKeyDown event will fire */}
      <button type="button" onClick={onSearch}>
        Search
      </button>
      <div>
        <label>
          Shows
          <input
            type="radio"
            value="shows"
            name="shows"
            onChange={onRadioChange}
            checked={isShow}
          />
        </label>
        <label htmlFor="">
          People
          <input
            type="radio"
            value="people"
            name="people"
            onChange={onRadioChange}
            checked={!isShow}
          />
        </label>
      </div>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;

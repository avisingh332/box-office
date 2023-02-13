import React, { useState } from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';
const Home = () => {
  const [input, setInput] = useLastQuery('lastQuery');
  const [result, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShow = searchOption === 'shows';
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${input}`).then(res => {
      setResult(res);
      // console.log(res);
    });
  };
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
      <SearchInput
        type="text"
        onChange={onTextChange}
        onKeyDown={onKeyDown}
        value={input}
        placeholder="Shows/Actors"
      />
      {/* when i press the input key on the input element then onKeyDown event will fire */}

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="search_option_show"
            value="shows"
            onChange={onRadioChange}
            checked={isShow}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="search_option_people"
            value="people"
            onChange={onRadioChange}
            checked={!isShow}
          />
        </div>
        {/* <label htmlFor="search_option_show">
          Shows
          <input
            id="search_option_show"
            type="radio"
            value="shows"
            name="shows"
            onChange={onRadioChange}
            checked={isShow}
          />
        </label> */}
        {/* <label htmlFor="search_option_people">
          People
          <input
            id="search_option_people"
            type="radio"
            value="people"
            name="people"
            onChange={onRadioChange}
            checked={!isShow}
          />
        </label> */}
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;

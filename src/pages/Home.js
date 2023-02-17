import React, { useCallback, useState } from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery, useWhyDidYouUpdate } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const renderResults = result => {
  if (result && result.length === 0) {
    return <div>No Result </div>;
  }
  if (result && result.length > 0) {
    console.log('Result Rendered');
    if (result[0].person) {
      return <ActorGrid data={result} />;
    }
    return <ShowGrid data={result} />;
  }
  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery('lastQuery');
  const [result, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShow = searchOption === 'shows';
  //  on search has dependecy of input which changes on every character change in the search bar
  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${input}`).then(res => {
      setResult(res);
      // console.log(res);
    });
  };
  const onTextChange = useCallback(
    ev => {
      // console.log(ev);
      setInput(ev.target.value);
      // console.log(input);
    },
    [setInput]
  );
  const onRadioChange = useCallback(ev => {
    // console.log(ev);
    setResult(null);
    setSearchOption(ev.target.value);
  }, []);
  //We need not to put onKeyDown into useCallback because onSearch will be executed
  //every time onKeyDown is executed

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  useWhyDidYouUpdate('Home', { renderResults });

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
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(result)}
    </MainPageLayout>
  );
};

export default Home;

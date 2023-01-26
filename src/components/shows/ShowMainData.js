import React from 'react';
// import { Star } from '../styled';
import IMG_PLACEHOLDER from '../../images/not-found.png';
import { MainDataWrapper, TagList } from './ShowMainData.styled';
// name, rating,       Headline,
const ShowMainData = ({ summary, tags, image }) => {
  return (
    <MainDataWrapper>
      <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
      <div className="text-side">
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
        {/* <div>{summary}</div>  */}
        {/*  if you include above line then this line will display the <p/> tag along with the text so  
        for this we need to dangerouslySetInnerHTML which accepts a object with key as __html and value as the html element  */}

        <div>
          Tags:{' '}
          <TagList>
            {tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </TagList>
        </div>
      </div>
    </MainDataWrapper>
  );
};

export default ShowMainData;

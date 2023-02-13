import FadeIn from 'react-fade-in';
import styled from 'styled-components';

const FlexGrid = styled(FadeIn)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SearchCard = styled.div`
  width: 300px;
  height: 100%;
  margin: 0 15px 40px;

  .img-wrapper {
    width: 100%;
    border-radius: 40px;
    height: 420px;
    overflow: hidden;
    border: 1px solid #ddd;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  h1 {
    margin: 10px 0;
    font-size: 21px;
  }

  p {
    margin: 0;
  }
`;
// for setting style dynamically we use ${ }syntax which recieves a callback function with props as argument
// for Ex we use for background color in below case
const Star = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: ${props => {
    return props.active ? '#ffc806' : '#F8EDE3';
  }};
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
`;

export { FlexGrid, SearchCard, Star };

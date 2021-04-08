import React from 'react';
import styled from 'styled-components';
import CoinInfo from './components/CoinInfo';
import './App.css';

const Title = styled.h1`
  text-size: 1.5em,
  align-text: center
`;

function App() {

  return (
    <div className="App">
      <Title>Crypto Currency</Title>
      <CoinInfo></CoinInfo>
    </div>
  );
}


export default App;

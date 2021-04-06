import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import CoinInfo from './components/CoinInfo';
import { Title } from './components/styles'
import './App.css';

function App() {
  const coinData = useSelector(
    (state: CoinTableData) => state, shallowEqual
  );
  
  const individualData = coinData.data.filter(coin => {
    return coin.id === coinData.individual;
  });
  return (
    <div className="App">
      <Title>Crypto Currency</Title>

      { coinData.viewIndividual ? 
      console.log(individualData)
      : <CoinInfo />}
    </div>
  );
}


export default App;

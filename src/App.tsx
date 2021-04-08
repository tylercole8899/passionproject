import { useState } from 'react';
import CoinTable from './components/CoinTable';
import CoinData from './components/CoinData';
import { Title } from './components/styles';
import './App.css';

function App() {
  const [coinID, setCoinID] = useState("");
  
  return (
    <div className="App">
      <Title>Crypto Currency</Title>

      { coinID !== "" ? 
      <CoinData coin={coinID} showIndividual={ setCoinID }/>
      : <CoinTable showIndividual={ setCoinID }/>}
    </div>
  );
}


export default App;

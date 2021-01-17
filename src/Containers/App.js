import React from 'react';
import '../App.css';
import SearchComponent from './Search'
import ChartComponent from './Chart'

const App = () => {
  return(
    <div className="App">
      <SearchComponent />
      <ChartComponent />
    </div>
  )
}

export default App

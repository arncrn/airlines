import React from 'react';
import './App.css';
import flightData, {getAirlineById, getAirportByCode} from './data';
import Table from './components/Table';



const App = () => {
  

  const formatValue = (property, value) => {
    switch(property) {
      case 'airline': return getAirlineById(value).name;
      case 'src': return getAirportByCode(value).name;
      case 'dest': return getAirportByCode(value).name;
      default: return '';
    }
  }

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'}
  ];

  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <p>
        Welcome to the app!
      </p>
      <Table 
        className="routes-table" 
        columns={columns}
        rows={flightData.routes}
        format={formatValue}
      />
    </section>
  </div>
  )
}

export default App;


// flightData.routes
// flightData.airlines
// flightData.airports
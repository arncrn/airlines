import React, {useState} from 'react';
import './App.css';
import flightData, {getAirlineById, getAirportByCode} from './data';
import Table from './components/Table';
import Select from './components/Select';

const App = () => {
  const [filterForAirlines, setFilterForAirlines] = useState('');
  const [filterForAirports, setFilterForAirports] = useState('');

  const clearFilters = () => {
    setFilterForAirlines('')
    setFilterForAirports('')
  }

  const formatValue = (property, value) => {
    switch(property) {
      case 'airline': return getAirlineById(value).name;
      case 'src': return getAirportByCode(value).name;
      case 'dest': return getAirportByCode(value).name;
      default: return '';
    }
  }

  const filterAirlineOptions = (event) => {
    setFilterForAirlines(event.target.value)
  }

  const filterAirportOptions = (event) => {
    setFilterForAirports(event.target.value)
  }

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'}
  ];

  const rows = flightData.routes.filter(route => {
    let correctAirline = formatValue('airline', route.airline).includes(filterForAirlines)
    let correctSourceAirport = formatValue('src', route.src).includes(filterForAirports)
    let correctDesitnationAirport = formatValue('dest', route.dest).includes(filterForAirports)

    return correctAirline && (correctSourceAirport || correctDesitnationAirport)
  })

  const getAvailableAirportCodes = () => {
    let airportCodes = {};
    rows.forEach(row => {
      if (!airportCodes[row.src]) airportCodes[row.src] = true;
      if (!airportCodes[row.dest]) airportCodes[row.dest] = true;
    })

    return Object.keys(airportCodes);
  }

  const getAvailableAirlineIds = () => {
    let airlineIds = {};
    rows.forEach(row => {
      if (!airlineIds[row.airline]) airlineIds[row.airline] = true;
    })
    return Object.keys(airlineIds);
  }

  let availableAirportCodes = getAvailableAirportCodes();
  let availableAirlineIds = getAvailableAirlineIds();

  const filteredAirlines = flightData.airlines.filter(airline => {
    return availableAirlineIds.includes(airline.id.toString())
  })

  const filteredAirports = flightData.airports.filter(airport => {
    return availableAirportCodes.includes(airport.code)
  })

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        Show routes on 
        <Select 
          options={filteredAirlines}
          rawOptions={flightData.airlines}
          valueKey="id"
          titleKey="name"
          allTitle="All Airlines"
          value={filterForAirlines}
          onSelect={filterAirlineOptions}
        />
        Flying in or out of
        <Select 
          options={filteredAirports}
          rawOptions={flightData.airports}
          valueKey="id"
          titleKey="name"
          allTitle="All Airports"
          value={filterForAirports}
          onSelect={filterAirportOptions}
        />
        <button 
          disabled={!filterForAirlines && !filterForAirports}
          onClick={clearFilters}
        >
          Show All Routes
        </button>
        <Table 
          className="routes-table" 
          columns={columns}
          rows={rows}
          format={formatValue}
        />
      </section>
    </div>
  )
}

export default App;
import React from 'react';
import './App.css';
import flightData from './data'

const keyGenerator = () => {
  return Math.ceil(Math.random() * 100000000);
}

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <p>
      Welcome to the app!
    </p>
    <table>
      <thead>
        <tr>
        <th>Airline</th>
        <th>Source</th>
        <th>Desinitation</th>
        </tr>
      </thead>
      <tbody>
        {flightData.routes.map((route, idx) => {
          return (
            <tr key={keyGenerator()}>
              <td>{route.airline}</td>
              <td>{route.src}</td>
              <td>{route.dest}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </section>
</div>
)

export default App;


// flightData.routes
// flightData.airlines
// flightData.airports
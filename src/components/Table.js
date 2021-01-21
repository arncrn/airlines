import React, {useState} from 'react';

const Table = ({rows, columns, format}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [routesPerPage, setRoutesPerPage] = useState(25)

  const keyGenerator = () => {
    return Math.ceil(Math.random() * 100000000);
  }

  const generateRoute = (route) => {
    let formattedRoute = columns.map(column => {
      return <td key={keyGenerator()}>{format(column.property, route[column.property])}</td>
    });

    return formattedRoute;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
          {columns.map(column => {
            return <th key={keyGenerator()}>{column.name}</th>
          })}
          </tr>
        </thead>
        <tbody>
          {rows.slice(currentPage, routesPerPage).map(route => {
            return (
              <tr key={keyGenerator()}>
                {generateRoute(route)}
              </tr>
            )
          })}
        </tbody>
      </table>
      <p>{`Showing ${currentPage + 1}-${(currentPage + 1) * routesPerPage} of ${rows.length} routes.`}</p>
    </div>
  )
}

export default Table;
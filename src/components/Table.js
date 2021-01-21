import React, {useState} from 'react';

const Table = ({rows, columns, format}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage, setPerPage] = useState(25)

  const keyGenerator = () => {
    return Math.ceil(Math.random() * 100000000);
  }

  const generateRoute = (route) => {
    let formattedRoute = columns.map(column => {
      return <td key={keyGenerator()}>{format(column.property, route[column.property])}</td>
    });

    return formattedRoute;
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const setRouteRange = () => {
    let start = currentPage * perPage;
    let end = (currentPage + 1) * perPage;
    return [start, end]
  }

  const routeRange = setRouteRange()

  return (
    <div>
      <table className="routes-table">
        <thead>
          <tr>
          {columns.map(column => {
            return <th key={keyGenerator()}>{column.name}</th>
          })}
          </tr>
        </thead>
        <tbody>
          {rows.slice(routeRange[0], routeRange[1]).map(route => {
            return (
              <tr key={keyGenerator()}>
                {generateRoute(route)}
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <div>
      <p>{`Showing ${routeRange[0] + 1}-${routeRange[1]} of ${rows.length} routes.`}</p>
        <p>
          <button 
            onClick={previousPage} 
            disabled={routeRange[0] <= 0}
          >
            Previous Page
          </button>
          <button 
            onClick={nextPage}
            disabled={routeRange[1] >= rows.length}
          >
            Next Page
          </button>
        </p>
      </div>
    </div>
  )
}

export default Table;
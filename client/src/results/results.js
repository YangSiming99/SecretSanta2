import React from 'react';

const Results = ({results}) => {

  console.log(results)
  return ( 
    <div>
      <h1>Your Gifts Go To</h1>
      <div>
        {
        results.map((val, key) => (<h2 key={key}>{val}</h2>))
        }
      </div>
    </div>
   );
}
 
export default Results;
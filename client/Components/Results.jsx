import React from 'react'

const Results = ({results}) => {
  //results is an array of strings that needs to be rendered into html
  //pushed into another array as html elements with classes for css control
  const titles = []
  for (let i = 0; i < results.length; i ++) {
    titles.push(<p className="titles">{results[i]}</p>)
  }
  //contained by div for css control and spread as collection in react
  return ( 
    <div id="results">
      {titles}
    </div>
   );
}
 
export default Results;
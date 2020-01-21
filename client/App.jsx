import React, { useState, useEffect } from 'react'
import Results from './Components/Results.jsx'
import { connect } from 'react-redux'
import * as actions from './actions/actions'
import useDebounce from './utils/debounce.js'
import './styles.css'

//reference library reducer that holds state for search text and state of fetch
const mapStateToProps = ({
  library: { search, searching }
}) => {
  return {
    search,
    searching
  }
}

//to dispatch actions to affect state
const mapDispatchToProps = dispatch => ({
  setSearch: (event) => {
    //event.target.value targets the input element this is attached to
    dispatch(actions.setSearch(event.target.value))
  },
  //input is used to explicitly state booleans later
  setSearching: (input) => {
    dispatch(actions.setSearching(input))
  }
})

const App = (props) => {
  //despite using redux, React hook was used here to showcase local state use in functional components
  const [result, setResult] = useState([])
  //referencing debounce function and initializing with wait-time
  const debouncedSearchTerm = useDebounce(props.search, 1000);

  const searchBooks = (search) => {
    const replaced = search.replace(/ /g, '+')
    const query = `/book?title=${replaced}`
    return fetch(query)
    .then(results => results.json())
    .catch(err => console.log(err))
  }

  //lifecycle method hook to begin fetch request
  useEffect(
    () => {
      //if debounced function is fired
      if (debouncedSearchTerm) {
        //set user feedback that shows the fetch is working to true
        props.setSearching(true);
        //run function that actually makes the fetch request then store results in state
        searchBooks(debouncedSearchTerm).then(results => {
          props.setSearching(false);
          setResult(results);
        });
      } else {
        setResult([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );



  return ( 
    <div id="main">
      <h1>Open Library API search engine</h1>
      <input type="text" id="searchbar" placeholder="Search Title Here" value={props.search} onChange={(e) => {
        props.setSearch(e)}}/>
      {props.searching ? <h2>Searching...</h2> : <Results results={result}/>}
    </div>
   );
}
 
//functions connected for redux
export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import findBestMatch from './functions/findBestMatch';

function App() {
  const [movies, setMovies] = useState<number[]>([])
  const [viewers, setNumberOfViewers] = useState<number>(2)
  const [results, setResults] = useState([]);
  useEffect(() => {
    findBestMatch([121]).then(res => {
      console.log(res)
      setResults(res.results)
    })
  }, [])

  return (
    <div className="App">
      <SearchBar />
      <h2>Doporučení</h2>
      <ul>
        {results.map((movie: any) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

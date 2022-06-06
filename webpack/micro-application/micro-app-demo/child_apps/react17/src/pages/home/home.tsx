import React from 'react';
import './home.css';

function Home () {
  return (
    <div className="App">
      <header className="App-header">
      <h1>微前端</h1>
        <p>
          子应用 -- react@{React.version}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;

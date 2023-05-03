import logo from './logo.svg';
import './App.css';
import { Button, Space } from 'antd';
import BookTables from "./components/BookTables";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p >
          The best books in 2010
          {/*Edit <code>src/App.js</code> and save to reload.*/}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
          <BookTables/>
        <Login/>
        <Space wrap>
        </Space>
      </header>
    </div>
  );
}


export default App;

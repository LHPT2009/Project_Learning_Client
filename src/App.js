import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { selectAllUser } from './features/Users/usersSlice';

function App() {
  const users = useSelector(selectAllUser);
  console.log(users);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type="primary">Button From Ant Design</Button>

        <hr />
        <h3>Example about Redux</h3>
        {users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </header>
    </div>
  );
}

export default App;

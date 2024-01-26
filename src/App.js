import NotFound from 'screen/NotFound';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Booking from 'screen/Booking';
import HomePage from 'screen/HomePage';
import Search from 'screen/Search';
import History from 'screen/History';
import ListDoctor from 'screen/ListDoctor';
import Success from 'screen/Success';
import Layout from './component/layout/Layout';

function App() {
  return (
    <div className="App" style={{ height: '100vh', background: '#111', position: 'relative' }}>
      <Routes>
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/search" element={<Search />} />
                <Route path="/list" element={<ListDoctor />} />
                <Route path="/history" element={<History />} />
                <Route path="/success" element={<Success />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

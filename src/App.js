import NotFound from 'screen/NotFound';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Booking from './screen/Booking';
import HomePage from './screen/HomePage';
import Search from './screen/Search';
import History from './screen/History';
import ListDoctor from './screen/ListDoctor';
import Success from './screen/Success';
import Layout from './component/layout/Layout';
import LoginUser from 'screen/LoginUser';
import Register from 'screen/Register';
import ForgotPassword from 'screen/ForgotPassword';
import Reset from 'screen/Reset';
import UserDetail from 'screen/UserDetail';

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
                <Route path="/history/:id" element={<History />} />
                <Route path="/success/:statuspayment" element={<Success />} />
                <Route path="/login" element={<LoginUser />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/reset/auth/new-password" element={<Reset />} />
                <Route path="/userdetail" element={<UserDetail />} />
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

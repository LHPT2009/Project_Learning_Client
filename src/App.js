import NotFound from 'features/Client/NotFound';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Booking from './features/Booking/Booking';
import HomePage from './features/Client/HomePage';
import History from './features/Client/History';
import ListDoctor from './features/Doctor/ListDoctor';
import Success from './features/Client/Success';
import Layout from './component/layout/Layout';
import LoginUser from 'features/Client/LoginUser';
import Register from 'features/Client/Register';
import ForgotPassword from 'features/Client/ForgotPassword';
import Reset from 'features/Client/Reset';
import UserDetail from 'features/Client/UserDetail';
import ChangePassword from 'features/Client/ChangePassword';
import ListSpecialists from 'features/Specialist/ListSpecialists';
import { ROUTER } from './constants';
function App() {
  return (
    <div className="App" style={{ height: '100vh', background: '#111', position: 'relative' }}>
      <Routes>
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path={`${ROUTER.HOMEPAGE}`} element={<HomePage />} />
                <Route path={`${ROUTER.BOOKING}`} element={<Booking />} />
                <Route path={`${ROUTER.LIST}`} element={<ListDoctor />} />
                <Route path={`${ROUTER.SPECIALISTS}`} element={<ListSpecialists />} />
                <Route path={`${ROUTER.HISTORY}`} element={<History />} />
                <Route path={`${ROUTER.SUCCESS}`} element={<Success />} />
                <Route path={`${ROUTER.LOGIN}`} element={<LoginUser />} />
                <Route path={`${ROUTER.REGISTER}`} element={<Register />} />
                <Route path={`${ROUTER.FORGOT}`} element={<ForgotPassword />} />
                <Route path={`${ROUTER.RESET}`} element={<Reset />} />
                <Route path={`${ROUTER.CHANGEPASS}`} element={<ChangePassword />} />
                <Route path={`${ROUTER.USERDETAIL}`} element={<UserDetail />} />
                <Route path={`${ROUTER.NOTFOUND}`} element={<NotFound />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

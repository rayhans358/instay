import './App.css'
import { Route, Routes } from 'react-router-dom';
import { configClient } from './services/configClient';
import Home from './pages/Home/Home';
import Layout from './components/Utils/Layout';
import axios from 'axios';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { UserContextProvider } from './services/context/UserContext';
import ProfilePage from './pages/Profile/ProfilePage';
import PlacesPage from './pages/Place/PlacesPage';
import PlacesForm from './components/Places/Form/PlacesForm';
import DetailPlace from './components/Places/Detail/DetailPlace';
import BookingsPage from './pages/Booking/BookingsPage';
import DetailBooking from './components/Bookings/Detail/DetailBooking';

axios.defaults.baseURL = configClient.api_base_url;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/edit/:id" element={<PlacesForm />} />
          <Route path="/place/detail/:id" element={<DetailPlace />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/detail/:id" element={<DetailBooking />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/auth';
import PrivateRoute from './components/Auth/PrivateRoute';
import Layout from './components/Layout/Layout';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserPage from './pages/UserPage';
import OrganizationPage from './pages/OrganizationPage';
import AnonymousPage from './pages/InspiringStories';
import DonateNowPage from './pages/DonateNowPage';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import AddCampaign from './pages/AddCampaign';
import ContactUsPage from './pages/ContactUsPage';
import InspiringStories from './pages/InspiringStories';
import FAQPage from './pages/FAQPage'; // Importer la nouvelle page FAQ
import Settings from "./pages/Settings";





function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/faq" element={<FAQPage />} /> 
            <Route path="/org" element={<PrivateRoute allowedRoles={['org']}><OrganizationPage /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-campaign" element={<AddCampaign />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/anon" element={<PrivateRoute allowedRoles={['anon']}><AnonymousPage /></PrivateRoute>} />
            <Route path="/inspiring-stories/:id" element={<InspiringStories />} />
            <Route path="/donate" element={<PrivateRoute><DonateNowPage /></PrivateRoute>} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
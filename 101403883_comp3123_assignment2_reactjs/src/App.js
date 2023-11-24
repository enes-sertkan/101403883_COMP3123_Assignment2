import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './style.css';


// Import your components here
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import ViewEmployeePage from './pages/ViewEmployeePage';
import DeleteEmployeePage from './pages/DeleteEmployeePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-employee" element={<AddEmployeePage />} />
          <Route path="/edit-employee/:id" element={<EditEmployeePage />} />
          <Route path="/view-employee/:id" element={<ViewEmployeePage />} />
          <Route path="/delete-employee/:id" element={<DeleteEmployeePage />} />
          {/* You can add more routes here as your application grows */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

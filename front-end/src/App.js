import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeDetails from './pages/EmployeeDetails';
import Employee from './pages/Employee';
import PrivateRoute from './pages/PrivateRoute.jsx';
import './pages/style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/employee_detail/:id' element={<EmployeeDetails />} />

        {/* Dashboard as a parent route */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          {/* Nested routes within dashboard */}
          <Route index element={<Employee />} />
          <Route path='add_employee' element={<AddEmployee />} /> {/* Removed 'dashboard/' */}
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} /> {/* Removed 'dashboard/' */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

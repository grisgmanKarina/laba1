import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EmployeeAPI from './api/service';
import Table from './Table';
import AddEmployeeForm from './AddEmployeeForm';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

function App() {
  const [employees, setEmployees] = useState(EmployeeAPI.all());

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const removeEmployee = (indexToRemove) => {
    setEmployees(employees.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Колл-центр</Link> | <Link to="/add">Добавить</Link> | <Link to="/login">Вход</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Table employees={employees} onRemove={removeEmployee} />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddEmployeeForm onAdd={addEmployee} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

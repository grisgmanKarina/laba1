import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EmployeeAPI from './api/service';
import Table from './Table';
import AddEmployeeForm from './AddEmployeeForm';

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
          <Link to="/">Колл-центр</Link> | <Link to="/add">Добавить</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Table employees={employees} onRemove={removeEmployee} />} />
          <Route path="/add" element={<AddEmployeeForm onAdd={addEmployee} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

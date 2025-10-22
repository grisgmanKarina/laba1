import React, { useState } from 'react';
import './App.css';
import EmployeeAPI from './api/service';
import Table from './Table';

function App() {
  const [employees, setEmployees] = useState(EmployeeAPI.all());
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addEmployee = () => {
    if (name.trim() === '' || phone.trim() === '') return;
    const newEmployee = { name, phone };
    setEmployees([...employees, newEmployee]);
    setName('');
    setPhone('');
  };

  const removeEmployee = (indexToRemove) => {
    setEmployees(employees.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="App">
      <h2>Колл-центр</h2>
      <div>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Контактный номер"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={addEmployee}>Добавить</button>
      </div>
      <Table employees={employees} onRemove={removeEmployee} />
    </div>
  );
}

export default App;

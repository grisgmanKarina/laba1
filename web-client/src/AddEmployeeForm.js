import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployeeForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim() === '' || phone.trim() === '') return;
    onAdd({ name, phone });
    navigate('/');
  };

  return (
    <div>
      <h2>Добавить сотрудника</h2>
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
      <button onClick={handleSubmit}>Добавить</button>
    </div>
  );
};

export default AddEmployeeForm;

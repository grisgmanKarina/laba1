import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AddEmployeeForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    const newEmployee = { name: trimmedName, phone: phone.trim() };
    if (typeof onAdd === 'function') onAdd(newEmployee);
    setName('');
    setPhone('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
      <TextField label="Имя сотрудника" value={name} onChange={(e) => setName(e.target.value)} size="small" required />
      <TextField label="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} size="small" />
      <Button type="submit" variant="contained">Добавить</Button>
    </Box>
  );
};

export default AddEmployeeForm;

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AddEmployeeForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    // Проверка: оба поля должны быть заполнены
    if (!trimmedName || !trimmedPhone) {
      setError('Заполните все поля');
      return;
    }

    // Проверка имени: только буквы и пробелы
    if (!/^[А-Яа-яA-Za-z\s]+$/.test(trimmedName)) {
      setError('Имя должно содержать только буквы');
      return;
    }

    // Проверка телефона: только цифры, длина 5–15
    if (!/^\d{5,15}$/.test(trimmedPhone)) {
      setError('Телефон должен содержать только цифры (5–15 знаков)');
      return;
    }

    const newEmployee = { name: trimmedName, phone: trimmedPhone };

    if (typeof onAdd === 'function') onAdd(newEmployee);

    setName('');
    setPhone('');
    setError('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}
    >
      <TextField
        label="Имя сотрудника"
        value={name}
        onChange={(e) => { setName(e.target.value); setError(''); }}
        size="small"
        required
      />

      <TextField
        label="Телефон"
        value={phone}
        onChange={(e) => { setPhone(e.target.value); setError(''); }}
        size="small"
        required
      />

      <Button type="submit" variant="contained">Добавить</Button>

      {error && <Typography color="error" variant="body2">{error}</Typography>}
    </Box>
  );
};

export default AddEmployeeForm;

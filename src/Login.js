import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@mui/material';

function Login() {
  // состояния для логина, пароля и ошибки
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // обработчик входа
  const handleLogin = () => {
    // проверка: оба поля должны быть заполнены
    if (!username || !password) {
      setError('Введите логин и пароль');
      return;
    }

    // проверка: пароль не короче 4 символов
    if (password.length < 4) {
      setError('Пароль должен быть не короче 4 символов');
      return;
    }

    // если всё хорошо,то сохраняем авторизацию и переходим на главную
    localStorage.setItem('auth', 'true');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
      <Paper elevation={3} style={{ padding: 30, width: 300 }}>
        <Typography variant="h6" gutterBottom>Вход в систему</Typography>

        {}
        <TextField
          label="Логин"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {}
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {}
        {error && <Typography color="error" variant="body2">{error}</Typography>}

        {}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: 16 }}
        >
          Войти
        </Button>
      </Paper>
    </div>
  );
}

export default Login;

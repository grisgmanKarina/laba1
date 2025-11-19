import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    
    if (username && password) {
      localStorage.setItem('auth', 'true');
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
      <Paper elevation={3} style={{ padding: 30, width: 300 }}>
        <Typography variant="h6" gutterBottom>
          Вход в систему
        </Typography>
        <TextField
          label="Логин"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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

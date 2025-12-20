import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Redux: подключаем хранилище и провайдер
import { Provider } from 'react-redux';
import store from './store';

// React Router: для маршрутизации
import { BrowserRouter } from 'react-router-dom';

// Material UI: тема и сброс стилей
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function Root() {
  // Состояние темы: light, dark, blue
  const [mode, setMode] = useState('light');

  // Определяем три темы
  const lightTheme = createTheme({
    palette: { mode: 'light' },
  });

  const darkTheme = createTheme({
    palette: { mode: 'dark' },
  });

  const blueTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },   // насыщенный синий
      secondary: { main: '#64b5f6' }, // голубой
      background: {
        default: '#e3f2fd', // светло‑голубой фон
        paper: '#bbdefb',   // голубые карточки
      },
      text: { primary: '#0d47a1' },   // тёмно‑синий текст
    },
  });

  // Выбираем текущую тему
  const theme =
    mode === 'light' ? lightTheme :
    mode === 'dark' ? darkTheme :
    blueTheme;

  // Переключение по кругу: light → dark → blue → light
  const toggleTheme = () => {
    if (mode === 'light') setMode('dark');
    else if (mode === 'dark') setMode('blue');
    else setMode('light');
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App toggleTheme={toggleTheme} mode={mode} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

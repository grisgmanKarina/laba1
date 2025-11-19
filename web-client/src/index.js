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
  // Состояние темы
  const [mode, setMode] = useState('light');

  // Создаём тему с нужным режимом
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // Функция переключения темы
  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    // Подключаем Redux
    <Provider store={store}>
      {/* Подключаем маршрутизацию */}
      <BrowserRouter>
        {/* Подключаем тему Material UI */}
        <ThemeProvider theme={theme}>
          {/* Сброс базовых стилей */}
          <CssBaseline />
          {/* Передаём в App функцию переключения темы и текущий режим */}
          <App toggleTheme={toggleTheme} mode={mode} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

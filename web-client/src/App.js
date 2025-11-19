import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, addEmployee as addEmployeeAction, removeEmployee } from './features/appSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const Table = lazy(() => import('./Table'));
const AddEmployeeForm = lazy(() => import('./AddEmployeeForm'));

function App({ toggleTheme, mode }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { employees, loading, error } = useSelector((state) => state.app);

  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => setRouteLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const addEmployee = (newEmployee) => {
    const employeeWithId = { ...newEmployee, id: newEmployee.id ?? Date.now() };
    dispatch(addEmployeeAction(employeeWithId));
  };

  const handleRemove = (index) => {
    dispatch(removeEmployee(index));
  };

  if (routeLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>Ошибка: {error}</div>;
  }

  return (
    <div className="App">
      {/* Навигация и переключение темы */}
      {location.pathname !== '/login' && (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px' }}>
          <div>
            <Link to="/">Колл-центр</Link> | <Link to="/add">Добавить</Link>
          </div>
          <Button
            onClick={toggleTheme}
            variant="outlined"
            size="small"
            sx={{
              textTransform: 'none',
              padding: '4px 12px',
              fontSize: '0.8rem'
            }}
          >
            Переключить тему
          </Button>
        </nav>
      )}

      {/* Маршруты */}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><CircularProgress /></div>}>
                <Table employees={employees} onRemove={handleRemove} />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><CircularProgress /></div>}>
                <AddEmployeeForm onAdd={addEmployee} />
              </Suspense>
            </PrivateRoute>
          }
        />

        {/* Перенаправление на /login при запуске */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;

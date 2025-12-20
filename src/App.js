import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, addEmployeeAsync, removeEmployeeAsync } from './features/appSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

const Table = lazy(() => import('./Table'));
const AddEmployeeForm = lazy(() => import('./AddEmployeeForm'));

function App({ toggleTheme }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { employees, loading, error } = useSelector((state) => state.app);

  const [routeLoading, setRouteLoading] = useState(false);

  // состояния для модалок
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [pendingEmployee, setPendingEmployee] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [pendingDeleteEmployee, setPendingDeleteEmployee] = useState(null);

  // Спиннер при смене маршрута
  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => setRouteLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Загрузка сотрудников при старте
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Добавление сотрудника (через модалку)
  const requestAdd = (newEmployee) => {
    setPendingEmployee(newEmployee);
    setOpenAddDialog(true);
  };

  const confirmAdd = () => {
    if (pendingEmployee) {
      dispatch(addEmployeeAsync(pendingEmployee));
    }
    setOpenAddDialog(false);
    setPendingEmployee(null);
  };

  const cancelAdd = () => {
    setOpenAddDialog(false);
    setPendingEmployee(null);
  };

  // Удаление сотрудника (через модалку)
  const requestDelete = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setPendingDeleteEmployee(employee);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteEmployee) {
      dispatch(removeEmployeeAsync(pendingDeleteEmployee.id));
    }
    setOpenDeleteDialog(false);
    setPendingDeleteEmployee(null);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setPendingDeleteEmployee(null);
  };

  // Спиннер при загрузке
  if (routeLoading || loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}><CircularProgress /></div>;
  }

  // Ошибка
  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>Ошибка: {error}</div>;
  }

  return (
    <div className="App">
      {/* Навигация и кнопка темы */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px' }}>
        <div>
          {location.pathname !== '/login' && (
            <>
              <Link to="/">Колл-центр</Link> | <Link to="/add">Добавить</Link>
            </>
          )}
        </div>
        <Button
          onClick={toggleTheme}
          variant="outlined"
          size="small"
          sx={{ textTransform: 'none', padding: '4px 12px', fontSize: '0.8rem' }}
        >
          Переключить тему
        </Button>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><CircularProgress /></div>}>
                <Table employees={employees} onRemove={requestDelete} />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><CircularProgress /></div>}>
                <AddEmployeeForm onAdd={requestAdd} />
              </Suspense>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* Модалка для добавления */}
      <Dialog open={openAddDialog} onClose={cancelAdd}>
        <DialogTitle>Подтверждение добавления</DialogTitle>
        <DialogContent>
          <Typography>
            {pendingEmployee ? `Добавить сотрудника ${pendingEmployee.name}?` : 'Добавить сотрудника?'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmAdd} color="primary">Да</Button>
          <Button onClick={cancelAdd} color="inherit">Нет</Button>
        </DialogActions>
      </Dialog>

      {/* Модалка для удаления */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <Typography>
            {pendingDeleteEmployee ? `Удалить сотрудника ${pendingDeleteEmployee.name}?` : 'Удалить сотрудника?'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="error">Да</Button>
          <Button onClick={cancelDelete} color="inherit">Нет</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;

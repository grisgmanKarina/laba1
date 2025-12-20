import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Загрузка сотрудников с сервера
export const fetchEmployees = createAsyncThunk(
  'app/fetchEmployees',
  async () => {
    const response = await axios.get('http://localhost:3001/employees'); 
    return response.data; // axios сам превращает JSON в объект
  }
);

// 2. Добавление сотрудника на сервер
export const addEmployeeAsync = createAsyncThunk(
  'app/addEmployeeAsync',
  async (employee) => {
    const response = await axios.post('http://localhost:3001/employees', employee);
    return response.data; // возвращаем добавленного сотрудника
  }
);

// 3. Удаление сотрудника с сервера
export const removeEmployeeAsync = createAsyncThunk(
  'app/removeEmployeeAsync',
  async (id) => {
    await axios.delete(`http://localhost:3001/employees/${id}`);
    return id; // возвращаем id, чтобы убрать из Redux
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    employees: [],   // список сотрудников
    loading: false,  // индикатор загрузки
    error: null,     // ошибки
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchEmployees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addEmployeeAsync
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      // removeEmployeeAsync
      .addCase(removeEmployeeAsync.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      });
  },
});

export default appSlice.reducer;

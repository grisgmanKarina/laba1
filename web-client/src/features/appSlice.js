import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронный action для загрузки сотрудников (имитация запроса с таймаутом)
export const fetchEmployees = createAsyncThunk(
  'app/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 800)); // имитация задержки
      const data = JSON.parse(localStorage.getItem('employees') || '[]');
      return data;
    } catch (err) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    employees: [],
    loading: false,
    error: null,
    auth: { isAuthenticated: !!localStorage.getItem('auth'), user: localStorage.getItem('authUser') || null }
  },
  reducers: {
    addEmployee(state, action) {
      state.employees.push(action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    removeEmployee(state, action) {
      state.employees = state.employees.filter((_, i) => i !== action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    login(state, action) {
      state.auth.isAuthenticated = true;
      state.auth.user = action.payload || null;
      localStorage.setItem('auth', 'true');
      if (action.payload) localStorage.setItem('authUser', action.payload);
    },
    logout(state) {
      state.auth.isAuthenticated = false;
      state.auth.user = null;
      localStorage.removeItem('auth');
      localStorage.removeItem('authUser');
    }
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload || 'Ошибка';
      });
  }
});

export const { addEmployee, removeEmployee, login, logout } = appSlice.actions;
export default appSlice.reducer;

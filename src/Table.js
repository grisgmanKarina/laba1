import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Table = ({ employees = [], onRemove }) => {
  return (
    <Box sx={{ mt: 2, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>Сотрудники</Typography>
      <List>
        {employees.length === 0 && <Typography color="text.secondary">Список пуст</Typography>}
        {employees.map((emp, idx) => (
          <ListItem
            key={emp.id ?? idx}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => onRemove(emp.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={emp.name || JSON.stringify(emp)} secondary={emp.phone || null} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Table;

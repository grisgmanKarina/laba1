import React from 'react';

const Table = ({ employees, onRemove }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ФИ</th>
          <th>Контактный номер</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.name}</td>
            <td>{employee.phone}</td>
            <td>
              <button onClick={() => onRemove(index)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

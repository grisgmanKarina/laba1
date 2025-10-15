const EmployeeAPI = {
    employees: [
      { number: 1, name: "Ivan Ivanov", job: "Student" },
      { number: 2, name: "Karina Grishman", job: "Student" },
      { number: 3, name: "Nikita Berniakovich", job: "Teacher" },
      { number: 4, name: "Anastasia Lihachova", job: "Rector" },
      { number: 5, name: "Pavel Petrovich", job: "Teacher" },
      { number: 6, name: "Anastasia Kubasova", job: "Student" },
    ],
    all: function () {
      return this.employees;
    },
    get: function (id) {
      const isEmployee = (p) => p.number === id;
      return this.employees.find(isEmployee);
    },
    delete: function (id) {
      const isNotDelEmployee = (p) => p.number !== id;
      this.employees = this.employees.filter(isNotDelEmployee);
      return;
    },
    add: function (employee) {
      this.employees.shift(employee);
      return employee;
    },
    update: function (employee) {
      this.get();
      this.employees.shift(employee);
      return employee;
    },
  };
  export default EmployeeAPI;
  
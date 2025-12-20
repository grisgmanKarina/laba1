const EmployeeAPI = {
    employees: [
      { number: 1, name: "Иван Иванов", phone: "+375295872381" },
      { number: 2, name: "Никита Федоров", phone: "+375290873984" },
      { number: 3, name: "Елизавета Исаченко", phone: "+375334762503" },
      { number: 4, name: "Анна Ткачева", phone: "+375290365992" },
      { number: 5, name: "Павел Сидоров", phone: "+375339812067" },
      { number: 6, name: "Алина Дубровская", phone: "+375337812493" },
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
  
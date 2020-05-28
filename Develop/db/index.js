const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all departments
  findAllDepartments() {
    // UNCOMMENT the line betow to code your query to select all departments
     return this.connection.query("SELECT * FROM department");
  }

  // Create a new department
  createDepartment(department) {
    // UNCOMMENT the line betow to code your query to create a department, replacing ? with department to SET
     return this.connection.query(`INSERT INTO department (name) VALUES(${department})`);
  }

  // Find all roles
  findAllRoles() {
    // UNCOMMENT the line betow to code your query to select all roles
    return this.connection.query("SELECT * FROM role");
  }

  // Create a new role
  createRole(role) {
    // UNCOMMENT the line betow to code your query to create role
     return this.connection.query(`INSERT INTO role (title, salary, department_id ) VALUES(${role})`);
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // Create a new employee
  createEmployee(employee) {
    // UNCOMMENT the line below to code your insert query
    return this.connection.query(`INSERT INTO department (first_name, last_name) VALUES(${employee})`);
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    // UNCOMMENT the line bolow to code your query to update role id for the given employee
     return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ? ",[employeeId, roleId]);
  }

  // Find all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query("SELECT * FROM employee WHERE departmentId ", [departmentId]);
  }

  // Find all employees by manager, join with departments and roles to display titles and department names
  findAllEmployeesByManager(managerId) {
    return this.connection.query("SELECT * FROM role LEFT JOIN department ON role.department_id = department.id ", [managerId]);
  }
}

module.exports = new DB(connection);

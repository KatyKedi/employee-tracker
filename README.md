# Employee Tracker

## Description

This is an application that allows business owners to keep track of employees using a MySql database. The application is invoked from the command line with 'node server', and then the user is prompted with management options. The user can either view table data in the console or update table data with new information.

## Management options

* View all departments
* View all roles
* View all employees
* Add a department
* Add a role
* Add an employee
* Update an employee role

## Schemas

* Department
  * dp_name
  * id

* Role
  * id
  * title
  * salary
  * department_id (references department id property)
  
* Employee
  * first_name
  * last_name
  * role_id (references role id property)
  * manager_id (references employee id property)

## Walkthrough
[**Link to demonstration video**](https://github.com/KatyKedi/employee-tracker/blob/main/assets/employee-tracker.webm "Walkthrough video")
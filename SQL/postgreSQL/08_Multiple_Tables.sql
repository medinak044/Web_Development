-- Joins the two tables together based on their region_id columns
SELECT first_name, country
FROM employees e, regions r
WHERE e.region_id = r.region_id;

----------------
-- Joins the two tables together based on department so 'division' can be displayed as well
SELECT first_name, email, division
FROM employees e, departments d
WHERE e.department = d.department 
AND email IS NOT NULL;
-- Also joins the 'regions' table so that the 'country' col can be displayed
SELECT first_name, email, division, country
FROM employees e, departments d, regions r
WHERE e.department = d.department 
AND e.region_id = r.region_id
AND email IS NOT NULL;
-- 'department' is ambiguous, need to explicitly specify which table the col data will come from
SELECT first_name, email, e.department, division, country
FROM employees e, departments d, regions r
WHERE e.department = d.department 
AND e.region_id = r.region_id
AND email IS NOT NULL;

----------------
-- Displays the total amount of employees working in each country
SELECT r.country, COUNT(e.employee_id) AS total_employees
FROM employees e, regions r
WHERE e.region_id = r.region_id
GROUP BY r.country
ORDER BY total_employees DESC;

----------------
-- Using 'JOIN'
SELECT first_name, country
FROM employees e INNER JOIN regions r
ON e.region_id = r.region_id
-- There are 27 departments in the employees table, and 24 departments in the departments table
-- INNER JOIN will display all matching departments that show in both tables
-- (FROM employees LEFT JOIN departments) will expose departments that departments table doesn't contain as NULL values
-- (FROM employees RIGHT JOIN departments) will expose departments that employees table doesn't contain as NULL values
-- FULL OUTER JOIN will show a full comparison of departments that each table has/doesn't have from each other
SELECT DISTINCT e.department, d.department 
FROM employees e RIGHT JOIN departments d 
ON e.department = d.department
-- Below is a solution to display only departments that are missing from the department table
SELECT DISTINCT e.department, d.department
FROM employees e LEFT JOIN departments d 
ON e.department = d.department
WHERE d.department IS NULL
-- FULL OUTER JOIN/ FULL JOIN example below:
SELECT DISTINCT e.department, d.department
FROM employees e FULL OUTER JOIN departments d 
ON e.department = d.department
-- Modified example from above to only display departments that are missing from each other (NULL)
SELECT DISTINCT e.department, d.department
FROM employees e FULL OUTER JOIN departments d 
ON e.department = d.department
WHERE e.department IS NULL OR d.department IS NULL

----------------
-- Using 'Union'. Will automatically exclude duplicate data
-- The query below combines the two tables' department columns into one column containing only unique values
SELECT department FROM employees
UNION
SELECT department FROM departments
-- 'UNION ALL' Will include duplicate data in the same column
-- Using DISTINCT will reduce the departments from employees table, then UNION ALL will stack all that data with data from the departments table
SELECT DISTINCT department FROM employees
UNION ALL
SELECT department FROM departments
-- I wanted 'TOTAL' to appear in the last row, but all rows above it must be ordered alphabetically
SELECT a.department, a.amount
FROM (SELECT DISTINCT department, COUNT(*) AS amount
	FROM employees 
	GROUP BY department
	ORDER BY department) a -- Create a custom table first, then sorted it by department name
UNION ALL -- Then add new data starting from the bottom row
SELECT 'TOTAL', COUNT(*) AS amount
FROM employees
-- "Cartesian Product", multiplies rows from 1st by amount of rows from 2nd table 
SELECT * 
FROM employees, departments
--'CROSS JOIN'
SELECT * 
FROM employees e CROSS JOIN departments d
----------------
--Will
(SELECT first_name, department, hire_date, country
FROM employees e INNER JOIN regions r
ON e.region_id = r.region_id
WHERE hire_date IN (SELECT MIN(hire_date) AS hire_date FROM employees e2)
ORDER BY hire_date
LIMIT 1)
UNION
(SELECT first_name, department, hire_date, country
FROM employees e INNER JOIN regions r
ON e.region_id = r.region_id
WHERE hire_date IN (SELECT MAX(hire_date) AS hire_date FROM employees e2))
ORDER BY hire_date
----------------
-- Using INNER JOIN
SELECT student_name, se.course_no, p.last_name
FROM students s
INNER JOIN student_enrollment se
    ON s.student_no = se.student_no
INNER JOIN teach t
    ON se.course_no = t.course_no
INNER JOIN professors p
    ON t.last_name = p.last_name
ORDER BY student_name;
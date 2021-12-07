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
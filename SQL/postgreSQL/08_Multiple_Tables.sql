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
-- Joins the two tables together based on their region_id columns
SELECT first_name, country
FROM employees e, regions r
WHERE e.region_id = r.region_id

----------------
-- Joins the two tables together based on department so 'division' can be displayed as well
SELECT first_name, email, division
FROM employees e, departments d
WHERE e.department = d.department 
AND email IS NOT NULL
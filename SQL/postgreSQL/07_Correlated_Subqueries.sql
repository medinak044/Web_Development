-- Finds average salary per department and compares employee salary to average salary
SELECT 		
first_name,
salary,
(SELECT ROUND(AVG(salary)) FROM employees e2 WHERE e1.department = e2.department) 
	AS avg_department_salary,
(salary - (SELECT ROUND(AVG(salary)) FROM employees e2 WHERE e1.department = e2.department)) 
	AS difference,
department
FROM employees e1;

-- Finds all departments with more than 38 employees, and shows highest salary for each department
SELECT d.department, (SELECT MAX(salary) FROM employees WHERE department = d.department)
FROM departments d
WHERE 38 < (SELECT COUNT(*) FROM employees e
		   WHERE e.department = d.department);
-- ^The query below displays the same result as the query above
SELECT department, MAX(salary)
FROM employees
GROUP BY department;

----------------

-- (288 ms) Query below shows the min and max salary for each department 
-- ^ Using correlated subqueries, and CASE clause as a challenge
SELECT department, first_name, salary, 
	(CASE WHEN salary = (SELECT MAX(salary) FROM employees e2 WHERE e1.department = e2.department) 
	 	THEN 'HIGHEST SALARY' ELSE 'LOWEST SALARY' END) AS salary_in_department
FROM employees e1
WHERE salary IN 
	((SELECT MAX(salary) FROM employees e2 WHERE e1.department = e2.department), 
	 (SELECT MIN(salary) FROM employees e2 WHERE e1.department = e2.department))
GROUP BY department, first_name, salary
ORDER BY department ASC, salary DESC;
-- (296 ms) Query below is another approach, but slower
SELECT department, first_name, salary,
	CASE 
		WHEN salary = max_by_department THEN 'HIGHEST SALARY'
		WHEN salary = min_by_department THEN 'LOWEST SALARY'
	END AS salary_in_department
FROM (SELECT department, first_name, salary,
		(SELECT MAX(salary) FROM employees e2 WHERE e1.department = e2.department) 
	  		AS max_by_department,
	  	(SELECT MIN(salary) FROM employees e2 WHERE e1.department = e2.department) 
	  		AS min_by_department
	  FROM employees e1) a
WHERE salary IN (max_by_department, min_by_department)
ORDER BY department ASC, salary DESC;

----------------
-- ('Moving Range') Display spending pattern within 90 day intervals
SELECT hire_date, salary,
(SELECT SUM(salary) FROM employees e2
 WHERE e2.hire_date BETWEEN e.hire_date - 90 AND e.hire_date) AS spending_pattern
FROM employees e
ORDER BY hire_date
-- Gets the amount in a particular column
SELECT first_name, department,
	COUNT(*) OVER(PARTITION BY department) AS dept_count,
	COUNT(*) OVER(PARTITION BY region_id) AS region_count
FROM employees e2
----------------
-- Adds up salaries of preceding rows
SELECT first_name, hire_date, salary,
	SUM(salary) OVER(ORDER BY hire_date RANGE BETWEEN UNBOUNDED PRECEDING 
        AND CURRENT ROW) AS running_total_of_salaries
FROM employees
-- Same functionality as above query
SELECT first_name, hire_date, salary,
	SUM(salary) OVER(PARTITION BY department ORDER BY hire_date) AS running_total_of_salaries
FROM employees
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
-- Calculates the salary sum of the current row + the preceding row
SELECT first_name, hire_date, salary,
	SUM(salary) OVER(ORDER BY hire_date ROWS BETWEEN 1 PRECEDING 
					 AND CURRENT ROW)
FROM employees
----------------
-- RANK()
-- Query below partitions by department and gives a rank based on salary (because salary is being ordered)
SELECT first_name, hire_date, department, salary,
	RANK() OVER(PARTITION BY department ORDER BY salary DESC)
FROM employees
-- NTILE(5) splits departments into groups of 5 and gives each member of the group a rank number (percentile)
SELECT first_name, hire_date, department, salary,
	NTILE(5) OVER(PARTITION BY department ORDER BY salary DESC)
FROM employees
-- FIRST_VALUE() displays the first salary in for each department (can be used for comparison)
SELECT first_name, hire_date, department, salary,
	FIRST_VALUE(salary) OVER(PARTITION BY department ORDER BY salary DESC)
FROM employees
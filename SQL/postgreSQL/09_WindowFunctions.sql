SELECT first_name, department,
	COUNT(*) OVER(PARTITION BY department) AS dept_count,
	COUNT(*) OVER(PARTITION BY region_id) AS region_count
FROM employees e2
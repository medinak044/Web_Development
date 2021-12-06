-- 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
-- Remember to label the resulting table in the FROM clause ('a' for example)
_____

SELECT 
	SUM(CASE WHEN salary < 100000 THEN 1 ELSE 0 END) AS under_paid,
	SUM(CASE WHEN salary > 100000 AND salary < 150000 THEN 1 ELSE 0 END) AS paid_well,
	SUM(CASE WHEN salary > 150000 THEN 1 ELSE 0 END) AS executive
FROM employees;

SELECT 
	COUNT(a.region_1), 
	COUNT(a.region_2), 
	COUNT(a.region_3)
	FROM 
		(SELECT first_name,
		CASE WHEN region_id = 1 THEN (SELECT country FROM regions WHERE region_id = 1) END AS region_1,
		CASE WHEN region_id = 2 THEN (SELECT country FROM regions WHERE region_id = 2) END AS region_2,
		CASE WHEN region_id = 3 THEN (SELECT country FROM regions WHERE region_id = 3) END AS region_3
		FROM employees) a;
		
SELECT 
	name, 
	total_supply, 
	CASE 
		WHEN total_supply < 20000 THEN 'LOW'
		WHEN total_supply BETWEEN 20000-1 AND 50000-1 THEN 'ENOUGH'
		WHEN total_supply > 50000 THEN 'FULL' 
	END
FROM 	
	(SELECT name, SUM(supply) AS total_supply
	FROM fruit_imports
	GROUP BY name) a;
    
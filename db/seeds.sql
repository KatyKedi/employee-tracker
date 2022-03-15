INSERT INTO department (dp_name)
VALUES
    ('Home Decor'),
    ('Candles'),
    ('Floral'),
    ('Needle Art'),
    ('Frames'),
    ('Art'),
    ('Crafts'),
    ('Jewelry'),
    ('Paper Crafts'),
    ('Seasonal'),
    ('Front');

INSERT INTO emp_role (title, salary, department_id)
VALUES
    ('Store Manager', 80000.00, 10),
    ('Assistant Manager', 70000.00, 3),
    ('Assistant Manager', 70000.00, 6),
    ('Assistant Store Manager', 75000.00, 10),
    ('CSM', 60000.00, 1),
    ('CSM', 60000.00, 11),
    ('Associate', 50000.00, 1),
    ('Associate', 50000.00, 2),
    ('Associate', 50000.00, 3),
    ('Associate', 50000.00, 4),
    ('Associate', 50000.00, 5),
    ('Associate', 50000.00, 6),
    ('Associate', 50000.00, 7),
    ('Associate', 50000.00, 8),
    ('Associate', 50000.00, 9),
    ('Associate', 50000.00, 10),
    ('Associate', 50000.00, 11);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Kevin', 'Kreep', 1, NULL),
    ('Fatima', 'Fake', 4, 1),
    ('Aaron', 'Weaver', 2, 1),
    ('Charles', 'Chump', 1, 1),
    ('Katy', 'Lady', 4, 3),
    ('Elizabeth', 'Youseff', 5, 2),
    ('Whitney', 'Wish', 5, 4),
    ('Montague', 'Summers', 6, 5),
    ('Octavia', 'Butler', 6, 5),
    ('Unica', 'Zurn', 7, 5),
    ('Dizzy', 'Doggie', 7, 5),
    ('Abby', 'Baby', 8, 5),
    ('Piper', 'Hyper', 8, 5),
    ('Merlin', 'Meowow', 9, 5),
    ('Jonesy', 'Homey', 9, 5),
    ('Debbie', 'Downer', 10, 5),
    ('Dexter', 'Flexer', 10, 5),
    ('Colin', 'Carson', 11, 1),
    ('Aidan', 'Anderson', 11, 1);
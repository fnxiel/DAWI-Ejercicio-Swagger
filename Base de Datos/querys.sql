--- Restaurantes
SELECT id, nombre, direccion, telefono, tipoCocina, capacidad FROM Mascotas.Restaurantes;
INSERT INTO Mascotas.Restaurantes (nombre, direccion, telefono, tipoCocina, capacidad) VALUES ("Prueba", "Direccion", "1234-1234", "Hondureña", 50);
UPDATE Mascotas.Restaurantes SET nombre = "Nombre modificado", direccion = "Direccion modificada", telefono = "1234-1234", tipoCocina = "Hondureña", capacidad = 50 WHERE id = 2;
DELETE FROM Mascotas.Restaurantes WHERE id = 3;

--- Reservaciones
SELECT id, fechaHora, asistentes, Restaurantes_id FROM Mascotas.Reservaciones;
INSERT INTO Mascotas.Reservaciones (fechaHora, asistentes, Restaurantes_id) VALUES ("Domingo 20 de mayo a las 3:00 pm.", 10, 1);
UPDATE Mascotas.Reservaciones SET fechaHora = "Domingo 20 de mayo a las 6:00 pm.", asistentes = 10, Restaurantes_id = 1 WHERE id = 2;
DELETE FROM Mascotas.Reservaciones WHERE id = 3;


--- Menus
SELECT id, nombre, descripcion, Restaurantes_id FROM Mascotas.Menus;
INSERT INTO Mascotas.Menus (nombre, descripcion, Restaurantes_id) VALUES ("Menu principal", "Platos fuertes de la ccasa", 1);
UPDATE Mascotas.Menus SET nombre = "Platos fuertes", descripcion = "Platos fuertes de la casa", Restaurantes_id = 1 WHERE id = 2;
DELETE FROM Mascotas.Menus WHERE id = 3;


--- Platos
SELECT id, nombre, descripcion, precio, Menus_id FROM Mascotas.Platos;
INSERT INTO Mascotas.Platos (nombre, descripcion, precio, Menus_id) VALUES ("Baleadas", "Tortilla rellena de algo", 20.00, 1);
UPDATE Mascotas.Platos SET nombre = "Baleadas", descripcion = "Tortilla rellena de frijoles y mantequilla", precio = 25.00, Menus_id = 1 WHERE id = 4;
DELETE FROM Mascotas.Platos WHERE id = 5;


--- Opinones
SELECT id, contenido, fecha, calificacion, Restaurantes_id FROM Mascotas.Opiniones;
INSERT INTO Mascotas.Opiniones (contenido, fecha, calificacion, Restaurantes_id) VALUES ("Muy buen restaurante", "22/05/2023", 5, 1);
UPDATE Mascotas.Opiniones SET contenido = "No tan bueno", fecha = "22/05/2023", calificacion = 3, Restaurantes_id = 1 WHERE id = 2;
DELETE FROM Mascotas.Opiniones WHERE id = 3;



----********Endpoints

--- Restaurantes
SELECT id, nombre, direccion, telefono, tipoCocina, capacidad FROM Mascotas.Restaurantes;
INSERT INTO Mascotas.Restaurantes (nombre, direccion, telefono, tipoCocina, capacidad) VALUES (?, ?, ?, ?, ?);
UPDATE Mascotas.Restaurantes SET nombre = ?, direccion = ?, telefono = ?, tipoCocina = ?, capacidad = ? WHERE id = ?;
DELETE FROM Mascotas.Restaurantes WHERE id = ?;

--- Reservaciones
SELECT id, fechaHora, asistentes, Restaurantes_id FROM Mascotas.Reservaciones;
INSERT INTO Mascotas.Reservaciones (fechaHora, asistentes, Restaurantes_id) VALUES (?, ?, ?);
UPDATE Mascotas.Reservaciones SET fechaHora = ?, asistentes = ?, Restaurantes_id = ? WHERE id = ?;
DELETE FROM Mascotas.Reservaciones WHERE id = ?;


--- Menus
SELECT id, nombre, descripcion, Restaurantes_id FROM Mascotas.Menus;
INSERT INTO Mascotas.Menus (nombre, descripcion, Restaurantes_id) VALUES (?, ?, ?);
UPDATE Mascotas.Menus SET nombre = ?, descripcion = ?, Restaurantes_id = ? WHERE id = ?;
DELETE FROM Mascotas.Menus WHERE id = ?;


--- Platos
SELECT id, nombre, descripcion, precio, Menus_id FROM Mascotas.Platos;
INSERT INTO Mascotas.Platos (nombre, descripcion, precio, Menus_id) VALUES (?, ?, ?, ?);
UPDATE Mascotas.Platos SET nombre = ?, descripcion = ?, precio = ?, Menus_id = ? WHERE id = ?;
DELETE FROM Mascotas.Platos WHERE id = ?;


--- Opinones
SELECT id, contenido, fecha, calificacion, Restaurantes_id FROM Mascotas.Opiniones;
INSERT INTO Mascotas.Opiniones (contenido, fecha, calificacion, Restaurantes_id) VALUES (?, ?, ?, ?);
UPDATE Mascotas.Opiniones SET contenido = ?, fecha = ?, calificacion = ?, Restaurantes_id = ? WHERE id = ?;
DELETE FROM Mascotas.Opiniones WHERE id = ?;
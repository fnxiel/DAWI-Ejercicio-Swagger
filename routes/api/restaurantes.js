const express = require('express')
const rutas = express.Router()
var mysql      = require('mysql');
const configuracion = require('../../configuracion')

var connection = mysql.createConnection({
  host     : configuracion.host,
  user     : configuracion.user,
  password : configuracion.password
});
//importar connexion

////**************Restaurantes*****************////

/** 
 * @openapi
 * tags:
 *    name: Restaurantes
 *    description: Endpoints de la api para manejar informacion de restaurantes
*/

/**
 * @openapi
 * components:
 *    schemas:
 *      Restaurantes:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: Id del restaurante registrado
 *          nombre:
 *            type: string
 *            description: Nombre del restaurante registrado
 *          direccion:
 *            type: string
 *            description: Direccion del restaurante
 *          telefono:
 *            type: string
 *            description: Telefono de contacto del restaurante
 *          tipoCocina:
 *            type: string
 *            description: Origen de la cocina o tipo de platillos que se sirven como especelidad
 *          capacidad:
 *            type: integer
 *            description: Cantidad de personas que pueden estar al mismo tiempo
 */

/**
 * @openapi
 * /api/v1/restaurantes:
 *   get:
 *     tags: [Restaurantes]
 *     summary: Traer todo
 *     description: Trae todos los restaurantes registrados en la aplicacion
 *     responses:
 *       200:
 *         description: Traemos toda la informacion de todos los restaurantes guardados.
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                item:
 *                  $ref: '#/components/schemas/Restaurantes'
 */
rutas.get('/api/v1/restaurantes', (req, res) =>{
    connection.query('SELECT id, nombre, direccion, telefono, tipoCocina, capacidad FROM Mascotas.Restaurantes;', function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  

/**
 * @openapi
 * /api/v1/restaurantes/{id}:
 *   get:
 *     tags: [Restaurantes]
 *     summary: Traer uno
 *     description: Traer un restaurante por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id del restaurante que estamos buscando
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: Traemos toda la informacion de un restaurante guardado.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                item:
 *                  $ref: '#/components/schemas/Restaurantes'
 *       404:
 *         description: No se encontró el registro.
 */
  rutas.get('/api/v1/restaurantes/:id', (req, res) =>{
    const {id} = req.params;
    connection.query('SELECT id, nombre, direccion, telefono, tipoCocina, capacidad FROM Mascotas.Restaurantes WHERE id = ?', [id] , function(err, rows, fields) {
      if (err) throw err;
      //res.status(200).json(rows[0])
      res.status(200).json(rows)
    });  
  })
  

  /**
 * @openapi
 * /api/v1/restaurantes:
 *   post:
 *     tags: [Restaurantes]
 *     summary: Crear uno
 *     description: Crea un restaurante en la aplicacion
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Restaurantes'
 *     responses:
 *       200:
 *         description: Traemos toda la informacion de un restaurante guardado.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                item:
 *                  $ref: '#/components/schemas/Restaurantes'
 *       404:
 *         description: No se encontró el registro.
 */
  ///Crea un nuevo restaurante
  rutas.post('/api/v1/restaurantes', (req, res) =>{
    const {nombre, direccion, telefono, tipoCocina, capacidad} = req.body;
    connection.query('INSERT INTO Mascotas.Restaurantes (nombre, direccion, telefono, tipoCocina, capacidad) VALUES (?, ?, ?, ?, ?);', [nombre, direccion, telefono, tipoCocina, capacidad] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Modificar un restaurante
  rutas.put('/api/v1/restaurantes/:id', (req, res) =>{
    const {id} = req.params;
    const {nombre, direccion, telefono, tipoCocina, capacidad} = req.body;
    connection.query('UPDATE Mascotas.Restaurantes SET nombre = ?, direccion = ?, telefono = ?, tipoCocina = ?, capacidad = ? WHERE id = ?;', [nombre, direccion, telefono, tipoCocina, capacidad, id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Eliminar un restaurante
  rutas.delete('/api/v1/restaurantes/:id', (req, res) =>{
    const {id} = req.params;
    connection.query('DELETE FROM Mascotas.Restaurantes WHERE id = ?;', [id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })

module.exports = rutas

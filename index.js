const express = require('express');
var mysql      = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const configuracion = require('./configuracion')
const morgan = require('morgan')
const helmet = require('helmet')
const sha256 = require('sha256')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


const rutasUsuarios = require('./usuarios')
const rutasRestaurantes = require('./routes/api/restaurantes')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API para manejo de restaurantes',
      version: '1.0.0',
      description: 'Aplicación para el manejo de cadenas de restaurantes'
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ]
  },
  apis: ['./routes/api/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)



var connection = mysql.createConnection({
  host     : configuracion.host,
  user     : configuracion.user,
  password : configuracion.password
});

console.log(configuracion)

const myLogger = function (req, res, next) {
  console.log(`Se ha llamado la ruta: ${req.path} - ${new Date().toLocaleTimeString()}` )
  next()
}

var corsOptions = {
  origin: 'http://localhost:5500',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//// middleware1 - Validar si un usuario tiene permisos / esta autenticado 
const app = express();

//app.use(cors(corsOptions))

app.use(cors());

connection.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
///middleware 3
//app.use(myLogger)
app.use(morgan('combined'))
app.use(helmet())
///middleware 4
app.use(rutasUsuarios)
app.use(rutasRestaurantes)
///middleware 5
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
///


app.post('/api/v1/autenticar', (req, res) =>{
  const {usuario, password} = req.body;
  console.log(sha256('admin'))
  connection.query('call Mascotas.ValidarCredenciales(?, ?);', [password, usuario] ,function(err, rows, fields) {
    if (err){
      res.status(500).json({mensaje: "Ocurrio un error de base de datos"})
    };
    //console.log(rows)
    //console.log(rows[0])
    //console.log(rows[0][0].Autenticado)
    if(rows[0][0].Autenticado == 1){
      res.status(200).json({mensaje: "Usuario autenticado"})
    }else{
      res.status(401).json({mensaje: "Usuario o contraseña incorrecta"})
    }
  });  
})

app.post('/api/v1/autenticar', (req, res) =>{
  const {usuario, password} = req.body;
  console.log(sha256('admin'))
  connection.query('call Mascotas.CrearReservacionCompleta(?, ?, ?, ?, ?);', [password, usuario] ,function(err, rows, fields) {
    if (err){
      res.status(500).json({mensaje: "Ocurrio un error de base de datos"})
    };
    //console.log(rows)
    //console.log(rows[0])
    //console.log(rows[0][0].Autenticado)
    if(rows[0][0].Autenticado == 1){
      res.status(200).json({mensaje: "Usuario autenticado"})
    }else{
      res.status(401).json({mensaje: "Usuario o contraseña incorrecta"})
    }
  });  
})




  ////**************Reservaciones*****************////

///Trae todas las reservaciones registradas en la aplicacion
app.get('/api/v1/reservaciones', (req, res) =>{
    connection.query('SELECT id, fechaHora, asistentes, Restaurantes_id FROM Mascotas.Reservaciones;', function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Traer una reservacion por id
  app.get('/api/v1/reservaciones/:id', (req, res) =>{
    const {id} = req.params;
    connection.query('SELECT id, fechaHora, asistentes, Restaurantes_id FROM Mascotas.Reservaciones WHERE id = ?;', [id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows[0])
    });  
  })
  
  ///manejo de errores.

  ///Crea una nueva reservacion
  app.post('/api/v1/reservaciones', (req, res) =>{
    const {fechaHora, asistentes, Restaurantes_id} = req.body;
    let respuestaErrorCliente = []
    if(!fechaHora){
      respuestaErrorCliente.push("La fecha y hora no puede estar vacia")
    }
    if(!asistentes){
      respuestaErrorCliente.push("La cantidad de asistentes no puede estar vacio")
    }
    if(asistentes<=0){
      respuestaErrorCliente.push("La cantidad de asistentes debe ser mayor que 0")
    }
    if(!Restaurantes_id){
      respuestaErrorCliente.push("El id de restaurante no puede estar vacio")
    }
    if(respuestaErrorCliente.length > 0 ){
      res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
      return
    }

    connection.query('INSERT INTO Mascotas.Reservaciones (fechaHora, asistentes, Restaurantes_id) VALUES (?, ?, ?);', [fechaHora, asistentes, Restaurantes_id] , function(err, rows, fields) {
      //if (err) throw err;
      if(err){
        console.error(err)
        let respuestaError = {}
        if(err.code === 'ER_BAD_NULL_ERROR'){
          respuestaError = {codigo: 500, mensaje: "Los campos que intenta ingresar no pueden ser nulos"}
        }else{
          res.status(500).json({codigo: 500, mensaje: "Ocurrio un error en el servidor"});
          return
        }
        res.status(500).json(respuestaError)
      } else{
        res.status(200).json(rows)
      }


      // //Ejemplo youtube: Cargar
      // let cargando = true
      // try {
      //   //Cualquier codigo que no tenemos certeza que vaya a ejecutarse correctamente o en el tiempo esperado

      //   //Ejemplo youtube: Tratando de traer las miniaturas e informacion de los videos

      //   traerVideo()
      // } catch (error) {
      //   //Manejo de errores

      //   //Ejemplo youtube: Al encontrarse con un error, la pagina de cargar, pero los elementos que ya estan
      //   //en pantalla quedan funcionando
      //   devolverError()
      // } finally {
      //   //Independiemente de si hay error o no
      //   //Terminamos de hacer las validaciones o cambios de estado.

      //   //Finalizamos el proceso de carga
      //   cargando = false
      // }

      //fetch().then(e => e).catch(error => console.error(error)).finally(() => console.log("final"))

    });  
  })
  
  ///Modifica una reservacion
  app.put('/api/v1/reservaciones/:id', (req, res) =>{
    const {id} = req.params;
    const {fechaHora, asistentes, Restaurantes_id} = req.body;
    connection.query('UPDATE Mascotas.Reservaciones SET fechaHora = ?, asistentes = ?, Restaurantes_id = ? WHERE id = ?;', [fechaHora, asistentes, Restaurantes_id, id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Eliminar una reservacion
  app.delete('/api/v1/reservaciones/:id', (req, res) =>{
    const {id} = req.params;
    connection.query('DELETE FROM Mascotas.Reservaciones WHERE id = ?;', [id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })




  ////**************Menus*****************////

///Trae todos los menus registradas en la aplicacion
app.get('/api/v1/menus', (req, res) =>{
    connection.query('SELECT id, nombre, descripcion, Restaurantes_id FROM Mascotas.Menus;', function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Traer un menu por id
  app.get('/api/v1/menus/:id', (req, res) =>{
    const {id} = req.params;
    connection.query('SELECT id, nombre, descripcion, Restaurantes_id FROM Mascotas.Menus WHERE id = ?;', [id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows[0])
    });  
  })
  
  ///Crea un menu
  app.post('/api/v1/menus', (req, res) =>{
    const {nombre, descripcion, Restaurantes_id} = req.body;
    connection.query('INSERT INTO Mascotas.Menus (nombre, descripcion, Restaurantes_id) VALUES (?, ?, ?);', [nombre, descripcion, Restaurantes_id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Modifica un menu
  app.put('/api/v1/menus/:id', (req, res) =>{
    const {id} = req.params;
    const {nombre, descripcion, Restaurantes_id} = req.body;
    connection.query('UPDATE Mascotas.Menus SET nombre = ?, descripcion = ?, Restaurantes_id = ? WHERE id = ?;', [nombre, descripcion, Restaurantes_id, id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Eliminar un menu
  app.delete('/api/v1/menus/:id', (req, res) =>{
    const {id} = req.params;
    connection.query('DELETE FROM Mascotas.Menus WHERE id = ?;', [id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })


  ////**************Platos*****************////

///Trae todos los platos registrados en la aplicacion
app.get('/api/v1/platos', (req, res) =>{
    connection.query('SELECT id, nombre, descripcion, precio, Menus_id FROM Mascotas.Platos;', function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Traer un plato por id
  app.get('/api/v1/platos/:id', (req, res) =>{
    const {id} = req.params;
    connection.query('SELECT id, nombre, descripcion, precio, Menus_id FROM Mascotas.Platos WHERE id = ?;', [id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows[0])
    });  
  })
  
  ///Crea un plato
  app.post('/api/v1/platos', (req, res) =>{
    const {nombre, descripcion, Restaurantes_id} = req.body;
    connection.query('INSERT INTO Mascotas.Platos (nombre, descripcion, precio, Menus_id) VALUES (?, ?, ?, ?);', [nombre, descripcion, Restaurantes_id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Modifica un plato
  app.put('/api/v1/platos/:id', (req, res) =>{
    const {id} = req.params;
    const {nombre, descripcion, Restaurantes_id} = req.body;
    connection.query('UPDATE Mascotas.Platos SET nombre = ?, descripcion = ?, precio = ?, Menus_id = ? WHERE id = ?;', [nombre, descripcion, Restaurantes_id, id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })
  
  ///Eliminar un plato
  app.delete('/api/v1/platos/:id', (req, res) =>{
    const {id} = req.params;
    connection.query('DELETE FROM Mascotas.Platos WHERE id = ?;', [id] , function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows)
    });  
  })


app.listen(configuracion.puerto, () => {
  console.log(`La aplicación se está ejecutando en el puerto ${configuracion.puerto}`)
})
const express = require('express')
const rutas = express.Router()

const usuarios = [
    {
        id: 1,
        nombre: "Administrador",
        apellido: "Admin",
        usuario: "admin"
    },
    {
        id: 2,
        nombre: "Usuario",
        apellido: "Normal",
        usuario: "user"
    },
]

rutas.get('/usuarios', (req, res) =>{
      res.status(200).json(usuarios)
  })

  rutas.get('/usuario-administrador', (req, res) =>{
    res.status(200).json(usuarios[0])
})

module.exports = rutas
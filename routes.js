const express = require('express')
const { insertItem,  getPelis, getRandomFive, getPeliEspecifica} = require('./db')

const router = express.Router()

router.get('/public',(req,res) => {
  res.sendFile(__dirname + "/public");
})

// Obtener las peliculas solicitadas
router.get('/peliculas', (req, res) => {
  console.log(req.query.title);
  const item = req.query.title
  getPelis(item)
    .then((items) => {
      items = items.map((item) => ({
        title: item.title,
        year: item.year,
        imdb: item.imdb,
        tomatoes: item.tomatoes,
          poster : item.poster
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

// Obtener las peliculas solicitadas
router.get('/peliculasEspecificas', (req, res) => {


  getPeliEspecifica()
      .then((items) => {
        items = items.map((item) => ({
          title: item.title,
          year: item.year,
          imdb: item.imdb,
          tomatoes: item.tomatoes,
            poster:item.poster
        }))
        res.json(items)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).end()
      })
})


// Postear una pelicula
router.post('/peliculas', (req, res) => {
  const item = req.body
  console.log(req.body)

  insertItem(item)
    .then(() => {
      res.json(item).status(200).end()

    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})


// Obtener 5 pelis al azar
router.get('/peliculasRamdonFive', (req, res) => {

    getRandomFive().then((items) => {
            items = items.map((item) => ({
                title: item.title,
                year: item.year,
                imdb: item.imdb,
                tomatoes: item.tomatoes,
                fullplot: item.fullplot,
                cast: item.cast,
                poster: item.poster,


            }))
            res.json(items)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
})



module.exports = router

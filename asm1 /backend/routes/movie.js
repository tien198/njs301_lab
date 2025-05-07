const router = require('express').Router()
const { log } = require('console')

const movieController = require('../controllers/movies')

// GET Trendings - /api/movies/trending?page=1
router.get('/api/movies/trending', movieController.getTrending)

// GET Top rate - /api/movies/top-rate?page=1
router.get('/api/movies/top-rate', movieController.getTopRate)

// GET by genre - /api/movies/discover/:gerneId?page=1
router.get('/api/movies/discover/:gerneId', movieController.getByGerne)
router.get('/api/movies/discover', (req, res) => res.status(404).send('Not found gerne param!'))

// get movie trailer through method POST - body: { movieId: number }
router.post('/api/movies/video', movieController.getMoviesTrailer)

// POST search movie - /api/movies/search
// - body = {
//     keyword: string,
//     page?: number,
//     genre?: string,
//     mediaType?: string,
//     language?: string,
//     year?: string
// }
router.post('/api/movies/search', movieController.searchMovie)

module.exports = router
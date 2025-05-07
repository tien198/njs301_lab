const { log } = require('console')
const Pagination = require('../utils/pagination')

const Movie = require("../models/Movie")
const Genre = require("../models/Gerne")
const Trailer = require('../models/Trailer')

exports.getTrending = (req, res, next) => {
    const { page } = req.query
    Movie.find(movies => {
        movies.sort((a, b) => b.popularity - a.popularity)
        const pagination = new Pagination(movies)
        const docs = pagination.page(page ? page : 1).limit(10).docsCount()
        res.status(200).send(docs)
    })
}

exports.getTopRate = (req, res, next) => {
    const { page } = req.query
    Movie.find(movies => {
        movies.sort((a, b) => b.vote_average - a.vote_average)
        let pagination = new Pagination(movies)
        const docs = pagination.page(page ? page : 1).limit(10).docsCount()
        pagination = null
        res.status(200).send(docs)
    })
}

exports.getByGerne = (req, res, next) => {
    const { gerneId } = req.params
    const { page } = req.query

    if (!gerneId)
        res.status(400).send(`Not found gerne parram`)
    Genre.findById(+gerneId, genre => {
        if (!genre)
            res.status(404).send(`Not found that gerne id ${gerneId}`)
        else {
            const genreName = genre.name
            Movie.find(movies => {
                let resMovies = movies.filter(m => m.genre_ids.includes(+gerneId))
                let pagination = new Pagination(resMovies)

                const resDocs = pagination.page(page ? page : 1).limit(10).docsCount()
                resDocs.genre_name = genreName

                resMovies = null; pagination = null

                res.status(200).send(resDocs)
            })
        }
    })
}

exports.getMoviesTrailer = (req, res, next) => {
    const { movieId } = req.body

    if (!movieId)
        res.status(400).send(`Not found film_id parram`)
    Trailer.findById(+movieId, trailer => {
        if (!trailer)
            res.status(404).send(`Trailer not found!`)
        else {
            // sort videos by published_at in DESCENDING order
            trailer.videos.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
            // Then find the first official video on YouTube
            const resVidInfo = trailer.videos.find(i => i.official === true && i.site === 'YouTube')
            if (!resVidInfo)
                res.status(404).send(`Trailer not found!`)
            else
                res.status(200).send({ results: [resVidInfo] })
        }
    })
}

// filter movies by keyword, mediaType, language, year, genre 
// any false condition lead to false <-- AND condition -->
function moviesFilter(m, lcKeyword, mediaType, language, year, genre) {
    const includeTitle = m.title ? m.title.toLowerCase().includes(lcKeyword) : false

    const includeOverview = m.overview ? m.overview.toLowerCase().includes(lcKeyword) : false

    let includeMediaType = true
    if (mediaType)
        includeMediaType = m.media_type
            ? m.media_type === mediaType
            : false
    if (!includeMediaType)
        return false

    let includeLanguage = true
    if (language)
        includeLanguage = m.original_language
            ? m.original_language === language
            : false
    if (!includeLanguage)
        return false

    let includeYear = true
    if (year) {
        if (!m.release_date)
            return false
        const releaseYear = new Date(m.release_date).getFullYear()
        includeYear = m.release_date
            ? releaseYear === +year
            : false
    }
    if (!includeYear)
        return false

    // find by genre is an process drain performance - it must loop through all genres, and loop all movies per genre
    // put it at the last, we don't perform it unecessary
    let includeGenre = true
    if (genre) {
        const fGenres = Genre.findSync().filter(i => i.name.includes(genre))
        const fGenreIds = fGenres.map(i => i.id)
        includeGenre = fGenreIds.some(id => m.genre_ids.includes(id))
    }
    if (!includeGenre)
        return false

    return includeTitle || includeOverview && true
}

exports.searchMovie = (req, res, next) => {
    const { keyword, page, mediaType, language, year, genre } = req.body
    //     keyword: string,
    //     page?: number,
    //     genre?: string,
    //     mediaType?: string,
    //     language?: string,
    //     year?: string
    if (!keyword)
        res.status(400).send(`Not found keyword param`)

    const lcKeyword = keyword.toLowerCase()

    Movie.find(movies => {
        const resMovies = movies.filter(m => moviesFilter(m, lcKeyword, mediaType, language, year, genre))
        const pagination = new Pagination(resMovies)
        const docs = pagination.page(page).limit(10).docsCount()
        res.status(200).send(docs)
    })
}

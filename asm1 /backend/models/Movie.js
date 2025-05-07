const { error } = require('console')

const DataFile = require('./DataFile')

module.exports = class Movie extends DataFile {
    
    adult
    backdrop_path
    id
    title
    original_language
    original_title
    overview
    poster_path
    media_type
    genre_ids
    popularity
    release_date
    video
    vote_average
    vote_count
}
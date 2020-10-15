const Author = require('../models/author')
const Genre = require('../models/genre')
const Manga = require('../models/manga')

function getAuthor(search) {
    return Author.find(search)
}

function getGenres(search) {
    return Genre.find(search)
}

function getMangas(search) {
    return Manga.find(search)
}

module.exports = { getAuthor, getGenres, getMangas }
const Author = require('../models/author')
const Genre = require('../models/genre')
const Manga = require('../models/manga')

function getAuthorById(id) {
    return Author.findById(id)
}

function getAuthor(search) {
    return Author.find(search)
}

function getGenreById(id) {
    return Genre.findById(id)
}

function getGenres(search) {
    return Genre.find(search)
}

function getMangaById(id) {
    return Manga.findById(id)
}

function getMangas(search) {
    return Manga.find(search)
}

module.exports = { getAuthorById, getAuthor, getGenreById, getGenres, getMangaById, getMangas }
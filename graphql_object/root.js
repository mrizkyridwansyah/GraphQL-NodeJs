const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const Author = require('../models/author')
const Genre = require('../models/genre')
const Manga = require('../models/manga')
const dataObjType = require('./child')
const authorsData = Author.find()
const genresData = Genre.find()
const mangasData = Manga.find()

const rootObjType = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root of all queries',
    fields: () => ({
        authors: { type: new GraphQLList(dataObjType.authorsObjType), resolve: () => authorsData }, 
        genres: { type: new GraphQLList(dataObjType.genreObjType), resolve: () => genresData }, 
        mangas: { type: new GraphQLList(dataObjType.mangaObjType), resolve: () => mangasData }
    })
})

module.exports = rootObjType
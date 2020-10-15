const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLList } = require('graphql')
const { getAuthor, getGenres, getMangas } = require('../data/get_data')

const authorsObjType = new GraphQLObjectType({
    name: 'Authors',
    description: 'List of Authors',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        mangas: { 
            type: new GraphQLList(mangaObjType),
            resolve: async (author) => {
                const mangasData = await getMangas()               
                return mangasData.filter(manga => manga.authorId == author.id)
            }
        }
    })
})
const genreObjType = new GraphQLObjectType({
    name: 'Genre',
    description: "List of Manga's Genre",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString)},
        type: { type: GraphQLNonNull(GraphQLString)},
        mangas: {
            type: GraphQLList(mangaObjType),
            resolve: async (genre) => {
                const mangasData = await getMangas()
                return mangasData.filter(manga => manga.genreId.split(',').includes(genre.id))
            }
        }
    })
})
const mangaObjType = new GraphQLObjectType({
    name: 'Manga',
    description: 'List of Manga',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        genreId: { type: GraphQLNonNull(GraphQLID) },
        genres: { 
            type: GraphQLList(genreObjType), 
            resolve: async (manga) => { 
                const genresData = await getGenres()
                return genresData.filter(genre => manga.genreId.includes(genre.id)) 
            }
        },        
        page_count: { type: GraphQLNonNull(GraphQLInt) },
        is_publish: { type: GraphQLNonNull(GraphQLBoolean) },
        authorId: { type: GraphQLNonNull(GraphQLID) },
        author: { 
            type: new GraphQLList(authorsObjType), 
            resolve: async (manga) => {
                const authorsData = await getAuthor()
                return authorsData.filter(author => author.id == manga.authorId)
            }
        } 
    })
})

module.exports= { authorsObjType, mangaObjType, genreObjType}
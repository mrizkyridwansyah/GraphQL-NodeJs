const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLNonNull } = require("graphql");
const { getAuthorById, getAuthor, getGenreById, getGenres, getMangaById, getMangas } = require('../data/get_data')
const dataObjType = require('./child')

const rootObjType = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root of all queries',
    fields: () => ({
        author: {
            type: dataObjType.authorsObjType,
            description: 'Get an Author',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parent, args) => {
                return await getAuthorById(args.id)
            } 
        },
        authors: { 
            type: new GraphQLList(dataObjType.authorsObjType), 
            description: 'Get Authors',
            args: {
                search: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                let search = { $or: [
                    { name: new RegExp(args.search, 'i') }                    
                ]}
                return await getAuthor(search)
            }
        }, 
        genre: {
            type: dataObjType.genreObjType,
            description: 'Get a Genre',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) } 
            },
            resolve: async (parent, args) => {
                return await getGenreById(args.id)
            }
        },
        genres: { 
            type: new GraphQLList(dataObjType.genreObjType), 
            description: 'Get Genres',
            args: {
                search: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                let search = { $or: [
                    { type: new RegExp(args.search, 'i') }                    
                ]}
                return await getGenres(search)
            }
        }, 
        manga: {
            type: dataObjType.mangaObjType,
            description: 'Get a Manga',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) } 
            },
            resolve: async (parent, args) => {
                return await getMangaById(args.id)
            }
        },
        mangas: { 
            type: new GraphQLList(dataObjType.mangaObjType), 
            description: 'Get Mangas',
            args: {
                search: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                let search = { $or: [
                    { title: new RegExp(args.search, 'i') },                    
                    { description: new RegExp(args.search, 'i') },                    
                ]}
                if(!isNaN(parseInt(args.search))) search.$or.push({ page_count: parseInt(args.search) })
                return await getMangas(search)
            }
        }
    })
})




module.exports = rootObjType
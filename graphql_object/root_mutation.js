const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID } = require("graphql");
const { authorsObjType, genreObjType, mangaObjType } = require("./child");
const Author = require('../models/author')
const Genre = require('../models/genre')
const Manga = require('../models/manga');

const rootMutationObjType = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'Root Mutation',
    fields: () => ({
        addAuthor : {
            type: authorsObjType,
            description: 'Add new Author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                const newAuthor = new Author ({ name: args.name })
                try{
                    await newAuthor.save()
                    return newAuthor
                } catch(err) {
                    console.log(err)
                }
            }
        },
        updateAuthor: {
            type: authorsObjType,
            description: 'Update Author',
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                try{
                    let author = await Author.findById(args.id)
                    author.name = args.name
                    await author.save()
                    return author
                } catch(err) {
                    console.log(err)
                }
            }
        },
        deleteAuthor: {
            type: authorsObjType,
            description: 'Delete Author',
            args: {
                id: { type: GraphQLID}
            },
            resolve: async (parent, args) => {
                try{
                    const author = await Author.findById(args.id)
                    await author.remove() 
                    return author
                } catch(err) {
                    console.log(err)
                }
            }
        },
        addGenre: {
            type: genreObjType,
            description: 'Add new Genre',
            args: { 
                type: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (parent, args) => {
                const newGenre = new Genre({ type: args.type })
                try{                    
                    await newGenre.save()
                    return newGenre
                } catch (err){
                    console.log(err)
                }
            }
        },
        addManga: {
            type: mangaObjType,
            description: 'Add new Manga',
            args: {
                title: {type : GraphQLNonNull(GraphQLString)},
                description: {type : GraphQLNonNull(GraphQLString)},
                page_count: {type : GraphQLNonNull(GraphQLInt)},
                is_publish: {type : GraphQLNonNull(GraphQLBoolean)},
                genreId: {type : GraphQLNonNull(GraphQLString)},
                authorId: {type : GraphQLNonNull(GraphQLID)},
            },
            resolve: async (parent, args) => {
                const newManga = new Manga({
                    title: args.title,
                    description: args.description,
                    page_count: args.page_count,
                    is_publish: args.is_publish,
                    genreId: args.genreId,
                    authorId: args.authorId  
                })

                try{
                    await newManga.save()
                    return newManga
                }catch(err) {
                    console.log(err)
                }
            }
        }
    })
})

module.exports = rootMutationObjType
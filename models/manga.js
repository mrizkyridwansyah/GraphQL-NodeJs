const mongoose = require('mongoose')

const mangaSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    page_count: {
        type: Number,
        required: true
    },
    is_publish: {
        type: Boolean,
        required: true
    },
    genreId: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    cover_image: {
        type: Buffer
    },
    cover_image_type: {
        type: String
    },
    create_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    published_date: {
        type: Date
    }
})

module.exports = mongoose.model('Manga', mangaSchema)
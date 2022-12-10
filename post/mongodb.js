import { Schema, Types, model } from 'mongoose'

const PostSchema = new Schema(
    {
        textContent: {
            type: String,
            required: [true, '  texto'],
            maxlength: 300,
        },
        author: {
            type: String,
            required: [true, ' autor'],
            maxlength: 20,
            minlength: 5,
        },
        createdBy: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, '  usuario']
        },
    },
    { timestamps: true }
)

export default model('Post', PostSchema)


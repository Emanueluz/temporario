import PostMongo from './mongodb'

class Post {
    constructor(textContent, author, createdBy) {
        this.textContent = textContent
        this.author = author
        this.createdBy = createdBy
    }
    async save() {
        const textContent = this.textContent
        const author = this.author
        const createdBy = this.createdBy
        const postMongo = await PostMongo.create({ textContent, author, createdBy })
        if (postMongo) {
            this.createdAt = postMongo.createdAt
            this._id = postMongo._id
        } else {
            return false
        }
        return true
    }
    static async find() {
        return await PostMongo.find().sort({ createdAt: -1 })
    }
    static async findByIdAndRemove(postId, userId) {
        return await PostMongo.findByIdAndRemove({
            _id: postId,
            createdBy: userId,
        })
    }
    static async findByIdAndEdit(postId, userId, text){
        let query = { _id: postId, createdBy: userId };
        let newvalues = { $set: { textContent: text } };
        return await PostMongo.updateOne(query, newvalues, { upsert: false })
    }
}

export default Post

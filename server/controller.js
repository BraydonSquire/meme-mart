module.exports = {
    getMemes: (req, res, next) => {
        const db = req.app.get('db')
        db.get_memes()
        .then(response => {
            res.status(200).send(response)
        })
    },
    getOneMeme: (req, res, next) => {
        const db = req.app.get('db')
        db.get_one_meme(req.params.id)
        .then(response => {
            res.status(200).send(response)
        })
    }
}
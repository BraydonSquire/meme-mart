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
    },
    favoriteMeme: (req, res, next) => {
        const db = req.app.get('db')
        db.favorite_meme(req.body.favid, req.body.favimg, req.body.favtitle, req.body.userid)
        .then(response => {
            res.status(200).send(response)
        }).catch( () => res.status(500).send('Something went wrong favoriting this meme!') )
    },
    getFavorites: (req, res, next) => {
        const db = req.app.get('db')
        db.get_favorites(req.params.id)
        .then(response => {
            res.status(200).send(response)
        })
    },
    unfavMeme: (req, res, next) => {
        const db = req.app.get('db')
        db.unfavorite_meme(req.body.favid, req.body.userid)
        .then( response => {
            res.status(200).send(response)
        }). catch( _ => res.status(500).send('Something went wrong unfavoriteding this meme!') )
    }
}
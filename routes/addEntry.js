const express = require('express')
const router = express.Router()

const Entry = require('../models/Entry')


router.post("/", (req, res) => {
    const { email, tag, pattern, response } = req.body
    // console.log(tag, pattern, response, email)

    const newEntry = new Entry({
        tag,
        pattern,
        response,
        email
    })

    newEntry.save()
        .then(entry => res.status(200).json({ message: "You Entry has been saved. Thanks for filling out :)" }))
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "There has been an error saving your response. Try again later" })
        })
})


module.exports = router
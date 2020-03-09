const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringToArray = require('../utils/parseStringToArray')
const checkNull = require('../utils/checkNull')

module.exports = {

    async index(request, response) {
        const devs = await Dev.find()
        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const techsArray = parseStringToArray(techs)

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = apiResponse.data

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            })
        }

        return response.json(dev)
    },

    async update(request, response) {
        const { github_username, name, techs, longitude, latitude, bio, avatar_url } = request.body
        let dev = await Dev.findOne({ github_username })

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        const newDev = {
            name,
            techs,
            location,
            bio,
            avatar_url,
        }

        checkNull(dev, newDev)
        dev = await Dev.findOneAndUpdate({ github_username }, newDev)
        return response.json({ "message": "User " + github_username + " updated" })
    },

    async delete(request, response) {
        const { github_username } = request.body
        let dev = await Dev.findOneAndRemove({ github_username })
        return response.json({ "message": "User " + github_username + " deleted" })
    }
}
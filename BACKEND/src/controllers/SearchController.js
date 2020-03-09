const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringToArray = require('../utils/parseStringToArray')

module.exports = {
    async index(request, response) {
        const { techs, longitude, latitude } = request.query
        techsArray = parseStringToArray(techs)
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            }
        })
        console.log(techs, longitude, latitude)
        return response.json(devs)
    }
}
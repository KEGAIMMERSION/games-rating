const fs = require("fs").promises
const parseBody = require("../appModules/http-utils/parse-body")
const { config, createRating, updateRating } = require("../appModules/rating")

async function voteRouteController(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 404
    res.end("Not Found")
  } else {
    try {
      res.statusCode = 200
      const body = await parseBody(req)
      const data = JSON.parse(body)
      const rating = createRating(data, config.WEIGHT)

      const ratingFile = await fs.readFile(config.PATH_TO_RATING_FILE)
      const ratingArray = JSON.parse(ratingFile)
      const newRating = updateRating(ratingArray, data.id, rating)

      await fs.writeFile(config.PATH_TO_RATING_FILE, JSON.stringify(newRating))
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(newRating.sort((a, b) => b.rating - a.rating)))
    } catch (error) {
      res.statusCode = 500
      res.end("Internal Server Error")
    }
  }
}

module.exports = voteRouteController
const http = require("http")
const defaultRouteController = require("./controllers/default")
const mainRouteController = require("./controllers/main")
const gameRouteController = require("./controllers/game")
const voteRouteController = require("./controllers/vote")


const server = http.createServer((req, res) => {
  const url = req.url;
  switch (url) {
    case "/":   
    mainRouteController(res, "/index.html", ".html")
      break
        case "/game":
          gameRouteController(res)
          break
        case "/vote":
          voteRouteController(req, res)
          break  
        default:
          defaultRouteController(res, url)
    }
})

server.listen(3005)


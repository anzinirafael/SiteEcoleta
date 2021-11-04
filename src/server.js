const express = require("express")
const server = express()
const db = require("./database/db.js")
//configurar pasta publica
server.use(express.static("public"))
//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))
//ultilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/view", {
    express: server,
    noCache: true
})
//configurando a caminhos para minha aplicação
//página inicial
//req: requisição
//res: resposta
server.get("/", function (req, res) {
    return res.render("index.html", { title: "Um título" })
})
server.get("/create-point", function (req, res) {
    return res.render("create-point.html")
})
server.post("/create-point", function (req, res) {

    const query = `
        INSERT INTO places(
            image, name, address, address2, state, city, items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.itemColeta
    ]
    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        return res.render("create-point.html", { create: true })
    }
    db.run(query, values, afterInsertData)
})

server.get("/search", function (req, res) {
    const search = req.query.search
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        return res.render("search-results.html", { places: rows, total: total })
    })
})
server.listen(3000)
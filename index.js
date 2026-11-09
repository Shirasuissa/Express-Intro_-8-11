// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)

// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")

//part1
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())

app.get("/greet", (req, res) => {
    const timestamp = new Date().toISOString()

    res.json({ msg: `hi from get endpoint ${timestamp}` })
})

app.get("/test", async (req, res) => {
    const response = await fetch(`http://localhost:${PORT}/greet/Bob`)
    const data = await response.json()

    if (typeof data.msg === "string" && data.msg.includes("Bob")) {
        res.json({ result: "ok" })
    } else {
        res.json({ result: "fail" })
    }
})


//part2
app.get("/greet/:name", (req, res) => {
    const name = req.params.name
    console.log(`i got name: ${name}`)

    res.json({ msg: `got name: ${name}` })
})

//part3
app.post("/action", async (req, res) => {
    const body = req.body
    if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).length !== 1 || (body.action !== "joke" && body.action !== "cat fact")) {
        return res.status(400).json({ msg: "body is malformed" })
    }

    if (body.action === "joke") {
        try {
            const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single&safe-mode")

            if (!response.ok) {
                return res.status(502).json({ msg: "upstream failed" })
            }

            const data = await response.json()
            const upperJoke = data.joke.toUpperCase()

            return res.json({ joke: upperJoke })
        }
        catch (error) {
            return res.status(502).json({ msg: "upstream failed" })
        }
    }

    if (body.action === "cat fact") {
        try {
            const key = process.env.CAT_API_KEY

            const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=11",
                {
                    headers: { "x-api-key": key }
                }
            )

            if (!response.ok) {
                return res.status(502).json({ msg: "upstream failed" })
            }

            const data = await response.json()

            return res.json({ length: String(data.length) })

        } catch (error) {
            return res.status(502).json({ msg: "upstream failed" })
        }
    }


})

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })
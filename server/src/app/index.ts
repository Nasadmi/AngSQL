import express from "express"

import morgan from "morgan"

import cors from "cors"

import { port } from "../config/server.json"

import { connectionsAPI } from "../router/connections"

import { authAPI } from "../router/auth"

import { dbAPI } from "../router/db"

const app = express()

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cors())

app.use(morgan("dev"))

app.disable("x-powered-by")

app.use(connectionsAPI)

app.use(authAPI)

app.use(dbAPI)

app.set("port", port)

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`)
})
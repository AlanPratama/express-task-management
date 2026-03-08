import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes/index.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { responseError } from './shared/utils/response.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static("public"))

app.use("/api", routes)

app.use((req, res, next) => {
  responseError(res, 404, "Route tidak ditemukan")
})

app.use(errorMiddleware)

export default app
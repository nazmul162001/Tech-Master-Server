import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from './app/routes'
import globalErrorHandlers from './app/middlewares/globalErrorHandler'
import { sendSuccessResponse } from './shared/sendCustomResponse'
import notFoundRoute from './app/routes/notFoundRoute'
const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Welcome Route
app.get('/', async (req: Request, res: Response) => {
  const responseData = {
    message: 'Welcome to the Server',
    data: null,
  }
  sendSuccessResponse(res, responseData)
})
// Application routes
app.use('/api/v1', routes)
//global error handler
app.use(globalErrorHandlers)
// handle not found route
app.use(notFoundRoute)

export default app

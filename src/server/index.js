import serialize from 'serialize-javascript'

//express
import express from 'express'
import cors from 'cors'

//react
import * as React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

//components
import App from '../app'


const setBrowserEnv = () => {
  global.window = {
    location: {
      pathname        : ''
    },
    localStorage: {
      getItem         : () => { },
      setItem         : () => { },
      removeItem      : () => { }
    },
    innerWidth        : 1366,
    navigator         : {},
    document: {
      querySelector   : () => { }
    },

    //индикатор дали window се вика от съръвра или от клиентската част
    serverEnv         : true
  }

  global.self         = window
  global.document     = window.document
  global.localStorage = window.localStorage
  global.navigator    = window.navigator
}

/**
 * 
 * @param   {object} req 
 * @returns {string}
 */
const getHomeUrl = req => `${req.protocol}://${req.get('host')}`

/**
 * 
 * @param   {object} req 
 * @returns {string}
 */
const getFullUrl = req => `${getHomeUrl(req)}${req.originalUrl}`

const app = express()

app.use(cors())
app.use(express.static('public'))
app.get('*', async (req, res, next) => {
  try {
    setBrowserEnv()
    
    const data = { data: 'Hello from server!' }
    const markup = ReactDOM.renderToString(<StaticRouter location={req.url}><App /></StaticRouter>)

    res.send(`
      <!DOCTYPE html>
      <html lang='bg'>
        <head>
          <meta charset='utf-8' />
          <link rel='icon' href='/favicon.ico' />
          <meta name='viewport' content='user-scalable=no, width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#000000' />
          <title>${getFullUrl(req)}</title>
         
          <script defer>window.__SERVER_DATA__=${serialize(data)}</script>
          <script src='/client.js' defer></script>
          <link href='/main.css' rel='stylesheet'>
        </head>

        <body>
          <div id='app'>${markup}</div>
        </body>
      </html>
    `)
  } catch (err) {
    res.send(`Възникна сървърна грешка.: ${err}`)
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
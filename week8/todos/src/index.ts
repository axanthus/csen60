import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

const app = new Hono()

//our database
const todos = [
  {
    id: 1,
    description: "Turn in homework",
    isComplete: false
  },
  {
    id: 2,
    description: "Study for test",
    isComplete: false
  }
]

const cartItems = [
  {
    id: 1,
    name: "",
    price: 25.99,
    quantity: 1
  },

]



app.use("/*", serveStatic({
  root: "./static",
}))


app.get('/api/todos', (c) => {
  //database call to fetch todos
  console.log("fetching and returning todos")
  return c.json(todos)
})

app.post('/api/cart', (c) => {
  const item = c.body
  cartItems.push(item)
  return c.json({ itemCount: cartItems.length})
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

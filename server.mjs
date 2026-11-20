import { serve } from 'srvx'
import { staticMiddleware } from 'srvx/static'
import handler from './dist/server/server.js'

const port = Number(process.env.PORT ?? 3000)
const hostname = process.env.HOST ?? '0.0.0.0'

serve({
  port,
  hostname,
  middleware: [
    staticMiddleware({
      dir: new URL('./dist/client', import.meta.url).pathname,
    }),
  ],
  fetch: handler.fetch,
})

console.info(`portfolio-v2 → http://localhost:${port}`)

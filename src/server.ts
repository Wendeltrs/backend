import { env } from './env'
import { app } from './app'

app.listen({
    port: env.PORT //Porta
})
.then(() => {
    console.log('HTTP Server Running!')
})
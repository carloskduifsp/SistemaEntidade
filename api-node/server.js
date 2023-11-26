/*import {createServer} from 'node:http'

const server = createServer((request, response) =>{
    response.write( "hello")
    return response.end()
})

server.listen(3332)*/
import { fastify } from 'fastify'

const server = fastify()

server.get('/', () => {
    return 'Hello World'
})
server.get('/ola', () => {
    return 'Ola Mundo'
})
server.listen({
    port: 3332
});
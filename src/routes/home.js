import { Router } from 'express'

const route = new Router();

route.get('/', (req, res) => res.send('index'))

export default route;
export {
    route
}
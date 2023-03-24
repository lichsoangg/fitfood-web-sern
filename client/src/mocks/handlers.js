import { rest } from 'msw'
import { responseLogin, responseProduct, responseProducts } from '../test/data'
export const handlers = [
  rest.post(`${process.env.REACT_APP_API_FITFOOD_URL}/auth/login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseLogin))
  }),
  rest.get(`${process.env.REACT_APP_API_FITFOOD_URL}/user/me`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseLogin))
  }),
  rest.get(`${process.env.REACT_APP_API_FITFOOD_URL}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseProducts))
  }),
  rest.get(`${process.env.REACT_APP_API_FITFOOD_URL}/products/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseProduct))
  })
]

import { rest } from 'msw'
export const handlers = [
  rest.post(`${process.env.REACT_APP_API_FITFOOD_URL}/auth/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          Username: 'duytran@gmail.com',
          Role: 2,
          IsActive: 2,
          Name: 'Khánh Duy2',
          DayOfBirth: '2000-09-01',
          PhoneNumber: '0333121131',
          Gender: 1,
          Province: '79',
          District: '773',
          Ward: '27283',
          Address: 'Ho Chi Minh',
          Avatar: '',
          AccessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImR1eXRyYW5AZ21haWwuY29tIiwiUm9sZSI6MiwiSXNBY3RpdmUiOjIsImlhdCI6MTY3OTU5NDI5NSwiZXhwIjoxNjc5NTk0NTk1fQ.Qw6nhkkvUQNpRjmb0ifEzAEU48iTw2-NOVJFIv6P-QQ'
        },
        status: 200
      })
    )
  }),
  rest.get(`${process.env.REACT_APP_API_FITFOOD_URL}/user/me`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          Username: 'duytran@gmail.com',
          Role: 2,
          IsActive: 2,
          Name: 'Khánh Duy2',
          DayOfBirth: '2000-09-01',
          PhoneNumber: '0333121131',
          Gender: 1,
          Province: '79',
          District: '773',
          Ward: '27283',
          Address: 'Ho Chi Minh',
          Avatar: ''
        },
        status: 200
      })
    )
  }),
  rest.get(`${process.env.REACT_APP_API_FITFOOD_URL}/products/state=-1`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        data: {
          data: [
            {
              ProductID: 5,
              Quantity: 1,
              Name: 'Cơm gạo lức ăn liền ',
              Unit: 'Gói',
              Avatar: 'http://api.fitfood.kd14.me/images/ProductAvatar_5.png',
              Price: 100000,
              MaxQuantity: 4321
            }
          ]
        }
      })
    )
  })
]

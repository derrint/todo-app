import { rest } from 'msw'

const initialData = {
  data: [
    {
      id: '28',
      name: 'Go to the gym',
      done: false,
      details: `Don't forget to bring a towel`,
      created_at: '2024-03-20T13:51:27.910454338Z'
    },
    {
      id: '30',
      name: 'Take cat on a walk',
      done: false,
      details: '',
      created_at: '2024-03-20T13:51:27.910454338Z'
    },
    {
      id: 42,
      name: 'Wash car',
      done: false,
      details: '',
      created_at: '2024-03-20T13:51:27.910454338Z'
    },
    {
      id: 56,
      name: 'Go on a fishing trip with some friends',
      done: false,
      details: '',
      created_at: '2024-03-20T13:51:27.910454338Z'
    },
    {
      id: 91,
      name: 'Prepare a 72-hour kit',
      done: true,
      details: '',
      created_at: '2024-03-20T13:51:27.910454338Z'
    },
    {
      id: 126,
      name: 'Take a bubble bath',
      done: true,
      details: '',
      created_at: '2024-03-20T13:51:27.910454338Z'
    },
    {
      id: 128,
      name: 'Paint the first thing I see',
      done: false,
      details: '',
      created_at: '2024-03-20T13:51:27.910454338Z'
    }
  ],
  string: 'ok'
}

export const handlers = [
  rest.get('http://localhost:3000/api/todo', (_req, res, ctx) => {
    return res(ctx.json(initialData))
  }),
  rest.post('http://localhost:3000/api/todo', (_req, res, ctx) => {
    return res(ctx.json(initialData))
  }),
  rest.put('http://localhost:3000/api/todo/:id', (_req, res, ctx) => {
    return res(ctx.json(initialData))
  }),
  rest.delete('http://localhost:3000/todo/:id', (_req, res, ctx) => {
    return res(ctx.json(initialData))
  })
]

/*
  Mocking data for slp unit tests.
*/

// Mock the ctx object that would get passed in a normal query.
const mockCtx = {
  request: {
    method: 'GET',
    url:
      '/slp/validate/1e2fc27ec0438cd7e1ac6d4b549e218e6663c75480248f5cc6361cb11c742d74',
    header: {
      accept: 'application/json',
      host: 'localhost:5001',
      connection: 'close'
    }
  },
  response: {
    status: 404,
    message: 'Not Found',
    header: {
      vary: 'Origin'
    }
  },
  app: {
    subdomainOffset: 2,
    proxy: false,
    env: 'development'
  },
  originalUrl:
    '/slp/validate/1e2fc27ec0438cd7e1ac6d4b549e218e6663c75480248f5cc6361cb11c742d74',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>'
}

module.exports = {
  mockCtx
}

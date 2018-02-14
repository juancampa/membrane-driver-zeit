// const { TOKEN } = process.env
const TOKEN  = 'odCzqZ1jf7KJsF9Lyq90rNvT'

const client = require('axios').create({
  baseURL: 'https://api.zeit.co/v2/now/',
  headers: {
    Authorization: 'Bearer ' + TOKEN
  },
})

export async function get(url, params) {
  const result = await client.get(url, { params })
  return result.data
}

export async function post(url, body, params) {
  const result = await client.post(url, body, { params })
  return result
}

export async function put(url, body, params) {
  const result = await client.put(url, body, { params })
  return result
}

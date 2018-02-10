const { TOKEN } = process.env

const client = require('axios').create({
  baseURL: 'https://api.zeit.co/v2/now/',
  params: {},
  headers: {
    Authorization: 'Bearer ' + TOKEN
  }
})

export async function get(url, params, headers) {
  const result = await client.get(url, { params, headers })
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

const { TOKEN } = process.env
if (!TOKEN) {
	throw new Error('Please provide TOKEN as environment variables')
}

const NowClient = require('now-client')

const api = new NowClient(TOKEN)

export const now = api

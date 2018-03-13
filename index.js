import { get, post } from './client'
import { parse as parseUrl } from 'url'

const { root } = program.refs

export async function init() {
  await root.set({
    deployments: {},
    teams: {},
    aliases: {},
  })
}

export async function parse({ name, value }) {
  console.log('Parsing', name, value)
  switch (name) {
    case 'url': {
      const result = await get(`/v2/now/deployments`)
      const dep = result.deployments.find((d) => d.url === value)
      console.log(dep)
      if (dep) {
        const uid = dep.uid
        return root.deployments.one({ uid: uid })
      }
      break
    }
  }
}

export const DeploymentsCollection = {
  async one({ args }) {
    if (args.teamId) {
      const result = await get(
        `/v2/now/deployments/${args.uid}?teamId=${args.teamId}`,
      )
      return result
    } else {
      const result = await get(`/v2/now/deployments/${args.uid}`)
      return result
    }
  },
  async items({ args }) {
    console.log(args)
    if (args.teamId) {
      const result = await get(`/v2/now/deployments?teamId=${args.teamId}`)
      console.log('RESULT' + result)
      return result.deployments
    } else {
      const result = await get(`/v2/now/deployments/`)
      return result.deployments
    }
  },
}

// export const ScaleConfiguration = {
// };

export let DeploymentsItem = {
  self({ source }) {
    const { uid } = source
    if (uid === undefined || uid === null) {
      return null
    }
    return root.deployments.one({ uid: source.uid })
  },
}

export const Deployment = {
  async setAlias({ self, args }) {
    const { uid } = self.match(root.deployments.one())
    if (uid === undefined || uid === null) {
      return null
    }
    result = await post(`/v2/now/deployments/${uid}/aliases`, {
      alias: args.alias,
    })
    return result.status
  },

  async aliases({ source }) {
    const { uid } = source
    if (uid === undefined || uid === null) {
      return null
    }
    result = await get(`/v2/now/deployments/${uid}/aliases`)
    return result.aliases
  },

  async self({ source }) {
    return root.deployments.one({ uid: source.uid })
  },
}

export const AliasesCollection = {
  async one({ args }) {
    result = await get(`/v2/now/aliases/`)
    const alias = result.aliases.find((one) => one.uid === args.uid)
    return alias
  },
  async items() {
    const result = await get(`/v2/now/aliases/`)
    return result.aliases
  },
}

export const Alias = {
  async self({ source }) {
    return root.aliases.one({ uid: source.uid })
  },
}

export const TeamsCollection = {
  async one({ args }) {
    const result = await get(`/teams/${args.id}`)
    return result
  },
  async items() {
    const result = await get(`/teams/`)
    return result.teams
  },
}

export const Team = {
  async self({ source }) {
    return root.teams.one({ id: source.id })
  },
}

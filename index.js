import { get, post } from './client';

const { root } = program.refs;

export async function init() {
  // Called when the program is run
  return root.set({
    deployments: {},
    teams: {}
  });
}

export const DeploymentsCollection = {
  async one({ args }) {
    const result = await get(`/v2/now/deployments/${args.uid}`);
    return result;
  },
  async items() {
    const result = await get(`/v2/now/deployments/`);
    return result.deployments;
  }
};

export let DeploymentsItem = {
  self({ source }) {
    const { uid } = source;
    if (uid === undefined || uid === null) {
      return null;
    }
    return root.deployments.one({ uid: source.uid });
  }
};

export const Deployment = {
  async setAlias({ self, args }) {
    const { uid } = self.match(root.deployments.one());
    if (uid === undefined || uid === null) {
      return null;
    }
    result = await post(`/v2/now/deployments/${uid}/aliases`, {
      alias: args.alias
    });
    console.log(result);
    return result.status;
  },
  async getAliases({ source }) {
    const { uid } = source;
    if (uid === undefined || uid === null) {
      return null;
    }
    result = await get(`/v2/now/deployments/${uid}/aliases`);
    return result.aliases;
  },
  async self({ source }) {
    return root.deployments.one({ uid: source.uid });
  },
  uid({ source }) {
    return source['uid'];
  }
};

export const AliasesCollection = {
  async one({ args }) {
    result = await get(`/v2/now/aliases/`);
    const alias = result.aliases.find(one => one.uid === args.uid);
    return alias;
  },
  async items() {
    const result = await get(`/v2/now/aliases/`);
    result.aliases;
  }
};

// export let AliasesItem = {
//   self({ source }) {
//     const { uid } = source;
//     if (uid === undefined || uid === null) {
//       return null;
//     }
//     return root.aliases.one({ uid: source.uid });
//   }
// };

export const Alias = {
  async self({ source }) {
    return root.aliases.one({ uid: source.uid });
  },
  uid({ source }) {
    return source['uid'];
  }
};

export const TeamsCollection = {
  async one({ args }) {
    const result = await get(`/teams/${args.id}`);
    return result;
  },
  async items() {
    const result = await get(`/teams/`);
    return result.teams;
  }
};

export const Team = {
  async self({ source }) {
    return root.teams.one({ id: source.id });
  },
  id({ source }) {
    return source['id'];
  }
};

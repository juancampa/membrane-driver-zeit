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
  },
  async self({ source }) {
    return root.deployments.one({ uid: source.uid });
  },
  uid({ source }) {
    return source['uid'];
  }
};

export const Instances = {
  async items({ self, args }) {
    const { uid } = self.match(root.deployments.one());
    if (uid === undefined || uid === null) {
      return null;
    }
    const result = await get(`/v1/now/deployments/${uid}/instances/`);
    return result.instances;
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

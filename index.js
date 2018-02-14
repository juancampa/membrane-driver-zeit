import { get } from './client';

const { root } = program.refs;

export async function init() {
  // Called when the program is run
  return root.set({
    deployments: {},
    teams: {},
  });
}

export const DeploymentsCollection = {
  async one({ args }) {
    const result = await get(`/v2/now/deployments/${args.id}`);
    return result;
  },
  async items() {
    const result = await get(`/v2/now/deployments/`);
    return result.deployments;
  },
};

export const TeamsCollection = {
  async one({ args }) {
    const result = await get(`/teams/${args.id}`);
    return result;
  },
  async items() {
    const result = await get(`/teams/`);
    return result.teams;
  },
};

export const Deployment = {
  async self({ source }) {
    return root.deployments.one({ id: source.id });
  },
  uid({ source }) {
    return source['uid'];
  },
  name({ source }) {
    return source['name'];
  },
  url({ source }) {
    return source['url'];
  },
  created({ source }) {
    return source['created'];
  },
  state({ source }) {
    return source['state'];
  },
  type({ source }) {
    return source['type'];
  },
};

export const Team = {
  async self({ source }) {
    return root.teams.one({ id: source.id });
  },
  id({ source }) {
    return source['id'];
  },
  slug({ source }) {
    return source['slug'];
  },
  name({ source }) {
    return source['name'];
  },
  creatorId({ source }) {
    return source['creatorId'];
  },
  avatar({ source }) {
    return source['avatar'];
  },
};

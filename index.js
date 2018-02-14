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
    const result = await get(`/v2/now/deployments/${args.uid}`);
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

export const Deployments = {
  async self({ source }) {
    return root.deployments.one({ uid: source.uid });
  },
  uid({ source }) {
    return source['uid'];
  },
};

export const Team = {
  async self({ source }) {
    return root.teams.one({ id: source.id });
  },
  id({ source }) {
    return source['id'];
  },
};

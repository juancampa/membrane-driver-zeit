import { get } from './client';

const { root } = program.refs;

export async function init() {
  // Called when the program is run
  await root.set({
    deployments: {},
  });
}

export async function update({ previousVersion }) {
  console.log('updating Zeit Driver from previous version: ', previousVersion);
}

export const DeploymentsCollection = {
  async one({ args }) {
    const result = await get(`/deployments/${args.id}`);
    return result;
  },
  async items() {
    const result = await get(`/deployments/`);
    return result;
  },
};

export const Deployment = {
  async self({ source }) {
    return root.deployments.one({ id: source.id });
  },
  uid({ source }) {
    return source['uid'];
  },
};

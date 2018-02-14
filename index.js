import * as client from './client';

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

export let Root = {};

export const DeploymentsCollection = {
  async one({ args }) {
    const result = await client.get(`/deployments/${args.id}`);
    return result.data;
  },
  async items() {
    const result = await client.get(`/deployments/`);
    console.log('RESULT', result);
    if (!result.status) {
      return null;
    }
    return result.data;
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
};

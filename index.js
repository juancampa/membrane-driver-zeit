import { get } from './client';

const { root } = program.refs;

export async function init() {
  // Called when the program is run
  return root.set({ deployments: {} });
  // await root.set({
  //   deployments: {},
  // });
}

export const DeploymentsCollection = {
  async one({ args }) {
    const result = await get(`/deployments/${args.id}`);
    return result;
  },
  async items() {
    const result = await get(`/deployments/`);
    return result.deployments;
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

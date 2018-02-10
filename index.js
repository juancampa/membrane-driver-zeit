import * as client from './client';

const { root } = program.refs

export async function init() {
  // Called when the program is run
  await root.set({
    deployments: {}
  })
}

export async function update({ previousVersion }) {
  console.log('updating Zeit Driver from previous version: ', previousVersion);
}

export const DeploymentsCollection = {
  async items() {
    return client.get(`/deployments/`);
  }
}

export const Deployment = {
  uid({ source }) {
    return source['uid'];
  }
}

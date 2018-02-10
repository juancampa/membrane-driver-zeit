import { now } from './client.js'

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
    const deployments = await now.getDeployments()
    return deployments;
  }
}

export const Answers = {
  id({ source }) {
    return source['id'];
  }
}
export let Root = {
}

export async function timer({ key }) {
  // Called every time a timer fires
}

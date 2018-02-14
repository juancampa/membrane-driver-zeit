const { dependencies, endpoints, environment, imports, schema, expressions } = program;

environment
  .add('TOKEN', 'The API TOKEN')

schema.type('Root')
  .field('deployments', 'DeploymentsCollection')
  .field('teams', 'TeamsCollection')

schema.type('DeploymentsCollection')
  .computed('one', '[Deployment]')
    .param('uid', 'String')
  .computed('items', '[Deployments]')

schema.type('Deployments')
  .computed('self', 'Deployment*')
  .field('uid', 'String')
  .field('name', 'String')
  .field('url', 'String')
  .field('created', 'String')
  .field('state', 'String')
  .field('type', 'String')

schema.type('Deployment')
  .computed('self', 'Deployment*')
  .field('uid', 'String')
  .field('host', 'String')
  .field('state', 'String')
  .field('type', 'String')
  .field('stateTs', 'String')

schema.type('TeamsCollection')
  .computed('one', 'Team')
    .param('id', 'String')
  .computed('items', '[Team]')

schema.type('Team')
  .computed('self', 'Team*')
  .field('id', 'String')
  .field('slug', 'String')
  .field('name', 'String')
  .field('creatorId', 'String')
  .field('avatar', 'String')

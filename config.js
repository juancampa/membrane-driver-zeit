const { dependencies, endpoints, environment, imports, schema, expressions } = program;

environment
  .add('TOKEN', 'The API TOKEN')

schema.type('Root')
  .action('setAlias')
    .param('alias', 'String')
    .param('uid', 'String')
  .field('deployments', 'DeploymentsCollection')
  .field('teams', 'TeamsCollection')

schema.type('DeploymentsCollection')
  .computed('one', 'Deployments')
    .param('uid', 'String')
  .computed('items', '[Deployments]')

schema.type('Deployments')
  .computed('self', 'Deployments*')
  .field('uid', 'String')
  .field('host', 'String')
  .field('state', 'String')
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

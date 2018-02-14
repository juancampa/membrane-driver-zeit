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
  .computed('one', 'Deployment')
    .param('uid', 'String')
  .computed('page', 'DeploymentsPage')

schema.type('DeploymentsPage')
  .field('items', '[Deployment]')
  .field('next', 'DeploymentsPage')

schema.type('Deployment')
  .computed('self', 'Deployment*')
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

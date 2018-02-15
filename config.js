const { dependencies, endpoints, environment, imports, schema, expressions } = program;

environment
  .add('TOKEN', 'The API TOKEN')

schema.type('Root')
  .field('deployments', 'DeploymentsCollection')
  .field('teams', 'TeamsCollection')
  .field('secrets', 'TeamsCollection')

schema.type('DeploymentsCollection')
  .computed('one', 'Deployment')
    .param('uid', 'String')
  .computed('items', '[DeploymentsItem]')

schema.type('DeploymentsItem')
  .field('uid', 'String')
  .computed('self', 'Deployment*')

schema.type('Deployment')
  .action('setAlias')
    .param('alias', 'String')
  .computed('self', 'Deployment*')
  .computed('items', '[Instances]')
  .field('uid', 'String')
  .field('host', 'String')
  .field('state', 'String')
  .field('stateTs', 'String')

schema.type('Instances')
  .field('uid', 'String')
  .field('url', 'String')

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

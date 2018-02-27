const { dependencies, endpoints, environment, imports, schema, expressions } = program;

environment
  .add('TOKEN', 'The API TOKEN')

schema.type('Root')
  .field('deployments', 'DeploymentsCollection')
  .field('teams', 'TeamsCollection')
  .field('aliases', 'AliasesCollection')

expressions
  .add('url', '^https://api.zeit.co/v2/now/deployments/.*$')

schema.type('DeploymentsCollection')
  .computed('one', 'Deployment')
    .param('uid', 'String')
  .computed('items', '[DeploymentsItem]')

schema.type('DeploymentsItem')
  .field('uid', 'String')
  .computed('self', 'Deployment*')

schema.type('Deployment')
  .computed('self', 'Deployment*')
  .field('uid', 'String')
  .field('host', 'String')
  .field('state', 'String')
  .field('stateTs', 'String')
  .action('setAlias')
    .param('alias', 'String')
  .computed('aliases', '[Alias]')

schema.type('AliasesCollection')
  .computed('one', 'Alias')
    .param('uid', 'String')
  .computed('items', '[Alias]')

schema.type('Alias')
  .computed('self', 'Alias*')
  .field('uid', 'String')
  .field('alias', 'String')
  .field('created', 'String')
  .field('deploymentId', 'String')

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

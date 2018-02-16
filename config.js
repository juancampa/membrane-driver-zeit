const { dependencies, endpoints, environment, imports, schema, expressions } = program;

environment
  .add('TOKEN', 'The API TOKEN')

schema.type('Root')
  .field('deployments', 'DeploymentsCollection')
  .field('teams', 'TeamsCollection')
  .field('aliases', 'AliasesCollection')
  // .field('instances', 'InstancesCollection')

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
  .computed('byDeployment', '[AliasesItem]')
    .param('uid', 'String')
  .field('uid', 'String')
  .field('host', 'String')
  .field('state', 'String')
  .field('stateTs', 'String')

schema.type('AliasesCollection')
  .computed('one', 'Alias')
    .param('uid', 'String')
  .computed('items', '[Alias]')

schema.type('AliasesItem')
  .field('uid', 'String')
  .computed('self', 'Alias*')

schema.type('Alias')
  .computed('self', 'Alias*')
  .field('uid', 'String')
  .field('alias', 'String')
  .field('created', 'String')
  .field('deploymentId', 'String')

schema.type('Team')
  .computed('self', 'Team*')
  .field('id', 'String')
  .field('slug', 'String')
  .field('name', 'String')
  .field('creatorId', 'String')
  .field('avatar', 'String')

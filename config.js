const { dependencies, endpoints, environment, imports, schema, expressions } = program;

environment
  .add('TOKEN', 'The API TOKEN')

schema.type('Root')
  .field('deployments', 'DeploymentsCollection')
  .field('teams', 'TeamsCollection')
  .field('aliases', 'AliasesCollection')
  // .field('instances', 'InstanceCollection')

expressions
  .add('url', '^[a-zA-Z0-9-]+\.now\.sh$')

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
  .field('scale','ScaleConfiguration')
  .action('setScaleConfiguration')
    .param('min', 'Int')
    .param('max', 'Int')
  .action('setAlias')
    .param('alias', 'String')
  .computed('aliases', '[Alias]')
  // .computed('instances','InstanceCollection')

schema.type('ScaleConfiguration')
  .field('current', 'Int')
  .field('min', 'Int')
  .field('max', 'Int')

// schema.type('InstanceCollection')
//   .computed('one', 'Instance')
//     .param('uid', 'String')
//   .computed('items', '[Instance]')

// schema.type('Instance')
//   .computed('self', 'Instance*')
//   .field('uid', 'String')
//   .field('url', 'String')

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
  .computed('deployments', 'DeploymentsCollection')

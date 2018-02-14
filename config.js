const { dependencies, endpoints, environment, imports, schema, expressions } = program;

environment
  .add('TOKEN', 'The API TOKEN')

schema.type('Root')
  .field('deployments', 'DeploymentsCollection')

schema.type('DeploymentsCollection')
  .computed('one', 'Deployment')
    .param('id', 'String')
  .computed('items', '[Deployment]')

schema.type('Deployment')
  .computed('self', 'Deployment*')
  .field('uid', 'String')
  .field('name', 'String')
  .field('url', 'String')
  .field('created', 'String')
  .field('state', 'String')
  .field('type', 'String')

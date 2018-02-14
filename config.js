const { dependencies, endpoints, environment, imports, schema, expressions } = program;

// Environment
environment
  .add('TOKEN', 'The API TOKEN')

  // Types
schema.type('Root')
  .field('deployments', 'DeploymentsCollection')

schema.type('DeploymentsCollection')
  .computed('one', 'Deployment')
    .param('id', 'String')
  .computed('items', '[Deployment]')

schema.type('Deployment')
  .computed('self', 'Deployment*')
  .field('uid', 'String')

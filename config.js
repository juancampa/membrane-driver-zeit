const { dependencies, endpoints, environment, imports, schema, expressions } = program;

// Environment
environment
  .add('TOKEN', 'The API TOKEN')

  // Types
schema.type('Root')
  .field('deployments', 'DeploymentsCollection')

schema.type('DeploymentsCollection')
  .computed('items', '[Deployments]')

// schema.type('Deployments')
//   .field('id', 'String')

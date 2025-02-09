/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'notes',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },
  async run() {
    const storage = await import('./infra/storage');
    await import('./infra/api');

    const auth = await import('./infra/auth');

    return {
      UserPool: auth.userPool.id,
      Region: aws.getRegionOutput().name,
      IdentityPool: auth.identityPool.id,
      UserPoolClient: auth.userPoolClient.id,
    };
  },
});

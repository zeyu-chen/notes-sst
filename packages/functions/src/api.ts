import { Example } from '@notes/core/example';
import { Handler } from 'aws-lambda';
import { Resource } from 'sst';

export const handler: Handler = async (_event) => {
  return {
    statusCode: 200,
    body: `${Example.hello()} Linked to ${Resource.Uploads.name}.`,
  };
};

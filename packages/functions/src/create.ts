import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Util } from '@notes/core/util';
import { Resource } from 'sst';
import * as uuid from 'uuid';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  let data = {
    content: '',
    attachment: '',
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Resource.Notes.name,
    Item: {
      // The attributes of the item to be created
      userId: '123', // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.send(new PutCommand(params));

  return JSON.stringify(params.Item);
});

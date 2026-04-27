import { chunk } from 'lodash';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const executeMultiple = async (promise: any[]) => {
  const results = await Promise.allSettled(promise);

  return results.map((item: any) => {
    if (item.reason) {
      console.log('item.reason', item.reason);
    }
    return item?.value;
  });
};

type QueryService<T> = {
  service: any;
  query: (conditions: T[]) => Promise<any>;
  conditions: T[];
};

export const executeParallelChunkedQueries = async <T = string>(
  services: QueryService<T>[],
  chunkSize = 500,
) => {
  const results: any[] = [];

  for (const { service, query, conditions } of services) {
    const codedChunks = chunk(conditions, chunkSize);

    const chunkedResults = await Promise.all(
      codedChunks.map(async (chunk) => {
        try {
          return await query.call(service, chunk);
        } catch (error) {
          console.error(`Error processing chunk:`, error);
          return null;
        }
      }),
    );

    results.push(chunkedResults.flat().filter((item) => item !== null));
  }

  return results;
};

export const promiseHelper = {
  sleep,
  executeMultiple,
  executeParallelChunkedQueries,
};

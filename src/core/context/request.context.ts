import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContextData {
  userId?: number;
  orgPath?: string;
  orgPaths?: string[];
  isSupperAdmin?: boolean;
  isBuyerDepartment?: boolean;
}

export const requestContext = new AsyncLocalStorage<RequestContextData>();

import {
  requestContext,
  RequestContextData,
} from '@app/core/context/request.context';
import { first, isEmpty } from 'lodash';

export const dbExtension = {
  // Add any helper methods here if needed
};

export const canAccessByOrg = <T extends { departmentId: number }>(
  options: OrgAccessOption<T>[] = [{ field: 'departmentId' }],
): any => {
  const store = requestContext.getStore();

  if (isEmpty(store)) {
    return {};
  }

  if (store?.isSupperAdmin || store?.isBuyerDepartment) {
    return {};
  }

  const filters: any = {};

  for (const opt of options) {
    const field = opt.field ?? 'departmentId';
    const resolver = defaultFieldResolvers[field as string];

    if (!resolver) continue;

    const value = resolver(store);
    if (value == null) continue;

    filters[field] = value;
  }

  return filters;
};

type OrgAccessOption<T> = {
  field?: keyof T;
  cb?: any;
  useExpr?: boolean;
};

const defaultFieldResolvers: Record<
  string,
  (store: RequestContextData | undefined) => any
> = {
  departmentId: (store: RequestContextData | undefined) => {
    return (
      store?.orgPaths?.map((path) => Number(first(path?.split('.')))) || []
    );
  },
};

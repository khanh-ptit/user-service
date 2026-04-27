import {
  requestContext,
  RequestContextData,
} from '@app/core/context/request.context';
import { first, isEmpty } from 'lodash';
import { FilterQuery } from 'mongoose';

const dateToString = (field: string, fmt = '%Y-%m-%d') => {
  return {
    $dateToString: {
      format: fmt,
      date: field,
    },
  };
};

export const dbExtension = {
  dateToString,
};

export const canAccessByOrg = <T extends { departmentId: number }>(
  options: OrgAccessOption<T>[] = [{ field: 'departmentId' }],
): FilterQuery<T> => {
  const store = requestContext.getStore();

  // không có context là case internal service gọi → không cần filter
  if (isEmpty(store)) {
    return {};
  }

  // nếu là admin hoặc phòng mua hàng (code: 3311) → không cần filter
  if (store?.isSupperAdmin || store?.isBuyerDepartment) {
    return {};
  }

  const filters: FilterQuery<T>[] = [];
  const filterExpr: FilterQuery<T>[] = [];

  for (const opt of options) {
    const field = opt.field ?? 'departmentId';

    const resolver =
      (opt.cb ?? opt.useExpr)
        ? (exprFieldResolvers[field as string] as AccessResolver<T> | undefined)
        : (defaultFieldResolvers[field as string] as
            | AccessResolver<T>
            | undefined);

    if (!resolver) continue;

    const value = resolver(store);
    if (value == null) continue;

    if (opt.useExpr) {
      filterExpr.push(value);
    } else {
      filters.push({
        [field]: value,
      } as FilterQuery<T>);
    }
  }

  if (isEmpty(filters) && isEmpty(filterExpr)) return {};

  return {
    $and: isEmpty(filters) ? filterExpr : filters,
  } as FilterQuery<T>;
};

type OrgAccessOption<T> = {
  field?: keyof T;
  cb?: AccessResolver<T>;
  useExpr?: boolean;
};

type AccessResolver<T> = (
  store: RequestContextData | undefined,
) => FilterQuery<T>[keyof T];

const defaultFieldResolvers: Record<
  string,
  (store: RequestContextData | undefined) => any
> = {
  departmentId: (store: RequestContextData | undefined) => {
    return {
      $in:
        store?.orgPaths?.map((path) => Number(first(path?.split('.')))) || [],
    };
  },

  orgPath: (store: RequestContextData | undefined) => {
    return {
      $regex: `^${store?.orgPath}`,
    };
  },
};

const exprFieldResolvers: Record<
  string,
  (store: RequestContextData | undefined) => any
> = {
  departmentId: (store: RequestContextData | undefined) => {
    return {
      $in: [
        '$departmentId',
        store?.orgPaths?.map((path) => Number(first(path?.split('.')))) || [],
      ],
    };
  },
};

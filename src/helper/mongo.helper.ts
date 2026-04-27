import {
  Condition,
  ConditionOperator,
} from '@app/core/types/condition-operator.type';

/**
 * Xây dựng toán tử MongoDB từ giá trị đầu vào.
 * Chuyển đổi các toán tử như eq, gt, lt, etc. thành các toán tử MongoDB tương ứng.
 * @param value - Giá trị đầu vào có thể là object chứa toán tử hoặc giá trị đơn giản.
 * @returns Toán tử MongoDB hoặc giá trị gốc nếu không phải object.
 * @example
 * buildOperator(5) // trả về 5
 * buildOperator({ eq: 'John' }) // trả về 'John'
 * buildOperator({ gt: 10, lt: 20 }) // trả về { $gt: 10, $lt: 20 }
 */
export function buildOperator(value: any) {
  if (typeof value !== 'object') return value;

  const condition: any = {};

  for (const op in value) {
    switch (op as ConditionOperator) {
      case 'eq':
        return value.eq;
      case 'gt':
        condition.$gt = value.gt;
        break;
      case 'gte':
        condition.$gte = value.gte;
        break;
      case 'lt':
        condition.$lt = value.lt;
        break;
      case 'lte':
        condition.$lte = value.lte;
        break;
      case 'ne':
        condition.$ne = value.ne;
        break;
      case 'in':
        condition.$in = value.in;
        break;
      case 'notIn':
        condition.$nin = value.notIn;
        break;
      case 'like':
        condition.$regex = value.like;
        condition.$options = 'i';
        break;
      case 'between':
        condition.$gte = value.between?.[0];
        condition.$lte = value.between?.[1];
        break;
    }
  }

  return condition;
}

/**
 * Xây dựng điều kiện $and từ một object điều kiện.
 * Tạo mảng các điều kiện con và kết hợp thành $and nếu có nhiều hơn một.
 * @param condition - Object chứa các điều kiện cho từng trường.
 * @param excludedKeys - Mảng các key cần loại trừ khỏi điều kiện.
 * @returns Điều kiện $and hoặc điều kiện đơn nếu chỉ có một.
 * @example
 * buildAndCondition({ name: { eq: 'John' }, age: { gt: 18 } })
 * // trả về { $and: [{ name: 'John' }, { age: { $gt: 18 } }] }
 * buildAndCondition({ name: { eq: 'John' } })
 * // trả về { name: 'John' }
 */
export function buildAndCondition(condition: Record<string, any>) {
  const andConditions: any[] = [];

  for (const key in condition) {
    andConditions.push({
      [key]: buildOperator(condition[key]),
    });
  }

  return andConditions.length === 1
    ? andConditions[0]
    : { $and: andConditions };
}

/**
 * Xây dựng điều kiện $or từ nhiều điều kiện.
 * Nếu chỉ có một điều kiện, trả về điều kiện đó; nếu nhiều, kết hợp thành $or.
 * @param conditions - Mảng các điều kiện cần kết hợp.
 * @param excludedKeys - Mảng các key cần loại trừ khỏi mỗi điều kiện.
 * @returns Điều kiện $or hoặc điều kiện đơn.
 * @example
 * buildOrMatch([{ name: { eq: 'John' } }, { age: { gt: 18 } }], [])
 * // trả về { $or: [{ name: 'John' }, { age: { $gt: 18 } }] }
 * buildOrMatch([{ name: { eq: 'John' } }], [])
 * // trả về { name: 'John' }
 */
export function buildOrMatch(conditions: Condition[]) {
  if (conditions.length === 1) {
    return buildAndCondition(conditions[0]);
  }

  return {
    $or: conditions.map((cond) => buildAndCondition(cond)),
  };
}

/**
 * Kiểm tra xem có điều kiện nào trong mảng chứa key cụ thể không.
 * @param conditions - Mảng các điều kiện cần kiểm tra.
 * @param key - Key cần tìm trong các điều kiện.
 * @returns True nếu có ít nhất một điều kiện chứa key, ngược lại false.
 * @example
 * hasConditionWithKey([{ name: 'John' }, { age: 20 }], 'name') // trả về true
 * hasConditionWithKey([{ age: 20 }], 'name') // trả về false
 */
export function hasConditionWithKey(conditions: any[], key: string): boolean {
  return conditions?.some((cond) => Object.keys(cond)?.includes(key));
}

/**
 * Object chứa các hàm helper cho MongoDB.
 * Bao gồm các hàm xây dựng điều kiện truy vấn MongoDB.
 * @example
 * import { mongoHelper } from './mongo.helper';
 * const condition = mongoHelper.buildAndCondition({ name: { eq: 'John' } });
 */
export const mongoHelper = {
  buildOrMatch,
  buildOperator,
  buildAndCondition,
  hasConditionWithKey,
};

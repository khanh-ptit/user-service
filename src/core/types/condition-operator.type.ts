export type ConditionOperator =
  | 'eq'
  | 'in'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'ne'
  | 'lte'
  | 'like'
  | 'notIn'
  | 'between';

export class Condition {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  [field: string]: any | { [operator in ConditionOperator]?: any };
}

export class ApprovalResult {
  documentId?: string;

  nodeId?: number;

  needApproval: boolean;
}

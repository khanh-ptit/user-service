import { isEmpty } from 'lodash';
import { canAccessByOrg } from '../extension/common.extension';
import { Schema } from 'mongoose';

export function orgScopePlugin(schema: Schema) {
  schema.pre(
    ['find', 'findOne', 'updateOne', 'updateMany', 'deleteOne', 'deleteMany'],
    function <T extends { departmentId: number }>() {
      if (this.getOptions?.().withoutOrg) return;

      const orgFilter = canAccessByOrg<T>();

      if (isEmpty(orgFilter)) return;

      this.where(orgFilter);
    },
  );
}

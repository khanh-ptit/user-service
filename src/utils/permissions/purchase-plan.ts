import { FORMAT_CODE_PERMISSION, StatusPermission } from '@app/constant/common';

// Định nghĩa key gốc cho i18n (giả định nằm trong module 'purchase')
const i18nGroupKey = 'permission.purchasedRequest.purchasePlanGroup.';

export const PURCHASE_PLAN_GROUP_PERMISSION = {
  name: 'Quản lý Kế hoạch mua hàng',
  code: FORMAT_CODE_PERMISSION + 'PURCHASE_PLAN_GROUP',
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'name',
};

// Khai báo biến GROUP để tái sử dụng
const GROUP = PURCHASE_PLAN_GROUP_PERMISSION.code;

export const LIST_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'LIST_PURCHASE_PLAN',
  name: 'Danh sách kế hoạch mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'listPurchasePlan',
};

export const CREATE_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'CREATE_PURCHASE_PLAN',
  name: 'Tạo kế hoạch mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'createPurchasePlan',
};

export const UPDATE_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'UPDATE_PURCHASE_PLAN',
  name: 'Sửa kế hoạch mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'updatePurchasePlan',
};

export const DETAIL_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'DETAIL_PURCHASE_PLAN',
  name: 'Chi tiết kế hoạch mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'detailPurchasePlan',
};

export const REQUEST_APPROVAL_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'REQUEST_APPROVAL_PURCHASE_PLAN',
  name: 'Yêu cầu phê duyệt kế hoạch mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'requestApprovalPurchasePlan',
};

export const APPROVE_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'APPROVE_PURCHASE_PLAN',
  name: 'Phê duyệt kế hoạch mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'approvePurchasePlan',
};

export const REJECT_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'REJECT_PURCHASE_PLAN',
  name: 'Từ chối kế hoạch mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'rejectPurchasePlan',
};

export const CANCEL_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'CANCEL_PURCHASE_PLAN',
  name: 'Hủy kế hoạch mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'cancelPurchasePlan',
};

export const IMPORT_DETAIL_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'IMPORT_DETAIL_PURCHASE_PLAN',
  name: 'Import Chi tiết kế hoạch mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'importDetailPurchasePlan',
};

export const REQUEST_SUPPLEMENTARY_INFO_PURCHASE_PLAN_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'REQUEST_SUPPLEMENTARY_INFO_PURCHASE_PLAN',
  name: 'Yêu cầu bổ sung thông tin',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'requestSupplementaryInfo',
};

export const PURCHASE_PLAN_PERMISSION = [
  LIST_PURCHASE_PLAN_PERMISSION,
  CREATE_PURCHASE_PLAN_PERMISSION,
  UPDATE_PURCHASE_PLAN_PERMISSION,
  DETAIL_PURCHASE_PLAN_PERMISSION,
  REQUEST_APPROVAL_PURCHASE_PLAN_PERMISSION,
  APPROVE_PURCHASE_PLAN_PERMISSION,
  REJECT_PURCHASE_PLAN_PERMISSION,
  CANCEL_PURCHASE_PLAN_PERMISSION,
  IMPORT_DETAIL_PURCHASE_PLAN_PERMISSION,
  REQUEST_SUPPLEMENTARY_INFO_PURCHASE_PLAN_PERMISSION,
];

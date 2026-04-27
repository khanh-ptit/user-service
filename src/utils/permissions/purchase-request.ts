import { FORMAT_CODE_PERMISSION, StatusPermission } from '@app/constant/common';

// Định nghĩa key gốc cho i18n
const i18nGroupKey = 'permission.purchasedRequest.purchaseRequestGroup.';

export const PURCHASE_REQUEST_GROUP_PERMISSION = {
  name: 'Quản lý Yêu cầu mua hàng',
  code: FORMAT_CODE_PERMISSION + 'PURCHASE_REQUEST_GROUP',
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'name',
};

// Khai báo biến GROUP để tái sử dụng
const GROUP = PURCHASE_REQUEST_GROUP_PERMISSION.code;

export const LIST_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'LIST_PURCHASE_REQUEST',
  name: 'Danh sách yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'listPurchaseRequest',
};

export const CREATE_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'CREATE_PURCHASE_REQUEST',
  name: 'Tạo yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'createPurchaseRequest',
};

export const UPDATE_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'UPDATE_PURCHASE_REQUEST',
  name: 'Sửa yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'updatePurchaseRequest',
};

export const DELETE_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'DELETE_PURCHASE_REQUEST',
  name: 'Xóa yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.INACTIVE,
  key: i18nGroupKey + 'deletePurchaseRequest',
};

export const DETAIL_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'DETAIL_PURCHASE_REQUEST',
  name: 'Chi tiết yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'detailPurchaseRequest',
};

export const REQUEST_APPROVAL_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'REQUEST_APPROVAL_PURCHASE_REQUEST',
  name: 'Yêu cầu phê duyệt yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'requestApprovalPurchaseRequest',
};

export const APPROVE_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'APPROVE_PURCHASE_REQUEST',
  name: 'Phê duyệt yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'approvePurchaseRequest',
};

export const RETURN_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'RETURN_PURCHASE_REQUEST',
  name: 'Trả lại yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'returnPurchaseRequest',
};

export const REJECT_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'REJECT_PURCHASE_REQUEST',
  name: 'Từ chối yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'rejectPurchaseRequest',
};

export const CANCEL_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'CANCEL_PURCHASE_REQUEST',
  name: 'Hủy yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'cancelPurchaseRequest',
};

export const IMPORT_DETAIL_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'IMPORT_DETAIL_PURCHASE_REQUEST',
  name: 'Import Chi tiết yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'importDetailPurchaseRequest',
};

export const ASSIGN_BUYER_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'ASSIGN_BUYER_PURCHASE_REQUEST',
  name: 'Phân công người mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'assignBuyerPurchaseRequest',
};

export const LIST_PURCHASE_REQUEST_FOR_PO_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'LIST_PURCHASE_REQUEST_FOR_PO',
  name: 'Danh sách yêu cầu mua hàng tạo PO',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.INACTIVE,
  key: i18nGroupKey + 'listPurchaseRequestForPo',
};

export const REQUEST_SUPPLEMENTARY_INFO_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'REQUEST_SUPPLEMENTARY_INFO_PURCHASE_REQUEST',
  name: 'Yêu cầu bổ sung thông tin',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'requestSupplementaryInfo',
};

export const EXPORT_PDF_PURCHASE_REQUEST_PERMISSION = {
  code: FORMAT_CODE_PERMISSION + 'EXPORT_PDF_PURCHASE_REQUEST',
  name: 'Xuất PDF yêu cầu mua hàng',
  groupPermissionSettingCode: GROUP,
  status: StatusPermission.ACTIVE,
  key: i18nGroupKey + 'exportPdfPurchaseRequest',
};

export const PURCHASE_REQUEST_PERMISSION = [
  LIST_PURCHASE_REQUEST_PERMISSION,
  CREATE_PURCHASE_REQUEST_PERMISSION,
  UPDATE_PURCHASE_REQUEST_PERMISSION,
  DELETE_PURCHASE_REQUEST_PERMISSION,
  DETAIL_PURCHASE_REQUEST_PERMISSION,
  REQUEST_APPROVAL_PURCHASE_REQUEST_PERMISSION,
  APPROVE_PURCHASE_REQUEST_PERMISSION,
  REJECT_PURCHASE_REQUEST_PERMISSION,
  CANCEL_PURCHASE_REQUEST_PERMISSION,
  IMPORT_DETAIL_PURCHASE_REQUEST_PERMISSION,
  ASSIGN_BUYER_PURCHASE_REQUEST_PERMISSION,
  LIST_PURCHASE_REQUEST_FOR_PO_PERMISSION,
  REQUEST_SUPPLEMENTARY_INFO_PURCHASE_REQUEST_PERMISSION,
  EXPORT_PDF_PURCHASE_REQUEST_PERMISSION,
  RETURN_PURCHASE_REQUEST_PERMISSION,
];

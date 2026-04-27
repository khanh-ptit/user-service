export enum APIPrefix {
  Version = 'api/v1',
}

export const FORMAT_CODE_PERMISSION = 'PURCHASED_REQUEST_';

export const REPLACE_PATTERN = /[%*!\\]/g;
export const CURRENCY_CODE = {
  VND: 'VND',
  USD: 'USD',
};
export const REPLACE_PATTERN_FILTER = /[%!]/g;

export const MIME_TYPES = {
  PDF: ['application/pdf'],
  IMAGE: [
    'png',
    'jpg',
    'jpeg',
    'apng',
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/apng',
  ],
};

export const SEPARATOR_CHAR = '-';

export const ORDER_BY_VALUE = {
  ASC: 'asc',
  DESC: 'desc',
};

export const MAX_RECORD_PER_PAGE = 100;

export const LANG = {
  EN: 'en',
  VI: 'vi',
};

export const DEFAULT_LANG = LANG.VI;

export enum LANG_ENUM {
  EN = 'en',
  JP = 'jp',
  VI = 'vi',
}

export enum SubModuleCodeEnum {
  PURCHASED_REQUEST = 'PURCHASED_REQUEST', // Yêu cầu mua hàng
  PURCHASED_PLAN = 'PURCHASED_PLAN', // Kế hoạch mua hàng
  PURCHASED_ORDER = 'PURCHASED_ORDER', // Đơn mua hàng
  QUOTATION_REVIEW = 'QUOTATION_REVIEW', // Quotation Review
  DELIVERY_NOTE = 'DELIVERY_NOTE', // Biên bản giao hàng
  DELIVERY_RETURN = 'DELIVERY_RETURN', // Ghi nhận hàng NG
  PAYMENT_REQUEST = 'PAYMENT_REQUEST', // Đề nghị thanh toán
  SUPPLIER_REVIEW = 'SUPPLIER_REVIEW', // Đánh giá NCC hàng năm
}

export enum SubSystemCodeEnum {
  PMS = 'PMS', // Mua hàng
}

export enum BusinessApprovalCodeEnum {
  DOMESTIC_PURCHASE = 'DOMESTIC_PURCHASE', // Quy trình Mua hàng trong nước
}

export enum StatusPermission {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum SyncStatusResultEnum {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'fail',
}

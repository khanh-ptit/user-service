export enum ErrorMessageEnum {
  // ================= General error message ===============================
  NOT_FOUND = 'Data not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Access denied',
  BAD_REQUEST = 'Bad request',
  SUCCESS = 'Success',

  // ================= Custom error message ===============================
  ITEM_GROUP_NOT_FOUND = 'Dữ liệu Nhóm Sản Phẩm không tồn tại',
  ITEM_TYPE_NOT_FOUND = 'Dữ liệu Kiểu Sản Phẩm không tồn tại',
  ITEM_UNIT_NOT_FOUND = 'Dữ liệu Đơn Vị Sản Phẩm không tồn tại',
  ITEM_DETAIL_NOT_FOUND = 'Dữ liệu Chi Tiết Sản Phẩm không tồn tại',
  ITEM_NOT_FOUND = 'Dữ liệu Sản Phẩm không tồn tại',
  CODE_EXIST = 'Dữ liệu Mã đã tồn tại',
  CODE_OR_NAME_IS_EXISTED = 'Dữ liệu Mã hoặc Tên đã tồn tại',
  CODE_ALREADY_EXISTS = 'Dữ liệu Mã đã tồn tại',
  NAME_ALREADY_EXISTS = 'Dữ liệu Tên đã tồn tại',
  ITEM_DETAIL_EXIST = 'Dữ liệu Chi Tiết Sản Phẩm đã tồn tại',
  CAN_NOT_DELETE = 'Bản ghi này không thể xóa',
  CAN_NOT_UPDATE = 'Bản ghi này không thể sửa',
  ITEM_DETAIL_AVAILABLE = 'Dữ liệu chi tiết sản phẩm đã có sẵn',
  ITEM_IN_ORDER = 'Dữ liệu Sản Phẩm đã có trong đơn hàng',
  ITEM_CODE_NOT_MATCH = 'Mã sản phẩm không hợp lệ',
  ITEM_CODE_KOGO_NOT_MATCH = 'Mã kogo không hợp lệ',
  ITEM_NAME_NOT_MATCH = 'Tên sản phẩm không hợp lệ',
  COST_CENTER_ITEM_TYPE_UNIQUE_ERROR = 'Cost center và loại sản phẩm bị trùng',
}

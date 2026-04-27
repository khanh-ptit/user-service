export enum ItemUnitStatusEnum {
  CREATED = 0,
  CONFIRMED = 1,
  REJECT = 2,
}

export enum ItemStatusEnum {
  DRAFT,
  WAITING_CONFIRM,
  CONFIRMED,
  REJECTED,
}

export enum ItemActiveStatusEnum {
  INACTIVE = 0,
  ACTIVE = 1,
}

export enum ItemSupplierStatusEnum {
  VALID, // đang có hiệu lực báo giá
  EXPIRED, // hết hiệu lực báo giá
  DISCONTINUED, // ngừng kinh doanh
  ACTIVE, // đang hoạt động
}

export enum STATUS_ENUM {
  INACTIVE = 0,
  ACTIVE = 1,
}

export enum ItemTypeEnum {
  IndirectGoods = 1, // Hàng hoá gián tiếp
  DirectGoods = 2, // Hàng hoá trực tiếp
  Services = 3, // Dịch vụ
  FinishedGoods = 4, // Thành phẩm
}

export enum ImportActionEnum {
  CREATE = 1,
  UPDATE = 2,
  DELETE = 3,
}

export enum ImportStatusEnum {
  PENDING = 1,
  PROCESSING = 2,
  SUCCESS = 3,
  FAILED = 4,
}

export enum ImportLogTypeEnum {
  PURCHASE_REQUEST_ITEM_LINE = 1,
}

export const SERIAL_REGEX = /^[a-zA-Z0-9]+$/;

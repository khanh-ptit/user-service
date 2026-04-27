export const LANG = {
  EN: 'en',
  VI: 'vi',
};

export enum UnitMeasuresEnum {
  CM = 1,
  DM = 2,
  M = 3,
}

export enum UnitWeightEnum {
  GAM = 1,
  KG = 2,
  TON = 3,
}

export enum WarehouseMovementTypeEnum {
  PO_IMPORT = 0,
  PO_EXPORT = 1,
  PRO_IMPORT = 2,
  PRO_EXPORT = 3,
  SO_IMPORT = 4,
  SO_EXPORT = 5,
  TRANFER_IMPORT = 6,
  TRANFER_EXPORT = 7,
  IMO_IMPORT = 8,
  EXO_EXPORT = 9,
  PO_IMPORT_RETURN = 10,
  SO_EXPORT_RETURN = 11,
  RETURN_IMPORT = 12,
  RETURN_EXPORT = 13,
  RETURN_PO_ERROR = 14,
  RETURN_SO_ERROR = 15,
  SWIFT_FLOOR_IMPORT = 16,
  SWIFT_FLOOR_EXPORT = 17,
  PO_IMPORT_RECEIVE = 18,
  PO_EXPORT_RECEIVE = 19,
}

export const WAREHOUSE_IMPORT_MOVEMENT_TYPES: number[] = [
  WarehouseMovementTypeEnum.PO_IMPORT,
  WarehouseMovementTypeEnum.PRO_IMPORT,
  WarehouseMovementTypeEnum.SO_IMPORT,
];

export const WAREHOUSE_EXPORT_MOVEMENT_TYPES: number[] = [
  WarehouseMovementTypeEnum.PO_EXPORT,
  WarehouseMovementTypeEnum.PRO_EXPORT,
  WarehouseMovementTypeEnum.SO_EXPORT,
];

export const UNIT_MEASURES_DEFAULT = UnitMeasuresEnum.CM;

export const UNIT_WEIGHT_DEFAULT = UnitWeightEnum.GAM;

export const UNIT_WEIGHT = [
  UnitWeightEnum.GAM,
  UnitWeightEnum.KG,
  UnitWeightEnum.TON,
];

export const UNIT_MEASURES = [
  UnitMeasuresEnum.CM,
  UnitMeasuresEnum.DM,
  UnitMeasuresEnum.M,
];

export const DATA_DEFAULT_MEASURES = {
  value: 0,
  unit: UnitMeasuresEnum.CM,
};

export const DATA_DEFAULT_WEIGHT = {
  value: 0,
  unit: UnitWeightEnum.GAM,
};

export const DEFAULT_LANG = LANG.VI;

export enum YES_NO_ENUM {
  NO,
  YES,
}

export enum TACTIC_RULE_ENUM {
  FIFO = 1,
}

export enum KEY_SEARCH {
  BOM_VERSION = 1,
  LOT_NUMBER = 2,
  COST_CENTER = 3,
  BUNDLE = 4,
  PACKING = 5,
  BOX = 6,
  QUALITY = 7,
  STORAGE_DATE = 8,
  LOCATOR = 9,
  ITEM_TYPE = 10,
  STATUS = 11,
  TICKET = 12,
  IMPORT_DATE = 13,
  TICKET_TYPE = 14,
  UNIT_PRICE = 15,
  BLUEPRINT = 16,
}

export const REGEX_CHARACTERS = /[A-Za-z\d!@#$%^&*()_\-=+"><?\/\\]*$/;

export enum TypeArrEnum {
  NUMBER = 'number',
  STRING = 'string',
}

export const DOLLAR_CHARACTER = '$';
export const SEMICOLON_CHARACTER = ';';

export const QR_PRODUCT_FIELDS = [
  'blueprintCode',
  'unknownField',
  'unknownField', // field nay de lay empty string
  'manufacturingOrderCode',
  'itemCode',
  'lot',
  'importDate',
  'mainQuantity',
];
export const QR_MATERIAL_FIELDS = [
  'itemCode',
  'supplierName',
  'box',
  'purchaseOrderId',
  'lot',
  'receiptDate',
  'mainQuantity',
  'subQuantity',
  'ticketCode',
  'expirationDate',
  'invoice',
];
export const DEFAULT_CURRENCY_UNIT = 'VND';

export enum FieldType {
  NUMBER = 'number',
  STRING = 'string',
  DATE = 'date',
}

export const FIELD_TYPE_MAP: Record<string, FieldType> = {
  warehouseId: FieldType.NUMBER,
  costCenterId: FieldType.STRING,
  itemId: FieldType.NUMBER,
  itemTypeId: FieldType.NUMBER,
  lotNumber: FieldType.STRING,
  blueprintCode: FieldType.STRING,
  bomVersionId: FieldType.NUMBER,
  packingId: FieldType.NUMBER,
  box: FieldType.STRING,
  ticketLocatorId: FieldType.STRING,
  storageDate: FieldType.DATE,
  producingStepId: FieldType.NUMBER,
  moId: FieldType.NUMBER,
  unitId: FieldType.NUMBER,
  quantity: FieldType.NUMBER,
};
export const ALLOW_MIMETYPE_IMAGES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'application/pdf',
];

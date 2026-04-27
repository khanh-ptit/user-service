export const ACTIONS = [
  'Thêm mới',
  'Chỉnh sửa',
  'Bỏ qua',
  'Create',
  'Edit',
  'Skip',
  '作成',
  '編集',
  'スキップ',
];

export const FILE_TYPE = {
  XLSX: {
    MIME_TYPE: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/wps-office.xlsx',
    ],
    EXT: 'xlsx',
  },
  CSV: {
    MIME_TYPE: 'text/csv',
    EXT: 'csv',
  },
};

export enum IMPORT_ACTION {
  ADD_VI = 'Thêm mới',
  UPDATE_VI = 'Chỉnh sửa',
  ADD_JP = '作成',
  UPDATE_JP = '編集',
}

export const IMPORT_CONST = {
  SHEET: {
    DATA_SHEET_NAME: 'Data',
    HEADER_ROW: 1,
    DATA_START_ROW: 2,
    HEADER_ROW_COUNT: 1,
    MAX_ROW_COUNT: 2000,
  },
  ACTION_HEADER: {
    COL_NAME: ['Hành động', 'Action', '操作'],
    DB_COL_NAME: 'ACTION',
    MAX_LENGTH: 255,
    ALLOW_NULL: false,
  },
  COL_OFFSET: {
    DEFAULT: 0,
    CSV: 1,
  },
  ROW_OFFSET: {
    DEFAULT: 2,
    CSV: 1,
  },
  TYPE_OF_ROW: 'Row',
  LOG_FILE_NAME: `import_log-{0}-{1}.${FILE_TYPE.CSV.EXT}`,
  UNICODE_PREFIX: '\uFEFF',
  ERR_CODE: {
    FILE_NOT_FOUND: 'ENOENT',
  },
  OUTPUT_FLAG: {
    WRITE: 'w',
  },
  DEFAULT_ENCODING: {
    TEXT: 'utf8',
    ENCODE: 'base64',
  },
};

export const ROW_NUMBER_START_DATA = 2;

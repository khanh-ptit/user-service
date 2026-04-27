import Big from 'big.js';
import { compact, isNil, map, replace, uniq } from 'lodash';

import { isNumber } from 'lodash';
import * as path from 'path';
import { SRC_DIR } from 'src/main';
import {
  TypeArrEnum,
  UNIT_MEASURES_DEFAULT,
  UNIT_WEIGHT_DEFAULT,
} from './constant';
import { CompareSizeDto } from './dto/compare-size.dto';
import { CompareWeightDto } from './dto/compare-weight.dto';

export enum EnumSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum EnumBoolean {
  YES = 'Y',
  NO = 'N',
}

export const minus = (first = 0, second = 0): number => {
  return Number(new Big(first || 0).minus(new Big(second || 0)));
};

export const plus = (first = 0, second = 0): number => {
  return Number(new Big(first).plus(new Big(second)));
};

export const mul = (first = 0, second: number): number => {
  return Number(new Big(first).mul(new Big(second)));
};

export const div = (first = 0, second: number): number => {
  return Number(new Big(first).div(new Big(second || 1)));
};

export const minusBigNumber = (first = 0, second = 0): any => {
  return new Big(first).minus(new Big(second)).valueOf();
};

export const plusBigNumber = (first = 0, second = 0): any => {
  return new Big(first).plus(new Big(second)).valueOf();
};

export const mulBigNumber = (first = 0, second = 0): any => {
  return new Big(first).mul(new Big(second)).valueOf();
};

export const divBigNumber = (first = 0, second: any): any => {
  return new Big(first).div(new Big(+second ? second : 1)).valueOf();
};

export const decimal = (x: number, y: number): number => {
  const mathOne = Number(new Big(10).pow(Number(new Big(x).minus(new Big(y)))));
  const mathTwo = Number(new Big(10).pow(Number(new Big(y).mul(new Big(-1)))));
  return Number(mathOne - mathTwo);
};

export const escapeCharForSearch = (str: string): string => {
  return str.toLowerCase().replace(/[?%\\_]/gi, function (x) {
    return '\\' + x;
  });
};

export const calculateVolume = (
  objWidth,
  objHeight,
  objLong,
  toUnit = UNIT_MEASURES_DEFAULT,
): number => {
  const width = formatUnitMeasures(objWidth.value, objWidth.unit, toUnit);
  const height = formatUnitMeasures(objHeight.value, objHeight.unit, toUnit);
  const long = formatUnitMeasures(objLong.value, objLong.unit, toUnit);
  return mul(mul(width, height), long);
};

export const formatUnitMeasures = (
  value,
  unit,
  toUnit = UNIT_MEASURES_DEFAULT,
) => {
  if (unit === toUnit) {
    return value;
  }
  const diffUnit = unit - toUnit;
  const diff = Math.pow(10, diffUnit > 0 ? diffUnit : diffUnit * -1);
  return diffUnit < 0 ? div(value, diff) : mul(value, diff);
};

export const formatUnitWeight = (value, unit, toUnit = UNIT_WEIGHT_DEFAULT) => {
  if (!isNumber(value) || !isNumber(unit)) {
    return 0;
  }
  if (unit === toUnit) {
    return value;
  }

  switch (minus(unit, toUnit)) {
    case 1:
      return mul(value, 1000);
    case 2:
      return mul(value, 1000000);
    case -2:
      return div(value, 1000000);
    case -1:
      return div(value, 1000000);

    default:
      return value;
  }
};

// Tính % lấp đầy kho sau khi import hoặc export item
export const calculateFullmentPercentContainer = (
  fullmentPercent: number,
  valueContainer: number,
  valueItem: number,
  isImport = true, // true: import, false: export
): number => {
  if (valueContainer === 0 || valueItem === 0) {
    return fullmentPercent;
  }
  const ratio = div(100, valueContainer);
  const percentValueItem = mul(ratio, valueItem);
  return isImport
    ? plus(fullmentPercent, percentValueItem)
    : minus(fullmentPercent, percentValueItem);
};

// kiểm tra có thể chứa thêm item không
export const validateOverloadContainer = (
  fullmentPercent: number,
  valueContainer: number,
  valueItem: number,
): boolean => {
  if (valueItem === 0 || valueContainer === 0) {
    return true;
  }

  const spacePercent = minus(100, fullmentPercent);
  if (spacePercent <= 0) {
    return false;
  }

  const space = mul(div(spacePercent, 100), valueContainer);
  return minus(space, valueItem) >= 0;
};

export const getTemplate = (lang) => {
  return path.join(
    SRC_DIR,
    'static',
    'template',
    'import',
    `${lang}${path.sep}`,
  );
};

export const getTemplateExport = () => {
  return path.join(SRC_DIR, 'static', 'template', 'export', `${path.sep}`);
};

export const ACTIONS = [
  'Tạo',
  'Sửa',
  'Bỏ qua',
  'Create',
  'Edit',
  'Skip',
  '作成',
  '編集',
  'スキップ',
];

export const VALIDATE_TYPE = {
  WEIGHT: 'weight',
  VOLUME: 'volume',
};

export const validateVolumeWeightItems = (entity, items, type) => {
  if (type === VALIDATE_TYPE.VOLUME) {
    return (
      mul(entity.long, mul(entity.width, entity.height)) >=
      items.reduce(
        (totalVolume, item) =>
          totalVolume +
          mul(mul(item.long, mul(item.width, item.height)), item.quantity),
        0,
      )
    );
  } else if (type === VALIDATE_TYPE.WEIGHT) {
    return (
      entity.weight >=
      items.reduce(
        (totalWeight, item) => totalWeight + mul(item.weight, item.quantity),
        0,
      )
    );
  }
};

export const convertArrayToMap = (array, key: string[]) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    const keyBuilt = key.reduce((res, i) => {
      return `${res}_${item[i]}`;
    }, '');
    return {
      ...obj,
      [keyBuilt]: item,
    };
  }, initialValue);
};

export const moreThanSize = (
  lessItem: CompareSizeDto,
  moreItem: CompareSizeDto,
): boolean => {
  const volumeLessItem = mulBigNumber(
    calculateVolume(
      { value: lessItem.width, unit: lessItem.sizeUnit },
      { value: lessItem.height, unit: lessItem.sizeUnit },
      { value: lessItem.long, unit: lessItem.sizeUnit },
    ),
    lessItem.quantity,
  );
  const volumeMoreItem = mulBigNumber(
    calculateVolume(
      { value: moreItem.width, unit: moreItem.sizeUnit },
      { value: moreItem.height, unit: moreItem.sizeUnit },
      { value: moreItem.long, unit: moreItem.sizeUnit },
    ),
    moreItem.quantity,
  );

  if (new Big(volumeLessItem).gt(new Big(volumeMoreItem))) return false;

  return true;
};

export const moreThanWeight = (
  lessItem: CompareWeightDto,
  moreItem: CompareWeightDto,
): boolean => {
  const weightLessItem = mulBigNumber(
    formatUnitWeight(lessItem.weight, lessItem.weightUnit),
    lessItem.quantity,
  );
  const weightMoreItem = mulBigNumber(
    formatUnitWeight(moreItem.weight, moreItem.weightUnit),
    moreItem.quantity,
  );

  if (new Big(weightLessItem).gt(new Big(weightMoreItem))) return false;

  return true;
};

export const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const paginate = (
  unPaginatedList: any[],
  limit: number,
  page: number,
): any[] => unPaginatedList.slice((page - 1) * limit, page * limit);

/**
 * @example numberFormatText(1000, 5) => 1,000
 * @example numberFormatText(1000.123, 5) => 1,000.123
 * @example numberFormatText(1000.123456, 3) => 1,000.123
 * @example numberFormatText(1000.123456, 5) => 1,000.12346
 */
export const numberFormatText = (value: any, fixed = 5) => {
  if (['', null].includes(value) || isNaN(Number(value))) return '';

  const formattedValue = Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fixed,
  });

  return formattedValue;
};

/**
 * @example getValueFilterByKey([
 * {
 *  column: 'key1',
 *  text: 'value1'
 * },
 * {
 *  column: 'key2',
 *  text: 'value2'
 * }
 * ], 'key1') => 'value1'
 *
 * @example getValueFilterByKey([
 * {
 * column: 'key1',
 * text: '1,2,3,4'
 * },
 * {
 * column: 'key2',
 * text: '2'
 * }
 * ], 'key1', TypeArrEnum.NUMBER) => [1, 2, 3, 4]
 */
export const getValueFilterByKey = (
  filter: any,
  key: string,
  typeArr?: TypeArrEnum,
) => {
  const object = filter.find((o: any) => o.column === key);

  if (!object) {
    return null;
  }

  if (typeArr === TypeArrEnum.NUMBER) {
    const splitObject = object.text.split(',');
    return map(splitObject, (o) => Number(o));
  }

  if (typeArr === TypeArrEnum.STRING) {
    return object.text.split(',');
  }

  return object.text;
};

export const getKeyByObject = (data: Record<string, any>, keyInput: string) => {
  const matchedValues: any[] = [];

  if (data[keyInput]) {
    matchedValues.push(data[keyInput]);
  }

  function traverse(obj: Record<string, any>) {
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        traverse(obj[key]);
      } else if (key === keyInput) {
        matchedValues.push(obj[key]);
      }
    }
  }

  traverse(data);
  return uniq(compact(matchedValues));
};

export const SEPARATOR_CHAR = '-';

export function genItemBlueprintKey(itemBlueprint: {
  itemId: number;
  code: string;
}): string {
  const { itemId, code } = itemBlueprint;
  return [itemId, code].join('_');
}

export function genItemTimeNormKey(itemTimeNorm: {
  itemId: number;
  warehouseId: number;
}): string {
  const { itemId, warehouseId } = itemTimeNorm;
  return [itemId, warehouseId].join('_');
}

export function genExchangeRateKey(exchangeRate: {
  rootCurrencyId: number | string;
  convertCurrencyId: number | string;
}): string {
  const { rootCurrencyId, convertCurrencyId } = exchangeRate;
  return [rootCurrencyId, convertCurrencyId].join('_');
}

export function generatorKey(obj: any, keys: string[]) {
  const keyArr = keys.map((key) => obj[key] ?? '');
  return keyArr.join(SEPARATOR_CHAR);
}

export const isDevMode = () => {
  return (
    process.env.NODE_ENV?.startsWith('dev') ||
    process.env.NODE_ENV?.startsWith('local')
  );
};

export const getRegexByValue = (value: string) => {
  return {
    $regex: '.*' + replace(value, REGEX_FOR_FILTER, (e) => `\\${e}`) + '.*',
    $options: 'i',
  };
};

export const REGEX_FOR_FILTER =
  /[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ 0-9]/gi;

export function getFields(
  items: any[],
  fields: (string | string[])[],
): any[][] {
  if (
    !Array.isArray(items) ||
    !items.length ||
    !Array.isArray(fields) ||
    !fields.length
  )
    return Array.from({ length: fields?.length || 0 }, () => [] as any[]);

  // Hàm lấy giá trị theo path, ví dụ "purchaseRequestItems.costCenterId"
  const getValuesByPath = (obj: any, path: string): any[] => {
    const parts = path.split('.');
    const traverse = (current: any, index: number): any[] => {
      if (current == null) return [];
      const key = parts[index];

      // Nếu đến phần cuối của path
      if (index === parts.length - 1) {
        const collect: any[] = [];
        if (Array.isArray(current)) {
          for (const c of current) {
            const val = c?.[key];
            if (Array.isArray(val)) {
              for (const v of val) {
                if (!isNil(v)) collect.push(v);
              }
            } else if (!isNil(val)) {
              collect.push(val);
            }
          }
        } else {
          const val = current[key];
          if (Array.isArray(val)) {
            for (const v of val) {
              if (!isNil(v)) collect.push(v);
            }
          } else if (!isNil(val)) {
            collect.push(val);
          }
        }
        return collect;
      }

      // Nếu là mảng, duyệt đệ quy
      if (Array.isArray(current)) {
        return current.flatMap((c) => traverse(c?.[key], index + 1));
      }

      return traverse(current?.[key], index + 1);
    };

    return traverse(obj, 0);
  };

  // Duyệt từng field hoặc group field
  return fields.map((f) => {
    if (Array.isArray(f)) {
      // Nếu là group nhiều field
      const values = new Set<any>();
      for (const field of f) {
        for (const item of items) {
          getValuesByPath(item, field).forEach((v) => values.add(v));
        }
      }
      return Array.from(values);
    } else {
      // Field đơn
      const values = new Set<any>();
      for (const item of items) {
        getValuesByPath(item, f).forEach((v) => values.add(v));
      }
      return Array.from(values);
    }
  });
}

export function excelDateToJSDate(serial: number): Date {
  // Excel incorrectly considers 1900 as leap year, so 60 => 1900-02-29
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400; // seconds
  const date_info = new Date(utc_value * 1000);

  // tính phần giờ, phút, giây
  const fractional_day = serial - Math.floor(serial);
  const total_seconds = Math.floor(86400 * fractional_day);

  const seconds = total_seconds % 60;
  const minutes = Math.floor(total_seconds / 60) % 60;
  const hours = Math.floor(total_seconds / 3600);

  date_info.setHours(hours, minutes, seconds, 0);
  return date_info;
}

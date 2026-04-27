const pushIfExist = <T>(targetArray: T[], value: any) => {
  const staticSet = new Set(targetArray);
  const canPush = ![undefined, null].includes(value);
  if (canPush && !staticSet.has(value)) {
    targetArray.push(value);
    staticSet.add(value);
  }
};

const initEmptyArray = (numberArray: number) => {
  return Array.from({ length: numberArray }, () => []);
};

export const arrayHelper = {
  pushIfExist,
  initEmptyArray,
};

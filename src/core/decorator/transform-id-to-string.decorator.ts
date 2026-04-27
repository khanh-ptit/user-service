import { Transform } from 'class-transformer';

export function TransformIdToString() {
  return Transform(({ value }) => {
    if (value === null || value === undefined) return value;
    return value.toString();
  });
}

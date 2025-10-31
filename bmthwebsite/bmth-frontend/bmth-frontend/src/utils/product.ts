export type Variant = {
  color: string;
  size: string;
};

export function filterVariants(list: Variant[], color: string): Variant[] {
  return list.filter((v) => v.color === color);
}


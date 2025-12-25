import {CategoryNumbers} from "#app/categories/enums/category.numbers";

export const CATEGORY_FREQUENCY_MAP: Record<CategoryNumbers, number> = {
  [CategoryNumbers.FIRST]: 1,
  [CategoryNumbers.SECOND]: 2,
  [CategoryNumbers.THIRD]: 4,
  [CategoryNumbers.FOURTH]: 8,
  [CategoryNumbers.FIFTH]: 16,
  [CategoryNumbers.SIXTH]: 32,
  [CategoryNumbers.SEVENTH]: 64,
  [CategoryNumbers.DONE]: 99999
}

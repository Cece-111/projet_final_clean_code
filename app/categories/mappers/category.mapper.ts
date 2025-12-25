import {CategoryNumbers} from "../enums/category.numbers.js";

export const NEXT_CATEGORY_MAP: Record<CategoryNumbers, CategoryNumbers | null> = {
  [CategoryNumbers.FIRST]: CategoryNumbers.SECOND,
  [CategoryNumbers.SECOND]: CategoryNumbers.THIRD,
  [CategoryNumbers.THIRD]: CategoryNumbers.FOURTH,
  [CategoryNumbers.FOURTH]: CategoryNumbers.FIFTH,
  [CategoryNumbers.FIFTH]: CategoryNumbers.SIXTH,
  [CategoryNumbers.SIXTH]: CategoryNumbers.SEVENTH,
  [CategoryNumbers.SEVENTH]: CategoryNumbers.DONE,
  [CategoryNumbers.DONE]: null,
};

export const PREVIOUS_CATEGORY_MAP: Record<CategoryNumbers, CategoryNumbers> = {
  [CategoryNumbers.FIRST]: CategoryNumbers.FIRST,
  [CategoryNumbers.SECOND]: CategoryNumbers.FIRST,
  [CategoryNumbers.THIRD]: CategoryNumbers.SECOND,
  [CategoryNumbers.FOURTH]: CategoryNumbers.THIRD,
  [CategoryNumbers.FIFTH]: CategoryNumbers.FOURTH,
  [CategoryNumbers.SIXTH]: CategoryNumbers.FIFTH,
  [CategoryNumbers.SEVENTH]: CategoryNumbers.SIXTH,
  [CategoryNumbers.DONE]: CategoryNumbers.SEVENTH,
};

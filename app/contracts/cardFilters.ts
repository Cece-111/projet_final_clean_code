import {CategoryNumbers} from "../categories/enums/categoryNumbers.js";

export interface CardFilters {
  tags?: string[]
  categories?: CategoryNumbers[]
}

export const filterCardMap: Record<keyof CardFilters, string> = {
  tags: 'tag',
  categories: 'category'
}

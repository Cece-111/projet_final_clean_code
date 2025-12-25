import {CategoryNumbers} from "#app/categories/enums/category.numbers";

export interface CardFilters {
  tags?: string[]
  categories?: CategoryNumbers[]
}

import {CategoryNumbers} from "#app/modules/categories/enums/category.numbers";

export interface CardFilters {
  tags?: string[]
  categories?: CategoryNumbers[]
}

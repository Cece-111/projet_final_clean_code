import {CategoryNumbers} from "../categories/enums/categoryNumbers.js";

export interface CardFilters {
  tags?: string[]
  categories?: CategoryNumbers[]
}

import { FindOperator } from "typeorm";

export interface UserQuery {
  active?: boolean,
  rol?: number | FindOperator<number>,
}
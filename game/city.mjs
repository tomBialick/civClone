import {GenericImprovement} from './generic_improvement.mjs';

export class City extends GenericImprovement {
  population = 1;
  buildings = [];

  constructor(tile) {
    super(tile);
  }
}

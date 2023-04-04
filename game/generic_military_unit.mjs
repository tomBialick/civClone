import {GenericUnit} from './generic_unit.mjs';

export class GenericMilitaryUnit extends GenericUnit {
  defenseValue = 1;
  offenseValue = 1;
  health = 5;

  constructor(X, Y) {
    super(X, Y);
  }
}

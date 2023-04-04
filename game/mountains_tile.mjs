import {GenericTile} from './generic_tile.mjs';

export class MountainsTile extends GenericTile {
  constructor(X, Y) {
    super(X, Y);
    this.type = "Mountains";
    this.baseDefensiveBonus = 2;
    this.resource =(Math.floor(Math.random() * 7) < 6 ) ?
      (Math.floor(Math.random() * 3) >= 2) ?
        (Math.floor(Math.random() * 2) >= 1) ? "iron" : "coal" : null : "gems";
  }
  getAvailableImprovements() {
    switch (this.resourse) {
      case "iron":
      case "coal":
      case "gems":
        return ["mine", "road"];
        break;
      default:
        return ["mine", "road", "fort"];
        break;
    }
  }
  canEnter(unitOwner) {
    return (this.owner === null || this.owner === unitOwner);
  }

}

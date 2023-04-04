import {GenericTile} from './generic_tile.mjs';

export class ForestTile extends GenericTile {
  constructor(X, Y) {
    super(X, Y);
    this.type = "Forest";
    this.baseDefensiveBonus = 1.25;
    this.resource = (Math.floor(Math.random() * 7) < 6 ) ? (Math.floor(Math.random() * 5) >= 4) ? "rubber" : "wood" : "silk";
  }
  getAvailableImprovements() {
    switch (this.resourse) {
      case "wood":
      case "rubber":
        return ["mine", "road"];
        break;
      case "silk":
        return ["farm", "road"];
        break
      default:
        return ["city", "road", "fort"];
        break;
    }
  }

}

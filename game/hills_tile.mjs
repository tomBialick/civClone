import {GenericTile} from './generic_tile.mjs';

export class HillsTile extends GenericTile {
  baseDefensiveBonus = 1.5;

  constructor(X, Y) {
    super(X, Y);
    this.type = "Hills";
    this.resource = (Math.floor(Math.random() * 7) < 6 ) ?
      (Math.floor(Math.random() * 4) >= 3) ?
        (Math.floor(Math.random() * 2) >= 1) ? "iron" : "coal" : null : "wine";
  }
  getAvailableImprovements() {
    switch (this.resourse) {
      case "iron":
      case "coal":
        return ["mine", "road"];
        break;
      case "wine":
        return ["farm", "road"];
        break
      default:
        return ["city", "mine", "road", "fort"];
        break;
    }
  }

}

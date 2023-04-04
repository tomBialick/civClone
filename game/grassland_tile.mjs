import {GenericTile} from './generic_tile.mjs';

export class GrasslandTile extends GenericTile {

  constructor(X, Y) {
    super(X, Y);
    this.type = "Grassland";
    this.resource = (Math.floor(Math.random() * 7) < 6 ) ? (Math.floor(Math.random() * 5) >= 4) ? "horses" : null : "spices";
  }
  getAvailableImprovements() {
    switch (this.resourse) {
      case "horses":
      case "spices":
        return ["farm", "road"];
        break
      default:
        return ["city", "farm", "road", "fort"];
        break;
    }
  }

}

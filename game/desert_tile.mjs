import {GenericTile} from './generic_tile.mjs';

export class DesertTile extends GenericTile {

  constructor(X, Y) {
    super(X, Y);
    this.type = "Desert";
    this.resource = (Math.floor(Math.random() * 7) < 6 ) ? (Math.floor(Math.random() * 5) >= 4) ? "oil" : null : "incense";
  }
  getAvailableImprovements() {
    switch (this.resourse) {
      case "oil":
        return ["mine", "road"];
        break;
      case "incense":
        return ["farm", "road"];
        break
      default:
        return ["city", "road", "fort"];
        break;
    }
  }

}

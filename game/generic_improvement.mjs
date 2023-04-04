export class GenericImprovement {
  tile = null;
  storedResources = {};

  /**
   * Possible Improvements?
   * city
   * mine
   * farm
   * fort defense bonus store resources locally
   * trading post? caravans can go there rather than capital/city
   *
   */

  constructor(tile) {
    this.tile = tile;
  }

}

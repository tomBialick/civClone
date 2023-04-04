export class GenericTile {
  x = -1;
  y = -1;
  resource = null;
  yield = 1;
  improvement = null;
  unitOnTile = null;
  boostLevel = 1;
  owner = null;
  militaryUnitOnTile = null;
  economicUnitOnTile = null;
  baseDefensiveBonus = 1;
  type = null;

  constructor(X, Y) {
    this.x = X;
    this.y = Y;
  }
  getYield() {
    return {
      resource: this.resource,
      yield: this.boostLevel * this.yield
    };
  }
  isImproved() {
    return !!this.improvement;
  }
  setImprovement(improv) {
    this.improvement = improv;
    this.yield = !!improv ? 2: 1;
  }
  getBoostLevel() {
    return this.boostLevel;
  }
  setBoost(boost) {
    this.boostLevel = boost;
  }
  getAvailableImprovements() {
    return [];
  }
  getResource() {
    return this.resource;
  }
  getOwner() {
    return this.owner;
  }
  setOwner(owner) {
    this.owner = owner;
  }
  canEnter(unitOwner) {
    return true;
  }
  getMilitaryUnitOnTile() {
    return this.militaryUnitOnTile;
  }
  setMilitaryUnitOnTile(unit) {
    this.militaryUnitOnTile = unit;
  }
  getEconomicUnitOnTile() {
    return this.economicUnitOnTile;
  }
  setEconomicUnitOnTile(unit) {
    this.economicUnitOnTile = unit;
  }
  getDefensiveBonus() {
    return this.improvement === "fort" ? 2 * this.baseDefensiveBonus: this.baseDefensiveBonus;
  }
  getCoords() {
    return {
      x: this.x,
      y: this.y
    }
  }


}

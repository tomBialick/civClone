import {GrasslandTile} from './grassland_tile.mjs';
import {ForestTile} from './forest_tile.mjs';
import {HillsTile} from './hills_tile.mjs';
import {MountainsTile} from './mountains_tile.mjs';
import {DesertTile} from './desert_tile.mjs';

export default function(width, height) { //createMap
    let gameMap = new Array(width);
    for (let i = 0; i < gameMap.length; i++) {
      gameMap[i] = new Array(height);
      for (let j = 0; j < gameMap[i].length; j++) {
        let randTileNumb = Math.floor(Math.random() * 5);
        switch (randTileNumb) {
          case 0:
            gameMap[i][j] = new GrasslandTile(i, j);
            break;
          case 1:
            gameMap[i][j] = new ForestTile(i, j);
            break;
          case 2:
            gameMap[i][j] = new HillsTile(i, j);
            break;
          case 3:
            gameMap[i][j] = new MountainsTile(i, j);
            break;
          case 4:
            gameMap[i][j] = new DesertTile(i, j);
            break;
        }
      }
    }
    return gameMap;
  }
// export default createMap();
// }

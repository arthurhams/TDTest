export class GameMap {
    constructor(mapData) {
        this.width = mapData.width;
        this.height = mapData.height;
        this.tiles = mapData.tiles;
        this.path = mapData.path;
        
        // Track placed towers
        this.towerPositions = new Set();
    }
    
    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }
        return this.tiles[y][x];
    }
    
    isBuildable(x, y) {
        const tile = this.getTile(x, y);
        const key = `${x},${y}`;
        return tile === 'B' && !this.towerPositions.has(key);
    }
    
    placeTower(x, y) {
        const key = `${x},${y}`;
        this.towerPositions.add(key);
    }
    
    removeTower(x, y) {
        const key = `${x},${y}`;
        this.towerPositions.delete(key);
    }
}

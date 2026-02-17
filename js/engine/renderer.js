// Rendering constants
const TILE_SIZE = 64;

export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }
    
    renderMap(map) {
        const ctx = this.ctx;
        
        // Draw tiles
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const tile = map.getTile(x, y);
                
                // Draw tile background
                ctx.fillStyle = this.getTileColor(tile);
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                
                // Draw grid
                ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                ctx.lineWidth = 1;
                ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
        
        // Draw path
        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 48;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        for (let i = 0; i < map.path.length; i++) {
            const point = map.path[i];
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();
        
        // Draw path border
        ctx.strokeStyle = '#6B5345';
        ctx.lineWidth = 52;
        ctx.beginPath();
        for (let i = 0; i < map.path.length; i++) {
            const point = map.path[i];
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();
    }
    
    getTileColor(tile) {
        if (tile === 'P') return '#8B7355'; // Path
        if (tile === 'B') return '#4a7c59'; // Buildable
        return '#2d4a3e'; // Default grass
    }
    
    renderTower(tower, selected) {
        const ctx = this.ctx;
        
        // Draw range indicator if selected
        if (selected) {
            ctx.fillStyle = 'rgba(100, 150, 255, 0.1)';
            ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(tower.x, tower.y, tower.range, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
        
        // Draw tower base
        ctx.fillStyle = '#444';
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 16, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw tower body with type color
        ctx.fillStyle = tower.color;
        ctx.beginPath();
        ctx.arc(tower.x, tower.y, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw tower level indicator
        if (tower.level > 1) {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(tower.level, tower.x, tower.y);
        }
        
        // Draw targeting line
        if (tower.target) {
            ctx.strokeStyle = 'rgba(255, 100, 100, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(tower.x, tower.y);
            ctx.lineTo(tower.target.x, tower.target.y);
            ctx.stroke();
        }
    }
    
    renderCreature(creature) {
        const ctx = this.ctx;
        
        // Draw health bar background
        const barWidth = 24;
        const barHeight = 4;
        const barX = creature.x - barWidth / 2;
        const barY = creature.y - creature.size - 8;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Draw health bar
        const healthPercent = creature.health / creature.maxHealth;
        ctx.fillStyle = healthPercent > 0.5 ? '#4CAF50' : healthPercent > 0.25 ? '#FFC107' : '#F44336';
        ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
        
        // Draw creature body
        ctx.fillStyle = creature.color;
        ctx.beginPath();
        ctx.arc(creature.x, creature.y, creature.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw creature outline
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw status effects
        if (creature.slowed) {
            ctx.fillStyle = 'rgba(100, 100, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(creature.x, creature.y, creature.size + 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    renderProjectile(projectile) {
        const ctx = this.ctx;
        
        ctx.fillStyle = projectile.color || '#FFD700';
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = projectile.color || '#FFD700';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

import { TOWER_TYPES } from '../data/tower-types.js';

export class TowerPanel {
    constructor() {
        this.x = 980;
        this.y = 60;
        this.width = 290;
        this.height = 660;
        
        this.mode = 'build'; // 'build' or 'info'
        this.selectedType = null;
        
        // Tower build slots
        this.buildSlots = [];
        const types = Object.keys(TOWER_TYPES);
        for (let i = 0; i < types.length; i++) {
            this.buildSlots.push({
                x: this.x + 10,
                y: this.y + 10 + i * 70,
                width: 270,
                height: 60,
                type: types[i]
            });
        }
        
        // Info panel buttons
        this.upgradeButton = { x: this.x + 10, y: this.y + 400, width: 270, height: 50 };
        this.sellButton = { x: this.x + 10, y: this.y + 460, width: 270, height: 50 };
    }
    
    render(ctx, selectedTower, gold) {
        // Draw panel background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        if (this.mode === 'build') {
            this.renderBuildMode(ctx, gold);
        } else if (this.mode === 'info' && selectedTower) {
            this.renderInfoMode(ctx, selectedTower, gold);
        }
    }
    
    renderBuildMode(ctx, gold) {
        // Title
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Build Tower', this.x + this.width / 2, this.y + 30);
        
        // Draw tower slots
        for (const slot of this.buildSlots) {
            const tower = TOWER_TYPES[slot.type];
            const canAfford = gold >= tower.cost;
            
            // Slot background
            ctx.fillStyle = this.selectedType === slot.type ? '#4CAF50' : canAfford ? '#333' : '#222';
            ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
            
            ctx.strokeStyle = this.selectedType === slot.type ? '#66FF66' : '#555';
            ctx.lineWidth = 2;
            ctx.strokeRect(slot.x, slot.y, slot.width, slot.height);
            
            // Tower icon (colored circle)
            ctx.fillStyle = tower.color;
            ctx.beginPath();
            ctx.arc(slot.x + 30, slot.y + 30, 15, 0, Math.PI * 2);
            ctx.fill();
            
            // Tower name
            ctx.fillStyle = canAfford ? '#FFF' : '#666';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(tower.name, slot.x + 55, slot.y + 20);
            
            // Tower cost
            ctx.fillStyle = canAfford ? '#FFD700' : '#666';
            ctx.font = '12px Arial';
            ctx.fillText(`Cost: ${tower.cost}`, slot.x + 55, slot.y + 40);
        }
    }
    
    renderInfoMode(ctx, tower, gold) {
        const info = tower.getInfo();
        
        // Title
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Tower Info', this.x + this.width / 2, this.y + 30);
        
        // Tower info
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#FFF';
        
        let yPos = this.y + 70;
        const lineHeight = 30;
        
        ctx.fillText(`Name: ${info.name}`, this.x + 20, yPos);
        yPos += lineHeight;
        
        ctx.fillText(`Level: ${info.level}`, this.x + 20, yPos);
        yPos += lineHeight;
        
        ctx.fillText(`Damage: ${info.damage}`, this.x + 20, yPos);
        yPos += lineHeight;
        
        ctx.fillText(`Range: ${info.range}`, this.x + 20, yPos);
        yPos += lineHeight;
        
        ctx.fillText(`Fire Rate: ${info.fireRate}/s`, this.x + 20, yPos);
        yPos += lineHeight;
        
        // Upgrade button
        const canUpgrade = gold >= info.upgradeCost;
        ctx.fillStyle = canUpgrade ? '#4CAF50' : '#666';
        ctx.fillRect(this.upgradeButton.x, this.upgradeButton.y, this.upgradeButton.width, this.upgradeButton.height);
        
        ctx.strokeStyle = canUpgrade ? '#66FF66' : '#444';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.upgradeButton.x, this.upgradeButton.y, this.upgradeButton.width, this.upgradeButton.height);
        
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Upgrade (${info.upgradeCost})`, 
            this.upgradeButton.x + this.upgradeButton.width / 2,
            this.upgradeButton.y + this.upgradeButton.height / 2);
        
        // Sell button
        ctx.fillStyle = '#F44336';
        ctx.fillRect(this.sellButton.x, this.sellButton.y, this.sellButton.width, this.sellButton.height);
        
        ctx.strokeStyle = '#FF6666';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.sellButton.x, this.sellButton.y, this.sellButton.width, this.sellButton.height);
        
        ctx.fillStyle = '#FFF';
        ctx.fillText(`Sell (${info.sellValue})`,
            this.sellButton.x + this.sellButton.width / 2,
            this.sellButton.y + this.sellButton.height / 2);
    }
    
    handleClick(mousePos, selectedTower, gold) {
        // Convert screen to game coordinates
        const rect = document.getElementById('gameCanvas').getBoundingClientRect();
        const scaleX = 1280 / rect.width;
        const scaleY = 720 / rect.height;
        const gameX = mousePos.x * scaleX;
        const gameY = mousePos.y * scaleY;
        
        if (gameX < this.x || gameX > this.x + this.width ||
            gameY < this.y || gameY > this.y + this.height) {
            return null;
        }
        
        if (this.mode === 'build') {
            // Check build slots
            for (const slot of this.buildSlots) {
                if (gameX >= slot.x && gameX <= slot.x + slot.width &&
                    gameY >= slot.y && gameY <= slot.y + slot.height) {
                    const tower = TOWER_TYPES[slot.type];
                    if (gold >= tower.cost) {
                        return { type: 'select', towerType: slot.type };
                    }
                }
            }
        } else if (this.mode === 'info' && selectedTower) {
            // Check upgrade button
            if (gameX >= this.upgradeButton.x && gameX <= this.upgradeButton.x + this.upgradeButton.width &&
                gameY >= this.upgradeButton.y && gameY <= this.upgradeButton.y + this.upgradeButton.height) {
                return { type: 'upgrade' };
            }
            
            // Check sell button
            if (gameX >= this.sellButton.x && gameX <= this.sellButton.x + this.sellButton.width &&
                gameY >= this.sellButton.y && gameY <= this.sellButton.y + this.sellButton.height) {
                return { type: 'sell' };
            }
        }
        
        return null;
    }
}

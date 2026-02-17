export class HUD {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 1280;
        this.height = 50;
        
        // Speed button positions
        this.speedButtons = [
            { x: 1100, y: 10, width: 50, height: 30, speed: 1, label: '1x' },
            { x: 1160, y: 10, width: 50, height: 30, speed: 2, label: '2x' },
            { x: 1220, y: 10, width: 50, height: 30, speed: 3, label: '3x' }
        ];
    }
    
    render(ctx, gameState) {
        // Draw HUD background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw lives
        ctx.fillStyle = '#FF4444';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`♥ ${gameState.lives}`, 20, 25);
        
        // Draw gold
        ctx.fillStyle = '#FFD700';
        ctx.fillText(`⛃ ${gameState.gold}`, 150, 25);
        
        // Draw wave counter
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`Wave: ${gameState.wave}/${gameState.totalWaves}`, 300, 25);
        
        // Draw score
        ctx.fillStyle = '#88FF88';
        ctx.fillText(`Score: ${gameState.score}`, 500, 25);
        
        // Draw speed buttons
        for (const btn of this.speedButtons) {
            const isActive = btn.speed === gameState.gameSpeed;
            
            ctx.fillStyle = isActive ? '#4CAF50' : '#333';
            ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
            
            ctx.strokeStyle = isActive ? '#66FF66' : '#666';
            ctx.lineWidth = 2;
            ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);
            
            ctx.fillStyle = '#FFF';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(btn.label, btn.x + btn.width / 2, btn.y + btn.height / 2);
        }
    }
    
    handleClick(mousePos) {
        // Convert to game coordinates if needed
        for (const btn of this.speedButtons) {
            if (mousePos.x >= btn.x && mousePos.x <= btn.x + btn.width &&
                mousePos.y >= btn.y && mousePos.y <= btn.y + btn.height) {
                return { type: 'speed', value: btn.speed };
            }
        }
        return null;
    }
}

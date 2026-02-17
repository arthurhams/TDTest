export class GameOverScreen {
    constructor() {
        this.victory = false;
        this.score = 0;
        this.level = 1;
        
        // Button positions
        this.nextButton = { x: 400, y: 450, width: 200, height: 60 };
        this.retryButton = { x: 620, y: 450, width: 200, height: 60 };
        this.menuButton = { x: 510, y: 530, width: 200, height: 60 };
    }
    
    setResult(victory, score, level) {
        this.victory = victory;
        this.score = score;
        this.level = level;
    }
    
    render(ctx) {
        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, 1280, 720);
        
        // Main panel
        ctx.fillStyle = 'rgba(20, 20, 40, 0.95)';
        ctx.fillRect(340, 200, 600, 400);
        
        ctx.strokeStyle = this.victory ? '#4CAF50' : '#F44336';
        ctx.lineWidth = 4;
        ctx.strokeRect(340, 200, 600, 400);
        
        // Title
        ctx.fillStyle = this.victory ? '#4CAF50' : '#F44336';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.victory ? 'VICTORY!' : 'DEFEAT', 640, 270);
        
        // Score
        ctx.fillStyle = '#FFF';
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${this.score}`, 640, 340);
        ctx.fillText(`Level: ${this.level}`, 640, 380);
        
        // Buttons
        if (this.victory) {
            // Next Level button
            ctx.fillStyle = '#4CAF50';
            ctx.fillRect(this.nextButton.x, this.nextButton.y, this.nextButton.width, this.nextButton.height);
            
            ctx.strokeStyle = '#66FF66';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.nextButton.x, this.nextButton.y, this.nextButton.width, this.nextButton.height);
            
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('Next Level',
                this.nextButton.x + this.nextButton.width / 2,
                this.nextButton.y + this.nextButton.height / 2);
        }
        
        // Retry button
        ctx.fillStyle = '#FF9800';
        ctx.fillRect(this.retryButton.x, this.retryButton.y, this.retryButton.width, this.retryButton.height);
        
        ctx.strokeStyle = '#FFBB33';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.retryButton.x, this.retryButton.y, this.retryButton.width, this.retryButton.height);
        
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Retry',
            this.retryButton.x + this.retryButton.width / 2,
            this.retryButton.y + this.retryButton.height / 2);
        
        // Menu button
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(this.menuButton.x, this.menuButton.y, this.menuButton.width, this.menuButton.height);
        
        ctx.strokeStyle = '#42A5F5';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.menuButton.x, this.menuButton.y, this.menuButton.width, this.menuButton.height);
        
        ctx.fillStyle = '#FFF';
        ctx.fillText('Menu',
            this.menuButton.x + this.menuButton.width / 2,
            this.menuButton.y + this.menuButton.height / 2);
    }
    
    handleClick(mousePos) {
        // Convert screen to game coordinates
        const rect = document.getElementById('gameCanvas').getBoundingClientRect();
        const scaleX = 1280 / rect.width;
        const scaleY = 720 / rect.height;
        const gameX = mousePos.x * scaleX;
        const gameY = mousePos.y * scaleY;
        
        // Check Next Level button (only if victory)
        if (this.victory) {
            if (gameX >= this.nextButton.x && gameX <= this.nextButton.x + this.nextButton.width &&
                gameY >= this.nextButton.y && gameY <= this.nextButton.y + this.nextButton.height) {
                return 'next';
            }
        }
        
        // Check Retry button
        if (gameX >= this.retryButton.x && gameX <= this.retryButton.x + this.retryButton.width &&
            gameY >= this.retryButton.y && gameY <= this.retryButton.y + this.retryButton.height) {
            return 'retry';
        }
        
        // Check Menu button
        if (gameX >= this.menuButton.x && gameX <= this.menuButton.x + this.menuButton.width &&
            gameY >= this.menuButton.y && gameY <= this.menuButton.y + this.menuButton.height) {
            return 'menu';
        }
        
        return null;
    }
}

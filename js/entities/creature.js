export class Creature {
    constructor(x, y, type, config) {
        this.x = x;
        this.y = y;
        this.type = type;
        
        // Stats
        this.health = config.health;
        this.maxHealth = config.health;
        this.speed = config.speed;
        this.color = config.color;
        this.size = config.size || 12;
        this.goldReward = config.goldReward;
        this.scoreValue = config.scoreValue;
        
        // Path following
        this.pathIndex = 0;
        this.reachedEnd = false;
        
        // Status effects
        this.slowed = false;
        this.slowTimer = 0;
    }
    
    update(deltaTime, path) {
        if (this.pathIndex >= path.length) {
            this.reachedEnd = true;
            return;
        }
        
        // Update status effects
        if (this.slowed) {
            this.slowTimer -= deltaTime;
            if (this.slowTimer <= 0) {
                this.slowed = false;
            }
        }
        
        // Get current target point
        const targetPoint = path[this.pathIndex];
        
        // Move towards target
        const dx = targetPoint.x - this.x;
        const dy = targetPoint.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 5) {
            // Reached waypoint, move to next
            this.pathIndex++;
            if (this.pathIndex >= path.length) {
                this.reachedEnd = true;
            }
            return;
        }
        
        // Calculate movement
        const currentSpeed = this.slowed ? this.speed * 0.5 : this.speed;
        const moveX = (dx / distance) * currentSpeed * deltaTime;
        const moveY = (dy / distance) * currentSpeed * deltaTime;
        
        this.x += moveX;
        this.y += moveY;
    }
    
    takeDamage(amount) {
        this.health -= amount;
    }
    
    applySlow(duration) {
        this.slowed = true;
        this.slowTimer = Math.max(this.slowTimer, duration);
    }
}

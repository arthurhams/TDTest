export class Tower {
    constructor(x, y, type, config) {
        // Position (at tile center)
        this.x = x;
        this.y = y;
        
        // Tower type and config
        this.type = type;
        this.name = config.name;
        this.damage = config.damage;
        this.range = config.range;
        this.fireRate = config.fireRate;
        this.projectileSpeed = config.projectileSpeed;
        this.projectileType = config.projectileType || 'normal';
        this.color = config.color;
        this.cost = config.cost;
        
        // Tower state
        this.level = 1;
        this.fireTimer = 0;
        this.target = null;
        
        // Upgrade costs
        this.upgradeCost = Math.floor(config.cost * 0.6);
        this.sellValue = Math.floor(config.cost * 0.7);
    }
    
    update(deltaTime, creatures, projectiles) {
        // Update fire timer
        this.fireTimer -= deltaTime;
        
        // Find target
        this.target = this.findTarget(creatures);
        
        // Fire at target
        if (this.target && this.fireTimer <= 0) {
            this.fire(projectiles);
            this.fireTimer = 1 / this.fireRate;
        }
    }
    
    findTarget(creatures) {
        let closestTarget = null;
        let closestDistance = Infinity;
        
        for (const creature of creatures) {
            // Calculate distance using proper coordinates
            const dx = creature.x - this.x;
            const dy = creature.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Check if in range and closer than previous target
            if (distance <= this.range && distance < closestDistance) {
                closestTarget = creature;
                closestDistance = distance;
            }
        }
        
        return closestTarget;
    }
    
    fire(projectiles) {
        if (!this.target) return;
        
        // Calculate direction to target
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const vx = (dx / distance) * this.projectileSpeed;
        const vy = (dy / distance) * this.projectileSpeed;
        
        // Create projectile
        const projectile = {
            x: this.x,
            y: this.y,
            vx: vx,
            vy: vy,
            damage: this.damage,
            target: this.target,
            type: this.projectileType,
            color: this.color,
            size: 5,
            shouldRemove: false,
            
            update: function(deltaTime) {
                // Homing projectile
                if (this.target && this.target.health > 0) {
                    const dx = this.target.x - this.x;
                    const dy = this.target.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Check for hit
                    if (distance < this.target.size + this.size) {
                        this.target.takeDamage(this.damage);
                        this.shouldRemove = true;
                        return;
                    }
                    
                    // Move towards target
                    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                    this.vx = (dx / distance) * speed;
                    this.vy = (dy / distance) * speed;
                }
                
                // Move projectile
                this.x += this.vx * deltaTime;
                this.y += this.vy * deltaTime;
                
                // Remove if off screen
                if (this.x < -50 || this.x > 1330 || this.y < -50 || this.y > 770) {
                    this.shouldRemove = true;
                }
            }
        };
        
        projectiles.push(projectile);
    }
    
    upgrade() {
        this.level++;
        this.damage *= 1.5;
        this.range *= 1.1;
        this.fireRate *= 1.2;
        
        // Update costs
        this.upgradeCost = Math.floor(this.upgradeCost * 1.5);
        this.sellValue += Math.floor(this.upgradeCost * 0.5);
    }
    
    getInfo() {
        return {
            name: this.name,
            level: this.level,
            damage: Math.floor(this.damage),
            range: Math.floor(this.range),
            fireRate: this.fireRate.toFixed(1),
            upgradeCost: this.upgradeCost,
            sellValue: this.sellValue
        };
    }
}

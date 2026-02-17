export class Projectile {
    constructor(x, y, vx, vy, damage, target, color = '#FFD700') {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.damage = damage;
        this.target = target;
        this.color = color;
        this.size = 5;
        this.shouldRemove = false;
    }
    
    update(deltaTime) {
        // Homing behavior
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
            
            // Adjust velocity towards target
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            this.vx = (dx / distance) * speed;
            this.vy = (dy / distance) * speed;
        }
        
        // Move projectile
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        
        // Remove if off screen or target dead
        if (this.x < -50 || this.x > 1330 || this.y < -50 || this.y > 770) {
            this.shouldRemove = true;
        }
        
        if (this.target && this.target.health <= 0) {
            this.shouldRemove = true;
        }
    }
}

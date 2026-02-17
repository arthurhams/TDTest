export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.mousePos = { x: 0, y: 0 };
        this.mouseClicked = false;
        this.mouseDown = false;
        
        // Add event listeners
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        
        // Touch support
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        // Store screen coordinates (not yet converted to game coordinates)
        this.mousePos.x = e.clientX - rect.left;
        this.mousePos.y = e.clientY - rect.top;
    }
    
    handleMouseDown(e) {
        this.mouseDown = true;
    }
    
    handleMouseUp(e) {
        this.mouseDown = false;
    }
    
    handleClick(e) {
        this.mouseClicked = true;
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.mousePos.x = touch.clientX - rect.left;
        this.mousePos.y = touch.clientY - rect.top;
        this.mouseDown = true;
        this.mouseClicked = true;
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        this.mouseDown = false;
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.mousePos.x = touch.clientX - rect.left;
        this.mousePos.y = touch.clientY - rect.top;
    }
    
    getMousePosition() {
        // Return screen coordinates
        // Game.js will handle conversion to game coordinates
        return { ...this.mousePos };
    }
    
    isMouseClicked() {
        return this.mouseClicked;
    }
    
    isMouseDown() {
        return this.mouseDown;
    }
    
    update() {
        // Reset one-frame flags
        this.mouseClicked = false;
    }
}

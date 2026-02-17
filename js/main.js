import { Game } from './engine/game.js';

// Initialize the game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new Game(canvas);
    game.start();
});

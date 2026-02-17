import { InputManager } from './input.js';
import { AudioManager } from './audio.js';
import { Renderer } from './renderer.js';
import { GameMap } from './map.js';
import { Tower } from '../entities/tower.js';
import { Creature } from '../entities/creature.js';
import { Projectile } from '../entities/projectile.js';
import { HUD } from '../ui/hud.js';
import { TowerPanel } from '../ui/tower-panel.js';
import { GameOverScreen } from '../ui/game-over.js';
import { LEVELS } from '../data/levels.js';
import { TOWER_TYPES } from '../data/tower-types.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Core systems
        this.input = new InputManager(canvas);
        this.audio = new AudioManager();
        this.renderer = new Renderer(this.ctx);
        
        // Game state
        this.state = 'MENU';
        this.currentLevel = 1;
        this.lives = 20;
        this.gold = 200;
        this.score = 0;
        this.currentWave = 0;
        this.gameSpeed = 1;
        
        // Game entities
        this.map = null;
        this.towers = [];
        this.creatures = [];
        this.projectiles = [];
        
        // UI components
        this.hud = new HUD();
        this.towerPanel = new TowerPanel();
        this.gameOverScreen = new GameOverScreen();
        
        // Wave management
        this.waveTimer = 0;
        this.spawnTimer = 0;
        this.wavesComplete = false;
        this.currentWaveData = null;
        this.spawnIndex = 0;
        
        // Selected tower for panel
        this.selectedTower = null;
        
        // Timing
        this.lastTime = 0;
        this.running = false;
    }
    
    start() {
        this.initLevel(this.currentLevel);
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }
    
    initLevel(levelNum) {
        const levelData = LEVELS[levelNum - 1];
        if (!levelData) {
            console.error('Level not found:', levelNum);
            return;
        }
        
        // Reset game state
        this.currentLevel = levelNum;
        this.lives = 20;
        this.gold = levelData.startingGold || 200;
        this.score = 0;
        this.currentWave = 0;
        this.towers = [];
        this.creatures = [];
        this.projectiles = [];
        this.wavesComplete = false;
        this.waveTimer = 0;
        this.spawnTimer = 0;
        this.spawnIndex = 0;
        this.selectedTower = null;
        this.state = 'PLAYING';
        
        // Create map
        this.map = new GameMap(levelData.map);
        
        // Play background music
        this.audio.playMusic('game');
    }
    
    gameLoop(currentTime) {
        if (!this.running) return;
        
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        // Update at game speed
        const adjustedDelta = deltaTime * this.gameSpeed;
        
        if (this.state === 'PLAYING') {
            this.update(adjustedDelta);
        }
        
        this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        // Clamp delta time to prevent huge jumps
        deltaTime = Math.min(deltaTime, 0.1);
        
        // Handle wave spawning
        this.updateWaveSpawning(deltaTime);
        
        // Update creatures
        for (let i = this.creatures.length - 1; i >= 0; i--) {
            const creature = this.creatures[i];
            creature.update(deltaTime, this.map.path);
            
            // Check if creature reached the end
            if (creature.reachedEnd) {
                this.creatures.splice(i, 1);
                this.lives--;
                this.audio.play('damage');
                
                if (this.lives <= 0) {
                    this.gameOver(false);
                }
            } else if (creature.health <= 0) {
                this.creatures.splice(i, 1);
                this.gold += creature.goldReward;
                this.score += creature.scoreValue;
                this.audio.play('kill');
            }
        }
        
        // Update towers
        for (const tower of this.towers) {
            tower.update(deltaTime, this.creatures, this.projectiles);
        }
        
        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update(deltaTime);
            
            if (projectile.shouldRemove) {
                this.projectiles.splice(i, 1);
            }
        }
        
        // Check for victory
        if (this.wavesComplete && this.creatures.length === 0) {
            this.gameOver(true);
        }
        
        // Handle input
        this.handleInput();
    }
    
    updateWaveSpawning(deltaTime) {
        const levelData = LEVELS[this.currentLevel - 1];
        if (!levelData || this.wavesComplete) return;
        
        // Check if all waves are complete
        if (this.currentWave >= levelData.waves.length) {
            if (!this.wavesComplete) {
                this.wavesComplete = true;
            }
            return;
        }
        
        // Wait between waves
        if (this.waveTimer > 0) {
            this.waveTimer -= deltaTime;
            return;
        }
        
        // Start next wave
        if (!this.currentWaveData) {
            this.currentWaveData = levelData.waves[this.currentWave];
            this.spawnIndex = 0;
            this.spawnTimer = 0;
            this.audio.play('wave');
        }
        
        // Spawn creatures from current wave
        if (this.spawnIndex < this.currentWaveData.creatures.length) {
            this.spawnTimer -= deltaTime;
            
            if (this.spawnTimer <= 0) {
                const creatureData = this.currentWaveData.creatures[this.spawnIndex];
                const creature = new Creature(
                    this.map.path[0].x,
                    this.map.path[0].y,
                    creatureData.type,
                    creatureData
                );
                this.creatures.push(creature);
                
                this.spawnIndex++;
                this.spawnTimer = this.currentWaveData.spawnInterval || 0.5;
            }
        } else {
            // Wave spawn complete, prepare for next wave
            this.currentWave++;
            this.currentWaveData = null;
            this.waveTimer = 3; // 3 second delay between waves
        }
    }
    
    handleInput() {
        const mousePos = this.input.getMousePosition();
        
        if (this.input.isMouseClicked()) {
            if (this.state === 'PLAYING') {
                // Check HUD clicks (speed buttons)
                const hudAction = this.hud.handleClick(mousePos);
                if (hudAction) {
                    if (hudAction.type === 'speed') {
                        this.gameSpeed = hudAction.value;
                        this.audio.play('click');
                    }
                    return;
                }
                
                // Check tower panel clicks
                const panelAction = this.towerPanel.handleClick(mousePos, this.selectedTower, this.gold);
                if (panelAction) {
                    this.handlePanelAction(panelAction);
                    return;
                }
                
                // Check map clicks for tower placement/selection
                this.handleMapClick(mousePos);
            } else if (this.state === 'GAME_OVER' || this.state === 'VICTORY') {
                const action = this.gameOverScreen.handleClick(mousePos);
                if (action === 'next') {
                    this.initLevel(this.currentLevel + 1);
                    this.audio.play('click');
                } else if (action === 'retry') {
                    this.initLevel(this.currentLevel);
                    this.audio.play('click');
                } else if (action === 'menu') {
                    this.state = 'MENU';
                    this.audio.play('click');
                }
            }
        }
        
        // Clear input state
        this.input.update();
    }
    
    handleMapClick(mousePos) {
        // Convert screen coordinates to game coordinates
        // This is crucial for fixing the tower placement issue
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const gameX = mousePos.x * scaleX;
        const gameY = mousePos.y * scaleY;
        
        // Check if clicking on existing tower
        for (const tower of this.towers) {
            const dx = gameX - tower.x;
            const dy = gameY - tower.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 20) {
                this.selectedTower = tower;
                this.towerPanel.mode = 'info';
                this.audio.play('click');
                return;
            }
        }
        
        // Check if clicking on buildable tile
        const tileX = Math.floor(gameX / 64);
        const tileY = Math.floor(gameY / 64);
        
        if (this.map.isBuildable(tileX, tileY) && this.towerPanel.selectedType) {
            const towerType = TOWER_TYPES[this.towerPanel.selectedType];
            
            if (this.gold >= towerType.cost) {
                // Place tower at tile center (fixes placement issue)
                const tower = new Tower(
                    tileX * 64 + 32,
                    tileY * 64 + 32,
                    this.towerPanel.selectedType,
                    towerType
                );
                
                this.towers.push(tower);
                this.gold -= towerType.cost;
                this.map.placeTower(tileX, tileY);
                this.audio.play('build');
                this.towerPanel.selectedType = null;
            }
        } else {
            // Clicked on empty space, deselect
            this.selectedTower = null;
            this.towerPanel.mode = 'build';
        }
    }
    
    handlePanelAction(action) {
        if (action.type === 'select') {
            this.towerPanel.selectedType = action.towerType;
            this.audio.play('click');
        } else if (action.type === 'upgrade' && this.selectedTower) {
            if (this.gold >= this.selectedTower.upgradeCost) {
                this.gold -= this.selectedTower.upgradeCost;
                this.selectedTower.upgrade();
                this.audio.play('upgrade');
            }
        } else if (action.type === 'sell' && this.selectedTower) {
            this.gold += this.selectedTower.sellValue;
            const index = this.towers.indexOf(this.selectedTower);
            if (index > -1) {
                // Mark tile as buildable again
                const tileX = Math.floor(this.selectedTower.x / 64);
                const tileY = Math.floor(this.selectedTower.y / 64);
                this.map.removeTower(tileX, tileY);
                
                this.towers.splice(index, 1);
            }
            this.selectedTower = null;
            this.towerPanel.mode = 'build';
            this.audio.play('sell');
        }
    }
    
    gameOver(victory) {
        this.state = victory ? 'VICTORY' : 'GAME_OVER';
        this.gameOverScreen.setResult(victory, this.score, this.currentLevel);
        this.audio.stopMusic();
        this.audio.play(victory ? 'victory' : 'defeat');
    }
    
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.state === 'PLAYING') {
            // Render game
            this.renderer.renderMap(this.map);
            
            // Render towers
            for (const tower of this.towers) {
                this.renderer.renderTower(tower, tower === this.selectedTower);
            }
            
            // Render creatures
            for (const creature of this.creatures) {
                this.renderer.renderCreature(creature);
            }
            
            // Render projectiles
            for (const projectile of this.projectiles) {
                this.renderer.renderProjectile(projectile);
            }
            
            // Render UI
            this.hud.render(this.ctx, {
                lives: this.lives,
                gold: this.gold,
                wave: this.currentWave,
                totalWaves: LEVELS[this.currentLevel - 1].waves.length,
                score: this.score,
                gameSpeed: this.gameSpeed
            });
            
            this.towerPanel.render(this.ctx, this.selectedTower, this.gold);
        } else if (this.state === 'GAME_OVER' || this.state === 'VICTORY') {
            // Still render game in background
            this.renderer.renderMap(this.map);
            for (const tower of this.towers) {
                this.renderer.renderTower(tower, false);
            }
            
            // Render game over screen
            this.gameOverScreen.render(this.ctx);
        }
    }
}

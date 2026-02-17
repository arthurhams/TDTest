# Tower Defense Game

A browser-based Tower Defense game built with vanilla JavaScript and HTML5 Canvas.

## Features

### Gameplay Mechanics
- **6 Tower Types**: Basic, Fast, Sniper, Cannon, Frost, and Lightning towers, each with unique stats
- **Multiple Levels**: 3 progressive levels with increasing difficulty
- **Wave-Based Spawning**: Enemies spawn in waves with proper timing
- **Combat System**: Towers automatically target and fire at enemies within range
- **Upgrade System**: Upgrade towers to increase their power
- **Game Speed Controls**: Play at 1x, 2x, or 3x speed

### Fixed Issues
✅ **Next Level button works correctly** - Victory screen properly transitions to next level  
✅ **Tower placement at correct coordinates** - Towers are placed at tile centers with proper coordinate mapping  
✅ **Combat system with hit detection** - Projectiles properly track and hit creatures  
✅ **Audio integration** - Web Audio API used for sound effects and background music  
✅ **Balanced creature spawning** - Proper number of creatures per wave relative to player lives  

## How to Play

1. **Start the Game**: Open `index.html` in a modern web browser
2. **Build Towers**: 
   - Click on a tower type in the right panel
   - Click on a green (buildable) tile to place it
   - Towers cost gold (shown in the HUD)
3. **Defend**: Towers automatically attack enemies that come within range
4. **Manage Resources**:
   - Earn gold by defeating enemies
   - Spend gold to build and upgrade towers
5. **Win Conditions**:
   - Complete all waves without losing all lives
   - Click "Next Level" to progress

## Game Controls

- **Left Click**: Select tower type, place tower, interact with UI
- **Speed Buttons**: Top-right corner (1x, 2x, 3x)
- **Tower Selection**: Click on placed tower to upgrade or sell

## Technical Details

### File Structure
```
├── index.html              # Main HTML file
├── js/
│   ├── main.js            # Entry point
│   ├── engine/
│   │   ├── game.js        # Core game loop and state management
│   │   ├── input.js       # Mouse/touch input handling
│   │   ├── audio.js       # Web Audio API sound manager
│   │   ├── renderer.js    # Canvas rendering
│   │   └── map.js         # Map and tile management
│   ├── entities/
│   │   ├── tower.js       # Tower logic and combat
│   │   ├── creature.js    # Enemy pathfinding and health
│   │   └── projectile.js  # Projectile movement and collision
│   ├── ui/
│   │   ├── hud.js         # Heads-up display
│   │   ├── tower-panel.js # Tower build/upgrade panel
│   │   └── game-over.js   # Victory/defeat screens
│   └── data/
│       ├── levels.js      # Level definitions and wave data
│       └── tower-types.js # Tower stats and properties
```

## Running Locally

Simply open `index.html` in a web browser, or use a local server:

```bash
python3 -m http.server 8080
# Navigate to http://localhost:8080
```
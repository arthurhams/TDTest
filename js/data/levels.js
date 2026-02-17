export const LEVELS = [
    {
        name: 'Level 1',
        startingGold: 200,
        map: {
            width: 20,
            height: 11,
            tiles: [
                ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
                ['P','P','P','P','G','B','B','B','B','B','B','B','B','B','B','B','B','G','G','G'],
                ['G','G','G','P','G','B','B','B','B','B','B','B','B','B','B','B','B','G','G','G'],
                ['G','B','B','P','P','P','P','P','P','G','G','G','G','G','G','G','G','G','G','G'],
                ['G','B','B','B','B','G','G','G','P','G','B','B','B','B','B','B','B','B','B','G'],
                ['G','B','B','B','B','G','G','G','P','G','B','B','B','B','B','B','B','B','B','G'],
                ['G','B','B','B','B','G','G','G','P','P','P','P','P','P','P','P','G','G','G','G'],
                ['G','B','B','B','B','G','G','G','G','G','G','G','G','G','G','P','G','G','G','G'],
                ['G','B','B','B','B','G','G','G','G','G','G','G','G','G','G','P','G','G','G','G'],
                ['G','B','B','B','B','G','G','G','G','G','G','G','G','G','G','P','P','P','P','P'],
                ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G']
            ],
            path: [
                {x: 32, y: 96}, {x: 224, y: 96}, {x: 224, y: 224},
                {x: 512, y: 224}, {x: 512, y: 416}, {x: 960, y: 416},
                {x: 960, y: 624}, {x: 1248, y: 624}
            ]
        },
        waves: [
            {
                creatures: [
                    { type: 'weak', health: 50, speed: 100, color: '#90EE90', goldReward: 5, scoreValue: 10 },
                    { type: 'weak', health: 50, speed: 100, color: '#90EE90', goldReward: 5, scoreValue: 10 },
                    { type: 'weak', health: 50, speed: 100, color: '#90EE90', goldReward: 5, scoreValue: 10 },
                    { type: 'weak', health: 50, speed: 100, color: '#90EE90', goldReward: 5, scoreValue: 10 },
                    { type: 'weak', health: 50, speed: 100, color: '#90EE90', goldReward: 5, scoreValue: 10 }
                ],
                spawnInterval: 0.8
            },
            {
                creatures: [
                    { type: 'weak', health: 60, speed: 110, color: '#90EE90', goldReward: 6, scoreValue: 12 },
                    { type: 'weak', health: 60, speed: 110, color: '#90EE90', goldReward: 6, scoreValue: 12 },
                    { type: 'weak', health: 60, speed: 110, color: '#90EE90', goldReward: 6, scoreValue: 12 },
                    { type: 'weak', health: 60, speed: 110, color: '#90EE90', goldReward: 6, scoreValue: 12 },
                    { type: 'weak', health: 60, speed: 110, color: '#90EE90', goldReward: 6, scoreValue: 12 },
                    { type: 'weak', health: 60, speed: 110, color: '#90EE90', goldReward: 6, scoreValue: 12 },
                    { type: 'weak', health: 60, speed: 110, color: '#90EE90', goldReward: 6, scoreValue: 12 }
                ],
                spawnInterval: 0.7
            },
            {
                creatures: [
                    { type: 'medium', health: 100, speed: 90, color: '#FFA500', goldReward: 10, scoreValue: 20 },
                    { type: 'weak', health: 70, speed: 120, color: '#90EE90', goldReward: 7, scoreValue: 14 },
                    { type: 'medium', health: 100, speed: 90, color: '#FFA500', goldReward: 10, scoreValue: 20 },
                    { type: 'weak', health: 70, speed: 120, color: '#90EE90', goldReward: 7, scoreValue: 14 },
                    { type: 'medium', health: 100, speed: 90, color: '#FFA500', goldReward: 10, scoreValue: 20 },
                    { type: 'weak', health: 70, speed: 120, color: '#90EE90', goldReward: 7, scoreValue: 14 },
                    { type: 'medium', health: 100, speed: 90, color: '#FFA500', goldReward: 10, scoreValue: 20 },
                    { type: 'weak', health: 70, speed: 120, color: '#90EE90', goldReward: 7, scoreValue: 14 }
                ],
                spawnInterval: 0.6
            }
        ]
    },
    {
        name: 'Level 2',
        startingGold: 250,
        map: {
            width: 20,
            height: 11,
            tiles: [
                ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
                ['P','P','P','P','P','P','P','G','G','G','G','G','G','G','G','G','G','G','G','G'],
                ['G','G','B','B','B','B','P','G','B','B','B','B','B','B','B','B','B','B','G','G'],
                ['G','G','B','B','B','B','P','G','B','B','B','B','B','B','B','B','B','B','G','G'],
                ['G','G','B','B','B','B','P','P','P','P','P','P','P','P','G','G','G','G','G','G'],
                ['G','G','B','B','B','B','B','B','B','B','B','B','B','P','G','B','B','B','B','G'],
                ['G','G','B','B','B','B','B','B','B','B','B','B','B','P','G','B','B','B','B','G'],
                ['G','G','B','B','B','B','B','B','B','B','B','B','B','P','G','B','B','B','B','G'],
                ['G','G','B','B','B','B','B','B','B','B','B','B','B','P','P','P','P','P','P','P'],
                ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
                ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G']
            ],
            path: [
                {x: 32, y: 96}, {x: 416, y: 96}, {x: 416, y: 288},
                {x: 832, y: 288}, {x: 832, y: 544}, {x: 1248, y: 544}
            ]
        },
        waves: [
            {
                creatures: [
                    { type: 'medium', health: 120, speed: 95, color: '#FFA500', goldReward: 12, scoreValue: 24 },
                    { type: 'medium', health: 120, speed: 95, color: '#FFA500', goldReward: 12, scoreValue: 24 },
                    { type: 'medium', health: 120, speed: 95, color: '#FFA500', goldReward: 12, scoreValue: 24 },
                    { type: 'medium', health: 120, speed: 95, color: '#FFA500', goldReward: 12, scoreValue: 24 },
                    { type: 'medium', health: 120, speed: 95, color: '#FFA500', goldReward: 12, scoreValue: 24 },
                    { type: 'medium', health: 120, speed: 95, color: '#FFA500', goldReward: 12, scoreValue: 24 }
                ],
                spawnInterval: 0.7
            },
            {
                creatures: [
                    { type: 'fast', health: 80, speed: 150, color: '#FF6B6B', goldReward: 10, scoreValue: 20 },
                    { type: 'fast', health: 80, speed: 150, color: '#FF6B6B', goldReward: 10, scoreValue: 20 },
                    { type: 'fast', health: 80, speed: 150, color: '#FF6B6B', goldReward: 10, scoreValue: 20 },
                    { type: 'fast', health: 80, speed: 150, color: '#FF6B6B', goldReward: 10, scoreValue: 20 },
                    { type: 'fast', health: 80, speed: 150, color: '#FF6B6B', goldReward: 10, scoreValue: 20 },
                    { type: 'fast', health: 80, speed: 150, color: '#FF6B6B', goldReward: 10, scoreValue: 20 },
                    { type: 'fast', health: 80, speed: 150, color: '#FF6B6B', goldReward: 10, scoreValue: 20 },
                    { type: 'fast', health: 80, speed: 150, color: '#FF6B6B', goldReward: 10, scoreValue: 20 }
                ],
                spawnInterval: 0.5
            },
            {
                creatures: [
                    { type: 'strong', health: 200, speed: 80, color: '#8B4513', goldReward: 20, scoreValue: 40 },
                    { type: 'medium', health: 130, speed: 100, color: '#FFA500', goldReward: 13, scoreValue: 26 },
                    { type: 'strong', health: 200, speed: 80, color: '#8B4513', goldReward: 20, scoreValue: 40 },
                    { type: 'medium', health: 130, speed: 100, color: '#FFA500', goldReward: 13, scoreValue: 26 },
                    { type: 'strong', health: 200, speed: 80, color: '#8B4513', goldReward: 20, scoreValue: 40 },
                    { type: 'medium', health: 130, speed: 100, color: '#FFA500', goldReward: 13, scoreValue: 26 },
                    { type: 'strong', health: 200, speed: 80, color: '#8B4513', goldReward: 20, scoreValue: 40 }
                ],
                spawnInterval: 0.7
            },
            {
                creatures: [
                    { type: 'boss', health: 500, speed: 60, color: '#FF0000', size: 18, goldReward: 50, scoreValue: 100 },
                    { type: 'fast', health: 90, speed: 160, color: '#FF6B6B', goldReward: 11, scoreValue: 22 },
                    { type: 'fast', health: 90, speed: 160, color: '#FF6B6B', goldReward: 11, scoreValue: 22 },
                    { type: 'fast', health: 90, speed: 160, color: '#FF6B6B', goldReward: 11, scoreValue: 22 },
                    { type: 'fast', health: 90, speed: 160, color: '#FF6B6B', goldReward: 11, scoreValue: 22 }
                ],
                spawnInterval: 0.8
            }
        ]
    },
    {
        name: 'Level 3',
        startingGold: 300,
        map: {
            width: 20,
            height: 11,
            tiles: [
                ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
                ['G','G','G','G','G','G','G','G','G','G','G','G','P','P','P','P','P','P','P','P'],
                ['G','B','B','B','B','B','B','B','B','B','B','G','P','G','G','G','G','G','G','G'],
                ['G','B','B','B','B','B','B','B','B','B','B','G','P','G','B','B','B','B','B','G'],
                ['P','P','P','P','P','P','P','P','P','P','P','P','P','G','B','B','B','B','B','G'],
                ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','B','B','B','B','B','G'],
                ['G','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','G'],
                ['G','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','G'],
                ['G','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','G'],
                ['G','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','G'],
                ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G']
            ],
            path: [
                {x: 32, y: 288}, {x: 768, y: 288}, {x: 768, y: 96},
                {x: 1248, y: 96}
            ]
        },
        waves: [
            {
                creatures: [
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 },
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 },
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 },
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 },
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 },
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 },
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 },
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 },
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 },
                    { type: 'fast', health: 100, speed: 170, color: '#FF6B6B', goldReward: 12, scoreValue: 24 }
                ],
                spawnInterval: 0.4
            },
            {
                creatures: [
                    { type: 'strong', health: 250, speed: 85, color: '#8B4513', goldReward: 25, scoreValue: 50 },
                    { type: 'strong', health: 250, speed: 85, color: '#8B4513', goldReward: 25, scoreValue: 50 },
                    { type: 'strong', health: 250, speed: 85, color: '#8B4513', goldReward: 25, scoreValue: 50 },
                    { type: 'strong', health: 250, speed: 85, color: '#8B4513', goldReward: 25, scoreValue: 50 },
                    { type: 'strong', health: 250, speed: 85, color: '#8B4513', goldReward: 25, scoreValue: 50 },
                    { type: 'strong', health: 250, speed: 85, color: '#8B4513', goldReward: 25, scoreValue: 50 },
                    { type: 'strong', health: 250, speed: 85, color: '#8B4513', goldReward: 25, scoreValue: 50 },
                    { type: 'strong', health: 250, speed: 85, color: '#8B4513', goldReward: 25, scoreValue: 50 }
                ],
                spawnInterval: 0.6
            },
            {
                creatures: [
                    { type: 'armored', health: 400, speed: 70, color: '#4682B4', size: 15, goldReward: 35, scoreValue: 70 },
                    { type: 'armored', health: 400, speed: 70, color: '#4682B4', size: 15, goldReward: 35, scoreValue: 70 },
                    { type: 'armored', health: 400, speed: 70, color: '#4682B4', size: 15, goldReward: 35, scoreValue: 70 },
                    { type: 'armored', health: 400, speed: 70, color: '#4682B4', size: 15, goldReward: 35, scoreValue: 70 },
                    { type: 'armored', health: 400, speed: 70, color: '#4682B4', size: 15, goldReward: 35, scoreValue: 70 },
                    { type: 'armored', health: 400, speed: 70, color: '#4682B4', size: 15, goldReward: 35, scoreValue: 70 }
                ],
                spawnInterval: 0.8
            },
            {
                creatures: [
                    { type: 'boss', health: 800, speed: 65, color: '#8B0000', size: 20, goldReward: 80, scoreValue: 160 },
                    { type: 'medium', health: 150, speed: 110, color: '#FFA500', goldReward: 15, scoreValue: 30 },
                    { type: 'medium', health: 150, speed: 110, color: '#FFA500', goldReward: 15, scoreValue: 30 },
                    { type: 'medium', health: 150, speed: 110, color: '#FFA500', goldReward: 15, scoreValue: 30 },
                    { type: 'medium', health: 150, speed: 110, color: '#FFA500', goldReward: 15, scoreValue: 30 },
                    { type: 'medium', health: 150, speed: 110, color: '#FFA500', goldReward: 15, scoreValue: 30 }
                ],
                spawnInterval: 0.7
            }
        ]
    }
];

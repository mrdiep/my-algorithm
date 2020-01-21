function expandWorldFrom(y, x, world, regionName, island) {
    island = island || [];

    var canExplore = !!world[y] && !!world[y][x] && world[y][x].value == 1 && world[y][x].explored === 0;

    if (!canExplore)
        return island;

    world[y][x].explored = 1;
    world[y][x].regionName = regionName;
    island.push(world[y][x]);

    expandWorldFrom(y, x + 1, world, regionName, island);
    expandWorldFrom(y, x - 1, world, regionName, island);
    expandWorldFrom(y + 1, x, world, regionName, island);
    expandWorldFrom(y - 1, x, world, regionName, island);

    return island;
}

var m =  
    ["0110000111", "0100000111", "1100000111", "1000000000", "1000000000"]
    
    // ["1111111111111111111111111111111111111111","0111111111111111111111111111111111111110","0011111111111111111111111111111111111100","0001111111111111111111111111111111111000","0000111111111111111111111111111111110000","0000011111111111111111111111111111100000","0000001111111111111111111111111111000000","0000000111111111111111111111111110000000","0000000011111111111111111111111100000000","0000000001111111111111111111111000000000","0000000000111111111111111111110000000000","0000000000011111111111111111100000000000","0000000000011111111111111111000000000000","0000000000011111111111111110000000000000","0000000000011111111111111100000000000000","0000000000011111111111111000000000000000","0000000000011111111111110000000000000000","0000000000011111111111100000000000000000","0000000000011111111111000000000000000000","0000000000011111111110000000000000000000","0000000000011111111100000000000000000111","0000000000011111111000000000000000001111","0000000000000000000000000000000000011111","1000000000000000000000000000000000111111","1100000000000000000000000000000001111111","1110000000000000000000000000000011111111","1111000000000000000000000000000111111111","1111100000000000000000000000001111111111","1111110000000000000000000000011111111111","1111111000000000000000000000111111111111","1111111111111111111111111111111111111111"]

;

var worldWidth = m[0].length;
var worldHeight = m.length;
console.log(m.map((x, y) => x.split('').map((t,x) => parseInt(t))))
var world = m.map((x, y) => x.split('').map((t,x) => ({ y, x, value: parseInt(t), explored: 0 })));

var islandList = [];
var regionNameCode = 65;

for (var y =0; y <= worldHeight - 1;y++) {
    for (var x = 0; x <= worldWidth - 1;x++) {

        if (world[y][x].value === 1 && !world[y][x].explored) {
            var island = expandWorldFrom(y, x, world, String.fromCharCode(regionNameCode++));
            islandList.push(island);
        }

    }
}

console.log(world.map(y => y.map(x => x.regionName || ' ')))

var region1 = islandList.shift();
var region2 = islandList.shift();

var allPath = [];
for (var r1 of region1) {
    
    for (var r2 of region2.filter(x => x.x === r1.x).sort((a, b) => a.y - b.y).slice(0, 1)) { // note: sort because search from left to right: y alway increse
        allPath.push( { length: Math.abs(r2.y - r1.y) - 1 , point1: r1, point2: r2 })
    }

    for (var r2 of region2.filter(x => x.y === r1.y).sort((a, b) => a.x - b.x).slice(0, 1)) { // note: sort because search from left to right: y alway increse
        allPath.push({ length: Math.abs(r2.x - r1.x) - 1 , point1: r1, point2: r2 })
    }

    for (var r2 of region2.filter(x => 
        (x.y + 1 === r1.y && x.x + 1 === r1.x) || 
        (x.y + 1 === r1.y && x.x - 1 === r1.x) || 
        (x.y - 1 === r1.y && x.x + 1 === r1.x) || 
        (x.y - 1 === r1.y && x.x - 1 === r1.x)
        
        )) {
        allPath.push({ length: 1 , point1: r1, point2: r2 })
    }
}

var shortestLength = allPath.sort((a, b) => a.length - b.length)[0];
console.log('shortest:' + shortestLength.length)
console.log('can connect between point(x, y): ', allPath.filter(x => x.length === shortestLength.length).map(({point1, point2}) => '(' + (point1.x + 1) + ','+ (point1.y + 1) + ') <-> ('  + (point2.x + 1) + ',' + (point2.y + 1) + ')'));

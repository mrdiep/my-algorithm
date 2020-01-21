function expandWorldFrom(y, x, world, regionName, island) {
    island = island || [];

    var canExplore = !!world[y] && !!world[y][x] && world[y][x].value == 1 && world[y][x].explored === 0;

    if (!canExplore)
        return island;

    world[y][x].explored = 1;
    world[y][x].regionName = regionName;
    island.push(world[y][x]);

    // expandWorldFrom(y + 1, x + 1, world, regionName, island);
    // expandWorldFrom(y + 1, x - 1, world, regionName, island);
    // expandWorldFrom(y - 1, x + 1, world, regionName, island);
    // expandWorldFrom(y - 1, x - 1, world, regionName, island);

    expandWorldFrom(y, x + 1, world, regionName, island);
    expandWorldFrom(y, x - 1, world, regionName, island);
    expandWorldFrom(y + 1, x, world, regionName, island);
    expandWorldFrom(y - 1, x, world, regionName, island);

    return island;
}

var m =  
    ["0110000111", "0100000111", "1100000111", "1000000000", "1000000000", "1000000000", "1110110000",
    "0011111111", "0110000111", "0100000111", "1100000111", "1000000000", "1000000000", "1000000000",
    "1110110000", "0000100000", "0110000111", "0100000111", "1100000111", "1000000000", "1000000000",
    "1000000000", "1110110000", "0011111111","0110000111", "0100000111", "1100000111", "1000000000", "1000000000", "1000000000", 
    "0100000111", "1100000111", "1000000000", "1000000000", "1000000000", "1110110000", "0100000111", "1100000111", "1000000000", "1000000000", "1000000000",]
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
console.log("Total island = " + islandList.length);
// var region1 = regions.pop();
// var region2 = regions.pop();

// if (!region2) return -1;
// var p2 = [];
// for (var r1 of region1) {
    
//     for (var r2 of region2.filter(x => x.x == r1.x)) {
//         p2.push(Math.abs(r2.y - r1.y) )
//     }

//     for (var r2 of region2.filter(x => x.y == r1.y)) {
//         p2.push(Math.abs(r2.x - r1.x ))
//     }
// }

// console.log(p2.sort((a, b) => a - b)  - 1);


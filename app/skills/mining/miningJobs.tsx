import miningItems from "./miningItems";

const miningJobs = [
            {
                id: 'copper_ore',
                name: 'Mine Copper Ore',
                description: 'Extract copper ore from the mine',
                duration: 3000, // 3 seconds
                experience: 5,
                requiredLevel: 1,
                resources: [miningItems.copper_ore],
                quantity: 1
            },
            {
                id: 'tin_ore',
                name: 'Mine Tin Ore',
                description: 'Extract tin ore from the mine',
                duration: 4000, // 4 seconds
                experience: 10,
                requiredLevel: 5,
                resources: [miningItems.tin_ore],
                quantity: 1
            },
            {
                id: 'iron_ore',
                name: 'Mine Iron Ore',
                description: 'Extract iron ore from the mine',
                duration: 5500, // 5.5 seconds
                experience: 25,
                requiredLevel: 15,
                resources: [miningItems.iron_ore],
                quantity: 1
            }
        ];
 export default miningJobs;
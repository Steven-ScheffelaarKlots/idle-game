import ItemType from "../../design/inventory/itemTypes";

export const miningItems: Record<string, ItemType> = {
  copper_ore: {
    id: "copper_ore",
    name: "Copper Ore",
    category: "mining",
    description: "A basic ore used for crafting and smelting.",
    rarity: "common",
    icon: "🪨",
    value: 5
  },
  iron_ore: {
    id: "iron_ore",
    name: "Iron Ore",
    category: "mining",
    description: "A stronger ore used for advanced crafting.",
    rarity: "uncommon",
    icon: "⛏️",
    value: 10
  },
  gold_ore: {
    id: "gold_ore",
    name: "Gold Ore",
    category: "mining",
    description: "A precious metal used for high-value items.",
    rarity: "rare",
    icon: "💰",
    value: 50
  },
  diamond: {
    id: "diamond",
    name: "Diamond",
    category: "mining",
    description: "The hardest known natural material, used for the most valuable items.",
    rarity: "epic",
    icon: "💎",
    value: 100
  },
  coal: {
    id: "coal",
    name: "Coal",
    category: "mining",
    description: "A combustible black rock used as fuel and in crafting.",
    rarity: "common",
    icon: "🪨",
    value: 5
  },
  tin_ore: {
    id: "tin_ore",
    name: "Tin Ore",
    category: "mining",
    description: "A malleable metal used in various crafting recipes.",
    rarity: "common",
    icon: "🪨",
    value: 5
  },
  silver_ore: {
    id: "silver_ore",
    name: "Silver Ore",
    category: "mining",
    description: "A precious metal used for crafting jewelry and high-value items.",
    rarity: "uncommon",
    icon: "🪙",
    value: 10
  },
  platinum_ore: {
    id: "platinum_ore",
    name: "Platinum Ore",
    category: "mining",
    description: "A rare and valuable metal used for high-end crafting.",
    rarity: "rare",
    icon: "🔗",
    value: 50
  }
};

export default miningItems
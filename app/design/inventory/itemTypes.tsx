export default interface ItemType {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string; // e.g., "weapon", "armor", "potion"
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    levelRequirement?: number; // Minimum level required to use the item
    stats?: {
        attack?: number; // For weapons
        defense?: number; // For armor
        health?: number; // For potions or consumables
        mana?: number; // For magic items
        speed?: number; // For boots or agility items
        [key: string]: number | undefined; // Additional stats can be added dynamically
    };
    effects?: string[]; // List of effects or abilities the item provides
    stackable?: boolean; // Whether the item can be stacked in inventory
    image?: string; // URL or path to the item's image
    value?: number; // Price for buying/selling the item
    durability?: number; // Durability for items that can wear out

}
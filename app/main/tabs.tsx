
import Mining from "../skills/mining/miningView";

export interface Tab {
    id: string;
    displayName: string;
    name: string;
    path: React.FC;
    category?: TabCategory;
    icon?: string;
}

export interface TabCategory {
    displayName: string;
    name: string;
}

export const tabsObject: Tab[] = [
    { id: "mining", displayName: "Mining", name: "Mining", path: Mining, category: { displayName: "Skills", name: "skills" }, icon: "fa-solid fa-hammer" },
    { id: "character", displayName: "Character", name: "Character", path: Mining, category: { displayName: "Player", name: "player" }, icon: "fa-solid fa-user" },
    { id: "crafting", displayName: "Crafting", name: "Crafting", path: Mining, category: { displayName: "Skills", name: "skills" }, icon: "fa-solid fa-cogs" },
];

export const groupTabsByCategory = (
    tabs: Tab[]
): Record<string, { displayName: string; tabs: Tab[] }> => {
    return tabs.reduce((acc, tab) => {
        const categoryName = tab.category?.name || "Uncategorized";
        const categoryDisplayName = tab.category?.displayName || "Uncategorized";
        if (!acc[categoryName]) {
            acc[categoryName] = { displayName: categoryDisplayName, tabs: [] };
        }
        acc[categoryName].tabs.push(tab);
        return acc;
    }, {} as Record<string, { displayName: string; tabs: Tab[] }>);
};

export default tabsObject;
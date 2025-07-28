import ItemType from "../../design/inventory/itemTypes";

export type MiningJob = {
    id: string;
    name: string;
    description: string;
    duration: number;
    experience: number;
    requiredLevel: number;
    resources: ItemType[];
    quantity: number;
};
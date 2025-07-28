import { ReactNode } from 'react';
import { MiningSkill } from '../../skills/mining/miningSkill';
import ItemType from '../../design/inventory/itemTypes';


type Skills = {
  [key: string]: MiningSkill;
};

export type InventoryItem = {
  item: ItemType;
  quantity: number;
};

export class Character {
  name: string;
  hp: number;
  maxHp: number;
  currency: number;
  inventory: InventoryItem[];
  skills: Skills;

  constructor(name: string) {
    this.name = name;
    this.hp = 100;
    this.maxHp = 100;
    this.currency = 0;
    this.inventory = [];
    this.skills = {
      mining: new MiningSkill()
    };
  }

  // Health-related methods
  heal(amount: number): void {
    this.hp = Math.min(this.hp + amount, this.maxHp);
  }

  takeDamage(amount: number): void {
    this.hp = Math.max(this.hp - amount, 0);
  }

  isAlive(): boolean {
    return this.hp > 0;
  }

  // Currency methods
  addCurrency(amount: number): void {
    this.currency += amount;
  }

  spendCurrency(amount: number): boolean {
    if (this.currency >= amount) {
      this.currency -= amount;
      return true;
    }
    return false;
  }

  // Inventory methods
  addItem(item: ItemType, quantity: number): void {
    const existingItem = this.inventory.find(i => i.item.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.inventory.push({ item, quantity });
    }
  }

  removeItem(itemId: string, quantity: number = 1): boolean {
    const itemIndex = this.inventory.findIndex(i => i.item.id === itemId);
    
    if (itemIndex === -1 || this.inventory[itemIndex].quantity < quantity) {
      return false;
    }
    
    this.inventory[itemIndex].quantity -= quantity;
    
    if (this.inventory[itemIndex].quantity <= 0) {
      this.inventory.splice(itemIndex, 1);
    }
    
    return true;
  }

  findItemQuantity(itemId: string): number {
    const item = this.inventory.find(i => i.item.id === itemId);
    return item ? item.quantity : 0;
  }

  getSkillLevel(skillName: string): number {
    return this.skills[skillName].getLevel();
  }
}

// React component to display character information
export function CharacterDisplay({ character }: { character: Character }): ReactNode {
  return (
    <div className="character-display">
      <h2>{character.name}</h2>
      <div className="stats">
        <div>HP: {character.hp}/{character.maxHp}</div>
        <div>Currency: {character.currency}</div>
      </div>
      
      <div className="skills">
        <h3>Skills</h3>
        {Object.values(character.skills).map((skill) => (
          <div key={skill.getName()} className="skill">
            {skill.getName()}: Level {skill.getLevel()} 
          </div>
        ))}
      </div>
      
      <div className="inventory">
        <h3>Inventory ({character.inventory.length} items)</h3>
        {character.inventory.map((item) => (
          <div key={item.item.id} className="item">
            {item.item.name} x{item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
}

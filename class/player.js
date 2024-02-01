const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        const foundItem = this.currentRoom.getItemByName(itemName);
        if (foundItem) {
            this.currentRoom.items = this.currentRoom.items.filter(roomItem => roomItem !== foundItem);
            this.items.push(foundItem);
        }

    }

    dropItem(itemName) {
        const foundItemIndex = this.items.findIndex(item => item.name === itemName);
        if (foundItemIndex !== -1) {
            const droppedItem = this.items.splice(foundItemIndex, 1)[0];
            this.currentRoom.items.push(droppedItem);
        }
    }

    eatItem(itemName) {
        const index = this.items.findIndex(item => item.name === itemName);
        if (index !== -1) {
            const item = this.items[index];
            if (item instanceof Food) {
                this.items.splice(index, 1);
            }
        }

    }

    getItemByName(name) {
        return this.items.find(item => item.name === name);
    }
}

module.exports = {
  Player,
};

import * as robot from 'robotjs';

import { Inventory, Coordinates } from '../../../interfaces';
import { Bot } from '../../../interfaces/bot';
import { AntibanService } from '../../../services/antiban.service';
import { ClientService } from '../../../services/client.service';
import { UtilitiesService } from '../../../services/utilities.service';

export class HighAlch implements Bot {

    constructor(private antiban: AntibanService, private client: ClientService, private utils: UtilitiesService) {}

    initialize = (): void => {
        this.client.initialize();
    }

    main = (): void => {
        console.log('[STARTING BOT]');
        this.client.isRunning = true;
        this.utils.iterations = 0;
    
        while (this.client.isRunning) {
            if (this.utils.iterations === 0) {
                this.client.clickMagicSpellsIcon();
            }

            this.makeItems();
            this.utils.increase();
            // this.antiban.start();
        }
    }

    run = (): void => {
        this.initialize();
        this.main();
    }

    makeItem = (item: Inventory): void => {
        if (item.x && item.y) {
            robot.moveMouseSmooth(item.x, item.y);
            robot.mouseClick();
            this.utils.sleep(this.utils.getRandomInteger(500, 1500));
        } 
    }

    makeItems = () => {
        // Item 1
        let item1: Inventory = this.getItem(1);
        this.makeItem(item1);

        // Item 2
        let item2: Inventory = this.getItem(2);
        this.makeItem(item2);

        this.utils.sleep(this.utils.getRandomInteger(1000, 1500));
    }

    getItem = (item: number) => {
        let coordinates: Coordinates = null;
        let inventory: Inventory[] = [];

        if (item === 1) {
            coordinates = this.utils.getCoordinatesBetween(713, 333, 727, 346);
            inventory = [
                { x: coordinates.x, y: coordinates.y, slot: 0 }
            ];
        } else {
            coordinates = this.utils.getCoordinatesBetween(694, 322, 712, 340);
            inventory = [
                { x: coordinates.x, y: coordinates.y, slot: 12 }
            ];
        }
        
        console.log(`[ITEM ${item}]: SLOT #${inventory[0].slot}`);
        return inventory[0];
    }
}

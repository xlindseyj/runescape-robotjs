import * as robot from 'robotjs';

import { AntibanOptions } from '../../../interfaces/antiban-options';
import { Inventory, Coordinates } from '../../../interfaces';
import { Bot } from '../../../interfaces/bot';
import { AntibanService } from '../../../services/antiban.service';
import { ClientService } from '../../../services/client.service';
import { UtilitiesService } from '../../../services/utilities.service';

export class StunAlch implements Bot {

    antibanOptions: AntibanOptions = {
        skill: 'magic'
    };

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
                this.setCamera();
                this.client.clickMagicSpellsIcon();
            }

            this.makeItems();
            this.utils.increase();
            this.antiban.start(this.antibanOptions);
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

        this.castStun();

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

    castStun = (): void => {
        const spell: Coordinates = this.utils.getCoordinatesBetween(660, 412, 673, 420);
        robot.moveMouseSmooth(spell.x, spell.y);
        robot.mouseClick();

        this.utils.sleep(this.utils.getRandomInteger(500, 1000));

        const monk: Coordinates = this.utils.getCoordinatesBetween(251, 101, 288, 116);
        robot.moveMouseSmooth(monk.x, monk.y);
        robot.mouseClick();
    }

    setCamera = (): void => {
        robot.keyToggle("right", "down");
        this.utils.sleep(900);
        robot.keyToggle("right", "up");
        this.utils.sleep(this.utils.getRandomInteger(300, 500));
        robot.keyToggle("up", "down");
        this.utils.sleep(1100);
        robot.keyToggle("up", "up");
    }
}

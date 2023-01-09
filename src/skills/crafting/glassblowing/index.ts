import * as robot from 'robotjs';

import { Coordinates, Inventory } from '../../../interfaces';
import { AntibanService } from '../../../services/antiban.service';
import { ClientService } from '../../../services/client.service';
import { UtilitiesService } from '../../../services/utilities.service';

export class Glassblowing {

    constructor(private antiban: AntibanService, private client: ClientService, private utils: UtilitiesService) {}

    initialize = () => {
        this.client.initialize();
    }

    main = () => {
        console.log('[STARTING BOT]');
        this.client.isRunning = true;
        this.utils.iterations = 0;
    
        while (this.client.isRunning) {
            this.client.openBank();
            this.bankItems();
            this.withdrawItems();
            this.client.closeBank();

            if (this.client.isSkillsTabOpen) {
                this.client.clickInventoryIcon();
            }

            this.makeItems();
            this.utils.increase();
            this.antiban.start();
            this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
        }
    }

    run = () => {
        this.initialize();
        this.main();
    }

    bankItems = () => {
        console.log('[BANKING ITEMS]');
        robot.moveMouseSmooth(445, 340);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(500, 1000));
    }

    withdrawItems = () => {
        if (this.utils.iterations === 0 || this.client.isLoggingIn) {
            if (this.client.isLoggingIn) {
                console.log('[RESETTING LOGIN FLAG]');
                this.client.isLoggingIn = false;
            }
            this.client.clickEquipementBankTab();
        }
        this.withdrawItem(1);
        this.withdrawItem(2);
    }

    withdrawItem = (item: number): void => {
        if (item === 1) {
            robot.moveMouseSmooth(425, 130);
            robot.mouseClick();
            this.utils.sleep(this.utils.getRandomInteger(500, 1000));
        } else {
            robot.moveMouseSmooth(425, 160);
            robot.mouseClick('right', false);
            this.utils.sleep(this.utils.getRandomInteger(500, 1000));
            robot.moveMouseSmooth(425, 270);
            robot.mouseClick();
            this.utils.sleep(1000);
        }
    }

    makeItem = (item: Inventory): void => {
        if (item.x && item.y) {
            robot.moveMouseSmooth(item.x, item.y);
            robot.mouseClick();
            this.utils.sleep(this.utils.getRandomInteger(1000, 2000));
        } 
    }

    makeItems = () => {
        // Item 1
        let item1: Inventory = this.getItem(1);
        this.makeItem(item1);

        // Item 2
        let item2: Inventory = this.getItem(2);
        this.makeItem(item2);

        // Make Items
        this.utils.sleep(300);
        robot.keyTap('space');
    }

    getItem = (item: number) => {
        let coordinates: Coordinates = null;
        let inventory: Inventory[] = [];

        if (item === 1) {
            coordinates = this.utils.getCoordinatesBetween(566, 250, 590, 267);
            inventory = [
                { x: coordinates.x, y: coordinates.y, slot: 1 }
            ];
        } else {
            coordinates = this.utils.getCoordinatesBetween(568, 284, 588, 302);
            inventory = [
                { x: coordinates.x, y: coordinates.y, slot: 5 }
            ];
        }
        
        console.log(`[ITEM ${item}]: SLOT #${inventory[0].slot}`);
        return inventory[0];
    }
}

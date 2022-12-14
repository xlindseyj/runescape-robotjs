import * as robot from 'robotjs';

import { Inventory } from '../../interfaces';
import { AntibanService } from '../../services/antiban.service';
import { ClientService } from '../../services/client.service';
import { UtilitiesService } from '../../services/utilities.service';

export class Herblore {

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
            this.client.clickPotionBankTab();
        }
        this.withdrawItem(1);
        this.withdrawItem(2);
    }

    withdrawItem = (item: number): void => {
        if (item === 1) {
            robot.moveMouseSmooth(425, 130);
            robot.mouseClick('right', false);
            this.utils.sleep(this.utils.getRandomInteger(500, 1000));
            robot.moveMouseSmooth(425, 220);
            robot.mouseClick();
            this.utils.sleep(300);
        } else {
            robot.moveMouseSmooth(425, 160);
            robot.mouseClick('right', false);
            this.utils.sleep(this.utils.getRandomInteger(500, 1000));
            robot.moveMouseSmooth(425, 250);
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
        this.client.clickBrewAllButton();
    }

    getItem = (item: number) => {
        let inventory: Inventory[] = [];

        if (item === 1) {
            inventory = [
                { x: 705, y: 332, slot: 12 },
                { x: 578, y: 366, slot: 13 },
                { x: 620, y: 368, slot: 14 }
            ];
        } else {
            inventory = [
                { x: 578, y: 406, slot: 17 }
            ];
        }
        
        let index: number = this.utils.getRandomInteger(0, inventory.length - 1);
        console.log(`[ITEM ${item}]: SLOT #${inventory[index].slot}`);
        return inventory[index];
    }
}

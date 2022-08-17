import * as robot from 'robotjs';

import { Bank, ScreenSize, Inventory } from '../../interfaces';

export class Herblore {

    bank: Bank = { x: 390, y: 220 };
    interations: number = 0;
    isRunning: boolean = false;
    screen: ScreenSize;

    initialize = () => {
        console.log('Initializing bot');
        this.setScreenSize();
        this.initializeMouse();
        this.initializeViewport();
    }

    main = () => {
        console.log("Starting bot");
        this.isRunning = true;
        this.interations = 0;
    
        while (this.isRunning) {
            this.openBank();
            this.bankItems();
            this.withdrawItems();
            this.closeBank();
            this.makeItems();
            this.increase();
            console.log(`Making brews: ${this.interations}`);
            this.antiban();
        }
    }

    run = () => {
        this.initialize();
        this.main();
    }

    increase = () => {
        this.interations ++;
    }

    getScreenSize = () => {
        return this.screen;
    }

    getScreenCenter = () => {
        return { x: this.screen.x / 2, y: this.screen.y / 2 };
    }

    setScreenSize = () => {
        this.screen = {
            x: 760,
            y: 520,
            height: robot.getScreenSize().height,
            width: robot.getScreenSize().width
        };

        console.log(`Screen Size: ${JSON.stringify(this.screen)}`);
    }

    initializeMouse = () => {
        robot.moveMouse(0, 30);
        this.sleep(2000);
        console.log('Mouse Initialized');
    }

    initializeViewport = () => {
        robot.moveMouseSmooth(560, 50);
        robot.mouseClick();
        this.sleep(2000);

        robot.moveMouseSmooth(this.getScreenCenter().x, this.getScreenCenter().y);
        robot.scrollMouse(0, 100);
        this.sleep(2000);
        
        console.log('Viewport Initialized');
    }

    resetViewport = () => {
        robot.moveMouseSmooth(560, 50);
        robot.mouseClick();
        this.sleep(2000);
    }

    openBank = () => {
        robot.moveMouseSmooth(this.bank.x, this.bank.y, this.interations === 0 ? 3 : 1);
        this.sleep(2000);
        robot.mouseClick();
        this.sleep(1000);
    }

    bankItems = () => {
        console.log('Banking items');
        robot.moveMouseSmooth(445, 340);
        robot.mouseClick();
        this.sleep(2000);
    }

    withdrawItems = () => {
        if (this.interations === 0) {
            // Potion Tab
            robot.moveMouseSmooth(240, 90);
            robot.mouseClick();
            this.sleep(3000);
        }

        // Withdraw 14 (Item 1 x 14)
        robot.moveMouseSmooth(425, 130);
        robot.mouseClick('right', false);
        this.sleep(1000);
        robot.moveMouseSmooth(425, 220);
        robot.mouseClick();

        this.sleep(3000);

        // Withdraw 14 (Item 2 x 14)
        robot.moveMouseSmooth(425, 160);
        robot.mouseClick('right', false);
        this.sleep(1000);
        robot.moveMouseSmooth(425, 250);
        robot.mouseClick();

        this.sleep(1000);
    }

    makeItems = () => {
        let item1: Inventory = { x: null, y: null, slot: null };
        let item2: Inventory = { x: null, y: null, slot: null };
        let sleep: number = this.getRandomInteger(1000, 2000);
        
        // Item 1
        item1 = this.getItem1();
        if (item1.x && item1.y) {
            robot.moveMouseSmooth(item1.x, item1.y);
            robot.mouseClick();
            this.sleep(sleep);
        }

        // Item 2
        item2 = this.getItem2();
        if (item2.x && item2.y) {
            robot.moveMouseSmooth(item2.x, item2.y);
            robot.mouseClick();
            sleep = this.getRandomInteger(1000, 2000);
            this.sleep(sleep);
        }

        // Make Items
        robot.moveMouseSmooth(258, 460);
        sleep = this.getRandomInteger(500, 1000);
        this.sleep(sleep);
        robot.mouseClick();
    }

    closeBank = () => {
        robot.moveMouseSmooth(485, 50);
        robot.mouseClick();
        this.sleep(1000);
    }

    getItem1 = () => {
        const inventory: Inventory[] = [
            { x: 705, y: 332, slot: 12 },
            { x: 578, y: 366, slot: 13 },
            { x: 620, y: 368, slot: 14 }
        ];
        let index: number = this.getRandomInteger(0, inventory.length - 1);
        let item: Inventory = inventory[index];
        console.log(`Item 1: ${JSON.stringify(item)}`);
        return item;
    }

    getItem2 = () => {
        const inventory: Inventory[] = [
            { x: 578, y: 406, slot: 17 }
        ];
        let index: number = this.getRandomInteger(0, inventory.length - 1);
        let item: Inventory = inventory[index];
        console.log(`Item 2: ${JSON.stringify(item)}`);
        return item;
    }

    antiban = () => {
        let tmpX: number = 0;
        let tmpY: number = 0;
        let sleep: number = 0;
        let int: number = this.getRandomInteger(1, 5);

        if (int === 4) {
            console.log('Re-rolling antiban!');
            int = this.getRandomInteger(3, 5);
        }

        console.log(`Antiban: #${int}`);

        switch(int) {
            case 1:
                tmpX = this.getRandomInteger(700, 1200);
                tmpY = this.getRandomInteger(500, 1000);
                console.log(`Moving mouse: x-${tmpX}, y-${tmpY}`);
                robot.moveMouseSmooth(-tmpX, -tmpY);
                sleep = this.getRandomInteger(17000, 25000);
                console.log(`Sleeping for ${sleep}`);
                this.sleep(sleep);
                break;
               
            case 2:
                tmpX = this.getRandomInteger(700, 1200);
                tmpY = this.getRandomInteger(500, 1000);
                console.log(`Moving mouse: x-${tmpX}, y-${tmpY}`);
                robot.moveMouseSmooth(-tmpX, -tmpY);
                sleep = this.getRandomInteger(17000, 25000);
                console.log(`Sleeping for ${sleep}`);
                this.sleep(sleep);
                break;

            case 3:
                console.log('Rotating camera');
                this.rotateCamera();
                sleep = this.getRandomInteger(17000, 25000);
                console.log(`Sleeping for ${sleep}`);
                this.sleep(sleep);
                console.log('Re-setting viewport');
                this.resetViewport();
                break;

            case 4:
                sleep = this.getRandomInteger(30000, 30000 * 6);
                console.log(`Sleeping for ${sleep}`);
                this.sleep(sleep);
                break;

            case 5:
                sleep = this.getRandomInteger(17000, 25000);
                console.log(`Sleeping for ${sleep}`);
                this.sleep(sleep);
                console.log('Continuing...');
                break;

                // check xp
                // check xp tab
                // right click random player
                // toggle run on and off
                // check friends online
                // add more here
                // world hop
        }
    }
    
    rotateCamera = () => {
        console.log("Rotating Camera");
        robot.keyToggle("right", "down");
        this.sleep(3000);
        robot.keyToggle("right", "up");
        this.sleep(3000);
    }
    
    sleep = (ms: number) => {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    }
    
    getRandomInteger = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

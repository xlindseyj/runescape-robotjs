import * as robot from 'robotjs';

import { Coordinates, ScreenSize } from '../interfaces';
import { UtilitiesService } from './utilities.service';

export class ClientService {

    isLoggingIn: boolean = false;
    isRunning: boolean = false;
    isSkillsTabOpen: boolean = false;
    isViewportChanged: boolean = false;
    screen: ScreenSize;

    constructor(private utils: UtilitiesService) {}

    clickBankBooth = (): void => {
        const coordinates: Coordinates = this.utils.getCoordinatesBetween(373, 191, 406, 245);
        robot.moveMouseSmooth(coordinates.x, coordinates.y);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(500, 1500));
    }

    clickMagicSpellsIcon = (): void => {
        const coordinates: Coordinates = this.utils.getCoordinatesBetween(729, 202, 754, 225);
        robot.moveMouseSmooth(coordinates.x, coordinates.y);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(300, 600));
    }

    clickInventoryIcon = (): void => {
        robot.moveMouseSmooth(645, 215);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(300, 600));
    }

    clickSkillsIcon = (): void => {
        robot.moveMouseSmooth(575, 215);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(300, 600));
    }

    clickPotionBankTab = (): void => {
        const coordinates: Coordinates = this.utils.getCoordinatesBetween(225, 72, 253, 103);
        robot.moveMouseSmooth(coordinates.x, coordinates.y);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(300, 600));
    }

    clickEquipementBankTab = (): void => {
        const coordinates: Coordinates = this.utils.getCoordinatesBetween(185, 74, 214, 101);
        robot.moveMouseSmooth(coordinates.x, coordinates.y);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(300, 600));
    }

    clickCompassIcon = (): void => {
        const coordinates: Coordinates = this.utils.getCoordinatesBetween(551, 39, 570, 58);
        robot.moveMouseSmooth(coordinates.x, coordinates.y);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(300, 600));
    }

    clickBrewAllButton = (): void => {
        const coordinates: Coordinates = this.utils.getCoordinatesBetween(215, 425, 305, 488);
        robot.moveMouseSmooth(coordinates.x, coordinates.y);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(300, 600));
    }

    closeBank = (): void => {
        robot.moveMouseSmooth(485, 50);
        robot.mouseClick();
        this.utils.sleep(1000);
    }

    initialize = (): void => {
        console.log('[INITIALIZING]');
        this.setScreenSize();
        this.initializeMouse();
        this.initializeViewport();
        console.log('[INITIALIZED SUCCESSFULLY]');
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
    }

    initializeMouse = () => {
        robot.moveMouse(0, 30);
        this.utils.sleep(this.utils.getRandomInteger(1000, 2000));
    }

    initializeViewport = () => {
        robot.moveMouseSmooth(560, 50);
        robot.mouseClick();
        this.utils.sleep(this.utils.getRandomInteger(1000, 2000));
        robot.moveMouseSmooth(this.getScreenCenter().x, this.getScreenCenter().y);
        robot.scrollMouse(0, 100);
        this.utils.sleep(this.utils.getRandomInteger(1000, 2000));
        console.log('[VIEWPORT]: Initialized');
    }

    openBank = () => {
        console.log('[OPENING BANK]');
        this.clickBankBooth();
    }

    resetViewport = () => {
        console.log('[VIEWPORT]: Reset');
        this.clickCompassIcon();
    }
}
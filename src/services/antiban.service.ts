import * as robot from 'robotjs';

import { AntibanOptions } from '../interfaces/antiban-options';
import { Coordinates } from '../interfaces';
import { ClientService } from './client.service';
import { UtilitiesService } from './utilities.service';

export class AntibanService {

    constructor (private client: ClientService, private utils: UtilitiesService) {}

    checkExperienceSkillsTab = (): void => {
        const coordinates: Coordinates = this.utils.getCoordinatesBetween(618, 304, 664, 324);
        robot.moveMouseSmooth(coordinates.x, coordinates.y);
        this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
    }

    checkExperienceToolbar = (): void => {
        const coordinates: Coordinates = this.utils.getCoordinatesBetween(397, 32, 513, 60);
        robot.moveMouseSmooth(coordinates.x, coordinates.y);
        this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
    }

    moveMouseOffScreen = (invert: boolean): void => {
        // make an array of constants (options) that link to their proper case switch
        let offScreenCoordinates: Coordinates = this.utils.getCoordinatesBetween(0, 30, this.client.screen.x + 300, this.client.screen.y + 300);
    
        if (invert) {
            robot.moveMouseSmooth(-offScreenCoordinates.x, offScreenCoordinates.y);
        } else {
            robot.moveMouseSmooth(offScreenCoordinates.x, -offScreenCoordinates.y);
        }
    }

    getAction = (): number => {
        return this.utils.getRandomInteger(1, this.modes.length - 1);
    }

    standardAntiban = (): void => {
        let int: number = this.getAction();

        if (int === 4) {
            console.log('[ANTIBAN]: Rerolling');
            int = this.utils.getRandomInteger(3, 5);
        }

        console.log(`[ANTIBAN]: #${int}`);

        switch(int) {
            case 1:
                this.moveMouseOffScreen(true);
                this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
            break;
               
            case 2:
                this.moveMouseOffScreen(false);
                this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
            break;

            case 3:
                this.rotateCamera();
                this.client.isViewportChanged = true;
                this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
            break;

            case 4:
                this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
            break;

            case 5:
                this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
            break;

            case 6:
                // check xp toolbar
                this.checkExperienceToolbar();
            break;

            case 7:
                // check xp tab
                this.client.isSkillsTabOpen = true;
                this.client.clickSkillsIcon();
                this.checkExperienceSkillsTab();
            break;

            case 8:
                // right click random player
                this.rightClickRandomCoordinates();
            break;

            case 9:
                // toggle run on and off
                this.checkExperienceToolbar();
            break;

            case 10:
                // check friends online
                this.checkExperienceToolbar();
            break;

            case 11:
                // toggle prayer on and off
                this.checkExperienceToolbar();
            break;

            case 12:
                // world hop
                this.worldHop();
            break;

            case 13:
                // timeout and log back in
                console.log('[LOGGING IN]');
                this.client.isLoggingIn = true;
                this.timeoutAndLogin();
            break;

            default:
                console.log('Error, please try again.');
            break;
        }
    }

    magicSkillAntiban = (mode?: number) => {

    }

    start = (options?: AntibanOptions) => {       
        if (options?.skill) {
            if (options.skill === 'magic') {
                this.magicSkillAntiban();
            }
        } else {
            this.standardAntiban();
        }
        
        if (this.client.isViewportChanged) {
            this.client.resetViewport();
            this.client.isViewportChanged = false;
        }

        console.log('[CONTINUE]');
    }

    rightClickRandomCoordinates = (): void => {
        this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
    }

    rotateCamera = (): void => {
        // case switch random rotations here
        // or make it dynamic when choosing coordinates and direction
        robot.keyToggle("right", "down");
        this.utils.sleep(this.utils.getRandomInteger(500, 1500));
        robot.keyToggle("right", "up");
    }

    timeoutAndLogin = (): void => {
        this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
    }

    worldHop = (w?: number): void => {
        let world: number = w ? w : 330;
        const worlds: number[] = [330, 331];
        if (world) {
            // hop to specified world
        } else {
            // hop to random world from array
            world = worlds[this.utils.getRandomInteger(0, worlds.length - 1)]
        }
        this.utils.sleep(this.utils.getRandomInteger(17000, 25000));
    }

    modes: any = [
        { MOUSE_OFF_SCREEN: this.moveMouseOffScreen },
        { CHECK_EXP_SKILL_TAB: this.checkExperienceSkillsTab }
    ];
}
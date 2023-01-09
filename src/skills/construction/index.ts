import * as robot from 'robotjs';

import { AntibanService } from '../../services/antiban.service';
import { ClientService } from '../../services/client.service';
import { UtilitiesService } from '../../services/utilities.service';

export class Construction {

    isRunning: boolean = false;
    interations: number = 0;
    
    constructor(private antiban: AntibanService, private client: ClientService, private utils: UtilitiesService) {}

    initialize = () => {
        this.client.initialize();
    }

    main = () => {
        console.log('[STARTING BOT]');
        this.isRunning = true;
        this.interations = 0;
    
        while (this.isRunning) {
            this.increase();
            this.performAntiban();
        }
    }

    run = () => {
        this.initialize();
        this.main();
    }

    increase = () => {
        this.interations ++;
        console.log(`[INVENTORY]: ${this.interations}`);
    }

    performAntiban = () => {}
}

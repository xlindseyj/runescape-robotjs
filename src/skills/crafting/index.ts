import * as readline from 'readline';

import { AntibanService } from '../../services/antiban.service';
import { ClientService } from '../../services/client.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Glassblowing } from './glassblowing';

export class Crafting {

    constructor(private antiban: AntibanService, private client: ClientService, private utils: UtilitiesService) {}

    choose = (): void => {
        let script = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
          
        script.question('\nEnter a number to start the script?\n[1 - Glassblowing], [2 - Charging Orbs]: ', (answer: string) => {
            const value: number = Number(answer);
            switch(value) {
                case 1:
                    console.log('[SKILL]: Crafting - Glassblowing');
                    const glassblowing = new Glassblowing(this.antiban, this.client, this.utils);
                    glassblowing.run();
                break;
        
                default:
                    console.log('Invalid choice, please try again.');
            }
            script.close();
        });
    }
}

import * as readline from 'readline';

import { AntibanService } from '../../services/antiban.service';
import { ClientService } from '../../services/client.service';
import { UtilitiesService } from '../../services/utilities.service';
import { HighAlch } from './high-alch';
import { StunAlch } from './stun-alch';

export class Magic {

    constructor(private antiban: AntibanService, private client: ClientService, private utils: UtilitiesService) {}

    choose = (): void => {
        let script = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
          
        script.question('\nEnter a number to start the script?\n[1 - High Alching], [2 - Stun Alching]: ', (answer: string) => {
            const value: number = Number(answer);
            switch(value) {
                case 1:
                    console.log('[SKILL]: Magic - High Alching');
                    const highAlch = new HighAlch(this.antiban, this.client, this.utils);
                    highAlch.run();
                break;

                case 2:
                    console.log('[SKILL]: Magic - Stun Alching');
                    const stunAlch = new StunAlch(this.antiban, this.client, this.utils);
                    stunAlch.run();
                break;
        
                default:
                    console.log('Invalid choice, please try again.');
            }
            script.close();
        });
    }
}

import * as readline from 'readline';

import { AntibanService } from "./services/antiban.service";
import { ClientService } from './services/client.service';
import { UtilitiesService } from "./services/utilities.service";
import { Construction } from './skills/construction';
import { Crafting } from './skills/crafting';
import { Herblore } from "./skills/herblore";
import { Magic } from './skills/magic';

const utils: UtilitiesService = new UtilitiesService();
const client: ClientService = new ClientService(utils);
const antiban: AntibanService = new AntibanService(client, utils);

let script = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
script.question('Enter a number to start the script?\n[1 - Herblore], [2 - Construction], [3 - Crafting], [4 - Magic]: ', (answer: string) => {
    const value: number = Number(answer);
    switch(value) {
        case 1:
            console.log('[SKILL]: Herblore');
            const herblore = new Herblore(antiban, client, utils);
            herblore.run();
        break;
        
        case 2:
            console.log('[SKILL]: Construction');
            const construction = new Construction(antiban, client, utils);
            construction.run();
        break;

        case 3:
            console.log('[SKILL]: Crafting');
            const crafting = new Crafting(antiban, client, utils);
            crafting.choose();
        break;

        case 4:
            console.log('[SKILL]: Magic');
            const magic = new Magic(antiban, client, utils);
            magic.choose();
        break;

        default:
            console.log('Invalid choice, please try again.');
    }
});

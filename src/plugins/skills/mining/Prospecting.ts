import {ActionType, RunePlugin} from "@server/plugins/plugin";
import {objectAction} from "@server/world/actor/player/action/object-action";
import {loopingAction} from "@server/world/actor/player/action/action";
import {getAllOreIds, getOreFromRock} from "@server/world/config/Ore";
import {itemIds} from "@server/world/config/item-ids";
import {soundIds} from "@server/world/config/sound-ids";
import {npcIds} from "@server/world/config/npc-ids";
import {World} from "@server/world/world";
import {cache} from "@server/game-server";

const action: objectAction = (details) => {
    details.player.sendMessage("You examine the rock for ores.")
    details.player.face(details.position);
    const ore = getOreFromRock(details.object.objectId);
    details.player.playSound(2661, 7, 0);

    setTimeout(() => {
        if(!ore) {
            details.player.sendMessage("There is current no ore available in this rock.")
            return;
        }
        const oreName = cache.itemDefinitions.get(ore.itemId).name.toLowerCase().replace(" ore", "");

        details.player.sendMessage(`This rock contains ${oreName}.`)
    }, World.TICK_LENGTH * 3);
};

export default new RunePlugin({
    type: ActionType.OBJECT_ACTION,
    options: ['prospect'],
    objectIds: getAllOreIds(),
    walkTo: true,
    action
});

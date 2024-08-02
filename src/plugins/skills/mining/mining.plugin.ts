import { ObjectInteractionAction, ObjectInteractionActionHook, TaskExecutor, objectInteractionActionHandler } from '@engine/action';
import { Skill } from '@engine/world/actor/skills';
import { canInitiateHarvest} from '@engine/world/skill-util/harvest-skill';
import { getAllOreIds, getOreFromRock } from '@engine/world/config/harvestable-object';
import { activeWorld } from '@engine/world';
import { randomBetween } from '@engine/util';
import { findItem } from '@engine/config';
import { soundIds } from '@engine/world/config';

const canActivate =  (task: TaskExecutor<ObjectInteractionAction>, taskIteration: number): boolean => {
    // Get the mining details for the target rock
    const { actor, actionData: { position, object, player } } = task;
    const ore = getOreFromRock(object.objectId);
    const tool = canInitiateHarvest(player, ore, Skill.MINING);

    if(!tool || !ore) {
        return false;
    }

    task.session.tool = tool;
    task.session.ore = ore;

    if(taskIteration === 0)
    {
        if(actor.isPlayer)
        {
            player.sendMessage('You swing your pickaxe at the rock.');
        }
        actor.face(position);
        actor.playAnimation(tool.animation);
    }

    return true;

};


const activate = (task: TaskExecutor<ObjectInteractionAction>, taskIteration: number): boolean =>
{
    const { actor, player, actionData, session } = task.getDetails();
    const { position: objectPosition, object: actionObject } = actionData;
    const ore = session.ore;
    const tool = session.tool;

    if(!tool || !ore)
    {
        return false;
    }

    const {object} = activeWorld.findObjectAtLocation(actor, actionObject.objectId, objectPosition);
    if(!object)
    {
        return false;
    }

    if(taskIteration % 3 === 0 && taskIteration !== 0)
    {
        const successChance = randomBetween(0, 255)

        const percentNeeded = ore.baseChance + tool.level + actor.skills.mining.level;

        if(successChance <= percentNeeded)
        {
            const targetName:string = findItem(ore.itemId).name.toLowerCase();
            if(actor.inventory.hasSpace())
            {
                const itemToAdd = ore.itemId;
                const roll = randomBetween(0, 256);

                //ToDo Handle gems
                if(roll === 1)
                {
                    //ToDo Add gem to inventory
                }

                player?.sendMessage(`You manage to mine some ${targetName}.`);
                actor.inventory.add(itemToAdd);

                player?.skills.mining.addExp(ore.experience);




                player?.playSound(soundIds.oreDepeleted);
                actor.instance.replaceGameObject(ore.objects.get(actionObject.objectId),
                        object, randomBetween(ore.respawnLow, ore.respawnHigh));
                return false;
            }
            else
            {
                player?.sendMessage(`You do not have enough space in your inventory.`);
                player?.playSound(soundIds.inventoryFull);
                return false;
            }

        }

    }
    else
    {
        if(taskIteration %1 === 0 && taskIteration !== 0)
        {
            player?.playSound(soundIds.pickaxeSwing)
        }


    }

    if(taskIteration % 3 === 0 && taskIteration !== 0) {
        actor.playAnimation(tool.animation);
    }

    return true;

}

const onComplete = (task: TaskExecutor<ObjectInteractionAction>): void => {
    task.actor.stopAnimation();
};

export default {
    pluginId: 'rs:mining',
    hooks: [
        {
            type: 'object_interaction',
            options: ['mine'],
            objectIds: getAllOreIds(),
            strength: 'normal',
            task: {
                canActivate,
                activate,
                onComplete,
                interval: 1
            }
        } as ObjectInteractionActionHook
    ]
};

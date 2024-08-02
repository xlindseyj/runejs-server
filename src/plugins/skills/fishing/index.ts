import {
    ObjectInteractionActionHook,
} from '@engine/action';
import { getFishIds } from '@engine/world/config/harvestable-object';
import { runFishingTask } from './fishing-task';

/**
 * Fishing plugin
 *
 * This uses the task system to schedule actions.
 */
export default {
    pluginId: 'rs:fishing',
    hooks: [
        /**
         * "Catch" object interaction hook.
         */
        {
            type: 'object_interaction',
            options: ['catch'],
            objectIds: getFishIds(),
            handler: ({ player, object }) => {
                runFishingTask(player, object);
            }
        } as ObjectInteractionActionHook
    ]
};

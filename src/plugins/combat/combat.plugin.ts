import { npcInteractionActionHandler } from "@engine/action";

const attackAction: npcInteractionActionHandler = (details) => {
  const { player, npc } = details;
  player.face(npc);
  console.log("Test")
  //start the combat handler

}

export default {
    pluginId: "rs:combat",
    hooks: [
        {
            type: "npc_interaction",
            npcs: ["rs:goblin"],
            options: "attack",
            walkTo: true,
            handler: attackAction,
        }
    ]
}

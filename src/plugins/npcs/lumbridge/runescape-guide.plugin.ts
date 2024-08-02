import { npcInteractionActionHandler } from "@engine/action";
import { dialogue, Emote, execute } from "@engine/world/actor/dialogue";
import { widgets } from "@engine/config/config-handler";

const talkToAction: npcInteractionActionHandler = (details) => {
  const { player, npc } = details;
  dialogue(
    [player, { npc, key: "runescape_guide" }],
    [
      runescape_guide => [
        Emote.HAPPY,
        `Hello, I'm the Runescape Guide. I can help you with anything you need.`,
      ],
      options => [
        `What is Runescape?`,
        [
          player => [Emote.HAPPY, `What is Runescape?`],
          runescape_guide=> [
            Emote.HAPPY,
            `Runescape is a free-to-play MMORPG. You can play it on your computer, tablet, or phone.`,
          ],
          runescape_guide => [
            Emote.HAPPY,
            `You can play it with your friends, or by yourself. You can even play it on the go!`,
          ],
          runescape_guide => [
            Emote.HAPPY,
            `You can do almost anything you want in Runescape. You can fight monsters, trade with other players, or even build your own house.`,
          ],
          runescape_guide => [
            Emote.HAPPY,
            `There are many different skills you can train, and many different ways to train them.`,
          ],
          runescape_guide => [
            Emote.HAPPY,
            `You can even play Runescape on your phone!`,
          ],
        ],
        'Bye',
        [
          player => [Emote.HAPPY, `Bye.`],
        ]
      ],
    ]
  );
};

export default {
  pluginId: "rs:runescape_guide",
  hooks: [
    {
      type: "npc_interaction",
      npcs: "rs:runescape_guide",
      options: "talk-to",
      walkTo: true,
      handler: talkToAction,
    },
  ],
};

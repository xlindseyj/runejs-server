import { findObject } from '@engine/config';
import { randomChoice, randomBetween } from './chance';
import { Player } from '@engine/world/actor';
import { LandscapeObject } from '@runejs/filestore';
import { logger } from '@runejs/common';

class FishingTask {
    public SalmonOrTrout: number[] = [335, 335, 335, 331];
    public ShrimpsOrAnchovies: number[] = [317, 321];
    public SardineOrHerring: number[] = [327, 345];
    public TunaOrSwordfish: number[] = [359, 359, 359, 371];
    public BigNet: number[] = [405, 407, 353, 401, 1061, 1059];
    public BigNetAndCod: number[] = [405, 407, 353, 401, 1061, 1059, 341];
    public BigNetAndBass: number[] = [405, 407, 353, 401, 1061, 1059, 341, 363];

    public WhatFish: number = -1;
    public isFishing: boolean = false;
    public FishTimer: number = -1;
    public EmoteTimer: number = -1;
    public FirstAnim: boolean = false;
    public Fish: number = -1;
    public NPCX: number = -1;
    public NPCY: number = -1;

    constructor(private server: any) {}

    private NoSpace(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        c.sM("You can't carry any more fish.");
        this.FishTimer = -1;
        this.EmoteTimer = -1;
        c.resetAnimation();
        this.isFishing = false;
    }

    private resetAll(c: any): void {
        this.FishTimer = -1;
        this.EmoteTimer = -1;
        this.Fish = -1;
        this.isFishing = false;
        this.FirstAnim = false;
        c.resetAnimation();
        c.RemoveAllWindows();
    }

    private ResetFishing(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        this.FishTimer = -1;
        this.EmoteTimer = -1;
        this.isFishing = false;
        c.resetAnimation();
        this.FirstAnim = false;
    }

    private FishEmote(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        switch (this.Fish) {
            case 1: 
            case 4:
                c.startAnimation(621);
                break;
            case 5: 
            case 6:
            case 7:
            case 2:
            case 3:
                if (this.FirstAnim) {
                    c.startAnimation(623);
                } else {
                    c.startAnimation(622);
                    this.FirstAnim = true;
                }
                break;
            case 8: 
            case 10:
            case 14:
                c.startAnimation(618);
                break;
            case 9: 
                c.startAnimation(619);
                break;
            case 13: 
            case 11:
            case 12:
                c.startAnimation(620);
                break;
        }
    }

    public CatchShark(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(20, 60) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 14;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchBigNetAndCod(ID: number): void {
        this.WhatFish = randomChoice(this.BigNetAndCod);
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 40) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 13;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchBigNetAndBass(ID: number): void {
        this.WhatFish = randomChoice(this.BigNetAndBass);
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 40) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 12;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchBigNet(ID: number): void {
        this.WhatFish = randomChoice(this.BigNet);
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 40) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 11;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchTunaAndSwordfish(ID: number): void {
        this.WhatFish = randomChoice(this.TunaOrSwordfish);
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(15, 55) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 10;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchTuna(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 25) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 8;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchLobster(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(15, 40) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 9;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchSardineAndHerring(ID: number): void {
        this.WhatFish = randomChoice(this.SardineOrHerring);
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 20) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 3;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchSardine(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 20) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 2;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchPike(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 20) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 6;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchShrimps(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 20) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 1;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchShrimpsAndAnchovies(ID: number): void {
        this.WhatFish = randomChoice(this.ShrimpsOrAnchovies);
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 20) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 4;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchTrout(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 20) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 5;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public CatchSalmonAndTrout(ID: number): void {
        this.WhatFish = randomChoice(this.SalmonOrTrout);
        const c = this.server.playerHandler.players[ID];
        if (c.freeSlots() > 0) {
            this.resetAll(c);
            this.isFishing = true;
            this.FishTimer = randomBetween(10, 20) - Math.floor(c.playerLevel[10] / 9);
            this.Fish = 7;
            this.FishEmote(ID);
            this.EmoteTimer = 6;
        } else {
            this.NoSpace(ID);
        }
    }

    public FirstFish(NPCID: number, ID: number): void {
        const c = this.server.playerHandler.players[ID];
        switch (NPCID) {
            case 313: // Big net fishing
                if (c.playerLevel[10] >= 16 && 22 <= c.playerLevel[10]) {
                    if (c.playerHasItem(305)) {
                        this.CatchBigNet(ID);
                        c.sM("You cast out your net...");
                    } else {
                        c.sM("You need big fishing net to fish here.");
                    }
                } else if (c.playerLevel[10] >= 23 && 45 <= c.playerLevel[10]) {
                    if (c.playerHasItem(305)) {
                        this.CatchBigNetAndCod(ID);
                        c.sM("You cast out your net...");
                    } else {
                        c.sM("You need big fishing net to fish here.");
                    }
                } else if (c.playerLevel[10] >= 46) {
                    if (c.playerHasItem(305)) {
                        this.CatchBigNetAndBass(ID);
                        c.sM("You cast out your net...");
                    } else {
                        c.sM("You need big fishing net to fish here.");
                    }
                } else if (c.playerLevel[10] <= 15) {
                    c.sM("You need at least level 16 fishing to catch here.");
                }
                c.TurnPlayerTo(this.NPCX, this.NPCY);
                break;
            case 309: // Trout or Salmon
                if (c.playerLevel[10] >= 20 && 30 >= c.playerLevel[10]) {
                    if (c.playerHasItem(309)) {
                        if (c.playerHasItem(314)) {
                            this.CatchTrout(ID);
                            c.sM("You attempt to catch a fish.");
                        } else {
                            c.sM("You need feather to fish here.");
                        }
                    } else {
                        c.sM("You need fly fishing rod to fish here.");
                    }
                } else if (c.playerLevel[10] >= 30) {
                    if (c.playerHasItem(309)) {
                        if (c.playerHasItem(314)) {
                            this.CatchSalmonAndTrout(ID);
                            c.sM("You attempt to catch a fish.");
                        } else {
                            c.sM("You need feather to fish here.");
                        }
                    } else {
                        c.sM("You need fly fishing rod to fish here.");
                    }
                } else if (c.playerLevel[10] <= 19) {
                    c.sM("You need at least level 20 fishing to catch trout.");
                }
                c.TurnPlayerTo(this.NPCX, this.NPCY);
                break;

            case 235: // Shrimps or Anchovies
            case 316:
                if (c.playerLevel[10] <= 14) {
                    if (c.playerHasItem(303)) {
                        this.CatchShrimps(ID);
                        c.sM("You cast out your net...");
                    } else {
                        c.sM("You need small fishing net to fish here.");
                    }
                } else {
                    if (c.playerHasItem(303)) {
                        this.CatchShrimpsAndAnchovies(ID);
                        c.sM("You cast out your net...");
                    } else {
                        c.sM("You need small fishing net to fish here.");
                    }
                }
                c.TurnPlayerTo(this.NPCX, this.NPCY);
                break;
            case 312: // Lobster
                if (c.playerLevel[10] >= 40) {
                    if (c.playerHasItem(301)) {
                        this.CatchLobster(ID);
                        c.sM("You attempt to catch a lobster.");
                    } else {
                        c.sM("You need lobster pot to fish here.");
                    }
                } else {
                    c.sM("You need at least level 40 fishing to catch lobster.");
                }
                c.TurnPlayerTo(this.NPCX, this.NPCY);
                break;
        }
    }

    public SecondFish(NPCID: number, ID: number): void {
        const c = this.server.playerHandler.players[ID];
        switch (NPCID) {
            case 313: // Shark
                if (c.playerLevel[10] >= 76) {
                    if (c.playerHasItem(311)) {
                        this.CatchShark(ID);
                        c.sM("You attempt to catch a shark or manta ray.");
                    } else {
                        c.sM("You need harpoon to fish here.");
                    }
                } else {
                    c.sM("You need at least level 76 fishing to catch shark.");
                }
                c.TurnPlayerTo(this.NPCX, this.NPCY);
                break;
            case 309: // Pike
                if (c.playerLevel[10] >= 25) {
                    if (c.playerHasItem(307)) {
                        if (c.playerHasItem(313)) {
                            this.CatchPike(ID);
                            c.sM("You attempt to catch a fish.");
                        } else {
                            c.sM("You need fishing bait to fish here.");
                        }
                    } else {
                        c.sM("You need fishing rod to fish here.");
                    }
                } else {
                    c.sM("You need at least level 25 fishing to catch pike.");
                }
                c.TurnPlayerTo(this.NPCX, this.NPCY);
                break;
            case 316: // Sardine or Herring
                if (c.playerLevel[10] >= 5 && 9 >= c.playerLevel[10]) {
                    if (c.playerHasItem(307)) {
                        if (c.playerHasItem(313)) {
                            this.CatchSardine(ID);
                            c.sM("You attempt to catch a fish.");
                        } else {
                            c.sM("You need fishing bait to fish here.");
                        }
                    } else {
                        c.sM("You need fishing rod to fish here.");
                    }
                } else if (c.playerLevel[10] >= 10) {
                    if (c.playerHasItem(307)) {
                        if (c.playerHasItem(313)) {
                            this.CatchSardineAndHerring(ID);
                            c.sM("You attempt to catch a fish.");
                        } else {
                            c.sM("You need fishing bait to fish here.");
                        }
                    } else {
                        c.sM("You need fishing rod to fish here.");
                    }
                } else if (c.playerLevel[10] <= 4) {
                    c.sM("You need at least level 5 fishing to catch sardine.");
                }
                c.TurnPlayerTo(this.NPCX, this.NPCY);
                break;
            case 312: // Tuna or Swordfish
                if (c.playerLevel[10] <= 49 && 35 <= c.playerLevel[10]) {
                    if (c.playerHasItem(311)) {
                        this.CatchTuna(ID);
                        c.sM("You attempt to catch a fish.");
                    } else {
                        c.sM("You need harpoon to fish here.");
                    }
                } else if (c.playerLevel[10] >= 50) {
                    if (c.playerHasItem(311)) {
                        this.CatchTunaAndSwordfish(ID);
                        c.sM("You attempt to catch a fish.");
                    } else {
                        c.sM("You need harpoon to fish here.");
                    }
                } else if (c.playerLevel[10] <= 34) {
                    c.sM("You need at least level 35 fishing to catch tuna.");
                }
                c.TurnPlayerTo(this.NPCX, this.NPCY);
                break;
        }
    }

    public Fishing(ID: number): void {
        const c = this.server.playerHandler.players[ID];
        switch (this.Fish) {
            case 1: // Shrimp
                c.addItem(317, 1);
                c.addSkillXP(50, 10);
                c.sM("You catch some shrimps.");
                this.CatchShrimps(ID);
                break;
            case 2: // Sardine
                c.addItem(327, 1);
                c.addSkillXP(75, 10);
                c.deleteItem(313, c.getItemSlot(313), 1);
                c.sM("You catch a sardine.");
                this.CatchSardine(ID);
                break;
            case 3: // Sardine or Herring
                if (this.WhatFish === 327) {
                    c.addItem(327, 1);
                    c.addSkillXP(75, 10);
                    c.deleteItem(313, c.getItemSlot(313), 1);
                    c.sM("You catch a sardine.");
                } else {
                    c.addItem(345, 1);
                    c.addSkillXP(100, 10);
                    c.deleteItem(313, c.getItemSlot(313), 1);
                    c.sM("You catch a herring.");
                }
                this.CatchSardineAndHerring(ID);
                break;
            case 4: // Shrimp or Anchovies
                if (this.WhatFish === 317) {
                    c.addItem(317, 1);
                    c.addSkillXP(50, 10);
                    c.sM("You catch some shrimps.");
                } else {
                    c.addItem(321, 1);
                    c.addSkillXP(75, 10);
                    c.sM("You catch some anchovies.");
                }
                this.CatchShrimpsAndAnchovies(ID);
                break;
            case 5: // Trout
                c.addItem(335, 1);
                c.addSkillXP(150, 10);
                c.deleteItem(314, c.getItemSlot(314), 1);
                c.sM("You catch a trout.");
                this.CatchTrout(ID);
                break;
            case 6: // Pike
                c.addItem(349, 1);
                c.addSkillXP(250, 10);
                c.deleteItem(313, c.getItemSlot(313), 1);
                c.sM("You catch a pike.");
                this.CatchPike(ID);
                break;
            case 7: // Trout or Salmon
                if (this.WhatFish === 335) {
                    c.addItem(335, 1);
                    c.addSkillXP(333, 10);
                    c.deleteItem(314, c.getItemSlot(314), 1);
                    c.sM("You catch a trout.");
                } else {
                    c.addItem(331, 1);
                    c.addSkillXP(350, 10);
                    c.deleteItem(314, c.getItemSlot(314), 1);
                    c.sM("You catch a salmon.");
                }
                this.CatchSalmonAndTrout(ID);
                break;
            case 8: // Tuna
                c.addItem(359, 1);
                c.addSkillXP(500, 10);
                c.sM("You catch a tuna.");
                this.CatchTuna(ID);
                break;
            case 9: // Lobster
                c.addItem(377, 1);
                c.addSkillXP(750, 10);
                c.sM("You catch a lobster.");
                this.CatchLobster(ID);
                break;
            case 10: // Tuna or Swordfish
                if (this.WhatFish === 359) {
                    c.addItem(359, 1);
                    c.addSkillXP(500, 10);
                    c.sM("You catch a tuna.");
                } else {
                    c.addItem(371, 1);
                    c.addSkillXP(1250, 10);
                    c.sM("You catch a swordfish.");
                }
                this.CatchTunaAndSwordfish(ID);
                break;
            case 11: // Big net
                if (this.WhatFish === 405) {
                    c.addItem(405, 1);
                    c.addSkillXP(30, 10);
                    c.sM("You catch a casket.");
                } else if (this.WhatFish === 407) {
                    c.addItem(407, 1);
                    c.addSkillXP(30, 10);
                    c.sM("You catch an oyster.");
                } else if (this.WhatFish === 353) {
                    c.addItem(353, 1);
                    c.addSkillXP(50, 10);
                    c.sM("You catch a mackerel.");
                } else if (this.WhatFish === 401) {
                    c.addItem(401, 1);
                    c.addSkillXP(3, 10);
                    c.sM("You catch seaweed.");
                } else if (this.WhatFish === 1061) {
                    c.addItem(1061, 1);
                    c.addSkillXP(3, 10);
                    c.sM("You catch leather boots.");
                } else if (this.WhatFish === 1059) {
                    c.addItem(1059, 1);
                    c.addSkillXP(3, 10);
                    c.sM("You catch leather gloves.");
                }
                this.CatchBigNet(ID);
                break;
            case 12: // Big net and bass
                if (this.WhatFish === 405) {
                    c.addItem(405, 1);
                    c.addSkillXP(30, 10);
                    c.sM("You catch a casket.");
                } else if (this.WhatFish === 407) {
                    c.addItem(407, 1);
                    c.addSkillXP(30, 10);
                    c.sM("You catch an oyster.");
                } else if (this.WhatFish === 353) {
                    c.addItem(353, 1);
                    c.addSkillXP(50, 10);
                    c.sM("You catch a mackerel.");
                } else if (this.WhatFish === 401) {
                    c.addItem(401, 1);
                    c.addSkillXP(3, 10);
                    c.sM("You catch seaweed.");
                } else if (this.WhatFish === 1061) {
                    c.addItem(1061, 1);
                    c.addSkillXP(3, 10);
                    c.sM("You catch leather boots.");
                } else if (this.WhatFish === 1059) {
                    c.addItem(1059, 1);
                    c.addSkillXP(3, 10);
                    c.sM("You catch leather gloves.");
                } else if (this.WhatFish === 341) {
                    c.addItem(341, 1);
                    c.addSkillXP(244, 10);
                    c.sM("You catch a cod.");
                } else if (this.WhatFish === 363) {
                    c.addItem(363, 1);
                    c.addSkillXP(300, 10);
                    c.sM("You catch a bass.");
                }
                this.CatchBigNetAndBass(ID);
                break;
            case 13: // Big net and cod
                if (this.WhatFish === 405) {
                    c.addItem(405, 1);
                    c.addSkillXP(30, 10);
                    c.sM("You catch a casket.");
                } else if (this.WhatFish === 407) {
                    c.addItem(407, 1);
                    c.addSkillXP(30, 10);
                    c.sM("You catch an oyster.");
                } else if (this.WhatFish === 353) {
                    c.addItem(353, 1);
                    c.addSkillXP(50, 10);
                    c.sM("You catch a mackerel.");
                } else if (this.WhatFish === 401) {
                    c.addItem(401, 1);
                    c.addSkillXP(3, 10);
                    c.sM("You catch seaweed.");
                } else if (this.WhatFish === 1061) {
                    c.addItem(1061, 1);
                    c.addSkillXP(3, 10);
                    c.sM("You catch leather boots.");
                } else if (this.WhatFish === 1059) {
                    c.addItem(1059, 1);
                    c.addSkillXP(3, 10);
                    c.sM("You catch leather gloves.");
                } else if (this.WhatFish === 341) {
                    c.addItem(341, 1);
                    c.addSkillXP(244, 10);
                    c.sM("You catch a cod.");
                }
                this.CatchBigNetAndCod(ID);
                break;
            case 14: // Shark or Manta Ray
                const whichFish = randomBetween(0, 20);
                if (whichFish <= 14) {
                    c.addItem(383, 1);
                    c.addSkillXP(2500, 10);
                    c.sM("You catch a shark.");
                } else {
                    c.addItem(389, 1);
                    c.addSkillXP(3000, 10);
                    c.sM("You catch a manta ray.");
                }
                this.CatchShark(ID);
                break;
        }
    }
}

export function runFishingTask(player: Player, landscapeObject: LandscapeObject): void {
    const objectConfig = findObject(landscapeObject.objectId);

    if (!objectConfig) {
        logger.warn(`Player ${player.username} attempted to run a fishing task on an invalid object (id: ${landscapeObject.objectId})`);
        return;
    }

    const sizeX = objectConfig.rendering.sizeX;
    const sizeY = objectConfig.rendering.sizeY;

    player.enqueueTask(FishingTask, [landscapeObject, sizeX, sizeY]);
}

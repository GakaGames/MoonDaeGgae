/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, "init", [320, 240, {
            width: 0,
            height: 0
        }]);

        // Prepare skillsets
        // rof: delay per frame, in ms.
        this.skills = [
            {
                anim: [ "punch1", "punch2", "punch3", "punch4", "punch5" ],
                is_anim_2d: false,
                aud_func: function(self, stack_cnt) {
                    me.audio.play("punch_1");
                },
                rofs: [75, 56, 37]
            },
            {
                anim: ["hammer2", "hammer1"],
                is_anim_2d: false,
                aud_func: function(self, stack_cnt) {
                    self.play_random_sound(["hammer_0", "hammer_1"]);
                },
                rofs: [150, 112, 75]
            },
            {
                anim: [
                    ["jjoint1", "jjoint2", "jjoint3"],
                    ["jjoint4", "jjoint2", "jjoint3"],
                    ["jjoint4", "jjoint2", "jjoint3"]
                ],
                is_anim_2d: true,
                aud_func: function(self, stack_cnt) {
                    self.play_random_sound(["kick_0", "punch_1"]);
                    self.play_random_sound(["mb_daa", "mb_ya", "mb_maja"]);
                },
                rofs: [112, 84, 56]
            },
            {
                anim: ["sledge1", "sledge2"],
                is_anim_2d: false,
                aud_func: function(self, stack_cnt) {
                    me.audio.play("bond");
                },
                rofs: [150, 112, 75]
            },
            {
                anim: ["kim1", "kim2", "kim3", "kim4", "kim5", "kim6", "kim7", "kim8"],
                is_anim_2d: false,
                aud_func: function(self, stack_cnt) {
                    me.audio.play("slap");
                },
                rofs: [50, 37, 25]
            },
            {
                anim: ["kick2_1", "kick2_2", "kick2_3", "kick2_4", "kick2_5", "kick2_6", "kick2_7", "kick2_8", "kick2_9", "kick2_9"],
                is_anim_2d: false,
                aud_func: function(self, stack_cnt) {
                    me.audio.play("ddok");
                    me.audio.play("punch_1");
                },
                rofs: [60, 45, 30]
            }
        ];

        // Create animations from skills and set a renderable
        var all_frames = ["blank"];
        for (var i = 0 ; i < this.skills.length ; i++ ) {
            var skill = this.skills[i];
            if (!skill.is_anim_2d) {
                all_frames = all_frames.concat(skill.anim);
            }
            else {
                for (var j = 0 ; j < skill.anim.length ; j++) {
                    all_frames = all_frames.concat(skill.anim[j]);
                }
            }
        }
        this.renderable = game.texture.createAnimationFromName(all_frames);

         // define animations
        this.renderable.addAnimation("stand", [{ name: "punch1", delay: Infinity }]);
        for (var i = 0 ; i < this.skills.length ; i++ ) {
            this.add_anims(this.skills[i]);
        }

        // Properties
        this.anchorPoint.set(0.5, 1.0);
        this.alwaysUpdate = true;

        // Key bindings
        me.input.bindKey(me.input.KEY.Q, "q");
        me.input.bindKey(me.input.KEY.W, "w");
        me.input.bindKey(me.input.KEY.E, "e");
        me.input.bindKey(me.input.KEY.NUM1, "1");
        me.input.bindKey(me.input.KEY.NUM2, "2");
        me.input.bindKey(me.input.KEY.NUM3, "3");
        me.input.bindKey(me.input.KEY.I, "1");
        me.input.bindKey(me.input.KEY.O, "2");
        me.input.bindKey(me.input.KEY.P, "3");

        // initial state
        this.renderable.setCurrentAnimation("stand");
        this.next_anim = "stand";

        this.is_anim_playing = false;
        this.prev_skill = -1;
    },

    play_random_sound: function(sounds) {
        var idx = me.Math.random(0, sounds.length);
        me.audio.play(sounds[idx]);
    },

    add_anims: function(skill) {
        for (var st = 0 ; st < 3 ; st++ ) {
            var stack_name = skill.anim + st;
            var anims = []
            for (var i = 0 ; i < skill.anim.length ; i++ ) {
                if (skill.is_anim_2d) {
                    anims.push({
                        name: skill.anim[st][i],
                        delay: skill.rofs[st]
                    });
                }
                else {
                    anims.push({
                        name: skill.anim[i],
                        delay: skill.rofs[st]
                    });
                }
            }
            this.renderable.addAnimation(stack_name, anims);
        }

        if (!skill.is_anim_2d) {
            this.renderable.addAnimation(skill.anim[0] + "_end", [
                { name: skill.anim[0], delay: Infinity }
            ]);
        }
        else {
            this.renderable.addAnimation(skill.anim[0][0] + "_end", [
                { name: skill.anim[0][0], delay: Infinity }
            ]);
            this.renderable.addAnimation(skill.anim[1][0] + "_end", [
                { name: skill.anim[1][0], delay: Infinity }
            ]);
            this.renderable.addAnimation(skill.anim[2][0] + "_end", [
                { name: skill.anim[2][0], delay: Infinity }
            ]);
        }
    },

    /**
     * update the entity
     */
    update : function (dt) {
        var sk = -1;
        if (me.input.isKeyPressed("q")) { sk = 0; }
        else if (me.input.isKeyPressed("w")) { sk = 1; }
        else if (me.input.isKeyPressed("e")) { sk = 2; }
        else if (me.input.isKeyPressed("1")) { sk = 3; }
        else if (me.input.isKeyPressed("2")) { sk = 4; }
        else if (me.input.isKeyPressed("3")) { sk = 5; }

        // Gattling stuff
        if (sk == -1) { // no key press
            if (game.data.gattling > 0) {
                game.data.gattling -= 4;
                if (game.data.gattling < 0)
                    game.data.gattling = 0;
            }
        }
        else {
            //if (this.prev_skill != sk) {
            //    game.data.gattling = 0;
            //}
            //else {
                if (game.data.gattling < game.data.gattling_max)
                    game.data.gattling++;
            //}
            this.prev_skill = sk;
        }

        // Skill stuff
        if (sk >= 0 && (!this.is_anim_playing)) {
            var skill = this.skills[sk];
            var gattling_stack = 0;
            if (game.data.gattling == game.data.gattling_max)
                gattling_stack = 2;
            else if (game.data.gattling >= game.data.gattling_mid)
                gattling_stack = 1;

            this.is_anim_playing = true;
            if (!skill.is_anim_2d)
                this.next_anim = skill.anim[0] + "_end";
            else
                this.next_anim = skill.anim[gattling_stack][0] + "_end";
            skill.aud_func(this, gattling_stack);
            this.renderable.setCurrentAnimation(
                skill.anim + gattling_stack,
                (function() {
                    this.is_anim_playing = false;
                    this.renderable.setCurrentAnimation(this.next_anim);
                    game.data.score++;
                    return false;
                }).bind(this)
            );
        }

        return this._super(me.Entity, 'update', [dt]);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});

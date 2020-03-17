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
                aud_func: function(self, stack_cnt) {
                    me.audio.play("punch_1");
                },
                rofs: [50, 37, 25]
            },
            {
                anim: ["hammer1", "hammer2"],
                aud_func: function(self, stack_cnt) {
                    self.play_random_sound("hammer_", 2);
                },
                rofs: [150, 112, 75]
            },
            {
                anim: ["dori01", "dori02", "dori03", "dori04", "dori05", "dori06", "dori07"],
                aud_func: function(self, stack_cnt) {
                    me.audio.play("ironbat");
                },
                rofs: [30, 22, 15]
            },
            {
                anim: ["sledge1", "sledge2"],
                aud_func: function(self, stack_cnt) {
                    me.audio.play("bond");
                },
                rofs: [150, 112, 75]
            },
            {
                anim: ["kim1", "kim2", "kim3", "kim4", "kim5", "kim6", "kim7", "kim8"],
                aud_func: function(self, stack_cnt) {
                    me.audio.play("slap");
                },
                rofs: [30, 22, 15]
            },
            {
                anim: ["kick2_1", "kick2_2", "kick2_3", "kick2_4", "kick2_5", "kick2_6", "kick2_7", "kick2_8", "kick2_9"],
                aud_func: function(self, stack_cnt) {
                    me.audio.play("ddok");
                    me.audio.play("punch_1");
                },
                rofs: [30, 22, 15]
            }
        ];

        // Create animations from skills and set a renderable
        var all_frames = ["blank"];
        for (var i = 0 ; i < this.skills.length ; i++ ) {
            all_frames = all_frames.concat(this.skills[i].anim);
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
        this.gattling_count = 0;
        this.gattling_stack = 0;
    },

    play_random_sound: function(prefix, cnt) {
        var fname = prefix + me.Math.random(0, cnt);
        me.audio.play(fname);
    },

    add_anims: function(skill) {
        for (var st = 0 ; st < 3 ; st++ ) {
            var stack_name = skill.anim + st;
            var anims = []
            for (var i = 0 ; i < skill.anim.length ; i++ ) {
                anims.push({
                    name: skill.anim[i],
                    delay: skill.rofs[st]
                });
            }
            this.renderable.addAnimation(stack_name, anims);
        }
        this.renderable.addAnimation(skill.anim + "_end", [
            { name: skill.anim[0], delay: Infinity }
        ]);
    },

    /**
     * update the entity
     */
    update : function (dt) {
        if (!this.is_anim_playing) {
            var sk = -1;
            if (me.input.isKeyPressed("q")) { sk = 0; }
            else if (me.input.isKeyPressed("w")) { sk = 1; }
            else if (me.input.isKeyPressed("e")) { sk = 2; }
            else if (me.input.isKeyPressed("1")) { sk = 3; }
            else if (me.input.isKeyPressed("2")) { sk = 4; }
            else if (me.input.isKeyPressed("3")) { sk = 5; }

            if (sk >= 0) {
                var skill = this.skills[sk];
                this.is_anim_playing = true;
                skill.aud_func(this, this.gattling_stack);
                this.renderable.setCurrentAnimation(
                    skill.anim + this.gattling_stack,
                    (function() {
                        console.log(this);
                        this.is_anim_playing = false;
                        this.renderable.setCurrentAnimation(this.next_anim);
                        return false;
                    }).bind(this)
                );
                this.next_anim = skill.anim + "_end";
                this.counter = Math.floor(skill.rofs[this.gattling_stack] * skill.anim.length / 10);
                this.prev_skill = sk;

                game.data.score++;

                if (this.prev_skill == skill) {
                    this.gattling_count++;
                    if (this.gattling_count >= 10) {
                        this.gattling_stack++;
                        this.gattling_count = 0;
                    }
                }
                else {
                    this.gattling_stack = 0;
                    this.gattling_count = 0;
                }
            }
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

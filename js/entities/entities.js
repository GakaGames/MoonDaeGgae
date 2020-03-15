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

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "punch1", "punch2", "punch3", "punch4", "punch5",
            "hammer1", "hammer2",
            "sledge1", "sledge2",
            "dori01", "dori02", "dori03", "dori04", "dori05",
            "dori06", "dori07",
            "kim1", "kim2", "kim3", "kim4", "kim5",
            "kim6", "kim7", "kim8",
            "kick2_1", "kick2_2", "kick2_3", "kick2_4", "kick2_5",
            "kick2_6", "kick2_7", "kick2_8", "kick2_9",
            "blank"
        ]);

        // define animations
        this.renderable.addAnimation("stand", [0]);
        this.next_anim = "stand";

        this.renderable.addAnimation("punch_stomach", [
            { name: "punch1", delay: 50 },
            { name: "punch2", delay: 50 },
            { name: "punch3", delay: 50 },
            { name: "punch4", delay: 50 },
            { name: "punch5", delay: Infinity }
        ]);
        this.renderable.addAnimation("punch_stomach_end", [
            { name: "punch1", delay: Infinity }
        ]);

        this.renderable.addAnimation("hammer", [
            { name: "hammer1", delay: 150 },
            { name: "hammer2", delay: Infinity }
        ]);
        this.renderable.addAnimation("hammer_end", [
            { name: "hammer2", delay: Infinity }
        ]);

        this.renderable.addAnimation("sledge", [
            { name: "sledge1", delay: 150 },
            { name: "sledge2", delay: Infinity }
        ]);
        this.renderable.addAnimation("sledge_end", [
            { name: "sledge1", delay: Infinity }
        ]);
 
        this.renderable.addAnimation("dori", [
            { name: "dori01", delay: 30 },
            { name: "dori02", delay: 30 },
            { name: "dori03", delay: 30 },
            { name: "dori04", delay: 30 },
            { name: "dori05", delay: 30 },
            { name: "dori06", delay: 30 },
            { name: "dori07", delay: Infinity }
        ]);
        this.renderable.addAnimation("dori_end", [
            { name: "dori01", delay: Infinity }
        ]);

        this.renderable.addAnimation("head", [
            { name: "head1", delay: 30 },
            { name: "head2", delay: 30 },
            { name: "head3", delay: 30 },
            { name: "head4", delay: 30 },
            { name: "head5", delay: 30 },
            { name: "head6", delay: Infinity }
        ]);
        this.renderable.addAnimation("head_end", [
            { name: "head1", delay: Infinity }
        ]);

        this.renderable.addAnimation("kim", [
            { name: "kim1", delay: 30 },
            { name: "kim2", delay: 30 },
            { name: "kim3", delay: 30 },
            { name: "kim4", delay: 30 },
            { name: "kim5", delay: 30 },
            { name: "kim6", delay: 30 },
            { name: "kim7", delay: 30 },
            { name: "kim8", delay: Infinity }
        ]);
        this.renderable.addAnimation("kim_end", [
            { name: "kim1", delay: Infinity }
        ]);

        this.renderable.addAnimation("kick2", [
            { name: "kick2_1", delay: 30 },
            { name: "kick2_2", delay: 30 },
            { name: "kick2_3", delay: 30 },
            { name: "kick2_4", delay: 30 },
            { name: "kick2_5", delay: 30 },
            { name: "kick2_6", delay: 30 },
            { name: "kick2_7", delay: 50 },
            { name: "kick2_8", delay: 50 },
            { name: "kick2_9", delay: Infinity },
        ]);

        this.renderable.addAnimation("kick2_end", [
            { name: "kick2_1", delay: Infinity }
        ]);

        // define a standing animation (using the first frame)
        //this.renderable.addAnimation("stand", [0]);

        // define punch in the pit of the stomach
        // this.renderable.addAnimation("puch_stomach", [0, 1, 2, 3, 4]);

        // initial state
        this.renderable.setCurrentAnimation("stand");

        this.anchorPoint.set(0.5, 1.0);

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

        this.alwaysUpdate = true;
        this.counter = 0;
    },

    random_sound: function(prefix, cnt) {
        var fname = prefix + me.Math.random(0, cnt);
        me.audio.play(fname);
    },

    /**
     * update the entity
     */
    update : function (dt) {
        if (this.counter <= 0) {
            if (me.input.isKeyPressed("q")) {
                me.audio.play("punch_1");
                this.renderable.setCurrentAnimation("punch_stomach");
                this.next_anim = "punch_stomach_end";
                this.counter = 20;
                game.data.score++;
            }
            else if (me.input.isKeyPressed("w")) {
                this.random_sound("hammer_", 2);
                this.renderable.setCurrentAnimation("hammer");
                this.next_anim = "hammer_end";
                this.counter = 15;
                game.data.score++;
            }
            else if (me.input.isKeyPressed("e")) {
                me.audio.play("ironbat");
                this.renderable.setCurrentAnimation("dori");
                this.next_anim = "dori_end";
                this.counter = 21;
                game.data.score++;
            }
            else if (me.input.isKeyPressed("1")) {
                me.audio.play("bond");
                this.renderable.setCurrentAnimation("sledge");
                this.next_anim = "sledge_end";
                this.counter = 15;
                game.data.score++;
            }
            else if (me.input.isKeyPressed("2")) {
                me.audio.play("slap");
                this.renderable.setCurrentAnimation("kim");
                this.next_anim = "kim_end";
                this.counter = 21;
                game.data.score++;
            }
            else if (me.input.isKeyPressed("3")) {
                me.audio.play("ddok");
                me.audio.play("punch_1");
                this.renderable.setCurrentAnimation("kick2");
                this.next_anim = "kick2_end";
                this.counter = 28;
                game.data.score++;
            }
            //else {
            //    this.renderable.setCurrentAnimation("punch_stomach");
            //}
        }

        if (this.counter > 0) {
            this.counter--;
            if (this.counter == 0) { // Just became 0.
                this.renderable.setCurrentAnimation(this.next_anim);
            }
        }

        // apply physics to the body (this moves the entity)
        // this.body.update(dt);

        // handle collisions against other shapes
        // me.collision.check(this);

        // return true if we moved or if the renderable was updated
        //return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
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

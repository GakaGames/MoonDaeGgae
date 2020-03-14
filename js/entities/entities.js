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
            "hammer1", "hammer2"
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
                me.audio.play("argh");
                this.renderable.setCurrentAnimation("punch_stomach");
                this.next_anim = "punch_stomach_end";
                this.counter = 20;
            }
            else if (me.input.isKeyPressed("w")) {
                this.random_sound("hammer_", 2);
                this.renderable.setCurrentAnimation("hammer");
                this.next_anim = "hammer_end";
                this.counter = 15;
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

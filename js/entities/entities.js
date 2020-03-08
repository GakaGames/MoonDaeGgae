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
            "pun1", "pun2", "pun3",
            "pun4", "pun5"
        ]);

        // define animations
        this.renderable.addAnimation("stand", [4]);
        this.renderable.addAnimation("punch_stomach", [0, 1, 2, 3, 4], 2);
        /*
            { name: "pun1", delay: 100 },
            { name: "pun2", delay: 100 },
            { name: "pun3", delay: 100 },
            { name: "pun4", delay: 100 },
            { name: "pun5", delay: 100 }
        ]);*/

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

    /**
     * update the entity
     */
    update : function (dt) {
        if (this.counter <= 0) {
            if (me.input.isKeyPressed("q")) {
                me.audio.play("argh");
                this.renderable.setCurrentAnimation("punch_stomach");
                this.counter = 20;
            }
            else if (me.input.isKeyPressed("w")) {
                me.audio.play("argh");
                this.renderable.setCurrentAnimation("punch_stomach");
                this.counter = 20;
            }
            //else {
            //    this.renderable.setCurrentAnimation("punch_stomach");
            //}
        }

        if (this.counter > 0) {
            this.counter--;
            if (this.counter == 0) { // Just became 0.
                this.renderable.setCurrentAnimation("stand");
            }
        }

        // apply physics to the body (this moves the entity)
        // this.body.update(dt);

        // handle collisions against other shapes
        // me.collision.check(this);

        // return true if we moved or if the renderable was updated
        //return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
        return true;
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

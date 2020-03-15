game.PlayScreen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;

        // BGM
        me.audio.playTrack("fighting");

        // Background
        var backgroundImage = new me.Sprite(0, 0, {
                image: me.loader.getImage('coronabomb'),
            }
        );

        // position and scale to fit with the viewport size
        backgroundImage.anchorPoint.set(0, 0);
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width,
            me.game.viewport.height / backgroundImage.height);
        me.game.world.addChild(backgroundImage, 1, 1);

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD, 2);

        this.moon = me.pool.pull("mainPlayer");
        me.game.world.addChild(this.moon, 2);

        var Button = me.GUI_Object.extend({
            init: function(x, y, img, key) {
                var settings = {
                    image: img,
                    framewidth: 80,
                    frameheight: 80
                }
                this._super(me.GUI_Object, "init", [x, y, settings]);
                this.pos.z = 4;
                this.isClickable = true;
                this.isHoldable = true;

                this.key = key;
            },

            onClick: function(event) {
                me.input.triggerKeyEvent(this.key, true);
                return true;
            },

            onHold: function() {
                me.input.triggerKeyEvent(this.key, true);
            },

            onRelease: function() {
                me.input.triggerKeyEvent(this.key, false);
            }
        });

        var FullScreenButton = me.GUI_Object.extend({
            init: function(x, y, img) {
                var settings = {
                    image: img,
                    framewidth: 80,
                    frameheight: 80
                }
                this._super(me.GUI_Object, "init", [x, y, settings]);
                this.pos.z = 4;
            },

            onClick: function(event) {
                if (!me.device.isFullscreen) {
                    me.device.requestFullscreen();
                } else {
                    me.device.exitFullscreen();
                }
                return true;
            }
        });

        var x1 = 40;
        var x2 = 600;
        var y1 = 140;
        var y2 = 240;
        var y3 = 340;
        me.game.world.addChild(new Button(x1, y1, "button_q", me.input.KEY.Q));
        me.game.world.addChild(new Button(x1, y2, "button_w", me.input.KEY.W));
        me.game.world.addChild(new Button(x1, y3, "button_e", me.input.KEY.E));
        me.game.world.addChild(new Button(x2, y1, "button_1", me.input.KEY.NUM1));
        me.game.world.addChild(new Button(x2, y2, "button_2", me.input.KEY.NUM2));
        me.game.world.addChild(new Button(x2, y3, "button_3", me.input.KEY.NUM3));
        me.game.world.addChild(new FullScreenButton(600, 440, "fullsc"));
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        //me.game.world.removeChild(this.HUD);
    }
});

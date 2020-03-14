game.PlayScreen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;

        // BGM
        me.audio.playTrack("moonminem");

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
        //this.HUD = new game.HUD.Container();
        //me.game.world.addChild(this.HUD);

        this.moon = me.pool.pull("mainPlayer");
        me.game.world.addChild(this.moon, 2);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        //me.game.world.removeChild(this.HUD);
    }
});

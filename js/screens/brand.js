game.BrandScreen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // background color
        this.bg = new me.ColorLayer("background", "#202020", 0);
        this.logo = new me.Sprite(320, 240, { image: me.loader.getImage('gakatv') });
        me.game.world.addChild(this.bg, 0);
        me.game.world.addChild(this.logo, 1);
        me.audio.play("jjoint");
        me.timer.setTimeout(function() {
            me.state.change(me.state.MENU);
        }, 1985);
    },

    onDestroyEvent: function() {
        me.game.world.removeChild(this.bg);
        me.game.world.removeChild(this.logo);
    }
});

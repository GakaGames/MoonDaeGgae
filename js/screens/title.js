game.TitleScreenDecorations = me.Renderable.extend({
   /**
     * constructor
     */
    init: function(x, y) {
        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // font for the scrolling text
        this.font = new me.BitmapText(0, 0, {
            font: "PressStart2P",
            textAlign: "center"
        });

        // local copy of the global score
        this.counter = 0;
        this.period = 40;
        this.do_draw = false;

        this.black = new me.Color(0, 0, 0);
    },

    update : function (dt) {
        this.counter = (this.counter + 1) % this.period;
        if (this.counter == 0) {
            this.do_draw = !this.do_draw;
            return true;
        }
        return false;
    },

    draw : function (context) {
        if (this.do_draw) {
            //console.log("draw");
            var msg = "TAP OR PRESS ENTER TO START";
            x = this.pos.x;
            y = this.pos.y;
            context.setTint(this.black);
            this.font.draw(context, msg, x + 1, y + 1);
            context.clearTint();
            this.font.draw(context, msg, x, y);
        }
    }
});

game.TitleScreen = me.Stage.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // title screen
        var backgroundImage = new me.Sprite(0, 0, {
                image: me.loader.getImage('moonrona'),
            }
        );
        this.counter = 0;
        this.backgroundImage = backgroundImage;

        // BGM
        // me.audio.playTrack("red_sun_in_the_sky");

        // position and scale to fit with the viewport size
        backgroundImage.anchorPoint.set(0, 0);
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, me.game.viewport.height / backgroundImage.height);

        // add to the world container
        me.game.world.addChild(backgroundImage, 1);

        // add a new renderable component with the scrolling text
        var txt = me.Renderable.extend ({
            // constructor
            init : function (x, y, text) {
                this._super(me.Renderable, 'init', [x, y, me.game.viewport.width, me.game.viewport.height]);

                // font for the scrolling text
                this.font = new me.BitmapText(x, y, {
                    font: "PressStart2P",
                    textAlign: "center"
                });
                this.tint = new me.Color(255, 200, 0);
                this.text = text;
            },

            draw : function (renderer) {
                this.font.draw(renderer, this.text,
                    me.game.viewport.width + this.pos.x,
                    me.game.viewport.height + this.pos.y);
            },
            onDestroyEvent : function () {
                ;
            }
        });

        var msg = "MOON-DAE-GGAE\n\nv1.0"
        var x = 0;
        var y = -40;
        this.txt = new txt(x, y, msg);
        this.txt_shadow = new txt(x + 1, y + 1, msg);
        this.txt_shadow.tint = new me.Color(0, 0, 0);
        me.game.world.addChild(this.txt_shadow, 2);
        me.game.world.addChild(this.txt, 3);

        this.blinker = new game.TitleScreenDecorations(320, 305);
        me.game.world.addChild(this.blinker);

        msg = "2020";
        x -= 60;
        y = 120;
        this.txt_2020 = new txt(x, y, msg);
        this.txt_2020.tint = new me.Color(255, 255, 255);
        this.txt_2020_shadow = new txt(x + 1, y + 1, msg);
        this.txt_2020_shadow.tint = new me.Color(0, 0, 0);
        me.game.world.addChild(this.txt_2020_shadow, 2);
        me.game.world.addChild(this.txt_2020, 3);

        this.mb = new me.Sprite(x + 320 - 63, y + 240 + 10, { image: me.loader.getImage('little_mb') });
        x += 141;
        this.gaka_games = new me.Sprite(x + 320, y + 240 + 10, { image: me.loader.getImage('gaka_games') });
        this.gaka_games_shadow = new me.Sprite(x + 320 + 1, y + 240 + 10 + 1, { image: me.loader.getImage('gaka_games') });
        this.gaka_games_shadow.tint = new me.Color(0, 0, 0);
        me.game.world.addChild(this.mb, 2);
        me.game.world.addChild(this.gaka_games, 3);
        me.game.world.addChild(this.gaka_games_shadow, 2);

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.Q, "enter", true);
        me.input.bindKey(me.input.KEY.I, "enter", true);
        me.input.bindKey(me.input.KEY.NUM1, "enter", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                // play something on tap / enter
                // this will unlock audio on mobile devices
                me.audio.play("dingdong");
                me.state.change(me.state.PLAY);
            }
        });
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.game.world.removeChild(this.backgroundImage);
        me.game.world.removeChild(this.txt);
        me.game.world.removeChild(this.txt_shadow);
        me.game.world.removeChild(this.blinker);
        me.game.world.removeChild(this.txt_2020);
        me.game.world.removeChild(this.txt_2020_shadow);
        me.game.world.removeChild(this.mb);
        me.game.world.removeChild(this.gaka_games);
        me.game.world.removeChild(this.gaka_games_shadow);
        me.audio.stopTrack();
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.I);
        me.input.unbindKey(me.input.KEY.NUM1);
        me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
    }
});

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
            init : function (x, y) {
                this._super(me.Renderable, 'init', [x, y, me.game.viewport.width, me.game.viewport.height]);

                // font for the scrolling text
                this.font = new me.BitmapText(x, y, {
                    font: "PressStart2P",
                    textAlign: "center"
                });
                this.tint = new me.Color(255, 200, 0);

                this.counter = 0;
            },

            update : function (dt) {
                if (this.counter >= 50) {
                    this.alpha = 0.0;
                }
                else {
                    this.alpha = 1.0;
                }
                this.counter++;
                if (this.counter >= 100) {
                    this.counter = 0;
                }
                return true;
            },

            draw : function (renderer) {
                this.font.draw(renderer,
                    "TAP OR PRESS ENTER TO START\n\n\nMOON-DAE-GGAE\n\nv1.0\n\n\n\n2020 GAKA GAMES",
                    me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
            },
            onDestroyEvent : function () {
                ;
            }
        });
        this.txt = new txt(0, 0);
        this.txt_shadow = new txt(1, 1);
        this.txt_shadow.tint = new me.Color(0, 0, 0);
        me.game.world.addChild(this.txt_shadow, 2);
        me.game.world.addChild(this.txt, 3);

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.Q, "enter", true);
        me.input.bindKey(me.input.KEY.W, "enter", true);
        me.input.bindKey(me.input.KEY.E, "enter", true);
        me.input.bindKey(me.input.KEY.A, "enter", true);
        me.input.bindKey(me.input.KEY.S, "enter", true);
        me.input.bindKey(me.input.KEY.D, "enter", true);
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
        me.audio.stopTrack();
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
    }
});

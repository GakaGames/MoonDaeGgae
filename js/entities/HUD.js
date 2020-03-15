/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(10, 10));
    }
});

/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
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
            textAlign: "left"
        });

        // local copy of the global score
        this.score = -1;
    },

    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    draw : function (context) {
        // draw it baby !
        this.font.draw(context, "HITS:" + game.data.score, this.pos.x, this.pos.y);
    }
});

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
        this.addChild(new game.HUD.GattlingGauge(10, 40));
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

    update : function (dt) {
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

game.HUD.GattlingGauge = me.Renderable.extend({
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

        // local copy of the global gauge
        this.gattling = -1;
        this.t = 0;
        this.max_on = false;
    },

    update : function (dt) {
        var dirty = false;
        this.t += dt;
        if (this.t > 500) {
            this.t = 0;
            this.max_on = !this.max_on;
            dirty = true;
        }

        if (this.gattling !== game.data.gattling) {
            this.gattling = game.data.gattling;
            return true;
        }
        return dirty;
    },

    draw : function (context) {
        var lw = 2;
        var h = 29;
        var maxw = 100;
        context.setColor('#FFF');
        var right = this.pos.x + maxw + 2 * lw;
        context.fillRect(this.pos.x, this.pos.y, lw, h); // left bound
        context.fillRect(right, this.pos.y, lw, h); // right bound
        context.fillRect(this.pos.x, this.pos.y - lw, maxw + 2 * lw + 2, lw); // upper bound
        context.fillRect(this.pos.x, this.pos.y +  h, maxw + 2 * lw + 2, lw); // lower bound

        // draw it baby!
        if (this.gattling < game.data.gattling_mid)
            context.setColor('#0F0');
        else if (this.gattling < game.data.gattling_max)
            context.setColor('#FF0');
        else
            context.setColor('#F00');
        var w = Math.round(maxw * this.gattling / game.data.gattling_max) + lw;
        context.fillRect(this.pos.x + lw, this.pos.y, w, h);

        if (this.max_on && (this.gattling == game.data.gattling_max))
            this.font.draw(context, "MAX!", this.pos.x + 12, this.pos.y + lw + 2);
    }
});

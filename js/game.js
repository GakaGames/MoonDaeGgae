
/* Game namespace */
var game = {

    data : {
        score : 0,
        gattling : 0,
        gattling_max: 60 * 10, // 10 seconds. 60fps.
        gattling_mid: 60 * 5
    },

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        game.texture = new me.video.renderer.Texture(
            me.loader.getJSON("texture"),
            me.loader.getImage("texture"),
        );

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
 
        // Start the game.
        me.state.change(me.state.MENU); // Commented out for debug
        // me.state.change(me.state.PLAY);  // For faster debug
    }
};

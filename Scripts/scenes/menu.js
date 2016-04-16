var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * Menu Scene extends scenes.Scene superclass is used to
     * create a custom menu for the THREEJS Game
     *
     * @class Menu
     * @extends scene.Scene
     * @param blocker {HTMLElement}
     * @param _stage {createjs.Stage}
     * @param _gameLabel {createjs.Text}
     * @param _startButton {createjs.Bitmap}
     */
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * Empty Constructor - calls _initialize and start methods
         *
         * @constructor
         */
        function Menu() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        Menu.prototype._setupCanvas = function () {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.style.backgroundColor = "#000000";
        };
        /**
         * This method sets up default values for class member variables
         * and objects
         *
         * @method _initialize
         * @return void
         */
        Menu.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Menu.prototype.start = function () {
            this._gameLabel = new createjs.Text("THE FLOOR IS HOT LAVA", "80px Comic Sans MS", "#ff0000");
            this._gameLabel.regX = this._gameLabel.getMeasuredWidth() * 0.5;
            this._gameLabel.regY = this._gameLabel.getMeasuredLineHeight() * 0.5;
            this._gameLabel.x = config.Screen.WIDTH * 0.5;
            this._gameLabel.y = (config.Screen.HEIGHT * 0.5) - 100;
            this._stage.addChild(this._gameLabel);
            //start button
            this._startButton = new createjs.Bitmap(assets.getResult("StartButton"));
            this._startButton.regX = this._startButton.getBounds().width * 0.5;
            this._startButton.regY = this._startButton.getBounds().height * 0.5;
            this._startButton.x = config.Screen.WIDTH * 0.5;
            this._startButton.y = (config.Screen.HEIGHT * 0.5) + 25;
            this._stage.addChild(this._startButton);
            this._startButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._startButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._startButton.on("click", function (event) {
                currentScene = config.Scene.PLAY;
                changeScene();
            });
            //controls button
            this._controlsButton = new createjs.Bitmap(assets.getResult("ControlsButton"));
            this._controlsButton.regX = this._controlsButton.getBounds().width * 0.5;
            this._controlsButton.regY = this._controlsButton.getBounds().height * 0.5;
            this._controlsButton.x = config.Screen.WIDTH * 0.5;
            this._controlsButton.y = (config.Screen.HEIGHT * 0.5) + 100;
            this._stage.addChild(this._controlsButton);
            this._controlsButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._controlsButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._controlsButton.on("click", function (event) {
                currentScene = config.Scene.CONTROLS;
                changeScene();
            });
            //level2 button
            this._level2Button = new createjs.Bitmap(assets.getResult("Level2Button"));
            this._level2Button.regX = this._level2Button.getBounds().width * 0.5;
            this._level2Button.regY = this._level2Button.getBounds().height * 0.5;
            this._level2Button.x = (config.Screen.WIDTH * 0.5) + 350;
            this._level2Button.y = (config.Screen.HEIGHT * 0.5) + 250;
            this._stage.addChild(this._level2Button);
            this._level2Button.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._level2Button.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._level2Button.on("click", function (event) {
                score = 0;
                health = 3;
                currentScene = config.Scene.PLAY2;
                changeScene();
            });
            //level3 button
            this._level3Button = new createjs.Bitmap(assets.getResult("Level3Button"));
            this._level3Button.regX = this._level3Button.getBounds().width * 0.5;
            this._level3Button.regY = this._level3Button.getBounds().height * 0.5;
            this._level3Button.x = (config.Screen.WIDTH * 0.5) + 525;
            this._level3Button.y = (config.Screen.HEIGHT * 0.5) + 250;
            this._stage.addChild(this._level3Button);
            this._level3Button.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._level3Button.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._level3Button.on("click", function (event) {
                score = 0;
                health = 3;
                currentScene = config.Scene.PLAY3;
                changeScene();
            });
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Menu.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Menu.prototype.resize = function () {
            this._setupCanvas();
        };
        return Menu;
    }(scenes.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));

//# sourceMappingURL=menu.js.map

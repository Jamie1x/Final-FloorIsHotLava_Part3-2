/**
 * @module scenes
 */
module scenes {
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
    export class Menu extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _gameLabel: createjs.Text;
        private _startButton: createjs.Bitmap;
        private _controlsButton: createjs.Bitmap;   
        private _level2Button: createjs.Bitmap;        
        private _level3Button: createjs.Bitmap;                     

        /**
         * Empty Constructor - calls _initialize and start methods
         * 
         * @constructor
         */
        constructor() {
            super();

            this._initialize();
            this.start();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++

        private _setupCanvas(): void {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.style.backgroundColor = "#000000";
        }


        /**
         * This method sets up default values for class member variables
         * and objects
         * 
         * @method _initialize
         * @return void
         */
        private _initialize(): void {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";

            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++

        /**
         * The start method is the main method for the scene class
         * 
         * @method start
         * @return void
         */
        public start(): void {
            this._gameLabel = new createjs.Text(
                "THE FLOOR IS HOT LAVA",
                "80px Comic Sans MS",
                "#ff0000");
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

            this._startButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._startButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._startButton.on("click", (event: createjs.MouseEvent) => {
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

            this._controlsButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._controlsButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._controlsButton.on("click", (event: createjs.MouseEvent) => {
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

            this._level2Button.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._level2Button.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._level2Button.on("click", (event: createjs.MouseEvent) => {
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

            this._level3Button.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._level3Button.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._level3Button.on("click", (event: createjs.MouseEvent) => {
                score = 0;
                health = 3;
                currentScene = config.Scene.PLAY3;
                changeScene();
            });
        }

        /**
         * The update method updates the animation loop and other objects
         * 
         * @method update
         * @return void
         */
        public update(): void {
            this._stage.update();
        }

        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            this._setupCanvas();
        }
    }
}
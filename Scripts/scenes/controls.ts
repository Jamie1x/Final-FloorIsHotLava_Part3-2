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
    export class Controls extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _gameLabel: createjs.Text;
        private _startButton: createjs.Bitmap;
        private _controlsButton: createjs.Bitmap;   
        private _level2Button: createjs.Bitmap;        
        private _level3Button: createjs.Bitmap;   
        private _wasdLabel: createjs.Bitmap;
        private _arrowLabel: createjs.Bitmap;
        private _moveLabel: createjs.Text;
        private _spaceLabel: createjs.Bitmap;
        private _aimLabel: createjs.Text;        
        private _mouseLabel: createjs.Bitmap;
        private _jumpLabel: createjs.Text;
        private _ballLabel: createjs.Bitmap;
        private _avoidLabel: createjs.Text;
        private _cubeLabel: createjs.Bitmap;
        private _objectiveLabel: createjs.Text;
        private _coinLabel: createjs.Bitmap;
        private _coinTextLabel: createjs.Text;

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
            canvas.style.backgroundImage = "url('../Assets/images/bg.gif')";
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
                "INSTRUCTIONS",
                "60px 'Press Start 2P'",
                "#000000");
            this._gameLabel.regX = this._gameLabel.getMeasuredWidth() * 0.5;
            this._gameLabel.regY = this._gameLabel.getMeasuredLineHeight() * 0.5;
            this._gameLabel.x = config.Screen.WIDTH * 0.5;
            this._gameLabel.y = (config.Screen.HEIGHT * 0.5) - 280;
            this._stage.addChild(this._gameLabel);

            //start button
            this._startButton = new createjs.Bitmap(assets.getResult("StartButton"));
            this._startButton.regX = this._startButton.getBounds().width * 0.5;
            this._startButton.regY = this._startButton.getBounds().height * 0.5;
            this._startButton.x = (config.Screen.WIDTH * 0.5) + 570;
            this._startButton.y = (config.Screen.HEIGHT * 0.5) + 250;
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
            
            //wasd Label
            this._wasdLabel = new createjs.Bitmap(assets.getResult("wasd"));
            this._wasdLabel.regX = this._wasdLabel.getBounds().width * 0.5;
            this._wasdLabel.regY = this._wasdLabel.getBounds().height * 0.5;
            this._wasdLabel.x = (config.Screen.WIDTH * 0.5) - 100;
            this._wasdLabel.y = (config.Screen.HEIGHT * 0.5);
            this._stage.addChild(this._wasdLabel);
            
            //move instructions
            this._moveLabel = new createjs.Text(
                "use WASD (or arrow keys) to move your player",
                "15px 'Press Start 2P'",
                "#000000");
            this._moveLabel.regX = this._moveLabel.getMeasuredWidth() * 0.5;
            this._moveLabel.regY = this._moveLabel.getMeasuredLineHeight() * 0.5;
            this._moveLabel.x = config.Screen.WIDTH * 0.5;
            this._moveLabel.y = (config.Screen.HEIGHT * 0.5) + 75;
            this._stage.addChild(this._moveLabel);
            
            //arrow Label
            this._arrowLabel = new createjs.Bitmap(assets.getResult("arrows"));
            this._arrowLabel.regX = this._arrowLabel.getBounds().width * 0.5;
            this._arrowLabel.regY = this._arrowLabel.getBounds().height * 0.5;
            this._arrowLabel.x = (config.Screen.WIDTH * 0.5) + 100;
            this._arrowLabel.y = (config.Screen.HEIGHT * 0.5);
            this._stage.addChild(this._arrowLabel);
            
            //space Label
            this._spaceLabel = new createjs.Bitmap(assets.getResult("space"));
            this._spaceLabel.regX = this._spaceLabel.getBounds().width * 0.5;
            this._spaceLabel.regY = this._spaceLabel.getBounds().height * 0.5;
            this._spaceLabel.x = (config.Screen.WIDTH * 0.5) - 300;
            this._spaceLabel.y = (config.Screen.HEIGHT * 0.5) + 150;
            this._stage.addChild(this._spaceLabel);
            
            //jump instructions
            this._jumpLabel = new createjs.Text(
                "use the SPACEBAR to jump",
                "15px 'Press Start 2P'",
                "#000000");
            this._jumpLabel.regX = this._jumpLabel.getMeasuredWidth() * 0.5;
            this._jumpLabel.regY = this._jumpLabel.getMeasuredLineHeight() * 0.5;
            this._jumpLabel.x = (config.Screen.WIDTH * 0.5) - 300;
            this._jumpLabel.y = (config.Screen.HEIGHT * 0.5) + 200;
            this._stage.addChild(this._jumpLabel);
            
            //mouse Label
            this._mouseLabel = new createjs.Bitmap(assets.getResult("mouse"));
            this._mouseLabel.regX = this._mouseLabel.getBounds().width * 0.5;
            this._mouseLabel.regY = this._mouseLabel.getBounds().height * 0.5;
            this._mouseLabel.x = (config.Screen.WIDTH * 0.5) + 300;
            this._mouseLabel.y = (config.Screen.HEIGHT * 0.5) + 150;
            this._stage.addChild(this._mouseLabel);
            
            //aim instructions
            this._aimLabel = new createjs.Text(
                "move your MOUSE to aim",
                "15px 'Press Start 2P'",
                "#000000");
            this._aimLabel.regX = this._aimLabel.getMeasuredWidth() * 0.5;
            this._aimLabel.regY = this._aimLabel.getMeasuredLineHeight() * 0.5;
            this._aimLabel.x = (config.Screen.WIDTH * 0.5) + 300;
            this._aimLabel.y = (config.Screen.HEIGHT * 0.5) + 250;
            this._stage.addChild(this._aimLabel);
            
            //ball Label
            this._ballLabel = new createjs.Bitmap(assets.getResult("ball"));
            this._ballLabel.regX = this._ballLabel.getBounds().width * 0.5;
            this._ballLabel.regY = this._ballLabel.getBounds().height * 0.5;
            this._ballLabel.x = (config.Screen.WIDTH * 0.5) + 450;
            this._ballLabel.y = (config.Screen.HEIGHT * 0.5) - 200;
            this._stage.addChild(this._ballLabel);
            
            //avoid instructions
            this._avoidLabel = new createjs.Text(
                "avoid oncoming projectiles",
                "15px 'Press Start 2P'",
                "#000000");
            this._avoidLabel.regX = this._avoidLabel.getMeasuredWidth() * 0.5;
            this._avoidLabel.regY = this._avoidLabel.getMeasuredLineHeight() * 0.5;
            this._avoidLabel.x = (config.Screen.WIDTH * 0.5) + 450;
            this._avoidLabel.y = (config.Screen.HEIGHT * 0.5) - 150;
            this._stage.addChild(this._avoidLabel);
            
            //cube Label
            this._cubeLabel = new createjs.Bitmap(assets.getResult("cube"));
            this._cubeLabel.regX = this._cubeLabel.getBounds().width * 0.5;
            this._cubeLabel.regY = this._cubeLabel.getBounds().height * 0.5;
            this._cubeLabel.x = (config.Screen.WIDTH * 0.5) - 450;
            this._cubeLabel.y = (config.Screen.HEIGHT * 0.5) - 200;
            this._stage.addChild(this._cubeLabel);
            
            //objective instructions
            this._objectiveLabel = new createjs.Text(
                "reach the green cube to win",
                "15px 'Press Start 2P'",
                "#000000");
            this._objectiveLabel.regX = this._objectiveLabel.getMeasuredWidth() * 0.5;
            this._objectiveLabel.regY = this._objectiveLabel.getMeasuredLineHeight() * 0.5;
            this._objectiveLabel.x = (config.Screen.WIDTH * 0.5) - 450;
            this._objectiveLabel.y = (config.Screen.HEIGHT * 0.5) - 150;
            this._stage.addChild(this._objectiveLabel);
            
            //coin Label
            this._coinLabel = new createjs.Bitmap(assets.getResult("coinPic"));
            this._coinLabel.regX = this._coinLabel.getBounds().width * 0.5;
            this._coinLabel.regY = this._coinLabel.getBounds().height * 0.5;
            this._coinLabel.x = (config.Screen.WIDTH * 0.5);
            this._coinLabel.y = (config.Screen.HEIGHT * 0.5) - 150;
            this._stage.addChild(this._coinLabel);
            
            //coinText instructions
            this._coinTextLabel = new createjs.Text(
                "collect coins to score points",
                "15px 'Press Start 2P'",
                "#000000");
            this._coinTextLabel.regX = this._coinTextLabel.getMeasuredWidth() * 0.5;
            this._coinTextLabel.regY = this._coinTextLabel.getMeasuredLineHeight() * 0.5;
            this._coinTextLabel.x = (config.Screen.WIDTH * 0.5);
            this._coinTextLabel.y = (config.Screen.HEIGHT * 0.5) - 100;
            this._stage.addChild(this._coinTextLabel);
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
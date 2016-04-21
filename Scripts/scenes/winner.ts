/**
 * @module scenes
 */
module scenes {
    /**
     * This class instantiates the game win scene object
     * 
     * @class Winner
     * @extends scenes.Scene
     */
    export class Winner extends scenes.Scene {
        private _blocker: HTMLElement;
        private _stage: createjs.Stage;
        private _youWinLabel: createjs.Text;
        private _scoreLabel: createjs.Text;
        private _highScoreLabel: createjs.Text;
        private _restartButton: createjs.Bitmap;
        private _exitButton: createjs.Bitmap;

        /**
         * Empty Contructor
         * 
         * @constructor
         */
        constructor() {
            super();

            this._initialize();
            this.start();
        }

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


        /**
         * The start method is the main method for the scene class
         * 
         * @method start
         * @return void
         */
        public start(): void {
            this._youWinLabel = new createjs.Text(
                "YOU WIN!",
                "80px 'Press Start 2P'",
                "#000000");
            this._youWinLabel.regX = this._youWinLabel.getMeasuredWidth() * 0.5;
            this._youWinLabel.regY = this._youWinLabel.getMeasuredLineHeight() * 0.5;
            this._youWinLabel.x = config.Screen.WIDTH * 0.5;
            this._youWinLabel.y = (config.Screen.HEIGHT * 0.5) - 200;
            this._stage.addChild(this._youWinLabel);

            //check for high score changes
            if (score > highScore) {
                highScore = score;
            }

            //current score label
            this._scoreLabel = new createjs.Text(
                "Your Score: " + score,
                "40px 'Press Start 2P'",
                "#000000");
            this._scoreLabel.regX = this._scoreLabel.getMeasuredWidth() * 0.5;
            this._scoreLabel.regY = this._scoreLabel.getMeasuredLineHeight() * 0.5;
            this._scoreLabel.x = config.Screen.WIDTH * 0.5;
            this._scoreLabel.y = (config.Screen.HEIGHT * 0.5) - 125;
            this._stage.addChild(this._scoreLabel);

            //high score label
            this._highScoreLabel = new createjs.Text(
                "High Score: " + highScore,
                "40px 'Press Start 2P'",
                "#000000");
            this._highScoreLabel.regX = this._highScoreLabel.getMeasuredWidth() * 0.5;
            this._highScoreLabel.regY = this._highScoreLabel.getMeasuredLineHeight() * 0.5;
            this._highScoreLabel.x = config.Screen.WIDTH * 0.5;
            this._highScoreLabel.y = (config.Screen.HEIGHT * 0.5) - 75;
            this._stage.addChild(this._highScoreLabel);

            //restart button
            this._restartButton = new createjs.Bitmap(assets.getResult("RestartButton"));
            this._restartButton.regX = this._restartButton.getBounds().width * 0.5;
            this._restartButton.regY = this._restartButton.getBounds().height * 0.5;
            this._restartButton.x = config.Screen.WIDTH * 0.5;
            this._restartButton.y = (config.Screen.HEIGHT * 0.5) + 50;
            this._stage.addChild(this._restartButton);

            this._restartButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._restartButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._restartButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.PLAY;
                changeScene();
            });

            //exit button
            this._exitButton = new createjs.Bitmap(assets.getResult("ExitButton"));
            this._exitButton.regX = this._exitButton.getBounds().width * 0.5;
            this._exitButton.regY = this._exitButton.getBounds().height * 0.5;
            this._exitButton.x = config.Screen.WIDTH * 0.5;
            this._exitButton.y = (config.Screen.HEIGHT * 0.5) + 150;
            this._stage.addChild(this._exitButton);

            this._exitButton.on("mouseover", (event: createjs.MouseEvent) => {
                event.target.alpha = 0.7;
            });

            this._exitButton.on("mouseout", (event: createjs.MouseEvent) => {
                event.target.alpha = 1.0;
            });

            this._exitButton.on("click", (event: createjs.MouseEvent) => {
                currentScene = config.Scene.MENU;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * The Scenes module is a namespace to reference all scene objects
 *
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * The Play class is where the main action occurs for the game
     *
     * @class Play
     * @param havePointerLock {boolean}
     */
    var Play2 = (function (_super) {
        __extends(Play2, _super);
        /**
         * @constructor
         */
        function Play2() {
            _super.call(this);
            this.scene = new scenes.Scene(); // Instantiate Scene Object
            this.velocity = new Vector3(0, 0, 0);
            this.prevTime = 0;
            this.coinCount = 10;
            this.blockCount = 20;
            this.ballTimer = 250;
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++
        /**
         * Sets up the initial canvas for the play scene
         *
         * @method setupCanvas
         * @return void
         */
        Play2.prototype._setupCanvas = function () {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        };
        /**
         * The initialize method sets up key objects to be used in the scene
         *
         * @method _initialize
         * @returns void
         */
        Play2.prototype._initialize = function () {
            // Create to HTMLElements
            this.blocker = document.getElementById("blocker");
            this.instructions = document.getElementById("instructions");
            this.blocker.style.display = "block";
            // setup canvas for menu scene
            this._setupCanvas();
            this.prevTime = 0;
            this.stage = new createjs.Stage(canvas);
            this.velocity = new Vector3(0, 0, 0);
            // setup a THREE.JS Clock object
            this.clock = new Clock();
            // Instantiate Game Controls
            this.keyboardControls = new objects.KeyboardControls();
            this.mouseControls = new objects.MouseControls();
        };
        /**
         * This method sets up the scoreboard for the scene
         *
         * @method setupScoreboard
         * @returns void
         */
        Play2.prototype.setupScoreboard = function () {
            // initialize  score and health values
            //this.score = 0;
            //this.health = 3;
            // Add health Label
            this.healthLabel = new createjs.Text("LIVES: " + health, "40px Consolas", "#ffffff");
            this.healthLabel.x = config.Screen.WIDTH * 0.1;
            this.healthLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.healthLabel);
            console.log("Added health Label to stage");
            // Add Score Label
            this.scoreLabel = new createjs.Text("SCORE: " + score, "40px Consolas", "#ffffff");
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.scoreLabel);
            console.log("Added Score Label to stage");
        };
        Play2.prototype.addLight = function () {
            /*// Spot Light
            this.spotLight = new SpotLight(0xffffff);
            this.spotLight.position.set(20, 40, -15);
            this.spotLight.castShadow = true;
            this.spotLight.intensity = 2;
            this.spotLight.lookAt(new Vector3(0, 0, 0));
            this.spotLight.shadowCameraNear = 2;
            this.spotLight.shadowCameraFar = 200;
            this.spotLight.shadowCameraLeft = -5;
            this.spotLight.shadowCameraRight = 5;
            this.spotLight.shadowCameraTop = 5;
            this.spotLight.shadowCameraBottom = -5;
            this.spotLight.shadowMapWidth = 2048;
            this.spotLight.shadowMapHeight = 2048;
            this.spotLight.shadowDarkness = 0.5;
            this.spotLight.name = "Spot Light";
            this.add(this.spotLight);*/
            this.ambientLight = new AmbientLight(0xf0f0f0);
            this.add(this.ambientLight);
        };
        Play2.prototype.addGround = function () {
            // Ground Object
            this.groundTexture = new THREE.TextureLoader().load('../../Assets/images/lava.png');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(8, 32);
            this.groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/lavaMap.png');
            this.groundTextureNormal.wrapS = THREE.RepeatWrapping;
            this.groundTextureNormal.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(8, 32);
            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundMaterial.bumpMap = this.groundTextureNormal;
            this.groundMaterial.bumpScale = 0.2;
            this.groundGeometry = new BoxGeometry(32, 1, 400);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.position.set(0, 0, -164);
            this.ground.receiveShadow = true;
            this.ground.name = "Lava";
            this.add(this.ground);
        };
        Play2.prototype.addWalls = function () {
            //wall material
            this.WallTexture = new THREE.TextureLoader().load('../../Assets/images/Wall.jpg');
            this.WallTexture.wrapS = THREE.RepeatWrapping;
            this.WallTexture.wrapT = THREE.RepeatWrapping;
            this.WallTextureNormal = new THREE.TextureLoader().load('../../Assets/images/WallMap.jpg');
            this.WallTextureNormal.wrapS = THREE.RepeatWrapping;
            this.WallTextureNormal.wrapT = THREE.RepeatWrapping;
            this.WallMaterial = new PhongMaterial();
            this.WallMaterial.map = this.WallTexture;
            this.WallMaterial.bumpMap = this.WallTextureNormal;
            //sideWall material
            this.sideWallTexture = new THREE.TextureLoader().load('../../Assets/images/wall.jpg');
            this.sideWallTexture.wrapS = THREE.RepeatWrapping;
            this.sideWallTexture.wrapT = THREE.RepeatWrapping;
            this.sideWallTexture.repeat.set(10, 1);
            this.sideWallTextureNormal = new THREE.TextureLoader().load('../../Assets/images/wallMap.jpg');
            this.sideWallTextureNormal.wrapS = THREE.RepeatWrapping;
            this.sideWallTextureNormal.wrapT = THREE.RepeatWrapping;
            this.sideWallTextureNormal.repeat.set(10, 1);
            this.sideWallMaterial = new PhongMaterial();
            this.sideWallMaterial.map = this.sideWallTexture;
            this.sideWallMaterial.bumpMap = this.sideWallTextureNormal;
            // right wall object
            this.rWallGeometry = new BoxGeometry(1, 16, 400);
            this.rWallPhysicsMaterial = Physijs.createMaterial(this.sideWallMaterial, 0, 0);
            this.rWall = new Physijs.ConvexMesh(this.rWallGeometry, this.rWallPhysicsMaterial, 0);
            this.rWall.position.set(16, 8, -164);
            this.rWall.receiveShadow = true;
            this.rWall.name = "Wall";
            this.add(this.rWall);
            // left wall object
            this.lWallGeometry = new BoxGeometry(1, 16, 400);
            this.lWallPhysicsMaterial = Physijs.createMaterial(this.sideWallMaterial, 0, 0);
            this.lWall = new Physijs.ConvexMesh(this.lWallGeometry, this.lWallPhysicsMaterial, 0);
            this.lWall.position.set(-16, 8, -164);
            this.lWall.receiveShadow = true;
            this.lWall.name = "Wall";
            this.add(this.lWall);
            // far wall object
            this.fWallGeometry = new BoxGeometry(32, 16, 1);
            this.fWallPhysicsMaterial = Physijs.createMaterial(this.WallMaterial, 0, 0);
            this.fWall = new Physijs.ConvexMesh(this.fWallGeometry, this.fWallPhysicsMaterial, 0);
            this.fWall.position.set(0, 8, -310);
            this.fWall.receiveShadow = true;
            this.fWall.name = "Wall";
            this.add(this.fWall);
            // back wall object
            this.bWallGeometry = new BoxGeometry(32, 16, 1);
            this.bWallPhysicsMaterial = Physijs.createMaterial(this.WallMaterial, 0, 0);
            this.bWall = new Physijs.ConvexMesh(this.bWallGeometry, this.bWallPhysicsMaterial, 0);
            this.bWall.position.set(0, 8, 32);
            this.bWall.receiveShadow = true;
            this.bWall.name = "Wall";
            this.add(this.bWall);
        };
        Play2.prototype.addPlayer = function () {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 4, 2);
            this.playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
            this.player = new Physijs.BoxMesh(this.playerGeometry, this.playerMaterial, 1);
            this.player.position.set(0, 5, 16);
            this.player.receiveShadow = true;
            this.player.castShadow = true;
            this.player.name = "Player";
            this.add(this.player);
        };
        Play2.prototype.addStartPlatform = function () {
            //startPlatform
            var startPlatform = new Physijs.ConvexMesh(new BoxGeometry(10, 1, 10), Physijs.createMaterial(new LambertMaterial()), 0);
            startPlatform.position.set(0, 1, 16);
            startPlatform.name = "Ground";
            this.add(startPlatform);
        };
        Play2.prototype.addEndPlatform = function () {
            //end
            var end = new Physijs.ConvexMesh(new BoxGeometry(3, 2, 3), Physijs.createMaterial(new LambertMaterial()), 0);
            end.position.set(0, 1, -300);
            end.name = "Finish";
            this.add(end);
        };
        //add random blocks to scene
        Play2.prototype.addBlocks = function () {
            for (var i = 0; i < this.blockCount; i++) {
                var x = Math.random() * 10 + 1;
                var z = Math.random() * 10 + 1;
                var block = new Physijs.ConvexMesh(new BoxGeometry(x, 1, z), Physijs.createMaterial(new LambertMaterial()), 0);
                var rand = Math.floor(Math.random() * 20) - 10;
                block.position.set(rand, 1, i * -15);
                block.name = "Ground";
                this.add(block);
            }
        };
        /**
         * This method adds a coin to the scene
         *
         * @method addCoinMesh
         * @return void
         */
        Play2.prototype.addCoinMesh = function () {
            var self = this;
            this.coins = new Array(); // Instantiate a convex mesh array
            var coinLoader = new THREE.JSONLoader().load("../../Assets/imported/coin.json", function (geometry) {
                var phongMaterial = new PhongMaterial({ color: 0xE7AB32 });
                phongMaterial.emissive = new THREE.Color(0xE7AB32);
                var coinMaterial = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                for (var count = 0; count < self.coinCount; count++) {
                    self.coins[count] = new Physijs.ConvexMesh(geometry, coinMaterial);
                    self.coins[count].receiveShadow = true;
                    self.coins[count].castShadow = true;
                    self.coins[count].name = "Coin";
                    self.setCoinPosition(self.coins[count]);
                    console.log("Added Coin Mesh to Scene, at position: " + self.coins[count].position);
                }
            });
        };
        /**
         * This method randomly sets the coin object's position
         *
         * @method setCoinPosition
         * @return void
         */
        Play2.prototype.setCoinPosition = function (coin) {
            var randomPointX = Math.floor(Math.random() * 20) - 10;
            var randomPointY = Math.random() * 50 + 30;
            var randomPointZ = Math.random() * -100;
            coin.position.set(randomPointX, randomPointY, randomPointZ);
            this.add(coin);
        };
        //add projectiles to attack player
        Play2.prototype.sendBall = function () {
            this.ball = new Physijs.ConvexMesh(new SphereGeometry(0.5, 32, 32), Physijs.createMaterial(new LambertMaterial({ color: 0xff0000 })), 5);
            this.ball.position.set(this.player.position.x, 2, -350);
            this.ball.name = "Ball";
            this.add(this.ball);
            console.log("ball sent");
        };
        /**
         * Event Handler method for any pointerLockChange events
         *
         * @method pointerLockChange
         * @return void
         */
        Play2.prototype.pointerLockChange = function (event) {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            }
            else {
                if (this.gameOver) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                }
                else {
                    this.blocker.style.display = '-webkit-box';
                    this.blocker.style.display = '-moz-box';
                    this.blocker.style.display = 'box';
                    this.instructions.style.display = '';
                }
                // disable our mouse and keyboard controls
                this.keyboardControls.enabled = false;
                this.mouseControls.enabled = false;
                console.log("PointerLock disabled");
            }
        };
        /**
         * Event handler for PointerLockError
         *
         * @method pointerLockError
         * @return void
         */
        Play2.prototype.pointerLockError = function (event) {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        };
        // Check Controls Function
        /**
         * This method updates the player's position based on user input
         *
         * @method checkControls
         * @return void
         */
        Play2.prototype.checkControls = function () {
            if (this.keyboardControls.enabled) {
                this.velocity = new Vector3();
                var time = performance.now();
                var delta = (time - this.prevTime) / 1000;
                var direction = new Vector3(0, 0, 0);
                if (this.keyboardControls.moveForward) {
                    this.velocity.z -= 1000.0 * delta;
                }
                if (this.keyboardControls.moveLeft) {
                    this.velocity.x -= 1000.0 * delta;
                }
                if (this.keyboardControls.moveBackward) {
                    this.velocity.z += 1000.0 * delta;
                }
                if (this.keyboardControls.moveRight) {
                    this.velocity.x += 1000.0 * delta;
                }
                if (this.isGrounded) {
                    if (this.keyboardControls.jump) {
                        this.velocity.y = 4000.0 * delta;
                        if (this.player.position.y > this.jumpHeight + 1) {
                            this.isGrounded = false;
                            createjs.Sound.play("jump");
                        }
                    }
                }
                this.player.setDamping(0.7, 0.1);
                // Changing player's rotation
                this.player.setAngularVelocity(new Vector3(0, this.mouseControls.yaw, 0));
                direction.addVectors(direction, this.velocity);
                direction.applyQuaternion(this.player.quaternion);
                if (Math.abs(this.player.getLinearVelocity().x) < 20 && Math.abs(this.player.getLinearVelocity().y) < 10) {
                    this.player.applyCentralForce(direction);
                }
                this.cameraLook();
                //reset Pitch and Yaw
                this.mouseControls.pitch = 0;
                this.mouseControls.yaw = 0;
                this.prevTime = time;
            } // Controls Enabled ends
            else {
                this.player.setAngularVelocity(new Vector3(0, 0, 0));
            }
        };
        Play2.prototype._unpauseSimulation = function () {
            scene.onSimulationResume();
            console.log("resume simulation");
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Play2.prototype.start = function () {
            var _this = this;
            // Set Up Scoreboard
            this.setupScoreboard();
            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;
            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;
                this.instructions.addEventListener('click', function () {
                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");
                    _this.element.requestPointerLock = _this.element.requestPointerLock ||
                        _this.element.mozRequestPointerLock ||
                        _this.element.webkitRequestPointerLock;
                    _this.element.requestPointerLock();
                });
                document.addEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
            }
            // Scene changes for Physijs
            this.name = "Main";
            this.fog = new THREE.Fog(0xffffff, 0, 750);
            this.setGravity(new THREE.Vector3(0, -15, 0));
            // start simulation
            /*
            this.addEventListener('update', this._simulateScene);
            console.log("Start Simulation"); */
            //randomly generate coins and blocks
            this.addLight();
            this.addGround();
            this.addWalls();
            this.addPlayer();
            this.addStartPlatform();
            this.addBlocks();
            this.addEndPlatform();
            this.addCoinMesh();
            //sends projectile toward player
            this.sendBall();
            // Collision Check
            this.player.addEventListener('collision', function (event) {
                if (event.name === "Ground") {
                    createjs.Sound.play("land");
                    this.isGrounded = true;
                    this.jumpHeight = this.player.position.y;
                }
                if (event.name === "Lava") {
                    createjs.Sound.play("hit");
                    health--;
                    if (health <= 0) {
                        // Exit Pointer Lock
                        document.exitPointerLock();
                        this.children = []; // an attempt to clean up
                        this._isGamePaused = true;
                        this.gameOver = true;
                        // Play the Game Over Scene
                        currentScene = config.Scene.OVER;
                        changeScene();
                    }
                    else {
                        // otherwise reset my player and update health
                        this.healthLabel.text = "LIVES: " + health;
                        this.remove(this.player);
                        this.player.position.set(0, 5, 16);
                        this.add(this.player);
                    }
                }
                if (event.name === "Coin") {
                    createjs.Sound.play("coin");
                    score++;
                    this.scoreLabel.text = "SCORE: " + score;
                    this.remove(event);
                    this.setCoinPosition(event);
                }
                if (event.name === "Finish") {
                    // Exit Pointer Lock
                    document.exitPointerLock();
                    this.children = [];
                    this._isGamePaused = true;
                    // Play the Game Win Scene
                    currentScene = config.Scene.PLAY3;
                    changeScene();
                }
            }.bind(this));
            //reset coin when it hits the lava
            this.ground.addEventListener('collision', function (event) {
                if (event.name === "Coin") {
                    this.remove(event);
                    this.setCoinPosition(event);
                }
            }.bind(this));
            // create parent-child relationship with camera and player
            this.player.add(camera);
            camera.position.set(0, 1, 0);
            this.simulate();
        };
        /**
         * Camera Look function
         *
         * @method cameraLook
         * @return void
         */
        Play2.prototype.cameraLook = function () {
            var zenith = THREE.Math.degToRad(90);
            var nadir = THREE.Math.degToRad(-90);
            var cameraPitch = camera.rotation.x + this.mouseControls.pitch;
            // Constrain the Camera Pitch
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
        };
        /**
         * @method update
         * @returns void
         */
        Play2.prototype.update = function () {
            this.coins.forEach(function (coin) {
                coin.setAngularFactor(new Vector3(0, 0, 0));
                coin.setAngularVelocity(new Vector3(0, 1, 0));
            });
            this.ball.setLinearFactor(new Vector3(0, 0, 0));
            this.ball.setLinearVelocity(new Vector3(0, 0, 20));
            this.ballTimer -= 1;
            if (this.ballTimer <= 0) {
                this.sendBall();
                this.ballTimer = 250;
            }
            this.player.setAngularFactor(new Vector3(0, 0, 0));
            this.checkControls();
            this.stage.update();
            if (!this.keyboardControls.paused) {
                this.simulate();
            }
        };
        /**
         * Responds to screen resizes
         *
         * @method resize
         * @return void
         */
        Play2.prototype.resize = function () {
            canvas.style.width = "100%";
            this.healthLabel.x = config.Screen.WIDTH * 0.1;
            this.healthLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        };
        return Play2;
    }(scenes.Scene));
    scenes.Play2 = Play2;
})(scenes || (scenes = {}));

//# sourceMappingURL=play2.js.map

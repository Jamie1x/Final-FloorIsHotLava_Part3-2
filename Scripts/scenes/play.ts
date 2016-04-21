/**
 * The Scenes module is a namespace to reference all scene objects
 * 
 * @module scenes
 */
module scenes {
    /**
     * The Play class is where the main action occurs for the game
     * 
     * @class Play
     * @param havePointerLock {boolean}
     */
    export class Play extends scenes.Scene {
        // declare game objects
        private havePointerLock: boolean;
        private element: any;
        private scene: Scene = new Scene(); // Instantiate Scene Object
        private renderer: Renderer;
        private camera: PerspectiveCamera;
        private stats: Stats;
        private blocker: HTMLElement;
        private instructions: HTMLElement;

        private spotLight: SpotLight;
        private ambientLight: AmbientLight;

        private groundGeometry: CubeGeometry;
        private groundPhysicsMaterial: Physijs.Material;
        private groundMaterial: PhongMaterial;
        private ground: Physijs.Mesh;
        private groundTexture: Texture;
        private groundTextureNormal: Texture;

        private WallTexture: Texture;
        private WallTextureNormal: Texture;
        private WallMaterial: PhongMaterial;
        private sideWallTexture: Texture;
        private sideWallTextureNormal: Texture;
        private sideWallMaterial: PhongMaterial;
        private rWallGeometry: CubeGeometry;
        private rWallPhysicsMaterial: Physijs.Material;
        private rWall: Physijs.Mesh;
        private lWallGeometry: CubeGeometry;
        private lWallPhysicsMaterial: Physijs.Material;
        private lWall: Physijs.Mesh;
        private fWallGeometry: CubeGeometry;
        private fWallPhysicsMaterial: Physijs.Material;
        private fWall: Physijs.Mesh;
        private bWallGeometry: CubeGeometry;
        private bWallPhysicsMaterial: Physijs.Material;
        private bWall: Physijs.Mesh;

        private ball: Physijs.Mesh;
        private clock: Clock;
        private playerGeometry: CubeGeometry;
        private playerMaterial: Physijs.Material;
        private player: Physijs.Mesh;
        private sphereGeometry: SphereGeometry;
        private sphereMaterial: Physijs.Material;
        private sphere: Physijs.Mesh;
        private keyboardControls: objects.KeyboardControls;
        private mouseControls: objects.MouseControls;
        private isGrounded: boolean;
        private velocity: Vector3 = new Vector3(0, 0, 0);
        private prevTime: number = 0;
        private jumpHeight: number;
        //private health: number;
        private assets: createjs.LoadQueue;
        private canvas: HTMLElement;
        private stage: createjs.Stage;
        private scoreLabel: createjs.Text;
        private healthLabel: createjs.Text;
        //private score: number;
        private coins: Physijs.ConcaveMesh[];
        private blocks: Physijs.ConvexMesh[];
        private coinCount: number = 5;
        private blockCount: number = 10;
        private gameOver: boolean;

        /**
         * @constructor
         */
        constructor() {
            super();

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
        private _setupCanvas(): void {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        }

        /**
         * The initialize method sets up key objects to be used in the scene
         * 
         * @method _initialize
         * @returns void
         */
        private _initialize(): void {
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
        }
        /**
         * This method sets up the scoreboard for the scene
         * 
         * @method setupScoreboard
         * @returns void
         */
        private setupScoreboard(): void {
            // initialize  score and health values
            score = 0;
            health = 3;

            // Add health Label
            this.healthLabel = new createjs.Text(
                "LIVES: " + health,
                "25px 'Press Start 2P'",
                "#000000"
            );
            this.healthLabel.x = config.Screen.WIDTH * 0.1;
            this.healthLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.healthLabel);
            console.log("Added health Label to stage");

            // Add Score Label
            this.scoreLabel = new createjs.Text(
                "SCORE: " + score,
                "25px 'Press Start 2P'",
                "#000000"
            );
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.scoreLabel);
            console.log("Added Score Label to stage");
        }

        private addLight(): void {
            this.ambientLight = new AmbientLight(0xf0f0f0);
            this.add(this.ambientLight);
        }

        private addGround(): void {
            // Ground Object
            this.groundTexture = new THREE.TextureLoader().load('../../Assets/images/lava.png');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(8, 16);

            this.groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/lavaMap.png');
            this.groundTextureNormal.wrapS = THREE.RepeatWrapping;
            this.groundTextureNormal.wrapT = THREE.RepeatWrapping;
            this.groundTextureNormal.repeat.set(8, 16);

            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundMaterial.bumpMap = this.groundTextureNormal;
            this.groundMaterial.bumpScale = 0.2;

            this.groundGeometry = new BoxGeometry(32, 1, 200);
            this.groundPhysicsMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.ground = new Physijs.ConvexMesh(this.groundGeometry, this.groundPhysicsMaterial, 0);
            this.ground.position.set(0, 0, -64);
            this.ground.receiveShadow = true;
            this.ground.name = "Lava";
            this.add(this.ground);
        }

        private addWalls(): void {
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
            this.sideWallTexture.repeat.set(5, 1);

            this.sideWallTextureNormal = new THREE.TextureLoader().load('../../Assets/images/wallMap.jpg');
            this.sideWallTextureNormal.wrapS = THREE.RepeatWrapping;
            this.sideWallTextureNormal.wrapT = THREE.RepeatWrapping;
            this.sideWallTextureNormal.repeat.set(5, 1);

            this.sideWallMaterial = new PhongMaterial();
            this.sideWallMaterial.map = this.sideWallTexture;
            this.sideWallMaterial.bumpMap = this.sideWallTextureNormal;

            // right wall object
            this.rWallGeometry = new BoxGeometry(1, 16, 200);
            this.rWallPhysicsMaterial = Physijs.createMaterial(this.sideWallMaterial, 0, 0);
            this.rWall = new Physijs.ConvexMesh(this.rWallGeometry, this.rWallPhysicsMaterial, 0);
            this.rWall.position.set(16, 8, -64);
            this.rWall.receiveShadow = true;
            this.rWall.name = "Wall";
            this.add(this.rWall);

            // left wall object
            this.lWallGeometry = new BoxGeometry(1, 16, 200);
            this.lWallPhysicsMaterial = Physijs.createMaterial(this.sideWallMaterial, 0, 0);
            this.lWall = new Physijs.ConvexMesh(this.lWallGeometry, this.lWallPhysicsMaterial, 0);
            this.lWall.position.set(-16, 8, -64);
            this.lWall.receiveShadow = true;
            this.lWall.name = "Wall";
            this.add(this.lWall);

            // far wall object
            this.fWallGeometry = new BoxGeometry(32, 16, 1);
            this.fWallPhysicsMaterial = Physijs.createMaterial(this.WallMaterial, 0, 0);
            this.fWall = new Physijs.ConvexMesh(this.fWallGeometry, this.fWallPhysicsMaterial, 0);
            this.fWall.position.set(0, 8, -162);
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
        }

        private addPlayer(): void {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 4, 2);
            this.playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);

            this.player = new Physijs.BoxMesh(this.playerGeometry, this.playerMaterial, 1);
            this.player.position.set(0, 5, 16);
            this.player.receiveShadow = true;
            this.player.castShadow = true;
            this.player.name = "Player";
            this.add(this.player);
        }

        private addStartPlatform(): void {
            //startPlatform
            var startPlatform = new Physijs.ConvexMesh(
                new BoxGeometry(10, 1, 10),
                Physijs.createMaterial(new LambertMaterial()),
                0
            );
            startPlatform.position.set(0, 1, 16);
            startPlatform.name = "Ground";
            this.add(startPlatform);
        }

        private addEndPlatform(): void {
            //end
            var end = new Physijs.ConvexMesh(
                new BoxGeometry(3, 2, 3),
                Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 })),
                0
            );
            end.position.set(0, 1, -150);
            end.name = "Finish";
            this.add(end);
        }

        //add random blocks to scene
        private addBlocks(): void {
            var self = this;

            this.blocks = new Array<Physijs.ConvexMesh>();

            for (var i: number = 0; i < self.blockCount; i++) {
                var x: number = Math.random() * 10 + 1;
                var z: number = Math.random() * 10 + 1;
                self.blocks[i] = new Physijs.ConvexMesh(
                    new BoxGeometry(x, 1, z),
                    Physijs.createMaterial(new LambertMaterial()),
                    0
                );
                var rand: number = Math.floor(Math.random() * 20) - 10;
                self.blocks[i].position.set(rand, 1, i * -15);
                self.blocks[i].name = "Ground";
                self.add(self.blocks[i]);
            }
        }
        /**
         * This method adds a coin to the scene
         * 
         * @method addCoinMesh
         * @return void
         */
        private addCoinMesh(): void {
            var self = this;

            this.coins = new Array<Physijs.ConvexMesh>(); // Instantiate a convex mesh array

            var coinLoader = new THREE.JSONLoader().load("../../Assets/imported/coin.json", function (geometry: THREE.Geometry) {
                var phongMaterial = new PhongMaterial({ color: 0xE7AB32 });
                phongMaterial.emissive = new THREE.Color(0xE7AB32);

                var coinMaterial = Physijs.createMaterial((phongMaterial), 0.4, 0.6);

                for (var count: number = 0; count < self.coinCount; count++) {
                    self.coins[count] = new Physijs.ConvexMesh(geometry, coinMaterial);
                    self.coins[count].receiveShadow = true;
                    self.coins[count].castShadow = true;
                    self.coins[count].name = "Coin";
                    self.coins[count].position.x = self.blocks[count * 2].position.x;
                    self.coins[count].position.y = 5;
                    self.coins[count].position.z = self.blocks[count * 2].position.z;
                    self.add(self.coins[count]);
                    console.log("Added Coin Mesh to Scene, at position: " + self.coins[count].position);
                }
            });
        }

        /**
         * This method randomly sets the coin object's position
         * 
         * @method setCoinPosition
         * @return void
         */
        private setCoinPosition(coin: Physijs.ConvexMesh): void {
            var randomPointX: number = Math.floor(Math.random() * 20) - 10;
            var randomPointY: number = Math.random() * 50 + 30;
            var randomPointZ: number = Math.random() * -100;
            coin.position.set(randomPointX, randomPointY, randomPointZ);
            this.add(coin);
        }

        /**
         * Event Handler method for any pointerLockChange events
         * 
         * @method pointerLockChange
         * @return void
         */
        pointerLockChange(event): void {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            } else {
                if (this.gameOver) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                } else {
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
        }

        /**
         * Event handler for PointerLockError
         * 
         * @method pointerLockError
         * @return void
         */
        private pointerLockError(event): void {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        }

        // Check Controls Function

        /**
         * This method updates the player's position based on user input
         * 
         * @method checkControls
         * @return void
         */
        private checkControls(): void {
            if (this.keyboardControls.enabled) {
                this.velocity = new Vector3();

                var time: number = performance.now();
                var delta: number = (time - this.prevTime) / 1000;

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
        }

        private _unpauseSimulation(): void {
            scene.onSimulationResume();
            console.log("resume simulation");
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++

        /**
         * The start method is the main method for the scene class
         * 
         * @method start
         * @return void
         */
        public start(): void {
            // Set Up Scoreboard
            this.setupScoreboard();

            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;



            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;

                this.instructions.addEventListener('click', () => {

                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");

                    this.element.requestPointerLock = this.element.requestPointerLock ||
                        this.element.mozRequestPointerLock ||
                        this.element.webkitRequestPointerLock;

                    this.element.requestPointerLock();
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

            // Collision Check
            this.player.addEventListener('collision', function (event) {
                if (event.name === "Ground") {
                    createjs.Sound.play("land");
                    this.isGrounded = true;
                    this.jumpHeight = this.player.position.y;
                    //sendBall();
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
                    } else {
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
                }
                if (event.name === "Finish") {
                    // Exit Pointer Lock
                    document.exitPointerLock();
                    this.children = [];
                    this._isGamePaused = true;
                    //this.gameOver = true;
                    // Play the Game Win Scene
                    currentScene = config.Scene.PLAY2;
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
        }

        /**
         * Camera Look function
         * 
         * @method cameraLook
         * @return void
         */
        private cameraLook(): void {
            var zenith: number = THREE.Math.degToRad(90);
            var nadir: number = THREE.Math.degToRad(-90);

            var cameraPitch: number = camera.rotation.x + this.mouseControls.pitch;

            // Constrain the Camera Pitch
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
        }

        /**
         * @method update
         * @returns void
         */
        public update(): void {

            this.coins.forEach(coin => {
                coin.setAngularFactor(new Vector3(0, 0, 0));
                coin.setAngularVelocity(new Vector3(0, 1, 0));
            });

            this.player.setAngularFactor(new Vector3(0, 0, 0));

            this.checkControls();
            this.stage.update();

            if (!this.keyboardControls.paused) {
                this.simulate();
            }

        }

        /**
         * Responds to screen resizes
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            canvas.style.width = "100%";
            this.healthLabel.x = config.Screen.WIDTH * 0.1;
            this.healthLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        }
    }
}
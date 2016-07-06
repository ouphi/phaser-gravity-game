var game;
function fullScreenAndLaunchGame() {
    $("body > *").remove();
    launchGame();
}

function launchGame(){
     var width = 1160;
    var height = 720;


        game = new Phaser.Game(width, height, Phaser.AUTO, 'jeu', { preload: preload, create: create, update: update, render: render });
        var ball;
                
        function preload () {
            game.stage.backgroundColor = '#fff4d9';
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignVertically = true;
            //game.scale.setScreenSize(true);
            game.load.image('kenney', 'assets/tilemaps/tiles/kenney.png');
            game.load.tilemap('map', 'assets/tilemaps/maps/gnama.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('block', 'assets/sprites/block.png');
            game.load.image('wizball', 'assets/sprites/shinyball.png');
            game.load.image('tetrisblock1', 'assets/sprites/tetrisblock1.png');
            game.load.image('hadoopblock1', 'assets/sprites/hadoop1.png');
            game.load.image('sky', 'assets/skies/sky1.png');
            game.load.image('level1', 'assets/sprites/level1.png')
            game.load.image('tetrisT', 'assets/sprites/tetrisT.png');

            //every json physics config for each objects : 
            game.load.physics('physicsData', 'assets/physics/sprites.json');

        }

                
        function startDrag(element_sprite) {
            //  You can't have a sprite being moved by physics AND input, so we disable the physics while being dragged
            element_sprite.body.moves = false;
            console.log('startdrag');
        }

        function stopDrag(element_sprite) {
            //  And re-enable it upon release
            element_sprite.body.moves = true;
            console.log('stopdrag');
        }

    var result = '';
    var point = '';
    var temps = 0;
function create() {
    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.1;



    var sky = game.add.image(0, 0, 'sky');
    sky.fixedToCamera = true;
    sky.width = game.width;
    sky.height = game.height;

    //map = game.add.tilemap('map');
    //map.addTilesetImage('kenney');
    //layer = map.createLayer('Tile Layer 1');
    //layer.resizeWorld();
    //game.physics.p2.convertTilemap(map, layer);

    //var slopeMap = { '111': 2, '1': 1, '8': 1, '48': 1, '34': 1, '47': 1, '66': 1, '147': 1, '5': 1, '29': 1, '133': 1, '43': 1 };
    //tiles = game.physics.p2.convertTilemap(map, layer, slopeMap);
    //map.setCollisionBetween(1,70);



    //add sprites : 
    //block = game.add.sprite(500, 200, 'block');
    wizball = game.add.sprite(30, 70, 'wizball');
    tetris1 = game.add.sprite(100, 200, 'tetrisblock1');
    hadoop1 = game.add.sprite(1040, 640, 'hadoopblock1');
    level1 = game.add.sprite(300, 200, 'level1');
    tetrisT = game.add.sprite(700, 400, 'tetrisT');
    //ball = game.add.sprite(500, 500, 'wizball');

    //  Enable the physics bodies on all the sprites
    game.physics.p2.enable([ wizball, tetris1, hadoop1, level1, tetrisT ], false);
    game.physics.p2.gravity.y = 1000;

    //  The following just loads the polygon data into the objects

    hadoop1.body.clearShapes();
    hadoop1.body.loadPolygon('physicsData', 'hadoopblock1');
    hadoop1.body.static = true;

    level1.body.clearShapes();
    level1.body.loadPolygon('physicsData', 'level1');
    level1.body.static = true;



    wizball.body.setCircle(15);
    wizball.body.static = true;


    tetris1.body.clearShapes();
    tetris1.body.loadPolygon('physicsData', 'tetrisblock1');
    tetris1.body.mass = 10;
    tetris1.inputEnabled = true;   
    tetris1.input.enableDrag(true);

    tetrisT.body.clearShapes();
    tetrisT.body.loadPolygon('physicsData', 'tetrisT');
    tetrisT.inputEnabled = true;   
    tetrisT.input.enableDrag(true); 
    tetrisT.body.mass = 4000;

    cursors = game.input.keyboard.createCursorKeys();

    //addKeys( { 'start': Phaser.KeyCode.W } );
        

    tetris1.inputEnabled = true;
    tetris1.input.enableDrag(true);
    tetris1.events.onDragStart.add(function(){startDrag(tetris1)}, this);
    tetris1.events.onDragStop.add(function(){stopDrag(tetris1)}, this);

    tetrisT.inputEnabled = true;
    tetrisT.input.enableDrag(true);
    tetrisT.events.onDragStart.add(function(){startDrag(tetrisT)}, this);
    tetrisT.events.onDragStop.add(function(){stopDrag(tetrisT)}, this);
     wizball.body.onBeginContact.add(blockHit, this);


}

function gofull() {

if (!game.scale.isFullScreen)
    {
        game.scale.startFullScreen(false);
    }

}

function render() {

game.debug.text(result, 400, 400);
temps = Math.round(this.game.time.totalElapsedSeconds()*100)/100
game.debug.text('Time: ' + temps, 32, 32);

game.debug.text(point, 600, 500);

}


 function blockHit (body, bodyB, shapeA, shapeB, equation) {

    //  The block hit something.
    //  
    //  This callback is sent 5 arguments:
    //  
    //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
    //  The p2.Body this Body is in contact with.
    //  The Shape from this body that caused the contact.
    //  The Shape from the contact body.
    //  The Contact Equation data array.
    //  
    //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
    if (body)
    {
        if(body.sprite.key == 'hadoopblock1')
        {
            result = 'INDICE';
            point = 'Vous avez gagné ' + Math.round((1/temps) * 100) + 'points'

    
        }
    }

}




function update() {

  // Stretch to fill
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Keep original size
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    // Maintain aspect ratio
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.input.onDown.add(gofull, this);

wizball.body.onBeginContact.add(blockHit, this);
    wizball.body.moves = false;

    //tetrisT.body.setZeroVelocity();


    if( tetris1.input.isDragged ){
                //BODY => follow pointer
                if( tetris1.body != null ){
                    tetris1.body.x = game.input.activePointer.worldX;
                    tetris1.body.y = game.input.activePointer.worldY;

                }
            }

            if( tetrisT.input.isDragged ){
                //BODY => follow pointer
                if( tetrisT.body != null ){
                    tetrisT.body.x = game.input.activePointer.worldX;
                    tetrisT.body.y = game.input.activePointer.worldY;
                }
            }

   /* if (cursors.left.isDown)
    {
        block.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
        block.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
        block.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
        //block.body.moveDown(200);
        wizball.body.static = false;
    }*/

    if (cursors.down.isDown)
    {
        game.physics.p2.restitution = 0.9;
        game.physics.p2.gravity.y = 300;
        tetrisT.body.static =true;
        wizball.body.static = false;
        tetrisT.body.static =true;


    }


}

    setTimeout(function(){
        console.log(screen.width)
        console.log(width)
        console.log(screen.width/width)

        console.log(screen.height)
        console.log(height)
        console.log(screen.height/height)
        //$("body > canvas").css("transform","scaleX("+ (screen.width/width) +") scaleY("+ (screen.height/height) +")");
        $("body > canvas").addClass("visible");
    }, 100);

}


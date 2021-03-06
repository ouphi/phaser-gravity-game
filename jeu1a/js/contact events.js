var game;
function fullScreenAndLaunchGame() {
    $("body > *").remove();
    launchGame();
}

function launchGame(){
     var width = 1920;
    var height = 1080;


        game = new Phaser.Game(width, height, Phaser.AUTO, 'jeu', { preload: preload, create: create, update: update, render: render });
        var ball;
                
        function preload () {
            game.stage.backgroundColor = '#fff4d9';
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignVertically = true;
            //game.scale.setScreenSize(true);
            //game.load.image('kenney', 'assets/tilemaps/tiles/kenney.png');
            //game.load.tilemap('map', 'assets/tilemaps/maps/gnama.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('block', 'assets/sprites/block.png');
            game.load.image('wizball', 'assets/sprites/shinyball.png');
            game.load.image('tetrisblock1', 'assets/sprites/tetrisblock1.png');
            game.load.image('hadoopblock1', 'assets/sprites/hadoop1.png');

            game.load.image('bord_gauche','assets/sprites/bord_gauche.png');
            game.load.image('bord_droit','assets/sprites/bord_droit.png');
            //game.load.image('bord_haut','assets/sprites/bord_haut.png');
            game.load.image('bord_bas2','assets/sprites/bord_bas2.png');
            game.load.image('bord_haut2', 'assets/sprites/bord_haut2.png');

            //game.load.image('sky', 'assets/skies/sky1.png');
            //game.load.image('level1', 'assets/sprites/level1.png')
            game.load.image('tetrisT', 'assets/sprites/tetrisT.png');


            game.load.image('catourne', 'assets/sprites/catourne.png');




            //every json physics config for each objects : 
            game.load.physics('physicsData', 'assets/physics/sprites.json');
            game.load.physics('bord_gauche_data', 'assets/physics/bord_gauche.json');
            game.load.physics('bord_droit_data', 'assets/physics/bord_droit.json');
            //game.load.physics('bord_haut_data', 'assets/physics/bord_haut.json');
            game.load.physics('bord_bas2_data', 'assets/physics/bord_bas2.json');
            game.load.physics('bord_haut2_data', 'assets/physics/bord_haut2.json');

            game.load.physics('catourne_data', 'assets/physics/catourne.json');


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

        //add key

         key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);
    key1.onDown.add(moveHadoop, this);



    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.1;



    //var sky = game.add.image(0, 0, 'sky');
    //sky.fixedToCamera = true;
    //sky.width = game.width;
    //sky.height = game.height;

    //map = game.add.tilemap('map');
    //map.addTilesetImage('kenney');
    //layer = map.createLayer('Tile Layer 1');
    //layer.resizeWorld();
    //game.physics.p2.convertTilemap(map, layer);

    //var slopeMap = { '111': 2, '1': 1, '8': 1, '48': 1, '34': 1, '47': 1, '66': 1, '147': 1, '5': 1, '29': 1, '133': 1, '43': 1 };
    //tiles = game.physics.p2.convertTilemap(map, layer, slopeMap);
    //map.setCollisionBetween(1,70);



    //add sprites : 

    bord_gauche = game.add.sprite(90,1080/2, 'bord_gauche');
    bord_droit = game.add.sprite(1870,540, 'bord_droit');
    //bord_haut = game.add.sprite(width/2-3,47, 'bord_haut');
    bord_haut2 = game.add.sprite(width/2,188, 'bord_haut2');
    bord_bas2 = game.add.sprite(width/2-3,height-71, 'bord_bas2');

    //block = game.add.sprite(500, 200, 'block');
    wizball = game.add.sprite(30, 70, 'wizball');
    tetris1 = game.add.sprite(100, 200, 'tetrisblock1');
    hadoop1 = game.add.sprite(1040, 640, 'hadoopblock1');
    //level1 = game.add.sprite(300, 200, 'level1');
    tetrisT = game.add.sprite(700, 400, 'tetrisT');
    wheel1 = game.add.sprite(1000,1000,'tetrisT');

    catourne = game.add.sprite(800,800, 'catourne');

    //ball = game.add.sprite(500, 500, 'wizball');

    //  Enable the physics bodies on all the sprites
    game.physics.p2.enable([ wizball, tetris1, hadoop1, tetrisT, wheel1 ,bord_gauche, bord_droit, bord_bas2, bord_haut2, catourne], false);
    game.physics.p2.gravity.y = 1000;

    //  The following just loads the polygon data into the objects

    catourne.body.clearShapes();
    catourne.body.loadPolygon('catourne_data', 'catourne');
    catourne.body.static = true;

    hadoop1.body.clearShapes();
    hadoop1.body.loadPolygon('physicsData', 'hadoopblock1');
    hadoop1.body.static = true;

    //level1.body.clearShapes();
    //level1.body.loadPolygon('physicsData', 'level1');
    //level1.body.static = true;

    wizball.body.setCircle(15);
    wizball.body.static = true;

    catourne.body.clearShapes();
    catourne.body.loadPolygon('catourne_data', 'catourne');
    catourne.body.static = true;
    catourne.inputEnabled = true;   
    catourne.input.enableDrag(true);

    bord_gauche.body.clearShapes();
    bord_gauche.body.loadPolygon('bord_gauche_data', 'bord_gauche');
    bord_gauche.body.static = true;

     bord_droit.body.clearShapes()
    bord_droit.body.loadPolygon('bord_droit_data', 'bord_droit');
    bord_droit.body.static = true;

    /*bord_haut.body.clearShapes();
    bord_haut.body.loadPolygon('bord_haut_data', 'bord_haut');
    bord_haut.body.static = true;*/

    bord_haut2.body.clearShapes();
    bord_haut2.body.loadPolygon('bord_haut2_data', 'bord_haut2');
    bord_haut2.body.static = true;

    bord_bas2.body.clearShapes();
    bord_bas2.body.loadPolygon('bord_bas2_data', 'bord_bas2');
    bord_bas2.body.static = true;


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

    //wheel 
    wheel1.body.clearShapes();
    wheel1.body.loadPolygon('physicsData', 'tetrisT');
    wheel1.body.static = true;


    li_drag = [catourne];

        for (var i in li_drag) {
        
        li_drag[i].inputEnabled = true;
    li_drag[i].input.enableDrag(true);
    li_drag[i].events.onDragStart.add(function(){startDrag(li_drag[i])}, this);
    li_drag[i].events.onDragStop.add(function(){stopDrag(li_drag[i])}, this);

    }

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

    wizball.body.onBeginContact.add(function(body, bodyB) {removeBlockT(body,tetris1,tetrisT)}, this);

    wizball.body.onBeginContact.add(launchBall,this);

    //spring = game.physics.p2.createSpring(level, tetrisT, 20, 10, 1);
     //game.physics.p2.removeSpring(spring);

}

function gofull() {

if (!game.scale.isFullScreen)
    {
        game.scale.startFullScreen(false);
    }

}

function launchBall(body, bodyB, shapeA, shapeB, equation) {
    if(body)
    {
        if(body.sprite.key == 'tetrisT')
        {  
            wizball.body.static = false;

        }
    }

}

function render() {
game.debug.text(result, 400, 400);
temps = Math.round(this.game.time.totalElapsedSeconds()*100)/100
game.debug.text('Time: ' + temps, 32, 32);
game.debug.text(point, 600, 500);
}

/*receive a list of sprite and make them static (cant move, no gravity)*/
function setElementsAsStatic(list_sprite)
{
    for (var i in list_sprite) {
        list_sprite[i].body.static = true;
    }
}

function setElementsAsDraggable(list_sprite)
{
    for (var i in list_sprite)
    {
    list_sprite[i].inputEnabled = true;
    list_sprite[i].input.enableDrag(true);
    list_sprite[i].events.onDragStart.add(function(){startDrag(list_sprite[i])}, this);
    list_sprite[i].events.onDragStop.add(function(){stopDrag(list_sprite[i])}, this);
    }
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
            point = 'Vous avez gagné ' + Math.round((1/temps) * 100) + ' points'

    
        }
    }

}

function removeBlockT(body, target1, target2) {

    if(body)
    {
        if(body.sprite.key == target1.body.sprite.key)
        {
            target2.kill();
        }

    }

}

function dragElements(elements)
{
        for (var i in elements) {
        //console.log('elements :' + elements[i]);

        if( elements[i].input.isDragged ){
                //BODY => follow pointer
                if( elements[i].body != null ){
                    elements[i].body.x = game.input.activePointer.worldX;
                    elements[i].body.y = game.input.activePointer.worldY;

                    if(cursors.left.isDown)
                    {
                        elements[i].body.rotateLeft(100);

                    } 
                    else if(cursors.right.isDown)
                    {
                        elements[i].body.rotateRight(100);
                        
                    }
                    else elements[i].body.rotateLeft(0);

                }
            }
        }
}


function moveHadoop()
{
    hadoop1.body.moveRight(500);
}




function update() {

    wheel1.body.rotateRight(50);

    catourne.anchor.setTo(0.5,0.5);
    catourne.body.rotateRight(50);

  // Stretch to fill
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Keep original size
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    // Maintain aspect ratio
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.input.onDown.add(gofull, this);
    wizball.body.onBeginContact.add(blockHit, this);
    wizball.body.moves = false;
    dragElements([tetris1, tetrisT, catourne]);
   

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
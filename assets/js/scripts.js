
/*
 * Custom scripts
 */

window.onload = function(){

(function (window, document, undefined) {
    let wHeight = window.innerHeight;
    let wWidth = window.innerWidth;

  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;
     var balls = [];
    var engine = Engine.create();
     var world = engine.world;
    var render = Render.create({
                element: document.body,
                engine: engine,
                options: {
                    width: wWidth,
                    height: wHeight,
                    wireframes: false
                }
             });

    /**
     * Generate ramdom colors for the Charts (not to be use in production)
     * @param {array} arr 
     * @param {string} item
     */
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
              
    function myBall() {
        this.ball = Bodies.circle(460, 10, 40, {
              density: 0.001,
              friction: 0.01,
              frictionAir: 0.00001,
              restitution: 0,
              render: {
                fillStyle: getRandomColor(),
                strokeStyle: 'transparent',
                lineWidth: 20
              }
        });
        World.add(world, this.ball);
    }

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    var ground = Bodies.rectangle(960, wHeight - 10, wWidth, 10, { isStatic: true });
    var left = Bodies.rectangle(0, 500, 10, wHeight, { isStatic: true });
    var right = Bodies.rectangle(wWidth, 500, 10, wHeight, { isStatic: true });

    World.add(engine.world, [ground, left, right]);

    function draw(){
        new myBall();
        // Engine.update(engine);
    }    

    var drawInterval =  window.setInterval(draw, 50);
    setTimeout(function( ) { clearInterval( drawInterval ); }, 20000);
 
// World.add(engine.world, [boxA, ballA, ballB, ground]);
 
Engine.run(engine);
Render.run(render);

})(window, document);


}



// $(function () {

// alert(document.window);
//     // let xxx = _.chunk(['a', 'b', 'c', 'd'], 2);

//     // console.log(xxx);

    

// });
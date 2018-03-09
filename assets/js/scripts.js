
/*
 * Custom scripts
 */


window.onload = function(){

        let wHeight = window.innerHeight;
        let wWidth  = window.innerWidth;

        let Engine          = Matter.Engine,
            Render          = Matter.Render,
            World           = Matter.World,
            MouseConstraint = Matter.MouseConstraint,
            Mouse           = Matter.Mouse,
            Bodies          = Matter.Bodies,
            engine          = Engine.create(),
            world           = engine.world,
            render          = Render.create({
                                element: document.body,
                                engine: engine,
                                options: {
                                    width: wWidth,
                                    height: wHeight,
                                    wireframes: false
                                }
                             });

        /**
         * Generate ramdom colors for the balls background
         */
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        /**
         * Balls Constructor
         */ 
        function createBall(x, y, r) {
            let options = {
                density: 0.00001,
                friction: 0,
                frictionAir: 0.00001,
                restitution: 0.6,
                render: {
                    fillStyle: getRandomColor(),
                    strokeStyle: 'transparent',
                    lineWidth: 30
                }
            }

            this.ball = Bodies.circle( x, y, r, options );
            World.add(world, this.ball);
        }

        /**
         * Mouse control
         */ 
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

        // Creating bodies
        var ground = Bodies.rectangle(wWidth/2, wHeight - 10, wWidth + 400, 10, { isStatic: true });
        var leftWall = Bodies.rectangle(0, 500, 10, wHeight, { isStatic: true });
        var rightWall = Bodies.rectangle(wWidth, 500, 10, wHeight, { isStatic: true });

        World.add(engine.world, [ground, leftWall, rightWall]);

        function draw(){
            new createBall(460, 10, 40);
        }    

        var drawInterval = window.setInterval(draw, 50);
        setTimeout( function() { clearInterval( drawInterval ); }, 20000 );
     
        Engine.run(engine);
        Render.run(render);


        // Matter.Events.on(mouseConstraint, "mousedown", function(){
        //     console.log("whoop");
        // })
        // function mousePressed() {
        //   new createBall(460, 10, 40);
        // }

}

// global variables
var renderer;
var scene;
var camera;

var composer,
    clock;

var orbit;

var particles;

var showGeo,
    mainGeo,
    articlesGeo,
    categoriesGeo,
    achievesGeo,
    tagsGeo;

var geos = {
    show: null,
    main: null,
    articles: null,
    categories: null,
    achieves: null,
    tags: null
};

var animationFrame;

var decorationObj;

var maxLength;

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var DURATION = 800,
    DELAY_BETWEEN_RATIO = 0.35;

function init(parentSelector) {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.008);

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

    // position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = -50;
    camera.position.z = 100;
    camera.lookAt(scene.position);

    // postprocessing

	composer = new THREE.EffectComposer( renderer );
    var renderPass = new THREE.RenderPass( scene, camera );

	var shaderPass = new THREE.ShaderPass( THREE.FocusShader );
    shaderPass.uniforms.screenWidth.value = window.innerWidth;
    shaderPass.uniforms.screenHeight.value = window.innerHeight;
    shaderPass.renderToScreen = true;

	var bloomPass = new THREE.BloomPass( 1.15 );

    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(shaderPass);

    // composer = new POSTPROCESSING.EffectComposer(renderer);
    // composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
    //
    // var pass = new POSTPROCESSING.BloomPass({
    //     intensity: 2.0
    // });
    // pass.renderToScreen = true;
    // composer.addPass(pass);

    // var pass = new POSTPROCESSING.BokehPass(camera, {
    //     focus: 0.03,
    //     blur: 0.9,
    //     aperture: 0.07
    // });
    // pass.renderToScreen = true;
    // composer.addPass(pass);

    // clock = new THREE.Clock();
    loadModels(function() {
        addShowGeo();
        addDecorationGeo();

        setTimeout(function() {
            becomeMain();
            playDecoration();
        }, 1000);

        setTimeout(function() {
            // becomeArticles();
        }, 5000);

        // add the output of the renderer to the html element
        document.querySelector(parentSelector).appendChild(renderer.domElement);

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

        window.addEventListener( 'resize', onWindowResize, false );

        // call the render function
        render();
    });

    return renderer.domElement;
}

function addShowGeo() {
    var mainLength = mainGeo.vertices.length,
        articlesLength = articlesGeo.vertices.length;
    maxLength = Math.max(mainLength, articlesLength);
    showGeo = new THREE.Geometry();
    geos.show = showGeo;

    for (var i = 0; i < maxLength; i++) {
        (function(i) {
            showGeo.vertices.push(new THREE.Vector3(Math.floor(200 * Math.random() - 100), Math.floor(200 * Math.random() - 100), Math.floor(200 * Math.random() - 100)));
            showGeo.vertices[i].tween = new TWEEN.Tween({
                                                x: showGeo.vertices[i].x,
                                                y: showGeo.vertices[i].y,
                                                z: showGeo.vertices[i].z
                                            })
                                            .easing(TWEEN.Easing.Exponential.In)
                                            .onUpdate(function() {
                                                // showGeo.vertices[i] = new THREE.Vector3(this.x, this.y, this.z);
                                                showGeo.vertices[i].set(this.x, this.y, this.z);
                                                showGeo.verticesNeedUpdate = true;
                                            });
        })(i)
    }
    var texture = new THREE.TextureLoader().load( "public/assets/gradient.png" );
    var material = new THREE.PointsMaterial({
        size: 1,
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        blending: THREE.AdditiveBlending,
    });
    var dot = new THREE.Points(showGeo, material);

    scene.add(dot);
}

function addDecorationGeo() {
    var decorationGeo = new THREE.Geometry();

    for (var i = 0; i < 500; i++) {
        (function(i) {
            decorationGeo.vertices.push(new THREE.Vector3(100, Math.floor(200 * Math.random() - 100), Math.floor(200 * Math.random() - 100)));
            decorationGeo.vertices[i].tween = new TWEEN.Tween({
                                                x: decorationGeo.vertices[i].x
                                            })
                                            .to({
                                                x: -100
                                            }, 20000)
                                            .delay(20000 * Math.random())
                                            .onUpdate(function() {
                                                // decorationGeo.vertices[i] = new THREE.Vector3(this.x, this.y, this.z);
                                                decorationGeo.vertices[i].x = this.x;
                                                decorationGeo.verticesNeedUpdate = true;
                                            })
                                            .repeat(Infinity)
                                            .start();
        })(i)
    }
    for (var i = 500; i < 1000; i++) {
        (function(i) {
            decorationGeo.vertices.push(new THREE.Vector3(Math.floor(200 * Math.random() - 100), -100, Math.floor(200 * Math.random() - 100)));
            decorationGeo.vertices[i].tween = new TWEEN.Tween({
                                                y: decorationGeo.vertices[i].y
                                            })
                                            .to({
                                                y: 100
                                            }, 20000)
                                            .delay(20000 * Math.random())
                                            .onUpdate(function() {
                                                // decorationGeo.vertices[i] = new THREE.Vector3(this.x, this.y, this.z);
                                                decorationGeo.vertices[i].y = this.y;
                                                decorationGeo.verticesNeedUpdate = true;
                                            })
                                            .repeat(Infinity)
                                            .start();
        })(i)
    }
    var texture = new THREE.TextureLoader().load( "public/assets/gradient.png" );
    var material = new THREE.PointsMaterial({
        size: 1,
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        blending: THREE.AdditiveBlending,
        opacity: 0.8
    });
    decorationObj = new THREE.Points(decorationGeo, material);
    scene.add(decorationObj);
}

function transformTo(type) {
    var count = 0,
        tween,
        geo = geos[type],
        length = geo.vertices.length;
    for (var i = 0; i < maxLength; i++) {
        tween = showGeo.vertices[i].tween;
        (function(i, count) {
            tween.to({
                    x: geo.vertices[count].x,
                    y: geo.vertices[count].y,
                    z: geo.vertices[count].z
                }, DURATION)
                .delay(DURATION * Math.random())
                .start();
        }(i, count))
        if (count >= length - 1) {
            count = 0;
        } else {
            count ++;
        }
    }
}

function becomeMain() {
    var count = 0,
        tween,
        mainLength = mainGeo.vertices.length;
    for (var i = 0; i < maxLength; i++) {
        tween = showGeo.vertices[i].tween;
        (function(i, count) {
            tween.to({
                    x: mainGeo.vertices[count].x,
                    y: mainGeo.vertices[count].y,
                    z: mainGeo.vertices[count].z
                }, DURATION)
                .delay(Math.floor(1000 * Math.random()) + i * DELAY_BETWEEN_RATIO)
                .start();
        }(i, count))
        if (count >= mainLength - 1) {
            count = 0;
        } else {
            count ++;
        }
        // showGeo.vertices[i] = articlesGeo.vertices[i];
    }
}

function playDecoration() {

}

function loadModels(callback) {
    var counter = 0,
        NUM_OF_MODELS = 5;
    var loader = new THREE.JSONLoader();
    loader.load("public/assets/planet.json", function (geo, mat) {
        mainGeo = geo;
        geos.main = mainGeo;
        if (++counter === NUM_OF_MODELS) {
            callback && callback();
        }
    });

    loader.load("public/assets/storm-trooper.json", function (geo, mat) {
        articlesGeo = geo;
        geos.articles = articlesGeo;
        if (++counter === NUM_OF_MODELS) {
            callback && callback();
        }
    });

    loader.load("public/assets/air-craft.json", function (geo, mat) {
        achievesGeo = geo;
        geos.achieves = achievesGeo;
        if (++counter === NUM_OF_MODELS) {
            callback && callback();
        }
    });

    loader.load("public/assets/atom.json", function (geo, mat) {
        categoriesGeo = geo;
        geos.categories = categoriesGeo;
        if (++counter === NUM_OF_MODELS) {
            callback && callback();
        }
    });

    loader.load("public/assets/iron-man.json", function (geo, mat) {
        tagsGeo = geo;
        geos.tags = tagsGeo;
        if (++counter === NUM_OF_MODELS) {
            callback && callback();
        }
    });
}

function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX ) / (1000 / camera.position.z) / 3;
	mouseY = ( event.clientY - windowHalfY ) / (1000 / camera.position.z) / 3;
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

var step = 0;
function render() {
    // renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(render);
    TWEEN.update();

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
	camera.lookAt( scene.position );

    renderer.clear();
    composer.render();
}

function stopRender() {
    cancelAnimationFrame(animationFrame);
}

export default {
    init,
    transformTo,
    stopRender,
    render
}

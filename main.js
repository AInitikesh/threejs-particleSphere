function init(){
    var scene = new THREE.Scene();
    var stats = new Stats();
    document.body.appendChild(stats.dom);
    
    
    var gui = new dat.GUI();
    
 
    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
    
    camera.position.z = 20;
	camera.position.x = 20;
	camera.position.y = 20;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    
    var particelMat = new THREE.PointsMaterial({
        color : 'rgb(255,255,255)',
        size: 0.25,
        map : new THREE.TextureLoader().load('assets/texture/particle.jpg'),
        transparent : true,
        blending : THREE.AdditiveBlending,
        depthWrite : false
        
    });
    
    var particleGeo = new THREE.SphereGeometry(10, 64, 64);
    
    particleGeo.vertices.forEach(function(particle){
        particle.x += Math.random() - 0.5;
        particle.x += Math.random() - 0.5;
        particle.z += Math.random() - 0.5;
    });
    
    var particleSystem = new THREE.Points(
        particleGeo,
        particelMat
    );
    
    particleSystem.name = 'particleSystem';
    
    scene.add(particleSystem);
    
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);
    
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    update(renderer, scene, camera, controls, stats);
    
    return scene;
}


function getSpotLight(intensity, color){
    color === undefined ? 'rgb(255,255,255)' : color
    var light = new THREE.SpotLight( 'rgb(255,255,255)' ,intensity);
    light.castShadow = true;  
    light.penumbra = 0.5;
    
    //Set up shadow properties for the light
	light.shadow.mapSize.width = 2048;  // default: 512
	light.shadow.mapSize.height = 2048; // default: 512
    light.shadow.bias = 0.001;
    
    return light;
}

function update(renderer, scene, camera, controls, stats){
    renderer.render(
        scene,
        camera
    );
    var particleSystem = scene.getObjectByName('particleSystem');
    particleSystem.rotation.x += 0.005;
    particleSystem.rotation.y += 0.005;
    
    particleSystem.geometry.verticesNeedUpdate = true;
    
    stats.update();
    
    controls.update();
    
    
    
    
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls, stats);
    });
}

var scene = init();

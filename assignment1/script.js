import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls} from "OrbitControls"

/**********
** SETUP ** 
**********/
//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight

}

/**********
** SCENE **
**********/
//Canvas
const canvas = document.querySelector('.webgl')
//Scene
const scene = new THREE.Scene()
//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(11.7, 2.1, 8.7)
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
***********/
const caveMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// cavewall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

//barrierwall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.position.set(5, -1.5, 0)
barrierWall.rotation.y = Math.PI * 0.5
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

//OBJECTS
//torusKnot
/*const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.2)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry,torusKnotMaterial)
torusKnot.position.set(6, 1.5, 0)
torusKnot.castShadow = true
scene.add(torusKnot)*/

//plane
const planeGeometry = new THREE.PlaneGeometry( 1, 1 );
const planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.position.set(6, 1.5, 0)
plane.castShadow = true 
scene.add( plane );
plane.rotation.z = 9.23399999999996;
plane.rotation.y = 9.23399999999996;

//torus
const torusGeometry = new THREE.TorusGeometry( 1.5, 0.5, 3, 200 ); 
const torusMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const torus = new THREE.Mesh( torusGeometry, torusMaterial ); 
torus.position.set(6, 1.5, 0)
torus.castShadow = true
scene.add( torus );
torus.rotation.z = 9.23399999999996;
torus.rotation.y = 9.23399999999996;

/***********
** LIGHTS **
***********/
/*
//Ambient light  
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('red')
)
scene.add(ambientLight)
*/

//Directional Light
const directionalLight = new THREE.DirectionalLight( 
    new THREE.Color('green'),
    0.5 
);
directionalLight.target = caveWall
directionalLight.position.set(8.6, 1.7, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
scene.add(directionalLight)

//Directional Light Helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*******
** UI **
********/
/*
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
    directionalLight.position.set(8.6, 1.7, 0)
    directionalLight.target = caveWall
}

// Directional Light
const lightPositionFolder = ui.addFolder('Directional Light Position')

lightPositionFolder 
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset position')
*/

/*********************
** DOM INTERACTIONS ** 
*********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// continue-reading
document.querySelector('#continue-reading').onclick = function() {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
}

// restart
document.querySelector('#restart').onclick = function() {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

    //reset domObject changes
    domObject.firstChange = false
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fourthChange = false

    //reset directional light
    directionalLight.position.set(10, 2.5, 0)
    
    //reload page when button is clicked
    window.location.reload();
}

//first change
document.querySelector('#first-change').onclick = function() {
    //console.log('first change')
    domObject.firstChange = true
    //torusKnot.rotation.y = elapsedTime
    //torusKnot.rotation.z = elapsedTime
}

//second change
document.querySelector('#second-change').onclick = function() {
    //console.log('second change')
    domObject.secondChange = true
    
}

// third change
document.querySelector('#third-change').onclick = function() {
    //console.log('third change')
    domObject.thirdChange = true
}

//fourth chnage
document.querySelector('#fourth-change').onclick = function() {
    //console.log('fourth change')
    domObject.fourthChange = true
}

/*******************
** ANIMATION LOOP **
*******************/
const clock = new THREE.Clock()

// Animate
const animation = () =>

{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    //torusKnot.rotation.y = elapsedTime
    //torusKnot.position.z = Math.sin(elapsedTime) * 2

    // update directionalLightHelper
    //directionalLightHelper.update()

    //Log camera position
    //console.log(camera.position.x)
    //console.log(camera.position.y)
    //console.log(camera.position.z)

    // Controls
    controls.update()

    //DOM INTERACTIONS
    //part 1
    if(domObject.part === 1){
        camera.position.set(1.1, 0.3, 1.3)
        camera.lookAt(-5, 0, 1)
        plane.position.x = 6
        torus.position.x = 6
        plane.scale.x = 1;
        torus.scale.x = 1;
        plane.scale.y = 1;
        torus.scale.y = 1;
        plane.scale.z = 1;
        torus.scale.z = 1;
    }

    // part 2
    if(domObject.part === 2){  
        camera.position.set(8, 2.9, 9.5)
        camera.lookAt(0,0,0)
        plane.scale.x = 0;
        torus.scale.x = 0;
        plane.scale.y = 0;
        torus.scale.y = 0;
        plane.scale.z = 0;
        torus.scale.z = 0;
    }
    //first-change
    if(domObject.firstChange) {
        //torusKnot.rotation.y = elapsedTime
        //torusKnot.rotation.z = elapsedTime
        plane.rotation.y = elapsedTime
        plane.rotation.z = elapsedTime
        torus.rotation.y = elapsedTime
        torus.rotation.z = elapsedTime
        /*console.log(plane.rotation.z)
        console.log(plane.rotation.y)
        console.log(torus.rotation.z)
        console.log(torus.rotation.y)*/
    }
    //second-change
    if(domObject.secondChange) {
        //torusKnot.position.y = Math.sin(elapsedTime * 0.5) * 6
        //plane.position.x = Math.tan(elapsedTime * 0.5) * 6
        //torus.position.x = Math.tan(elapsedTime * 0.5) * 6
        //plane.position.x -= elapsedTime * -0.005
        //torus.position.x -= elapsedTime * -0.005
        /*plane.scale.x = 4;
        torus.scale.x = 4;
        plane.scale.y = 4;
        torus.scale.y = 4;
        plane.scale.z = 4;
        torus.scale.z = 4;
        torus.position.x = 7
        plane.position.x = 7*/
        directionalLight.position.x -= elapsedTime * 0.05
    }
    //third-change
    if(domObject.thirdChange) {
        //torusKnot.position.y = 2
        directionalLight.position.x = 8.6
        plane.position.x = 6
        torus.position.x = 6
        plane.scale.x = 1;
        torus.scale.x = 1;
        plane.scale.y = 1;
        torus.scale.y = 1;
        plane.scale.z = 1;
        torus.scale.z = 1;
        clearTimeout(elapsedTime);
    }
    //fourth-change
    if(domObject.fourthChange) {
        clearTimeout(elapsedTime);
        //directionalLight.position.x -= elapsedTime * 0.005
        if (elapsedTime <= 20) {
            plane.scale.x -= elapsedTime/20;
            torus.scale.x -= elapsedTime/20;
            plane.scale.y -= elapsedTime/20;
            torus.scale.y -= elapsedTime/20;
            plane.scale.z -= elapsedTime/20;
            torus.scale.z -= elapsedTime/20;
        } else if (elapsedTime > 20) {
            plane.scale.x = 0;
            torus.scale.x = 0;
            plane.scale.y = 0;
            torus.scale.y = 0;
            plane.scale.z = 0;
            torus.scale.z = 0;
            directionalLight.position.y = elapsedTime - 100
            //setInterval.elapsedTime = 0
        }
        //console.log(elapsedTime)
        //torus.position.x = 7
        //plane.position.x = 7
        
    }

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()
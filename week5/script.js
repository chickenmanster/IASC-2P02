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
const caveFloorGeometry = new THREE.PlaneGeometry(10,10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

//OBJECTS
//torusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.2)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry,torusKnotMaterial)
torusKnot.position.set(6, 1.5, 0)
torusKnot.castShadow = true
scene.add(torusKnot)

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
    new THREE.Color('red'),
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
    torusKnot.rotation.y = elapsedTime
    torusKnot.position.z = Math.sin(elapsedTime) * 2

    // update directionalLightHelper
    //directionalLightHelper.update()

    //Log camera position
    console.log(camera.position.x)
    console.log(camera.position.y)
    console.log(camera.position.z)

    // Controls
    controls.update()

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()
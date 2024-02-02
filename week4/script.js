import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

console.log(OrbitControls)

/***********
 ** SETUP **
***********/
//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}


/***********
 ** SCENE **
************/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('orange')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(2, 2, 4)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/*************
 ** MESHES **
*************/
//Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

plane.rotation.x = Math.PI * 0.5
scene.add(plane)

// testSphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(geometry, material)

scene.add(testSphere)

const torusGeometry = new THREE.TorusKnotGeometry()
const torus = new THREE.Mesh(torusGeometry, material)

torus.position.z = -2
scene.add(torus)

/*********
 ** UI **
*********/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {}
uiObject.play = false
const uiTorus = {}
uiTorus.play = false  

// Plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')
            //Math.min(...values: number[]);

// Sphere UI
const sphereFolder = ui.addFolder('Sphere')

sphereFolder
    .add(testSphere.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('height')

sphereFolder
    .add(uiObject, 'play')
    .name('Animate sphere')  

const torusFolder = ui.addFolder('Torus')

torusFolder
    .add(torus.position, 'y')
    .min(-3)
    .max(3)
    .step(0.1)
    .name('height')

torusFolder
    .add(uiTorus, 'play')
    .name('Animate torus')

/********************
 ** ANIMATION LOOP **
*********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Rotate plane 
    //plane.rotation.x = Math.PI * elapsedTime * 0.1

    //Animate sphere
    if(uiObject.play)
    {
        testSphere.position.y = Math.sin(elapsedTime * 1) * 2
        //torus.position.y = Math.sin(elapsedTime * 1) * 2
    }
    if(uiTorus.play)
    {
        torus.position.y = Math.sin(elapsedTime * 0.7) * 2
    }

    // Controls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()
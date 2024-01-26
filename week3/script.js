import * as THREE from "three"

/*********
**SCENE**
***********/
//canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('red')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 5)
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

/********
** MESHES ** 
 */
//testSphere
const icosahedronGeometry = new THREE.IcosahedronGeometry(1)
const icosahedronMaterial = new THREE.MeshNormalMaterial()
const testIcosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial)

testIcosahedron.position.set(0,0,-5)
scene.add(testIcosahedron)
console.log(testIcosahedron)

//test cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshNormalMaterial()
const testCube = new THREE.Mesh(cubeGeometry, cubeMaterial)

testCube.position.set(0,0,-5)
scene.add(testCube)

/******************
* ANIMATION LOOP *
******************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    //console.log(elapsedTime)

    //Animate testSphere
    testIcosahedron.rotation.x = Math.sin(elapsedTime * 5) * 2
    testIcosahedron.position.y = Math.sin(elapsedTime * 2) * 2
    testIcosahedron.rotation.y = Math.sin(elapsedTime * 7) * 2
    testCube.position.x = Math.sin(elapsedTime * 2) * 5
    testCube.rotation.x = Math.sin(elapsedTime * 0.8) * 2
    testCube.rotation.y = Math.sin(elapsedTime * 2) * 2
    

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()
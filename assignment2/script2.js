import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.5,
    aspectRatio: (window.innerWidth * 0.5) / (window.innerHeight * 0.5)
}

/***********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl2')

// Scene
const scene = new THREE.Scene()
const loader = new THREE.TextureLoader().load( 'kansas.png' );
scene.background = loader;

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(0, 0, 20)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** LIGHTS **
************/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***********
** MESHES **
************/

// Cube Geometry

//const heartGeometry = new THREE.ShapeGeometry( heartShape );
const cylinderGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 0.1, 60 ); 

// Cube Materials
const orangeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('darkorange')
})
const pinkMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('silver')
})
const aquaMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('maroon')
})

const drawCylinder = (i, material) =>
{
    const cylinder = new THREE.Mesh(cylinderGeometry, material)
    cylinder.position.x = (Math.random() - 0.5) * 10// * (Math.tan(0) * 20)
    cylinder.position.z = (Math.random() - 0.5) * 10// * (Math.tan(0) * 20)
    cylinder.position.y = (i - 10)

    cylinder.rotation.x = Math.random() * 2 * Math.PI
    cylinder.rotation.y = Math.random() * 2 * Math.PI
    cylinder.rotation.z = Math.random() * 2 * Math.PI

    cylinder.randomizer = Math.random()

    scene.add(cylinder)
}

/**********************
** TEXT PARSERS & UI **
***********************/
let preset = {}

const uiobj = {
    text: '',
    textArray: [],
    term1: 'courage',
    term2: 'heart',
    term3: 'brains',
    rotateCamera: false,
    animateCoins: false
}

// Text Parsers


// Parse Text and Terms
const parseTextandTerms = () =>
{
    // Strip periods and downcase text
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()
    //console.log(parsedText)

    // Tokenize text
    uiobj.textArray = parsedText.split(/[^\w']+/)
    //console.log(uiobj.textArray)

    // Find term 1
    findTermInParsedText(uiobj.term1, orangeMaterial)

    // Find term 2
    findTermInParsedText(uiobj.term2, pinkMaterial)

    // Find term 3
    findTermInParsedText(uiobj.term3, aquaMaterial)

}

const findTermInParsedText = (term, material) =>
{
    for (let i=0; i < uiobj.textArray.length; i++)
    {
        //console.log(i, uiobj.textArray[i])
        if(uiobj.textArray[i] === term)
        {
         //console.log(i, term)
         // convert i into n, which is a value between 0 and 20
         const n = (100 / uiobj.textArray.length) * i * 0.2
         
         // call drawCube function 5 times using converted n value
         for(let a=0; a < 5; a++)
         {
            drawCylinder(n, material)
         }

        }
    }
}

// Load source text
fetch("https://raw.githubusercontent.com/kwartler/text_mining/master/Wizard_Of_Oz.txt")
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data
        parseTextandTerms()
    }
    )


// UI
const ui = new dat.GUI({
    container: document.querySelector('#parent2')
})

// Interaction Folders
    // Cubes Folder
    const heartFolder = ui.addFolder('Filter Terms')

    heartFolder
        .add(orangeMaterial, 'visible')
        .name(`${uiobj.term1}`)

    heartFolder
        .add(pinkMaterial, 'visible')
        .name(`${uiobj.term2}`)

    heartFolder
        .add(aquaMaterial, 'visible')
        .name(`${uiobj.term3}`)

    // Camera Folder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'animateCoins')
        .name('Animate Coins')

    /*cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()
console.log(scene.children)

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Orbit Controls
    controls.update()

    // Camera Rotation
   /* if(uiobj.rotateCamera)
    {
        
    }*/

    //animate hearts
    if(uiobj.animateCoins){   
        if (elapsedTime < 8) {
            for(let i=0; i < scene.children.length; i++)
            {
                if(scene.children[i].type === "Mesh")
                {
                    scene.children[i].rotation.x = (Math.random(elapsedTime * scene.children[i].randomizer) - 0.5) * 10
                    scene.children[i].rotation.y = (Math.random(elapsedTime * scene.children[i].randomizer) - 0.5) * 10
                    scene.children[i].rotation.z = (Math.random(elapsedTime * scene.children[i].randomizer) - 0.5) * 10
                    scene.children[i].position.x = elapsedTime*(Math.random() - 0.5)// * (Math.tan(0) * 20)
                    scene.children[i].position.z = elapsedTime*(Math.random() - 0.5)
                }
            }
            camera.position.x = Math.sin(elapsedTime * 2) * 16
            camera.position.z = Math.cos(elapsedTime * 2) * 16
        } else {
            for(let i=0; i < scene.children.length; i++)
            {
                if(scene.children[i].type === "Mesh")
                {
                    scene.children[i].rotation.x = Math.cos(elapsedTime * scene.children[i].randomizer) * 2
                    scene.children[i].rotation.y = Math.cos(elapsedTime * scene.children[i].randomizer) * 2
                    scene.children[i].rotation.z = Math.cos(elapsedTime * scene.children[i].randomizer) * 2
                    //scene.children[i].position.x = elapsedTime*(Math.random() - 0.5)// * (Math.tan(0) * 20)
                    //scene.children[i].position.z = elapsedTime*(Math.random() - 0.5)
                }
            }
            camera.position.x = Math.sin(elapsedTime * 0.2) * 16
            camera.position.z = Math.cos(elapsedTime * 0.2) * 16
        }
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()
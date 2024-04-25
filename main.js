import * as THREE from "three"
import { OrbitControls,RGBELoader } from "three/examples/jsm/Addons.js";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";
const hderTexture = new URL('./assests/MR_INT-003_Kitchen_Pierre.hdr', import.meta.url)
const characterHuman = new URL('./assests/Formal.gltf', import.meta.url)

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth , window.innerHeight);
document.body.appendChild(renderer.domElement)
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
camera.position.set(0,50,15);
const scene = new THREE.Scene();
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.update()

const ambientLight = new THREE.AmbientLight(0xfff, 7);
const directionalLight = new THREE.DirectionalLight(0xfff, 2);
scene.add(ambientLight);
scene.add(directionalLight);



// const loader2 = new GLTFLoader();

// let model;
// loader2.load(characterHuman.href,(gltf)=>{
//    model = gltf.scene;
//   //  model.scale.set(0,0.5,0)
//   model.position.y = -5;
//   model.castShadow = true,
//   scene.add(model);
// },undefined, (error)=>{
//   console.log(error);
// })

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.0;
const loader = new RGBELoader();
loader.load(hderTexture,(texture)=>{
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  
  // scene.environment = texture;
  
  
  const spehereMesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.MeshStandardMaterial({
      roughness:0,
      metalness:1,
      color: 0xF0FFA0,
     
    })
  )
  // scene.add(spehereMesh1)
  // spehereMesh1.position.x = -5.5; 
  
  const spehereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.MeshStandardMaterial({
      roughness:0,
      metalness:1,
      color: 0xFFEA00,
      envMap: texture,
    })
  )
  scene.add(spehereMesh)
  spehereMesh.position.x = 5.5;
  

});

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);


}
animate();

window.addEventListener('resize',(e)=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
})



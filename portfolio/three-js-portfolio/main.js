import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff) //lights from a single point (like a lightbulb)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff) //lights everything evenly (like the sun)
scene.add(pointLight, ambientLight)

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)

// scene.add(lightHelper, gridHelper)

// Controls

const controls = new OrbitControls(camera, renderer.domElement)


const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(150).fill().forEach(addStar)

// Background

const spaceTexture = new THREE.TextureLoader().load('/space.jpg')
scene.background = spaceTexture

// Avatar

const saladTexture = new THREE.TextureLoader().load('/salad.jpeg')

const salad = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: saladTexture })
)

scene.add(salad)

const moonTexture = new THREE.TextureLoader().load('/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('/normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

moon.position.z = 30
scene.add(moon)


const animate = () => {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  moon.rotation.x += 0.002
  moon.rotation.y += 0.002
  moon.rotation.z += 0.002

  controls.update()
  renderer.render(scene, camera)
}

animate()



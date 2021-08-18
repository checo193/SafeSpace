import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import { io } from "socket.io-client";
import { aWonderfulWorld } from "./aWonderfulWorld";
import Visuals from "./visuals";

export default function threeJsCanvas() {
  let myId = "";
  let updateInterval;
  const users = {};
  const controlModes = {
    sphereUserControl: false,
    carControl: true,
  };

  /**
   * UI
   */

  /******************* */

  const gui = new GUI();

  const map = {};
  document.onkeydown = document.onkeyup = (e) => {
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft"
    )
      map[e.key] = e.type === "keydown";
  };

  /**
   * add socketIO
   */
  const socket = io("http://localhost:3001");
  socket.on("connect", () => {
    console.log("connect");
  });
  window.onbeforeunload = () => {
    for (const userId of Object.keys(users)) {
      delete users[userId];
    }
    socket.disconnect();
  };
  socket.on("joined", (id, activeUsers) => {
    myId = id;
    for (const [userId, userData] of Object.entries(activeUsers)) {
      users[userId] = new THREE.Mesh(
        new THREE.SphereGeometry(1),
        new THREE.MeshStandardMaterial({
          color: 0xff0000,
        })
      );
      users[userId].name = userData.username;
      users[userId].position.copy(userData.position);
      visuals.scene.add(users[userId]);
    }
    updateInterval = setInterval(() => {
      socket.emit("update", map, controlModes);
    }, 50);
  });
  socket.on("add new user", (id, newUser) => {
    users[id] = new THREE.Mesh(
      new THREE.SphereGeometry(1),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    users[id].name = newUser.username;
    users[id].position.copy(newUser.position);
    visuals.scene.add(users[id]);
  });
  socket.on("update", (activeUsers) => {
    for (const [userId, userData] of Object.entries(activeUsers)) {
      if (users[userId]) {
        users[userId].position.copy(userData.position);
        users[userId].quaternion.copy(userData.quaternion);
      }
    }
  });

  socket.on("removePlayer", (id) => {
    visuals.scene.remove(visuals.scene.getObjectByName(users[id].name));
    // clearInterval(updateInterval);
    delete users[id];
  });

  // socket.on("active users ordered", (orderedUserList) => {
  //   console.log(orderedUserList);
  // });

  //**three.js */
  const canvas = document.querySelector("#canvas");
  const visuals = new Visuals(canvas);
  console.log(visuals);
  //

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight();
  visuals.scene.add(ambientLight);

  window.addEventListener("resize", visuals.resize);

  /**
   * Camera
   */
  // Base camera
  visuals.camera.position.set(0, 12, 12);
  visuals.camera.lookAt(new THREE.Vector3(0, 2, -4));
  visuals.scene.add(visuals.camera);

  // car
  const carMesh = visuals.createCarMesh();
  // inital position
  // carMesh.position.set(0, 0.2, 0);
  // carMesh.quaternion.set(0, 0, 0, 1);
  visuals.scene.add(carMesh);
  // car wheels
  const wheels = visuals.createWheels();
  for (const wheelMesh of wheels) {
    visuals.scene.add(wheelMesh);
  }
  socket.on("update wheels", (wheelsState, carState) => {
    // console.log(carState.position);
    // console.log(map);
    carMesh.position.copy(carState.position);
    carMesh.quaternion.copy(carState.quaternion);
    for (let i = 0; i < wheelsState.length; i++) {
      wheels[i].position.copy(wheelsState[i].position);
      wheels[i].quaternion.copy(wheelsState[i].quaternion);
    }
  });

  /************ */
  let manualControl = true; // make this a click down event to enable orbit controls
  // document.onmousedown = () => (manualControl = true);
  // document.onmouseup = () => (manualControl = false);

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    visuals.orbitControls.update();

    // update camera
    if (myId && users[myId] && !manualControl) {
      let offset = new THREE.Vector3(
        users[myId].position.x + 2,
        users[myId].position.y + 20,
        users[myId].position.z + 20
      );
      visuals.camera.position.lerp(offset, 0.2);
      visuals.camera.position.copy(offset);
      visuals.camera.lookAt(users[myId].position);
    }

    // Render
    visuals.renderer.render(visuals.scene, visuals.camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };
  tick();
}
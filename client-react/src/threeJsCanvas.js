import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import useStore from "./store";
import { io } from "socket.io-client";
import Visuals from "./visuals";
import { waitUntil } from "async-wait-until";

export default function threeJsCanvas() {
  /**
   * initialise threejs world
   **/
  const canvas = document.querySelector("#canvas");
  const visuals = new Visuals(canvas);

  /*
   * Misc
   */
  let myId = "";
  const controlModes = {
    sphereUserControl: true,
    carControl: false,
  };
  // const gui = new GUI();
  const helper = new THREE.GridHelper();
  visuals.scene.add(helper);
  const ambientLight = new THREE.AmbientLight();
  visuals.scene.add(ambientLight);

  /**
   * establish socket connection
   */
  const socket = io("http://localhost:3001/physicsNamespace");

  socket.on("connect", () => {
    console.log("Welcome to Safe Space");
  });

  /**
   * load player model
   **/
  let isLoaded = false;
  waitUntil(() => visuals.avatar.isLoaded === true).then(() => {
    isLoaded = true;
    socket.emit("model loaded");
  });
  const parameters = {
    avatarColor: "#CAAD5F",
  };
  const gui = new GUI();
  gui.addColor(parameters, "avatarColor").onChange(() => {
    visuals.avatar.mesh.children[0].children[1].material.color.set(
      parameters.avatarColor
    );
  });
  // console.log(this.avatar.mesh.children[0].children[1]);
  // visuals.avatar.mesh.children[0].children[1].material.color.set("#CAAD5F");
  // this.avatar.mesh.children[0].children[1].material.color =
  //   this.parameters.avatarColor;

  let goal;
  let temp = new THREE.Vector3();
  /***camera, inside joined if (userId === myId) block */
  // goal = new THREE.Object3D();
  // visuals.userMeshes[myId].add(goal);
  // goal.position.set(1, 10, 2);
  /*** */
  socket.on("joined", (id, activeUsers) => {
    visuals.joiningUser(id, activeUsers);
    setInterval(() => {
      socket.emit("update", visuals.map, controlModes);
    }, 50);
    useStore.setState({
      activeUsers: activeUsers,
    });
  });

  socket.on("userSpecificId", (userSpecificId) =>
    useStore.setState({ userSpecificId: userSpecificId })
  );

  socket.on("add new user", (id, newUser, activeUsers) => {
    useStore.setState({
      activeUsers: activeUsers,
    });
    visuals.addNewUser(id, newUser);
  });

  socket.on("update", (activeUsers) => {
    visuals.updateUserStates(activeUsers);
    // console.log(activeUsers);
    if (activeUsers[visuals.userId]) {
      // console.log(activeUsers[visuals.userId].connectionGradients);
      useStore.setState({
        userConnectionGradients:
          activeUsers[visuals.userId].connectionGradients,
      });
    }
  });

  socket.on("removeUser", (id) => visuals.removeUser(id));

  /************ */
  let manualControl = false; // make this a click down event to enable orbit controls
  // document.onmousedown = () => (manualControl = true);
  // document.onmouseup = () => (manualControl = false);

  const clock = new THREE.Clock();
  let oldElapsedTime = 0;
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - oldElapsedTime;
    oldElapsedTime = elapsedTime;

    // Update controls
    visuals.orbitControls.update();

    // update camera
    if (
      visuals.userId &&
      visuals.userMeshes[visuals.userId] &&
      !manualControl
    ) {
      visuals.updateAvatarModeCamera(visuals.userMeshes[visuals.userId]);
    }
    //update animaations
    if (isLoaded && (visuals.map.ArrowUp || visuals.map.ArrowDown)) {
      visuals.avatar.mixer.update(deltaTime);
    }

    // Render
    visuals.renderer.render(visuals.scene, visuals.camera);

    // Retrieve users distances for connectionGradients
    // console.log(users)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };
  tick();
}

// // car
// const carMesh = visuals.createCarMesh();
// // inital position
// carMesh.position.set(0, 0.2, 0);
// carMesh.quaternion.set(0, 0, 0, 1);
// visuals.scene.add(carMesh);
// // car wheels
// const wheels = visuals.createWheels();
// for (const wheelMesh of wheels) {
//   visuals.scene.add(wheelMesh);
// }
// socket.on("update wheels", (wheelsState, carState) => {
//   // console.log(carState.position);
//   // console.log(map);
//   carMesh.position.copy(carState.position);
//   carMesh.quaternion.copy(carState.quaternion);
//   for (let i = 0; i < wheelsState.length; i++) {
//     wheels[i].position.copy(wheelsState[i].position);
//     wheels[i].quaternion.copy(wheelsState[i].quaternion);
//   }
// });

// socket.on("active users ordered", (orderedUserList) => {
//   console.log(orderedUserList);
// });

(this["webpackJsonpclient-react"]=this["webpackJsonpclient-react"]||[]).push([[0],{59:function(e,t,s){},93:function(e,t,s){"use strict";s.r(t);var i=s(15),n=s.n(i),a=s(47),r=s.n(a),o=(s(59),s(14)),h=s(1),c=s(24),d=s(48),u=s.n(d)()((function(e){return{conn:[]}})),l=s(49),m=s(0),v=s(2),w=s(50),p=s(51),f=s(52),g=s(31),y=s(53),b=function(){function e(t){var s=this;Object(m.a)(this,e),this.canvas=t,this.scene=new h.qb,this.userMeshes={},this.avatar={},this.avatarAnimation={},this.mixers={},this.userId="",this.map={},this.hasEntered=!1,this.sizes={width:window.innerWidth,height:window.innerHeight},this.fov=75,this.near=.1,this.far=1e3,this.camera=new h.db(this.fov,this.sizes.width/this.sizes.height,this.near,this.far),this.orbitControls=new w.a(this.camera,this.canvas),this.orbitControls.enableDamping=!0,this.renderer=new h.Ib({canvas:t}),this.configRenderer(),this.setDRACOLoader(),this.setGLTFLoader(),this.loadAvatar(),this.textureLoader=new h.Cb,this.loadLandscape(),this.scene.add(this.camera),this.cameraIsInitialized=!1,window.addEventListener("resize",(function(){return s.resize()})),document.onkeydown=document.onkeyup=function(e){return s.keyboardControls(e)},this.gui=new c.a,this.addGUIcontrol(),this.raycaster=new h.nb,this.fontLoader=new h.t,this.welcomeLights=new h.w,this.welcomeText=new h.w,this.welcomeText.rotateX(-Math.PI/4),this.welcomeText.position.set(0,75,25),this.scene.add(this.welcomeLights,this.welcomeText),this.mouse=new h.Fb,this.enterText=null,window.addEventListener("mousemove",(function(e){s.mouse.x=e.clientX/s.sizes.width*2-1,s.mouse.y=-e.clientY/s.sizes.height*2+1})),window.addEventListener("click",this.enterClickHandler.bind(this),!1),this.createWelcomeScreen()}return Object(v.a)(e,[{key:"createWelcomeScreen",value:function(){this.camera.position.set(0,100,50),this.setWelcomeLight(),this.createText("Welcome",2,0,-5),this.createText("to",2,-5,-4),this.createText("SafeSpace",4,-10,-3),this.createText("Enter",2,-15,0)}},{key:"enterClickHandler",value:function(){this.raycaster.setFromCamera(this.mouse,this.camera),this.raycaster.intersectObject(this.enterText).length>0&&(console.log("Mesh clicked!"),this.hasEntered=!0)}},{key:"createText",value:function(e,t,s,i){var n=this;this.fontLoader.load("/fonts/ArkitechStencil_Regular.json",(function(a){var r=new h.Ab(e,{font:a,size:t,height:.2,curveSegments:6,bevelEnabled:!0,bevelThickness:.03,bevelSize:.02,bevelOffset:0,bevelSegments:4});r.center();var o=new h.U,c=new h.Q(r,o);c.position.set(2,2+s,2+i),console.log(c),n.welcomeText.add(c),"Enter"===e&&(n.enterText=c)}))}},{key:"setWelcomeLight",value:function(){var e=new h.fb(14537275),t=new h.gb(e);e.position.set(0,25,0),e.intensity=3,this.welcomeLights.add(e,t);var s=new h.ob(5351645,2,10,10);s.position.set(5,5,0),s.lookAt(0,0,0);var i=new y.a(s);this.welcomeLights.add(s,i),this.gui.add(s,"intensity").min(.1).max(10).step(.001)}},{key:"addGUIcontrol",value:function(){this.gui.add(this.camera.position,"x").min(-50).max(50).step(.1),this.gui.add(this.camera.position,"y").min(-50).max(250).step(.1),this.gui.add(this.camera.position,"z").min(-50).max(50).step(.1)}},{key:"initializeCamera",value:function(){this.goal=new h.ab,this.userMeshes[this.userId].add(this.goal),this.goal.position.set(.5,6,3),this.temp=new h.Gb}},{key:"updateThirdPersonViewPerspective",value:function(){if(this.carmeraIsInitialized)this.temp.setFromMatrixPosition(this.goal.matrixWorld),this.camera.position.lerp(this.temp,.2),this.camera.lookAt(this.userMeshes[this.userId].position);else{if(!this.userMeshes[this.userId])return;this.initializeCamera(),this.carmeraIsInitialized=!0}}},{key:"updateAvatarModeCamera",value:function(e){var t=new h.Gb(e.position.x+2,e.position.y+20,e.position.z+20);this.camera.position.copy(t),this.camera.lookAt(e.position)}},{key:"joiningUser",value:function(e,t){this.userId=e;for(var s=0,i=Object.entries(t);s<i.length;s++){var n=Object(o.a)(i[s],2),a=n[0],r=n[1];a===this.userId?this.userMeshes[a]=this.avatar.mesh:(this.userMeshes[a]=g.a.clone(this.avatar.mesh),this.userMeshes[a].mixer=new h.c(this.userMeshes[a]),this.userMeshes[a].mixer.timeScale=2,this.userMeshes[a].action=this.userMeshes[a].mixer.clipAction(this.avatarAnimation),this.userMeshes[a].action.play()),this.userMeshes[a].name=r.username,this.userMeshes[a].position.copy(r.position),this.scene.add(this.userMeshes[a])}}},{key:"removeUser",value:function(e){this.scene.remove(this.scene.getObjectByName(this.userMeshes[e].name)),delete this.userMeshes[e]}},{key:"keyboardControls",value:function(e){"ArrowUp"!==e.key&&"ArrowRight"!==e.key&&"ArrowDown"!==e.key&&"ArrowLeft"!==e.key||(this.map[e.key]="keydown"===e.type)}},{key:"resize",value:function(){this.sizes.width=window.innerWidth,this.sizes.height=window.innerHeight,this.camera.aspect=this.sizes.width/this.sizes.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}},{key:"updateUserStates",value:function(e){for(var t=0,s=Object.entries(e);t<s.length;t++){var i=Object(o.a)(s[t],2),n=i[0],a=i[1];this.userMeshes[n]&&(this.userMeshes[n].position.copy(a.position),this.userMeshes[n].quaternion.copy(a.quaternion),this.userMeshes[n].animationStatus=a.animationStatus)}}},{key:"addNewUser",value:function(e,t){var s=g.a.clone(this.avatar.mesh);this.userMeshes[e]=s,this.scene.add(s),this.userMeshes[e].name=t.username,this.userMeshes[e].position.copy(t.position),this.userMeshes[e].mixer=new h.c(s),this.userMeshes[e].mixer.timeScale=2,this.userMeshes[e].action=this.userMeshes[e].mixer.clipAction(this.avatarAnimation),this.userMeshes[e].action.play()}},{key:"loadAvatar",value:function(){var e=this;this.gltfLoader.load("/models/CesiumMan/CesiumMan.gltf",(function(t){e.avatarAnimation=t.animations[0],e.avatar.mesh=t.scene.children[0],e.avatar.mixer=new h.c(t.scene),e.avatar.mixer.timeScale=2,e.avatar.mesh.mixer=e.avatar.mixer,e.avatar.action=e.avatar.mixer.clipAction(e.avatarAnimation),e.avatar.mesh.scale.set(4,4,4),e.avatar.mesh.rotateZ(Math.PI),e.avatar.action.play(),e.avatar.isLoaded=!0}))}},{key:"loadLandscape",value:function(){var e=this;this.gltfLoader.load("/models/3D-landscape/NatureGradientPack2.glb",(function(t){console.log(t,"gltfff"),t.scene.scale.set(17,17,17),t.scene.children[6].position.y+=.001,e.scene.add(t.scene)}),(function(e){console.log(e.loaded/e.total*100+"% loaded")}),(function(e){console.log("An error happened")}))}},{key:"configRenderer",value:function(){this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=h.cb,this.renderer.setSize(this.sizes.width,this.sizes.height),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}},{key:"setDRACOLoader",value:function(){this.dracoLoader=new f.a,this.dracoLoader.setDecoderPath("/draco/")}},{key:"setGLTFLoader",value:function(){this.gltfLoader=new p.a,this.gltfLoader.setDRACOLoader(this.dracoLoader)}},{key:"createGround",value:function(){var e=new h.Q(new h.eb(100,100),new h.U({color:2236962}));e.rotateX(-Math.PI/2),this.scene.add(e)}},{key:"createCarMesh",value:function(){var e=new h.g(2,.6,4),t=new h.R({color:16776960,side:h.o});return new h.Q(e,t)}},{key:"createWheels",value:function(){for(var e=[],t=0;t<4;t++){var s=new h.m(.3,.3,.4,32),i=new h.S({color:13668381,emissive:11141120,side:h.o,flatShading:!0}),n=new h.Q(s,i);n.geometry.rotateZ(Math.PI/2),e.push(n)}return e}},{key:"createSphereAvatar",value:function(){return new h.Q(new h.vb(1),new h.U({color:16711680}))}}]),e}(),k=s(54);function M(){var e=document.querySelector("#canvas"),t=new b(e),s={sphereUserControl:!0,carControl:!1},i=(new c.a,new h.v);t.scene.add(i);var n=new h.a;t.scene.add(n);var a=Object(l.io)("https://safe-space-webrtc.herokuapp.com/physicsNamespace");a.on("connect",(function(){console.log("Welcome to Safe Space")}));Object(k.a)((function(){return!0===t.avatar.isLoaded})).then((function(){!0,a.emit("model loaded")}));var r=!1;a.on("joined",(function(e,s){t.joiningUser(e,s),r=!0})),a.on("add new user",(function(e,s){return t.addNewUser(e,s)})),a.on("update",(function(e){t.updateUserStates(e)})),a.on("new distances",(function(e){for(var t=[],s=0,i=Object.entries(e);s<i.length;s++){var n=Object(o.a)(i[s],2),a=n[0],r=n[1];a&&r>0&&t.push(a)}u.getState().conn.length!==t.length&&u.setState({conn:t})})),a.on("removeUser",(function(e){return t.removeUser(e)}));document.onmousedown=function(){return!0},document.onmouseup=function(){return!1};var d=new h.k,m=0;setInterval((function(){!function(){var e=d.getElapsedTime(),i=e-m;m=e,r&&a.emit("update",t.map,s,i),t.orbitControls.update(),t.hasEntered&&t.updateThirdPersonViewPerspective();for(var n=0,h=Object.entries(t.userMeshes);n<h.length;n++){var c=Object(o.a)(h[n],2),u=(c[0],c[1]);"walking"===u.animationStatus&&(console.log(t.userMeshes),u.mixer&&u.mixer.update(i))}t.renderer.render(t.scene,t.camera)}()}),50)}var x=s(19),L=function(){return Object(i.useEffect)((function(){M()}),[]),Object(x.jsx)("div",{children:Object(x.jsx)("canvas",{id:"canvas"})})};r.a.render(Object(x.jsx)(n.a.StrictMode,{children:Object(x.jsx)(L,{})}),document.getElementById("root"))}},[[93,1,2]]]);
//# sourceMappingURL=main.a2aca224.chunk.js.map
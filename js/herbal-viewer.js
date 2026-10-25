/* =====================================================================
   LEE'S BUILDS: 3D CAN VIEWER (Dalgety Herbal Ice)
   Loads only when the Herbal Ice page is opened. Can artwork comes from
   images/herbal/textures (phones get the smaller "-sm" versions).
   These are design mock-ups, not a real product.
   ===================================================================== */
(function(){
  'use strict';
  var TEX='images/herbal/textures/';
  var SMALL=Math.min(screen.width,screen.height)<768;
  var CANS=[
    {name:'Mango Ginger',tex:'mango-ginger',rim:[0xF0A418,0xD9480F]},
    {name:'Sorrel Ginger',tex:'sorrel-ginger',rim:[0xC8141E,0xF3F1EE]},
    {name:'Lemon and Ginger',tex:'lemon-ginger',rim:[0xF2D12E,0xEFEBDD]},
    {name:'Pineapple Ginger',tex:'pineapple-ginger',rim:[0xF4C23A,0xC9780A]},
    {name:'Passion Fruit Ginger',tex:'passion-fruit-ginger',rim:[0x7A2E82,0xE8962A]}
  ];
  var reduce=matchMedia('(prefers-reduced-motion: reduce)');
  var loading=null;

  function load(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=function(){rej(new Error(src))};document.head.appendChild(s)})}
  function webgl(){try{var c=document.createElement('canvas');return !!(window.WebGLRenderingContext&&(c.getContext('webgl')||c.getContext('experimental-webgl')))}catch(e){return false}}
  function ensure(){
    if(loading)return loading;
    loading=(webgl()?Promise.resolve():Promise.reject(new Error('no webgl')))
      .then(function(){return load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')})
      .then(function(){return load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js')})
      .then(build)
      .catch(function(e){loading=null;throw e});
    return loading;
  }

  function build(){
    var host=null,ui=null,labels=null,raf=0;
    var scene=new THREE.Scene();
    var cam=new THREE.PerspectiveCamera(30,1,0.1,200);
    var ren=new THREE.WebGLRenderer({antialias:true,alpha:true});
    ren.setPixelRatio(Math.min(window.devicePixelRatio||1,SMALL?1.75:2));
    ren.outputEncoding=THREE.sRGBEncoding;ren.toneMapping=THREE.ACESFilmicToneMapping;
    ren.shadowMap.enabled=true;ren.shadowMap.type=THREE.PCFSoftShadowMap;
    ren.domElement.setAttribute('role','img');
    ren.domElement.setAttribute('aria-label','3D mock-ups of the five Herbal Ice can designs. Use the flavour buttons below to look at each one.');

    // soft studio lighting for reflections
    var pm=new THREE.PMREMGenerator(ren),room=new THREE.Scene();
    room.add(new THREE.Mesh(new THREE.BoxGeometry(30,30,30),new THREE.MeshBasicMaterial({color:0x3a3a3a,side:THREE.BackSide})));
    [[2,18,-8,0,8,6],[2,18,9,0,6,4],[16,2,0,12,0,2.5]].forEach(function(q){var m=new THREE.Mesh(new THREE.PlaneGeometry(q[0],q[1]),new THREE.MeshBasicMaterial({color:new THREE.Color(q[5],q[5],q[5]),side:THREE.DoubleSide}));m.position.set(q[2],q[3],q[4]);m.lookAt(0,0,0);room.add(m)});
    scene.environment=pm.fromScene(room,0.02).texture;

    var ctl=new THREE.OrbitControls(cam,ren.domElement);
    ctl.enableDamping=true;ctl.enablePan=false;ctl.maxPolarAngle=Math.PI*0.56;ctl.minDistance=4;ctl.maxDistance=60;
    var key=new THREE.DirectionalLight(0xffffff,0.8);key.position.set(-6,10,10);key.castShadow=true;key.shadow.mapSize.set(SMALL?1024:2048,SMALL?512:1024);key.shadow.radius=8;
    Object.assign(key.shadow.camera,{left:-12,right:12,top:6,bottom:-6});scene.add(key);
    scene.add(new THREE.HemisphereLight(0xffffff,0x9a9a9a,0.85));

    var loader=new THREE.TextureLoader();
    var nm=loader.load(TEX+'can-normal.jpg'),rm=loader.load(TEX+'can-roughness.jpg');
    [nm,rm].forEach(function(t){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2,2)});

    // can shape
    var R=1,BH=3.575,h2=BH/2,VB=0.023328,VT=0.930016;
    function V(a,b){return new THREE.Vector2(a,b)}
    function remap(g,v0,v1){var uv=g.attributes.uv;for(var i=0;i<uv.count;i++)uv.setY(i,v0+uv.getY(i)*(v1-v0));uv.needsUpdate=true;return g}
    var seg=SMALL?96:160;
    var G={
      body:remap(new THREE.CylinderGeometry(R,R,BH,seg,1,true),VB,VT),
      sh:remap(new THREE.LatheGeometry([V(R,h2),V(0.996,h2+0.05),V(0.97,h2+0.13),V(0.935,h2+0.2),V(0.905,h2+0.25)],seg),VT,1.0),
      bt:remap(new THREE.LatheGeometry([V(0.905,-h2-0.13),V(0.945,-h2-0.095),V(0.985,-h2-0.04),V(R,-h2)],seg),0.0,VB),
      rim:new THREE.LatheGeometry([V(0.905,h2+0.25),V(0.913,h2+0.285),V(0.903,h2+0.315),V(0.875,h2+0.315),V(0.86,h2+0.275),V(0.85,h2+0.255)],120),
      foot:new THREE.LatheGeometry([V(0.8,-h2-0.19),V(0.85,-h2-0.2),V(0.89,-h2-0.15),V(0.905,-h2-0.13)],120)
    };
    var X=[-4.6,-2.3,0,2.3,4.6],cans=[],spinning=true,back=false;
    CANS.forEach(function(cd,i){
      var g=new THREE.Group();g.position.set(X[i],0,-Math.abs(X[i])*0.35);g.rotation.y=i*0.6;scene.add(g);
      var t=loader.load(TEX+cd.tex+(SMALL?'-sm':'')+'.jpg',function(){if(host)draw()});
      t.encoding=THREE.sRGBEncoding;t.anisotropy=Math.min(8,ren.capabilities.getMaxAnisotropy());
      var mat=new THREE.MeshStandardMaterial({map:t,metalness:0,roughness:1,envMapIntensity:0.5,normalMap:nm,normalScale:new THREE.Vector2(0.7,0.7),roughnessMap:rm});
      var mat2=mat.clone();mat2.side=THREE.DoubleSide;
      var top=new THREE.MeshStandardMaterial({color:cd.rim[0],metalness:0.1,roughness:0.75,side:THREE.DoubleSide});
      var foot=new THREE.MeshStandardMaterial({color:cd.rim[1],metalness:0.1,roughness:0.75,side:THREE.DoubleSide});
      var tabM=new THREE.MeshStandardMaterial({color:0x1F7A2A,metalness:0.1,roughness:0.7});
      var b=new THREE.Mesh(G.body,mat);b.rotation.y=Math.PI;b.castShadow=true;g.add(b);
      [G.sh,G.bt].forEach(function(geo){var m=new THREE.Mesh(geo,mat2);m.rotation.y=Math.PI;m.castShadow=true;g.add(m)});
      g.add(new THREE.Mesh(G.rim,top));
      var lid=new THREE.Mesh(new THREE.CircleGeometry(0.85,64),top);lid.rotation.x=-Math.PI/2;lid.position.y=h2+0.255;g.add(lid);
      var tab=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.17,0.025,32),tabM);tab.scale.z=1.7;tab.position.set(0,h2+0.275,0.12);g.add(tab);
      var f=new THREE.Mesh(G.foot,foot);f.castShadow=true;g.add(f);
      var dome=new THREE.Mesh(new THREE.CircleGeometry(0.8,48),foot);dome.rotation.x=Math.PI/2;dome.position.y=-h2-0.19;g.add(dome);
      cans.push({g:g,goal:null});
    });
    var floor=new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:0.25}));
    floor.rotation.x=-Math.PI/2;floor.position.y=-h2-0.2;floor.receiveShadow=true;scene.add(floor);

    // camera framing: the whole range, or one can
    var camGoal=null,tgtGoal=null,focus=-1;
    function view(i,instant){
      var w=host.clientWidth||1,h=host.clientHeight||1;
      cam.aspect=w/h;cam.updateProjectionMatrix();
      var vf=cam.fov*Math.PI/180,hf=2*Math.atan(Math.tan(vf/2)*cam.aspect);
      if(i<0){var d=Math.max(6.3/Math.tan(hf/2),3.6/Math.tan(vf/2))+1.5;tgtGoal=new THREE.Vector3(0,0.3,0);camGoal=new THREE.Vector3(0,1.2,d)}
      else{var q=cans[i].g.position,d2=Math.max(1.5/Math.tan(hf/2),2.7/Math.tan(vf/2))+1;tgtGoal=new THREE.Vector3(q.x,0.2,q.z);camGoal=new THREE.Vector3(q.x,0.8,q.z+d2)}
      if(instant||reduce.matches){cam.position.copy(camGoal);ctl.target.copy(tgtGoal);camGoal=null;ctl.update()}
      run();
    }
    function size(){if(!host||!host.isConnected)return;ren.setSize(host.clientWidth||1,host.clientHeight||1,false);view(focus,true)}
    ctl.addEventListener('start',function(){camGoal=null;run()});
    ctl.addEventListener('change',run);
    addEventListener('resize',size);

    function setSpin(on){
      spinning=on;
      ui.spin.textContent=on?labels.spinOn:labels.spinOff;
      ui.spin.classList.toggle('on',on);
      ui.spin.setAttribute('aria-pressed',String(on));
      run();
    }
    function select(i){
      focus=i;view(i,false);
      [].forEach.call(ui.chips.children,function(b,k){b.classList.toggle('on',k===i+1);b.setAttribute('aria-pressed',String(k===i+1))});
      ui.now.textContent=i<0?labels.allName:CANS[i].name;
    }
    function mount(v){
      host=document.getElementById('stage3d');if(!host)return;
      labels=v;
      var msg=document.getElementById('msg3d');if(msg)msg.remove();
      host.appendChild(ren.domElement);
      ui={chips:document.getElementById('vchips'),now:document.getElementById('vnow'),spin:document.getElementById('vspin'),side:document.getElementById('vside')};
      [labels.allLabel].concat(CANS.map(function(c){return c.name})).forEach(function(nm,k){
        var b=document.createElement('button');b.type='button';b.className='vbtn';b.textContent=nm;
        b.setAttribute('aria-pressed','false');b.onclick=function(){select(k-1)};ui.chips.appendChild(b);
      });
      back=false;
      ui.side.textContent=labels.showBacks;
      ui.spin.onclick=function(){setSpin(!spinning)};
      ui.side.onclick=function(){
        back=!back;setSpin(false);
        ui.side.textContent=back?labels.showFronts:labels.showBacks;
        cans.forEach(function(c){var b0=Math.round(c.g.rotation.y/(Math.PI*2))*Math.PI*2;c.goal=b0+(back?Math.PI:0)});
        run();
      };
      setSpin(!reduce.matches);        // reduced motion: cans stand still
      focus=-1;size();select(-1);view(-1,true);
    }

    // render loop: only runs while something is moving and the page is open
    var clk=new THREE.Clock();
    function draw(){ren.render(scene,cam)}
    function run(){if(!raf){clk.getDelta();raf=requestAnimationFrame(frame)}}
    function frame(){
      raf=0;
      if(!host||!host.isConnected)return;
      var dt=Math.min(clk.getDelta(),0.05),busy=false;
      cans.forEach(function(c){
        if(spinning){c.g.rotation.y+=dt*0.5;busy=true}
        else if(c.goal!==null){c.g.rotation.y+=(c.goal-c.g.rotation.y)*0.08;busy=true;if(Math.abs(c.goal-c.g.rotation.y)<0.001){c.g.rotation.y=c.goal;c.goal=null}}
      });
      if(camGoal){busy=true;cam.position.lerp(camGoal,0.08);ctl.target.lerp(tgtGoal,0.08);if(cam.position.distanceTo(camGoal)<0.01)camGoal=null}
      if(ctl.update())busy=true;
      draw();
      if(busy)run();
    }
    return {mount:mount};
  }

  window.HerbalViewer={mount:function(v){
    ensure().then(function(api){setTimeout(function(){api.mount(v)},60)}).catch(function(){
      var m=document.getElementById('msg3d');if(m)m.textContent=v.failed;
    });
  }};
})();

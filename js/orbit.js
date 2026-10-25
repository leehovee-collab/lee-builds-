/* =====================================================================
   LEE'S BUILDS: PAGE + POLAROID RING
   1. Fills the page with the wording from content.js
   2. Spins the polaroid ring (drag / swipe / keyboard)
   3. Opens a build page out of the tapped polaroid, and closes it again
   ===================================================================== */
(function(){
  'use strict';
  var C=window.CONTENT;
  var L=C.labels;
  var BUILDS=C.builds;
  var byId={};BUILDS.forEach(function(b){byId[b.id]=b});
  var reduce=matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- small helpers ---------- */
  function $(id){return document.getElementById(id)}
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  // **bold** and *italic accent* from content.js
  function rich(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')}
  function plain(s){return String(s||'').replace(/\*/g,'')}

  // A picture that swaps itself for a tidy placeholder if the file is missing
  function pic(src,alt,opts){
    opts=opts||{};
    if(!src)return missing('',opts);
    return '<img src="'+esc(src)+'" alt="'+esc(alt||'')+'"'+(opts.eager?' fetchpriority="high"':' loading="lazy"')+' decoding="async"'
      +(opts.w?' width="'+opts.w+'" height="'+opts.h+'"':'')+' data-missing="'+esc(src)+'">';
  }
  function missing(src,opts){
    return '<span class="missing'+(opts&&opts.flow?' flow':'')+'" role="img" aria-label="'+esc(L.missingImage)+'"><b>'+esc(L.missingImage)+'</b>'+(src?'<code>'+esc(src)+'</code>':'')+'</span>';
  }
  // image errors don't bubble, so listen in the capture phase
  document.addEventListener('error',function(e){
    var img=e.target;
    if(!img||img.tagName!=='IMG'||!img.hasAttribute('data-missing'))return;
    var box=document.createElement('span');
    box.innerHTML=missing(img.getAttribute('data-missing'),{flow:!img.closest('.pol,.row,.me-pic')});
    img.replaceWith(box.firstChild);
  },true);

  /* ---------- optional PNG decorations ---------- */
  (function(){
    var d=C.decor||{},root=document.documentElement;
    [['tape','tape'],['tapeDots','tapedots'],['paperclip','clip'],['sparkle','sparkle'],['heart','heart']].forEach(function(p){
      if(d[p[0]]){root.style.setProperty('--decor-'+p[1],'url("'+d[p[0]]+'")');root.classList.add('has-'+p[1]+'-png')}
    });
  })();

  /* ---------- 1. fill the main page ---------- */
  var S=C.site,A=C.about;
  document.title=S.pageTitle;
  $('t-top').textContent=S.titleTop;
  $('t-bottom').textContent=S.titleBottom;
  $('t-tagline').textContent=S.tagline;
  $('t-hint').textContent=S.hint;
  $('footer').textContent=S.footer;

  $('me1').innerHTML=pic(A.photo1,A.photo1Alt,{w:800,h:1000});
  $('me2').innerHTML=pic(A.photo2,A.photo2Alt,{w:800,h:1000});
  $('cap1').textContent=A.caption1;
  $('cap2').textContent=A.caption2;
  $('about-hi').innerHTML=rich(A.heading);
  $('about-text').innerHTML=A.paragraphs.map(function(p){return '<p>'+rich(p)+'</p>'}).join('');
  $('about-ps').textContent=A.ps;
  $('about-made').innerHTML=madeWith(A.madeWith);
  $('cur-title').textContent=A.currentlyTitle;
  $('cur-list').innerHTML=A.currently.map(function(t){return '<li>'+esc(t)+'</li>'}).join('');
  $('all-title').textContent=C.allBuildsTitle;

  function madeWith(list){
    if(!list||!list.length)return '';
    return '<span class="h-serif">'+esc(L.madeWith)+'</span>'+list.map(function(t){return '<span class="chip">'+esc(t)+'</span>'}).join('');
  }

  // the polaroid ring
  var ring=$('ring');
  ring.innerHTML=BUILDS.map(function(b,i){
    return '<li><button class="pol" data-id="'+b.id+'" type="button" aria-label="'+esc(L.openBuild+' '+b.name)+'">'
      +'<span class="tape'+(i%2?' dots':'')+'"></span>'
      +'<span class="pic">'+pic(b.cover.image,'',{eager:true})+'</span>'
      +'<span class="cap" aria-hidden="true">'+esc(b.shortName)+'</span></button></li>';
  }).join('');

  // the "all builds" list
  $('list').innerHTML=BUILDS.map(function(b){
    return '<li><button class="row" data-id="'+b.id+'" type="button" style="--a:'+esc(b.colour)+'">'
      +'<span class="sw">'+pic(b.cover.image,'')+'</span>'
      +'<span class="t"><b>'+esc(b.name)+'</b><small class="label">'+esc(b.listLine)+'</small></span>'
      +'<span class="go" aria-hidden="true">'+esc(C.openLabel)+'</span></button></li>';
  }).join('');

  /* ---------- 2. build page markup ---------- */
  function buildPage(b){
    var i=BUILDS.indexOf(b),next=BUILDS[(i+1)%BUILDS.length],wrap=i===BUILDS.length-1;
    var h='<section class="d-top" style="--a:'+esc(b.colour)+'"><div class="wrap grid"><div>'
      +'<p class="kicker label">'+esc(b.kicker)+'</p>'
      +'<h2 class="h-serif" id="d-title">'+rich(b.title)+'</h2>'
      +'<ul class="stick" aria-label="Tags">'+b.tags.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul>'
      +'<p class="lede">'+rich(b.lede)+'</p></div>'
      +'<figure class="bigpol"><span class="tape'+(i%2?' dots':'')+'"></span><span class="clip" aria-hidden="true"></span>'
      +'<div class="pic">'+pic(b.cover.image,b.cover.alt,{eager:true})+'</div><figcaption>'+esc(b.cover.caption)+'</figcaption></figure>'
      +'</div></section>';

    if(b.viewer){
      var v=b.viewer;
      h+='<section class="d-3d" aria-labelledby="v-title"><div class="wrap">'
        +'<h3 class="h-serif" id="v-title">'+rich(v.title)+'</h3>'
        +'<p class="sub label">'+esc(v.hint)+'</p>'
        +'<p class="mock">'+esc(v.note)+'</p>'
        +'<div class="stage3d" id="stage3d"><div class="msg" id="msg3d">'+esc(v.loading)+'</div></div>'
        +'<p class="vnow" id="vnow" aria-live="polite">'+esc(v.allName)+'</p>'
        +'<div class="vchips" id="vchips" role="group" aria-label="Flavours"></div>'
        +'<div class="vbar"><button class="vbtn on" id="vspin" type="button" aria-pressed="true">'+esc(v.spinOn)+'</button>'
        +'<button class="vbtn" id="vside" type="button">'+esc(v.showBacks)+'</button></div>'
        +'</div></section>';
    }

    if(b.features&&b.features.length){
      h+='<section class="d-feat"><div class="wrap"><h3 class="h-serif">'+rich(b.whatIBuiltTitle)+'</h3>'
        +b.features.map(function(f,k){
          return '<div class="frow"><figure class="fpol"><span class="tape'+(k%2?'':' dots')+'"></span>'
            +'<div class="pic">'+pic(f.image,f.alt)+'</div><figcaption>'+esc(f.caption)+'</figcaption></figure>'
            +'<div class="ftext"><h4>'+rich(f.heading)+'</h4><p>'+rich(f.text)+'</p>'
            +(f.bullets&&f.bullets.length?'<ul>'+f.bullets.map(function(x){return '<li>'+rich(x)+'</li>'}).join('')+'</ul>':'')
            +'</div></div>';
        }).join('')+'</div></section>';
    }

    var notes='';
    if(b.brief)notes+='<article class="note"><span class="clip" aria-hidden="true"></span><h3 class="h-serif">'+esc(L.brief)+'</h3><p>'+rich(b.brief)+'</p></article>';
    if(b.outcome)notes+='<article class="note"><span class="clip" aria-hidden="true"></span><h3 class="h-serif">'+esc(L.outcome)+'</h3><p>'+rich(b.outcome)+'</p></article>';
    var made=madeWith(b.madeWith);
    if(notes||made){
      h+='<section class="d-notes grain"><div class="wrap">'+(notes?'<div class="notes">'+notes+'</div>':'')
        +(made?'<div class="made">'+made+'</div>':'')+'</div></section>';
    }

    h+='<nav class="d-next" aria-label="Next build"><button class="dbtn" data-go="'+next.id+'" type="button">'
      +esc(wrap?L.backToStart:L.nextBuild)+' '+esc(next.name)+' →</button></nav>';
    return h;
  }

  /* ---------- 3. the spinning ring ---------- */
  var orbit=$('orbit');
  var pols=[].slice.call(ring.querySelectorAll('.pol'));
  var n=pols.length;
  var tilts=[-6,4,-3,5,-5,3,-4,2];
  var FRONT=Math.PI/2;                 // the angle nearest the viewer
  var base=FRONT+0.35,vel=0;
  var AUTO=0.0032;                     // gentle spin speed
  var paused=false,focusLock=false,dragging=false,moved=0,lastX=0,lastY=0,dragStarted=false;
  var target=null;                     // angle we're easing towards (keyboard focus)
  var visible=true,detailOpen=false,raf=0,W=0,H=0,PW=0;

  function auto(){return reduce.matches||paused||focusLock?0:AUTO}

  function measure(){W=orbit.clientWidth;H=orbit.clientHeight;PW=pols[0]?pols[0].offsetWidth:150}
  function layout(){
    // keep the side polaroids on screen: radius shrinks on narrow phones
    var Rx=Math.max(80,Math.min(W*0.42,470,W/2-PW*0.48-6));
    var Ry=Math.min(H*0.3,250);
    for(var i=0;i<n;i++){
      var a=base+i*2*Math.PI/n,x=Math.cos(a)*Rx,y=Math.sin(a)*Ry*0.95;
      var depth=(Math.sin(a)+1)/2,s=0.62+0.48*depth;
      var el=pols[i];
      el.style.transform='translate(-50%,-50%) translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) scale('+s.toFixed(3)+') rotate('+(tilts[i%tilts.length]+Math.cos(a)*-6).toFixed(2)+'deg)';
      el.style.zIndex=depth>0.45?String(60+Math.round(depth*40)):String(10+Math.round(depth*30));
      el.style.filter='brightness('+(0.5+0.5*depth).toFixed(3)+')';
    }
  }
  function wrapAngle(a){a=(a+Math.PI)%(2*Math.PI);if(a<0)a+=2*Math.PI;return a-Math.PI}
  function tick(){
    raf=0;
    if(!visible||detailOpen)return;
    if(target!==null&&!dragging){
      var d=wrapAngle(target-base);
      base+=reduce.matches?d:d*0.14;vel=0;
      if(Math.abs(d)<0.002){base=target;target=null}
    }else if(!dragging){vel+=(auto()-vel)*0.03;base+=vel}
    layout();
    // keep animating while something is moving
    if(dragging||target!==null||Math.abs(vel)>0.00005||auto()>0)loop();
  }
  function loop(){if(!raf)raf=requestAnimationFrame(tick)}

  measure();layout();loop();
  addEventListener('resize',function(){measure();layout();loop()});
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){visible=es[0].isIntersecting;if(visible)loop()}).observe(orbit);
  }
  document.addEventListener('visibilitychange',function(){if(!document.hidden)loop()});
  if(reduce.addEventListener)reduce.addEventListener('change',function(){updatePause();loop()});

  // drag / swipe: horizontal moves spin the ring, vertical moves scroll the page
  orbit.addEventListener('pointerdown',function(e){
    if(e.button!==0)return;
    dragging=true;dragStarted=false;moved=0;lastX=e.clientX;lastY=e.clientY;target=null;
  });
  addEventListener('pointermove',function(e){
    if(!dragging)return;
    var dx=e.clientX-lastX,dy=e.clientY-lastY;
    if(!dragStarted){
      if(Math.abs(dx)<4&&Math.abs(dy)<4)return;
      if(e.pointerType!=='mouse'&&Math.abs(dy)>Math.abs(dx)){dragging=false;return}   // a scroll, let it go
      dragStarted=true;orbit.classList.add('drag');
    }
    lastX=e.clientX;lastY=e.clientY;moved+=Math.abs(dx);
    var dv=dx*0.0055;base+=dv;vel=dv;loop();
  },{passive:true});
  function endDrag(){if(!dragging)return;dragging=false;orbit.classList.remove('drag');loop()}
  addEventListener('pointerup',endDrag);
  addEventListener('pointercancel',function(){dragging=false;orbit.classList.remove('drag');loop()});

  // keyboard: focusing a polaroid turns it to the front and holds the ring still
  pols.forEach(function(p,i){
    p.addEventListener('focus',function(){
      if(!p.matches(':focus-visible'))return;     // keyboard only, not taps
      focusLock=true;target=FRONT-i*2*Math.PI/n;loop();
    });
    p.addEventListener('blur',function(){
      setTimeout(function(){if(!orbit.contains(document.activeElement)){focusLock=false;loop()}},0);
    });
    p.addEventListener('keydown',function(e){
      var k=e.key,j=-1;
      if(k==='ArrowRight'||k==='ArrowDown')j=(i+1)%n;
      else if(k==='ArrowLeft'||k==='ArrowUp')j=(i-1+n)%n;
      else if(k==='Home')j=0;else if(k==='End')j=n-1;
      if(j>=0){e.preventDefault();pols[j].focus()}
    });
  });

  // pause / play button (hidden when reduced motion is on)
  var pauseBtn=$('pause');
  function updatePause(){
    pauseBtn.textContent=paused?L.playSpin:L.pauseSpin;
    pauseBtn.setAttribute('aria-pressed',String(paused));
    pauseBtn.hidden=reduce.matches;
  }
  pauseBtn.addEventListener('click',function(){paused=!paused;updatePause();loop()});
  updatePause();

  /* ---------- 4. opening and closing a build ---------- */
  var detail=$('detail'),dbody=$('dbody'),dname=$('dname'),page=$('page');
  var current=null,returnTo=null,pushed=false;

  function rectInset(r){
    var vw=innerWidth,vh=innerHeight;
    return 'inset('+Math.max(0,r.top)+'px '+Math.max(0,vw-r.right)+'px '+Math.max(0,vh-r.bottom)+'px '+Math.max(0,r.left)+'px round 6px)';
  }
  function fill(id){
    var b=byId[id];
    dbody.innerHTML=buildPage(b);
    dname.textContent=b.shortName;current=id;detail.scrollTop=0;
    if(b.viewer&&window.HerbalViewer)window.HerbalViewer.mount(b.viewer);
  }
  function openBuild(id,fromEl,how){
    if(!byId[id])return;
    returnTo=fromEl||null;detailOpen=true;
    fill(id);
    document.documentElement.style.overflow='hidden';
    page.inert=true;page.setAttribute('aria-hidden','true');
    detail.hidden=false;
    if(!reduce.matches&&fromEl&&fromEl.getBoundingClientRect().width){
      detail.classList.remove('anim');
      detail.style.clipPath=rectInset(fromEl.getBoundingClientRect());
      detail.getBoundingClientRect();
      detail.classList.add('anim');
      detail.style.clipPath='inset(0px 0px 0px 0px round 0px)';
    }else{detail.style.clipPath='none'}
    $('dclose').focus({preventScroll:true});
    if(how==='push'){history.pushState({build:id},'','#'+id);pushed=true}
  }
  function closeUI(){
    if(detail.hidden)return;
    var t=returnTo;
    if(t&&t.classList.contains('pol'))t=ring.querySelector('.pol[data-id="'+current+'"]')||t;
    else if(t&&t.classList.contains('row'))t=$('list').querySelector('.row[data-id="'+current+'"]')||t;
    var done=function(){
      detail.hidden=true;detail.classList.remove('anim');detail.style.clipPath='';dbody.innerHTML='';
      document.documentElement.style.overflow='';
      page.inert=false;page.removeAttribute('aria-hidden');
      detailOpen=false;current=null;loop();
      if(t)t.focus({preventScroll:true});
    };
    var r=t&&t.getBoundingClientRect();
    if(!reduce.matches&&r&&r.width&&r.bottom>0&&r.top<innerHeight){
      detail.classList.add('anim');
      detail.style.clipPath=rectInset(r);
      setTimeout(done,640);
    }else done();
  }
  // the close button uses the browser's back step, so the iPhone back swipe works too
  function requestClose(){
    if(pushed&&history.state&&history.state.build){history.back()}
    else{closeUI();history.replaceState(null,'',location.pathname+location.search)}
  }

  pols.forEach(function(p){
    p.addEventListener('click',function(e){
      if(e.detail!==0&&moved>8){moved=0;e.preventDefault();return}
      openBuild(p.dataset.id,p,'push');
    });
  });
  [].forEach.call(document.querySelectorAll('.row'),function(r){
    r.addEventListener('click',function(){openBuild(r.dataset.id,r,'push')});
  });
  dbody.addEventListener('click',function(e){
    var go=e.target.closest('[data-go]');
    if(!go)return;
    fill(go.dataset.go);
    history.replaceState({build:current},'','#'+current);
    $('dclose').focus({preventScroll:true});
  });
  $('dclose').addEventListener('click',requestClose);
  addEventListener('keydown',function(e){
    if(detail.hidden)return;
    if(e.key==='Escape'){requestClose();return}
    // keep keyboard focus inside the open build page
    if(e.key==='Tab'){
      var f=[].filter.call(detail.querySelectorAll('button,a[href],canvas[tabindex],[tabindex]:not([tabindex="-1"])'),function(x){return x.offsetParent!==null});
      if(!f.length)return;
      var first=f[0],last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  addEventListener('popstate',function(){
    var id=location.hash.slice(1);
    if(byId[id]){
      if(detail.hidden)openBuild(id,ring.querySelector('.pol[data-id="'+id+'"]'));
      else if(id!==current)fill(id);
    }else{pushed=false;closeUI()}
  });
  // a shared link like  …/#rosalynn  opens straight onto that build
  (function(){
    var id=location.hash.slice(1);
    if(byId[id]){history.replaceState({build:id},'','#'+id);openBuild(id,null)}
  })();
})();

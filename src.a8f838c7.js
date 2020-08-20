(function () {let v,E,M={};function F(t,...e){(M[t]||[]).map(t=>t(...e))}function G(){return v}function m(){return E}function N(t){if(!(v=document.getElementById(t)||t||document.querySelector("canvas")))throw Error("You must provide a canvas element for the game");return(E=v.getContext("2d")).imageSmoothingEnabled=!1,F("init"),{canvas:v,context:E}}class O{constructor({spriteSheet:t,frames:e,frameRate:r,loop:i=!0}){this.spriteSheet=t,this.frames=e,this.frameRate=r,this.loop=i;let{width:$,height:s,margin:o=0}=t.frame;this.width=$,this.height=s,this.margin=o,this._f=0,this._a=0}clone(){return new O(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:e,width:r=this.width,height:i=this.height,context:$=m()}){let s=this.frames[this._f]/this.spriteSheet._f|0,o=this.frames[this._f]%this.spriteSheet._f|0;$.drawImage(this.spriteSheet.image,o*this.width+(2*o+1)*this.margin,s*this.height+(2*s+1)*this.margin,this.width,this.height,t,e,r,i)}}let a=new WeakMap;function P(t,e){let r=Math.sin(e),i=Math.cos(e);return{x:t.x*i-t.y*r,y:t.x*r+t.y*i}}function H(t,e,r){return Math.min(Math.max(t,r),e)}function Q(t,e){return t.rotation||e.rotation?null:([t,e]=[t,e].map(t=>I(t)),t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.y+t.height>e.y)}function I(t){let e=t.world||t,r=e.x,i=e.y,$=e.width,s=e.height;return t.anchor&&(r-=$*t.anchor.x,i-=s*t.anchor.y),{x:r,y:i,width:$,height:s}}class b{constructor(t=0,e=0,r={}){this.x=t,this.y=e,r._c&&(this.clamp(r._a,r._b,r._d,r._e),this.x=t,this.y=e)}add(t){return new b(this.x+t.x,this.y+t.y,this)}subtract(t){return new b(this.x-t.x,this.y-t.y,this)}scale(t){return new b(this.x*t,this.y*t)}normalize(t=this.length()){return new b(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}clamp(t,e,r,i){this._c=!0,this._a=t,this._b=e,this._d=r,this._e=i}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?H(this._a,this._d,t):t}set y(t){this._y=this._c?H(this._b,this._e,t):t}}function g(){return new b(...arguments)}g.prototype=b.prototype,g.class=b;class R{constructor(t){return this.init(t)}init(t={}){this.position=g(),this.velocity=g(),this.acceleration=g(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let e=this.acceleration;t&&(e=e.scale(t)),this.velocity=this.velocity.add(e);let r=this.velocity;t&&(r=r.scale(t)),this.position=this.position.add(r),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}const j=()=>{},J="position:absolute;left:-9999px";function y(t,e){let r=e.parentNode;if(t.setAttribute("data-kontra",""),r){let i=r.querySelector("[data-kontra]:last-of-type")||e;r.insertBefore(t,i.nextSibling)}else document.body.appendChild(t)}class z extends R{init({width:t=0,height:e=0,context:r=m(),render:i=this.draw,update:$=this.advance,children:s=[],anchor:o={x:0,y:0},sx:a=0,sy:n=0,opacity:h=1,rotation:w=0,scaleX:p=1,scaleY:l=1,...d}={}){this.children=[],super.init({width:t,height:e,context:r,anchor:o,sx:a,sy:n,opacity:h,rotation:w,scaleX:p,scaleY:l,...d}),this._di=!0,this._uw(),s.map(t=>this.addChild(t)),this._rf=i,this._uf=$}update(t){this._uf(t),this.children.map(t=>t.update&&t.update())}render(t){let e=this.context;e.save(),(this.x||this.y)&&e.translate(this.x,this.y),this.rotation&&e.rotate(this.rotation),(this.sx||this.sy)&&e.translate(-this.sx,-this.sy),1==this.scaleX&&1==this.scaleY||e.scale(this.scaleX,this.scaleY);let r=-this.width*this.anchor.x,i=-this.height*this.anchor.y;(r||i)&&e.translate(r,i),this.context.globalAlpha=this.opacity,this._rf(),(r||i)&&e.translate(-r,-i);let $=this.children;t&&($=$.filter(t)),$.map(t=>t.render&&t.render()),e.restore()}draw(){}_pc(t,e){this._uw(),this.children.map(t=>t._pc())}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:e=0,_wo:r=1,_wr:i=0,_wsx:$=1,_wsy:s=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=r*this.opacity,this._wr=i+this.rotation;let{x:o,y:a}=P({x:this.x,y:this.y},i);this._wx=o,this._wy=a,this._wsx=$*this.scaleX,this._wsy=s*this.scaleY,this._wx=this.x*$,this._wy=this.y*s,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wx+=t,this._wy+=e}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}addChild(t,{absolute:e=!1}={}){this.children.push(t),t.parent=this,t._pc=t._pc||j,t._pc()}removeChild(t){let e=this.children.indexOf(t);-1!==e&&(this.children.splice(e,1),t.parent=null,t._pc())}get opacity(){return this._opa}set opacity(t){this._opa=t,this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,e=t){this.scaleX=t,this.scaleY=e}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}function f(){return new z(...arguments)}f.prototype=z.prototype,f.class=z;class A extends f.class{init({image:t,width:e=t?t.width:void 0,height:r=t?t.height:void 0,...i}={}){super.init({image:t,width:e,height:r,...i})}get animations(){return this._a}set animations(t){let e,r;for(e in this._a={},t)this._a[e]=t[e].clone(),r=r||this._a[e];this.currentAnimation=r,this.width=this.width||r.width,this.height=this.height||r.height}playAnimation(t){this.currentAnimation=this.animations[t],this.currentAnimation.loop||this.currentAnimation.reset()}advance(t){super.advance(t),this.currentAnimation&&this.currentAnimation.update(t)}draw(){this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color&&(this.context.fillStyle=this.color,this.context.fillRect(0,0,this.width,this.height))}}function q(){return new A(...arguments)}q.prototype=A.prototype,q.class=A;let S=/(\d+)(\w+)/;function T(t){let e=t.match(S),r=+e[1];return{size:r,unit:e[2],computed:r}}class B extends f.class{init({text:t="",textAlign:e="",lineHeight:r=1,font:i=m().font,...$}={}){super.init({text:t,textAlign:e,lineHeight:r,font:i,...$}),this._p()}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=T(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context;if(t.font=this.font,!this._s.length&&this._fw){let e=this.text.split(" "),r=0,i=2;for(;i<=e.length;i++){let $=e.slice(r,i).join(" ");t.measureText($).width>this._fw&&(this._s.push(e.slice(r,i-1).join(" ")),r=i-1)}this._s.push(e.slice(r,i).join(" "))}if(!this._s.length&&this.text.includes("\n")){let e=0;this.text.split("\n").map(r=>{this._s.push(r),e=Math.max(e,t.measureText(r).width)}),this._w=this._fw||e}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,e=this.textAlign,r=this.context;e=this.textAlign||("rtl"===r.canvas.dir?"right":"left"),t="right"===e?this.width:"center"===e?this.width/2|0:0,this._s.map((i,$)=>{r.textBaseline="top",r.textAlign=e,r.fillStyle=this.color,r.font=this.font,r.fillText(i,t,this._fs*this.lineHeight*$)})}}function C(){return new B(...arguments)}C.prototype=B.prototype,C.class=B;let U=new WeakMap;function V(...t){t.map(t=>{let e=t.context?t.context.canvas:G(),r=U.get(e);if(!r)throw new ReferenceError("Pointer events not initialized for the objects canvas");t._r||(t._r=t.render,t.render=function(){r._cf.push(this),this._r()},r._o.push(t))})}class c extends q.class{init({padX:t=0,padY:e=0,text:r,onDown:i,onUp:$,...s}={}){super.init({padX:t,padY:e,...s}),this.textNode=C({...r,context:this.context}),this.width||(this.width=this.textNode.width,this.height=this.textNode.height),V(this),this.addChild(this.textNode),this._od=i||j,this._ou=$||j;const o=this._dn=document.createElement("button");o.style=J,o.textContent=this.text,o.addEventListener("focus",()=>this.focus()),o.addEventListener("blur",()=>this.blur()),o.addEventListener("keydown",t=>this._kd(t)),o.addEventListener("keyup",t=>this._ku(t)),y(o,this.context.canvas),this._uw(),this._p()}get text(){return this.textNode.text}set text(t){this._d=!0,this.textNode.text=t}destroy(){this._dn.remove()}_p(){this.text!==this._dn.textContent&&(this._dn.textContent=this.text),this.textNode._p();let t=this.textNode.width+2*this.padX,e=this.textNode.height+2*this.padY;this.width=Math.max(t,this.width),this.height=Math.max(e,this.height),this._uw()}render(){this._d&&this._p(),super.render()}enable(){this.disabled=this._dn.disabled=!1,this.onEnable()}disable(){this.disabled=this._dn.disabled=!0,this.onDisable()}focus(){this.disabled||(this.focused=!0,document.activeElement!=this._dn&&this._dn.focus(),this.onFocus())}blur(){this.focused=!1,document.activeElement==this._dn&&this._dn.blur(),this.onBlur()}onOver(){this.disabled||(this.hovered=!0)}onOut(){this.hovered=!1}onEnable(){}onDisable(){}onFocus(){}onBlur(){}onDown(){this.disabled||(this.pressed=!0,this._od())}onUp(){this.disabled||(this.pressed=!1,this._ou())}_kd(t){"Enter"!=t.code&&"Space"!=t.code||this.onDown()}_ku(t){"Enter"!=t.code&&"Space"!=t.code||this.onUp()}}function W(t){let e=t.canvas;t.clearRect(0,0,e.width,e.height)}function X({fps:t=60,clearCanvas:e=!0,update:r=j,render:i,context:$=m()}={}){if(!i)throw Error("You must provide a render() function");let s,o,a,n,h,w=0,p=1e3/t,l=1/t,d=e?W:j;function c(){if(o=requestAnimationFrame(c),a=performance.now(),n=a-s,s=a,!(n>1e3)){for(F("tick"),w+=n;w>=p;)h.update(l),w-=p;d($),h.render()}}return h={update:r,render:i,isStopped:!0,start(){s=performance.now(),this.isStopped=!1,requestAnimationFrame(c)},stop(){this.isStopped=!0,cancelAnimationFrame(o)},_frame:c,set _last(t){s=t}}}let _={set:(t,e,r)=>(e.startsWith("_")||(t._d=!0),Reflect.set(t,e,r))},K={start:t=>t?1:0,center:()=>.5,end:t=>t?0:1};class d extends f.class{init({flow:t="column",align:e="start",justify:r="start",colGap:i=0,rowGap:$=0,numCols:s=1,dir:o="",breakpoints:a=[],...n}={}){return super.init({flow:t,align:e,justify:r,colGap:i,rowGap:$,numCols:s,dir:o,breakpoints:a,...n}),this._p(),new Proxy(this,_)}addChild(t){this._d=!0,super.addChild(t)}removeChild(t){this._d=!0,super.removeChild(t)}render(){this._d&&this._p(),super.render()}destroy(){this.children.map(t=>t.destroy&&t.destroy())}_p(){this._d=!1,this.breakpoints.map(t=>{t.metric.call(this)&&this._b!==t&&(this._b=t,t.callback.call(this))});let t=this._g=[],e=this._cw=[],r=this._rh=[],i=this.children,$=this._nc="column"===this.flow?1:"row"===this.flow?i.length:this.numCols,s=0,o=0;for(let d,c=0;d=i[c];c++){t[s]=t[s]||[],d._p&&d._p(),r[s]=Math.max(r[s]||0,d.height);let i=d.colSpan||1,a=i;do{e[o]=Math.max(e[o]||0,d.width/a),t[s][o]=d}while(a+o++<=$&&--i);o>=$&&(o=0,s++)}for(;o>0&&o<$;)t[s][o++]=!1;let a=t.length,n=[].concat(this.colGap),h=[].concat(this.rowGap);this._w=e.reduce((t,e)=>t+=e,0);for(let d=0;d<$-1;d++)this._w+=n[d%n.length];this._h=r.reduce((t,e)=>t+=e,0);for(let d=0;d<a-1;d++)this._h+=h[d%h.length];this._uw();let w="rtl"===this.context.canvas.dir&&!this.dir||"rtl"===this.dir;this._rtl=w,w&&(this._g=t.map(t=>t.reverse()),this._cw=e.reverse());let p=-this.anchor.y*this.height,l=[];this._g.map((t,i)=>{let $=-this.anchor.x*this.width;t.map((t,s)=>{if(t&&!l.includes(t)){l.push(t);let o=K[t.justifySelf||this.justify](this._rtl),a=K[t.alignSelf||this.align](),h=t.colSpan||1,w=e[s];if(h>1&&s+h<=this._nc)for(let t=1;t<h;t++)w+=e[s+t]+n[(s+t)%n.length];let d=w*o,c=r[i]*a,x=0,Y=0,{width:u,height:Z}=t;if(t.anchor&&(x=t.anchor.x,Y=t.anchor.y),0===o)d+=u*x;else if(.5===o){d+=(x<.5?-1:.5===x?0:1)*u*o}else d-=u*(1-x);if(0===a)c+=Z*Y;else if(.5===a){c+=(Y<.5?-1:.5===Y?0:1)*Z*a}else c-=Z*(1-Y);t.x=$+d,t.y=p+c}$+=e[s]+n[s%n.length]}),p+=r[i]+h[i%h.length]})}}function L(t,e){let r=[],i=e.x+e.width/2,$=e.y+e.height/2,{x:s,y:o,width:a,height:n}=I(t),h=t.y<$,w=t.y+t.height>=$;return t.x<i&&(h&&r.push(0),w&&r.push(2)),t.x+t.width>=i&&(h&&r.push(1),w&&r.push(3)),r}class aa{constructor({maxDepth:t=3,maxObjects:e=25,bounds:r}={}){this.maxDepth=t,this.maxObjects=e;let i=G();this.bounds=r||{x:0,y:0,width:i.width,height:i.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}clear(){this._s.map(function(t){t.clear()}),this._b=!1,this._o.length=0}get(t){let e=new Set;for(;this._s.length&&this._b;)return L(t,this.bounds).map(r=>{this._s[r].get(t).map(t=>e.add(t))}),Array.from(e);return this._o.filter(e=>e!==t)}add(...t){t.map(t=>{Array.isArray(t)?this.add.apply(this,t):this._b?this._a(t):(this._o.push(t),this._o.length>this.maxObjects&&this._d<this.maxDepth&&(this._sp(),this._o.map(t=>this._a(t)),this._o.length=0))})}_a(t){L(t,this.bounds).map(e=>{this._s[e].add(t)})}_sp(t,e,r){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,e=this.bounds.height/2|0,r=0;r<4;r++)this._s[r]=new aa({bounds:{x:this.bounds.x+(r%2==1?t:0),y:this.bounds.y+(r>=2?e:0),width:t,height:e},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[r]._d=this._d+1,this._s[r]._p=this}}function D(t){let e=[];return t._dn?e.push(t._dn):t.children&&t.children.map(t=>{e=e.concat(D(t))}),e}class e extends f.class{init({id:t,name:e=t,cullObjects:r=!0,cullFunction:i=Q,...$}){const s=this._dn=document.createElement("section");s.tabIndex=-1,s.style=J,s.id=t,s.setAttribute("aria-label",e),super.init({id:t,name:e,cullObjects:r,cullFunction:i,...$}),y(s,this.context.canvas);let o=this.context.canvas;this.camera=f({x:o.width/2,y:o.height/2,width:o.width,height:o.height,anchor:{x:.5,y:.5}}),this.camera._pc=()=>{super._pc.call(this.camera);this.context.canvas;this.camera._wx=this.camera.x*this.scaleX,this.camera._wy=this.camera.y*this.scaleY}}show(){this.hidden=this._dn.hidden=!1;let t=this.children.find(t=>t.focus);t?t.focus():this._dn.focus(),this.onShow()}hide(){this.hidden=this._dn.hidden=!0,this.onHide()}addChild(t,e){super.addChild(t,e),D(t).map(t=>{this._dn.appendChild(t)})}removeChild(t){super.removeChild(t),D(t).map(t=>{y(t,this.context.canvas)})}destroy(){this._dn.remove(),this.children.map(t=>t.destroy&&t.destroy())}update(t){this.hidden||super.update(t)}lookAt(t){let e=(t=t.world||t).x,r=t.y;t.scaleX&&(e/=t.scaleX,r/=t.scaleY),this.camera.x=e,this.camera.y=r,this._pc()}_pc(){super._pc(),this.camera&&this.camera._pc()}render(){let{x:t,y:e,width:r,height:i}=this.camera;this.sx=t*this.scaleX-r/2,this.sy=e*this.scaleY-i/2,this.hidden||super.render(t=>!this.cullObjects||this.cullFunction(t,this.camera))}onShow(){}onHide(){}}var ba=N(),ca=ba.canvas,k=q({x:100,y:80,color:"red",width:20,height:40,dx:2}),da=X({update:function(){k.update(),k.x>ca.width&&(k.x=-k.width)},render:function(){k.render()}});console.log("Hello"),da.start();})();
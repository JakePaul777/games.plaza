/*
 * box-physics.js
 * Drop into any page:
 *   <script src="box-physics.js" data-texture="texture.png"></script>
 * Press P to spawn a draggable, flingable 4:3 physics box at the cursor.
 *
 * Optional attributes on the script tag:
 *   data-texture="path/to/image.png"   (default "texture.png")
 *   data-key="p"                       spawn key (default "p")
 *   data-width="160"                   box width in px, height is 3/4 of it
 *   data-gravity="1400"                px/s^2, use 0 for zero-g
 *   data-sounds="a.mp3,b.mp3"          two custom sounds (default: 2 synthesized ones)
 */
(function () {
  var script = document.currentScript;
  var data = (script && script.dataset) || {};

  var TEXTURE = data.texture || 'texture.png';
  var KEY = (data.key || 'p').toLowerCase();
  var W = parseFloat(data.width) || 160;
  var H = W * 3 / 4;
  var hw = W / 2, hh = H / 2;

  // --- tuning ---
  var GRAVITY = data.gravity !== undefined ? parseFloat(data.gravity) : 1400;
  var RESTITUTION = 0.55;  // bounciness
  var FRICTION = 0.3;      // wall friction
  var AIR_DRAG = 0.05;     // linear damping per second
  var SPIN_DRAG = 0.15;    // angular damping per second
  var SPRING_K = 220;      // how tightly the cursor pulls
  var SPRING_C = 22;       // spring damping

  var mass = 1;
  var inertia = mass * (W * W + H * H) / 12;

  // --- styles (injected so no CSS file is needed) ---
  var style = document.createElement('style');
  style.textContent =
    '.pbox{position:fixed;left:0;top:0;width:' + W + 'px;height:' + H + 'px;' +
    'margin:' + (-hh) + 'px 0 0 ' + (-hw) + 'px;' +
    'background:url("' + TEXTURE + '") center/100% 100% no-repeat;' +
    'cursor:grab;touch-action:none;will-change:transform;z-index:2147483647;' +
    'user-select:none;-webkit-user-select:none;-webkit-user-drag:none}' +
    '.pbox.dragging{cursor:grabbing}';
  (document.head || document.documentElement).appendChild(style);

  // --- sound ---
  // Uses a synthesized blip by default (no audio file needed).
  // Set data-sound="file.mp3" to play your own sound instead.
  // Two sounds, one picked at random each time. Set
  // data-sounds="a.mp3,b.mp3" to use your own two files.
  var SOUNDS = (data.sounds || '').split(',')
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
  var audioCtx = null;

  function getAudio() {
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  // the two built-in sounds
  var SYNTHS = [
    // 1: bright rising blip
    { type: 'sine', from: 520, to: 880, rise: 0.08, len: 0.25 },
    // 2: low falling boop
    { type: 'triangle', from: 300, to: 140, rise: 0.12, len: 0.3 }
  ];

  function playSound(b) {
    var pick = Math.floor(Math.random() * 2); // 50/50
    if (SOUNDS.length) {
      var a = new Audio(SOUNDS[pick % SOUNDS.length]);
      a.volume = 0.6;
      a.play().catch(function () {});
      return;
    }
    var snd = SYNTHS[pick];
    var ctx = getAudio();
    if (!ctx) return;
    var t = ctx.currentTime;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = snd.type;
    osc.frequency.setValueAtTime(snd.from, t);
    osc.frequency.exponentialRampToValueAtTime(snd.to, t + snd.rise);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + snd.len);
    osc.connect(gain);
    var out = gain;
    if (ctx.createStereoPanner) {
      var pan = ctx.createStereoPanner();
      pan.pan.value = Math.max(-1, Math.min(1, (b.x / innerWidth) * 2 - 1));
      gain.connect(pan);
      out = pan;
    }
    out.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + snd.len + 0.05);
  }

  // beep now, then again every 1-3 seconds for as long as the box exists
  function scheduleSound(b) {
    b.timer = setTimeout(function () {
      if (!b.el.isConnected) return;
      playSound(b);
      scheduleSound(b);
    }, 1000 + Math.random() * 2000);
  }

  var bodies = [];
  var mouse = { x: innerWidth / 2, y: innerHeight / 2 };

  addEventListener('pointermove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  addEventListener('keydown', function (e) {
    if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.toLowerCase() !== KEY) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    getAudio(); // key press counts as a user gesture, unlocks audio
    spawn(mouse.x, mouse.y);
  });

  function spawn(x, y) {
    var el = document.createElement('div');
    el.className = 'pbox';
    document.body.appendChild(el);

    var b = {
      el: el, x: x, y: y, a: 0, vx: 0, vy: 0, w: 0, grab: null, timer: null
    };
    bodies.push(b);
    playSound(b);      // sound as soon as it spawns
    scheduleSound(b);  // then every 1-3 seconds

    el.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
      // grab point in box-local space
      var dx = e.clientX - b.x, dy = e.clientY - b.y;
      var c = Math.cos(-b.a), s = Math.sin(-b.a);
      b.grab = {
        lx: dx * c - dy * s,
        ly: dx * s + dy * c,
        cx: e.clientX, cy: e.clientY
      };
    });
    el.addEventListener('pointermove', function (e) {
      if (b.grab) { b.grab.cx = e.clientX; b.grab.cy = e.clientY; }
    });
    function release() { b.grab = null; el.classList.remove('dragging'); }
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);

    el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }

  // --- physics ---
  function corners(b) {
    var c = Math.cos(b.a), s = Math.sin(b.a);
    return [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]].map(function (p) {
      return { rx: p[0] * c - p[1] * s, ry: p[0] * s + p[1] * c };
    });
  }

  var walls = [
    { nx: 1,  ny: 0,  d: function (p) { return p.x; } },                // left
    { nx: -1, ny: 0,  d: function (p) { return innerWidth - p.x; } },   // right
    { nx: 0,  ny: 1,  d: function (p) { return p.y; } },                // top
    { nx: 0,  ny: -1, d: function (p) { return innerHeight - p.y; } }   // bottom
  ];

  function collideWalls(b) {
    for (var iter = 0; iter < 3; iter++) {
      for (var wi = 0; wi < walls.length; wi++) {
        var wall = walls[wi];
        var cs = corners(b);
        for (var ci = 0; ci < cs.length; ci++) {
          var k = cs[ci];
          var dist = wall.d({ x: b.x + k.rx, y: b.y + k.ry });
          if (dist >= 0) continue;
          // push out
          b.x += wall.nx * -dist;
          b.y += wall.ny * -dist;
          // velocity of the corner
          var vx = b.vx - b.w * k.ry;
          var vy = b.vy + b.w * k.rx;
          var vn = vx * wall.nx + vy * wall.ny;
          if (vn >= 0) continue;
          var rn = k.rx * wall.ny - k.ry * wall.nx;
          var invN = 1 / mass + rn * rn / inertia;
          var j = -(1 + RESTITUTION) * vn / invN;
          b.vx += wall.nx * j / mass;
          b.vy += wall.ny * j / mass;
          b.w += rn * j / inertia;
          // friction along the wall
          var tx = -wall.ny, ty = wall.nx;
          var vt = vx * tx + vy * ty;
          var rt = k.rx * ty - k.ry * tx;
          var invT = 1 / mass + rt * rt / inertia;
          var jt = -vt / invT;
          jt = Math.max(-FRICTION * j, Math.min(FRICTION * j, jt));
          b.vx += tx * jt / mass;
          b.vy += ty * jt / mass;
          b.w += rt * jt / inertia;
        }
      }
    }
  }

  function step(b, dt) {
    var fx = 0, fy = GRAVITY * mass, torque = 0;

    if (b.grab) {
      var g = b.grab;
      var c = Math.cos(b.a), s = Math.sin(b.a);
      var rx = g.lx * c - g.ly * s;
      var ry = g.lx * s + g.ly * c;
      // velocity of the grabbed point
      var vx = b.vx - b.w * ry;
      var vy = b.vy + b.w * rx;
      // spring toward the cursor
      var sx = SPRING_K * (g.cx - (b.x + rx)) - SPRING_C * vx;
      var sy = SPRING_K * (g.cy - (b.y + ry)) - SPRING_C * vy;
      fx += sx;
      fy += sy;
      torque += rx * sy - ry * sx;
      b.w *= 1 - Math.min(1, 3 * dt); // extra spin damping while held
    }

    b.vx += fx / mass * dt;
    b.vy += fy / mass * dt;
    b.w += torque / inertia * dt;

    b.vx *= 1 - AIR_DRAG * dt;
    b.vy *= 1 - AIR_DRAG * dt;
    b.w *= 1 - SPIN_DRAG * dt;

    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.a += b.w * dt;

    collideWalls(b);
  }

  var last = performance.now();
  function frame(now) {
    var frameDt = Math.min((now - last) / 1000, 0.05);
    last = now;
    var SUB = 4;
    for (var n = 0; n < bodies.length; n++) {
      var b = bodies[n];
      for (var i = 0; i < SUB; i++) step(b, frameDt / SUB);
      b.el.style.transform =
        'translate(' + b.x + 'px,' + b.y + 'px) rotate(' + b.a + 'rad)';
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

(function () {
  // Create fixed canvas container covering the full screen
  const canvas = document.createElement('canvas');
  canvas.id = 'bouncing-balls-canvas';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none', // Allows clicking through to underlying site elements
    zIndex: '100'
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height, bounceCeiling;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    // Set a ceiling so balls stay in the bottom ~35% of the screen without getting cut off
    bounceCeiling = height - Math.min(height * 0.35, 300);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Vibrant color palette
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F39C12', 
    '#8E44AD', '#1ABC9C', '#E74C3C', '#2ECC71', 
    '#3498DB', '#E67E22'
  ];

  // Physics constants
  const gravity = 0.35;
  const balls = [];

  // Larger ball sizes (30px to 50px radius, vs 12px-24px previously)
  for (let i = 0; i < 10; i++) {
    const radius = Math.random() * 20 + 30;
    const initialVx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 3 + 2);
    
    balls.push({
      x: Math.random() * (width - radius * 2) + radius,
      y: height - radius - Math.random() * 100,
      vx: initialVx,
      vy: -(Math.random() * 5 + 8),
      radius: radius,
      color: colors[i % colors.length]
    });
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    balls.forEach(ball => {
      // Physics updates
      ball.vy += gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Floor bounce (infinite bounce height)
      if (ball.y + ball.radius > height) {
        ball.y = height - ball.radius;
        // Calculate upward velocity required to launch ball back to bounceCeiling
        const launchDistance = height - ball.radius - (bounceCeiling + ball.radius);
        ball.vy = -Math.sqrt(2 * gravity * launchDistance) * (0.85 + Math.random() * 0.3);
      }

      // Top ceiling boundary clamp (prevents cutoffs)
      if (ball.y - ball.radius < bounceCeiling) {
        ball.y = bounceCeiling + ball.radius;
        ball.vy = Math.abs(ball.vy);
      }

      // Wall bounce (Left & Right)
      if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.vx = Math.abs(ball.vx);
      } else if (ball.x + ball.radius > width) {
        ball.x = width - ball.radius;
        ball.vx = -Math.abs(ball.vx);
      }

      // Render ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    });

    requestAnimationFrame(animate);
  }

  animate();
})();
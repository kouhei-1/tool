const ball = document.getElementById('ball');
const ballSize = 50; // 球のサイズ

let x = Math.random() * (window.innerWidth - ballSize);
let y = Math.random() * (window.innerHeight - ballSize);
let dx = 3; // x方向の速度
let dy = 3; // y方向の速度

function updatePosition() {
  // 位置を更新
  x += dx;
  y += dy;

  // 端に当たったら跳ね返る
  if (x <= 0 || x >= window.innerWidth - ballSize) {
    dx = -dx;
  }
  if (y <= 0 || y >= window.innerHeight - ballSize) {
    dy = -dy;
  }

  // スタイルを更新
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;

  // 次のフレームを要求
  requestAnimationFrame(updatePosition);
}

// 初期位置設定とアニメーション開始
ball.style.left = `${x}px`;
ball.style.top = `${y}px`;
updatePosition();

// ウィンドウリサイズ時の処理
window.addEventListener('resize', () => {
  x = Math.min(x, window.innerWidth - ballSize);
  y = Math.min(y, window.innerHeight - ballSize);
});

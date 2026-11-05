let idleSprite; // 儲存角色待機狀態的水平精靈圖。
let walkSprite; // 儲存角色行走狀態的水平精靈圖。
let characterX; // 儲存角色目前所在的畫布水平座標。
let characterY; // 儲存角色目前所在的畫布垂直座標。
let facingLeft = false; // 記錄角色是否面向畫面左側。
const IDLE_FRAME_WIDTH = 57; // 設定待機精靈圖中每一格的寬度。
const IDLE_FRAME_HEIGHT = 39; // 設定待機精靈圖中每一格的高度。
const IDLE_FRAME_COUNT = 5; // 設定待機動畫的總格數。
const WALK_FRAME_WIDTH = 67.25; // 設定行走精靈圖中每一格的寬度。
const WALK_FRAME_HEIGHT = 40; // 設定行走精靈圖中每一格的高度。
const WALK_FRAME_COUNT = 4; // 設定行走動畫的總格數。
const DISPLAY_SCALE = 2; // 設定角色顯示寬度與高度放大為原本的兩倍。
const MOVE_SPEED = 240; // 設定角色每秒移動的像素數。
const ANIMATION_SPEED = 8; // 設定角色每秒播放的動畫格數。

function preload() { // 在畫布開始繪製前載入角色圖片。
  idleSprite = loadImage("character/stop/stop.png"); // 載入五格的待機精靈圖。
  walkSprite = loadImage("character/walk/walk.png"); // 載入四格的行走精靈圖。
} // 結束圖片載入函式。

function setup() { // 設定畫布並初始化角色位置。
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
  characterX = (width - IDLE_FRAME_WIDTH * DISPLAY_SCALE) / 2; // 將放大後的角色水平放在畫布中央。
  characterY = (height - IDLE_FRAME_HEIGHT * DISPLAY_SCALE) / 2; // 將放大後的角色垂直放在畫布中央。
  imageMode(CORNER); // 讓圖片座標從圖片左上角開始計算。
} // 結束初始設定函式。

function draw() { // 每一個動畫影格都執行一次繪製與移動。
  background("#edf2fb"); // 使用最接近所提供色碼的有效補全色彩 #edf2fb。

  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查目前是否按住鍵盤右方向鍵。
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查目前是否按住鍵盤左方向鍵。
  const isWalking = movingRight || movingLeft; // 判斷目前是否需要播放行走動畫。
  const frameWidth = isWalking ? WALK_FRAME_WIDTH : IDLE_FRAME_WIDTH; // 依狀態選擇單格圖片寬度。
  const frameHeight = isWalking ? WALK_FRAME_HEIGHT : IDLE_FRAME_HEIGHT; // 依狀態選擇單格圖片高度。
  const displayWidth = frameWidth * DISPLAY_SCALE; // 計算放大後要顯示的角色寬度。
  const displayHeight = frameHeight * DISPLAY_SCALE; // 計算放大後要顯示的角色高度。
  const frameCount = isWalking ? WALK_FRAME_COUNT : IDLE_FRAME_COUNT; // 依狀態選擇動畫總格數。
  const currentSprite = isWalking ? walkSprite : idleSprite; // 依狀態選擇要繪製的精靈圖。
  const currentFrame = floor(millis() / 1000 * ANIMATION_SPEED) % frameCount; // 依時間循環切換動畫格。

  if (movingRight) { // 如果按住右方向鍵，就讓角色朝右移動。
    characterX += MOVE_SPEED * deltaTime / 1000; // 依每秒速度與畫格時間更新水平位置。
    facingLeft = false; // 設定角色面向右側。
  } else if (movingLeft) { // 如果沒有按右鍵但按住左方向鍵，就朝左移動。
    characterX -= MOVE_SPEED * deltaTime / 1000; // 依每秒速度與畫格時間更新水平位置。
    facingLeft = true; // 設定角色面向左側。
  } // 結束方向鍵移動判斷。

  characterX = constrain(characterX, 0, width - displayWidth); // 限制放大後的角色不會移出畫布左右邊界。
  characterY = constrain(characterY, 0, height - displayHeight); // 限制放大後的角色不會移出畫布上下邊界。

  if (facingLeft) { // 角色面向左側時使用水平翻轉繪圖。
    push(); // 暫存畫布目前的繪圖狀態。
    translate(characterX + displayWidth, characterY); // 將翻轉基準點移到放大後角色圖片的右上角。
    scale(-1, 1); // 水平翻轉畫布，讓角色朝向左側。
    image(currentSprite, 0, 0, displayWidth, displayHeight, currentFrame * frameWidth, 0, frameWidth, frameHeight); // 以兩倍大小繪製目前動畫格。
    pop(); // 還原畫布狀態，避免影響其他繪圖。
  } else { // 角色面向右側時直接繪製圖片。
    image(currentSprite, characterX, characterY, displayWidth, displayHeight, currentFrame * frameWidth, 0, frameWidth, frameHeight); // 以兩倍大小繪製目前動畫格。
  } // 結束角色方向繪製判斷。
} // 結束每格繪製函式。

function windowResized() { // 瀏覽器視窗大小改變時重新調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個瀏覽器視窗。
  characterX = constrain(characterX, 0, width - WALK_FRAME_WIDTH * DISPLAY_SCALE); // 調整角色位置以避免視窗縮小後超出邊界。
  characterY = constrain(characterY, 0, height - WALK_FRAME_HEIGHT * DISPLAY_SCALE); // 調整角色位置以避免視窗縮小後超出邊界。
} // 結束視窗尺寸變更函式。

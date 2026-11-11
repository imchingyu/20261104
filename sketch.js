let stopSheet; // 儲存停止動畫的水平精靈圖。
let walkSheet; // 儲存行走動畫的水平精靈圖。
let characterX; // 儲存角色在畫布中的水平中心位置。
let characterY; // 儲存角色在畫布中的垂直中心位置。
let facing = 1; // 記錄角色方向，1 代表向右，-1 代表向左。
const STOP_FRAME_COUNT = 6; // 設定停止精靈圖中的影格數。
const WALK_FRAME_COUNT = 6; // 設定行走精靈圖中的影格數，依實際圖片共有六格設定。
const MOVE_SPEED = 3; // 設定每次繪圖時角色移動的像素數。
const ANIMATION_FRAME_DELAY = 8; // 設定每個動畫影格維持的繪圖次數。

function preload() { // 在畫布建立前載入角色精靈圖。
	stopSheet = loadImage("character/stop/stop.png"); // 載入停止動畫精靈圖。
	walkSheet = loadImage("character/walk/walk.png"); // 載入行走動畫精靈圖。
} // 結束 preload 函式。

function setup() { // 設定畫布與角色初始位置。
	createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
	imageMode(CORNER); // 使用圖片左上角作為繪製座標基準。
	characterX = width / 2; // 將角色初始水平位置設在畫布中央。
	characterY = height / 2; // 將角色初始垂直位置設在畫布中央。
} // 結束 setup 函式。

function draw() { // 每一畫格更新背景、移動與角色動畫。
	background("#EDF2BF"); // 使用接近指定色碼 edf2b 的六位色碼作為背景。
	const movingRight = keyIsDown(RIGHT_ARROW); // 檢查目前是否按住鍵盤右方向鍵。
	const movingLeft = keyIsDown(LEFT_ARROW); // 檢查目前是否按住鍵盤左方向鍵。
	let isWalking = false; // 預設角色目前沒有行走。

	if (movingRight) { // 按住右方向鍵時執行向右移動。
		characterX += MOVE_SPEED; // 將角色水平位置向右增加。
		facing = 1; // 設定角色面向右方。
		isWalking = true; // 切換為行走動畫。
	} else if (movingLeft) { // 按住左方向鍵時執行向左移動。
		characterX -= MOVE_SPEED; // 將角色水平位置向左減少。
		facing = -1; // 設定角色面向左方。
		isWalking = true; // 切換為行走動畫。
	} // 結束方向鍵判斷。

	const currentFrame = isWalking ? floor(frameCount / ANIMATION_FRAME_DELAY) % WALK_FRAME_COUNT : 0; // 行走時循環播放影格，停止時固定顯示第一格。
	const sourceFrameWidth = isWalking ? walkSheet.width / WALK_FRAME_COUNT : stopSheet.width / STOP_FRAME_COUNT; // 計算目前精靈圖每格的來源寬度。
	const sourceFrameHeight = isWalking ? walkSheet.height : stopSheet.height; // 取得目前精靈圖每格的來源高度。
	const currentSheet = isWalking ? walkSheet : stopSheet; // 選擇目前狀態要繪製的精靈圖。
	const frameSourceX = currentFrame * sourceFrameWidth; // 計算目前影格在精靈圖中的水平起點。

	characterX = constrain(characterX, sourceFrameWidth / 2, width - sourceFrameWidth / 2); // 限制角色不會移出畫布左右邊界。
	push(); // 暫存目前的繪圖座標與變形設定。
	translate(characterX, characterY); // 將繪圖原點移至角色中心。
	if (facing === -1) { // 角色面向左方時執行水平翻轉。
		scale(-1, 1); // 將角色圖像水平鏡射以面向左方。
	} // 結束角色方向翻轉判斷。
	image(currentSheet, -sourceFrameWidth / 2, -sourceFrameHeight / 2, sourceFrameWidth, sourceFrameHeight, frameSourceX, 0, sourceFrameWidth, sourceFrameHeight); // 裁切並繪製目前動畫影格。
	pop(); // 還原繪圖座標與變形設定。
} // 結束 draw 函式。

function windowResized() { // 瀏覽器視窗尺寸改變時重新調整畫布。
	resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗大小。
	characterX = constrain(characterX, 0, width); // 將角色水平位置限制在新畫布範圍內。
	characterY = constrain(characterY, 0, height); // 將角色垂直位置限制在新畫布範圍內。
} // 結束 windowResized 函式。

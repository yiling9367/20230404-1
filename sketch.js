let points = [[0, 0], [5, 0], [10, 0], [5, 5], [0, 10], [0, 5], [0, 0], [0, -5], [5, -5], [10, -5], [5, -10], [0, -10], [-5, -10], [-10, -5], [-5, -5], [0, -5]];
let numLayers = 5; //圖層數量
let maxSize; //最大大小
let minZoom = 0.1; //最小縮放比例
let maxZoom = 10; //最大縮放比例
let zoom; //當前縮放比例

function setup() { //只會執行一次的函數會先執行
  createCanvas(windowWidth, windowHeight); //設定一個畫布，寬為整個視窗的寬度windowWidth，高度為整個視窗的高度windowHeight
  textSize(48); //文字大小
  textAlign(CENTER, CENTER); //文字居中
  noFill(); 
  stroke(0); 
  maxSize = min(width, height) / 2; //最大大小為寬度和高度中較小值的一半
  zoom = (minZoom + maxZoom) / 2; //初始缩放比例為最小和最大缩放比例的平均值
}

function draw() { //畫圖的函數，每秒進到函數執行60次
  background(255); //設定畫布的背景顏色，背景顏色為255(白)
  translate(width / 2 + mouseX - width / 2, height / 2 + mouseY - height / 2); //根據滑鼠位置移動整個圖形
  scale(zoom); //根據縮放比例縮放整個圖形
  for (let i = 1; i <= numLayers; i++) { //從小到大循環圖層
    let layerSize = maxSize * i / numLayers; //計算圖層大小
    let gradient = drawingContext.createLinearGradient(-layerSize, 0, layerSize, 0); //創建線性漸變對象
    gradient.addColorStop(0, '#FF0000'); //加起始顏色
    gradient.addColorStop(1, '#0000FF'); //加结束顏色
    drawingContext.strokeStyle = gradient; //設置線條顏色為漸變
    strokeWeight(2); //設置線條寬度
    beginShape(); //將所有點連接起來
    for (let j = 0; j < points.length; j++) {
      let x = points[j][0] * layerSize / 15; //計算點的 x 座標
      let y = -points[j][1] * layerSize / 15; //計算點的 y 座標
      vertex(x, y);
    }
    endShape(CLOSE); //圖層所有點連起來
  }
  push(); //保存圖層狀態
  translate(-textWidth('淡江大學教科一A') / 2, 0); //將畫布移到中央
  text('淡江大學教科一A', 0, 0); //文字
  pop(); //恢復
}

function mouseMoved() {
  let delta = mouseX - width / 2; //計算滑鼠距離中心點的距離
  let zoomDelta = map(delta, -width / 2, width / 2, -0.2, 0.2); //將距離控制在縮放比例的範圍內
  zoom += zoomDelta; //根據滑鼠位置更新縮放比例
  zoom = constrain(zoom, minZoom, maxZoom); //限制縮放比例的範圍
}
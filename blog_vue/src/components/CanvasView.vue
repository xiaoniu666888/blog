<template>
    <canvas ref="canv" class="canvas hidden-xs-only"></canvas>
</template>
  
<script  setup>
import { onMounted, ref } from "vue"
// 响应式
let width = ref(""), height = ref(""), canv = ref(null);
let cxt, time, num = 200, date = 0, newDate = new Date(), data = [];

onMounted(() => {
    cxt = canv.value.getContext("2d");
    initCanvas(canv.value)
    window.onresize = () => {
        initCanvas(canv.value)
    }
})

const initCanvas = (canvas) => {
    newDate = new Date()
    // 设置节流 小于1秒 不执行
    if (newDate - date >= 500) {
        clearInterval(time)
        date = newDate
        data = []
        canvas.width = width.value = document.documentElement.clientWidth;
        canvas.height = height.value = document.documentElement.clientHeight;
        init(); //初始化
    }
};

const init = () => {
    // 存储 星星各个位置
    handle();
    // 画圆
    time = setInterval(circre, 60)
};

const handle = () => {
    for (let i = 0; i < num; i++) {
        data.push({
            x: Math.floor(Math.random() * width.value),
            y: Math.floor(Math.random() * height.value),
            r: Math.random() * 4 + 1,
            moveX: Math.random() - 0.5, // 用于星星移动步数
            moveY: Math.random() - 0.5 // 用于星星移动步数
        });
    }
};

const circre = () => {
    cxt.clearRect(0, 0, width.value, height.value)
    // 清除画布区域  清除了上一次画布的所有内容
    cxt.fillStyle = "skyblue";
    data.forEach((item, index) => {
        cxt.arc(item.x, item.y, item.r, 0 * Math.PI, 2 * Math.PI,);
        cxt.fill();
        cxt.beginPath();
        // 在原有的基础进行 添加 或减少 从而进行移动
        item.x += item.moveX;
        item.y += item.moveY;
        // console.log(data[index+1].x);
        // 判断两点之间线段距离   同时需要和每个圆点进行比较
        for (let i = index + 1; i < data.length; i++) {
            line(item.x, item.y, i)
        }
        // 反弹
        if (item.x < 0 || item.x > width.value - 17) {
            item.moveX = -item.moveX
        }
        if (item.y < 0 || item.y > height.value) {
            item.moveY = -item.moveY
        }
    })
};

const line = (x, y, i) => {
    let x1 = data[i].x;
    let y1 = data[i].y;
    if (Math.pow(x - x1, 2) + Math.pow(y - y1, 2) <= 400 * 5) {
        cxt.moveTo(x, y);
        cxt.lineTo(x1, y1);
        let add = cxt.createLinearGradient(x, y, x1, y1);
        add.addColorStop(0, "#fff");
        add.addColorStop(0.5, "skyblue");
        add.addColorStop(1, "pink");
        cxt.strokeStyle = add;
        cxt.lineWidth = 2;
        cxt.stroke();
        cxt.beginPath();
    }
}
</script>
  
<style lang="scss" scoped>
.canvas {
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%
}
</style>
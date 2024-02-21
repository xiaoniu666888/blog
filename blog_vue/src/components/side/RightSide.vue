<script setup>
import { ref, onMounted } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';
let locale = ref(zhCn)

onMounted(() => {
    new APlayer({
        container: document.getElementById('player'),
        mini: false,
        autoplay: false,
        theme: '#FADFA3',
        loop: 'all',
        order: 'random',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: false,
        listMaxHeight: 90,
        lrcType: 3,
        audio: [
            {
                name: '离别开出花',
                artist: '就是南方凯',
                url: 'https://music.163.com/song/media/outer/url?id=2061978961.mp3',
                cover: 'https://p2.music.126.net/MgrERz_auwIi5Km64TxwjQ==/109951169154658797.jpg',
                lrc: 'lrc1.lrc',
                theme: '#ebd0c2'
            },
            {
                name: '悬溺',
                artist: '葛东琪',
                url: 'https://music.163.com/song/media/outer/url?id=1397345903.mp3',
                cover: 'https://p2.music.126.net/CDhYcShQKH2VAMENuCxWWQ==/109951164166513349.jpg',
                lrc: 'lrc2.lrc',
                theme: '#46718b'
            }
        ]
    });
})

</script>


<template>
    <div class="right">
        <!-- 日历 -->
        <div class="calendar">
            <el-config-provider :locale="locale">
                <el-calendar style="background: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%)
;margin: 0; padding: 0;
">
                    <!-- <template #header="{ date }">
                        <el-button-group>
                            <span>{{ date }}</span>
                        </el-button-group>
                    </template> -->
                </el-calendar>
            </el-config-provider>
        </div>
        <p class="player_title">音乐随心听</p>
        <!-- 播放器 -->
        <div id="player">

        </div>

    </div>
</template>


<style lang="scss" scoped>
.right {
    width: 100%;
    height: 100%;
    // position: relative;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    // justify-content: left;
    align-items: left;

    .calendar {
        width: 100%;

        box-sizing: border-box;
    }

    .player_title {
        font-size: 20px;
        color: #676767;
        margin-bottom: 1vh;
    }

    #player {
        width: 100%;
        background: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%);
    }


}

.el-calendar {
    --el-calendar-cell-width: auto;
}
</style>
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
                <el-calendar>
                    <template #header="{ date }">
                        <el-button-group>
                            <span>{{ date }}</span>
                        </el-button-group>
                    </template>
                </el-calendar>
            </el-config-provider>
        </div>

        <!-- 播放器 -->
        <div id="player">

        </div>

    </div>
</template>


<style lang="scss" scoped>
.right {
    width: 25vw;
    height: 100%;
    position: relative;
    overflow-y: scroll;

    .calendar {
        width: 100%;
        border-bottom: 2px solid #eee;
        box-sizing: border-box;
    }

    #player {
        width: 20vw;
    }


}

.el-calendar {
    --el-calendar-cell-width: auto;
}
</style>
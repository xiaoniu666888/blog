<script setup>
import LeftSide from '@/components/side/LeftSide.vue';
import HeaderView from '@/components/HeaderView.vue';
import RightSide from '@/components/side/RightSide.vue';

</script>

<template>
    <div id="home">
        <header>
            <header-view></header-view>
        </header>

        <main>
            <div class="center">
                <div class="content">
                    <div class="leftSide hidden-xs-only">
                        <right-side></right-side>
                    </div>
                    <div class="middle-content">
                        <router-view class="router-view animate__animated animate__fadeInDown "></router-view>
                    </div>
                    <div class="rightSide hidden-xs-only">
                        <left-side></left-side>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    justify-content: space-between;
    padding-top: 2vh;
    // height: 100vh;
    height: calc(100vh - 50px);
    /* 设置 content 的高度为视口的 100% */
    box-sizing: border-box;
}

.leftSide,
.middle-content,
.rightSide {
    /* 添加 overflow-y 属性来允许独立滚动 */
    overflow-y: auto;
}

.leftSide {
    width: 20vw;
    text-align: center;
    border-right: 1px solid #87CEEB;
    padding-right: 5px;
    box-sizing: border-box;
    /* 设置最小高度以避免在内容较少时折叠 */
    min-height: 100%;


}

.middle-content {

    flex: 1;
    box-sizing: border-box;
    // // background: linear-gradient(to right, #9fe1fa, #f4edc9);
    // background: radial-gradient(circle, #f4edc9, #6ccdf0);

    .router-view {

        width: 100%;


    }

    /* 为中间部分设置最小高度，避免在内容较少时折叠 */
    min-height: 0;
}

.rightSide {
    width: 25vw;
    text-align: center;
    border-left: 1px solid #87CEEB;
    padding-left: 5px;
    box-sizing: border-box;
    /* 设置最小高度以避免在内容较少时折叠 */
    min-height: 0;

}
</style>

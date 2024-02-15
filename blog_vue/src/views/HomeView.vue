<script setup>
import LeftSide from '@/components/side/LeftSide.vue';
import HeaderView from '@/components/HeaderView.vue';
import RightSide from '@/components/side/RightSide.vue';

</script>

<template>
    <div id="home">
        <header>
            <div class="center">
                <header-view></header-view>
            </div>
        </header>

        <main>
            <div class="center">
                <div class="content">
                    <div class="leftSide hidden-xs-only">
                        <left-side></left-side>
                    </div>
                    <div class="middle-content">
                        <router-view class="center"></router-view>
                    </div>
                    <div class="rightSide hidden-xs-only">
                        <right-side></right-side>
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
    box-shadow: 0px 0px 3px 2px #eee;
    height: calc(100vh - 50px);
    box-sizing: border-box;

    .leftSide {
        width: 20vw;
        text-align: center;
        border-right: 1px solid #87CEEB;
        padding-right: 5px;
        box-sizing: border-box;
    }

    .middle-content {
        flex: 1;

    }

    .rightSide {
        width: 25vw;
        text-align: center;
        border-left: 1px solid #87CEEB;
        padding-left: 5px;
        box-sizing: border-box;
    }
}
</style>


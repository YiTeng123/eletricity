<template>

    <div class="common-layout">
        <el-container>
            <el-aside :width="[ store.AsideButton ? AsideWidthTrue : AsideWidthFalse ]">
                <my-aside></my-aside>
            </el-aside>
            <el-container style="background-color: rgb(5, 18, 50);">
                <el-header style="height: 90px; border-left: 1px solid #2C3A6B;background-color: #0A1940;">
                    <MyHeader></MyHeader>
                </el-header>
                <el-main style=" border-left: 1px solid #2C3A6B; background-color:#051232;">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>


</template>

<script setup lang="ts">
import MyHeader from '../components/MyHeader.vue';
import MyAside from '../components/MyAside.vue'
import { useStore } from '../store';
const store = useStore()
const AsideWidthTrue:String = '253px'
const AsideWidthFalse:String = '117px'


</script>

<style lang="less">
.common-layout {
    height: 100%;

    .el-container {
        height: 100%;
     
        .el-aside {
            height: 100%;
            // width: 20%;
            background-color: #00113B;

            // color: ;
            .el-menu {
                background-color: #00113B;
                border: none;
                margin-right: 0 !important;
            }

            .el-menu-item {
                font-size: 16px;
                // color: #fff;
                // padding: 40px 0 40px 0;
                padding-left:10px;
            }

            .el-menu-item:hover {
                //  pointer-events: none;
                // background-image: url('../assets/image/hover.png') !important;
                background: linear-gradient(90deg, #3F60B8 0%, rgba(111,130,181,0) 100%);
            }
        }
    }
}
</style>
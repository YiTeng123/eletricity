<template>
    <div class="econtainer">
        <div class="eheads">
            <div @click="handleHead(0)" class="displayy eheader-item "
                :class="isActive ? 'eheader-item_active' : 'eheader-item_quiet'">人脸识别</div>
            <div @click="handleHead(1)" class="displayy eheader-item "
                :class="isActive ? 'eheader-item_quiet' : 'eheader-item_active'">压板识别</div>
        </div>
        <div class="monitor-view">
            <div class="monitor-view-left">
                <div class="monitor-view-left-head">
                    <div class="monitor-title">压板识别03</div>
                    <div class="time displayy">
                        <div class="monitor-Yeartime displayy">{{  Yeartime  }}</div>
                        <div class="monitor-Hourtime">{{  Hourtime  }}</div>
                    </div>
                </div>
                <div class="monitor-view-left-center displayy">
                    <canvas id="video-canvas"></canvas>
                    <!-- <video ref="videoRef" src=""></video> -->
                </div>

                <div class="monitor-view-left-footer">

                    <el-scrollbar height="100%" always>
                        <div class="items-box ">

                            <div style="background-color: #393F4F;" ref="test" v-for="(item, index) in renderList"
                                :key="index" class="items-button displayy" @click="changesrc(item.port, index)">{{
                                 item.name 
                                }}
                            </div>



                        </div>
                    </el-scrollbar>
                </div>

            </div>
            <div class="monitor-view-right">
                <div class="right-header"> <span class="detail-record">详情记录</span> </div>
         
                <div class="right-detail">

                    <div class="detail-items" v-for="(item, index) in rightList " :key="index">

                        <div class="gg displayy">
                            <div :style="{ backgroundImage: `url(${item.img})` }" class="detail-items-left"></div>
                        </div>

                        <div class="detail-items-right">

                            <div class="title">{{  item.name  }}</div>
                            <div class="context">{{  item.type  }}</div>

                        </div>

                    </div>


                </div>

            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { clearForms } from '@/global/clearForm'
import { alarms_list, equipmentX, monitorList_interface } from '@/server/interface'
import { monitorList_Api } from '../../server/modules/monitor'
import { useJMonitor_list } from '../../hook/useMonitor'
onMounted(() => {
    getTime()
    setInterval(getTime, 60000)
    getMonitor_list()
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'jsmpeg.min.js';
    document.body.appendChild(s);
    var canvas = document.getElementById('video-canvas');
    playArray.push(createPlayer(`ws:////192.168.1.115:9082`)
    )
   
})

 onUnmounted(() => { playArray.forEach((item: any) => { item.stop() }) })
//组合式API

// 创建播放的实例
const createPlayer = (urlPort: string) => {
    var canvas = document.getElementById('video-canvas');
    return new JSMpeg.Player(urlPort, { canvas: canvas, audio: false });
}
var playArray: any = []

// 控制按钮高亮
let isActive = ref<boolean>(false)
    // 按钮列表的dom,它是一个数组
let test = ref(null)

// 切换人脸识别和压板识别
let monitorList = reactive<equipmentX>({
    人脸识别: [],
    压板识别: []
})
const handleHead = (id: number) => {
    if (id == 0) {
        isActive.value = true
        renderList.length = 0
        renderList.push(...monitorList['人脸识别'])
    }
    else {
        isActive.value = false
        renderList.length = 0
        renderList.push(...monitorList['压板识别'])
    }
    let testRef = test.value as any
    testRef.forEach((element: any) => {
        element.style.backgroundColor = '#393F4F'
    });
}
const changesrc = (src: string, index: number) => {
    let testRef = test.value as any
    testRef.forEach((element: any) => {
        element.style.backgroundColor = '#393F4F'
    });
    testRef[index].style.backgroundColor = '#3F60B8'
    console.log(src);
    playArray.forEach((item: any) => { item.stop() })
    playArray.push(createPlayer(`ws:////192.168.1.115:${src}`))
}






let Yeartime = ref<string>()
let Hourtime = ref<string>()
function getTime() {
    var date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    Yeartime.value = year + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day)
    Hourtime.value = (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes)
};



const rightList = ref<alarms_list[]>([])
let renderList = reactive<monitorList_interface[]>([])
const getMonitor_list = async () => {
    const { monitors: { equipments, alarms } } = await useJMonitor_list(monitorList_Api)
    monitorList = equipments
    rightList.value = alarms
    // 请求到数据之后，再放进渲染数组
    handleHead(1)

}


</script>

<style scoped lang="less">
.eheads {
    display: flex;

    .eheader-item {
        margin-right: 10px;
        width: 148px;
        height: 42px;
        cursor: pointer;
    }

    .eheader-item_quiet {
        background-image: url(./image/monitorItem.png);
    }

    .eheader-item_active {

        background-image: url(./image/active.png);
    }
}

.monitor-view {
    flex: 1;

    margin-top: 10px;
    display: flex;

    .monitor-view-left {
        flex: 2.2;
        margin-right: 14px;
        // background-color: blue;
        border: 3px solid #2C3C58;
        display: flex;
        flex-direction: column;

        .monitor-view-left-head {
            width: 100%;
            // background-color: red;
            flex: 1;
            display: flex;
            justify-content: space-between;

            .monitor-title {
                display: flex;
                height: 100%;
                align-items: center;
                margin-left: 28px;
            }

            .time {
                .monitor-Yeartime {
                    margin-right: 28px;
                }

                .monitor-Hourtime {
                    margin-right: 30px;
                }
            }
        }

        .monitor-view-left-center {
            flex: 10;
            // background-color: green;


            & video {
                width: auto;
                height: 100%;

            }

            & #video-canvas {
                width: 98%;
                height: 98%;
            }
        }

        .monitor-view-left-footer {
            flex: 2.5;
            padding: 13px 13px 20px 13px;
            height: 100%;

            .items-box {
                width: 100%;
                background-color: #15203B;
                height: 100%;
                max-height: 120px;
                display: flex;
                flex-wrap: wrap;
                overflow-y: auto;

                // padding:0 10px 0 10px;
                .items-button {
                    width: calc((100%-104px)/7);
                    min-width: calc((100% - 104px) / 7);
                    max-width: calc((100% - 104px) / 7);
                    height: 25%;
                    margin: 10px 13px 10px 0;
                    overflow: hidden;
                    cursor: pointer;
                    border-radius: 4px;
                }

                .items-button:nth-child(7n-6) {
                    margin-left: 13px;

                }
            }
        }
    }

    .monitor-view-right {
        flex: 1;
        // background-color: red;
        display: flex;
        flex-direction: column;

        border: 3px solid #2C3C58;
        border-top: none;
        .right-header {
            font-size: 18px;
            // padding: 0 0 16px 22px;
            background-color: #393F4F;
            flex: 1;
            display: flex;
            align-items: center;

            .detail-record {
                color: #fff;
                margin-left: 10px;
                font-size: 18px;
            }
        }

        .right-detail {
            flex: 12.5;
            padding-bottom: 20px;
            height: 100%;
            overflow-y: auto;
            padding: 5px;
            background-color: #15203B;

            .detail-items {
                margin: 10px 10px 0 10px;
                display: flex;
                //三行代码限制列表只有六个
                height: calc((100%-60px)/6);
                min-height: calc((100% - 60px) / 6);
                max-height: calc((100% - 60px) / 6);

                .gg {
                    width: 20%;
                    height: 100%;
                    background-color: #1B2746;
                    // padding: 5px;

                    .detail-items-left {
                        width: 75%;
                        height: 75%;
                        background-position: center;
                        background-size: cover;
                        background-color: #1B2746;

                    }
                }


                .detail-items-right {
                    flex: 1;
                    margin-left: 12px;
                    background-color: #1B2746;
                    color: #CFD7E9;
                    font-size: 16px;

                    .title {
                        color: #CFD7E9;
                        font-size: 16px;
                        margin-left: 20px;
                        margin-top: 3px;
                    }

                    .context {
                        font-size: 14px;
                        line-height: 22px;
                        margin-left: 20px;
                    }
                }
            }

        }
    }
}
</style>
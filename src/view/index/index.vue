<template>

    <div class="index-container">
        <div class="index-first">
            <div class="board">
                <div class="eqSum">
                    <div class="row1">
                        <div class="first-icon" />
                        <span class="allNumber">总计设备数量</span>
                    </div>
                    <div class="row2">{{ osInfoObj.osInfo.equipmentCnt }}</div>
                    <div class="row3"></div>
                    <div class="row4">
                        <div class="openedEq">
                            <div class="index-span">启动设备</div>
                            <div class="index-number">{{ osInfoObj.osInfo.openCnt }}</div>
                        </div>
                        <div class="openedEq">
                            <div class="index-span">未启动设备</div>
                            <div class="index-number">{{ osInfoObj.osInfo.closeCnt }}</div>
                        </div>
                    </div>
                </div>
                <div class="alarmSum">
                    <div class="row1">
                        <div class="first-icon" />
                        <span class="allNumber">总计设备数量</span>
                    </div>
                    <div class="sumAlarmnumber">{{osInfoObj.osInfo.alarmTotalCnt}}</div>
                </div>
            </div>
            <div class="eq-table">
                <div class="eq-table-header">
                    <div class="eq-table-header-left"> 设备信息 </div>
                    <div class="eq-table-header-right displayy">
                        <div class="eq-readDetail">查看详情</div>
                        <div class="eq-tableIcon"></div>
                    </div>
                </div>
                <div class="index-tableBox ">
                    <el-scrollbar height="250PX">
                        <el-table :data="equipmentInfo" style="width: 100% ;overFlow:hidden"
                            :header-cell-style="{ background: '#15203b',padding:'10px 0 10px 0' }"
                            :row-style="{ background: '#0e192a', color: '#CFD7E9', fontSize: '16px' }">


                            <el-table-column align="center" prop="name" label="设备名称" width="" />
                            <el-table-column align="center" prop="algorithm" label="运用算法" width="" />
                            <el-table-column align="center" prop="duration_time" label="连续运行时间" width="" />
                            <el-table-column align="center" prop="last_time" label="上次报警时间" />
                            <el-table-column align="center" prop="untreatCnt" label="未处理次数" />
                            <el-table-column align="center" prop="AlarmCnt" label="报警次数" />



                        </el-table>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <div class="index-second">
            <div class="alarmTable">
                <div class="alarmTable_header">
                    <div class="alarmTable_headerLeft"> 报警列表 </div>
                    <div class="alarmTable_headerRight displayy">
                        <div class="alarmTablereadDetail">查看详情</div>
                        <div class="alarmTableIcon"></div>
                    </div>
                </div>
                <div class="index-tableBox ">
                    <el-scrollbar height="200PX">
                        <el-table :data="alarmInfo" style="width: 100% ;overFlow:hidden"
                            :header-cell-style="{ background: '#15203b',padding:'10px 0 10px 0' }"
                            :row-style="{ background: '#0e192a', color: '#CFD7E9', fontSize: '16px' }">


                            <el-table-column align="center" prop="name" label="设备" width="" />
                            <el-table-column align="center" prop="type" label="报警类别" width="" />
                            <el-table-column align="center" prop="level" label="等级" width="" />
                            <el-table-column align="center" prop="time" label="报警时间" width="" />




                        </el-table>
                    </el-scrollbar>
                </div>
            </div>

            <div class="echartsBox">
                <div class="echartsTables">
                    <div class="echeader"><span class="ecdetail">报警次数排行</span> </div>
                    <div class="timer">
                        <div class="timerItemBox">
                            <div class="timerItem timerItemActive" @click="getCurrentDom">本日</div>
                            <div class="timerItem" @click="getCurrentDom">本周</div>
                            <div class="timerItem" @click="getCurrentDom">本月</div>
                        </div>

                    </div>
                </div>

                <div style="margin-left: 21px;" class="echartsTables">
                    <div class="echeader"><span class="ecdetail">设备报警排行</span> </div>
                    <div class="timer">
                        <div class="timerItemBox">
                            <div class="timerItem timerItemActive" @click="get_eqSecond({type:0}),getCurrentDom">本日</div>
                            <div class="timerItem" @click="get_eqSecond({type:1})" >本周</div>
                            <div class="timerItem" @click="get_eqSecond({type:2})">本月</div>
                        </div>

                    </div>
                    <div class="ecBody">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import {
    alarminfoInter,
    equipmentinfoInter,
    osInter,
} from "@/server/interface";

import * as echarts from 'echarts'

import { indexApi, indexEcApi, indexEcinter ,indexEcfirstApi} from "../../server/modules/index";



onMounted(async () => {
    const {
        data: { alarm_info, equipment_info, os_info },
    } = await indexApi();

    alarmInfo.push(...alarm_info);
    equipmentInfo.push(...equipment_info);
    osInfoObj.osInfo = os_info;

    get_eqSecond({type:0})


});
const alarmInfo = reactive<alarminfoInter[]>([]);
const equipmentInfo = reactive<equipmentinfoInter[]>([]);

// const alarmFirst=reactive([])
// const get_alarmFirst=async(parmas:any)=>{
//    const{a}= await  indexEcfirstApi({})
//    alarmFirst.push(...a)

// }
const eqSecond = reactive<indexEcinter[]>([])
const get_eqSecond = async (parmas: any) => {
   
    const { alarmRank } = await indexEcApi(parmas)
    eqSecond.push(...alarmRank)
    console.log(eqSecond);
  
}


let osInfoObj = reactive({
    osInfo: {
        alarmTotalCnt: 0,
        closeCnt: 0,
        equipmentCnt: 0,
        openCnt: 0,
    },
});
const isCollapse = ref(true);

const getCurrentDom = (e: Event) => {
    const a = [...(e.target as any).parentNode.children]
    a.forEach((item: any, indx: any) => {
        console.log(item);
        item.classList.remove('timerItemActive')
        item.classList.add('timerItem')
    });

    (e.target as any).classList.add('timerItemActive')
    // (e.target as any).classList.remove('timerItem')
    console.log((e.target as any).classList);

}
</script>
    

<style>
.ecdetail {
    font-size: 18px;
    margin-left: 20px;
    font-weight: 400;
    color: #FFFFFF;
}

.timerItemBox {
    display: flex;
    width: 40%;
    justify-content: space-around;

}

.timerItem {
    font-size: 16px;
    /* font-family: Microsoft YaHei; */
    font-weight: 400;
    color: #6A7591;
    cursor: pointer;
}

.timerItemActive {
    font-size: 16px;
    /* font-family: Microsoft YaHei; */
    font-weight: 400;
    color: #4B71EE;
    cursor: pointer;
    border-bottom: 1px solid #4B71EE;
}

.echartsTables {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px solid rgba(22, 36, 64, 0.81);
    ;
}

.echartsTables .echeader {
    height: 15%;
    display: flex;
    align-items: center;
    background-color: #274083;
}

.echartsTables .timer {
    height: 15%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.echartsTables .ecBody {
    flex: 1;
    background-color: #fff;
}
</style>
<style lang="less" scope>
.index-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    // background-color: yellow;
    .index-first {
        display: flex;
        flex: 1;
        // background-color: black;
        margin-bottom: 20px;

        .board {
            display: flex;
            flex-direction: column;
            flex: 1;

            .eqSum {
                flex: 1.2;
                margin-bottom: 21px;
                background-image: url(./image/s1.png);
                background-size: cover;
                // background-position: center;
                display: flex;
                flex-direction: column;

                .row1 {
                    display: flex;
                    margin: 20px 0 0 27px;

                    .first-icon {
                        background-image: url(./image/camera.png);
                        width: 30px;
                        height: 30px;
                    }

                    .allNumber {
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #cfd7e9;
                        line-height: 30px;
                        margin-left: 11px;
                    }
                }

                .row2 {
                    font-size: 40px;
                    font-weight: bold;
                    color: #ffffff;
                    margin-left: 63px;
                    margin-top: 8px;
                }

                .row3 {
                    height: 1px;
                    background: #ffffff;
                    opacity: 0.1;
                    width: 90%;
                    margin: 10px auto;
                }

                .row4 {
                    display: flex;
                    justify-content: space-evenly;
                    align-content: center;
                    flex: 1;

                    .openedEq {
                        display: flex;
                        font-size: 16px;
                        font-weight: 400;
                        color: #bec6da;

                        .index-number {
                            font-size: 16px;
                            font-weight: bold;
                            color: #ffffff;
                            margin-left: 23px;
                        }
                    }
                }
            }

            .alarmSum {
                flex: 1;
                background-image: url(./image/s2.png);
                background-size: cover;
                display: flex;
                flex-direction: column;

                .row1 {
                    display: flex;
                    margin: 20px 0 0 27px;

                    .first-icon {
                        background-image: url(./image/camera.png);
                        width: 30px;
                        height: 30px;
                    }

                    .allNumber {
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #cfd7e9;
                        line-height: 30px;
                        margin-left: 11px;
                    }
                }

                .sumAlarmnumber {
                    font-size: 36px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #ffffff;
                    display: flex;
                    align-content: center;
                    position: relative;
                    top: 10%;
                    left: 14%;
                    flex: 1;
                }
            }
        }

        .eq-table {
            margin-left: 21px;
            flex: 1.8;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(22, 36, 64, 0.81);

            .eq-table-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 15%;
                width: 100%;
                background-color: #274083;

                .eq-table-header-left {
                    margin-left: 23px;
                    color: #fff;
                    font-size: 18px;
                }

                .eq-table-header-right {
                    display: flex;
                    margin-right: 14px;
                    color: #BDC5D7;
                    font-size: 14px;

                    .eq-readDetail {}

                    .eq-tableIcon {
                        background-image: url(./image/indexLogo.png);
                        width: 20px;
                        height: 20px;
                    }
                }
            }

            .index-tableBox {
                width: 100%;
                flex: 1;
                // background-color: blue;
                // overflow: hidden;
            }
        }
    }

    .index-second {
        display: flex;
        flex: 1;

        .alarmTable {
            flex: 1;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(22, 36, 64, 0.81);

            .alarmTable_header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 15%;
                width: 100%;
                background-color: #274083;

                .alarmTable_headerLeft {
                    margin-left: 23px;
                    color: #fff;
                    font-size: 18px;
                }

                .alarmTable_headerRight {
                    display: flex;
                    margin-right: 14px;
                    color: #BDC5D7;
                    font-size: 14px;

                    .alarmTablereadDetail {}

                    .alarmTableIcon {
                        background-image: url(./image/indexLogo.png);
                        width: 20px;
                        height: 20px;
                    }
                }
            }

            .index-tableBox {
                width: 100%;
                flex: 1;

            }

            margin-right: 21px;
        }

        .echartsBox {
            flex: 1.8;
            // background-color: #fff;

            display: flex;
        }
    }
}
</style>
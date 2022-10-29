<template>
    <div class="econtainer">

        <div class="eheader ">
            <div class="ename">报警列表</div>

        </div>
        <!-- :row-style=" { background: '#0e192a' }" -->

        <div class="etable">
            <el-scrollbar height="520px">
                <el-table highlight-current-row="false" style="width: 100%"
                    :header-cell-style="{ background: '#393F4F' }" :data="alarmList"
                    :row-class-name="tableRowClassName">
                    <el-table-column align="center" label="ID" width="120">
                        <template #default="scope">
                            {{ scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="name" label="设备" width="200" />
                    <el-table-column align="center" prop="type" label="报警类别" width="180" />
                    <el-table-column v-if="false" align="center" prop="uuid" label="报警类别" width="180" />
                    <el-table-column align="center" prop="img" label="图片" width="180">
                        <template #default="scope">
                            <el-image :src="scope.row.img"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="time" label="报警时间" width="200" />
                    <el-table-column align="center" prop="level" label="等级" width="180" />
                    <el-table-column align="center" prop="status" label="状态" />
                    <el-table-column align="center" fixed="right" label="管理">
                        <template #default="scope">
                            <span @click="handleAlarm({ uuid: scope.row.uuid, status: '已处理' })"
                                v-show="scope.row.status == '未处理'" class="alarm-button"> 处理 </span>
                            <span @click="handleAlarm({ uuid: scope.row.uuid, status: '已忽略' })"
                                v-show="scope.row.status == '未处理'" class="alarm-button"> 忽略 </span>
                            <!-- <span> 重置密码 </span> -->
                        </template>
                    </el-table-column>

                </el-table>
            </el-scrollbar>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { alarmlst, alarmRq } from '@/server/interface'
import { ElMessage, ElMessageBox } from 'element-plus';
import { alarmList_APi, alarmUpdate_Api } from '@/server/modules/alarm'

import { useAlarm_list, useAlarmUpdate } from '../../hook/useAlarm'

onMounted(() => { getAlarmList() })
let alarmList = reactive<alarmlst[]>([])

const getAlarmList = async () => {

    const { alarms } = await useAlarm_list(alarmList_APi)
    alarmList.length = 0
    alarmList.push(...alarms)


}
type row = {
    row: any,
    rowIndex: number
}
function tableRowClassName({ row, rowIndex }: row) {

    if (rowIndex % 2 == 0)
        if (row.status == '未处理')
            return 'evenrow success-row'
        else {
            return 'evenrow no-row '
        }
    else
        if (row.status == '未处理')
            return 'oddrow success-row'
        else {
            return 'oddrow no-row '
        }

}
const handleAlarm = async (parmas: alarmRq) => {
    ElMessageBox.confirm(
        '您确定要执行此操作吗？',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => { await useAlarmUpdate(alarmUpdate_Api, parmas), await getAlarmList(), ElMessage.success('操作成功') })
        .catch(() => { ElMessage('取消操作') })
}
</script>

<style>
.oddrow {
    background-color: #0F1A37 !important;
}

.evenrow {
    background-color: #051232 !important;
}

.success-row {
    color: #fff;
}

.no-row {
    color: #7883A3;

}
</style>
<style scoped lang="less">
// 消除表格底部白色的线
.el-table ::before {
    height: 0;
}

// 表头字体
:deep(.el-table th>.cell) {
    font-weight: 400;
    color: #fff;
    font-size: 18px;
}

// 表格斑马纹自定义颜色
:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
    background: #0F1A37;


}

// :deep(.el-table__body tr:hover>td.el-table__cell) {
//   background-color: transparent;
// }

// 修改elementPlus样式取消高亮,这样会禁用点击事件
// :deep(.el-table tbody tr) {
//     pointer-events: none;
// }


// 取消表格边框
:deep(.el-table__body tr>td.el-table__cell) {
    border: none;
}

:deep(.el-table__body tr>td.el-table__cell) {
    background-color: transparent;
}

:deep(.etable .el-table thead tr th) {
    border: none
}


.alarm-button {
    color: #4B71EE;
    font-size: 16px;
    margin-right: 16px;
    cursor: pointer
}
</style>
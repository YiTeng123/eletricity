<template>
  <div class="econtainer">

    <div class="eheader ">
      <div class="ename">日志</div>

    </div>

    <div class="estable">

      <el-scrollbar height="520px" always>
        <el-table stripe highlight-current-row="false" :data="jourList" height="100%" style="width: 100%"
          class="journalTable" :header-cell-style="{ background: '#393F4F' }"
          :row-style="nno ? { background: '#0e192a', color: '#CFD7E9', fontSize: '16px' } : { background: '#0e192a', color: '#CFD7E9', fontSize: '16px' }">
          <el-table-column align="center" label="ID" width="120">
            <template #default="scope">
              {{  scope.$index + 1  }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="nickname" label="用户" width="200" />
          <el-table-column align="center" prop="op" label="操作类型" />
          <el-table-column align="center" prop="time" label="时间" width="180" />


        </el-table>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { journalListInter } from '@/server/interface'

import { journalApi } from '../../server/modules/journal'
import { useJournal } from '../../hook/usejournal'
onMounted(() => {
  get_jourList()
  // axios.get(`http://127.0.0.1:39999`)
  let ws = new WebSocket('ws://127.0.0.1:39999/rtsp?url=192.168.1.114:554/stream')
  ws.onopen = () => {
    console.log('onopendd')
  }
  ws.onmessage = (msg) => {
    console.log('dqwd')
  }
})

const nno = ref<boolean>(false)
const jourList = reactive<journalListInter[]>([])

const get_jourList = async () => {
  const { journals } = await useJournal(journalApi)
  jourList.length = 0
  jourList.push(...journals)


}

</script>

<style scoped lang="less">
.el-table ::before {
  height: 0;
}

// .journalTable {
//   height: 100%;
//   overflow: hidden;
// }

// 表头
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

// 修改elementPlus样式取消高亮
:deep(.el-table tbody tr) {
  pointer-events: none;
}

// 取消表格边框
:deep(.el-table__body tr>td.el-table__cell) {
  border: none;
}




.econtainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .eheader {
    width: 100%;
    margin-bottom: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ename {
      color: #CFD7E9;
      font-size: 22px
    }

    .ebutton {
      color: 16px;
      color: #fff;
      width: 141px;
      height: 42px;
      background-color: blue;
      border-radius: 5px;
    }
  }

  .estable {
    border: 3px solid #2C3C58;
    :deep(.el-table thead tr th) {
      border: none
    }
  }
}
</style>
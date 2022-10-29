<template>
  <div class="econtainer">

    <div class="eheader ">
      <div class="ename">设备列表</div>
      <div class="ebutton displayy" @click="eqDialog = true">新增设备</div>
    </div>

    <div class="etable">
      <el-scrollbar height="520px">
        <!-- 定义表格单独一行的样式 -->

        <el-table :data="equipmentList"  style="width: 100% ;overFlow:hidden"
          :header-cell-style="{ background: '#15203b',padding:'10px 0 10px 0' }" :row-class-name="tableRowClassName"
          :row-style="{ background: '#0e192a', color: '#CFD7E9', fontSize: '16px' }" :cell-style="cellStyle">

          <el-table-column align="center" label="ID" width="105">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="uuid" label="设备UUID" width="150" />
          <el-table-column align="center" prop="name" label="设备名称" width="150" />
          <el-table-column align="center" prop="desc" label="设备描述" width="180" />
          <el-table-column align="center" prop="equipment_status" label="设备状态" />
          <el-table-column align="center" prop="run_status" label="运行状态" />
          <el-table-column align="center" prop="algorithm" label="应用算法" width="100" />
          <el-table-column align="center" fixed="right" label="管理" width="300">
            <template #default="scope">
              <span class="change_equ" type="primary" @click="openModify(scope.row)"> 编辑 </span>
              <span @click="delete_equipment(scope.row)"> 刪除 </span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>

  </div>


  <el-dialog v-model="eqDialog" :title="equipmentForm.uuid ? ' 修改设备' : '新增设备'" width="1000px" center
    @close="clearForms(equipmentForm)">
    <el-form ref="eqRef" :model="equipmentForm" status-icon label-width="120px" class="demo-ruleForm">
      <el-form-item label="设备名称" width="small">
        <el-input size="large" v-model="equipmentForm.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="设备描述">
        <el-input v-model="equipmentForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="设备流地址" width="small">
        <el-input size="large" v-model="equipmentForm.ip_path" type="text" autocomplete="off" />
      </el-form-item>

      <el-form-item label=" 备用流地址">
        <el-input v-model="equipmentForm.ip_path_copy" type="text" autocomplete="off" size="large" />
      </el-form-item>

      <el-form-item label="应用算法">
        <el-select v-model="equipmentForm.algorithm">
          <el-option label="压板识别" value="压板识别" />
          <el-option label="人员识别" value="人员识别" />
        </el-select>
      </el-form-item>

      <el-form-item label="设备状态">
        <el-radio-group v-model="equipmentForm.equipment_status">
          <el-radio label="停用" />
          <el-radio label="启用" />
        </el-radio-group>
      </el-form-item>


    </el-form>

    <template #footer>


      <span class="dialog-footer">
        <el-button @click="close_eqDialog">取消</el-button>
        <el-button v-if="!equipmentForm.uuid" @click="add_equipment">确认</el-button>
        <el-button v-else @click="upadate_equipment">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { clearForms } from '@/global/clearForm'
import { equipmentListInter } from '@/server/interface'

import { equipmentApi, equipment_addApi, equipment_updateApi, equipment_delApi } from '../../server/modules/equipment'
import { useEquipment, equForm, useEquipment_add, useEquipment_update, useEquipment_delete } from '../../hook/useEquipment'

onMounted(() => { get_equipmentList() })
const close_eqDialog = () => {
  eqDialog.value = false
  clearForms(equipmentForm)
}
const cellStyle = ({ row, column, rowIndex, columnIndex }:any) => {
  if (columnIndex === 7) {
    return {
    //   backgroundColor: 'pink',
      fontSize:'16px',
      color:'#4B71EE'

    }
  }
}
type row = {
  row: any,
  rowIndex: number
}
// 设置斑马纹的回调
function tableRowClassName({ row, rowIndex }: row) {
  if (rowIndex % 2 !== 0)
      return 'evenrow success-row'
}

/**
 * @name 获取设备列表
 */
const equipmentList = reactive<equipmentListInter[]>([])
const get_equipmentList = async () => {
  const { equipments } = await useEquipment(equipmentApi)
  equipmentList.length = 0
  equipmentList.push(...equipments)


}

/**
 * @name 新增设备
 */
const equipmentForm = reactive<equForm>({
  name: '',
  desc: '',
  algorithm: '',
  ip_path: '',
  ip_path_copy: '',
  equipment_status: '',
  uuid: ''
})
const eqDialog = ref<boolean>(false)
const add_equipment = async () => {
  await useEquipment_add(equipment_addApi, equipmentForm)
  ElMessage.success(`添加设备成功`)
  get_equipmentList()
  close_eqDialog()
}
 
// const ts= async()=>{  const{name}= await equipment_delsApi}
/**
 * @name 修改设备，这里打开模态框，需要维护表单对象与输入框的双向绑定，关闭模态框时再清空表单对象
 */
const openModify = (params: any) => {
  Object.keys(equipmentForm).forEach((item) => { equipmentForm[item] = params[item] })
  eqDialog.value = true
}
const upadate_equipment = async () => {
  await useEquipment_update(equipment_updateApi, equipmentForm)
  ElMessage.success('修改成功')
  get_equipmentList()
  close_eqDialog()
}

/**
 * @name 删除设备
 */
const delete_equipment = (pam: equForm) => {
  ElMessageBox.confirm(
    '您确定要删除此记录吗？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    await useEquipment_delete(equipment_delApi, pam)
    get_equipmentList()
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage('取消删除');
  })

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

<style lang="less" scoped>
// 取消表格边框
:deep(.el-table__body tr>td.el-table__cell) {
  border: none;
}

.el-table ::before {
	height: 0;
}

// 表头
:deep(.el-table th>.cell) {
  font-weight: 400;
  color: #fff;
  font-size: 18px;
}

// // 表格斑马纹自定义颜色
// :deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
//   background: #0F1A37;


// }

// 操作表格的template列
:deep(.el-table__body tr>td.el-table__cell) {
  background-color: transparent;
}

// 修改elementPlus样式取消高亮
// :deep(.el-table tbody tr) {
//   pointer-events: none;
// }


.econtainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  




.el-table td.el-table__cell {
    border-bottom: none;
}
// 取消thead下面的白线
:deep(.el-table thead tr th ) {
  border:none
}

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

  .etable {


    border: 3px solid #2C3C58;
    // border-top: none;

  }
}
</style>

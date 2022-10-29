<template>

    <div class="user-container">
        <div class="user-header ">
            <div class="user-name">用户列表</div>
            <div class="user-button displayy" @click="dialogFormVisible = true, is_add = true">添加用户</div>
        </div>
        <div class="user-table ">
            <el-table class="tableun" :data="dataObj.userList" stripe style="width: 100% "  :cell-style="cellStyle"
                :header-cell-style="{ background: '#393F4F' }" :row-style="{ background: '#0e192a' ,color:'#CFD7E9' ,fontSize:'16px'}"
                >
                <el-table-column  align="center" prop="img" label="头像"  width="100"  >
                    <template #default="scope">
                        <img class="user-img" :src="scope.row.img"/>
                    </template>
                    </el-table-column>
                <el-table-column  align="center" prop="account" width="100"  label="用户名" />
                <el-table-column  align="center" prop="nickname" label="账号" width="100" />
                <el-table-column prop="level" label="权限等级" width="100" />
                <el-table-column  align="center" prop="log" label="最新日志" />
                <el-table-column align="center" prop="statuss" label="状态" />
                <el-table-column v-if="false" prop="img" label="图片" />
                <el-table-column  align="center" fixed="right" label="管理" width="300">
                    <template #default="scope">
                        <span type="primary" @click="_open(scope.row)"> 编辑 </span>
                        <span @click="deleteUser(scope.row.account)"> 刪除 </span>
                        <span @click="update_userPwd(scope.row)"> 重置密码 </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>



    <el-dialog v-model="dialogFormVisible" :title="is_add ? '添加用户' : '用户信息编辑'" width="1000px" center
        @close="clearForms(useraddForm)">
        <el-form ref="adduseRef" :model="useraddForm" status-icon label-width="120px" class="demo-ruleForm">
            <el-form-item>
                <el-upload ref="uploadIMG" class="upload-demo" :action="upload_userImg" name="img"
                    :on-success="uploadIMGSuccess" :headers="headers">
                    <el-button size="" type="primary">上傳图片</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称" width="small">
                <el-input size="large" v-model="useraddForm.nickname" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户名" width="small" v-show="is_add">
                <el-input size="large" v-model="useraddForm.account" type="text" autocomplete="off" />
            </el-form-item>

            <el-form-item>

                <el-radio-group v-model="useraddForm.level" class="ml-4">
                    <el-radio label="一级用户" size="large">一级用户</el-radio>
                    <el-radio label="二级用户" size="large">二级用户</el-radio>
                </el-radio-group>

            </el-form-item>

            <el-form-item>
                <el-radio-group v-model="useraddForm.statuss" class="ml-4">
                    <el-radio label="启用" size="large">启用</el-radio>
                    <el-radio label="停用" size="large">停用</el-radio>
                </el-radio-group>
            </el-form-item>

        </el-form>

        <!-- v-for也可以写三目运算 -->
        <template #footer>
            <div v-show="useraddForm.level" class="show_level displayy">
                <div> 可编辑功能</div>
                <div v-for="(item, index ) in useraddForm.level === '一级用户'
                ? canChange1 : canChange2" class=" canChange  ">
                    <div>{{  item  }}</div>
                </div>
                <!-- <div v-for="(item, index ) in useraddForm.level === '一级用户'
                ? canWatch1 : canWatch2" class="canWatch">
                <div>{{item}}</div></div> -->
            </div>
            <div v-show="useraddForm.level" class="show_level displayy">
                <div> 可查看界面</div>

                <div v-for="(item, index ) in useraddForm.level === '一级用户'
                ? canWatch1 : canWatch2" class="canWatch">
                    <div>{{  item  }}</div>
                </div>
            </div>
            <span class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button v-if="is_add" type="primary" @click="addUser(useraddForm)">确认</el-button>
                <el-button v-else type="primary" @click="updateUser(useraddForm)">提价</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts" >

import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { clearForms } from '@/global/clearForm'
import { userApi, useraddApi, update_userApi, userdelApi, userRestpwdApi } from '../../server/modules/user'
import { useUser, useUserAdd, useraddform, upload_userImg, use_userUpdate, userupadateForm, use_userdel, use_resetPwd, resetPwd } from '../../hook/useUser'
import { useStore } from '@/store/'
const store = useStore()
onMounted(() => { getUserList() })
const canChange1: string[] = ['设备管理', '算法管理']
const canChange2: string[] = ['无']
const canWatch1: string[] = ['首页', '监控详情', '设备管理', '算法管理']
const canWatch2: string[] = ['首页', '监控详情']

const headers = { Authorization: `Bearer ${sessionStorage.getItem("token")}` }



// 修改任一单元格的样式函数
const cellStyle = ({ row, column, rowIndex, columnIndex }:any) => {
  if (columnIndex === 6) {
    return {
    //   backgroundColor: 'pink',
      fontSize:'16px',
      color:'#4B71EE'

    }
  }
}
//也可以直接判断某个值来锁定单元格
const closeDialog = () => {
    dialogFormVisible.value = false
    // dialog_reset.value = false
    // 清空表单对象
    clearForms(useraddForm),
        // 清除上传文件
        (uploadIMG.value as any).clearFiles()

}

// 用户列表渲染
let dataObj = reactive<any>({
    userList: []
})
// 获取用户列表
const getUserList = async () => {
    const { users } = await useUser(userApi)
    dataObj.userList = users
    console.log(dataObj.userList);
    
}

// 添加用户
let dialogFormVisible = ref<Boolean>(false)
const is_add = ref<boolean>(true)
const useraddForm = reactive<useraddform>({
    nickname: '',
    account: '',
    password: '',
    level: '',
    img: '',
    statuss: ''
})
const uploadIMG = ref(null)
const addUser = async (params: useraddform) => {
    dialogFormVisible.value = false
    useUserAdd(useraddApi, params)
        .then(() => { ElMessage.success('添加成功'), getUserList() })
        .catch(() => { clearForms(useraddForm), (uploadIMG.value as any).clearFiles() });
    (uploadIMG.value as any).clearFiles()
    clearForms(useraddForm)

}
const uploadIMGSuccess = (res: any) => {
    if (res && res.resp_code === 10000) {
        useraddForm.img = res.img
        console.log(useraddForm.img);

    } else {
        ElMessage.error("上传图片失败");
    }

}
// 修改用户
const _open = (params: any) => {
    is_add.value = false
    // 维持双向数据绑定
    Object.keys(useraddForm).forEach((item) => { useraddForm[item] = params[item] })
    dialogFormVisible.value = true
}
const updateUser = async (params: userupadateForm) => {
    await use_userUpdate(update_userApi, params)
    ElMessage.success('修改成功');
    getUserList()
    clearForms(useraddForm)
    dialogFormVisible.value = false
}

// 删除用户
const deleteUser = (account: string) => {
    ElMessageBox.confirm(
        '您确定要删除此记录吗？',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        await use_userdel(userdelApi, account)
        ElMessage.success('删除成功');
        getUserList()
    }).catch(() => {
        ElMessage('取消删除');
    })

}
//重置用户密码
// let dialog_reset = ref<boolean>(false)
// const _openReset = (params: string) => {
//     dialog_reset.value = true
//     useraddForm.account = params
// }
// const close_Reset = () => {
//     dialogFormVisible.value = false
//     dialog_reset.value = false
//     // 清空表单对象
//     clearForms(useraddForm)

// }
const update_userPwd = async (parmas: any) => {
    ElMessageBox.confirm(
        '您确定重置此用户的密码吗？',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        await use_resetPwd(userRestpwdApi, parmas)
        ElMessage.success('重置密码成功')
    })
    clearForms(useraddForm)
}

</script>

<style scoped lang="less" scope>
.el-table ::before {
    height: 0;
   
}

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

// 插槽的样式
:deep(.el-table__body tr>td.el-table__cell) {
    background-color: transparent;
    // cursor: pointer;
}

// 修改elementPlus样式取消高亮
// :deep(.el-table tbody tr) {
//   pointer-events: none;
// }

// 取消表格行与行之间的边框
:deep(.el-table__body tr>td.el-table__cell) {
    border: none;
}

// 去掉最下面的那一条线
.el-table::before {
    height: 0px;
}

.displayy {
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .user-header {
        width: 100%;
        margin-bottom: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .user-name {
            color: #CFD7E9;
            font-size: 22px
        }

        .user-button {
            color: 16px;
            color: #fff;
            width: 141px;
            height: 42px;
            background-color: blue;
            border-radius: 5px;
            cursor: pointer;
        }
    }

    .user-table {
        // flex: 1;

        border: 3px solid #2C3C58;
        border-top: none;
        .user-img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
        .el-table tr {
            background-color: red !important;
        }

        // 取消thead下面的白线
        :deep(.el-table thead tr th) {
            border: none
        }

    }
}
</style>
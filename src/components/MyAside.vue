<template>
    <div>
        <el-row class="tac">
            <el-col>
                <div class="user-admin">
                    <!-- 动态绑定背景图片url -->
                    <div class="avatar" :style="{ backgroundImage: `url(${store.loginImg})` }"></div>
                    <div class="avatar-describe">{{store.loginName}}</div>
                    <div class="avatar-changepwd" @click="pwdDialog = true">修改密码</div>
                </div>
                <el-menu active-text-color="#ffd04b" default-active="/back_stage/index" class="el-menu-vertical-demo"
                    router='true' text-color="#fff">

                    <el-menu-item v-for="item in asideData.sideList" :index="item.path" :key="item.path">
                        <img class="Aside-img" :src="item.icon" alt="">
                        <span src="sdasd" v-show='store.AsideButton'>{{ item.label }}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>

        </el-row>
    </div>

    <el-dialog v-model="pwdDialog" title="修改账号密码" width="35%" center @close="clearForms(pwdForm)">
        <el-form :model="pwdForm">
            <el-form-item label="账号" label-width="70px">
                <el-input v-model="pwdForm.account" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" label-width="70px">
                <el-input v-model="pwdForm.new1" autocomplete="off" />
            </el-form-item>
            <el-form-item label="再次输入" label-width="70px">
                <el-input v-model="pwdForm.new2" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closepwdDialog">Cancel</el-button>
                <el-button @click="changePwd" type="primary">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount, toRaw } from 'vue'
import { useStore } from "../store/index"
import http from '../server/index'
import Api from '../server/api'
import { asideForm, AsidelistResdata, Result, sideRes } from '@/server/interface';
import { clearForms, newFormAdd } from '@/global/clearForm';
import { ElMessage } from 'element-plus';
const store = useStore()

const propleUrl = ref('/src/assets/image/prople.png')
let asideData = reactive<sideRes>(
    {
        sideList: []
    }
)
onMounted(async () => {
    const { content: { AsideList } } = await getAside({ level: store.loginLevel })
    asideData.sideList = AsideList


})

const getAside = (params: object) => {
    return http.get<AsidelistResdata>(import.meta.env.VITE_BASE_URL + Api.index, params)
}
let pwdForm = reactive<asideForm>({
    account: '',
    new1: '',
    new2: ''
})
const pwdDialog = ref<boolean>(false)
const closepwdDialog = () => {
    pwdDialog.value = false
    // 清空表单
    clearForms(pwdForm)
}
// 更改密码
const changePwd = async () => {
    if (pwdForm.new1 === pwdForm.new2) {
        const { resp_code } = await use_changepwd(changePwd_APi, pwdForm)
        console.log(resp_code);
        if (resp_code == '10000')
            ElMessage.success('修改成功')
        clearForms(pwdForm)
    } else {
        ElMessage.error('密码不一致，请再次输入')
        pwdForm.new1 = ''
        pwdForm.new2 = ''

    }

}
const changePwd_APi = (params: FormData) => {
    return http.post<AsidelistResdata>(import.meta.env.VITE_BASE_URL + Api.user_updatepwd, params)
}
const use_changepwd = (
    api: (params: FormData) => Promise<Result>,
    params: asideForm
) => {
    return api(newFormAdd(params))
}





// const AsideList = [
//     {
//         path: '/back_stage/index',
//         name: 'index',
//         label: '首页',
//         icon: new URL(`/src/assets/image/home.png`, import.meta.url).href,
//         url: '/index'
//     },
//     {
//         path: '/back_stage/monitor',
//         name: 'monitor',
//         label: '监控详情',
//         icon: new URL(`/src/assets/image/monitor.png`, import.meta.url).href,
//         url: '/monitor'
//     },
//     {
//         path: '/back_stage/equipment',
//         name: 'equipment',
//         label: '设备管理',
//         icon: new URL(`/src/assets/image/equipment.png`, import.meta.url).href,
//         url: '/equipment'
//     },
//     {
//         path: '/back_stage/algorithm',
//         name: 'algorithm',
//         label: '算法管理',
//         icon: new URL(`/src/assets/image/algorithm.png`, import.meta.url).href,
//         url: '/algorithm',

//     }, {
//         path: '/back_stage/user',
//         name: 'user',
//         label: '用户管理',
//         icon: new URL(`/src/assets/image/user.png`, import.meta.url).href,
//         url: '/user'
//     },
//     {
//         path: '/back_stage/alarm',
//         name: 'alarm',
//         label: '报警列表',
//         icon: new URL(`/src/assets/image/alarm.png`, import.meta.url).href,
//         url: '/index'
//     },
//     {
//         path: '/back_stage/journal',
//         name: 'journal',
//         label: '日志',
//         icon: new URL(`/src/assets/image/journal.png`, import.meta.url).href,
//         url: '/journal'
//     }
// ]



</script>

<style lang="less" scoped>
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
.dialog-footer button:first-child {
    margin-right: 10px;
}

.Aside-img {
    margin: 0 15px 0 35px;
}

.user-admin {
    height: 220px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .avatar {
        width: 80px;
        height: 80px;
        background-color: #fff;
        border-radius: 50%;
        // background-image: url(../assets/image/prople.png);
        background-size: 100% 100%;
        background-position: center;
        vertical-align: middle // background-repeat:no-repeat ;
    }

    .avatar-describe {
        color: #fff;
        margin-top: 10px;
        font-size: 18px;
    }

    .avatar-changepwd {
        color: #4b71ee;
        cursor: pointer;
        font-size: 12px;
    }
}
</style>
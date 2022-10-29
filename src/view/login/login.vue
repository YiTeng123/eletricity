<template>
    <div class="login-container">
        <video autoplay loop muted>
            <source src="../../assets/video/bg.mp4" type="video/mp4" />
        </video>
        <div class="login-shell">
            <div class="login-title"></div>
            <div class="login-box">
                <span class="user-login">用户登入</span>
                <div class="login-form">
                    <form ref="myForm" label-width="100px" :model="formLogin" class='display' style="width: 500px">

                        <div class="displays  ">
                            <div class="input-left">
                                <div class="lock" />
                                <div class="passwd-box">账号</div>
                            </div> <input v-model="formLogin.account" />
                        </div>



                        <div class="displays ">
                            <div class="input-second">
                                <div class="passwd" />
                                <div class="passwd-box">密码</div>
                            </div><input type="password" v-model="formLogin.password" />
                        </div>
                        <div class="login-bb ">
                            <div class="login-rember" @click="changeRem" :class="isRememberFlag ? 'login-isRem' : null"
                                >

                            </div>
                            <div class="rember-text displayy">记住密码</div>
                        </div>
                        <div class="login-button displays" @click="handleLogin(formLogin)">确认</div>
                    </form>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts" name="login">
import { reactive, ref, onMounted } from 'vue'
import { loginApi } from '../../server/modules/login'
import { formInterface } from '../../server/interface'
import { useLogin } from "../../hook/useLogin"
import { useRouter } from 'vue-router'
import { useStore } from "../../store/index"
import Api from '../../server/api'

let isRememberFlag = ref(false)
const router = useRouter()
const store = useStore()
const changeRem=()=>{isRememberFlag.value =!isRememberFlag.value}
console.log(import.meta.env.VITE_BASE_URL + Api.login)


let myForm = ref(null)
let formLogin = reactive<formInterface>({
    account: '',
    password: '',

})
//记住密码
let isRemember = ref<boolean>(false)
const Rembember = () => {
    localStorage.setItem('account', formLogin.account)
    localStorage.setItem('password', formLogin.password)
}

onMounted(() => {
    // 判断lacal是否有值，有值则赋值
    if (localStorage.getItem('account') && localStorage.getItem('password')) {
        formLogin.account = localStorage.getItem('account') as string
        formLogin.password = localStorage.getItem('password') as string
    }


})
// 登进系统
const handleLogin = async (params: formInterface) => {
    // 记住密码
    console.log(isRemember.value );
    
    if (isRemember.value ) {
        console.log('dsad');
        
        Rembember()
    }
    console.log(localStorage.getItem('account'))
    const res = await useLogin(loginApi, params)

    if (res.access_token) {
        sessionStorage.setItem('token', res.access_token)
        store.setloginToken(res.access_token)
        store.setloginLevel(res.level)
        store.setloginNameImg(res.user, res.img)
        setTimeout(() => { router.push('/back_stage') }, 800);
    }

}


</script>

<style  lang="less">
video {
    position: fixed;
    right: 0px;
    bottom: 0px;
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
    /*加滤镜*/
    /*filter: blur(15px); //背景模糊设置 */
    /*-webkit-filter: grayscale(100%);*/
    /*filter:grayscale(100%); //背景灰度设置*/
    z-index: -11
}

.displays {
    display: flex;
    justify-content: center;
    align-items: center;

}

.display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

source {
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
}

.login-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    & .login-shell {
        width: 941px;
        height: 875px;
        // background-color: red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & .login-title {
            width: 500px;
            height: 50px;
            background-image: url(../../assets/image/loginTitle.png);
            margin: 0 auto;
            justify-self: flex-start;
        }

        & .login-box {
            width: 708px;
            height: 468px;
            margin-top: 55px;
            background-image: url(../../assets/image/login-box.png);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            & .user-login {
                color: #869ad1;
                position: relative;
                font-size: 26px;
                margin-bottom: 48px;
            }

            & .login-form {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                form {
                    position: relative;

                    .login-bb {
                        display: flex;
                        position: relative;
                        left: -46.5%;

                        .login-rember {
                            margin-right: 8px;
                            width: 26px;
                            height: 26px;
                            cursor: pointer;
                            border: 2px solid #232F4B;
                            // background-position: center;
                        }

                        .rember-text {
                            font-size: 14px;

                            color: #CFD7E9;
                        }

                        .login-isRem {
                            background-image: url(./img/gou.png);
                        }
                    }


                }



                .passwd-box {
                    color: #8597C0;
                    font-size: 14px;
                }

                .passwd {
                    width: 30px;
                    height: 30px;
                    background-image: url(../../assets/image/password.png);
                }

                .input-left {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2;
                    position: absolute;
                    left: -6%;
                    height: 42px;
                    top: 0;
                    background-color: #131E3B;

                    .lock {
                        width: 30px;
                        height: 30px;
                        background-image: url(../../assets/image/lock.png);
                    }

                }

                .input-second {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2;
                    position: absolute;
                    left: -6%;
                    height: 42px;
                    top: 29.5%;
                    background-color: #131E3B;
                }

                input {
                    outline: none;
                    width: 500px;
                    height: 42px;
                    background: #131E3B;
                    color: #94A3C3;
                    margin-bottom: 30px;
                    font-size: 14px;
                    border: none;
                    letter-spacing: 1px;
                    margin-left: 65px;
                    padding-left: 25px;
                }

                input:focus .input-left {

                    transition: border 0.3s;
                    border: 1px solid #8597C0;
                    border-radius: 5px;
                }

                .login-button {
                    width: 160px;
                    height: 42px;
                    background-color: #233bea;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 30px;
                }

                .login-button:hover {
                    background-color: #5063ed
                }

                .login-button:active {
                    background-color: #0a1da9;
                }
            }
        }
    }

}
</style>
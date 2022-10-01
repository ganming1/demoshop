<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <!-- <img src="../assets/login.jpg" alt=""> -->
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form ref="loginFromRef" class="login_form" :model="loginFrom" :rules="loginFromRules">
                <el-form-item prop="username">
                    <el-input v-model="loginFrom.username" prefix-icon="iconfont icon-jurassic_user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginFrom.password" type="password" prefix-icon="iconfont icon-tianchongxing-"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginFrom">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loginFrom:{
                username:'admin',
                password:'123456'

            },
            loginFromRules:{
                username:[
                { required: true, message: '请输入登录名称', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]

            }
        }
    },
    methods:{
        // 点击重置按钮，重置登录表单
        resetLoginFrom(){
            this.$refs.loginFromRef.resetFields()
        },
        // 点击登录按钮，先进行表单数据验证
        login(){
            this.$refs.loginFromRef.validate(async valide =>{
                if(!valide) return;
                const {data:res} = await this.$http.post('login',this.loginFrom)
                if(res.meta.status !=200){
                    return this.$message.error('登录失败');
                }   
                this.$message.success('登录成功');
                console.log(res);
                // 1. 将登录成功之后的 token ，保存到客户端 sessionStorage 中
                // 1.1 项目中出现了登录之外的其他 API 接口，必须在登录之后才能访问
                // 1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                window.sessionStorage.setItem('token',res.data.token)
                // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
                this.$router.push('/home');
            })
        }
    }

}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    border-radius: 5px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding:0 20px;
    box-sizing:border-box;
}
.btns{
    display: flex;
    justify-content: end;
}
</style>
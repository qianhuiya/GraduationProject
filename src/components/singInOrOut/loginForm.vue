<template>
  <div class="signInForm">
    <p>Sign In</p>
    <el-form ref="form" :model="loginUser" label-width="80px">
      <el-form-item label="邮箱">
        <el-input
          v-model="loginUser.email"
          placeholder="请输入用户名/邮箱"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="loginUser.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="singIn">登录</el-button>
    </el-form>
  </div>
</template>

<script >
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    //console.log(ctx)
    const loginUser = reactive({
      email: "",
      password: "",
    });
    function singIn() {
      ctx.$axios
        .post(`${ctx.$api.login}`, loginUser)
        .then((res) => {
          if (res.code == 1) {
            ctx.$n.notify(
              "",
              `${res.name +"   "+res.msg}`,
              "success",
              "top-right",
              5000
            );
            ctx.$router.push(`/home`)
            window.sessionStorage.setItem("users",JSON.stringify(res))
          } else {
            ctx.$mb.me(`${res.msg}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return { loginUser, singIn };
  },
};
</script>
<style lang="scss" scoped>
.signInForm {
  width: 60%;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
    margin-bottom: 20px;
    color: #1989fa;
    font-weight: 800;
    font-size: 1.5rem;
  }
  .el-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .el-input {
      width: 85%;
    }
    .el-button {
      width: 70%;
      margin: auto;
      cursor: pointer;
    }
  }
}
</style>

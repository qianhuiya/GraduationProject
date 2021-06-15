<template>
  <div class="registerForm">
    <p>Sign In</p>
    <el-form ref="form" :model="data" label-width="80px">
      <el-form-item label="邮箱">
        <el-input
          v-model="data.user.email"
          placeholder="请输入邮箱"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input
          v-model="data.user.name"
          placeholder="请输入姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="data.user.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="data.user.identity" placeholder="请选择身份">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item of data.shenfen"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="data.user.sex" placeholder="请选择性别">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item of data.sex"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="register">注册</el-button>
    </el-form>
  </div>
</template>

<script >
import {
  ref,
  reactive,
  getCurrentInstance,
  registerRuntimeCompiler,
} from "vue";
export default {
  setup(props, cex) {
    const { ctx } = getCurrentInstance();
    //console.log(ctx)
    const data = reactive({
      user: {
        email: "",
        password: "",
        name: "",
        identity: "",
        sex:""
      },
      shenfen: [
        { id: 1, label: "教师", value: "teacher" },
        { id: 2, label: "管理员", value: "admin" },
        { id: 3, label: "书店", value: "book" },
      ],
      sex:[
        {id:1,label: "男",value:"man"}, 
        {id:2,label: "女",value:"woman"}
      ]
    });
    function register() {
      if (
        data.email == "" ||
        data.password == "" ||
        data.name == "" ||
        data.identity == ""
      ) {
        ctx.$mb.me("请将信息填写完整!");
      } else {
        ctx.$axios
          .post(`${ctx.$api.register}`, data.user)
          .then((res) => {
            //console.log(res);
            if (res.code == 1) {
              ctx.$mb.ms(`${res.msg}`);
              cex.emit("toggleOff");
            } else {
              ctx.$mb.me(`${res.msg}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    return { data, register };
  },
};
</script>
<style lang="scss" scoped>
.registerForm {
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
    .el-select {
      width: 85%;
      margin: auto;
    }
    .el-button {
      width: 70%;
      margin: auto;
      cursor: pointer;
    }
  }
}
</style>

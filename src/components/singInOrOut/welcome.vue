<template>
  <div class="mine">
    <el-card class="mine1">
      <div class="minetext">
        <img :src="data.userInfo.avatar" class="image" />
        <span>{{ data.userInfo.username }}</span>
        <br />
        <div>
          <p><i class="el-icon-user"></i>{{ data.userInfo.identity }}</p>
          <p><i class="el-icon-s-opportunity"></i>{{ data.userInfo.sex }}</p>
          <p><i class="el-icon-s-promotion"></i>{{ data.userInfo.email }}</p>
          <p><i class="el-icon-time"></i>{{ data.userInfo.date }}</p>
          <p>
            <i class="el-icon-picture-outline"></i
            ><el-link
              type="primary"
              :href="data.userInfo.avatar"
              target="_blank"
              >点击查看头像</el-link
            >
          </p>
        </div>
      </div>
    </el-card>
    <el-card class="mine2">
      <el-tabs v-model="data.activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="信息变更" name="one">
          <div class="tabs">
            <div class="tabMain">
              <el-form ref="form" :model="data.editUsers" label-width="80px">
                <div v-for="item of data.editUsers" :key="item.id">
                  {{ item.title }}:
                  <el-input
                    v-model="item.models"
                    :placeholder="item.text"
                    clearable
                  ></el-input>
                </div>
                <br />
                <el-button type="primary" @click="handleUserInfo"
                  >更新个人信息</el-button
                >
              </el-form>
            </div>

            <div class="avatar">
              <p>头像</p>
              <div class="avater">
                <img :src="data.userInfo.avatar" class="image" /><br />
                <el-link
                  type="primary"
                  href="http://dn-qiniu-avatar.qbox.me/"
                  target="_blank"
                  >更换头像</el-link
                >
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  setup(props, cex) {
    const { ctx } = getCurrentInstance();
    const data = reactive({
      userInfo: [],
      activeName: "one",
      editUsers: [
        { id: 1, models: ``, title: "用户名", text: "请输入用户名" },
        { id: 2, models: ``, title: "邮箱", text: "请输入邮箱" },
      ],
    });
    function handleTabsClick(tab, e) {}
    function handleUserInfo() {
      const params = {
        name: data.editUsers[0].models,
        email: data.editUsers[1].models,
      };
      ctx.$axios
        .post(`${ctx.$api.editUsers}`, params)
        .then((res) => {
          created()
          ctx.$mb.ms(`${res.msg}`);
          for(var i=0;i<data.editUsers.length;i++){
              data.editUsers[i].models=""
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function users(res){   
        res.date = ctx.$conmon.formatDate(
          ctx.$conmon.timeDate(res.date)
        );
        if (res.identity == "admin") {
          res.identity = "管理员";
        } else if (res.identity == "teacher") {
          res.identity = "教师";
        } else if (res.identity == "book") {
          res.identity = "书店";
        } if(res.sex=="man"){
            res.sex="男"
        }else if(res.sex=="woman"){
            res.sex="女"
        }
        data.userInfo = res;
    }
    function created() {
      ctx.$axios
        .get(`${ctx.$api.getLoginMonomer}`)
        .then((res) => {
          users(res)
        })
        .catch(() => {});
    }
    created();
    return {
      data,
      handleTabsClick,
      handleUserInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.mine {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .mine1 {
    margin-right: 30px;
    flex: 1;
    .minetext {
      min-width: 200px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      img {
        margin: auto;
        width: 40%;
        border-radius: 50%;
      }
      span {
        margin-top: 30px;
        font-weight: 800;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
      }
      div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        p {
          margin: 0;
          margin-bottom: 10px;
          i {
            width: 30px;
          }
        }
      }
    }
  }
  .mine2 {
    flex: 3;
    .tabs {
      display: flex;
      justify-content: center;
      .tabMain,
      .avatar {
        flex: 1;
      }
      .avatar {
        margin-left: 40px;
        p {
          text-indent: 20px;
          font-weight: 500;
          font-size: 0.88rem;
        }
        .avater {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: 60%;
            border-radius: 50%;
          }
        }
      }
      .tabMain {
        width: 50%;
        display: flex;
        flex-direction: column;
        .el-form {
          font-weight: 500;
          font-size: 0.88rem;
          div,
          div > .el-input {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="home">
    <el-container>
      <el-aside :width="data.toggleMenu ? '0px' : '180px'">
        <h5>
          <p v-show="!data.toggleMenu"></p>
        </h5>
        <el-menu
          background-color="#333"
          text-color="#fff"
          active-text-color="#409BFF"
          :unique-opened="true"
          :collapse="data.toggleMenu"
          :collapse-transition="false"
          :router="true"
          :default-active="data.activePath"
        >
          <el-submenu
            :index="items.id"
            v-for="items in data.menuList"
            :key="items.id"
          >
            <template #title>
              <i :class="items.icon"></i>
              <span>{{ items.titleName }}</span>
            </template>
            <el-menu-item
              :index="'/' + item.path"
              v-for="item in items.children"
              :key="item.id"
              @click="keepMenuState('/' + item.path)"
            >
              <template #title>
                <i class="el-icon-menu"></i>
                <span>{{ item.titleName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <span @click="hangdleToggleMenu">
              <i class="toggleMenu el-icon-s-operation" title="展开/收缩"></i>
            </span>
          </div>
          <div class="header_center">
            <span>{{ $config.TITLE }}</span>
          </div>
          <div class="header_right" animation-interation-count="infinite">
            <el-avatar
              class="configs"
              shape="square"
              size="medium"
              :src="data.avatar"
              fit="cover"
            ></el-avatar>
            <i
              class="configs icon el-icon-full-screen"
              title="全屏"
              @click="fullScreen"
            ></i>
            <el-dropdown trigger="hover" class="config">
              <span class="el-dropdown-link">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    ><el-link href="/welcome" :underline="false"
                      >个人中心</el-link
                    ></el-dropdown-item
                  >
                  <el-dropdown-item divided @click="signOut"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import screenfull from "screenfull";
export default {
  setup(props, cex) {
    const { ctx } = getCurrentInstance();
    const data = reactive({
      toggleMenu: true,
      changeUserText: false,
      name: "",
      avatar: "",
      activePath: "",
      menuList: [],
    });
    function hangdleToggleMenu() {
      data.toggleMenu = !data.toggleMenu;
    }

    function keepMenuState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      data.activePath = activePath;
    }
    function fullScreen() {
      screenfull.toggle();
    }
    function signOut() {
      ctx.$router.push("/");
      ctx.$n.notify(
        "",
        `${data.name + "    退出登录"}`,
        "success",
        "top-right",
        5000
      );
    }
    function created() {
      ctx.$axios
        .get(`${ctx.$api.getLoginMonomer}`)
        .then((res) => {
          const state = res;
          data.menuList = state.role;
          data.avatar = state.avatar;
          data.name = state.username;
          data.activePath = window.sessionStorage.getItem("activePath");
        })
        .catch((err) => {console.log(err)});
    }
    created();
    return {
      data,
      hangdleToggleMenu,
      keepMenuState,
      created,
      signOut,
      fullScreen,
    };
  },
};
</script>

<style lang='scss' scoped>
.el-container {
  width: 100vw;
  height: 100vh;
  .el-aside {
    background-color: #333;
    border-right: 0;
    transition: all ease 0.5s;
    height: 100vh;
    overflow: hidden;
    h5 {
      min-width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin: 16.73px 0;
    }

    .el-menu {
      border: none;
    }
  }

  .el-header {
    background-color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      color: #fff;

      span {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .toggleMenu {
          font-size: 20px;
          transition: all ease 0.5s;
          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }

    .header_center {
      span {
        font-size: 20px;
        color: #fff;
        width: 100%;
      }
    }

    .header_right {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .el-dropdown-link {
        cursor: pointer;
        color: #fff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
      .icon {
        font-size: 20px;
        color: #fff;
        transition: all ease 0.5s;
        cursor: pointer;
        &:hover {
          transform: scale(1.2);
        }
      }
      .configs {
        margin-right: 10px;
      }
    }
  }
}
</style>

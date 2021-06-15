<template>
  <el-card class="box-card"><br />
    <el-table
      :data="
        data.tableData.slice(
          (data.tableRelevant.pageNow - 1) * data.tableRelevant.pageSize,
          data.tableRelevant.pageNow * data.tableRelevant.pageSize
        )
      "
      style="width: 100%"
      border
      row-key
      :header-cell-style="{ color: '#606266' }"
      class="booktable"
    >
      <el-table-column prop="date" label="创建时间" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column
      >avatar
      <el-table-column prop="email" label="邮箱" align="center">
      </el-table-column>
      <el-table-column prop="avatar" label="头像" align="center">
        <template #default="scope">
          <el-avatar
            class="configs"
            shape="square"
            size="medium"
            :src="scope.row.avatar"
            fit="cover"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="identity" label="身份" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="something" label="操作" align="center">
        <template #header>
          <el-input
            v-model="data.searchKey"
            size="mini"
            placeholder="输入关键字搜索"
            clearable
            @input="inputKey(data.searchKey)"
          />
        </template>
        <template #default="scope">
          <el-popconfirm
            confirmButtonText="是的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="当前用户信息确定删除吗？"
            @confirm="confirm(scope.row._id)"
          >
            <template #reference>
              <el-button type="danger" icon="el-icon-delete" circle>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column> </el-table
    ><br />
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.tableRelevant.pageNow"
      background
      :page-sizes="[1, 5, 8, 10, 15, 25]"
      :page-size="data.tableRelevant.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.tableData.length"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { ref, reactive, getCurrentInstance, watch } from "vue";
export default {
  setup(props, cex) {
    const { ctx } = getCurrentInstance();
    const data = reactive({
      tableData: [],
      searchKey: "",
      tableRelevant: {
        pageNow: 1,
        pageSize: 8,
        index: "",
      },
    });
    watch(
      () => data.searchKey,
      (newValue, oldValue) => {
       if(newValue==""){
         created();
       }
      }
    );
    function confirm(uid) {
      ctx.$axios.delete(`${ctx.$api.delMonomer}` + `/${uid}`).then((res) => {
        ctx.$mb.ms(`删除成功!`);
        created();
      });
    }
    function handleSizeChange(newSize) {
      data.tableRelevant.pageSize = newSize;
    }
    function handleCurrentChange(newNow) {
      data.tableRelevant.pageNow = newNow;
    }
    function inputKey(key) {
      const mineDatas = [];
      data.tableData.forEach((value, index) => {
        if (
          value.name.indexOf(data.searchKey) > -1 ||
          value.email.indexOf(data.searchKey) > -1 ||
          value.identity.indexOf(data.searchKey) > -1||
          value.sex.indexOf(data.searchKey) > -1
        ) {
          mineDatas.push(value);
        }
      });
      data.tableData = mineDatas;
    }
    function created() {
      ctx.$axios.get(`${ctx.$api.getMonomers}`).then((res) => {
        const datas = res.data;
        //console.log(datas);
        for (let i = 0; i < datas.length; i++) {
          datas[i].date = ctx.$conmon.formatDate(
            ctx.$conmon.timeDate(datas[i].date)
          );
          if (datas[i].identity == "admin") {
            datas[i].identity = "管理员";
          } else if (datas[i].identity == "teacher") {
            datas[i].identity = "教师";
          } else if (datas[i].identity == "book") {
            datas[i].identity = "书店";
          } if(datas[i].sex=="man"){
            datas[i].sex="男"
          }else if(datas[i].sex=="woman"){
            datas[i].sex="女"
          }
        }
        data.tableData = res.data;
      });
    }
    created();
    return {
      data,
      created,
      handleSizeChange,
      handleCurrentChange,
      confirm,
      inputKey,
    };
  },
};
</script>
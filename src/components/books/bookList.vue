<template>
  <el-card class="box-card"><br />
    <el-button type="primary" @click="addData" v-if="data.off.addData">添加书籍</el-button>
    <el-table
      :data="
        data.tableData.slice(
          (data.tableRelevant.pageNow - 1) * data.tableRelevant.pageSize,
          data.tableRelevant.pageNow * data.tableRelevant.pageSize
        )
      "
      ref="multipleTable"
      style="width: 100%"
      row-key
      :header-cell-style="{ color: '#606266' }"
      class="booktable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" v-if="data.off.checkbox"> </el-table-column>
      <el-table-column
        prop="title"
        label=""
        align="center"
        type="index"
        :index="indexMethod"
        :formatter="formatter"
      >
      </el-table-column>
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="创建时间">
              <span>&nbsp;&nbsp;&nbsp;{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="书名">
              <span>&nbsp;&nbsp;&nbsp;{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="作者">
              <span>&nbsp;&nbsp;&nbsp;{{ props.row.author }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>&nbsp;&nbsp;&nbsp;{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="库存">
              <span>&nbsp;&nbsp;&nbsp;{{ props.row.number }}</span>
            </el-form-item>
            <el-form-item label="类别">
              <span>&nbsp;&nbsp;&nbsp;{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="简介">
              <span>&nbsp;&nbsp;&nbsp;{{ props.row.introduce }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="书名" align="center" sortable>
      </el-table-column>
      <el-table-column prop="author" label="作者" align="center" sortable>
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center" sortable>
      </el-table-column>
      <el-table-column prop="number" label="库存" align="center" sortable>
      </el-table-column>
      <el-table-column prop="type" label="类别" align="center" sortable>
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
          <el-button type="primary" icon="el-icon-edit-outline" v-if="data.off.editData" circle>
              </el-button>
               <el-button type="primary" icon="el-icon-plus" v-if="data.off.addMine" circle>
              </el-button>
          <el-popconfirm
          v-if="data.off.removeData"
            confirmButtonText="是的"
            cancelButtonText="谢谢"
            icon="el-icon-info"
            iconColor="red"
            title="当前书籍信息确定删除吗？"
            @confirm="confirm(scope.row._id)"
          >
            <template #reference>
              <el-button type="danger" icon="el-icon-delete" circle>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()" v-if="data.off.checkbox">取消选择</el-button>
    </div>
    <br />
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
    <qhdialog ref="qhdialog" @update:created="created"></qhdialog>
  </el-card>
</template>

<script>
import { ref, reactive, getCurrentInstance, watch } from "vue";
import qhdialog from "../others/dialog";
export default {
  components: { qhdialog },
  setup(props, cex) {
    const { ctx } = getCurrentInstance();
    const data = reactive({
      tableData: [],
      searchKey: "",//关键字
      multipleSelection: [],
      tableRelevant: {//分页
        pageNow: 1,//当前页码
        pageSize: 8,//分页数
        index: "",//索引
      },off:[]
    });
    watch(
      () => data.searchKey,
      (newValue, oldValue) => {
        if (newValue == "") {
          created();
        }
      }
    );
    function addData() {
      const params = {
        title: "添加书籍",
        datas:[
            {id:1,type:"",title:"title",text:"书名"},
            {id:2,type:"",title:"author",text:"作者"},
            {id:3,type:"",title:"price",text:"价格"},
            {id:4,type:"",title:"number",text:"库存"},
            {id:5,type:"",title:"type",text:"类别"},
            {id:6,type:"",title:"introduce",text:"简介"}
        ]
      };
      ctx.$refs.qhdialog.handleTrue(params);
    }
    function handleSelectionChange(val) {
      //多选
      data.multipleSelection = val;
    }
    function toggleSelection(rows) {
      //多选选中
      if (rows) {
        rows.forEach((row) => {
          ctx.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        ctx.$refs.multipleTable.clearSelection();
      }
    }
    function indexMethod(index) {
      //自动索引
      return index + 1;
    }
    function formatter(row, column) {
      //排序
      return row.address;
    }
    function confirm(uid) {
        ctx.$axios.delete(`${ctx.$api.delProject}` + `/${uid}`).then((res) => {
          ctx.$mb.ms(`删除成功!`);
          created();
        });
    }
    function handleSizeChange(newSize) {
      //分页数据个数
      data.tableRelevant.pageSize = newSize;
    }
    function handleCurrentChange(newNow) {
      //当前所在页数
      data.tableRelevant.pageNow = newNow;
    }
    function inputKey(key) {
      //搜索
      const mineDatas = [];
      data.tableData.forEach((value, index) => {
        if (
          value.title.indexOf(data.searchKey) > -1 ||
          value.price.indexOf(data.searchKey) > -1 ||
          value.type.indexOf(data.searchKey) > -1 ||
          value.author.indexOf(data.searchKey) > -1
        ) {
          mineDatas.push(value);
        }
      });
      data.tableData = mineDatas;
    }
    function off(){
      ctx.$axios
        .get(`${ctx.$api.getLoginMonomer}`)
        .then((res) => {
          const state=res.role
          for(let i=0;i<state.length;i++){
            if(state[i].id=="110"){
              data.off=state[i].children[0].off
            }
          }
        })
        .catch((err) => {console.log(err)});
    }
    function created() {
      ctx.$axios.get(`${ctx.$api.getProjects}`).then((res) => {
        const datas = res.data;
        //console.log(datas);
        for (let i = 0; i < datas.length; i++) {
          datas[i].date = ctx.$conmon.formatDate(
            ctx.$conmon.timeDate(datas[i].date)
          );
        }
        data.tableData = res.data;
        off();
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
      indexMethod,
      formatter,
      handleSelectionChange,
      toggleSelection,
      addData,
    };
  },
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
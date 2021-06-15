<template>
  <el-dialog
    :title="data.dialogFrom.title"
    v-model="data.dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="data.dialogFrom" label-width="80px">
      <el-form-item
        :label="item.text"
        v-for="item of data.dialogFrom.datas"
        :key="item.id"
      >
        <el-input
          v-model="item.type"
          :placeholder="`请输入${item.text}`"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddData">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, getCurrentInstance, watch } from "vue";
export default {
  setup(props, cex) {
    const { ctx } = getCurrentInstance();
    const data = reactive({
      dialogVisible: false,
      dialogFrom: [],
      flag: false,
    });
    function handleClose() {
      ctx.data.dialogVisible = false;
    }
    function handleTrue(data) {
      //console.log(data);
      ctx.data.dialogFrom = data;
      ctx.data.dialogVisible = true;
    }
    function handleAddData() {
      data.flag = false;
      const res = data.dialogFrom.datas;
      let params = {};
      for (let i = 0; i < res.length; i++) {
        params[res[i].title] = res[i].type;
      }
      ctx.$axios.post(`${ctx.$api.addProject}`, params).then((res) => {
        //console.log(res);
        ctx.data.dialogVisible = false;
        if (res.code == 1) {
          ctx.$mb.ms(`${res.msg}`);
        } else if (res.code == 2) {
          ctx.$mb.me(`${res.msg}`);
        }
        for (var i = 0; i < res.length; i++) {
          res[i].type = "";
        }
        cex.emit("update:created");
      });
    }
    return {
      data,
      handleClose,
      handleTrue,
      handleAddData,
    };
  },
};
</script>
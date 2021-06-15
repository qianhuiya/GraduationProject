<template>
  <div ref="myChart" :style="{ width: '100%', height: '550px' }"></div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import * as echarts from "echarts";
export default {
  setup() {
    const { ctx } = getCurrentInstance();
    const myChart = ref();
    const myCharts = ref();
    function myChartDatas(kehuan, xiaoshuo, wenxue, yishu, yueqi) {
      myCharts.value = echarts.init(myChart.value);
      myCharts.value.setOption({
        xAxis: {
          type: "category",
          data: ["诗歌集", "长篇小说", "文学", "通史", "散文"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [kehuan,xiaoshuo,wenxue,yishu,yueqi],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
    }
    function created() {
      ctx.$axios.get(`${ctx.$api.getProjects}`).then((res) => {
        const datas = res.data;
        //console.log(datas);
        var kehuan = 0,
          xiaoshuo = 0,
          wenxue = 0,
          yishu = 0,
          yueqi = 0;
        for (var i = 0; i < datas.length; i++) {
          if (datas[i].type == "诗歌集") {
            kehuan = kehuan + 1;
          } else if (datas[i].type == "长篇小说") {
            xiaoshuo = xiaoshuo + 1;
          } else if (datas[i].type == "文学") {
            wenxue = wenxue + 1;
          } else if (datas[i].type == "通史") {
            yishu = yishu + 1;
          } else if (datas[i].type == "散文") {
            yueqi = yueqi + 1;
          }
        }
        setTimeout(() => {
          myChartDatas(kehuan, xiaoshuo, wenxue, yishu, yueqi);
        }, 10);
      });
    }
    created();
    return {
      myChart,
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
}
</style>

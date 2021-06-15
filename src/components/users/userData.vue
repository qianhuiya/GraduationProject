<template>
  <div ref="myChart" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import * as echarts from "echarts";
export default {
  setup() {
      const { ctx } = getCurrentInstance();
    const myChart = ref();
    const myCharts = ref();
    function myChartDatas(man,woman,admin,teacher,book) {
      myCharts.value = echarts.init(myChart.value);
      myCharts.value.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          data: ["男", "女", "管理员", "书店", "教师"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              position: "inner",
              fontSize: 14,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: man, name: "男" },
              { value: woman, name: "女", selected: true },
            ],
          },
          {
            name: "数据统计",
            type: "pie",
            radius: ["45%", "60%"],
            labelLine: {
              length: 30,
            },
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#F6F8FC",
              borderColor: "#8C8D8E",
              borderWidth: 1,
              borderRadius: 4,

              rich: {
                a: {
                  color: "#6E7079",
                  lineHeight: 22,
                  align: "center",
                },
                hr: {
                  borderColor: "#8C8D8E",
                  width: "100%",
                  borderWidth: 1,
                  height: 0,
                },
                b: {
                  color: "#4C5058",
                  fontSize: 14,
                  fontWeight: "bold",
                  lineHeight: 33,
                },
                per: {
                  color: "#fff",
                  backgroundColor: "#4C5058",
                  padding: [3, 4],
                  borderRadius: 4,
                },
              },
            },
            data: [
              { value: admin, name: "管理员" },
              { value: book, name: "书店" },
              { value: teacher, name: "教师" },
            ],
          },
        ],
      });
    }
    function created() {
        ctx.$axios.get(`${ctx.$api.getMonomers}`).then((res) => {
        const datas = res.data;
        //console.log(datas);
        let man=0,woman=0,teacher=0,admin=0,book=0
        for(var i=0;i<datas.length;i++){
            if(datas[i].sex=="man"){
                man=man+1
            }else if(datas[i].sex=="woman"){
                woman=woman+1
            }
             if(datas[i].identity=="admin"){
                admin=admin+1
            }else if(datas[i].identity=="teacher"){
                teacher=teacher+1
            }else if(datas[i].identity=="book"){
                book=book+1
            }
        }
        setTimeout(() => {
           myChartDatas(man,woman,admin,teacher,book);
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

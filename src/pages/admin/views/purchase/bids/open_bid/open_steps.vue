<template>
  <div id="open_steps">
    <h5>
      <div>
        招标管理 / <span class="pointer" @click="$router.push({path:'/Bid/open_bid',query:{bid_code}})">开标评标管理</span> / 评标
      </div>
      <div>
        <a-button @click="$router.replace({path:'/Bid/open_bid',query:{bid_code}})">返回</a-button>
        <a-button type="primary" @click="refresh">刷新</a-button>
        <a-button v-if="judge_info.status==10&&current==6" @click="open_report_file">开启报价文件</a-button>
        <a-button v-if="(judge_info.status==13||judge_info.status==14)&&current==8" type="primary" @click="compute_bid_price">计算中标价格</a-button>
        <a-button @click="compute_bid_price">计算中标价格</a-button>
        <a-button v-if="current==8" type="primary" @click="download_bid_result">下载得分汇总</a-button>
        <!-- <a-button v-if="current==8" type="primary" @click="print_bid_result">打印得分汇总</a-button> -->
        <a-button v-if="judge_info.status==14&&current==8" type="primary" @click="submit">提交</a-button><!-- 提交供应商关于价格意见改为提交得分汇总列表 -->
        <a-button v-if="judge_info.status==15&&current==9" type="primary" @click="submit">提交</a-button>
        <a-button type="primary" v-if="current==0||current==4||current==5||current==6||current==8" @click="next">下一步</a-button>
      </div>
    </h5>
    <section class="content">
      <a-steps :current="current" labelPlacement="vertical">
        <a-step @click="judge_info.status>=3?$router.push({path:'/Bid/open_record',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            开标记录
            <br />
            <span>(资格商务审查)</span>
            <span class="open">开</span>
          </div>
        </a-step>
        <a-step @click="judge_info.status>=4?$router.push({path:'/Bid/judge_quality',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            资格审查
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="judge_info.status>=5?$router.push({path:'/Bid/judge_match',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            符合性评审
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="judge_info.status>=6?$router.push({path:'/Bid/judge_quality_grade',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            商务技术评分
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="judge_info.status>=7?$router.push({path:'/Bid/judge_total_quality_grade',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            商务技术评分汇总
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="judge_info.status>=9?$router.push({path:'/Bid/business_result',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            商务技术结果公示
            <span class="open">开</span>
          </div>
        </a-step>
        <a-step @click="judge_info.status>=10?$router.push({path:'/Bid/supply_report',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            开标记录
            <br />
            <span>(报价)</span>
            <span class="open">开</span>
          </div>
        </a-step>
        <a-step @click="judge_info.status>=12?$router.push({path:'/Bid/judge_report',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            报价评审
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="judge_info.status>=13?$router.push({path:'/Bid/judge_result',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            得分汇总
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="judge_info.status>=15?$router.push({path:'/Bid/judge_elect_supply',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            结果公示
            <span class="open">开</span>
          </div>
        </a-step>
      </a-steps>
    </section>
    <router-view :father="this" ref="child"></router-view>
  </div>
</template>

<script>
import {
  get_judge_info // 获取项目评标中的状态
} from "@admin/api/open_bid";
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      bid_code: this.$route.query.bid_code,
      current: 0,
      judge_info: {}
    };
  },
  created() {
    this.father.selectedKeys = ["/Bid/open_bid_list"];
    this.get_judge_info();
  },
  methods: {
    open_report_file(){
      this.$refs.child.open_report_file();
    },
    get_judge_info(){ // 获取项目评标中的状态
      var bid_code = this.bid_code;
      get_judge_info(bid_code).then(res=>{
        this.judge_info = res.data;
        this.$store.commit('SET_STATUS',res.data.status);
        switch (res.data.status) {
          case '4':
            this.$router.push({path:'/Bid/judge_quality',query:{bid_code}})
            break;
          case '5':
            this.$router.push({path:'/Bid/judge_match',query:{bid_code}})
            break;
          case '6':
            this.$router.push({path:'/Bid/judge_quality_grade',query:{bid_code}})
            break;
          case '7':
            this.$router.push({path:'/Bid/judge_total_quality_grade',query:{bid_code}})
            break;
          case '9':
            this.$router.push({path:'/Bid/business_result',query:{bid_code}})
            break;
          case '10':
            this.$router.push({path:'/Bid/supply_report',query:{bid_code}})
            break;
          case '12':
            this.$router.push({path:'/Bid/judge_report',query:{bid_code}})
            break;
          case '13':
            this.$router.push({path:'/Bid/judge_result',query:{bid_code}})
            break;
          case '15':
            this.$router.push({path:'/Bid/judge_elect_supply',query:{bid_code}})
            break;
          default:
            break;
        }
      }).catch(error=>this.$message.error(error))
    },
    refresh(){  // 刷新
      this.get_judge_info();
      if(!!this.$refs.child.refresh){
        this.$refs.child.refresh()
      }
    },
    submit(){
      this.$refs.child.submit();
    },
    compute_bid_price(){
      this.$refs.child.compute_bid_price();
    },
    print_bid_result(){ /* 打印得分汇总 */
      this.$refs.child.print_bid_result();
    },
    download_bid_result(){ /* 下载得分汇总 */
      this.$refs.child.download_bid_result();
    },
    next() {
      this.$refs.child.next();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#open_steps {
  @include component;
}
</style>
<style lang="scss">
@import "~@admin/assets/scss/steps";
#open_steps {
  @include steps;
}
</style>
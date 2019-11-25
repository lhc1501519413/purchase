<template>
  <div id="judge">
    <h5>
      项目评审 / 招标项目评审
      <div class="btn-container">
        <a-button @click="$router.go(-1)">返回</a-button>
        <a-button @click="get_judge_info">刷新</a-button>
        <a-button @click="download_tender_file">下载投标文件</a-button>
        <a-button @click="download_bid_file">下载采购文件</a-button>
        <a-button class='primary' type="primary" v-if="status==4&&current==0" @click="online_judge_quality">在线资格评审</a-button>
        <a-button class='primary' type="primary" v-if="status==6&&current==2" @click="online_judge_quality_grade">在线电子评标</a-button>
        <a-button class='primary' type="primary" v-if="status==12&&current==4" @click="online_judge_report">在线报价评审</a-button>
        <a-button @click="failure">废标</a-button>
        <a-button @click="save">保存</a-button>
        <a-button class='primary' type="primary" @click="submit">提交</a-button>
        <a-button class='primary' type="primary" v-if="group_leader==1&&status!=13" @click="next">下一步</a-button>
      </div>
    </h5>
    <section class="content">
      <a-steps :current="current" labelPlacement="vertical">
        <a-step @click="$router.push({path:'/judge/judge_quality',query:{bid_code}})">
          <div slot="title" class="pointer">
            资格审查
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="$router.push({path:'/judge/judge_match',query:{bid_code}})">
          <div slot="title" class="pointer">
            符合性评审
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="$router.push({path:'/judge/judge_quality_grade',query:{bid_code}})">
          <div slot="title" class="pointer">
            商务技术评分
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="$router.push({path:'/judge/judge_total_quality_grade',query:{bid_code}})">
          <div slot="title" class="pointer">
            商务技术评分汇总
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title" class="pointer">
            报价评审
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step>
          <div slot="title" class="pointer">
            得分汇总
            <span class="judge">评</span>
          </div>
        </a-step>
      </a-steps>
    </section>
    <router-view :father="this" :status='status' :judge_info='judge_info' ref="child"></router-view>
  </div>
</template>

<script>
import {
  get_judge_info
} from '@admin/api/judge'
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      current: 0,
      bid_code:'',
      status:'',
      group_leader:'',
      judge_info:{}
    };
  },
  created() {
    this.bid_code = this.$route.query.bid_code;
    this.father.selectedKeys = ["/Judge/bid_list"];
    this.get_judge_info();
  },
  methods: {
    get_judge_info(){
      get_judge_info(this.bid_code).then(res=>{
        this.status = res.data.status;
        this.group_leader = res.data.group_leader;
        this.judge_info = res.data;
      }).catch(error=>this.$message.error(error))
    },
    download_tender_file() {},
    download_bid_file() {},
    online_judge_quality() {
      this.$refs.child.online_judge_quality();
    },
    online_judge_quality_grade(){
      this.$refs.child.online_judge_quality_grade();
    },
    online_judge_report(){
      this.$refs.child.online_judge_report();
    },
    failure() {
      this.$router.push({path:'/judge/scrap',query:{bid_code:this.bid_code,l_id:this.group_leader}})
    },
    save() {
      this.$refs.child.save();
    },
    submit() {
      this.$refs.child.save(true);
    },
    next() {
      this.$refs.child.next();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#judge {
  @include component;
  .btn-container{
    .ant-btn:not(.primary){
      border-color:#ff8442;
      color:#ff8442;
    }
  }
}
</style>
<style lang="scss">
@import "~@admin/assets/scss/steps";
#judge {
  @include steps;
}
</style>
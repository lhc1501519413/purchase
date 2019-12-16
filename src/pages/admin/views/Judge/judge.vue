<template>
  <div id="judge">
    <h5>
      项目评审 / 招标项目评审
      <div class="btn-container">
        <a-button @click="$router.replace({path:'/Judge/bid_list'})">返回</a-button>
        <a-button @click="get_judge_info">刷新</a-button>
        <a-button @click="download_tender_file">下载投标文件</a-button>
        <a-button @click="download_bid_file">下载采购文件</a-button>
        <a-button class='primary' type="primary" v-if="status==4&&current==0" @click="online_judge_quality">在线资格评审</a-button>
        <a-button class='primary' type="primary" v-if="status==6&&current==2" @click="online_judge_quality_grade">在线电子评标</a-button>
        <a-button class='primary' type="primary" v-if="status==12&&current==4" @click="online_judge_report">在线报价评审</a-button>
        <a-button @click="failure">废标</a-button>
        <a-button v-if='status!=7&&status!=8&&status!=13' @click="save">保存</a-button>
        <a-button class='primary' type="primary" v-if='group_leader==1||group_leader!=1&&status!=7&&status!=8&&status!=13' @click="submit">提交</a-button>
        <a-button class='primary' type="primary" v-if="group_leader==1&&status<14&&current!=5" @click="next">下一步</a-button>
      </div>
    </h5>
    <section class="content">
      <a-steps :current="current" labelPlacement="vertical">
        <a-step @click="status>=4?$router.push({path:'/judge/judge_quality',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            资格审查
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="status>=5?$router.push({path:'/judge/judge_match',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            符合性评审
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="status>=6?$router.push({path:'/judge/judge_quality_grade',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            商务技术评分
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="status>=7?$router.push({path:'/judge/judge_total_quality_grade',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            商务技术评分汇总
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="status>=12?$router.push({path:'/judge/judge_report',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            报价评审
            <span class="judge">评</span>
          </div>
        </a-step>
        <a-step @click="status>=13?$router.push({path:'/judge/judge_result',query:{bid_code}}):$message.info('尚未进行到此阶段')">
          <div slot="title" class="pointer">
            得分汇总
            <span class="judge">评</span>
          </div>
        </a-step>
      </a-steps>
    </section>
    <a-modal
      class="failure-modal"
      :destroyOnClose="true"
      style="top: 10%;"
      width="65%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
      >
      <h3 slot="title">{{ModalTitle}}</h3>
      <a-table
        class="table"
        :dataSource="ModalInfo"
        :columns="columns"
        :pagination="false"
        rowKey="id"
        >
        <template slot="business_file_list" slot-scope="text,record"><!-- 商务技术文件 -->
          <ul>
            <li v-for="(item,index) of record.business_file_list" :key='index'>
              <a :href="item.full_path" target="_blank">{{item.file_name}}</a>
            </li>
          </ul>
        </template>
        <template slot="price_file_list" slot-scope="text,record"><!-- 价格文件 -->
          <ul>
            <li v-for="(item,index) of record.price_file_list" :key='index'>
              <a :href="item.full_path" target="_blank">{{item.file_name}}</a>
            </li>
          </ul>
        </template>
        <template slot="operation" slot-scope="text,record"><!-- 采购文件 -->
          <a :href="record.full_path" target="_blank">查看文件</a>
        </template>
      </a-table>
    </a-modal>
    <router-view :father="this" :status='status' :judge_info='judge_info' ref="child"></router-view>
  </div>
</template>

<script>
import {
  get_judge_info, // 获取项目评标中的状态
  get_supply_file_list, // 获取商务技术附件和价格附件
  get_bid_purchase_file // 获取招标附件
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
      judge_info:{},
      ModalVisible:false,
      ModalTitle:'',
      ModalInfo:[],
      columns: [],
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
      console.log(!!this.$refs.child.get_judge_result)
      if(!!this.$refs.child.get_judge_result){
        this.$refs.child.get_judge_result()
      }
    },
    download_tender_file() {
      var step;
      switch (this.current) {
        case 0:
          step = '4';
          break;
        case 1:
          step = '5'
          break;
        case 2:
          step = '6'
          break;
        case 3:
          step = '6'
          break;
        case 4:
          step = '12'
          break;
        case 5:
          step = '12'
          break;
        default:
          break;
      }
      get_supply_file_list({bid_code:this.bid_code,step}).then(res=>{
        this.columns = [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title:'供应商名称',
          dataIndex:'supply_name',
          width:'10%'
        },
        {
          title: "商务技术文件",
          dataIndex: "status",
          scopedSlots: { customRender: "business_file_list" },
          width: "10%"
        },
        {
          title: "价格文件",
          scopedSlots: { customRender: "price_file_list" },
          width: "20%"
        }
      ];
        this.ModalTitle = '投标文件';
        this.ModalVisible = true;
        this.ModalInfo = res.data;
      }).catch(error=>this.$message.error(error))
    },
    download_bid_file() {
      get_bid_purchase_file({bid_code:this.bid_code}).then(res=>{
        this.columns = [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "文件名称",
          dataIndex:'file_name',
          width: "20%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
          width: "20%"
        }
      ]
        this.ModalTitle = '采购文件';
        this.ModalVisible = true;
        this.ModalInfo = res.data;
      }).catch(error=>this.$message.error(error))
    },
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
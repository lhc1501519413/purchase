<template>
  <div id="beforeDeal">
    <h5>
        <span>在线询价 / 询价单管理 / 询价结束</span>
        <div></div>
    </h5>
    <enquiry :formData="formData" :r_id="id" :region_area='region_area' :status='status'></enquiry>
    <section class="content">
      <h4>询价结果</h4>
      <a-row>
        <a-col :span='10' :offset='1'>{{statuskey==9||statuskey==10?'预':''}}成交供应商：{{win_supply_info.supply_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='7' :offset='1'>所在地：{{win_supply_info.address}}</a-col>
        <a-col :span='7' :offset='1'>联系人：{{win_supply_info.contact_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='7' :offset='1'>手机：{{win_supply_info.contact_number}}</a-col>
        <a-col :span='7' :offset='1'>联系电话：{{win_supply_info.out_contact}}</a-col>
      </a-row>
      <a-table :columns="columns" :dataSource="formData.result_supply_list" rowKey='supply_id'>
        <template slot="supply_name" slot-scope="text,record">
          <span class="supply_name">
            {{text}}
            <span>
              {{record.type?'已成交':'已放弃'}}
            </span>
          </span>
        </template>
        <template slot="operation" slot-scope="text">
          <router-link :to="{path:'/offerDetail',query:{inquiry_code:text.inquiry_code,supply_id:text.supply_id}}">
            报价详情
          </router-link>
        </template>
      </a-table>
    </section>
    <section class="content" v-show="statuskey==9||statuskey==10">
      <h4>结果确认</h4>
      <a-row>
        <a-col :span='10' :offset='1'>
          <span>
            询价结果：取消询价
          </span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='8' :offset='1'>理由说明：{{formData.memo}}</a-col>
      </a-row>
    </section>
    <section class="content">
      <h4>报价详情信息</h4>
      <a-table :columns="columns2" :dataSource="formData.report_supply_list" rowKey='supply_id'>
        <template slot="operation" slot-scope="text">
          <router-link :to="{path:'/offerDetail',query:{inquiry_code:text.inquiry_code,supply_id:text.supply_id}}">
            报价详情
          </router-link>
        </template>
      </a-table>
    </section>
  </div>
</template>

<script>
import enquiry from './components/enquiry';
import {
  get_inquiry_info // 获取询价信息
} from "@admin/api/enquiry";
const columns = [
  {
    title:'供应商名称',
    width:'25%',
    dataIndex: 'supply_name',
    scopedSlots: { customRender: 'supply_name' },
    align:'center'
  },
  {
    title:'总报价（元）',
    width:'20%',
    dataIndex: 'total_money',
    align:'center'
  },
  {
    title:'报价时间',
    width:'20%',
    dataIndex: 'report_time',
    align:'center'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    align:'center',
    width:'20%'
  },
  {
    title: '原因',
    dataIndex: 'remark',
    align:'center',
    width:'20%'
  }
];
const columns2 = [
  {
    title:'序号',
    customRender: (text,record,index)=>`${index+1}`,
    width:'6%',
    align:'center'
  },
  {
    title:'供应商名称',
    width:'25%',
    dataIndex: 'supply_name',
    align:'center'
  },
  {
    title:'报价时间',
    width:'20%',
    dataIndex: 'report_time',
    align:'center'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    align:'center',
    width:'20%'
  }
];
export default {
  components: {
    enquiry
  },
  data() {
    return {
      columns,
      columns2,
      formData:{},
      win_supply_info:{},
      id:'',
      status:'取消询价',
      statuskey:'',
      region_area:'',
    };
  },
  props:{
    father:{
      type:Object
    }
  },
  created() {
    this.father.selectedKeys = ['/Inquiry/get_inquiry_list'];
    this.id = this.$route.query.id;
    this.code = this.$route.query.code;
    this.statuskey = this.$route.query.statuskey;
    if(this.statuskey == 9){
      this.status = '重新询价';
    }
    if(this.statuskey == 8){
      this.status = '询价完成';
    }
    this.get_inquiry_info_method(this.code);
  },
  methods: {
    get_inquiry_info_method(code){
      get_inquiry_info(code)
      .then(res => {
        this.formData = res.data;
        this.win_supply_info = res.data.win_supply_info;
        var list = res.data.shipping_region_list;
        var region_area='';
        list.forEach(elem => {
          region_area +=elem.name+'，';
        });
        this.region_area = region_area.slice(0,-1);

      })
      .catch(error => {
        this.$message.error(error)
      });
    },
  }
};
</script>
<style lang="scss" scoped>
  @import "~@admin/assets/scss/enquiry/beforeDeal";
</style>
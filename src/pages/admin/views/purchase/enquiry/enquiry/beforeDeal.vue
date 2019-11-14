<template>
  <div id="beforeDeal">
    <h5>
        <span>在线询价 / 询价单管理 / 确认询价单</span>
        <div></div>
    </h5>
    <enquiry :formData="formData" :r_id="id" :region_area='region_area' :status='status'></enquiry>
    <section class="content">
      <h4>询价结果</h4>
      <a-row>
        <a-col :span='10' :offset='1'>参与报价的供应商：{{formData.supply_count}}家</a-col>
      </a-row>
      <a-row>
        <a-col :span='10' :offset='1'>预成交供应商：{{win_supply_info.supply_name}}</a-col>
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
              {{record.type?'预成交':'已放弃'}}
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
    <section class="content">
      <h4>结果确认</h4>
      <a-row>
        <a-col :span='10' :offset='1'>
          <span>
            询价结果：
          </span>
          <a-radio-group v-model="deal_or_give">
            <a-radio :value="1">成交</a-radio>
            <a-radio :value="0">放弃</a-radio>
          </a-radio-group>
          <a-select v-show='!deal_or_give' v-model="type">
            <a-select-option value="1">取消询价</a-select-option>
            <a-select-option value="2">重新询价</a-select-option>
            <a-select-option value="3">重新选择供应商</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row v-show='!deal_or_give'>
        <a-col :span='2' :offset='1'>理由说明：</a-col>
        <a-col :span='7'>
          <a-textarea
            v-model="remark"
            placeholder="请输入放弃原因"
            />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='7' :offset='1'>
          <a-button type="primary" @click="submit">提交</a-button>
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
import enquiry from './components/enquiry';
import {
  inquiry_confirm, // 确认
  inquiry_give_up, // 放弃
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
    title:'原因',
    width:'20%',
    dataIndex: 'remark',
    align:'center'
  },
];
export default {
  components: {
    enquiry
  },
  data() {
    return {
      columns,
      formData:{},
      win_supply_info:{},
      id:'',
      status:'待确认',
      region_area:'',
      deal_or_give:1,
      remark:'',
      type:'1'
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
    submit(){
      var self = this;
      var data = {
        id:this.id,
        type:this.type,
        remark:this.remark
      };
      if(!this.deal_or_give&&this.remark==''){
        this.$message.success('请输入放弃原因')
        return;
      }
      if(this.deal_or_give){
        this.$confirm({
          title: '确认成交该询价单?',
          onOk() {
            inquiry_confirm(self.id).then(res=>{
              self.$message.success(res.msg)
              let time = setTimeout(()=>{
                self.$router.go(-1);
                clearTimeout(time)
              },1500)
            }).catch(error=>{
              self.$message.error(error)
            })
          },
          onCancel() {},
        });
      }else{
        this.$confirm({
          title: '确认放弃该询价单吗?',
          onOk() {
            inquiry_give_up(data).then(res=>{
              self.$message.success(res.msg)
              let time = setTimeout(()=>{
                if(data.type==3){
                  self.remark ='';
                  self.deal_or_give =1;
                  self.get_inquiry_info_method(self.code);
                }else{
                  self.$router.go(-1);
                }
                clearTimeout(time)
              },1500)
            }).catch(error=>{
              self.$message.error(error)
            })
          },
          onCancel() {},
        });
      }
    }
  },
};
</script>
<style lang="scss" scoped>
  @import "~@admin/assets/scss/enquiry/beforeDeal";
</style>
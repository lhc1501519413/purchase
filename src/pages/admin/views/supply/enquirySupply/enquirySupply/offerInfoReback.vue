<template>
  <div id="offer">
    <h5>
        <span>在线询价 / 询价单管理 / 报价信息</span>
        <div>
          <!-- <a-button type="primary" @click="submit" class="mr">修改报价</a-button> -->
          <!-- <a-button @click="cancel" class="ml">取消报价</a-button> -->
        </div>
    </h5>
    <enquiry :formData="formData" :region_area='region_area' :status='status'></enquiry>
    <!-- <enquiry :formData="formData" :r_id="id" :region_area='region_area' :status='status'></enquiry> -->
     <section class="content">
      <h4>询价商品信息</h4>
      <a-row>
        <a-col :span='6' :offset='1'>询价大类：{{formData.cat_name}}</a-col>
        <a-col :span='8'>预计配送时间：{{formData.shipping_days}}天</a-col>
      </a-row>
      <a-table 
        class="table"
        rowKey="id"
        :columns="columns" 
        :dataSource="data"
        :pagination='pagination'
      >
      <template slot="is_match" slot-scope="value,record">
        {{record.is_match|is_exam}}
      </template>
      <template slot="is_exam" slot-scope="value,record,index">
        <span
          v-if="record.is_exam==1"
          @click="show_model(index,true)"
          >
          <svg-icon icon-class="icon_table_check"/>
        </span>
        <span v-else>
          <svg-icon icon-class="icon_table_no"/>
        </span>
      </template>
      </a-table>
    </section>
    <!-- <section class="content">
      <h4>询价结果</h4>
      <a-row>
        <a-col :span='10' :offset='1'>参与报价的供应商：{{formData.supply_count}}家</a-col>
      </a-row>
    </section> -->
    <a-modal
      :destroyOnClose="true"
      style="top: 10%"
      width="50%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="() => setModalVisible(false)"
      @cancel="() => setModalVisible(false)"
      >
      <template slot="title">
        <h3 align="center">产品检测报告</h3>
      </template>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="检查报告编号" v-bind="formItemLayout">
          <span v-show="edit_read">{{exam_info.report_code}}</span>
          <a-input
            v-show="!edit_read"
            placeholder="请输入检查报告编号"
            v-decorator="[
              'report_code',
              { rules: [{ required: true, message: '请输入检查报告编号' }],initialValue:exam_info.report_code }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="产品名称" v-bind="formItemLayout">
          <span v-show="edit_read">{{exam_info.product_name}}</span>
          <a-input
            v-show="!edit_read"
            placeholder="请输入产品名称"
            v-decorator="[
              'product_name',
              { rules: [{ required: true, message: '请输入产品名称' }],initialValue:exam_info.product_name }
            ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="批准日期" v-bind="formItemLayout">
          <span v-show="edit_read">{{exam_info.approval_date}}</span>
          <a-date-picker
            v-if="!exam_info.approval_date&&!edit_read"
            placeholder="请选择批准日期"
            v-decorator="[
              'approval_date',
              { rules: [{ type: 'object',required: true, message: '请选择批准日期' }] }
            ]"
          />
          <a-date-picker
            v-if="exam_info.approval_date&&!edit_read"
            placeholder="请选择批准日期"
            v-decorator="[
              'approval_date',
              { rules: [{ type: 'object',required: true, message: '请选择批准日期' }],initialValue:$moment(exam_info.approval_date) }
            ]"
          />
        </a-form-item>
        <a-form-item label="附件" v-bind="formItemLayout">
          <div v-show="edit_read">
            <svg-icon class="wenjian" icon-class="wenjian" />
            <span @click="show_file(exam_info.full_file_path)">{{exam_info.file_name}}</span>
          </div>
          <a-upload
            v-show="!edit_read"
            :showUploadList="false"
            :customRequest="customRequest"
            :beforeUpload="beforeUpload"
            v-decorator="[
              'file_path',
              { rules: [{ required: true, message: '请选择附件' }] }
            ]"
            >
            <a-button>
              <a-icon type="upload" />上传
            </a-button>
            <div v-show="!edit_read" class="mt-10">
              <svg-icon v-show="exam_info.file_name" class="wenjian" icon-class="wenjian" />
              <span v-show="exam_info.file_name">
                {{exam_info.file_name}}
              </span>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item v-show="!edit_read">
          <div align="center">
            <a-button @click="()=>setModalVisible(false)">取消</a-button>
            <a-button type="primary" html-type="submit">确定</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import enquiry from './components/enquirySupply';
import {
  get_supply_inquiry_info,
  save_supply_stock_list,
  cancel_supply_report // 报价询价单取消报价
} from "@admin/api/enquiry_supply";
const columns = [
  {
    title:'序号',
    customRender: (text,record,index)=>`${index+1}`,
    width:'5%',
    align:'center'
  },
  {
    title:'商品名称',
    dataIndex: 'stock_name',
    width:'7%',
    align:'center'
  },
  {
    title:'品牌',
    dataIndex: 'brand',
    width:'5%',
    align:'center'
  },
  {
    title:'规格',
    dataIndex: 'standard',
    width:'6%',
    align:'center'
  },
  {
    title:'采购单位',
    dataIndex: 'price_unit_name',
    width:'6%',
    align:'center'
  },
  {
    title:'预估采购数量',
    dataIndex: 'number',
    width:'8%',
    align:'center'
  },
  {
    title:'单价（元）',
    dataIndex: 'price',
    width:'9%',
    align:'center',
    scopedSlots: { customRender: 'price' }
  },
  {
    title:'响应品牌',
    dataIndex: 'response_brand',
    width:'9%',
    align:'center',
    scopedSlots: { customRender: 'response_brand' }
  },
  {
    title:'响应规格',
    dataIndex: 'response_standard',
    width:'9%',
    align:'center',
    scopedSlots: { customRender: 'response_standard' }
  },
  {
    title:'提供产品检测报告',
    dataIndex: 'is_exam',
    width:'8%',
    align:'center',
    scopedSlots: { customRender: 'is_exam' }
  },
  {
    title:'是否符合',
    dataIndex: 'is_match',
    width:'8%',
    align:'center',
    scopedSlots: { customRender: 'is_match' }
  },
];
export default {
  components: {
    enquiry
  },
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      formData:{},
      data:[],
      // id:'',
      inquiry_code:'',
      status:'采购方已撤回',
      region_area:'',
      columns,
      pagination:{
        showQuickJumper:true,
        showSizeChanger:true,
        pageSizeOptions:['10','20','30'],
        showTotal:()=>{
          return `共${this.data.length}条数据`
        }
      },
      edit_read: false, // 编辑查看切换
      ModalVisible: false, // 弹出控制
      exam_info:{},
      stock_index:0, // 商品下标
    };
  },
  filters:{
    is_exam(key){
      switch (key) {
        case '1':
          return '是'
          break;
        case 1:
          return '是'
          break;
        default:
          return '否'
          break;
      }
    }
  },
  created() {
    let inquiry_code = this.$route.query.inquiry_code;
    this.inquiry_code = inquiry_code;
    this.father.selectedKeys = ['/Supplyinquiry/supply_inquiry_list'];
    get_supply_inquiry_info(inquiry_code)
      .then(res => {
        this.formData = res.data;
        this.data = res.data.stock_list;
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
  methods: {
    submit(){
      var self = this;
      var key = false;
      var data = {
        inquiry_code:this.inquiry_code,
        stock_list:this.data
      }
      data.stock_list.forEach(elem=>{
        if (!elem.price||!elem.response_brand||!elem.response_standard) {
          key = true;
        }
      })
      if (key) {
        this.$message.warn('单价，响应品牌，响应规格不能为空')
        return;
      }
      this.$confirm({
        title: '确认修改报价吗?',
        onOk() {
          save_supply_stock_list(data).then(res=>{
            self.$message.success(res.msg);
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
    },
    cancel(){
      var self = this;
      this.$confirm({
        title: '确认取消报价吗?',
        onOk() {
          cancel_supply_report(self.inquiry_code).then(res=>{
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
    },
    show_file(e){
      open(e)
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            file_name: this.exam_info.file_name,
            file_path: this.exam_info.file_path,
            approval_date:fieldsValue['approval_date'].format('YYYY-MM-DD'),
          };
          this.data[this.stock_index].exam_info = values;
          this.setModalVisible(false);
        }
      });
    },
    customRequest(data) {
      const formData = new FormData();
      var self = this;
      formData.append("file", data.file);
      POST({ c: "Upload", a: "upload_one" }, formData)
        .then(res => {
          self.exam_info.file_name = res.data.name;
          self.exam_info.file_path = res.data.savepath;
          self.$forceUpdate();
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    beforeUpload(file) {
      const isKey = file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf";
      if (!isKey) {
        this.$message.error("您只可以上传JPG，PNG，PDF格式的文件");
      }
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("图片大小必须小于 20MB!");
      }
      return isKey && isLt2M;
    },
    show_model(index,key){
      this.edit_read = key;
      this.exam_info = Object.assign({},this.data[index].exam_info);
      this.stock_index = index;
      this.setModalVisible(true);
    },
    setModalVisible(ModalVisible) {
      this.ModalVisible = ModalVisible;
    }
  },
};
</script>
<style lang="scss" scoped>
  @import "~@admin/assets/scss/enquiry/offer";
</style>
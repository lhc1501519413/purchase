<template>
  <div id="offerDetail">
    <h5>
      <span>在线询价 / 询价单管理 / 报价详情</span>
      <div>
        <a-button v-if="false" class="mr" type="primary" @click="download">下载报价</a-button>
        <a-button class="ml" @click="back">返回</a-button>
      </div>
    </h5>
    <section class="content">
      <h4>
        <span>供应商信息</span>
        <span class="color">报价总价（元）：{{data.total_money}}</span>
      </h4>
      <a-row>
        <a-col :span="7" :offset="1">供应商名称：{{data.supply_name}}</a-col>
        <a-col :span="7" :offset="1">所在地：{{data.address}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="7" :offset="1">联系人：{{data.contact_name}}</a-col>
        <a-col :span="7" :offset="1">手机：{{data.contact_number}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="7" :offset="1">联系电话：0557-8888888</a-col>
      </a-row>
    </section>
    <section class="content">
      <h4>
        <span>商品报价信息</span>
      </h4>
      <a-table 
        class="table"
        :columns="columns" 
        :dataSource="data.stock_list" 
        rowKey='id'
        :pagination='pagination'
        >
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
        <template slot="is_match" slot-scope="value,record">
          <span>{{record.is_match|is_exam}}</span>
        </template>
      </a-table>
    </section>
    <!-- <section class="content">
      <h4>
        <span>报价记录</span>
      </h4>
      <a-row>
        <a-col :span="10">
      <ul class="record">
        <li>
          <div class="left"></div>
          <div class="right">
            <p>
              <span>2019-09-06 13:00:55</span>
              <span>供应商：浙江太古可口可乐有限公司   修改报价</span>
            </p>
            <p>
              小青菜  报价单价原10修改为5
            </p>
            <p>
              小青菜  响应品牌原A修改为B
            </p>
          </div>
        </li>
      </ul>
        </a-col>
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
import {
  get_inquiry_report_info // 报价信息
} from "@admin/api/enquiry";
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
    title:'报价单价（元）',
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
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 10 },
        wrapperCol: { span: 10 }
      },
      supply_id: '',
      inquiry_code: '',
      pagination:{
        showQuickJumper:true,
        showSizeChanger:true,
        pageSizeOptions:['10','20','30'],
        showTotal:()=>{
          return `共${this.data.stock_list.length}条数据`
        }
      },
      columns,
      data: {
        supply_id: '',
        supply_name: '',
        inquiry_code: '',
        address: '',
        contact_name: '',
        contact_number: '',
        total_money: '',
        stock_list: [
          {
            id: '',
            inquiry_code: '',
            stock_id: '',
            number: '',
            is_exam: '',
            create_time: '',
            stock_name: '',
            standard: '',
            price_unit_name: '',
            price: '',
            response_brand: '',
            response_standard: '',
            is_match: ''
          }
        ],
        log_list: false
      },
      edit_read: false, // 编辑查看切换
      ModalVisible: false, // 弹出控制
      exam_info:{},
      stock_index:0, // 商品下标
      stock_list:[]
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
  props:{
    father:{
      type:Object
    }
  },
  created() {
    this.father.selectedKeys = ['/Inquiry/get_inquiry_list'];
    this.supply_id = this.$route.query.supply_id;
    this.inquiry_code = this.$route.query.inquiry_code;
    get_inquiry_report_info(this.inquiry_code,this.supply_id).then(res=>{
      this.data = res.data;
      this.stock_list = res.data.stock_list;
    })
  },
  methods: {
    download(e) {
    },
    back() {
      this.$router.go(-1);
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
          this.stock_list[this.stock_index].exam_info = values;
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
      this.exam_info = Object.assign({},this.stock_list[index].exam_info);
      this.stock_index = index;
      this.setModalVisible(true);
    },
    setModalVisible(ModalVisible) {
      this.ModalVisible = ModalVisible;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/enquiry/offerDetail";
</style>
<template>
  <a-form id="bids" :form="form" @submit="handleSubmit">
    <h5>招标管理 / 招标项目管理 / {{formData.code?'编辑项目':'新增项目'}}</h5>
    <h3 v-if="code">
      <span>
        项目编号：{{formData.custom_code}}
      </span>
      <span class="ml-20" v-if="formData.from_custom_code">
        关联项目编号：{{formData.from_custom_code}}
      </span>
    </h3>
    <a-form-item class="button-container">
      <div align="center">
        <a-button type="primary" html-type="submit">保存</a-button>
        <a-button type="primary" class="ml-10" @click="submit">提交</a-button>
      </div>
    </a-form-item>
    <section class="content">
      <h4>项目基本信息</h4>
      <a-row>
        <a-col :span="7">
          <a-form-item label="项目名称" v-bind="formItemLayout">
            <a-input
              placeholder="请输入项目标题"
              v-decorator="[
                  'title',
                  { 
                    rules: [{ required: true, message: '请输入项目标题' }],
                    initialValue:formData.title
                  }
                ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-item label="项目编号" v-bind="formItemLayout">
            <a-input
              placeholder="请输入项目编号"
              v-decorator="[
                'custom_code',
                {
                  rules: [{ required: true, message: '请输入项目编号' }],
                  initialValue:formData.custom_code
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="7">
          <a-form-item label="采购单位" v-bind="formItemLayout">
            <a-tree-select
              :disabled="!!formData.stock_list.length||!!formData.area_list.length"
              showSearch
              @change="comChange"
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="user_com_list"
              placeholder="请选择采购单位"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
                'com_id',
                { 
                  rules: [{ required: true, message: '请选择采购单位' }],
                  initialValue:formData.com_id
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-item label="采购方式" v-bind="formItemLayout">
            <a-tree-select
              showSearch
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="bid_type_list"
              placeholder="请选择采购方式"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
                'bid_type',
                { 
                  rules: [{ required: true, message: '请选择采购方式' }],
                  initialValue:formData.bid_type
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="7">
          <a-form-item label="采购联系人" v-bind="formItemLayout">
            <a-input
              placeholder="请输入采购联系人"
              v-decorator="[
                'contact_name',
                { 
                  rules: [{ required: true, message: '请输入采购联系人' }],
                  initialValue:formData.contact_name
                }
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-item label="联系方式" v-bind="formItemLayout">
            <a-input
              placeholder="请输入联系方式"
              v-decorator="[
                'contact_number',
                {
                  rules: [
                    { required: true, message: '请输入联系方式' }
                  ],
                  initialValue:formData.contact_number                 
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="2" class="text-right" style="color:rgba(0,0,0,0.85)">
          配送区域：
        </a-col>
        <a-col :span="16">
          <a-table
            :columns="columns_area"
            :dataSource="formData.area_list"
            rowKey="area_key"
            :pagination="false"
          >
            <template slot-scope="text,record" slot="area_name">
              <a-input v-model="record.area_name" @change="area_name_change"/>
            </template>
            <template slot="region_list" slot-scope="text,record,index">
              <a-icon type="plus-circle" @click="add_area(index)"/>
              <ul>
                <li v-for="item of record.region_list" :key="item.id">
                  {{item.name}}
                </li>
              </ul>
            </template>
            <template slot="operation" slot-scope="text,record,index">
              <a @click="del_line(index)">删除</a>
            </template>
          </a-table>
          <!-- <a-tree-select
            style="width:55%;"
            showSearch
            allowClear
            @change="areaChange"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="com_price_region"
            placeholder="请选择配送区域"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
              'region_id',
              {
                rules: [{ required: true, message: '请选择配送区域' }],
                initialValue:formData.region_id
              }
            ]"
          />
          <a-textarea class="mt mb" readOnly v-model="region_area" :rows="4" /> -->
        </a-col>
        <a-col :span='3' :offset='1'>
          <a-button type='primary' @click="add_line">添加行</a-button>
        </a-col>
      </a-row>
      <a-form-item label="配送要求" :label-col='{ span: 2 }' :wrapper-col='{ span: 20 }'>
        根据合同甲方所定数量与时间（一般为订货时间起
        <a-select style="width: 80px"
          v-decorator="[
            'order_times',
            {
              rules: [{ required: true, message: '请选择配送要求' }],
              initialValue:formData.order_times
            }
          ]"
        >
          <a-select-option value="24">24</a-select-option>
          <a-select-option value="48">48</a-select-option>
          <a-select-option value="72">72</a-select-option>
        </a-select>
        小时内）送货。如遇合同甲方特殊情况需紧急订货的，商家应首先满足。
      </a-form-item>
    </section>
    <section class="content second-area">
      <h4>项目商品信息</h4>
      <a-row>
        <a-col :span="6">
          <a-form-item label="采购类别" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-tree-select
              style="width:80%;"
              @change="cat_change"
              :disabled="!!formData.stock_list.length"
              showSearch
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="cat_list"
              placeholder="请选择采购类别"
              treeNodeFilterProp="title"
              dropdownMatchSelectWidth
              v-decorator="[
              'cat_id',
              {
                rules: [{ required: true, message: '请选择采购类别' }],
                initialValue:formData.cat_id 
              }
            ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="预计配送时间" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <a-input
              style="width:68px;margin-right:5px;"
              placeholder="请输入"
              v-decorator="[
              'shipping_days',
              {
                rules: [{ required: true, message: '请输入预计配送时间' }],
                initialValue:formData.shipping_days
              }
            ]"
            />天
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="预估采购金额" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
            <a-input
              style="width:100px;margin-right:5px;"
              placeholder="请输入"
              v-decorator="[
              'expert_money',
              {
                rules: [{ required: true, message: '请输入预估采购金额' }],
                initialValue:formData.expert_money
              }
            ]"
            />元
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-button type="primary" @click="add_stock">添加商品</a-button>
        </a-col>
      </a-row>
      <a-table
        class="mt"
        bordered
        :columns="columns_stock_list"
        :dataSource="formData.stock_list"
        rowKey="stock_id"
        :pagination="pagination_shipping"
      >
        <template v-for="(item,index2) of formData.area_list" :slot="item.area_key" slot-scope="text,record">
          <a-input :key='index2' 
            :value="record.area_stock_number[index2].number"
            @change="e => handleChange(e.target.value, index2, record.stock_id)"
          ></a-input>
        </template>
        <template slot="operation" slot-scope="text,record">
          <a @click="del(record.stock_id)">删除</a>
        </template>
      </a-table>
    </section>
    <a-modal
      width="80%"
      title="添加商品"
      :visible="ModalVisible"
      @ok="()=>this.setModalVisible(false)"
      @cancel="()=>this.setModalVisible(false)"
      :footer='null'
    >
      供应大类：
      <a-tree-select
        disabled
        style="width:15%;"
        class="ml mr"
        v-model="formData.cat_id "
        showSearch
        allowClear
        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
        :treeData="cat_list"
        placeholder="请选择大类"
        treeNodeFilterProp="title"
        dropdownMatchSelectWidth
      />供应小类：
      <a-tree-select
        style="width:15%;"
        class="ml mr"
        @change="sub_cat_change"
        v-model="sub_cat_id"
        showSearch
        allowClear
        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
        :treeData="sub_cat_list"
        placeholder="请选择小类"
        treeNodeFilterProp="title"
        dropdownMatchSelectWidth
      />
      <a-input placeholder="模糊查询：编号/名称/简称" @keyup.13="get_stock_by_con_method" style="width:20%;" class="ml mr pl" v-model="kw_code"></a-input>
      <a-button type="primary" @click="get_stock_by_con_method">搜索</a-button>
      <a-table
        class="mt"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :dataSource="stock_data"
        rowKey="stock_id"
        :customRow="rowClick"
        :pagination="false"
      >
        <!-- <template slot="brand_name" slot-scope="text">
          <span>{{text}}</span>
        </template> -->
      </a-table>
      <a-pagination
        style='text-align:center'
        class="mt"
        showQuickJumper
        :total="+total_count"
        @change="paginationChange"
      />
    </a-modal>
    <a-modal
      width="40%"
      title="配送区域"
      :visible="ModalVisibleArea"
      @ok="ModalVisibleArea = false"
      @cancel="ModalVisibleArea = false"
      :footer='null'
    >
    <div class="text-center">
      <a-input placeholder="模糊查询：公司名称" @keyup.13="get_all_shipping_region" style="width:40%;" class="pl mr-10" v-model="keyword"></a-input>
      <a-button type="primary" @click="get_all_shipping_region">搜索</a-button>
    </div>
      <a-table
        class="mt"
        :rowSelection="{
          selectedRowKeys: shipping_selectedRowKeys,
          onChange: shipping_selectChange,
        }"
        :columns="columns_area2"
        :dataSource="all_shipping_region"
        rowKey="id"
        :customRow="shipping_row_click"
        :pagination="pagination_shipping"
      >
      </a-table>
    </a-modal>
  </a-form>
</template>

<script>
import {
  get_user_com_list, // 获取当前账户有效公司列表
  // get_com_price_region, // 获取公司价格执行区域列表
  // get_shipping_region, // 获取公司价格配送区域列表
  get_all_shipping_region // 获取全部公司价格配送区域列表
} from "@common/js/comUsedApi";
import { 
  all_category,  // 大类列表
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  get_stock_by_con, // 商品列表
} from "@admin/api/enquiry";
import {
  save_bid, // 保存
  get_bid_info // 获取详情
} from "@admin/api/bids";

var columns = [
  {
    title: "编号",
    dataIndex: "stock_code",
    width: "10%"
  },
  {
    title: "商品名称",
    dataIndex: "stock_name",
    width: "14%"
  },
  {
    title: "品牌",
    dataIndex: "brand_name",
    width: "11%"
  },
  {
    title: "大类",
    dataIndex: "parent_type_name",
    width: "11%"
  },
  {
    title: "小类",
    dataIndex: "type_name",
    width: "11%"
  },
  {
    title: "单位",
    dataIndex: "price_unit_name",
    width: "11%"
  },
  {
    title: "规格",
    dataIndex: "standard",
    width: "11%"
  },
  {
    title: "产品参数",
    dataIndex: "note",
    width: "11%"
  }
];
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 }
      },
      code:'',
      formData: {
        id: "",
        title: "", //标题
        custom_code: "", //项目编号
        com_id: "", // 公司id
        com_code:'',
        com_name:'',
        shipping_days: "", //配送时间
        bid_type:"", // 采购方式
        bid_type_name:'',
        status: "", //项目单状态
        cat_id: "", //大类ID
        cat_name:'',
        region_id: "", //价格区域ID
        region_name:'',
        area_list:[], // 区域列表
        contact_name: "", // 联系人
        contact_number: "", // 联系方式
        stock_list: [],
      },
      columns_stock_list:[
        {
          title:'序号',
          customRender:(text,record,index)=>`${index+1}`,
          align:'center',
          width:'6%'
        },
        {
          title:'商品名称',
          dataIndex:'stock_name',
          width:'10%'
        },
        {
          title:'品牌',
          dataIndex:'brand_name',
          // scopedSlots:{ customRender:'brand_name' },
          width:'6%'
        },
        {
          title:'规格',
          dataIndex:'standard',
          width:'6%'
        },
        {
          title:'产品参数',
          dataIndex:'note',
          width:'6%'
        },
        {
          title:'采购单位',
          dataIndex:'price_unit_name',
          width:'6%'
        },
        {
          title:'预估采购数量',
          children: [],
          width:'65%'
        },
        {
          title:'操作',
          scopedSlots:{ customRender:'operation' },
          width:'6%'
        }
      ],
      user_com_list: [], // 用户公司列表
      bid_type_list: [], // 采购方式列表
      // region_area: "", // 配送区域
      columns_area:[
        {
          title:'序号',
          customRender:(text,record,index)=>`${index+1}`,
          align:'center',
          width:'6%'
        },
        {
          title:'片区名称',
          dataIndex:'area_name',
          scopedSlots:{ customRender:'area_name' },
          width:'10%'
        },
        {
          title:'配送区域',
          dataIndex:'region_list',
          scopedSlots:{ customRender:'region_list' },
          width:'10%'
        },
        {
          title:'操作',
          scopedSlots:{ customRender:'operation' },
          width:'10%'
        }
      ], // 分区table列数组
      ModalVisibleArea:false,
      com_id:'',
      keyword:'',
      region_list_index:'',
      all_shipping_region:[], // 全部公司价格配送区域
      all_shipping_region_copy:[],
      pagination_shipping:{
        showSizeChanger:true,
        showQuickJumper:true,
        pageSizeOptions:['10', '20', '30', '40'],
      },
      columns_area2:[
        {
          title:'ID',
          dataIndex:'id',
          width:'30%'
        },
        {
          title:'公司名称',
          dataIndex:'name',
          width:'80%'
        }
      ], // 分区table列数组
      shipping_selectedRowKeys:[], // 区域已选择列表
      // disabledKeys:["1", "42", "94", "97", "98"],
      // com_price_region: [], // 价格执行区域
      all_rule_type: [], // 成交规则
      cat_list: [], // 大类列表
      sub_cat_list: [], // 小类列表
      cat_id: "", // 大类id
      sub_cat_id: "", // 小类id
      kw_code: "", // 关键字
      page: 1,
      stock_data:[],
      total_count:'',
      columns,
      ModalVisible: false,
      selectedRowKeys: [],
      area_index:1
    };
  },
  props:{
    father:{
      type:Object
    }
  },
  created() {
    this.father.selectedKeys = ['/Bid/bid_list'];
    this.code = this.$route.query.code;
    var id = this.$route.query.id;
    id && this.get_bid_info_method(id);
    this.get_tree_data();
  },
  methods: {
    get_bid_info_method(id) { // 修改项目时获取信息
      get_bid_info(id)
        .then(res => {
          // get_com_price_region(res.data.com_id).then(res2 => {
          //   var data = res2.data || [];
          //   this.com_price_region = this.$common.treeSelectFormat(data);
          // }).catch();
          // var list = res.data.shipping_region_list;
          // var region_area='';
          // list.forEach(elem => {
          //   region_area +=elem.name+'，';
          // });
          // this.region_area = region_area.slice(0,-1);
          this.com_id = res.data.com_id;
          this.get_all_shipping_region()
          var formData = res.data||[];
          var shipping_selectedRowKeys=[];
          formData.area_list.forEach(elem=>{
            elem.region_list.forEach(elem2=>{
              shipping_selectedRowKeys.push(elem2.id)
            })
          })
          this.shipping_selectedRowKeys=shipping_selectedRowKeys;
          // formData.stock_list.forEach(elem=>{
          //   elem.is_exam = +elem.is_exam;
          // })
          this.columns_stock_list[6].children = [];
          formData.area_list.forEach(elem=>{
            this.columns_stock_list[6].children.push({
              title:elem.area_name,
              dataIndex:elem.area_key,
              align:'center',
              scopedSlots:{ customRender:elem.area_key },
              width:'6%'
            })
          })
          /* 插入合计列 */
          if(formData.area_list.length>1){
            this.columns_stock_list[6].children.push({
              title:'合计数量',
              align:'center',
              dataIndex:'number',
              width:'6%'
            })
          }
          formData.stock_list.forEach(elem=>{
            this.selectedRowKeys.push(elem.stock_id)
          })
          this.formData = formData;
        })
        .catch(error => {
          this.$message.error(error)
        });
    },
    get_tree_data() { // 获取公司列表，大类列表，类型列表
      get_user_com_list()
        .then(res => {
          this.user_com_list = this.$common.treeSelectFormat(res.data);
        })
        .catch();
      all_category()
        .then(res => {
          this.cat_list = this.$common.treeSelectFormat(res.data);
        })
        .catch();
      get_bid_type()
        .then(res => {
          this.bid_type_list = this.$common.treeSelectFormat(res.data);
        })
        .catch();
      
    },
    vali_mobile(rule, value, callback) { // 验证手机号
      if (value && !/^1[3456789]\d{9}$/.test(value)) {
        this.yzm_disabled = !0;
        callback("请填入正确格式的手机号码"); // 校验未通过
      } else {
        this.yzm_disabled = false;
        callback(); // 校验未通过
      }
    },
    comChange(e){
      this.formData.area_list = [];
      this.com_id = e;
      this.get_all_shipping_region();
      // this.region_area = "";
      // this.com_price_region =[];
      // this.form.setFieldsValue({ ["region_id"]: '' });
      // get_com_price_region(e).then(res => {
      //   var data = res.data || [];
      //   this.com_price_region = this.$common.treeSelectFormat(data);
      // }).catch();
    },
    get_all_shipping_region(){
      var keyword = this.keyword;
      var com_id = this.com_id;
      get_all_shipping_region({com_id,keyword})
        .then(res => {
          if(this.region_list_index!==''){
            var other_region_list = [];
            this.formData.area_list.forEach((elem,i)=>{
              if(this.region_list_index==i)return;
              other_region_list = [...other_region_list,...elem.region_list];
            })
            let all_shipping_region = res.data||[];
            var arr2 = all_shipping_region.uniqueObj(other_region_list,'id');
            this.all_shipping_region = arr2;
            this.all_shipping_region_copy = JSON.parse(JSON.stringify(res.data));
            this.ModalVisibleArea = true;
          }else{
            this.all_shipping_region = res.data||[];
            this.all_shipping_region_copy = JSON.parse(JSON.stringify(res.data));
          }
        })
        .catch();
    },
    /* areaChange(e) {
      get_shipping_region(e).then(res => {
        let result = res.data||[];
        let region_area = "";
        result.forEach(elem => {
          region_area += elem.name + "，";
        });
        this.region_area = region_area.slice(0, -1);
      });
    }, */
    add_line(){
      if(!this.form.getFieldsValue(['com_id']).com_id){
        this.$message.warn('请先选择采购单位');
        return;
      }
      if(this.formData.area_list.some(elem => elem.area_name==='')){
        this.$message.warn('请输入片区名称');
        return;
      }
      var time = new Date().Format("YYYYMMDDhhmmssS")+this.$common.getUnix(parseInt(Math.random()*1000));
      this.formData.area_list.push({
        area_key:time,
        area_name:`片区${this.area_index}`,
        region_list:[]
      })
      this.area_index++;

      var data = [...this.formData.stock_list];
      data.forEach(elem => {
        var area_stock_number = [];
        this.formData.area_list.forEach((elem2,index2)=>{
          area_stock_number.push({
            area_key:elem2.area_key,
            number:elem.area_stock_number[index2]?elem.area_stock_number[index2].number:''  
          })
        })
        elem.area_stock_number = area_stock_number;
      });
      this.formData.stock_list = data;
      
      this.columns_stock_list[6].children = [];
      this.formData.area_list.forEach(elem=>{
        this.columns_stock_list[6].children.push({
          title:elem.area_name,
          dataIndex:elem.area_key,
          align:'center',
          scopedSlots:{ customRender:elem.area_key },
          width:'6%'
        })
      })
      /* 插入合计列 */
      if(this.formData.area_list.length>1){
        this.columns_stock_list[6].children.push({
          title:'合计数量',
          align:'center',
          dataIndex:'number',
          width:'6%'
        })
      }
    },
    add_area(index){
      // var other_region_list = [];
      // this.formData.area_list.forEach((elem,i)=>{
      //   if(index==i)return;
      //   other_region_list = [...other_region_list,...elem.region_list];
      // })
      // let all_shipping_region_copy = JSON.parse(JSON.stringify(this.all_shipping_region_copy));
      // var arr2 = all_shipping_region_copy.uniqueObj(other_region_list,'id');
      // this.all_shipping_region = arr2;
      this.region_list_index = index;
      this.get_all_shipping_region();
      // this.ModalVisibleArea = true;
    },
    del_line(index){
      this.formData.area_list[index].region_list.forEach(elem=>{
        this.shipping_selectedRowKeys.remove(elem.id)
      })
      this.formData.area_list.splice(index,1);

      var data = [...this.formData.stock_list];
      data.forEach(elem => {
        var area_stock_number = [];
        this.formData.area_list.forEach((elem2,index2)=>{
          let indexOfObj = elem.area_stock_number.indexOfObj('area_key',elem2.area_key);
          if(indexOfObj!=-1){
            area_stock_number.push({
              area_key:elem2.area_key,
              number: elem.area_stock_number[indexOfObj]?elem.area_stock_number[indexOfObj].number:''
            })
          }
        })
        elem.area_stock_number = area_stock_number;
      });
      this.formData.stock_list = data;
      this.columns_stock_list[6].children = [];
      this.formData.area_list.forEach(elem=>{
        this.columns_stock_list[6].children.push({
          title:elem.area_name,
          dataIndex:elem.area_key,
          align:'center',
          scopedSlots:{ customRender:elem.area_key },
          width:'6%'
        })
      })
      /* 插入合计列 */
      if(this.formData.area_list.length>1){
        this.columns_stock_list[6].children.push({
          title:'合计数量',
          align:'center',
          dataIndex:'number',
          width:'6%'
        })
      }
      this.formData.stock_list.forEach(elem=>{
        elem.number = elem.area_stock_number.reduce((priv,elem)=>{
          return priv+= +elem.number;
        },0)
      })
    },
    area_name_change(){
      this.columns_stock_list[6].children = [];
      this.formData.area_list.forEach(elem=>{
        this.columns_stock_list[6].children.push({
          title:elem.area_name,
          dataIndex:elem.area_key,
          align:'center',
          scopedSlots:{ customRender:elem.area_key },
          width:'6%'
        })
      })
      /* 插入合计列 */
      if(this.formData.area_list.length>1){
        this.columns_stock_list[6].children.push({
          title:'合计数量',
          align:'center',
          dataIndex:'number',
          width:'6%'
        })
      }
    },
    shipping_row_click(record, index) {
      return {
        on: {
          click: () => {
            if (this.shipping_selectedRowKeys.indexOf(record.id) == -1) {
              this.shipping_selectedRowKeys.push(record.id);
              this.formData.area_list[this.region_list_index].region_list.push(record)
            } else {
              this.shipping_selectedRowKeys.remove(record.id);
              this.formData.area_list[this.region_list_index].region_list.removeObj('id',record.id)
            }
          }
        }
      };
    },
    shipping_selectChange(shipping_selectedRowKeys,selectedRows) {
      this.shipping_selectedRowKeys = shipping_selectedRowKeys;
      var data = [...this.formData.area_list[this.region_list_index].region_list,...selectedRows]
      var region_list = this.shipping_selectedRowKeys.merge(data,'id');
      this.formData.area_list[this.region_list_index].region_list = region_list;
    },
    // shippingGetCheckboxProps(record){
    //   var self = this;
    //   return{
    //     props: {
    //       disabled: self.disabledKeys.indexOf(record.id)!=-1
    //     },
    //   }
    // },
    cat_change(e) {
      this.formData.cat_id  = e;
      this.sub_cat_id = "";
      this.kw_code = "";
      this.page = 1;
      all_category(e).then(res => {
        var data = res.data||[];
        this.sub_cat_list = [...[{value:'0',title:'全部'}],...this.$common.treeSelectFormat(data)];
      });
      
    },
    sub_cat_change(e) {
      this.sub_cat_id = e;
      this.page = 1;
      this.get_stock_by_con_method();
    },
    get_stock_by_con_method() { // 获取商品
      var data = {
        com_id:this.form.getFieldsValue(['com_id']).com_id,
        page: this.page,
        cat_id: this.formData.cat_id,
        sub_cat_id: this.sub_cat_id,
        kw_code: this.kw_code
      };
      get_stock_by_con(data)
        .then(res => {
          this.stock_data = res.data.list||[];
          this.total_count = res.data.total_count;
        })
        .catch();
    },
    add_stock() { // 打开商品列表弹窗
      if(!this.form.getFieldsValue(['com_id']).com_id){
        this.$message.warn('请先选择采购单位');
        return;
      }
      if(JSON.stringify(this.formData.area_list)==='[]'){
        this.$message.warn('请添加片区')
        return;
      }
      if(this.formData.area_list.some(elem=>elem.region_list.length==0)){
        this.$message.warn('请选择配送区域')
        return;
      }
      if(!this.form.getFieldsValue(['cat_id']).cat_id){
        this.$message.warn('请先选择大类');
        return;
      }
      all_category(this.formData.cat_id).then(res => {
        var data = res.data||[];
        this.sub_cat_list = [...[{value:'0',title:'全部'}],...this.$common.treeSelectFormat(data)];
      });
      this.get_stock_by_con_method();
      var stock_list = this.formData.stock_list;
      // this.formData.stock_list.forEach(elem=>this.selectedRowKeys.push(elem.stock_id));
      this.ModalVisible = true;
    },
    setModalVisible(ModalVisible) {
      this.ModalVisible = ModalVisible;
    },
    paginationChange(page) {
      this.page = page;
      this.get_stock_by_con_method();
    },
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            var data = [...this.formData.stock_list];
            if (this.selectedRowKeys.indexOf(record.stock_id) == -1) {
              this.selectedRowKeys.push(record.stock_id);
              data.push(record);
            } else {
              this.selectedRowKeys.remove(record.stock_id);
            }
            var list = this.selectedRowKeys.merge(data, "stock_id");
            list.forEach(elem => {
              var number = 0;
              var area_stock_number = [];
              this.formData.area_list.forEach((elem2,index2)=>{
                area_stock_number.push({
                  area_key:elem2.area_key,
                  number:elem.area_stock_number&&elem.area_stock_number.length>index2?elem.area_stock_number[index2].number:''  
                })
                if(elem.area_stock_number&&elem.area_stock_number.length>index2){
                  number+=Number(elem.area_stock_number[index2].number)
                }
              })
              elem.number = number;
              elem.area_stock_number = area_stock_number;
            });
            this.formData.stock_list = list;
          }
        }
      };
    },
    onSelectChange(selectedRowKeys,selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      var data = [...this.formData.stock_list,...selectedRows]
      var list = this.selectedRowKeys.merge(data,'stock_id');
      list.forEach(elem => {
        var number = 0;
        var area_stock_number = [];
        this.formData.area_list.forEach((elem2,index2)=>{
          area_stock_number.push({
            area_key:elem2.area_key,
            number:elem.area_stock_number&&elem.area_stock_number.length>index2?elem.area_stock_number[index2].number:''  
          })
          if(elem.area_stock_number&&elem.area_stock_number.length>index2){
            number+=Number(elem.area_stock_number[index2].number)
          }
        })
        elem.number = number;
        elem.area_stock_number = area_stock_number;
      });
      this.formData.stock_list = list;
    },
    handleChange(value, index2, stock_id) {
              /*  值   片区下标  商品下标 商品id */
      var new_stock_list = [...this.formData.stock_list];
      var index = new_stock_list.indexOfObj('stock_id',stock_id)
      new_stock_list[index].area_stock_number[index2].number = value;
      new_stock_list[index].number = new_stock_list[index].area_stock_number.reduce((priv,elem)=>{
        return priv+= +elem.number;
      },0)
      this.formData.stock_list = new_stock_list;
    },
    del(stock_id) {
      this.selectedRowKeys = this.selectedRowKeys.filter(
        item => item !== stock_id
      );
      this.formData.stock_list = this.formData.stock_list.filter(
        item => item.stock_id !== stock_id
      );
    },
    submit(e){ // 提交
      var values = {
        stock_list : this.formData.stock_list
      }
      var self = this;
      this.$confirm({
        title: '确认提交此招标项目？',
        onOk() {
          self.handleSubmit(e,2);
        },
        onCancel() {},
      });
    },
    handleSubmit(e,submitKey) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue
          };
          if (!this.formData.stock_list.length) {
            this.$message.warn("请添加商品");
            return;
          } else {
            // let stock_list = this.formData.stock_list;
            // let key = false;
            // stock_list.forEach(elem => {
            //   if (!elem.number) {
            //     key = true;
            //   }
            // });
            // if (key) {
            //   this.$message.warn("商品数量不能为空");
            //   return;
            // }
            values.stock_list = this.formData.stock_list;
            values.area_list = this.formData.area_list;
            values.status = submitKey||1;
            values.id = this.formData.id;
          }
          save_bid(values)
            .then(res => {
              this.$message.success(res.msg);
              let time = setTimeout(()=>{
                this.$router.push({ name: "/Bid/bid_list" });
                clearTimeout(time)
              },1500)
              return new Promise((resolve,reject)=>{
                resolve(res);
              })
            })
            .catch(error => {
              this.$message.error(error);
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#bids{
  @include component;
}
</style>
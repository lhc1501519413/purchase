<template>
  <a-form id="baseInfo" :form="form" @submit="handleSubmit">
    <h4>基本信息</h4>
    <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="9">
        <a-form-item label="供应商名称" v-bind="formItemLayout">
          <a-input
            disabled
            v-decorator="[
          'supply_name',
          { initialValue:formData.supply_name }
        ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item label="供应商简称" v-bind="formItemLayout">
          <a-input
            placeholder="请输入供应商简称"
            v-decorator="[
          'simple_name',
          { initialValue:formData.simple_name }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="3"></a-col>
    </a-row>
    <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="9">
        <a-form-item label="邮编" v-bind="formItemLayout">
          <a-input
            placeholder="请输入邮编"
            v-decorator="[
          'postcode',
          { rules: [{ required: true, message: '请输入邮编' },{validator:(rule, value, callback) => this.vali_postcode(rule, value, callback)}],initialValue:formData.postcode }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item label="详细地址" v-bind="formItemLayout">
          <a-input
            placeholder="请输入详细地址"
            v-decorator="[
          'address',
          { rules: [{ required: true, message: '请输入详细地址' }],initialValue:formData.address }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="3"></a-col>
    </a-row>
    <h4>供应商分类</h4>
    <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="9">
        <a-form-item label="企业类型" v-bind="formItemLayout">
          <a-tree-select
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="biz_type"
            placeholder="请选择企业类型"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'biz_type_id',
          { rules: [{ required: true, message: '请选择企业类型' }],initialValue:formData.biz_type_id, }
        ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <!-- <a-form-item label="供应商类型" v-bind="formItemLayout">
          <a-tree-select
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="supply_type"
            placeholder="请选择供应商类型"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'supply_type_id',
          { rules: [{ required: true, message: '请选择供应商类型' }],initialValue:formData.supply_type_id, }
        ]"
          />
        </a-form-item> -->
        <a-form-item label="供应类别" v-bind="formItemLayout" help="请选择真实的供应类别，供应类别和招标项目相关">
          <!-- <a-tree-select
            :treeCheckable="true"
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="category"
            placeholder="请选择供应类别"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'cat_ids',
          { rules: [{ required: true, message: '请选择供应类别' }],initialValue:formData.cat_ids, }
        ]"
          /> -->
          <a-tree-select
            allowClear
            multiple
            treeDefaultExpandAll
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            dropdownMatchSelectWidth
            treeNodeLabelProp="label"
            :treeData="category"
            @change="onChange"
            placeholder="请选择供应类别"
            v-decorator="[
              'cat_ids',
              { rules: [{ required: true, message: '请选择供应类别' }],initialValue:formData.cat_ids }
            ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="3"></a-col>
    </a-row>
    <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="9">
        <a-form-item label="企业性质" v-bind="formItemLayout">
          <a-tree-select
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="biz_nature"
            placeholder="请选择企业性质"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'biz_nature_id',
          { rules: [{ required: true, message: '请选择企业性质' }],initialValue:formData.biz_nature_id, }
        ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item label="企业规模" v-bind="formItemLayout">
          <a-tree-select
            showSearch
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="biz_scale"
            placeholder="请选择企业规模"
            treeNodeFilterProp="title"
            dropdownMatchSelectWidth
            v-decorator="[
          'biz_scale_id',
          { rules: [{ required: true, message: '请选择企业规模' }],initialValue:formData.biz_scale_id, }
        ]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="3" style="height:40px;line-height:40px;">
        <span @click="visible = true" style="color:#3177fd;margin-left:10px;" class="pointer">查看参考标准</span>
      </a-col>
    </a-row>
    <h4>个人信息</h4>
    <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="9">
        <a-form-item label="姓名" v-bind="formItemLayout">
          <a-input
            placeholder="请输入姓名"
            v-decorator="[
          'real_name',
          { rules: [{ required: true, message: '请输入姓名' }],initialValue:formData.realname }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item label="账号名" v-bind="formItemLayout">
          <a-input
            disabled
            placeholder="请输入账号名"
            v-model='formData.username'
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="3"></a-col>
    </a-row>
    <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="9">
        <a-form-item label="对外联系号码" v-bind="formItemLayout">
          <a-input
            placeholder="请输入对外联系号码"
            v-decorator="[
          'out_contact',
          { rules: [{ required: true, message: '请输入对外联系号码' },{validator:(rule, value, callback) => this.vali_mobile(rule, value, callback)}],initialValue:formData.out_contact }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-tooltip placement="right" class="tooltip">
          <template slot="title">
            <span>对外联系电话将用于公示，请谨慎填写个人手机号码等非对外联系电话，以避免个人信息泄露。</span>
          </template>
          <span><svg-icon icon-class="help"/></span>
        </a-tooltip>
      </a-col>
      <a-col :span="3"></a-col>
    </a-row>
    <footer>
      <a-form-item>
        <a-button type="primary" class="margin-left" html-type="submit">下一步</a-button>
      </a-form-item>
    </footer>
    <a-modal centered :visible="visible" @cancel="visible = false" :footer="null" :width="980">
      <template slot="title">
        <div align="center">
          <svg-icon class="svg" icon-class="attention" />
          <h3>查看参考标准</h3>
        </div>
      </template>
      <p>一）农、林、牧、渔业。营业收入20000万元以下的为中小微型企业。其中，营业收入500万元及以上的为中型企业，营业收入50万元及以上的为小型企业， 营业收入50万元以下的为微型企业。</p>
      <p>二）工业。从业人员1000人以下或营业收入40000万元以下的为中小微型企业。其中，从业人员300人及以上，且营业收入2000万元及以上的为中型企业； 从业人员20人及以上，且营业收入300万元及以上的为小型企业；从业人员20人以下或营业收入300万元以下的为微型企业。</p>
      <p>三）建筑业。营业收入80000万元以下或资产总额80000万元以下的为中小微型企业。其中，营业收入6000万元及以上，且资产总额5000万元及以上的为中型企业； 营业收入300万元及以上，且资产总额300万元及以上的为小型企业；营业收入300万元以下或资产总额300万元以下的为微型企业。</p>
      <p>四）批发业。从业人员200人以下或营业收入40000万元以下的为中小微型企业。其中，从业人员20人及以上，且营业收入5000万元及以上的为中型企业； 从业人员5人及以上，且营业收入1000万元及以上的为小型企业；从业人员5人以下或营业收入1000万元以下的为微型企业。</p>
      <p>五）零售业。从业人员300人以下或营业收入20000万元以下的为中小微型企业。其中，从业人员50人及以上，且营业收入500万元及以上的为中型企业； 从业人员10人及以上，且营业收入100万元及以上的为小型企业；从业人员10人以下或营业收入100万元以下的为微型企业。</p>
      <p>六）交通运输业。从业人员1000人以下或营业收入30000万元以下的为中小微型企业。其中，从业人员300人及以上，且营业收入3000万元及以上的为中型企业； 从业人员20人及以上，且营业收入200万元及以上的为小型企业；从业人员20人以下或营业收入200万元以下的为微型企业。</p>
      <p>七）仓储业。从业人员200人以下或营业收入30000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入1000万元及以上的为中型企业； 从业人员20人及以上，且营业收入100万元及以上的为小型企业；从业人员20人以下或营业收入100万元以下的为微型企业。</p>
      <p>八）邮政业。从业人员1000人以下或营业收入30000万元以下的为中小微型企业。其中，从业人员300人及以上，且营业收入2000万元及以上的为中型企业； 从业人员20人及以上，且营业收入100万元及以上的为小型企业；从业人员20人以下或营业收入100万元以下的为微型企业</p>
      <p>九）住宿业。从业人员300人以下或营业收入10000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入2000万元及以上的为中型企业； 从业人员10人及以上，且营业收入100万元及以上的为小型企业；从业人员10人以下或营业收入100万元以下的为微型企业。</p>
      <p>十）餐饮业。从业人员300人以下或营业收入10000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入2000万元及以上的为中型企业； 从业人员10人及以上，且营业收入100万元及以上的为小型企业；从业人员10人以下或营业收入100万元以下的为微型企业。</p>
      <p>十一）信息传输业。从业人员2000人以下或营业收入100000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入1000万元及以上的为中型企业； 从业人员10人及以上，且营业收入100万元及以上的为小型企业；从业人员10人以下或营业收入100万元以下的为微型企业。</p>
      <p>十二）软件和信息技术服务业。从业人员300人以下或营业收入10000万元以下的为中小微型企业。其中，从业人员100人及以上，且营业收入1000万元及以上的为中型企业； 从业人员10人及以上，且营业收入50万元及以上的为小型企业；从业人员10人以下或营业收入50万元以下的为微型企业。</p>
      <p>十三）房地产开发经营。营业收入200000万元以下或资产总额10000万元以下的为中小微型企业。其中，营业收入1000万元及以上， 且资产总额5000万元及以上的为中型企业；营业收入100万元及以上，且资产总额2000万元及以上的为小型企业； 营业收入100万元以下或资产总额2000万元以下的为微型企业。</p>
      <p>十四）物业管理。从业人员1000人以下或营业收入5000万元以下的为中小微型企业。其中，从业人员300人及以上，且营业收入1000万元及以上的为中型企业； 从业人员100人及以上，且营业收入500万元及以上的为小型企业；从业人员100人以下或营业收入500万元以下的为微型企业。</p>
      <p>十五）租赁和商务服务业。从业人员300人以下或资产总额120000万元以下的为中小微型企业。其中，从业人员100人及以上，且资产总额8000万元及以上的为中型企业； 从业人员10人及以上，且资产总额100万元及以上的为小型企业；从业人员10人以下或资产总额100万元以下的为微型企业。</p>
      <a-button type="primary" style="margin:1rem 0 0 48%;" @click="visible = false">确定</a-button>
    </a-modal>
  </a-form>
</template>

<script>
import {
  all_biz_type,
  // all_supply_type,
  all_category,
  all_biz_nature,
  all_biz_scale
} from "@common/js/apis.js";
import { save_base_info,get_base_info} from '@indexApi/user';
export default {
  data() {
    return {
      icon_point: require("@indexAssets/images/icon_point.png"),
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 }
      },
      formData: {
        name: '',
        simple_name: '',
        postcode: '',
        address: '',
        biz_type_id: '',
        // supply_type_id: '',
        cat_ids: [],
        biz_nature_id: '',
        biz_scale_id: '',
        realname: '',
        username: '',
        contact_phone: ''
      },
      biz_type: [],
      // supply_type: [],
      value: [],
      category: [],
      biz_nature: [],
      biz_scale: [],
      visible: false
    };
  },
  props: ["father"],
  created() {
    this.father.current = 1;
    this.get_tree_datas().then(()=>{
      this.base_info();
    });
  },
  methods: {
    vali_mobile(rule, value, callback) {
      if (value && /^1[3456789]\d{9}$/.test(value)) {
        this.yzm_disabled = false;
        callback(); // 校验通过
      } else if(value && !/^1[3456789]\d{9}$/.test(value)) {
        this.yzm_disabled = true;
        callback("请填入正确格式的手机号码"); // 校验未通过
      }else{
        callback(); // 校验未通过
      }
    },
    vali_postcode(rule, value, callback) {
      if (value && !/^\d{6}$/.test(value)) {
        callback("请填入正确格式的邮政编码"); // 校验未通过
      } else {
        callback(); // 校验通过
      }
    },
    get_tree_datas() {
      // 企业类型
      all_biz_type()
        .then(res => {
          this.biz_type = this.$common.treeSelectFormat(res.data);
        })
        .catch(error => {
          this.$message.warn(error)
        });
        // 供应商类型
      // all_supply_type()
      //   .then(res => {
      //     this.supply_type = this.$common.treeSelectFormat(res.data);
      //   })
      //   .catch(error => {
      //     this.$message.warn(error)
      //   });
        // 分类
      all_category()
        .then(res => {
          this.category = this.$common.treeSelectFormat(res.data);
          this.add_child(this.category)
        })
        .catch(error => {
          this.$message.warn(error)
        });
        // 企业性质
      all_biz_nature()
        .then(res => {
          this.biz_nature = this.$common.treeSelectFormat(res.data);
        })
        .catch(error => {
          this.$message.warn(error)
        });
        // 企业规模
      all_biz_scale()
        .then(res => {
          this.biz_scale = this.$common.treeSelectFormat(res.data);
        })
        .catch(error => {
          this.$message.warn(error)
        });
        return new Promise((resolve,reject)=>{
          resolve()
        })
    },
    base_info(){
      get_base_info().then(res=>{
        let result = {};
        result.extend(res.data.base_info)
        result.extend(res.data.extend_info)
        let cat_ids = res.data.extend_info.cat_ids;
        cat_ids.forEach(elem=>{
          let index = this.category.indexOfObj('value',elem.slice(0,-2));
          this.category[index].children.forEach(elem2=>{
            if(elem2.value!==elem)elem2.disabled = true;
          })
        })
        this.formData = result;
      })
    },
    prev() {
      this.$router.push({ path: "/register/reg" });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            cat_ids:fieldsValue['cat_ids'].join(","),
          }
          save_base_info(values)
            .then(res => {
              this.$message.success('信息完善成功')
              let time = setTimeout(()=>{
                this.$router.push({path:'/register/dataComplete'})
                clearTimeout(time)
              },1000)
            })
            .catch(error => {
              this.$message.warn(error)
            });
        }
      });
    },
    onChange(value) {
      this.category.forEach(elem=>{
        elem.children.forEach(elem2=>{
          elem2.disabled=false;
        })
      })
      this.value = value;
      value.forEach(elem=>{
        let index = this.category.indexOfObj('value',elem.slice(0,-2));
        this.category[index].children.forEach(elem2=>{
          if(elem2.value!==elem)elem2.disabled = true;
        })
      })
    },
    add_child(list){
      list.forEach(elem=>{
        elem.selectable = false;
        elem.disableCheckbox = false;
        elem.children = [
          {
            value:elem.value+'-1',
            title:'生产商',
            label:elem.title+'-生产商',
          },
          {
            value:elem.value+'-2',
            title:'经销商',
            label:elem.title+'-经销商',
          },
        ]
      })
      this.category = list;
    }
  }
};
</script>

<style lang='scss' scoped>
#baseInfo {
  width: 100%;
  margin: 0 auto;
  h4 {
    width: 80%;
    border-left: 3px solid $primary2;
    margin: 1rem auto;
    padding-left: 1rem;
  }
  .ant-form-item {
    .ant-input {
      padding-left: 8px;
    }
  }
  .tooltip{
    display: inline-block;
    margin: 10px;      
  }
  footer {
    @extend .text-center;
    padding: 1rem 0 2rem;
    .ant-form-item {
      margin-bottom: 0;
      .prev {
        border: 1px solid $primary2;
        background: none;
        color: $primary2;
      }
      .next {
        border: none;
        color: #fff;
        background-color: $primary2;
      }
    }
  }
}
.ant-modal{
  .svg{
    width: 2rem;
    height: 2rem;
    margin:1rem 0;
  }
  .ant-modal-body {
    padding: 32px 32px 24px;
    p{
      margin: 5px 0;
    }
  }
}
</style>
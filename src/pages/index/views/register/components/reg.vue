<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-row>
      <a-col :span="5"></a-col>
      <a-col :span="12">
        <a-form-item label="机构名称" v-bind="formItemLayout">
          <a-input
            placeholder="请输入机构名称全称"
            v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入机构名称' }] }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="7"></a-col>
    </a-row>
    <a-row>
      <a-col :span="5"></a-col>
      <a-col :span="12">
        <a-form-item label="账号" v-bind="formItemLayout">
          <a-input
            placeholder="请输入账号"
            v-decorator="[
          'admin_name',
          { rules: [{ required: true,message: '请输入账号' },{validator:(rule, value, callback) => this.admin_name_rules(rule, value, callback)}] }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="7"></a-col>
    </a-row>
    <a-row>
      <a-col :span="5"></a-col>
      <a-col :span="12">
        <a-form-item label="手机号码" v-bind="formItemLayout">
          <a-input
            placeholder="请输入手机号码"
            v-decorator="[
          'mobile',
          { rules: [{ required: true, message: '请输入手机号码'},{validator:(rule, value, callback) => this.vali_mobile(rule, value, callback)}] }
        ]"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="7"></a-col>
    </a-row>
    <a-row>
      <a-col :span="5"></a-col>
      <a-col :span="12">
        <a-form-item v-bind="formItemLayout" label="验证码">
          <a-row :gutter="8">
            <a-col :span="12">
              <a-input
                type='number'
                placeholder="请输入验证码"
                v-decorator="[
              'mobile_code',
              {rules: [{ required: true, message: '请输入验证码' }]}
            ]"
              />
            </a-col>
            <a-col :span="12">
              <a-button :disabled="yzm_disabled" @click="send_yzm">{{yzm_btn}}</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-col>
      <a-col :span="7"></a-col>
    </a-row>
    <a-row>
      <a-col :span="5"></a-col>
      <a-col :span="12">
        <a-form-item v-bind="formItemLayout" label="密码">
          <a-input
            placeholder="请输入密码"
            v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: '请输入密码',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
            type="password"
          />
        </a-form-item>
      </a-col>
      <a-col :span="7"></a-col>
    </a-row>
    <a-row>
      <a-col :span="5"></a-col>
      <a-col :span="12">
        <a-form-item v-bind="formItemLayout" label="确认密码">
          <a-input
            placeholder="请输入确认密码"
            v-decorator="[
          'confirm_password',
          {
            rules: [{
              required: true, message: '请输入确认密码',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
      </a-col>
      <a-col :span="7"></a-col>
    </a-row>
    <a-row class="last-row">
      <a-col :span="9"></a-col>
      <a-col :span="3" align="right">
        <a-form-item style="margin:0;">
          <a-button type="primary" html-type="submit">注册</a-button>
        </a-form-item>
      </a-col>
      <a-col :span="3">
        <button type="button" @click="go_login" class="custom-button go-login">已注册？去登录</button>
      </a-col>
      <a-col :span="9"></a-col>
    </a-row>
  </a-form>
</template>

<script>
import { register, valiYzm } from "@indexApi/user";
import vPinyin from "@/common/js/vue-py";
export default {
  data() {
    return {
      confirmDirty: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      },
      formData: {
        name: "",
        admin_name: "",
        mobile: "",
        mobile_code: "",
        password: "",
        comfirm_password: ""
      },
      yzm_disabled: true,
      yzm_time: 60,
      yzm_btn: "发送验证码"
    };
  },
  props: ["father"],
  created() {
    this.father.active = 0;
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
    admin_name_rules(rule, value, callback){
      if (value && (!this.global.RexConfig.RexUserName.test(value)||!this.global.RexConfig.RexPassword.test(value))) {
        callback('8-16位字母、数字组合，必须包含字母和数字')
      }else{
        callback()
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && !this.global.RexConfig.RexPassword.test(value)) {
        callback("密码为8-16位之间的字符或数字");
      }
      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码输入不一致");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && !this.global.RexConfig.RexPassword.test(value)) {
        callback("密码为8-16位之间的字符或数字");
      }
      if (value && this.confirmDirty) {
        form.validateFields(["confirm_password"], { force: true });
      }
      callback();
    },
    send_yzm() {
      let mobile = this.form.getFieldValue("mobile");
      valiYzm({mobile}).then(res=>{
        if(res.code === 200){
          this.$message.success('验证码发送成功') 
        }else{
          this.$message.error(res.msg) 
        }
      })
      this.yzm_disabled = true;
      this.yzm_btn = `${this.yzm_time}秒后重新发送`;
      let time = setInterval(() => {
        this.yzm_time--;
        this.yzm_btn = `${this.yzm_time}秒后重新发送`;
        if (!this.yzm_time) {
          clearInterval(time);
          this.yzm_time = 60;
          if (/^1[3456789]\d{9}$/.test(mobile)) {
            this.yzm_disabled = false;
          }
          this.yzm_btn = `发送验证码`;
        }
      }, 1000);
    },
    reg_login() {
      this.$router.push({ path: "/login" });
    },
    next() {
      this.$router.push({ path: "/register/baseInfo" });
    },
    handleSubmit(e) {
      var self = this;
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.code = '';
          for (let i = 0; i < vPinyin.chineseToPinYin(values.name).length; i++) {
            let c = vPinyin.chineseToPinYin(values.name).charAt(i);
              if (/^[A-Z]+$/.test(c)) {
                values.code += c;
              }
          }
          register(values)
            .then(res => {
              if(res.code == 200){
                this.$confirm({
                  title: '注册成功',
                  content: '登录后可继续完善入驻信息，是否立刻登录？',
                  onOk() {
                    self.$router.push({name:'login'}) 
                  },
                  onCancel() {
                    self.$router.push({name:'index'}) 
                  },
                });
              }
            })
            .catch(error => {
              this.$message.success(error)
            });
        }
      });
    },
    go_login() {
      this.$router.push({name:'login'})
    }
  }
};
</script>

<style lang="scss" scoped>
.ant-form {
  padding: 20px 0;
  .ant-form-item {
    .ant-input {
      padding-left: 8px;
    }
  }
  .go-login {
    padding: 0;
    color: $primary2;
    border: none;
    background: none;
    margin: 14px 20px;
  }
}
</style>
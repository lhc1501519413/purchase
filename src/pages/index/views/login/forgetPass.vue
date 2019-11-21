<template>
  <div id="forgetPass">
    <section>
      <div class="logo">
        <router-link to='/index'>
          <svg-icon class="svg pointer logo2" icon-class="logo" />
        </router-link>
      </div>
      <div class="login-container">
        <img class="banner" :src="bannerUrl" alt="logo" />
        <a-form
          :form="form"
          @submit="handleSubmit"
        >
          <h2 class="text-center mb-10">重置密码</h2>
          <a-form-item>
            <a-input
              v-decorator="[
                'mobile',
                { rules: [{ required: true, message: '请输入手机号码'},{validator:(rule, value, callback) => this.vali_mobile(rule, value, callback)}] }
              ]"
              placeholder="请输入手机号码"
            >
              <a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
          <a-row :gutter="8">
            <a-col :span="14">
              <a-input
                type='number'
                placeholder="请输入验证码"
                v-decorator="[
                'mobile_code',
                  {rules: [{ required: true, message: '请输入验证码' }]}
                ]"
                >
                <a-icon  slot="prefix"  type="safety-certificate"  style="color: rgba(0,0,0,.25)"/>
              </a-input>

            </a-col>
            <a-col :span="10">
              <a-button :disabled="yzm_disabled" @click="send_yzm">{{yzm_btn}}</a-button>
            </a-col>
          </a-row>
        </a-form-item>
          <a-form-item>
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
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              placeholder="请再次输入密码"
              v-decorator="[
          'confirm_password',
          {
            rules: [{
              required: true, message: '请再次输入密码',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
              type="password"
              @blur="handleConfirmBlur"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
      <footer>版权所有 Copyright©2017.ALL Rights Reserved| | 浙江校联信息科技有限公司 | 浙ICP备17015749号</footer>
    </section>
  </div>
</template>

<script>
import { reset_password, valiYzm } from "@indexApi/user";
export default {
  data() {
    return {
      confirmDirty: false,
      logoUrl: require("@static/images/logo.png"),
      bannerUrl: require("@static/images/banner_img.png"),
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {},
        wrapperCol: { span: 24 }
      },
      yzm_disabled: true,
      yzm_time: 60,
      yzm_btn: "发送验证码"
    };
  },
  methods: {
    vali_mobile(rule, value, callback) {
      if (value && /^1[3456789]\d{9}$/.test(value)) {
        this.yzm_disabled = false;
        callback(); // 校验通过
      } else if (value && !/^1[3456789]\d{9}$/.test(value)) {
        this.yzm_disabled = true;
        callback("请填入正确格式的手机号码"); // 校验未通过
      } else {
        callback(); // 校验未通过
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          reset_password(values)
            .then(res => {
              this.$message.success("重置密码成功");
              this.$router.go(-1);
            })
            .catch(error => {
              this.$message.warn(error);
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@indexAssets/css/forgetPass";
</style>
<style lang="scss">
#forgetPass {
  .logo2{
    width: 273px !important;
    height: 74px !important;
  }
  .ant-input {
    padding-left: 40px !important;
    height: 40px;
    font-size: 18px !important;
  }
}
</style>
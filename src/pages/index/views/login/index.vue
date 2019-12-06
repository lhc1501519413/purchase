<template>
  <div id="login">
    <section>
      <div class="logo">
        <router-link to='/index'>
          <svg-icon class="svg pointer logo2" icon-class="logo" />
        </router-link>
      </div>
      <div class="login-container">
        <img class="banner" :src="bannerUrl" alt="logo" />
        <a-form
          v-show="!login_mobile"
          :form="form"
          @submit="handleSubmit"
          >
          <div class="switch-login">
            <a href="javascript:;" @click="login_mobile=false" >账号登录</a>
            <a href="javascript:;" @click="login_mobile=true" >验证码登录</a>
          </div>
          <a-form-item>
            <a-input style="height:45px;font-size:18px;"
              v-decorator="[
            'username',
            { 
              rules: [{ required: true, message: '请输入用户名或手机号' }],
              initialValue:formData.username 
            },
          ]"
              placeholder="请输入用户名或手机号"
            >
              <!-- <svg-icon slot="prefix" icon-class="login_user" /> -->
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input style="height:45px;font-size:18px;"
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码' }],
                  initialValue:formData.password 
                }
              ]"
              type="password"
              placeholder="请输入密码"
            >
              <!-- <svg-icon slot="prefix" icon-class="login_lock" /> -->
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input style="height:45px;font-size:18px;"
              placeholder="请输入验证码"
              v-decorator="[
                'verify',
                { 
                  rules: [{ required: true, message: '请输入验证码' }]
                }
              ]"
            >
              <!-- <svg-icon slot="prefix" icon-class="login_icode" /> -->
              <a-icon  slot="prefix"  type="safety-certificate"  style="color: rgba(0,0,0,.25)"/>
            </a-input>
            <span class="img_container">
              <img @click="yzm" class="yzm" :src="img_url" alt="验证码">
            </span>
          </a-form-item>
          <a-form-item>
            <div class="remember_forget">
              <a-checkbox
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: true,
                  }
                ]"
              >记住我</a-checkbox>
              <router-link class="forget" to='/forgetPass'>
                忘记密码
              </router-link>
            </div>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">登录</a-button>
          </a-form-item>
          <span class="reg-now" @click="reg_now">立即注册</span>
        </a-form>
        <a-form
          v-show="login_mobile"
          :form="form2"
          class="ant-form2"
          @submit="handleSubmit2"
          >
          <div class="switch-login">
            <a href="javascript:;" @click="login_mobile=false" >账号登录</a>
            <a href="javascript:;" @click="login_mobile=true" >验证码登录</a>
          </div>
          <a-form-item>
            <a-input style="height:45px;font-size:18px;"
              v-decorator="[
            'mobile',
            {
              rules: [{ required: true, message: '请输入手机号' },{validator:(rule, value, callback) => this.vali_mobile(rule, value, callback)}],
              initialValue:formData.username 
            },
          ]"
              placeholder="请输入手机号"
            >
              <!-- <svg-icon slot="prefix" icon-class="login_user" /> -->
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input style="width:53%;height:45px;font-size:18px;"
              placeholder="请输入验证码"
              v-decorator="[
                'mobile_code',
                { 
                  rules: [{ required: true, message: '请输入验证码' }]
                }
              ]"
            >
              <a-icon slot="prefix"  type="safety-certificate"  style="color: rgba(0,0,0,.25)"/>
            </a-input>
            <a-button :disabled="yzm_disabled" class="send_yzm" @click="send_yzm">{{yzm_btn}}</a-button>
          </a-form-item>
          <a-form-item>
            <div class="remember_forget">
              <span class="reg-now" @click="reg_now">立即注册</span>
              <router-link class="forget" to='/forgetPass'>
                忘记密码
              </router-link>
            </div>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    <footer>
      版权所有 Copyright©2017.ALL Rights Reserved| | 浙江校联信息科技有限公司 | 浙ICP备17015749号
    </footer>
    </section>
  </div>
</template>

<script>
import {login,login_by_mobile,yzm,base_info,valiYzm} from '@indexApi/user';
export default {
  data() {
    return {
      img_url:'',
      bannerUrl:require("@static/images/banner_img.png"),
      form: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {},
        wrapperCol: { span: 24 }
      },
      formData:JSON.parse(localStorage.getItem('userData'))||{
        username:'',
        password:''
      },
      login_mobile:false,
      yzm_disabled: true,
      yzm_time: 60,
      yzm_btn: "发送验证码",
      router:{}
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      vm.router = from;
    })
  },
  created(){
    this.yzm();
  },
  methods: {
    yzm(){
      this.img_url=this.global.baseUrl+'?c=Login&a=verify&t='+new Date().Format('S');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if(values.remember){
            localStorage.setItem('userData',JSON.stringify({
              username:values.username,
              password:values.password
            }))
          }else{
            localStorage.removeItem('userData')
          }
          login(values).then((res=>{
            this.$message.success('登录成功')
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('expire_time',res.data.expire_time);
            this.$store.commit('SET_TOKEN',res.data.token);
            base_info().then(res=>{
              localStorage.setItem('realname',res.data.realname);
              localStorage.setItem('type',res.data.type);
              localStorage.setItem('username',res.data.username);
              localStorage.setItem('supply_info',JSON.stringify(res.data.supply_info));
              localStorage.setItem('com_info',JSON.stringify(res.data.com_info));
              this.$store.commit('SET_TYPE',res.data.type);
              this.$store.commit('SET_USERNAME',res.data.username);
              this.$store.commit('SET_PRIV',res.data.priv);
              this.$store.commit('SUPPLY_INFO',res.data.supply_info);
              /* 不同的页面间跳转 */
              if(res.data.type==0 && res.data.supply_info.is_audit==0){
                switch (res.data.supply_info.step) {
                  case 2:
                    let time = setTimeout(()=>{
                      this.$router.push({path:'register/baseInfo'})
                      clearTimeout(time)
                    },1000)
                    break;
                   case 3:
                    let time2 = setTimeout(()=>{
                      this.$router.push({path:'register/dataComplete'})
                      clearTimeout(time2)
                    },1000)
                    break;
                   case 4:
                     let time3 = setTimeout(()=>{
                      this.$router.push({path:'register/dataAudit'})
                      clearTimeout(time3)
                    },1000)
                    break;
                }
              }else if(this.router.name&&this.router.name!='reg'){
                let time = setTimeout(()=>{
                this.$router.replace({path:this.router.path,query:this.router.query})
                  clearTimeout(time)
                },1000)
              }else{
                this.$router.replace({path:'/'})
              }
            }).catch(error=>{
              this.$message.warn(error)
            })
          })).catch(error=>{
            this.$message.warn(error)
            this.img_url=this.global.baseUrl+'?c=Login&a=verify&t='+new Date().Format('S');
          })
        }
      });
    },
    handleSubmit2(e) {
      e.preventDefault();
      this.form2.validateFields((err, values) => {
        if (!err) {
          login_by_mobile(values).then((res=>{
            this.$message.success('登录成功')
            localStorage.setItem('token',res.data.token);
            this.$store.commit('SET_TOKEN',res.data.token);
            base_info().then(res=>{
              localStorage.setItem('realname',res.data.realname);
              localStorage.setItem('type',res.data.type);
              localStorage.setItem('username',res.data.username);
              localStorage.setItem('supply_info',JSON.stringify(res.data.supply_info));
              localStorage.setItem('com_info',JSON.stringify(res.data.com_info));
              this.$store.commit('SET_TYPE',res.data.type);
              this.$store.commit('SET_USERNAME',res.data.username);
              this.$store.commit('SET_PRIV',res.data.priv);
              this.$store.commit('SUPPLY_INFO',res.data.supply_info);
              /* 不同的页面间跳转 */
              if(res.data.type==0 && res.data.supply_info.is_audit==0){
                switch (res.data.supply_info.step) {
                  case 2:
                    let time = setTimeout(()=>{
                      this.$router.push({path:'register/baseInfo'})
                      clearTimeout(time)
                    },1000)
                    break;
                   case 3:
                    let time2 = setTimeout(()=>{
                      this.$router.push({path:'register/dataComplete'})
                      clearTimeout(time2)
                    },1000)
                    break;
                   case 4:
                     let time3 = setTimeout(()=>{
                      this.$router.push({path:'register/dataAudit'})
                      clearTimeout(time3)
                    },1000)
                    break;
                }
              }else if(this.router.name&&this.router.name!='reg'){
                let time = setTimeout(()=>{
                this.$router.replace({path:this.router.path,query:this.router.query})
                  clearTimeout(time)
                },1000)
              }else{
                this.$router.replace({path:'/'})
              }
            }).catch(error=>{
              this.$message.warn(error)
            })
          })).catch(error=>{
            this.$message.warn(error)
            this.img_url=this.global.baseUrl+'?c=Login&a=verify&t='+new Date().Format('S');
          })
        }
      });
    },
    reg_now(){
      this.$router.push({path:'/register/reg'})
    },
    to_home(){
      this.$router.push({path:'/index'})
    },
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
    send_yzm() {
      let mobile = this.form2.getFieldValue("mobile");
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
      this.$once('hook:beforeDestroy',() => {
        clearInterval(time);
      })
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@indexAssets/css/login.scss";
</style>
<style lang="scss">
#login{
  .switch-login{
    @include flex(space-between);
    font-size: 16px;
    @extend .mb-10;
  }
  .ant-input {
    padding-left: 40px !important;
    height: 40px;
    font-size:18px !important;
  }
  .logo2{
    width: 273px !important;
    height: 74px !important;
  }
  .send_yzm{
    height: 45px !important;
    width: 135px !important;
    margin-left: 10px;
  }
}
</style>
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
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
          >
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
      </div>
    <footer>
      版权所有 Copyright©2017.ALL Rights Reserved| | 浙江校联信息科技有限公司 | 浙ICP备17015749号
    </footer>
    </section>
  </div>
</template>

<script>
import {login,yzm,base_info} from '@indexApi/user';
export default {
  components: {},
  props: {},
  data() {
    return {
      img_url:this.global.baseUrl+'?c=Login&a=verify',
      bannerUrl:require("@static/images/banner_img.png"),
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {},
        wrapperCol: { span: 24 }
      },
      formData:JSON.parse(localStorage.getItem('userData'))||{
        username:'',
        password:''
      },
    };
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
            this.global.token = res.data.token;
            this.$store.commit('SET_TOKEN',res.data.token);
            base_info().then(res=>{
              localStorage.setItem('realname',res.data.realname);
              localStorage.setItem('type',res.data.type);
              localStorage.setItem('username',res.data.username);
              localStorage.setItem('supply_info',JSON.stringify(res.data.supply_info));
              localStorage.setItem('com_info',JSON.stringify(res.data.com_info));
              this.global.realname = res.data.realname;
              this.global.type = res.data.type;
              this.global.username = res.data.username;
              this.global.supply_info = res.data.supply_info || null;
              this.global.com_info = res.data.com_info || null;
              this.$store.commit('SET_TYPE',res.data.type);
              this.$store.commit('SET_USERNAME',res.data.username);
              this.$store.commit('SET_PRIV',res.data.priv);
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
              }else{
                let time = setTimeout(()=>{
                  this.$router.go(-1);
                  clearTimeout(time)
                },1000)
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@indexAssets/css/login.scss";
</style>
<style lang="scss">
#login{
  .ant-input-prefix svg{
    width: 18px;
    height: 18px;
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
}
</style>
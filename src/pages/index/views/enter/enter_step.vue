<template>
    <div id="enter_step">
        <div class="header_img">
            <a :href="global.host+'#/register/reg'" target="_blank">
                <div></div>
            </a>
        </div>
        <div class="step">
            <div class="step_title">
                <p style="font-weight:600;">供应商入驻申请流程</p>
            </div>
            <div class="step_content">
                <div class="flow_path">
                    <div class="flow_path_img"><img src="@indexAssets/images/new/icon_flow_1.png" alt=""></div>
                    <div class="flow_path_title"><span>注册账号</span></div>
                    <div class="flow_path_text"><div><span>填写真实有效的供应商信息，完成注册，还没有供应商账号？<a target="_blank" :href="global.host+'#/register/reg'">  点击注册 >> </a>详情请查阅 <a target="_blank" :href="global.host+'#/check_in_guide'">《入驻指南》</a></span></div></div>
                </div>
                <div class="flow_path">
                    <div class="flow_path_img"><img src="@indexAssets/images/new/icon_flow_2.png" alt=""></div>
                    <div class="flow_path_title"><span>提交资质审核</span></div>
                    <div class="flow_path_text"><div><span>完善企业信息，提供真实有效的审核资料。</span></div></div>
                </div>
                <div class="flow_path">
                    <div class="flow_path_img"><img src="@indexAssets/images/new/icon_flow_3.png" alt=""></div>
                    <div class="flow_path_title"><span>申请入驻</span></div>
                    <div class="flow_path_text"><div><span>请仔细阅《采购供应商注册须知》《法律声明》《隐私协议》</span></div></div>
                </div>
                <div class="flow_path">
                    <div class="flow_path_img"><img src="@indexAssets/images/new/icon_flow_4.png" alt=""></div>
                    <div class="flow_path_title"><span>入驻审核</span></div>
                    <div class="flow_path_text"><div><span>收到入驻申请后，由审核机构对资料进行审核，审核通过即入驻成功。</span></div></div>
                </div>
            </div>
        </div>
        <div class="tel">
            <p>咨询热线：400-999-2350</p>
        </div>
    </div>
</template>
<script>
  export default {
      name:'enter_step',
      data(){
          return{}
      },

  };
</script>
<style scoped lang='scss'>
    #enter_step{
        background-color: rgba(248,248,249,1);
        height: 774px;
    }
    .header_img{
        width:100%;
        div{
            width: 100%;
            height: 250px;
            background: url("~@indexAssets/images/new/banner2-02.png");
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
        }
    }
    .step{
        margin:30px 0 0 0;
    }
    .step_title{
        margin: 0 0 30px 0;
    }
    .step_content{
        display: flex;
        justify-content: center;
        width:100%;
        min-width: 1000px;
        .flow_path{
            height: 254px;
            width: 286px;
            margin-left: -30px;
            background-repeat:no-repeat;
            background: url("~@indexAssets/images/new/next.png");
            .flow_path_img{
                margin: 20px auto;
                display: flex;
                justify-content: center;
            }
            .flow_path_text{
                width: 128px;
                height: auto;
                text-align: center;
                margin: 20px auto;
                display: flex;
                justify-content: center;
            }
            .flow_path_title{
                // width: 120px;
                text-align: center;
                font-weight:bold;
                font-size:16px;
                color:#F25C19;
            }
        }
    }
    .step_title{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size:16px;
        font-family:Microsoft YaHei;
    }
    .tel{
        margin: 50px auto;
        text-align: center;
        font-size:16px;
    }
</style>
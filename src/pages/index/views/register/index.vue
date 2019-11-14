<template>
  <div id="register">
    <header>
      <router-link to='/index'>
        <svg-icon class="svg pointer" icon-class="logo_white" />
      </router-link>
    </header>
    <h3>供应商入驻</h3>
    <section class="content">
      <a-steps :current="current" labelPlacement="vertical">
        <a-step>
          <template slot="title">注册账号</template>
        </a-step>
        <a-step title="基本信息完善" />
        <a-step title="资料完善" />
        <a-step title="资料审核" />
      </a-steps>
      <router-view :father="this" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
#register {
  header {
    width: 100%;
    height: 61px;
    padding: 8.5px 0;
    background-color: $primary1;
    .svg {
      width: 344px;
      height: 100%;
      margin-left: 17.5%;
    }
  }
  h3 {
    width: 65%;
    margin: 1rem auto;
  }
  .content {
    @include horizontalCenter(65%);
    background-color: #fff;
  }
}
</style>
<style lang="scss">
#register {
  .content {
    .ant-steps {
      width: 85%;
      padding-top: 2rem;
      margin: 0 auto 1rem;
      .ant-steps-item-content {
        text-align: left !important;
        width: 91% !important;
      }
    }
  }
}
</style>
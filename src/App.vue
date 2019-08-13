<template>
  <div id="app">
    <el-container>
      <el-aside style="width: 200px; min-height: 500px; box-shadow: 0 0 20px 0px pink;">
        <div class="per_menu">
          <router-link to="/list">Go to list</router-link>
        </div>
        <!-- <div class="per_menu">
          <router-link to="/editor">Go to editor</router-link>
        </div> -->
      </el-aside>
      <el-main style="padding: 0;">
        <router-view></router-view>
      </el-main>
    </el-container>
    
  </div>
</template>

<style scoped>
  .per_menu {
    padding-bottom: 15px;
    background: #c0c0c01c;
  }
</style>

<script>
  export default {
    methods: {
    },
    created () {
      console.log(1)
    }
  }
</script>

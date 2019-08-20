<template>
  <div>
    <baidu-map style="height: 500px; overflow:scroll;">
      <bm-view class="map" center="广州"></bm-view>
      <bm-transit start="西门口" end="动漫星城" :auto-viewport="true" location="广州"></bm-transit>
    </baidu-map>
  </div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 700px;
}
</style>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmView from 'vue-baidu-map/components/map/MapView.vue'
  import BmTransit from 'vue-baidu-map/components/search/Transit.vue'
  
  export default {
    components: {
      BaiduMap,
      BmTransit,
      BmView
    },
    data () {
      return {}
    },
    mounted () {}
  }
</script>

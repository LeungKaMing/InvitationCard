<template>
  <div>
    <div v-if="showPage1" :class="['page1', direct === 'up' ? 'page1--up' : direct === 'down' ? 'page1--down' : '' ]" @touchstart="hanldeTouchStart($event, 1)" @touchmove="hanldeTouchMove" @touchend="hanldeTouchEnd">1{{direct}}</div>
    <div v-if="showPage2" :class="['page2', direct === 'up' ? 'page2--up' : direct === 'down' ? 'page2--down' : '' ]" @touchstart="hanldeTouchStart($event, 2)" @touchmove="hanldeTouchMove" @touchend="hanldeTouchEnd">2{{direct}}</div>
    <div v-if="showPage3" :class="['page3', direct === 'up' ? 'page3--up' : direct === 'down' ? 'page3--down' : '' ]" @touchstart="hanldeTouchStart($event, 3)" @touchmove="hanldeTouchMove" @touchend="hanldeTouchEnd">3{{direct}}</div>
  </div>
</template>

<script>
  import './assets/css/app.css'

  export default {
    data() {
      return {
        prevPage: 0,
        currentPage: 1,
        nextPage: 0,
        startPageY: 0,
        endPageY: 0,
        showPage1: true,
        showPage2: false,
        showPage3: false,
        swithTouch: false
      }
    },
    computed: {
      direct () {
        /**
         * 1. 默认当前页在首页 ok
         * 2. 在首页 / 尾页不能触发向上 / 向下翻页 ok
         * 3. 触发翻动动画时，并改变对应样式
         */
        // 只有经过start- move - end 才会把总开关设置为true，这样做是为了避免用户随便选页面两个极端的点点击也会触发动画 ok
        if (!this.$data.swithTouch) {
          return ''
        }
        // 默认endPageY为0 ok
        if (Number(this.$data.startPageY) === 0 || Number(this.$data.endPageY) === 0) {
          return ''
        }
        // 起点和终点不相等 ok
        if (this.$data.endPageY - this.$data.startPageY === 0) {
          return ''
        }
        // 必须保证上划 / 下划的距离绝对值要大于100 ok
        if (Math.abs(this.$data.endPageY - this.$data.startPageY) < 100) {
          return ''
        } else {
          let direct = this.$data.endPageY - this.$data.startPageY < 0 ? 'up' : 'down'
          // ------------换页，所有当前页用到的变量初始化 start------------
          this.$data.startPageY = 0 // 当前用到的起点
          this.$data.endPageY = 0 // 当前用到的终点
          this.$data.swithTouch = false // 每次换页都要把这个总开关归零
          // 首页不能上滑，尾页不能下滑 有问题的条件先过滤
          if (this.$data.currentPage === 1 && direct === 'up') {
            direct = ''
          } else if (this.$data.currentPage === 3 && direct === 'down') {
            direct = ''
          } else {
            // 其他页




            this.$data.currentPage !== 1 && direct === 'up' ? this[`showPage${this.$data.currentPage - 1}`] = true : this.$data.currentPage !== 3 && direct === 'down' ? this[`showPage${this.$data.currentPage + 1}`] = true : ''  // 针对当前方向去对对应方向的页面做打开 对于处于其他页的情况 ok
            this[`showPage${this.$data.currentPage}`] = true // 当前页面跳去另外的页面肯定是要关闭的，除了首页和尾页 ok
            
            this.$data.prevPage = this.$data.currentPage  // 当前页成为上一次页面
            this.$data.currentPage = direct === 'up' ? this.$data.currentPage - 1 : this.$data.currentPage + 1  // 根据滑动方向展示对应的页面



          }
          return direct
        }
      }
    },
    methods: {
      hanldeTouchStart (e, index) {
        this.$data.currentPage = index
        this.$data.startPageY = Number(e.changedTouches[0].pageY)
      },
      hanldeTouchMove (e) {
        this.$data.swithTouch = true  // 总控开关
      },
      hanldeTouchEnd (e) {
        this.$data.endPageY = Number(e.changedTouches[0].pageY)
      }
    }
  }
</script>
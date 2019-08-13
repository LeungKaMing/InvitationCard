<template>
  <div>
    <el-button @click="goTo('add')">创建活动</el-button>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        label="Name"
        prop="name">
      </el-table-column>
      <el-table-column
        label="上线时间"
        prop="onlineTime">
      </el-table-column>
      <el-table-column
        label="下线时间"
        prop="offlineTime">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
<script>
  import {getActivityList} from '../assets/scripts/api'
  export default {
    data() {
      return {
        tableData: []
      }
    },
    created () {
      const self = this
      const temp = []
      // 请求活动列表
      getActivityList({
        data: {},
        onSuccess (res) {
          res.data.map((item) => {
            temp.push({
              activityId: item.activityId,
              name: JSON.parse(item.dataSource).global.name,
              onlineTime: JSON.parse(item.dataSource).global.onlineTime,
              offlineTime: JSON.parse(item.dataSource).global.offlineTime
            })
          })
          self.$data.tableData = temp
        },
        onFailure (err) {
          console.log(err)
        }
      })
    },
    methods: {
      goTo (type) {
        if (type === 'add') {
          this.$router.push({
            path: '/editor',
            query: {
              type
            }
          })
        }
      },
      handleEdit(index, row) {
        const {activityId} = row
        this.$router.push({
          path: '/editor',
          query: {
            type: 'edit',
            activityId
          }
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
  }
</script>
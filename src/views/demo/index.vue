<script setup lang="ts">
const tblData = ref<any[]>([
  {
    checked: false,
    name: '1',
    children: [
      {
        checked: false,
        name: '1-1',
        children: [
          {
            checked: false,
            name: '1-1-1',
            children: [],
          },
        ],
      },
    ],
  },
]);
</script>
<template>
  <div class="body">
    <el-table default-expand-all border row-key="name" :data="tblData">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="selector" label="选中" width="100">
        <a-button>d</a-button>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="200" />
    </el-table>
  </div>
</template>
<style></style>

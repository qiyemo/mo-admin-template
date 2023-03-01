<script setup lang="ts">
const formData = reactive({
  username: '',
  password: '',
});
</script>
<template>
  <div>
    <el-form :model="formData">
      <el-form-item>
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button></el-button>
  </div>
</template>

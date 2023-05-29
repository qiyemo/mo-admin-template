<!--
 * @Author: qiye
 * @LastEditors: qiye
 * @description: page description
 * @Date: 2023-04-07 10:08:43
 * @LastEditTime: 2023-05-26 17:18:23
-->
<script setup lang="ts">
import { useUserStore } from '@/store';
import { md5 } from '@/utils';

const userStore = useUserStore();

const formState = reactive({
  username: '',
  password: '',
});

const login = () => {
  const param = {
    ...formState,
    password: md5(formState.password),
  };
  userStore.login(param);
};
</script>
<template>
  <div class="form-box">
    <div>
      <div class="row-title">登录系统</div>
      <el-form class="form-login" :model="formState">
        <el-form-item>
          <el-input v-model="formState.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formState.password" placeholder="请输入密码 "></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
.form-box {
  height: 100vh;
  display: flex;

  align-items: center;
  justify-content: center;
}

.form-login {
  width: 300px;
}

.row-title {
  margin-bottom: 8px;
}
</style>

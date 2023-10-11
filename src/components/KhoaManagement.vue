<template>
  <form class="row mx-auto">
    <div class="col-auto">
      <label-item for="khoa" class="form-label" content="Khoa" />
    </div>
    <div class="col-auto">
      <input-item
        id="khoa"
        v-model="khoaName"
        placeholder="Nhập tên khoa"
        class="form-control"
      />
    </div>
    <div class="col-auto" @click.prevent="createKhoa">
      <button-item class="btn btn-primary mb-3">Tạo mới</button-item>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

import { API_URL } from '@/assets/js/utils.js';

const khoaName = ref();

const createKhoa = async () => {
  await axios
    .post(`${API_URL}api/departments`, {
      departmentName: khoaName.value,
    })
    .then(() => {
      createToast(`Tạo mới thành công lĩnh vực ${khoaName.value}`, {
        type: 'success',
      });
      khoaName.value = '';
    })
    .catch((error) => {
      createToast(`Tạo mới lĩnh vực ${khoaName.value ?? ''} thất bại`, {
        type: 'danger',
      });
      console.log(error);
    });
};
</script>

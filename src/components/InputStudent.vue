<template>
  <div class="wrapper">
    <form action="" class="mx-auto">
      <div class="btns">
        <button-item class="btn-primary search-btn me-3" @on-click="add"
          >Thêm mới</button-item
        >
        <button-item class="btn-primary search-btn me-3" @on-click="edit"
          >Cập nhật</button-item
        >
        <button-item class="btn-primary search-btn" @on-click="clear"
          >Xóa</button-item
        >
      </div>

      <div class="mb-2">
        <label-item for="id" class="form-label" content="Mã sinh viên" />
        <input-item
          id="id"
          v-model="studentId"
          :disabled="isDisabled"
          placeholder="Nhập mã sinh viên"
        />
        <custom-span :isShown="isStudentIdShown" :isBreakLine="true"
          >Chưa nhập mã sinh viên</custom-span
        >
      </div>

      <div class="mb-2">
        <label-item for="name" class="form-label" content="Tên sinh viên" />
        <input-item
          id="name"
          v-model="studentName"
          placeholder="Nhập tên sinh viên"
        />
        <custom-span :isShown="isStudentNameShown" :isBreakLine="true">
          Chưa nhập tên sinh viên
        </custom-span>
      </div>

      <div class="mb-2">
        <label-item for="birthdate" class="form-label" content="Ngày sinh" />
        <input-item
          type="date"
          id="birthdate"
          :isBreakLine="true"
          v-model="birthdate"
        />
      </div>

      <div class="mb-2">
        <label-item content="Giới tính" class="form-label" />

        <div class="gender">
          <radio-button
            type="radio"
            class="form-check-input"
            id="man"
            name="gender"
            :value="true"
            v-model="gender"
          />
          <label-item for="man" content="Nam" class="clear-background" />

          <radio-button
            type="radio"
            class="form-check-input"
            id="woman"
            name="gender"
            :value="false"
            v-model="gender"
          />
          <label-item
            for="woman"
            content="Nữ"
            class="clear-background"
            isBreakLine
          />
        </div>
      </div>

      <div>
        <label-item for="khoa" content="Khoa" />
        <custom-select
          id="khoa"
          :khoas="khoas"
          v-model="khoa"
          disabledOption="Chọn khoa"
          @select-khoa="updateKhoaRef"
        />
        <router-link to="/khoa">
          <font-awesome-icon :icon="['fas', 'plus']" class="ms-2" />
        </router-link>
        <custom-span :isShown="isKhoaShown" :isBreakLine="true"
          >Chưa chọn khoa</custom-span
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import Khoa from '@/assets/js/khoa.js';
import Student from '@/assets/js/student';

import { ref, defineProps, watch, defineEmits, onMounted } from 'vue';
import axios from 'axios';

const isStudentIdShown = ref(false);
const isStudentNameShown = ref(false);
const isKhoaShown = ref(false);

const studentId = ref('');
const studentName = ref('');
const birthdate = ref('');
const gender = ref(true);
const khoa = ref(null);

const khoas = ref([]);

const isDisabled = ref(props.disabled);

function updateKhoaRef(maKhoa) {
  khoa.value = khoas.value.find((kh) => kh.maKhoa === maKhoa);
}

const props = defineProps({
  editStudent: {
    type: Student,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([
  'edited-student',
  'add-student',
  'clear-input-data',
]);

function errorCatch() {
  isStudentIdShown.value = studentId.value ? false : true;
  isStudentNameShown.value = studentName.value ? false : true;
  isKhoaShown.value = khoa.value ? false : true;

  if (isStudentIdShown.value || isStudentNameShown.value || isKhoaShown.value) {
    return false;
  }

  return true;
}

function add() {
  if (!errorCatch()) {
    return;
  }

  const newStudent = new Student(
    studentId.value,
    studentName.value,
    birthdate.value,
    gender.value,
    khoa.value.maKhoa,
    khoa.value.tenKhoa,
  );

  emits('add-student', newStudent);
  clear();
}

function edit() {
  if (!errorCatch()) {
    return;
  }

  const editedStu = new Student(
    studentId.value,
    studentName.value,
    birthdate.value,
    gender.value,
    khoa.value.maKhoa,
    khoa.value.tenKhoa,
  );

  isDisabled.value = false;
  clear();
  emits('edited-student', editedStu);
}

function clear() {
  studentId.value = '';
  studentName.value = '';
  birthdate.value = '';
  gender.value = true;
  khoa.value = null;

  isStudentIdShown.value = false;
  isStudentNameShown.value = false;
  isKhoaShown.value = false;

  isDisabled.value = false;

  emits('clear-input-data');
}

const getKhoaData = async () => {
  await axios
    .get('https://localhost:7224/api/departments')
    .then((res) => {
      khoas.value = BEKhoaToFEKhoa(res.data);
    })
    .catch((error) => console.log(error));
};

const BEKhoaToFEKhoa = (khoas = []) => {
  return khoas.map((khoa) => {
    const k = new Khoa(khoa.departmentId, khoa.departmentName);
    return k;
  });
};

onMounted(() => {
  getKhoaData();
});

watch(
  () => props.editStudent,
  (stu) => {
    if (stu) {
      studentId.value = stu.maSv;
      studentName.value = stu.tenSv;
      birthdate.value = new Date(`${stu.ngaySinh}Z`)
        .toISOString()
        .split('T')[0];
      gender.value = stu.gioiTinh;
      khoa.value = new Khoa(stu.khoa.maKhoa, stu.khoa.tenKhoa);

      isDisabled.value = true;
    }
  },
);

watch(
  () => props.disabled,
  (dis) => {
    isDisabled.value = dis;
  },
);
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  margin-top: 110px;
  width: 600px;
  display: flex;
  flex-direction: column;
}

.btns {
  margin-bottom: 20px;
}

.gender {
  display: inline-block;
  width: 185px;
}
</style>

<template>
  <search-students @input-search="search" />
  <div class="row mt-3">
    <table-students
      @remove-single="removeSingle"
      @remove-multiple="removeMultiple"
      @edit="
        (studentId) => {
          searchStudent(studentId);
          disabled = true;
        }
      "
      :main-list-student="studentList"
      :changeOrder="changeOrder"
      v-model="pageSize"
    />

    <input-student
      @add-student="add"
      @edited-student="edit"
      @clear-input-data="editStudent = null"
      :edit-student="editStudent"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import SearchStudents from '@/components/SearchStudents.vue';
import TableStudents from '@/components/TableStudents.vue';
import InputStudent from '@/components/InputStudent.vue';

import '@/assets/styles/global.scss';
import { onMounted, provide, ref, watch } from 'vue';
import axios from 'axios';

import Student from '@/assets/js/student';
import { convertDate, API_URL } from '@/assets/js/utils';

import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export default {
  name: 'App',
  components: { SearchStudents, InputStudent, TableStudents },
};
</script>

<script setup>
// const API_URL = 'https://localhost:7224/';

const studentList = ref(null);
const editStudent = ref();
const disabled = ref(false);

const totalPage = ref();
const pageIndex = ref(1);
const totalStudent = ref(0);

const searchString = ref('');
const dateFrom = ref('');
const dateTo = ref('');
const pageSize = ref(5);
const order = ref('');

watch(pageSize, () => {
  pageIndex.value = 1;
  getData();
});

const changeOrder = (val) => {
  order.value = val;
  getData();
};

const search = (val) => {
  searchString.value = val.value;
  pageIndex.value = 1;
  getData();

  setTimeout(() => {
    const notiString =
      totalStudent.value == 0
        ? 'Không tìm thấy sinh viên nào'
        : `Tìm thấy ${totalStudent.value} sinh viên`;
    createToast(notiString, {
      type: 'success',
    });
  }, 500);
};

const searchStudent = (studentId) => {
  editStudent.value = studentList.value.find((x) => x.maSv == studentId);
};

const add = async (student = new Student()) => {
  let dateString = convertDate(student.ngaySinh);

  await axios
    .post(`${API_URL}api/students`, {
      name: student.tenSv,
      birthdate: dateString,
      gender: student.gioiTinh == 'true' || student.gioiTinh == true,
      departmentId: student.khoa.maKhoa,
    })
    .then((res) => {
      createToast(`Thêm mới sinh viên thành công`, {
        type: 'success',
      });
      getData();
    })
    .catch((error) => console.log(error));
};

const edit = async (student = new Student()) => {
  await axios
    .put(`${API_URL}api/students/${student.maSv}`, {
      id: student.maSv,
      name: student.tenSv,
      birthdate: student.ngaySinh,
      gender: student.gioiTinh == 'true' || student.gioiTinh == true,
      departmentId: student.khoa.maKhoa,
      department: {
        departmentId: student.khoa.maKh,
        departmentName: student.khoa.tenKhoa,
        students: [],
      },
    })
    .then((res) => {
      createToast(`Cập nhật sinh viên mã ${student.maSv} thành công`, {
        type: 'success',
      });
      getData();
    })
    .catch((error) => console.log(error));
};

const removeSingle = async (studentId) => {
  await axios
    .delete(`${API_URL}api/students/${studentId}`)
    .then((res) => {
      createToast(`Xóa sinh viên mã ${studentId} thành công`, {
        type: 'success',
      });
      getData();
    })
    .catch((error) => {
      console.log(error);
    });
};

const removeMultiple = (studentIds = []) => {
  for (const stuId of studentIds) {
    removeSingle(stuId);
  }
};

const changePage = (page) => {
  pageIndex.value = page;
  getData();
};

const changeDateFrom = (fromDate) => {
  dateFrom.value = fromDate.value;
};

const changeDateTo = (toDate) => {
  dateTo.value = toDate.value;
};

const clearDateFilters = () => {
  dateFrom.value = '';
  dateTo.value = '';
};

provide('totalPage', { totalPage, changePage, searchString });

// provide to SearchStudents.vue
provide('date-from', { dateFrom, changeDateFrom });
provide('date-to', { dateTo, changeDateTo });

// provide to SearchStudents.vue
provide('date-clear', { clearDateFilters });

const getData = async () => {
  const data = [
    `search=${searchString.value}`,
    `fromDate=${dateFrom.value}`,
    `toDate=${dateTo.value}`,
    `order=${order.value}`,
    `page=${pageIndex.value}`,
    `pageSize=${pageSize.value}`,
  ];

  await axios
    .get(`${API_URL}api/Students?${data.join('&')}`)
    .then((res) => {
      studentList.value = studentBEToFE(res.data.students);
      totalPage.value = res.data.totalPage;
      totalStudent.value = res.data.totalStudent;
    })
    .catch((error) => console.log(error));
};

const studentBEToFE = (BEStudents) => {
  return BEStudents.map((s) => {
    return new Student(
      s.id,
      s.name,
      new Date(s.birthdate).toLocaleDateString('en-US'),
      s.gender,
      s.department.departmentId,
      s.department.departmentName,
    );
  });
};

onMounted(() => {
  getData();
});
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
</style>

<template>
  <div class="container">
    <button style="position: absolute">
      <select
        class="form-select"
        aria-label="Default select example"
        @change="changePageSize"
      >
        <option value="2">2</option>
        <option selected value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </button>

    <pagination-interface class="pagination" />

    <table class="table table-striped wrapper">
      <thead>
        <tr>
          <th class="remove-multiple">
            <button @click="removeMultiple">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </th>
          <th @click="handleStudentIdOrder">Mã sinh viên</th>
          <th @click="handleNameOrder">
            Tên sinh viên
            <font-awesome-icon
              :icon="['fas', 'arrow-down-long']"
              v-if="!nameOrderStatus"
            />
            <font-awesome-icon
              :icon="['fas', 'arrow-up-long']"
              v-if="nameOrderStatus"
            />
          </th>
          <th>Ngày sinh</th>
          <th>Giới tính</th>
          <th>Khoa</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <!-- replace tbody with transition-group vs tag tbody -->
      <transition-group name="list" tag="tbody">
        <tr v-for="student in props.mainListStudent" :key="student.maSv">
          <td style="text-align: center">
            <input-item
              type="checkbox"
              :id="student.maSv"
              @student-id="handleRemove"
            />
          </td>
          <td class="text-center">{{ student.maSv }}</td>
          <td>{{ student.tenSv }}</td>
          <td>{{ converDateFromMMDDYYYYToDDMMYYYY(student.ngaySinh) }}</td>
          <td>{{ genderCheck(student.gioiTinh) }}</td>
          <td>{{ student.khoa.tenKhoa }}</td>
          <td>
            <button @click="edit(student.maSv)">
              <font-awesome-icon :icon="['far', 'pen-to-square']" />
            </button>
          </td>
          <td>
            <button @click="remove(student.maSv)">
              <font-awesome-icon :icon="['far', 'trash-can']" />
            </button>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import PaginationInterface from './BaseComponents/PaginationInterface.vue';
import { converDateFromMMDDYYYYToDDMMYYYY } from '@/assets/js/utils';

const removeList = ref([]);
const nameOrderStatus = ref(false);
const studentIdOrder = ref(false);

const handleNameOrder = () => {
  if (!nameOrderStatus.value) {
    props.changeOrder('name_desc');
  } else {
    props.changeOrder('');
  }

  nameOrderStatus.value = !nameOrderStatus.value;
};

const handleStudentIdOrder = () => {
  if (!studentIdOrder.value) {
    props.changeOrder('student_id_asc');
  } else {
    props.changeOrder('student_id_desc');
  }
  studentIdOrder.value = !studentIdOrder.value;
};

const emits = defineEmits([
  'remove-single',
  'remove-multiple',
  'edit',
  'update:modelValue',
]);

const genderCheck = (gender) => (gender ? 'Nam' : 'Nữ');

const remove = (studentId) => {
  emits('remove-single', studentId);
};

const handleRemove = (val) => {
  const isRemove = removeList.value.includes(val);
  if (isRemove) {
    removeList.value = removeList.value.filter((x) => x != val);
  } else {
    removeList.value.push(val);
  }
};

const removeMultiple = () => {
  if (removeList.value.length && confirm('Xóa nhiều thế?')) {
    emits(
      'remove-multiple',
      removeList.value.map((x) => x.id),
    );
    removeList.value.map((x) => {
      x.checked = false;
    });
    removeList.value = [];
  }
};

const edit = (studentId) => emits('edit', studentId);

const changePageSize = (val) => emits('update:modelValue', val.target.value);

const props = defineProps({
  searchText: {
    type: String,
    default: null,
  },

  mainListStudent: {
    type: Object,
    default() {
      return [];
    },
  },

  modelValue: null,
  changeOrder: null,
});
</script>

<style scoped>
.container {
  position: relative;
  width: 750px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 50px;
  padding-top: 20px;
}

.wrapper {
  margin-top: 50px;
}

th {
  padding-right: 12px;
}

.pagination {
  position: absolute;
  right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

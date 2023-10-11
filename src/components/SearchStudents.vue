<template>
  <div class="mx-auto mb-5" style="width: 900px">
    <form action="" class="mx-auto row">
      <div class="position col-sm-11 d-flex align-items-center">
        <div class="row">
          <div class="row mb-3">
            <div class="col-sm-3"></div>
            <label-item class="col-sm-1" for="search" content="Tìm kiếm" />
            <div class="col-sm-6">
              <input-item
                class="form-control"
                ref="inputRef"
                id="search"
                name="search"
                placeholder="Tìm theo mã, tên sinh viên"
                v-model="inputSearch"
              />
              <button
                class="search-clear-btn"
                @click.prevent="clear"
                v-if="inputSearch"
              >
                <font-awesome-icon :icon="['far', 'circle-xmark']" />
              </button>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-1">
              <button
                class="btn btn-primary btn-sm"
                @click.prevent="clearFilters"
              >
                <font-awesome-icon :icon="['fas', 'filter-circle-xmark']" />
              </button>
            </div>
            <input-item type="date" class="col-sm-3" v-model="dateFrom" />
            <input-item type="date" class="col-sm-3" v-model="dateTo" />
            <select
              class="col-sm-2"
              :value="props.genderFilter"
              @change="$emit('gender-filter', $event.target.value)"
            >
              <option :value="props.genderFilter" disabled selected>
                Giới tính
              </option>
              <option value="1">Nam</option>
              <option value="0">Nữ</option>
            </select>
            <custom-select
              id="khoa"
              class="col-sm-3"
              :khoas="khoas"
              v-model="khoa"
              disabledOption="Chọn khoa"
              @select-khoa="
                (val) => {
                  $emit('update-khoa', val);
                }
              "
            />
          </div>
        </div>
      </div>

      <button-item class="search-btn col-sm-1" @onClick="search"
        >Tìm kiếm</button-item
      >
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits, inject, watch, defineProps, onMounted } from 'vue';
import { DEFAULT_DISABLED_GENDER, API_URL } from '@/assets/js/utils';
import axios from 'axios';
import Khoa from '@/assets/js/khoa';

const inputSearch = ref('');
const inputRef = ref();
const khoas = ref([]);
const khoa = ref(null);

// inject from App.vue
const { dateFrom, changeDateFrom } = inject('date-from');
const { dateTo, changeDateTo } = inject('date-to');
const { clearFilters } = inject('date-clear');

const emits = defineEmits(['input-search', 'gender-filter', 'update-khoa']);

const props = defineProps({
  genderFilter: {
    default: DEFAULT_DISABLED_GENDER,
  },
  khoa: {
    default: () => {},
  },
});

const getKhoaData = async () => {
  await axios
    .get(`${API_URL}api/departments`)
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

const search = () => {
  inputRef.value.inputRef.focus();
  emits('input-search', inputSearch);
};

function clear() {
  inputRef.value.inputRef.focus();
  inputSearch.value = '';
}

watch(dateFrom, () => changeDateFrom(dateFrom));
watch(dateTo, () => changeDateTo(dateTo));
watch(
  () => props.khoa,
  () => {
    khoa.value = khoas.value.find((kh) => kh.maKhoa === props.khoa);
  },
);

onMounted(() => getKhoaData());
</script>

<style scoped>
.position {
  position: relative;
}
.search-clear-btn {
  position: absolute;
  right: 95px;
  top: 3px;

  background: transparent;
}
</style>

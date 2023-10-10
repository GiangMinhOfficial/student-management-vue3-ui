import { createApp } from 'vue';
import App from './App.vue';
import router from './assets/js/router';

import 'bootstrap/dist/css/bootstrap.css';
global.jQuery = require('jquery');
require('bootstrap');

// Fontawasome
import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faPenToSquare,
  faTrashCan,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

import {
  faTrash,
  faFilterCircleXmark,
  faArrowDownLong,
  faArrowUpLong,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(
  faPenToSquare,
  faTrashCan,
  faCircleXmark,

  faTrash,
  faFilterCircleXmark,
  faArrowDownLong,
  faArrowUpLong,
  faPlus,
);

// base components
import InputItem from '@/components/BaseComponents/InputItem.vue';
import LabelItem from '@/components/BaseComponents/LabelItem.vue';
import ButtonItem from '@/components/BaseComponents/ButtonItem.vue';
import CustomSelect from '@/components/BaseComponents/CustomSelect.vue';
import CustomSpan from '@/components/BaseComponents/CustomSpan.vue';
import RadioButton from './components/BaseComponents/RadioButton.vue';

createApp(App)
  // base components
  .component('input-item', InputItem)
  .component('radio-button', RadioButton)
  .component('label-item', LabelItem)
  .component('button-item', ButtonItem)
  .component('custom-select', CustomSelect)
  .component('custom-span', CustomSpan)

  .component('font-awesome-icon', FontAwesomeIcon)

  .use(router)

  .mount('#app');

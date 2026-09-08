<template>
  <div class="course-card">
    <div class="course-info">
      <h3>ชื่อคอร์ส: {{ course.title || course.name }}</h3>
      <p>ราคา: {{ course.price }} บาท</p>
    </div>
    <!-- หากยังไม่กรอกชื่อ ปุ่ม "เพิ่มในรายการโปรด" จะไม่สามารถกดได้ -->
    <button
      @click="handleAddFavorite"
      :disabled="!isUsernameEntered || isFavorite"
    >
      {{ isFavorite ? "ถูกใจแล้ว ❤️" : "เพิ่มในรายการโปรด" }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
// TODO: import { useFavoriteStore } แล้วเขียนฟังก์ชันเพิ่มคอร์สลง store
import { useFavoriteStore } from "../stores/favorite";

// TODO: defineProps({ course: Object })
const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const favoriteStore = useFavoriteStore();

// ตรวจสอบว่าผู้ใช้กรอกชื่อหรือยัง
const isUsernameEntered = computed(() => {
  return !!favoriteStore.username && favoriteStore.username.trim().length > 0;
});

// ตรวจสอบว่าคอร์สนี้ถูกกดเป็นรายการโปรดแล้วหรือยัง
const isFavorite = computed(() => {
  return favoriteStore.favorites.some((item) => item.id === props.course.id);
});

const handleAddFavorite = () => {
  if (isUsernameEntered.value) {
    favoriteStore.addFavorite(props.course);
  }
};
</script>

<style scoped>
.course-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
  padding: 12px 16px;
  margin-bottom: 12px;
}

.course-info {
  text-align: left;
}

h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

p {
  margin: 4px 0 0 0;
  color: #555;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: #2c9c6d;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>

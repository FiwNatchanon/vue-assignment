<template>
  <div class="page-container">
    <h2>📋 Summary</h2>

    <!-- หากยังไม่มีข้อมูลชื่อผู้ใช้หรือยังไม่เลือกคอร์ส จะแสดงข้อความ "ยังไม่มีข้อมูลการเลือกคอร์ส" -->
    <div v-if="!hasCourseSelection" class="empty-state">
      <p>ยังไม่มีข้อมูลการเลือกคอร์ส</p>
    </div>

    <!-- ระบบแสดงชื่อผู้ใช้และจำนวนคอร์สที่ถูกใจ -->
    <div v-else class="summary-content">
      <!-- TODO: ดึง username และ favorites.length จาก store -->
      <p>ชื่อผู้ใช้: {{ favoriteStore.username }}</p>
      <p>จำนวนคอร์สที่ถูกใจ: {{ favoriteStore.favorites.length }}</p>

      <div v-if="favoriteStore.favorites.length > 0" class="favorites-list">
        <h3>รายการคอร์สที่ถูกใจ:</h3>
        <ul>
          <li v-for="course in favoriteStore.favorites" :key="course.id">
            {{ course.title || course.name }} ({{ course.price }} บาท)
          </li>
        </ul>
      </div>
    </div>

    <!-- มีลิงก์ "กลับไปหน้า Course" ที่สามารถกดเพื่อกลับไปหน้า / ได้ -->
    <div class="back-link-wrapper">
      <RouterLink to="/" class="back-link">กลับไปหน้า Course</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
// TODO: import { useFavoriteStore }
import { useFavoriteStore } from "../stores/favorite";

const favoriteStore = useFavoriteStore();

// ตรวจสอบเงื่อนไข: มีข้อมูลชื่อผู้ใช้ และ มีการเลือกคอร์สอย่างน้อย 1 คอร์ส
const hasCourseSelection = computed(() => {
  const hasUsername = !!favoriteStore.username && favoriteStore.username.trim().length > 0;
  const hasFavorites = favoriteStore.favorites && favoriteStore.favorites.length > 0;
  return hasUsername && hasFavorites;
});
</script>

<style scoped>
.page-container {
  text-align: center;
  padding: 40px 20px;
  max-width: 600px;
  margin: auto;
}
.empty-state {
  margin: 30px 0;
  color: #777;
  font-size: 18px;
}
.summary-content {
  margin: 24px 0;
  text-align: left;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
}
.summary-content p {
  font-size: 16px;
  margin: 8px 0;
}
.favorites-list {
  margin-top: 16px;
}
.favorites-list h3 {
  margin-bottom: 8px;
  font-size: 15px;
}
ul {
  padding-left: 20px;
}
li {
  margin-bottom: 6px;
}
.back-link-wrapper {
  margin-top: 24px;
}
.back-link {
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
}
.back-link:hover {
  text-decoration: underline;
}
</style>

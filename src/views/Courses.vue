<template>
  <div class="page-container">
    <header>
      <h2>📚 Course List</h2>
      <!-- TODO: แสดงจำนวนคอร์สที่ถูกใจจาก store -->
      <p>❤️ ถูกใจแล้ว {{ favoriteStore.favorites.length }} คอร์ส</p>
      <!-- ลิงก์ "ไปหน้า Summary" ที่สามารถกดเพื่อไปหน้า /summary ได้ -->
      <RouterLink to="/summary" class="summary-link">ไปหน้า Summary</RouterLink>
    </header>

    <div class="form-section">
      <label>ชื่อผู้ใช้:</label>
      <!-- TODO: v-model username -->
      <input
        v-model="favoriteStore.username"
        placeholder="กรอกชื่อของคุณ"
      />
    </div>

    <div class="course-list">
      <!-- TODO: Render CourseCard -->
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import CourseCard from "../components/CourseCard.vue";
// TODO: import axios
import axios from "axios";
// TODO: import { useFavoriteStore } จาก "../stores/favorite"
import { useFavoriteStore } from "../stores/favorite";

const courses = ref([]);
// TODO: ใช้ store เพื่อเข้าถึง username และ favorites
const favoriteStore = useFavoriteStore();

// TODO: ดึงข้อมูลจาก API ด้วย axios.get() แล้วเก็บใน courses
onMounted(async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    courses.value = response.data;
  } catch (error) {
    console.error("Error fetching courses from API:", error);
  }
});
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.summary-link {
  display: inline-block;
  margin-top: 8px;
  color: #42b883;
  text-decoration: none;
  font-weight: 500;
}
.summary-link:hover {
  text-decoration: underline;
}
.form-section {
  margin: 20px 0;
}
.form-section label {
  font-weight: 500;
  margin-right: 8px;
}
.form-section input {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 220px;
}
.course-list {
  margin-top: 24px;
}
</style>

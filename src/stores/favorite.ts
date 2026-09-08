import { defineStore } from "pinia";
import { ref } from "vue";

export interface Course {
  id: number;
  title: string;
  name?: string;
  price: number;
  [key: string]: any;
}

// TODO1: สร้าง store ชื่อ useFavoriteStore
// state:
//   username (string)
//   favorites (array)
// actions:
//   setUsername(name) → เก็บชื่อผู้ใช้
//   addFavorite(course) → เพิ่มคอร์สใน favorites

export const useFavoriteStore = defineStore("favorite", () => {
  const username = ref<string>("");
  const favorites = ref<Course[]>([]);

  const setUsername = (name: string) => {
    username.value = name;
  };

  const addFavorite = (course: Course) => {
    const exists = favorites.value.some((item) => item.id === course.id);
    if (!exists) {
      favorites.value.push(course);
    }
  };

  return {
    username,
    favorites,
    setUsername,
    addFavorite,
  };
});

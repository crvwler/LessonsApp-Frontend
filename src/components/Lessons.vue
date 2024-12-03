<template>
  <div>
    <!-- Sort Options -->
    <div class="mb-6 flex items-center space-x-4">
      <label for="sort-by" class="font-semibold">Sort By:</label>
      <select
        v-model="localSortBy"
        id="sort-by"
        class="p-2 border rounded-md"
        @change="onSortChange">
        <option value="subject">Subject</option>
        <option value="location">Location</option>
        <option value="price">Price</option>
        <option value="availableSpaces">Availability</option>
      </select>
      <button
        @click="toggleSortOrder"
        class="bg-gray-800 text-white px-4 py-2 rounded">
        Sort: {{ localSortOrder === "asc" ? "Ascending" : "Descending" }}
      </button>
    </div>
    <!-- Responsive Grid for Lessons -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="lesson in lessons"
        :key="lesson.id"
        class="bg-white rounded-md shadow-md flex flex-col items-start">
        <img
          :src="`http://localhost:5000${lesson.image}`"
          @error="item.image = require('../assets/default-placeholder.png')"
          alt="Lesson Image"
          class="w-full h-40 object-cover mb-4" />
        <div class="px-6 pb-4">
          <h2 class="text-xl font-semibold">Subject: {{ lesson.subject }}</h2>
          <p class="text-gray-700">Location: {{ lesson.location }}</p>
          <p class="text-gray-700">Price: £{{ lesson.price }}</p>
          <p class="text-gray-700">
            Available Spaces: {{ lesson.availableSpaces }}
          </p>
          <button
            :disabled="lesson.availableSpaces === 0"
            @click="$emit('add-to-cart', lesson)"
            class="bg-gray-800 text-white px-4 py-2 mt-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lessons", "sortBy", "sortOrder"],
  data() {
    return {
      localSortBy: this.sortBy,
      localSortOrder: this.sortOrder,
    };
  },
  methods: {
    toggleSortOrder() {
      this.localSortOrder = this.localSortOrder === "asc" ? "desc" : "asc";
      this.onSortChange();
    },
    onSortChange() {
      this.$emit("sort-change", {
        sortBy: this.localSortBy,
        sortOrder: this.localSortOrder,
      });
    },
  },
};
</script>

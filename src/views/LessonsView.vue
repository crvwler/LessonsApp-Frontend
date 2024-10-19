<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Available Lessons</h1>
      <p class="text-gray-600 mb-6">Select a lesson to add to your cart.</p>

      <!-- Sort Options -->
      <div class="mb-6 flex items-center space-x-4">
        <label for="sort-by" class="font-semibold">Sort By:</label>
        <select v-model="sortBy" id="sort-by" class="p-2 border rounded-md">
          <option value="subject">Subject</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
          <option value="availableSpaces">Spaces</option>
        </select>

        <!-- Ascending / Descending Toggle -->
        <button
          @click="toggleSortOrder"
          class="bg-blue-500 text-white px-4 py-2 rounded">
          Sort: {{ sortOrder === "asc" ? "Ascending" : "Descending" }}
        </button>
      </div>

      <!-- Responsive Grid for Lessons -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="lesson in sortedLessons"
          :key="lesson.id"
          class="bg-white p-6 rounded-md shadow-md flex flex-col items-start">
          <!-- Font Awesome Icon -->
          <i class="fas fa-book text-blue-500 text-3xl mb-4"></i>

          <!-- Lesson Details -->
          <h2 class="text-xl font-semibold">Subject: {{ lesson.subject }}</h2>
          <p class="text-gray-700">Location: {{ lesson.location }}</p>
          <p class="text-gray-700">Price: £{{ lesson.price }}</p>
          <p class="text-gray-700">
            Available Spaces: {{ lesson.availableSpaces }}
          </p>

          <!-- Add to Cart Button -->
          <button
            :disabled="lesson.availableSpaces === 0"
            @click="addToCart(lesson)"
            class="bg-blue-500 text-white px-4 py-2 mt-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
            Add to Cart
          </button>
        </div>
      </div>

      <!-- View Cart Button -->
      <div class="text-center mt-8">
        <button
          class="bg-green-500 text-white px-6 py-2 rounded"
          @click="viewCart">
          View Cart ({{ cart.length }} items)
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lessons",
  data() {
    return {
      // Initial lessons data
      lessons: [
        {
          id: 1,
          subject: "Mathematics",
          location: "London",
          price: 100,
          availableSpaces: 5,
        },
        {
          id: 2,
          subject: "English Literature",
          location: "Manchester",
          price: 80,
          availableSpaces: 5,
        },
        {
          id: 3,
          subject: "Physics",
          location: "Birmingham",
          price: 120,
          availableSpaces: 5,
        },
        {
          id: 4,
          subject: "Chemistry",
          location: "Leeds",
          price: 90,
          availableSpaces: 5,
        },
        {
          id: 5,
          subject: "Biology",
          location: "London",
          price: 110,
          availableSpaces: 5,
        },
        {
          id: 6,
          subject: "History",
          location: "Bristol",
          price: 85,
          availableSpaces: 5,
        },
        {
          id: 7,
          subject: "Geography",
          location: "Cambridge",
          price: 95,
          availableSpaces: 5,
        },
        {
          id: 8,
          subject: "Computer Science",
          location: "Oxford",
          price: 150,
          availableSpaces: 5,
        },
        {
          id: 9,
          subject: "Art",
          location: "Liverpool",
          price: 70,
          availableSpaces: 5,
        },
        {
          id: 10,
          subject: "Music",
          location: "Edinburgh",
          price: 60,
          availableSpaces: 5,
        },
        {
          id: 19,
          subject: "Law",
          location: "Oxford",
          price: 160,
          availableSpaces: 2,
        },
        {
          id: 20,
          subject: "Engineering",
          location: "Cambridge",
          price: 170,
          availableSpaces: 5,
        },
      ],
      cart: [], // Cart items
      sortBy: "subject", // Sort by default attribute
      sortOrder: "asc", // Default sorting order
    };
  },
  computed: {
    // Computed property to return sorted lessons
    sortedLessons() {
      return this.lessons.sort((a, b) => {
        let comparison = 0;
        if (this.sortBy === "price" || this.sortBy === "availableSpaces") {
          // Numeric comparison for price and availableSpaces
          comparison = a[this.sortBy] - b[this.sortBy];
        } else {
          // String comparison for subject and location
          comparison = a[this.sortBy].localeCompare(b[this.sortBy]);
        }
        // Reverse order for descending sort
        return this.sortOrder === "asc" ? comparison : -comparison;
      });
    },
  },
  methods: {
    addToCart(lesson) {
      const lessonInCart = this.cart.find(
        (cartLesson) => cartLesson.id === lesson.id
      );

      if (!lessonInCart) {
        if (lesson.availableSpaces > 0) {
          this.cart.push(lesson);
          lesson.availableSpaces--;
          alert(`${lesson.subject} has been added to your cart.`);
        } else {
          alert("Sorry, no spaces available for this lesson.");
        }
      } else {
        alert(`${lesson.subject} is already in your cart.`);
      }
    },
    viewCart() {
      alert(`You have added ${this.cart.length} lesson(s) to your cart.`);
    },
    // Toggle sorting order between ascending and descending
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    },
  },
};
</script>

<style scoped>
/* Add any additional custom styles if needed */
</style>

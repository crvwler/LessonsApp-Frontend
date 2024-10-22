<template>
  <div class="bg-gray-100 min-h-svh">
    <div
      class="lg:px-40 lg:pt-20 lg:flex p-10 space-y-8 lg:space-y-0 lg:space-x-8">
      <!-- Welcome Section -->
      <div class="p-8 bg-white rounded-xl shadow-md lg:w-2/5">
        <h1 class="text-3xl font-bold mb-4">Welcome, {{ username }}</h1>
        <p class="text-gray-600 mb-6">
          Your learning journey continues here. Get an overview of your progress
          and explore new lessons.
        </p>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Lessons
        </button>
      </div>

      <!-- User Details Card -->
      <div class="bg-white rounded-xl shadow-md p-8 lg:w-3/5">
        <h2 class="text-2xl font-semibold mb-6">Your Dashboard</h2>

        <!-- Progress Details -->
        <div class="grid grid-cols-1 gap-6">
          <!-- Total Cart Items -->
          <div class="p-4 border rounded-md shadow-sm">
            <h3 class="text-lg font-semibold">Items in Cart</h3>
            <p class="text-gray-700">{{ cartItems }} items</p>
          </div>

          <!-- User Account Info -->
          <div class="p-4 border rounded-md shadow-sm">
            <h3 class="text-lg font-semibold">Account Info</h3>
            <p class="text-gray-700">Email: {{ userEmail }}</p>
            <p class="text-gray-700">Member Since: {{ memberSince }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      username: "John Doe",
      lessonsInProgress: 2,
      completedLessons: 5,
      cartItems: 3,
      userEmail: "johndoe@gmail.com",
      memberSince: "October 2023",
    };
  },
};
</script>

<style scoped>
/* Add any specific styles here */
</style>

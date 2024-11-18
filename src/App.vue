<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

// Reactive states for dropdown visibility
const isDropdownOpen = ref(false);

// Function to toggle the dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Function to close the dropdown when clicking outside
const closeDropdown = (event) => {
  const dropdownElement = document.getElementById("user-dropdown");
  const buttonElement = document.getElementById("user-menu-button");

  if (
    dropdownElement &&
    !dropdownElement.contains(event.target) &&
    buttonElement &&
    !buttonElement.contains(event.target)
  ) {
    isDropdownOpen.value = false;
  }
};

// Set up the click listener when the component is mounted
onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <header>
    <nav
      class="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-50">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- Logo or Brand Name -->
        <RouterLink to="/">
          <span
            class="self-center text-lg font-bold whitespace-nowrap dark:text-white">
            LessonsApp
          </span>
        </RouterLink>

        <!-- User Profile & Hamburger Menu -->
        <div
          class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <!-- User Dropdown Button -->
          <button
            type="button"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="isDropdownOpen.toString()"
            @click="toggleDropdown">
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="./assets/avatar.svg"
              alt="user avatar" />
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 right-0 mt-64"
            id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">
                {Username}
              </span>
              <span
                class="block text-sm text-gray-500 truncate dark:text-gray-400">
                {username@gmail.com}
              </span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <RouterLink
                  to="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Settings
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/signout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sign out
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main content area where routed components will be displayed -->
  <RouterView />
</template>

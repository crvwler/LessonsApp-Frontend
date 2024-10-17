<script setup>
import { ref } from "vue";

// Define a reactive state for the dropdown visibility
const isDropdownOpen = ref(false);

// Function to toggle the dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<template>
  <header>
    <nav class="bg-white border-gray-200 dark:bg-gray-900 relative">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            @click="toggleDropdown">
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="./assets/avatar.jpg"
              alt="user photo" />
          </button>

          <!-- Dropdown menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 right-0 mt-64"
            id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white"
                >Username</span
              >
              <span
                class="block text-sm text-gray-500 truncate dark:text-gray-400"
                >username@gmail.com</span
              >
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

        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <RouterLink
                to="/"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page">
                Dashboard
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/lessons"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Lessons
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/cart"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Cart
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main content area where routed components will be displayed -->
  <RouterView />
</template>

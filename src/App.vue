<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// reactive states for the dropdown and mobile menu visibility
const isDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);

// Function to toggle the dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Function to toggle the mobile menu visibility
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
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
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- Logo or Brand Name -->
        <RouterLink to="/">
          <span
            class="self-center text-lg font-bold whitespace-nowrap dark:text-white">
            LessonsApp
          </span>
        </RouterLink>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

        <!-- User Profile & Hamburger Menu -->
        <div
          class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <!-- User Dropdown Button -->
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

          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 right-0 mt-64"
            id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white"
                >{Username}</span
              >
              <span
                class="block text-sm text-gray-500 truncate dark:text-gray-400"
                >{username@gmail.com}</span
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

          <!-- Hamburger Menu for Mobile -->
          <button
            @click="toggleMobileMenu"
            type="button"
            class="hamburger-button inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <!-- Navigation Links (for Desktop) -->
        <div
          :class="isMobileMenuOpen ? 'block' : 'hidden'"
          class="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-user">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <RouterLink
                to="/"
                class="block py-2 md:p-0 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
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

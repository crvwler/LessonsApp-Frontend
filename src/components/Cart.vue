<template>
  <div class="bg-gray-100 py-6">
    <div class="max-w-7xl mx-auto">
      <div v-if="cart.length === 0" class="text-gray-600 mb-6">
        <p class="text-gray-500">
          Your cart is empty. Add lessons to see them here!
        </p>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- Cart Items Section -->
        <div class="w-full lg:w-8/12 bg-white p-6 rounded-md shadow-md">
          <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
          <p class="text-gray-600 mb-6">These are the lessons in your cart.</p>

          <!-- Grid Layout for Cart Items -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div
              v-for="(item, index) in cart"
              :key="item.id"
              class="p-4 border rounded-md bg-white">
              <div class="flex gap-4">
                <img
                  :src="`http://localhost:5000${item.image}`"
                  @error="
                    item.image = require('@/assets/default-placeholder.jpg')
                  "
                  alt="Lesson Image"
                  class="w-24 h-38 object-cover rounded-md" />
                <div class="flex-1">
                  <h3 class="text-lg font-semibold">
                    Subject: {{ item.subject }}
                  </h3>
                  <p class="text-gray-700">Location: {{ item.location }}</p>
                  <p class="text-gray-700">Price: £{{ item.price }}</p>
                  <p class="text-gray-700">
                    Available Spaces: {{ item.availableSpaces }}
                  </p>
                  <button
                    @click="removeItem(index)"
                    class="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Total -->
          <div
            class="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
            <h2 class="text-lg font-medium">Total:</h2>
            <p class="text-lg font-semibold">£{{ totalPrice }}</p>
          </div>
        </div>

        <!-- Customer Details and Checkout Section -->
        <div class="w-full lg:w-4/12 bg-white p-6 rounded-md shadow-md">
          <h2 class="text-xl font-semibold mb-4">Customer Details</h2>
          <div>
            <label class="block text-lg font-semibold mb-2">Name:</label>
            <input
              v-model="name"
              type="text"
              class="border p-2 w-full rounded"
              placeholder="Enter your name"
              :class="{ 'border-red-500': !isNameValid && nameTouched }"
              @blur="nameTouched = true" />
            <p v-if="!isNameValid && nameTouched" class="text-red-500 text-sm">
              Name must contain letters only.
            </p>

            <label class="block text-lg font-semibold mt-4 mb-2">Phone:</label>
            <input
              v-model="phone"
              type="text"
              class="border p-2 w-full rounded"
              placeholder="Enter your phone number"
              :class="{ 'border-red-500': !isPhoneValid && phoneTouched }"
              @blur="phoneTouched = true" />
            <p
              v-if="!isPhoneValid && phoneTouched"
              class="text-red-500 text-sm">
              Phone must contain numbers only.
            </p>
          </div>

          <!-- Checkout Button -->
          <button
            :disabled="!isFormValid"
            @click="submitOrder"
            class="bg-green-500 text-white px-6 py-2 mt-6 w-full rounded hover:bg-green-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Toastify Toast Container -->
    <div class="toast-container" />
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { submitOrder } from "@/api/orderService"; // Import submitOrder function

export default {
  name: "Cart",
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      phone: "",
      orderSubmitted: false,
      nameTouched: false, // Flag to track if the user interacted with the name field
      phoneTouched: false, // Flag to track if the user interacted with the phone field
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price, 0);
    },
    isNameValid() {
      return /^[A-Za-z\s]+$/.test(this.name);
    },
    isPhoneValid() {
      return /^[0-9]+$/.test(this.phone);
    },
    isFormValid() {
      return this.isNameValid && this.isPhoneValid;
    },
  },
  methods: {
    async submitOrder() {
      try {
        const order = {
          name: this.name, // Ensure name is sent as expected
          phone: this.phone,
          lessonIDs: this.cart.map((item) => item.id),
          numberOfSpaces: this.cart.reduce(
            (sum, item) => sum + item.availableSpaces,
            0
          ),
        };
        await submitOrder(order);
        this.orderSubmitted = true;
        this.name = "";
        this.phone = "";
        this.nameTouched = false;
        this.phoneTouched = false;
        this.$emit("clear-cart");

        // Trigger success toast notification
        toast.success("Your order has been successfully submitted!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeButton: false,
        });
      } catch (error) {
        toast.error(
          "There was an error submitting your order. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeButton: false,
          }
        );
      }
    },
    removeItem(index) {
      this.$emit("remove-item", index);
    },
    clearCart() {
      this.cart = []; // Clear the cart in the parent
    },
    goBackToLessons() {
      this.$router.push("/"); // Navigate back to lessons page
    },
  },
};
</script>

<style scoped>
.toast-container {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>

<template>
  <div class="p-6 bg-gray-100 min-h-screen pt-28">
    <div class="max-w-7xl mx-auto">
      <!-- Conditionally Render Lessons or Cart -->
      <div v-if="!isCartView">
        <LessonsView
          :lessons="sortedLessons"
          :sort-by="sortBy"
          :sort-order="sortOrder"
          @sort-change="updateSort"
          @add-to-cart="addToCart" />
      </div>
      <div v-else>
        <Cart
          :cart="cart"
          @remove-item="removeFromCart"
          @clear-cart="clearCart" />
      </div>

      <!-- Toggle Cart/Lesson View Button -->
      <div class="text-center mt-8">
        <button
          class="bg-green-500 text-white px-6 py-2 rounded disabled:opacity-50"
          :disabled="!isCartView && cart.length === 0"
          @click="toggleCartView">
          {{
            isCartView ? "Back to Lessons" : `View Cart (${cart.length} items)`
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import LessonsView from "../components/Lessons.vue";
import Cart from "../components/Cart.vue";
import { fetchLessons } from "@/api/lessonsService";

export default {
  name: "Lessons",
  components: {
    LessonsView,
    Cart,
  },
  data() {
    return {
      lessons: [],
      cart: [],
      sortBy: "subject",
      sortOrder: "asc",
      isCartView: false,
    };
  },
  computed: {
    sortedLessons() {
      return this.lessons.sort((a, b) => {
        const comparison =
          this.sortBy === "price" || this.sortBy === "availableSpaces"
            ? a[this.sortBy] - b[this.sortBy]
            : a[this.sortBy].localeCompare(b[this.sortBy]);
        return this.sortOrder === "asc" ? comparison : -comparison;
      });
    },
  },
  methods: {
    async fetchLessonsData() {
      this.lessons = await fetchLessons();
    },
    addToCart(lesson) {
      if (lesson.availableSpaces > 0) {
        this.cart.push({ ...lesson });
        lesson.availableSpaces--;
        this.cart[this.cart.length - 1].lessonID = lesson.id;
        toast.success(`${lesson.subject} has been added to your cart.`, {
          autoClose: 1000,
        });
      } else {
        toast.warning("Sorry, no spaces available for this lesson.", {
          autoClose: 1000,
        });
      }
    },
    removeFromCart(index) {
      if (confirm("Are you sure you want to remove this lesson?")) {
        const removedItem = this.cart[index];
        const lesson = this.lessons.find(
          (lesson) => lesson.id === removedItem.id
        );
        if (lesson) lesson.availableSpaces++;
        this.cart.splice(index, 1);
        toast.info(`${removedItem.subject} has been removed from your cart.`, {
          autoClose: 1000,
        });
      }
    },
    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
      toast.success("Your cart has been cleared!", { autoClose: 2000 });
    },
    toggleCartView() {
      this.isCartView = !this.isCartView;
      this.$router.push({ name: this.isCartView ? "Cart" : "Lessons" });
    },
    updateSort({ sortBy, sortOrder }) {
      this.sortBy = sortBy;
      this.sortOrder = sortOrder;
    },
  },
  async mounted() {
    await this.fetchLessonsData();
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) this.cart = savedCart;
  },
  watch: {
    cart: {
      handler(newCart) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      },
      deep: true,
    },
  },
};
</script>

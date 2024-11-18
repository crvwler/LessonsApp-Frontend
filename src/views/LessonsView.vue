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
        <Cart :cart="cart" @remove-item="removeFromCart" />
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

// Images
import mathImg from "../assets/mathematics.jpg";
import englishImg from "../assets/english.jpg";
import physicsImg from "../assets/physics.jpg";
import chemistryImg from "../assets/chemistry.jpg";
import biologyImg from "../assets/biology.jpg";
import historyImg from "../assets/history.jpg";
import geographyImg from "../assets/geography.jpg";
import compsciImg from "../assets/computer.jpg";
import artImg from "../assets/art.jpg";
import musicImg from "../assets/music.jpg";
import peImg from "../assets/physicaleducation.jpg";
import philosophyImg from "../assets/philosophy.jpg";
import economicsImg from "../assets/economics.jpg";
import frenchImg from "../assets/french.jpg";
import psychologyImg from "../assets/psychology.jpg";

export default {
  name: "Lessons",
  components: {
    LessonsView,
    Cart,
  },
  data() {
    return {
      lessons: this.initializeLessons(),
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
    initializeLessons() {
      return [
        {
          id: 1,
          subject: "Mathematics",
          location: "London",
          price: 100,
          availableSpaces: 5,
          image: mathImg,
        },
        {
          id: 2,
          subject: "English Literature",
          location: "Manchester",
          price: 80,
          availableSpaces: 5,
          image: englishImg,
        },
        {
          id: 3,
          subject: "Physics",
          location: "Birmingham",
          price: 120,
          availableSpaces: 3,
          image: physicsImg,
        },
        {
          id: 4,
          subject: "Chemistry",
          location: "Liverpool",
          price: 110,
          availableSpaces: 2,
          image: chemistryImg,
        },
        {
          id: 5,
          subject: "Biology",
          location: "Bristol",
          price: 90,
          availableSpaces: 6,
          image: biologyImg,
        },
        {
          id: 6,
          subject: "History",
          location: "Leeds",
          price: 70,
          availableSpaces: 4,
          image: historyImg,
        },
        {
          id: 7,
          subject: "Geography",
          location: "Sheffield",
          price: 95,
          availableSpaces: 5,
          image: geographyImg,
        },
        {
          id: 8,
          subject: "Computer Science",
          location: "Nottingham",
          price: 130,
          availableSpaces: 3,
          image: compsciImg,
        },
        {
          id: 9,
          subject: "Art",
          location: "Brighton",
          price: 60,
          availableSpaces: 8,
          image: artImg,
        },
        {
          id: 10,
          subject: "Music",
          location: "Oxford",
          price: 150,
          availableSpaces: 4,
          image: musicImg,
        },
        {
          id: 11,
          subject: "Physical Education",
          location: "Cambridge",
          price: 85,
          availableSpaces: 7,
          image: peImg,
        },
        {
          id: 12,
          subject: "Philosophy",
          location: "Edinburgh",
          price: 100,
          availableSpaces: 3,
          image: philosophyImg,
        },
        {
          id: 13,
          subject: "Economics",
          location: "York",
          price: 115,
          availableSpaces: 2,
          image: economicsImg,
        },
        {
          id: 14,
          subject: "French",
          location: "Cardiff",
          price: 75,
          availableSpaces: 6,
          image: frenchImg,
        },
        {
          id: 15,
          subject: "Psychology",
          location: "Glasgow",
          price: 125,
          availableSpaces: 3,
          image: psychologyImg,
        },
      ];
    },
    addToCart(lesson) {
      if (lesson.availableSpaces > 0) {
        this.cart.push({ ...lesson });
        lesson.availableSpaces--;
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
    toggleCartView() {
      this.isCartView = !this.isCartView;
      this.$router.push({ name: this.isCartView ? "Cart" : "Lessons" });
    },
    updateSort({ sortBy, sortOrder }) {
      this.sortBy = sortBy;
      this.sortOrder = sortOrder;
    },
  },
};
</script>

app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
    template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <!-- image goes here -->
        <img v-bind:src="image" alt="sock-img">
      </div>
      <div class="product-info">
        <h1> {{ title }} </h1>
        <p> {{ sale }} </p>
        <p v-if="inStock">in stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">almost sold Out!</p>
        <p v-else>Out of stock</p>
        <p> shipping: {{ shipping }} </p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div v-for="(variant, index) in variants" 
        :key="variant.id" @mouseover="updateVariant(index)" 
        class="color-circle" :style="{ backgroundColor: variant.color }">
        {{}}
      </div>
        <button class="button" 
        :class="{'disabledButton': inStock === 0}" 
        v-on:click="addToCart">
          Add to cart
        </button>
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
    
  </div>`,
  data() {
    return {
        product: 'Socks',
        brand: "Vue Mastery",
        onSale : true,
        selectedVariant: 0,
        inventory: 1000,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            { id:2234, color: 'green', image: 'assets/images/socks_green.jpg', quantity:100 },
            { id:2235, color: 'blue', image: 'assets/images/socks_blue.jpg', quantity: 0 }
        ],
        reviews: []
    }
},
methods:{
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    updateVariant(index) {
        this.selectedVariant = index
        console.log(index)
    },
    addReview(review) {
      this.reviews.push(review)
    }
},
computed:{
    title() {
        return this.brand + "\n" + this.product
    },
    image() {
        return this.variants[this.selectedVariant].image
    },
    inStock() {
        return this.variants[this.selectedVariant].quantity
    },
    sale() {
        if (this.onSale) {
            return this.brand + " " + this.product + " " + "is on sale."
        }
        return ''
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return "2.99"
    }
}
})

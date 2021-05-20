
Vue.component ('cart',{
    data(){
        return {
            imgCart: 'https://placehold.it/50x100',
            searchLine: null,    
            inVisible: false,
            cartItem:[],
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
              .then(data => {
                if (data.result === 1) {
                  let find = this.cartItem.find(el => el.id_product === product.id_product);
                  if (find) {
                    find.quantity++;
                  } else {
                    let prod = {...product};
                    prod['quantity'] = 1;
                    this.cartItem.push(prod)
                  }
                } else {
                  alert('Error');
                }
              })
          },
        deleteCart(item){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
              if (data.result === 1) {
                if(item.quantity > 1){
                  item.quantity--;
                }else{
                  this.cartItem.splice(this.cartItem.indexOf(item),1)
                }
              }
            })
          }
        },     
        mounted(){
                this.$parent.getJson(`${API}/getBasket.json`)
            .then(data => {
                for (let item  of data.contents){
                this.cartItem.push(item);
                }
            });
        },
    template:`
    <div>
        <button class="btn-cart" type="button" @click= "inVisible=!inVisible" >Корзина</button>           
        <div :class="{visible: inVisible, invisible: !inVisible}">
               <p v-if="!cartItem.length">корзина пуста</p>
               <cart-item class="cart-item" 
                v-for="item of cartItem" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @deleteCart="deleteCart">
                </cart-item>
        </div>
    </div> `
});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
    <div class="cart-block_item">  
        <div class="cart-item">
            <img :src="img" alt="image">
            <div class="">
                <p class="">{{cartItem.product_name}}</p>
                <p class="">Количество: {{cartItem.quantity}}</p>
                <p class="">{{cartItem.price}}₽ за единицу</p>
            </div>
        </div>
        <div class="right-block">
            <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
            <button class="del-btn" @click="$emit('deleteCart', cartItem)">&times;</button>
        </div>
    </div>  `
  
});
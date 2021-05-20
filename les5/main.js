const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
   
    imgCatalog: 'https://placehold.it/200x150',
    imgCart: 'https://placehold.it/50x100',
    searchLine: null,    
    inVisible: false,
    cartItem:[],
    products: [],
    filtered:[],
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(result);
        })
    },
    addProduct(product){
        this.getJson(`${API}/addToBasket.json`)
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
    
    filterGoods(value){
      const regexp = new RegExp(value, 'i'); 
    this.filtered = this.products.filter(product => regexp.test(product.product_name));
    
    },
 
    deleteCart(item){
      this.getJson(`${API}/deleteFromBasket.json`)
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
  

  beforeCreate() {},
  created() {
    this.getJson(`${API }/catalogData.json`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
          this.filtered.push(el);
        }
      });
    this.getJson(`${API}/getBasket.json`)
      .then(data => {
        for (let item  of data.contents){
          this.cartItem.push(item);
        
        }
      });
  },
});

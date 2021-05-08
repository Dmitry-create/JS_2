const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    searchLine: null,
    filtered:[],
    inVisible: false

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
      console.log(product.id_product);
    },
    filterGoods(value){
      const regexp = new RegExp(value, 'i'); //
    this.filtered = this.products.filter(product => regexp.test(product.product_name));
    console.log(this.filtered )
    } 
  },
  
  beforeCreate() {},
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
  },
  beforeMount() {},
  mounted(){},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});

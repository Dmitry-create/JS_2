// class BusketItem { // класс генерации карточки товара в корзине
//     constructor(title, price, quantity) {
//       this.title = title;
//       this.price = price;
//       this.quantity = quantity;
//     }
//     render() {
//       return `<div class="busket">
//       <h3>${this.title}</h3>
//       <p>${this.price}</p>
//       <p>${this.quantity}</p>
//       </div>`;
//     }
//   }

// class BusketList{
//     constructor(){
//         this.arr = [];// массив приходящих товаров
    
//         this.renderBusket() //метод вывода карточек товара в HTML 
//         this.addBusket() //метод валидации приходящего товара, как и в прошлом курсе по сопастовлению id
//         this.clear()  // метод отчистки
//     }
// }
// не знаю правильно я понял задание или нет




class GoodsItem {
    constructor(title, price, id) {
      this.title = title;
      this.price = price;
      this.id = id;
    }
    render() {
      return `<div class="product">
      <h3>${this.title}</h3>
      <p>${this.price}</p>
     <button>купить</button>
      </div>`;
    }
  }
  

class GoodsList {
    constructor(contaner ='.products') {
        this.goods = [];
        this.sumGoods = [];
        this.contaner = contaner;
        

        this.fetchGoods();
        this.render();
        this.sumTake()
    }
   

    fetchGoods() {
      this.goods = [
        {id: 1, title: 'Notebook', price: 20000},
        {id: 2, title: 'Mouse', price: 1500},
        {id: 3, title: 'Keyboard', price: 5000},
        {id: 4, title: 'Gamepad', price: 4500},
      ];
    }
    render() {
      let block = document.querySelector(this.contaner);
      this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price, good.id);
      this.sumGoods.push(goodItem);
      block.insertAdjacentHTML('afterbegin', goodItem.render());
      });
    }
    sum() {
      return this.sumGoods.reduce ((acumulatore, currentValue) => 
      acumulatore + currentValue.price, 0);
      }
    sumTake() {
      let block = document.querySelector(this.contaner);
      block.insertAdjacentHTML('afterend', (`<p class=""> сумма ${this.sum()} рублей</p>` ));
       
    }
  }

  
const list = new GoodsList();



  
    
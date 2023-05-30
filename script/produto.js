function changeImage(imagePath) {
    document.getElementById('main-image').src = imagePath;
}

function decreaseQuantity() {
    var quantityInput = document.getElementById('quantity-input');
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
    }
}

function increaseQuantity() {
    var stock = 10;
    var quantityInput = document.getElementById('quantity-input');
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity < stock) {
        quantityInput.value = currentQuantity + 1;
    }
}

function buy() {
    var quantityInput = document.getElementById('quantity-input');
    var quantity = parseInt(quantityInput.value);
    // Lógica para realizar a compra do produto
    alert('Compra realizada com sucesso!');
}

var header = document.getElementById('top');
var lastScrollPosition = 0;

window.addEventListener('scroll', function() {
  var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScrollPosition > lastScrollPosition) {
    // Scroll para baixo
    header.classList.add('small');
    document.body.classList.add('scroll-down');
  } else {
    // Scroll para cima
    header.classList.remove('small');
    document.body.classList.remove('scroll-down');
  }
  
  lastScrollPosition = currentScrollPosition;
});

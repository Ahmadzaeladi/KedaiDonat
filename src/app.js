document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Paket 12 Donuts",
        img: "12 dnt.webp",
        price: 113850,
      },
      {
        id: 2,
        name: "Pake 6 Donuts",
        img: "6dnt.webp",
        price: 63250,
      },
      {
        id: 3,
        name: "Donuts Fany",
        img: "fncy.webp",
        price: 18150,
      },
      {
        id: 4,
        name: "Sandwich Toast",
        img: "toast.jpg",
        price: 53900,
      },
      {
        id: 5,
        name: "Colatta Cappuccino",
        img: "col_cappuccino.webp",
        price: 45100,
      },
      {
        id: 6,
        name: "Colatta Dark Choco",
        img: "col_darkchoco.webp",
        price: 45100,
      },
      {
        id: 7,
        name: "Colatta Strawberry",
        img: "col_strawberry.webp",
        price: 45100,
      },
      {
        id: 8,
        name: "Brown Sugar Coffee",
        img: "bs2.jpg",
        price: 35200,
      },
      {
        id: 9,
        name: "Piccolo Latte + Donuts",
        img: "piccolo.jpg",
        price: 35200,
      },
      {
        id: 10,
        name: "Strawbery Cheese Cake Latte",
        img: "strawberry_cake.jpg",
        price: 45100,
      },
      {
        id: 11,
        name: "Pallu Butung Latte",
        img: "palu.jpg",
        price: 45100,
      },
      {
        id: 12,
        name: ">Hojicha",
        img: "hojicha.jpg",
        price: 34100,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // mengecek barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // jika belum ada
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, tambah quantity dan totalnya
        cartItem.quantity++;
        cartItem.total = cartItem.price * cartItem.quantity;
        this.quantity++;
        this.total += newItem.price;
      }
    },
    remove(id) {
      // ambil index item yang diremove berdasarkan id
      const index = this.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        const cartItem = this.items[index];
        // jika item lebih dari satu
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
          cartItem.total = cartItem.price * cartItem.quantity;
        } else {
          // jika barang sisa satu atau kurang, hapus dari keranjang
          this.items.splice(index, 1);
        }
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  let allInputsFilled = true;
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length === 0) {
      allInputsFilled = false;
      break;
    }
  }
  if (allInputsFilled) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove("disabled");
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add("disabled");
  }
});

// kirim data ketika tombol checkout di klik
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // const message = formatMessage(objData);
  // window.open("http://wa.me/6285175274852?text=" + encodeURIComponent(message));

  // transaction token menggunakan ajax
  try {
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data,
    });
    const token = await response.text();
    console.log(token);
    // window.snap.pay('TRANSACTION_TOKEN_HERE');
  } catch (err) {
    console.log(err.message);
  }
});

const formatMessage = (obj) => {
  return `Data Customer
  Nama:${obj.nama}
  Email:${obj.email}
  No HP:${obj.phone}
Data Pesanan
  ${JSON.parse(obj.items).map(
    (item) => `${item.name}(${item.quantity} x ${rupiah(item.total)})\n`
  )}
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih.`;
};

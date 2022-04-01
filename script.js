// db declaration
let
akun = localStorage.getItem('akun') ? tampilkanData('akun') : 
[{nama: 'admin123', password: 'admin123', status: 'owner', path: 'asset/img/ramen-noodle-japanese-food-flat_123553-338.webp', last: '[New]'}],
produk = localStorage.getItem('produk') ? tampilkanData('produk') : 
[
    // Dummy
    {
        id: 'mn001',
        nama: 'ramen goreng cabe merah',
        kategori: 'makanan',
        harga: [15000, 17000, 19000],
        path: 'asset/img/ramen_goreng_cabe_merah.webp'
    },
    {
        id: 'mn002',
        nama: 'ramen goreng original',
        kategori: 'makanan',
        harga: [15000, 17000, 19000],
        path: 'asset/img/ramen_goreng_original.webp'
    },
    {
        id: 'mn003',
        nama: 'ramen karage',
        harga: [16000, 18000, 20000],
        path: 'asset/img/ramen_karage.webp',
        kategori: 'makanan',
    },
    {
        id: 'mn004',
        kategori: 'makanan',
        nama: 'ramen kuah ayam kecap',
        harga: [16000, 18000, 20000],
        path: 'asset/img/ramen_kuah_ayam_kecap.webp'
    },
    {
        id: 'mn005',
        nama: 'ramen kuah jamur',
        kategori: 'makanan',
        harga: [13000, 15000, 17000],
        path: 'asset/img/ramen_kuah_jamur.webp'
    },
    {
        id: 'mn006',
        kategori: 'makanan',
        nama: 'sushi wijen',
        harga: [4000, 6000, 8000],
        path: 'asset/img/sushi_wijen.webp'
    },
    {
        id: 'mn007',
        nama: 'sushi salmon',
        harga: [7000, 9000, 11000],
        kategori: 'makanan',
        path: 'asset/img/sushi_salmon.webp'
    },
    {
        id: 'mn008',
        kategori: 'minuman',
        nama: 'teh hijau jepang',
        harga: [8000, 10000, 12000],
        path: 'asset/img/teh_hijau_jepang.webp'
    },
],
trans = localStorage.getItem('trans') ? tampilkanData('trans') : [],
history = localStorage.getItem('history') ? tampilkanData('history') : [],
tax = localStorage.getItem('tax') ? tampilkanData('tax') : 0.1

// DOM Elements
const
nav = document.querySelectorAll('nav div'),
fitur = document.querySelectorAll('section.content div#content'),
logout = document.querySelector('div.logout'),
off = document.querySelector('div.off')

// POS
searchMenu = document.querySelector('div.search input'),
searchList = document.querySelector('div.search datalist'), 
filterMenu = document.querySelectorAll('div.category button'),
filterCheck = document.querySelectorAll('div.category button img'),
tblBayar = document.querySelector('.pay'),
tblReset = document.querySelector('.reset'),
tblAll = document.querySelector('button.all'),
tblFood = document.querySelector('button.food'),
tblDrink = document.querySelector('button.drink'),
contResult = document.querySelector('div.result'),
infoResult = document.querySelector('.info-result'),
contOrder = document.querySelector('div.bills'),
inputCash = document.querySelector('input.cash'),

// Menu
upImg = document.querySelector('input[type = file]'),
addImg = document.querySelector('figure span'),
addName = document.querySelector('input.add-name'),
addType = document.querySelectorAll('div.add-type p input'),
addPrice = document.querySelectorAll('div.add-price input'),
saveNew = document.querySelector('.save-new'),
contListMenu = document.querySelector('div.change-menu'),
taxRule = document.querySelector('div.tax-rule input'),
selectType = document.querySelector('select.add-type'),
selectMenu = document.querySelector('select.list-menu'),

// Chart
selectChart = document.querySelector('select.select-chart'),
dateInput = document.querySelectorAll('input.date-input'),
ctx = document.querySelector('canvas.chart').getContext('2d'),

// History
dialogForm = document.querySelector('div.dialog-form'),
closeDialog = document.querySelector('div.dialog-exit'),
addUser = document.querySelector('button.add-user'),
upPic = document.querySelector('input.add-pic'),
addPic = document.querySelector('span.add-pic'),
inputUser = document.querySelector('input.username-acc'),
inputNewPass = document.querySelector('input.new-password'),
inputConPass = document.querySelector('input.confirm-password'),
vNewPass = document.querySelector('div.new-password'),
vConPass = document.querySelector('div.confirm-password'),
dialogSave = document.querySelector('.dialog-save'),
selectAcc = document.querySelector('select.status-acc'),
userList = document.querySelector('div.user-list'),
listHistory = document.querySelector('div.list-history-login'),
dateHistory = document.querySelector('input.date-history'),

// Login
vUsername = document.querySelector('div.login-username'),
vPassword = document.querySelector('div.login-password'),
loginUser = document.querySelector('div.username input'),
loginPass = document.querySelector('div.password input'),
loginBtn = document.querySelector('div.login button'),
loginPage = document.querySelector('div.login'),

// Loading Screen
loading = document.querySelector('.loading'),
circle = document.querySelector('.big-circle'),
tinyCircle = document.querySelectorAll('.circle')

let 
sub = 0, 
pajak = 0, click = '', edit = 0
orderan = [], 
bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November", "Desember"]

const 
ambilTgl = () => {
    if((new Date().getMonth()+1) < 10) {
        if((new Date().getDate() < 10)) {
            return `${new Date().getFullYear()}-0${new Date().getMonth()+1}-0${new Date().getDate()}`
        }
        else {
            return `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`
        }
    }

    else {
        if((new Date().getDate() < 10)) {
            return `${new Date().getFullYear()}-${new Date().getMonth()+1}-0${new Date().getDate()}`
        }
        else {
            return `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
        }
    }
}

hitungTotal = e => e.reduce((a, z) => a + z)

hitungRata = e => e = Math.round((e.reduce((a, z) => a + z)) / e.length)

simpanData = (keyName, data) => localStorage.setItem(keyName, data)

hapusDB = (keyName) => localStorage.removeItem(keyName)

resetData = (keyName) => localStorage.clear(keyName)

function tampilkanData(keyName) {
    return JSON.parse(localStorage.getItem(keyName))
}

ubahFormatTgl = tanggal => {
    tanggal = tanggal.split("-")
    let [y, m, d] = tanggal
    return [d, m, y].join("-")
}

kodeGenerator = tipeKode => {
    hasil = ''
    counter = localStorage.getItem('counter') && (tampilkanData('now') == ambilTgl()) ? tampilkanData('counter') : 0
    now = localStorage.getItem('now') && (tampilkanData('now') == ambilTgl()) ? tampilkanData('now') : ambilTgl()

    if(tipeKode === 'akun') {
        hasil = 'us'+ubahFormatTgl(ambilTgl()).split('-').join('')+counter
    }

    else if(tipeKode === 'menu') {
        hasil = 'mn'+ubahFormatTgl(ambilTgl()).split('-').join('')+counter
    }

    else if(tipeKode === 'transaksi') {
        hasil = 'tr'+ubahFormatTgl(ambilTgl()).split('-').join('')+counter
    }
    
    else {
        console.log('parameter hanya bernilai akun, menu, dan transaksi')
    }
    counter++
    simpanData('now', JSON.stringify(now))
    simpanData('counter', JSON.stringify(counter))

    return hasil
}

function updateData(db, uniqueKeyValue, newData) {
    db.forEach((e, i) => {
        if(e.id === uniqueKeyValue) {
            db.fill(newData, i, i+1)
        }
    })
}

function hapusData(db, uniqueKeyValue) {
    db.forEach((e, i) => {
        if(e.id === uniqueKeyValue) {
            db.splice(i, 1)
        }
    })
}

function cariNama(db, keyWord) {return db.filter(e => e.nama.includes(keyWord))}

function tambahData(db, data) {db.push(data)}

function keHurufKecil(db) {db.map( e => e.nama = e.nama.toLowerCase())}

function gantiGambar(tagImage, path) {
    path = path.split('\\')
    path = path[path.length-1]
    tagImage.style.backgroundImage = `url(asset/img/${path})`
    tagImage.style.backgroundSize = 'cover'
}

function ambilPath(path) {
    path = path.split('\\')
    path = path[path.length-1]
    return `asset/img/${path}`
}

function urutkanPerKategori(db, rules) {
    switch (rules) {
        case 'a-z':
            db.sort((a, b) => (a.kategori > b.kategori) ? 1 : ((b.kategori > a.kategori) ? -1 : 0))
            break
        
        case 'z-a':
            db.sort((a, b) => (a.kategori < b.kategori) ? 1 : ((b.kategori < a.kategori) ? -1 : 0))
            break
                
        default:
            console.log('Parameter hanya bernilai a-z atau z-a')
            break
    }
    return db
}

function urutkanPerNama(db, rules) {
    switch (rules) {
        case 'a-z':
            db.sort((a, b) => (a.nama > b.nama) ? 1 : ((b.nama > a.nama) ? -1 : 0))
            break
        
        case 'z-a':
            db.sort((a, b) => (a.nama < b.nama) ? 1 : ((b.nama < a.nama) ? -1 : 0))
            break
                
        default:
            console.log('Parameter hanya bernilai a-z atau z-a')
            break
    }
    return db
}

function urutkanPerHarga(db, rules) {
    switch (rules) {
        case 'a-z':
            db.sort((a, b) => parseFloat(a.harga) - parseFloat(b.harga))
            break

        case 'z-a':
            db.sort((a, b) => parseFloat(b.harga) - parseFloat(a.harga))
            break

        default:
            console.error('Argumen hanya bernilai a-z atau z-a')
        break
    }
    return db
}

function cekDuplikatPath(db, path) {
    hasil = db.filter(e => e.path == path)
    return (hasil.length != 0) ? true : false  
}

function cekDuplikatNama(db, nama) {
    hasil = db.filter(e => e.nama == nama)
    return (hasil.length != 0) ? true : false
}

function loadingScreen(mode, type) {
    if(mode == 'on') {
        loading.classList.remove('hide')
        if(type == 1) {
            circle.classList.remove('hide')
            tinyCircle[0].classList.add('hide')
            tinyCircle[1].classList.add('hide')
            tinyCircle[2].classList.add('hide')
            setInterval(() => {
            circle.classList.toggle('spin')
            }, 500)
        }
        else if(type == 2) {
            tinyCircle[0].classList.remove('hide')
            tinyCircle[1].classList.remove('hide')
            tinyCircle[2].classList.remove('hide')
            circle.classList.add('hide')
            setInterval(() => {
                tinyCircle[0].classList.toggle('big')
                tinyCircle[1].classList.toggle('big')
            }, 200)
            setInterval(() => {
                tinyCircle[1].classList.toggle('big')
                tinyCircle[2].classList.toggle('big')
            }, 600)
            setInterval(() => {
                tinyCircle[2].classList.toggle('big')
                tinyCircle[0].classList.toggle('big')
            }, 400)
        }
        else {
            console.error('Kesalahan memasukkan type.')
        }
    }
    else if(mode == 'off') {
        loading.classList.add('hide')
    }
    else {
        console.error('Kesalahan memasukkan mode.')
        loading.classList.add('hide')
    }
}

window.addEventListener('load', () => {
    loadingScreen('off')
    nav[0].classList.add('change')
    fitur[0].style.zIndex = 1
    // POS
    tblAll.setAttribute('id', 'filter')
    filterCheck[0].classList.remove('hide')
    result = urutkanPerKategori(produk, 'a-z')
    renderMenu()
})

logout.addEventListener('click', () => {
    if(confirm('Apakah yakin ingin keluar?')) {
        loginPage.style.display = 'flex'
        dialogForm.setAttribute('id', 'remove')
        resetDialog()
        nav[1].classList.remove('lost')
        nav[3].classList.remove('lost')
        fitur[1].classList.remove('hide')
        fitur[3].classList.remove('hide')
    }
})

off.addEventListener('click', () => {
    if(confirm('Apakah yakin ingin keluar?')) {
        loginPage.style.display = 'flex'
    }
})

nav[0].addEventListener('click', () => {
    tblAll.setAttribute('id', 'filter')
    filterCheck[0].classList.remove('hide')
    result = []
    result = urutkanPerKategori(produk, 'a-z')
    renderMenu()
    filterMenu.forEach((e, i) => {
        if(e != filterMenu[0]) {
            e.removeAttribute('id')
            filterCheck[i].classList.add('hide')
        }
    })
})

nav[1].addEventListener('click', () => {
    if(localStorage.getItem('tax')) {
        taxRule.setAttribute('placeholder', `${tampilkanData('tax') * 100}`)
    }
    else {
        taxRule.setAttribute('placeholder', `${tax * 100}`)
    }
    result = urutkanPerKategori(produk, 'a-z')
    renderListMenu()
    selectMenu.value = 'semua'
})

nav[2].addEventListener('click', () => {
    showChartList()
    label = `Penjualan Bulan ${bulan[parseFloat(new Date().getMonth())]} ${new Date().getFullYear()}`
    renderChart(trans, `${new Date().getFullYear()}-${new Date().getMonth()+1}-1`, `${new Date().getFullYear()}-${new Date().getMonth()+1}-31`)
})

nav[3].addEventListener('click', () => {
    renderAcc()
    dateHistory.value = ambilTgl()
    result = history.filter(e => e.tgl == dateHistory.value)
    renderLogin()
})

nav.forEach((e, i) => {
    e.addEventListener('click', () => {
        fitur[i].style.zIndex = '1'
        nav[i].classList.add('change')
        click = fitur[i]
        fitur.forEach((e, i) => {
            if(e != click) {
                e.style.zIndex = '-1'
                nav[i].classList.remove('change')
            }
        })
    })
})

filterMenu.forEach((e, i) => {
    e.addEventListener('click', () => {
        filterMenu[i].setAttribute('id', 'filter')
        filterCheck[i].classList.remove('hide')
        click = filterMenu[i]
        filterMenu.forEach((e, i) => {
            if(e != click) {
                e.removeAttribute('id')
                filterCheck[i].classList.add('hide')
            }
        })
    })
})

function renderMenu() {
    hasil = ''
    infoResult.innerHTML = `${result.length} hasil ditemukan`
    if(result.length == 0) contResult.innerHTML = 
    '<p style="width: 100%; height: 50%; display: grid; place-items: center";>Daftar menu yang dicari tidak tersedia :(</p>'
    else {
        result.map((e) => {
            hasil += 
                `<div class="card-result">
                    <div class="gambar-menu">
                        <img class="img-menu" style="background-image: url(${e.path});">
                    </div>
                    <p class="title-menu">${e.nama}</p>
                    <div class="size">
                        <p class="p-size">Ukuran:</p>
                        <button class="S">S</button>
                        <button class="M">M</button>
                        <button class="L">L</button>
                    </div>
                    <div class="price-menu">
                        <p class="h-price-menu">Harga:</p>
                        <p class="price-menu">Rp0,00</p>
                    </div>
                        <div class="menu-footer">
                        <button class="add-bill confirm">Tambah</button>
                    </div>
                </div>`
        })
            contResult.innerHTML = hasil
            size = document.querySelectorAll('div.size button')
            tambahBill = document.querySelectorAll('.add-bill')
            priceMenu = document.querySelectorAll('p.price-menu')
            sizeS = document.querySelectorAll('button.S')
            sizeM = document.querySelectorAll('button.M')
            sizeL = document.querySelectorAll('button.L')
            size.forEach((e, i) => {
                e.addEventListener('click', () => {
                    size[i].setAttribute('id', 'filter')
                    click = size[i]
                    size.forEach((e) => {
                        if(e != click) {
                            e.removeAttribute('id')
                        }
                    })
                })
            })
            tambahBill.forEach((e, i) => {
                choose = 0
                sizeChoose = ''
                sizeS[i].addEventListener('click', () => {
                    priceMenu[i].innerHTML = `Rp${result[i].harga[0].toLocaleString('en-US').split(',').join('.')},00`
                    click = result[i]
                    choose = click.harga[0]
                    sizeChoose = '(S)'
                    resetHargaMenu()
                })
                sizeM[i].addEventListener('click', () => {
                    priceMenu[i].innerHTML = `Rp${result[i].harga[1].toLocaleString('en-US').split(',').join('.')},00`
                    click = result[i]
                    choose = click.harga[1]
                    sizeChoose = '(M)'
                    resetHargaMenu()
                })
                sizeL[i].addEventListener('click', () => {
                    priceMenu[i].innerHTML = `Rp${result[i].harga[2].toLocaleString('en-US').split(',').join('.')},00`
                    click = result[i]
                    choose = click.harga[2]
                    sizeChoose = '(L)'
                    resetHargaMenu()
                })
                e.addEventListener('click', () => {
                    e.classList.remove('confirm')
                    setTimeout(() => e.classList.add('confirm'), 100)
                    if(priceMenu[i].textContent == 'Rp0,00') {
                        alert(`Ukuran ${result[i].nama} belum terpilih.`)
                    }
                    else {
                        if(orderan.length == 0) {
                            orderan.push({
                                id: click.id, 
                                path: click.path, 
                                nama: click.nama, 
                                harga: choose, 
                                qty: 1, 
                                size: sizeChoose
                            })
                        }
                        else {
                            idxSama = orderan.findIndex(e => e.id == click.id && e.harga == choose)
                            bedaUkuran = orderan.filter(e => e.id == click.id && e.harga != choose)
                            baru = orderan.every((e) => e.id != click.id)
                            if(orderan.some((e) => e.id == click.id && e.harga == choose)) {
                                orderan[idxSama].qty++
                            }
                            else if(orderan.some((e) => e.id == click.id && e.harga != choose)) {
                                if(bedaUkuran.every((e) => e.harga != choose)) {
                                    orderan.push({
                                        id: click.id, 
                                        path: click.path, 
                                        nama: click.nama, 
                                        harga: choose, 
                                        qty: 1, 
                                        size: sizeChoose
                                    })
                                }
                                else {
                                    orderan[bedaUkuran.findIndex(e => e.harga == choose)].qty++
                                }
                            }
                            else if(baru) {
                                orderan.push({
                                    id: click.id, 
                                    path: click.path, 
                                    nama: click.nama, 
                                    harga: choose, 
                                    qty: 1, 
                                    size: sizeChoose
                                })
                            }
                        }
                    }
                    renderOrder()
                    hitungBills()
                })
            })
        }
}

function hitungBills() {
    subtotal = []
    orderan.forEach(e => {
        subtotal.push(e.qty * e.harga)
    })
    sub = hitungTotal(subtotal)
    pajak = parseFloat(sub) * parseFloat(tax)
    if(orderan.length > 0) {
        document.querySelector('p.subtotal-value').innerHTML = `Rp${(sub).toLocaleString('en-US').split(',').join('.')},00`
        document.querySelector('p.tax-value').innerHTML = `Rp${(pajak).toLocaleString('en-US').split(',').join('.')},00`
        document.querySelector('p.total-value').innerHTML = `Rp${(sub + pajak).toLocaleString('en-US').split(',').join('.')},00`
    }
    else {
        document.querySelector('p.subtotal-value').innerHTML = `Rp0,00`
        document.querySelector('p.tax-value').innerHTML = `Rp0,00`
        document.querySelector('p.total-value').innerHTML = `Rp0,00`
    }
}

function showList() {
    hasil = ''
    result.map(e => {
        hasil += `<option>${e.nama}</option>`
    })
    searchList.innerHTML = hasil
}

function renderOrder() {
    bills = ''
    orderan.map((e) => {
        bills += 
            `<div class="order">
                <span src="" class="img-order" style="background-image: url(${e.path});"></span>
                <div class="title-order">${e.nama}</div>
                <p class="sum-order">${e.qty} pcs ${e.size}</p>
                <p class="price-order">Rp${e.harga.toLocaleString('en-US').split(',').join('.')},00</p>
                <button class="delete-order"></button>
            </div>`
    })
    contOrder.innerHTML = bills
    del = document.querySelectorAll('button.delete-order')
    orderan.forEach((e, i) => {
        del[i].addEventListener('click', () => {
            orderan.splice(i, 1)        
            renderOrder()
            if(orderan.length != 0) hitungBills()          
            else {
                resetValue()
            }
        })
    })
}

inputCash.addEventListener('change', () => {
    if(parseFloat(inputCash.value) < (sub + pajak) || inputCash.value == '') {
        alert('Maaf, jumlah pembayaran tidak mencukupi :(')
    }
    else {
        document.querySelector('p.return-value').innerHTML = `Rp${(parseFloat(inputCash.value) - (sub + pajak)).toLocaleString('en-US').split(',').join('.')},00`
    }
})

function resetHargaMenu() {
    result.forEach((e, i) => {
        if(click != e) {
            priceMenu[i].innerHTML = 'Rp0,00'
        }
    })
}

closeDialog.addEventListener('click', () => {
    dialogForm.setAttribute('id', 'remove')
    resetDialog()
})

function resetDialog() {
    upPic.value = ''
    addPic.style.backgroundImage = 'url(asset/icons/add_photo_alternate_white_48dp.svg)'
    addPic.style.backgroundSize = 'auto'
    inputUser.value = ''
    inputNewPass.value = ''
    inputConPass.value = ''
    dialogSave.style.backgroundColor = '#a3bbc8'
    dialogSave.setAttribute('disabled', true)
}

upPic.addEventListener('change', () => {
    if(cekDuplikatPath(produk, ambilPath(upPic.value))) {
        alert('Gambar sudah pernah digunakan.')
        upPic.value = ''
    }
    else if(cekDuplikatPath(akun, ambilPath(upPic.value))) {
        alert('Gambar sudah pernah digunakan.')
        upPic.value = ''
    }
    else if(upPic.value == '') {
        addPic.style.backgroundImage = 'url(asset/icons/add_photo_alternate_white_48dp.svg)'
        addPic.style.backgroundSize = 'auto'
    }
    else {
        gantiGambar(addPic, upPic.value)
    }
    dialogValidasi()
})

inputUser.addEventListener('change', () => {
    if(cekDuplikatNama(akun, inputUser.value)) {
        alert('Username sudah pernah digunakan :)')
    }
    dialogValidasi()
})

selectAcc.addEventListener('change', () => {
    dialogValidasi()
})

inputNewPass.addEventListener('change', () => {
    dialogValidasi()
})

inputConPass.addEventListener('change', () => {
    dialogValidasi()
})

addUser.addEventListener('click', () => {
    dialogForm.removeAttribute('id')
})

dialogSave.addEventListener('click', () => {
    if(confirm('Apakah yakin ingin menyimpan akun?')) {
        dialogSave.classList.remove('confirm')
        setTimeout(() => dialogSave.classList.add('confirm'), 100)
        tambahData(akun, {
            nama: inputUser.value.toLowerCase(),
            status: selectAcc.value,
            password: inputNewPass.value,
            path: ambilPath(upPic.value),
            last: '[New]'
        })
        simpanData('akun', JSON.stringify(akun))
        loadingScreen('on', 2)
        alert('Data berhasil disimpan!')
        setTimeout(() => {
            loadingScreen('off')
            renderAcc()
            resetDialog()
        }, 500)
    }
})

function resetHargaList() {
    result.forEach((e, i) => {
        if(click != e) {
            priceList[i].innerHTML = 'Rp0,00'
        }
    })
}

searchMenu.addEventListener('input', () => {
    filterMenu.forEach((e, i) => {
        e.removeAttribute('id')
        filterCheck[i].classList.add('hide')
    })
    setTimeout(() => {
        result = cariNama(urutkanPerNama(produk, 'a-z'), searchMenu.value.toLowerCase())
        showList()
        loadingScreen('on', 2)
        setTimeout(() => {
            loadingScreen('off')
            renderMenu()
        }, 500)
    }, 500)
})

tblAll.addEventListener('click', () => {
    result = urutkanPerKategori(produk, 'a-z')
    loadingScreen('on', 2)
    setTimeout(() => {
        loadingScreen('off')
        renderMenu()
    }, 500)
})

tblFood.addEventListener('click', () => {
    result = produk.filter(e => e.kategori.includes('makanan'))
    loadingScreen('on', 2)
    setTimeout(() => {
        loadingScreen('off')
        renderMenu()
    }, 500)
})

tblDrink.addEventListener('click', () => {
    result = produk.filter(e => e.kategori.includes('minuman'))
    loadingScreen('on', 2)
    setTimeout(() => {
        loadingScreen('off')
        renderMenu()
    }, 500)
})

tblBayar.addEventListener('click', () => {
    tblBayar.classList.remove('confirm')
    setTimeout(() => tblBayar.classList.add('confirm'), 100)
    if(orderan.length < 1) {
        alert('Orderan belum ditambahkan.')
    }
    else {
        if(parseFloat(inputCash.value) < (sub + pajak) || inputCash.value == '') {
        alert('Maaf, jumlah pembayaran tidak mencukupi :(')
        }
        else {
            document.querySelector('p.return-value').innerHTML = `Rp${(parseFloat(inputCash.value) - (sub + pajak)).toLocaleString('en-US').split(',').join('.')},00`
        }
    }
})

tblReset.addEventListener('click', () => {
    tblReset.classList.remove('confirm')
    setTimeout(() => tblReset.classList.add('confirm'), 100)
    if(orderan.length < 1) {
        alert('Orderan belum ditambahkan.')
    }
    else {
        if(confirm('Yakin ingin menyimpan transaksi?')) {
            nama = []
            qty = []
            harga = []
            coba = ''
            orderan.map((e) => {
                nama.push(e.nama)
                qty.push(e.qty)
                harga.push(e.harga)
            })
            tambahData(trans, {
                id: kodeGenerator('transaksi'), 
                tgl: ambilTgl(), 
                nama, 
                qty, 
                harga, 
                pajak
            })
            simpanData('trans', JSON.stringify(trans))
            alert('Transaksi berhasil tersimpan!')
            orderan.splice(0)
            renderOrder()
            inputCash.value = ''
            resetValue()
        }
    }  
})

function resetValue() {
    document.querySelector('p.subtotal-value').innerHTML = `Rp0,00`
    document.querySelector('p.tax-value').innerHTML = `Rp0,00`
    document.querySelector('p.total-value').innerHTML = `Rp0,00`
    document.querySelector('p.return-value').innerHTML = `Rp0,00`
}

function addValidasi() {
    if(upImg.value != '' && selectType.value != '' && addName.value != ''  && addPrice[0].value != '' && addPrice[1].value != '' && addPrice[2].value != '' && parseFloat(addName.value.length) <= 25) {
        saveNew.removeAttribute('disabled')
        saveNew.style.backgroundColor = '#5f8671'
    }
    else {
        if(parseFloat(addName.value.length) > 25) {
            alert('Jumlah karakter nama menu maksimal 25 karakter :)')
        }
        saveNew.style.backgroundColor = '#a3bbc8'
        saveNew.setAttribute('disabled', true)
    }
}

addName.addEventListener('input', () => {
    if(cekDuplikatNama(produk, (addName.value).toLowerCase())) {
        setTimeout(alert('Nama menu sudah pernah digunakan.'), 500) 
    }
    else {
        setTimeout(addValidasi(), 500)
    }
})

addType.forEach(e => {
    e.addEventListener('input', () => {
        click = e.value
        setTimeout(addValidasi(), 500)
    })
})

addPrice.forEach(e => {
    e.addEventListener('input', () => {
        setTimeout(addValidasi(), 500)
    })
})

upImg.addEventListener('change', () => {
    if(cekDuplikatPath(produk, ambilPath(upImg.value))) {
        alert('Gambar sudah pernah digunakan.')
        upImg.value = ''
    }
    else if(cekDuplikatPath(akun, ambilPath(upImg.value))) {
        alert('Gambar sudah pernah digunakan.')
        upImg.value = ''
    }
    else if(upImg.value == '') {
        addImg.style.backgroundImage = 'url(asset/icons/add_photo_alternate_white_48dp.svg)'
        addImg.style.backgroundSize = 'auto'
    }
    else {
        gantiGambar(addImg, upImg.value)
    }
    addValidasi()
})

function renderListMenu() {
    hasil = ''
    result.map(e => {
        hasil +=
        `<div class="card-result">
            <div class="gambar-menu">
                <img class="img-menu" style="background-image: url(${e.path});">
            </div>
            <p class="title-menu">${e.nama}</p>
            <div class="size_List">
                <p class="p-size">Ukuran:</p>
                <button class="S-list">S</button>
                <button class="M-list">M</button>
                <button class="L-list">L</button>
            </div>
            <div class="price-menu">
                <p class="h-price-menu">Harga:</p>
                <p class="price-list">Rp0,00</p>
            </div>
            <div class="menu-footer">
                <button class="remove-menu confirm">Hapus Menu</button>
            </div>
        </div>`
    })
    contListMenu.innerHTML = hasil
    size_list = document.querySelectorAll('div.size_List button')
    priceList = document.querySelectorAll('p.price-list')
    sizeS_list = document.querySelectorAll('button.S-list')
    sizeM_list = document.querySelectorAll('button.M-list')
    sizeL_list = document.querySelectorAll('button.L-list')
    size_list.forEach((e, i) => {
        e.addEventListener('click', () => {
            size_list[i].setAttribute('id', 'filter')
            click = size_list[i]
            size_list.forEach((e) => {
                if(e != click) {
                    e.removeAttribute('id')
                }
            })
        })
    })
    delMenu = document.querySelectorAll('button.remove-menu')
    result.forEach((e, i) => {
        delMenu[i].addEventListener('click', () => {
            if(confirm('Anda yakin ingin menghapus menu?')) {
                produk.splice(i, 1)
                simpanData('produk', JSON.stringify(produk))
                result = produk
                renderListMenu()
            }  
        })
        sizeS_list[i].addEventListener('click', () => {
            priceList[i].innerHTML = `Rp${e.harga[0].toLocaleString('en-US').split(',').join('.')},00`
            click = e
            resetHargaList()
        })
        sizeM_list[i].addEventListener('click', () => {
            priceList[i].innerHTML = `Rp${e.harga[1].toLocaleString('en-US').split(',').join('.')},00`
            click = e
            resetHargaList()
        })
        sizeL_list[i].addEventListener('click', () => {
            priceList[i].innerHTML = `Rp${e.harga[2].toLocaleString('en-US').split(',').join('.')},00`
            click = e
            resetHargaList()
        })
    })
}

saveNew.addEventListener('click', () => {
    if(confirm('Anda yakin ingin menyimpan menu?')) {
        saveNew.classList.remove('confirm')
        setTimeout(() => saveNew.classList.add('confirm'), 100)
        tambahData(produk, {
            id: kodeGenerator('menu'),
            kategori: selectType.value,
            nama: (addName.value).toLowerCase(),
            harga: [
                parseFloat(addPrice[0].value), 
                parseFloat(addPrice[1].value), 
                parseFloat(addPrice[2].value)
            ],
            path: ambilPath(upImg.value)
        })
        simpanData('produk', JSON.stringify(produk))
        alert('Data berhasil disimpan!')
        produk = urutkanPerKategori(produk, 'a-z')
        result = produk
        renderListMenu()
        upImg.value = ''
        addImg.style.backgroundImage = 'url(asset/icons/add_photo_alternate_white_48dp.svg)'
        addImg.style.backgroundSize = 'auto'
        addName.value = ''
        addPrice.forEach(e => {
            e.value = ''
        })
        saveNew.style.backgroundColor = '#a3bbc8'
        saveNew.setAttribute('disabled', true)
    }
})

taxRule.addEventListener('change', () => {
    if(parseFloat(taxRule.value) >= 0) {
        simpanData('tax', JSON.stringify((parseFloat(taxRule.value) / 100)))
        taxRule.setAttribute('placeholder', `${tampilkanData('tax') * 100}`)
    }
    else {
        simpanData('tax', JSON.stringify(0.1))
    }
    taxRule.value = ''
    tax = tampilkanData('tax')
})

selectMenu.addEventListener('change', () => {
    result = []
    loadingScreen('on', 2)
    if(selectMenu.value == 'semua') {
        result = urutkanPerKategori(produk, 'a-z')
    }
    else if(selectMenu.value == 'makanan') {
        result = produk.filter(e => e.kategori.includes('makanan'))
    }
    else if(selectMenu.value == 'minuman') {
        result = produk.filter(e => e.kategori.includes('minuman'))
    }
    setTimeout(() => {
        loadingScreen('off')
        renderListMenu()
    }, 500)
})

function renderChart(db, mulai, sampai) {
    periode = []
    labels = []
    data = []
    backgroundColor = '#48b07d'
    borderColor = '#05796b'
    type = 'line'
    mulai = mulai.split('-')
    sampai = sampai.split('-')
    db.map(e => {
        subtotal = []
        tgl = e.tgl.split('-')
        e.qty.forEach((f, i) => {
            subtotal.push(f * e.harga[i])
        })
        total = hitungTotal(subtotal)
        if(periode.length == 0) {
            tambahData(periode, {
            tgl: e.tgl,
            dd: parseFloat(tgl[tgl.length-1]),
            mm: parseFloat(tgl[tgl.length-2]),
            yy: parseFloat(tgl[tgl.length-3]),
            total
            })
        }
        else {
            if(periode.every(f => f.tgl != e.tgl)) {
                tambahData(periode, {
                    tgl: e.tgl,
                    dd: parseFloat(tgl[tgl.length-1]),
                    mm: parseFloat(tgl[tgl.length-2]),
                    yy: parseFloat(tgl[tgl.length-3]),
                    total
                })
            }
            else {
                periode[periode.findIndex(f => f.tgl == e.tgl)].total += total
            }
        }
    })

    periode.map(e => {
        if(e.dd >= mulai[mulai.length-1] && e.dd <= sampai[sampai.length-1] && e.mm == mulai[mulai.length-2] && e.mm == sampai[sampai.length-2]) {
            labels.push(ubahFormatTgl(e.tgl))
            data.push(e.total)
        }
    })
    
    // Render Chart
    new Chart(ctx, {
        type,
        data: {
            labels,
            datasets: [{
                label,
                data,
                backgroundColor,
                borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    })
}

function showChartList() {
    hasil = ''
    bulan.map((e, i) => {
        if((i+1) == new Date().getMonth()+1) {
            hasil += `<option selected="selected" value="${i+1}">${e} ${new Date().getFullYear()}</option>`
        }
        else {
            hasil += `<option value="${i+1}">${e} ${new Date().getFullYear()}</option>`
        }
    })
    selectChart.innerHTML = hasil
}

selectChart.addEventListener('change', () => {
    label = `Penjualan Bulan ${bulan[parseFloat(selectChart.value)-1]} ${new Date().getFullYear()}`
    loadingScreen('on', 2)
    setTimeout(() => {
        loadingScreen('off')
        renderChart(trans, `${new Date().getFullYear()}-${selectChart.value}-1`, `${new Date().getFullYear()}-${selectChart.value}-31`)
        dateInput[0].value = ''
        dateInput[1].value = ''
    }, 500)
})

dateInput.forEach(e => {
    e.addEventListener('change', () => {
        inputValue1 = dateInput[0].value.split('-')
        inputValue1 = inputValue1[inputValue1.length-2]
        inputValue2 = dateInput[1].value.split('-')
        inputValue2 = inputValue2[inputValue2.length-2]
        label = `Penjualan Periode: ${ubahFormatTgl(dateInput[0].value)} - ${ubahFormatTgl(dateInput[1].value)}`
        if(inputValue1 == inputValue2) {
            loadingScreen('on', 2)
            setTimeout(() => {
                loadingScreen('off')
                renderChart(trans, dateInput[0].value, dateInput[1].value)
            }, 500)
        }
        else {
            loadingScreen('on', 2)
            setTimeout(() => {
                loadingScreen('off')
                label = 'Data yang ditampilkan maksimal periode 1 bulan'
                renderChart(trans, '', '')
            }, 500)
        }
        selectChart.value = ''
    })
})

function renderLogin() {
    hasil = ''
    result.map(e => {
        hasil +=
            `<div class="items-list-history-login">
                <p style="text-transform: none;">${e.nama}</p>
                <p>${e.status}</p>
                <p>${e.act}</p>
            </div>`
    })
    listHistory.innerHTML = hasil
}

function renderAcc() {
    hasil = ''
    akun.map(e => {
        hasil +=
            `<div class="card-result">
                <div class="gambar-acc">
                    <img class="img-acc" style="background-image: url(${e.path});">
                </div>
                <p class="title-acc" style="text-transform: none;">${e.nama}</p>
                <div class="status">
                    <p class="h-status">Status:</p>
                    <p class="v-status">${e.status}</p>
                </div>
                <div class="price-menu">
                    <p class="h-last-login">Last Login:</p>
                    <p class="v-last-login">${e.last}</p>
                </div>
                <div class="footer-acc">
                    <button class="remove-acc confirm">Hapus User</button>
                </div>
            </div>`
    })
    userList.innerHTML = hasil
    delAcc = document.querySelectorAll('button.remove-acc')
    delAcc.forEach((e, i) => {
        e.addEventListener('click', () => {
            e.classList.remove('confirm')
            setTimeout(() => e.classList.add('confirm'), 100)
            if(akun.length > 1) {
                if(confirm('Yakin ingin menghapus akun?')) {
                    akun.splice(i, 1)
                    simpanData('akun', JSON.stringify(akun))
                }
            }
            else {
                alert('Tidak dapat menghapus akun :)')
            }
            loadingScreen('on', 2)
            setTimeout(() => {
                loadingScreen('off')
                renderAcc()
            }, 500)
        })
    })
}

function dialogValidasi() {
    if(upPic.value != '' && inputUser.value != '' && selectAcc.value != '' && inputNewPass.value != '' && inputConPass.value != '' && parseFloat(inputUser.value.length) <= 25 && parseFloat(inputUser.value.length) >= 8 && inputNewPass.value == inputConPass.value && parseFloat(inputNewPass.value.length) >= 8) {
        dialogSave.removeAttribute('disabled')
        dialogSave.style.backgroundColor = '#5f8671'
    }
    else {
        if(parseFloat(inputUser.value.length) > 25 || parseFloat(inputUser.value.length) < 8 && inputUser.value != '') {
            alert('Jumlah karakter username minimal 8 dan maksimal 25 karakter :)')
        }
        else if(inputConPass.value != '' && inputNewPass.value != inputConPass.value) {
            alert('Konfirmasi password tidak cocok! mohon coba kembali.')
        }
        else if(parseFloat(inputNewPass.value.length) < 8 && inputNewPass.value != '') {
            alert('Password harus berisi 8 karakter atau lebih :)')
        }
        dialogSave.style.backgroundColor = '#a3bbc8'
        dialogSave.setAttribute('disabled', true)
    }
}

dateHistory.addEventListener('change', () => {
    loadingScreen('on', 2)
    setTimeout(() => {
        loadingScreen('off')
        result = history.filter(e => e.tgl == dateHistory.value)
        renderLogin()
    }, 500)
})

vNewPass.addEventListener('click', () => {
    vNewPass.classList.toggle('visible')
    if(!vNewPass.classList.contains('visible')) {
        vNewPass.style.backgroundImage = 'url(asset/icons/visibility_black_48dp.svg)'
        inputNewPass.setAttribute('type', 'text')
    }
    else {
        vNewPass.style.backgroundImage = 'url(asset/icons/visibility_off_black_48dp.svg)'
        inputNewPass.setAttribute('type', 'password')
    }
})

loginUser.addEventListener('input', () => {
    validasiLogin()
})

loginPass.addEventListener('input', () => {
    validasiLogin()
})

loginBtn.addEventListener('click', () => {
    loginBtn.classList.remove('confirm')
    setTimeout(() => loginBtn.classList.add('confirm'), 100)
    if(akun.every(e => e.nama != loginUser.value || akun.every(e => e.password != loginPass.value))) {
        alert('Username atau password yang dimasukkan salah :)')
    }
    else if(akun.every(e => e.nama != loginUser.value && akun.every(e => e.password != loginPass.value))) {
        alert('Username atau password yang dimasukkan salah :)')
    }
    else {
        akun.forEach(e => {
            if(e.nama == loginUser.value && e.password == loginPass.value) {
                nav[0].classList.add('change')
                fitur[0].style.zIndex = 1
                if(e.status != 'owner') {
                    nav[1].classList.add('hide')
                    nav[3].classList.add('hide')
                    fitur[1].classList.add('hide')
                    fitur[3].classList.add('hide')
                }
                fitur.forEach((e, i) => {
                    if(e != fitur[0]) {
                        nav[i].classList.remove('change')
                        e.style.zIndex = -1
                    }
                })
                loginPage.style.display = 'none'
                loginUser.value = ''
                loginPass.value = ''
                e.last = new Date().toLocaleString()
                simpanData('akun', JSON.stringify(akun))
                tambahData(history, {
                    nama: e.nama,
                    tgl: ambilTgl(),
                    status: e.status,
                    act: e.last
                })
                simpanData('history', JSON.stringify(history))
            }
        })
    }
})

function validasiLogin() {
    if(parseFloat(loginUser.value.length) >= 8 && parseFloat(loginPass.value.length) >= 8) {
        loginBtn.style.backgroundColor = '#ffde6d'
        loginBtn.style.color = `#243f4d`
    }
    else {
        loginBtn.style.backgroundColor = '#d0241d'
        loginBtn.style.color = `white`
    }
}

vConPass.addEventListener('click', () => {
    vConPass.classList.toggle('visible')
    if(!vConPass.classList.contains('visible')) {
        vConPass.style.backgroundImage = 'url(asset/icons/visibility_black_48dp.svg)'
        inputConPass.setAttribute('type', 'text')
    }
    else {
        vConPass.style.backgroundImage = 'url(asset/icons/visibility_off_black_48dp.svg)'
        inputConPass.setAttribute('type', 'password')
    }
})

vUsername.addEventListener('click', () => {
    vUsername.classList.toggle('visible')
    if(!vUsername.classList.contains('visible')) {
        vUsername.style.backgroundImage = 'url(asset/icons/visibility_white_48dp.svg)'
        loginUser.setAttribute('type', 'text')
    }
    else {
        vUsername.style.backgroundImage = 'url(asset/icons/visibility_off_white_48dp.svg)'
        loginUser.setAttribute('type', 'password')
    }
})

vPassword.addEventListener('click', () => {
    vPassword.classList.toggle('visible')
    if(!vPassword.classList.contains('visible')) {
        vPassword.style.backgroundImage = 'url(asset/icons/visibility_white_48dp.svg)'
        loginPass.setAttribute('type', 'text')
    }
    else {
        vPassword.style.backgroundImage = 'url(asset/icons/visibility_off_white_48dp.svg)'
        loginPass.setAttribute('type', 'password')
    }
})

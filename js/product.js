
    $('.fa-jet-fighter-up').click(()=>{
        window.scrollTo({
            top : 0,
            behavior : 'smooth'
        })
    })

    window.addEventListener('scroll' , ()=>{
        if(window.scrollY >= 800){
            $('.fa-jet-fighter-up').css({visibility: "visible" , opacity: 1 , bottom : "30px"})
        }
        else{
            $('.fa-jet-fighter-up').css({visibility: "hidden" , opacity: "0" , bottom : "10%"})
        }
    })
    

    $('.fa-bars-staggered').click(function(){
        $('.navs .down > ul').toggleClass('slide')
        $('.fa-bars-staggered').toggleClass('active')
        
    })

    const cardhandler= document.querySelectorAll('.cardhandler')
    const exit = document.querySelector('.fa-circle-xmark')
    const overlay = document.querySelector('.overlay')

    cardhandler.forEach(function(e){
        e.onclick = function(){
            if(this.className.includes('show')){
                $('.card').addClass('open')
                overlay.classList.add('open')
            }
            else{
                $('.card').removeClass('open')
                overlay.classList.remove('open')

            }
            
            
        }
    })


// start productCart 
var products = [
    {
        id:1 ,
        img:"imags/icone.png" ,
        name:"Product one",
        price:30,
        count:1,
        
    },
    {
        id:2 ,
        img:"imags/jars.jpg" ,
        name:"Product two",
        price:45,
        count:1,
    },
    {
        id:3 ,
        img:"imags/plate-2.png" ,
        name:"Product three",
        price:28,
        count:1,
    },
    {
        id:4 ,
        img:"imags/plate-3.png" ,
        name:"Product four",
        price:28,
        count:1,
        count:1,
    },
    {
        id:5 ,
        img:"imags/plate-1.png" ,
        name:"Product five",
        price:50,
        count:1,
    },
    {
        id:6 ,
        img:"imags/salad-table.jpg" ,
        name:"Product six",
        price:60,
        count:1,
    },
    {
        id:7 ,
        img:"imags/yogurt.png" ,
        name:"Product seven",
        price:75,
        count:1,
    },
    {
        id:8 ,
        img:"imags/cupcake.png" ,
        name:"Product eight",
        price:72,
        count:1,
    },
    {
        id:9 ,
        img:"imags/food-table.jpg" ,
        name:"Product nine",
        price:80,
        count:1,
    },
    {
        id:1,
        img:"imags/coffee.jpg" ,
        name:"Product ten",
        price:10,
        count:1,
    },
]
let items =""
for(let i = 0 ; i  < products.length ; i++){
    items += `
    <div class="pro">
            <div>
                <img src="${products[i].img}" alt="">
            </div>
            <div class="pro-data">
                <p>${products[i].name}</p>
                <b>$${products[i].price}</b>
                <button onclick='addtocart(${i})'>add to cart</button>
            </div>
        </div>
    ` 
}

setTimeout(()=>{
    $('.cards').html(items)
    } , 2000)





let contanerPro = []
if(localStorage.getItem('arrpro')){
    contanerPro = JSON.parse(localStorage.getItem('arrpro'))
}
else{
    contanerPro = []
}

let coun = document.querySelector('.coun')


function  addtocart(ind){
    let pro = products[ind]

    let x = contanerPro.find(el => el.name == pro.name)
    if(!x){
        contanerPro.push(pro)
    }
    else{
        pro.count++

    }    
    
    displayPro()
    handelbobabsuc(products[ind].name)
}




function handelbobabsuc(proName){

    let con = document.createElement('div')
    con.className = "success"

    let icon = document.createElement('i')
    icon.className = "fa-solid fa-check-double"

    let txt = document.createElement('p')
    txt.innerHTML = `sucsess add product <br><span>${proName}</span>`

    let div = document.createElement('div')
    let open = document.createElement('button')
    open.innerText = "open cart"
    let close = document.createElement('button')
    close.innerText = "close"

    div.appendChild(open)
    div.appendChild(close)
    con.appendChild(icon)
    con.appendChild(txt)
    con.appendChild(div)

    document.body.appendChild(con)
    setTimeout(()=> {con.classList.add('open')} , 100)
    overlay.classList.add('open')
    
    function closebobab(){
        setTimeout(()=>{con.remove()} , 500)
        con.classList.remove('open')
        overlay.classList.remove('open')
    }
    close.onclick = ()=>{
        closebobab()
    }

    overlay.onclick = ()=>{
        closebobab()
        $('.card').removeClass('open')
    }
    open.onclick = ()=>{
        closebobab()
        overlay.classList.add('open')
        $('.card').addClass('open')
    }
    
}


function displayPro(){
//     let item = contanerPro.map(el => `
//         <div>
//     <div>
//         <img src="${el.img}" alt="">
//     </div>
//     <div>
//         <b>${el.name}</b>
//         <p>$ ${el.price}</p>
//     </div>
//     <div>
//         <span onclick='incdec(${i})'>+</span>
//         <strong>${limt}</strong>
//         <span onclick='incdec()'>-</span>
//         <i class="fa-solid fa-trash" onclick='deletePro(${i})'></i>
//     </div>
// </div>
// `).join(' ')


    let item = ''
    let total = 0
    for (let i = 0 ; i < contanerPro.length ; i++  ){
        let finalprice = (contanerPro[i].price * contanerPro[i].count)
        total += finalprice
        item += `
            <div>
                <div>
                    <img src="${contanerPro[i].img}" alt="">
                </div>
                <div>
                    <b>${contanerPro[i].name}</b>
                    <p>$ ${finalprice}</p>
                </div>
                <div>
                    <span onclick='inc(${i})' class='inc'>+</span>
                    <strong>${contanerPro[i].count}</strong>
                    <span onclick='dec(${i})' class='dec'>-</span>
                    <i class="fa-solid fa-trash" onclick='deletePro(${i})'></i>
                </div>
            </div>
        `
    }
    $('.contant').html(item)
    $('.total').text(`$ ${total}`)
    $('.cardAmount').text(contanerPro.length)
    if(!contanerPro.length){
        $('.cardAmount').css({color : "red"})
    }
    else{
        $('.cardAmount').css({color : "var(--main-colory)"})
        
    }
    if(contanerPro.length <= 0){
        $('.card > p').css({display : 'block' , color : 'red'})
    }
    else{
        $('.card > p').css({display : 'none'})

    }

    localStorage.setItem('arrpro' , JSON.stringify(contanerPro))
}
displayPro()

function deletePro(ind ){
    let conf = confirm(`Do you sure to Delet ${contanerPro[ind].name}`)
    if(conf){
        contanerPro[ind].count = 1
        contanerPro.splice(ind , 1)
    }
    displayPro()
}

function inc(ind){
    ++contanerPro[ind].count
    displayPro()
    
    
}
function dec(ind){
    if(contanerPro[ind].count > 1){
        --contanerPro[ind].count
        displayPro()

}
else{
    contanerPro.splice(ind , 1)
    displayPro()
    
}



}

// end productCart 


// search
let find = document.querySelector('.find')
let select = document.querySelector('.select')

select.addEventListener('change' , function(){
    let val = this.value
    if( val == "select"){
        find.disabled = true
        find.placeholder = "select cat from select input"

    }
    else{
        find.disabled = false
        find.placeholder = `search by ${val}`
    }
})


find.addEventListener('keyup' , function(){

    let items =""
    for(let i = 0 ; i  < products.length ; i++){
        if(select.value == 'name'){
            if(products[i].name.trim().toLowerCase().includes(find.value.trim().toLowerCase())){
                items += `
                <div class="pro">
                        <div>
                            <img src="${products[i].img}" alt="">
                        </div>
                        <div class="pro-data">
                            <p>${products[i].name}</p>
                            <b>$${products[i].price}</b>
                            <button onclick='addtocart(${i})'>add to cart</button>
                        </div>
                    </div>
                ` }

        }
        else if(select.value == 'price'){
            if(products[i].price.toString().includes(find.value)){
                items += `
                <div class="pro">
                        <div>
                            <img src="${products[i].img}" alt="">
                        </div>
                        <div class="pro-data">
                            <p>${products[i].name}</p>
                            <b>$${products[i].price}</b>
                            <button onclick='addtocart(${i})'>add to cart</button>
                        </div>
                    </div>
                ` }

        }
        $('.cards').html(items)
    }



})


// change them
let rot = document.documentElement 
if(localStorage.getItem('thems') == "dark"){
    $(':root').addClass('dark')

}
$('.them').click(function(){
    $(':root').toggleClass('dark')
    if(rot.className.includes('dark')) {
        localStorage.setItem('thems' , 'dark')
    }
    else{
        localStorage.setItem('thems' , 'light')

    }
    
    // document.documentElement.style.setProperty('--main-colory' , 'green')

})

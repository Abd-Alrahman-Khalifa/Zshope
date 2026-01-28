window.addEventListener('DOMContentLoaded' , function(){
    
    // start slider
    $(document).ready(function(){
        $('.slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            prevArrow: '.pre',
            nextArrow: '.next',
            
            responsive: [
                {
                    breakpoint: 1150,
                    settings: {
                        arrows: false,
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
    
        });
    });
    // end slider

    // const toTop = document.querySelector('.fa-jet-fighter-up')
    // toTop.addEventListener('click' , ()=>{
    //     window.scrollTo({
    //         top : 0 ,
    //         behavior : 'smooth'
    //     })
    // })
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
            $('.fa-jet-fighter-up').css({visibility: "hidden" , opacity: "0" , bottom : "100%"})
        }
    })
    

    $('.fa-bars-staggered').click(function(){
        $('.navs .down > ul').toggleClass('slide')
        $('.fa-bars-staggered').toggleClass('active')
        
    })

    
})




// btn shop
$('.shop').click(()=>{
    window.location= 'product.html'
})

// cart handeler
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



// product of slider




var proSlider = [
    {
        id:1 ,
        img:"./imags/plate-3.png" ,
        name:"greek salad",
        price:14.00,
        lastprice:18.99 ,
        count:1,
        
    },
    {
        id:2 ,
        img:"imags/jars.jpg" ,
        name:"cottage-Pie",
        price:20.00,
        lastprice:25.00 ,
        count:1,
    },
    {
        id:3 ,
        img:"imags/plate-2.png" ,
        name:"Ressian salad",
        price:13.00,
        lastprice:16.00 ,
        count:1,
    },
    {
        id:4 ,
        img:"imags/icone.png"  ,
        name:"summer salad",
        price:10.25,
        lastprice:12.35 ,
        count:1,
    },
    {
        id:5 ,
        img:"imags/plate-1.png" ,
        name:"stack rizo",
        price:30.55,
        lastprice:31.99 ,
        count:1,
    },
]
let items =""
for(let i = 0 ; i  < proSlider.length ; i++){
    items += `
    <div class="cart">
                <div class="cart-img">
                    <img src="${proSlider[i].img}" alt="this browser not subort this img extention">
                </div>
                <div class="data">
                    <p>${proSlider[i].name}</p>
                    <div class="rate">
                        <img src="icons/start-filled.svg" alt="">
                        <img src="icons/start-filled.svg" alt="">
                        <img src="icons/start-filled.svg" alt="">
                        <img src="icons/star-grey.svg" alt="">
                        <img src="icons/star-grey.svg" alt="">
                    </div>
                    <b>$${proSlider[i].price} <del>$${proSlider[i].lastprice}</del></b>
                    <div class="add-cart">
                        <img src="icons/cart-2.svg" alt="">
                        <p onclick='addtocart(${i})'>add to cart</p>
                    </div>
                </div>
            </div>
    ` 
}
$('.slider').html(items)





// prouduct
let contanerPro = []
if(localStorage.getItem('arrpro')){
    contanerPro = JSON.parse(localStorage.getItem('arrpro'))
}
else{
    contanerPro = []
}

let coun = document.querySelector('.coun')

function  addtocart(ind){
    console.log(ind);
    
    let pro = proSlider[ind]

    let x = contanerPro.find(el => el.name == pro.name)
    if(!x){
        contanerPro.push(pro)
    }
    else{
        pro.count++

    }    
    
    displayPro()
    handelbobabsuc(proSlider[ind].name)
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


// start timer of sale

function timer(){
    let curntYear = new Date()
    const newYear = new Date("2026")
                                                            //1 => month 2 , 0 => first day
    let firstDayInNewYear = new Date(newYear.getFullYear() , 0 , 31)  
    
    
    let countMsecond = firstDayInNewYear.getTime() - curntYear.getTime()
    
    let days = Math.floor(countMsecond / (1000 * 60 * 60 * 24))
    let hours = 23 - curntYear.getHours()
    let mintes = 59 - curntYear.getMinutes()
    let secondes = 59 - curntYear.getSeconds()
    
    
    $('.days').text(days)
    $('.hours').text(hours)
    $('.mintes').text(mintes)
    $('.secondes').text(secondes)

}
timer()
setInterval(timer , 1000)

// end timer of sale

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









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

//icon of shwo links in resposive
$('.fa-bars-staggered').click(function(){
    $('.navs .down > ul').toggleClass('slide')
    $('.fa-bars-staggered').toggleClass('active')
    
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




let contanerPro = []
if(localStorage.getItem('arrpro')){
    contanerPro = JSON.parse(localStorage.getItem('arrpro'))
}
else{
    contanerPro = []
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

// user
// 'https://jsonplaceholder.typicode.com/users'
$.ajax({
    methode : "GET" , 
    url : 'https://dummyjson.com/users' ,
    success : (data)=>{
        let users = data.users.map((val)=>{
            return `
                <div class="user"  data-aos="zoom-in-right" data-aos-duration="1000">

                <div class="imag">
                    <div>
                        <img src="${val.image}" alt="">
                    </div>
                    <div>
                        <p>company: <b>${val.company.name}</b></p>
                        <p>address: <b>${val.company.address.address}</b></p>
                        <p>phone: <b>${val.phone}</b></p>
                        <p>email: <b>${val.email}</b></p>
                    </div>
                </div>
                <div class="datauser">
                    <p>maneger: <b>${val.firstName} ${val.lastName}</b></p>
                    <p>jop: <b>${val.company.title}</b></p>
                    <p>address: <b>${val.address.address}</b></p>
                    <p>gender: <b>${val.gender}</b></p>
                    <p>age: <b>${val.age}</b></p>
                </div>
            </div>
            `
        }).join(' ')
    $('.conUser').html(users)
        
        
        
        
        
        
        

    } ,
    error : (e)=>{console.log(e)}
})

AOS.init();

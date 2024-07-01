// check if there is Local Storage Color Option
let mainColors = localStorage.getItem('color-option') ; 

// Random background option

let backgroundOption = true ; 

// set interval variable
let setintrbackgr  ;



if(mainColors !== null){
    document.documentElement.style.setProperty('--main--color',mainColors);
    document.querySelectorAll('.colors-list li').forEach(function(el){
        el.classList.remove('active') ; 
        if(el.getAttribute('data-color') == mainColors){
            el.classList.add('active') ; 
        } ; 
    }) ; 



};

// check if there is localstorage random background item

let backgroundLocalItem  = localStorage.getItem('background_option') ; 

if(backgroundLocalItem !== null){

    if(backgroundLocalItem == 'true'){
        backgroundOption = true ; 
    } else{
        backgroundOption = false ; 
    } 

    // remove active span from all span
    document.querySelectorAll('.random-backgrounds span').forEach(function(el){
        el.classList.remove('active') ; 
    })

    if(backgroundLocalItem === 'true'){
        document.querySelector('.yes').classList.add('active') ; 
    } else{
        document.querySelector('.no').classList.add('active') ;    
    }


} ;


// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
   //Toggle class fa-spin For Rotation on Self
    this.classList.toggle('fa-spin') ; 

    document.querySelector('.settings-box').classList.toggle('open') ; 

}

// Switch Colors

const colorsLi =document.querySelectorAll('.colors-list li') ; 

// Loop on All List Items
colorsLi.forEach(function(li){
    // Clicl on Every List Items
    li.addEventListener('click' , (e)=>{
       // console.log(e.target.getAttribute('data-color')) ; 
        // Set Color on Root
        document.documentElement.style.setProperty('--main--color',e.target.getAttribute('data-color'));

        // Set Color on Local Storage
        localStorage.setItem('color-option',e.target.getAttribute('data-color')) ; 
        
        handleActive(e) ; 

    }) ;

}) ;


// Switch Random BackGround Option

const randomBackEl =document.querySelectorAll('.random-backgrounds span') ; 

// Loop on All Spans
randomBackEl.forEach(function(span){
    // Clicl on Every Span
    span.addEventListener('click' , (e)=>{

        handleActive(e) ; 

        if(e.target.getAttribute('data-background') == 'yes'){
            backgroundOption = true ;
            randomizeimg() ; 

            localStorage.setItem('background_option',true) ; 

        } else{

            backgroundOption = false ;
            clearInterval(setintrbackgr) ; 

            localStorage.setItem('background_option',false) ; 
        }

    }) ;

}) ;







// Select Landing Page Element
let landingPage = document.querySelector('.landing-page') ; 

// Get Array of Images

let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"] ; 

// change Background Image Url 
landingPage.style.backgroundImage = 'url("images/02.jpg")' ; 



// function to randomize imgs


function randomizeimg(){
    if(backgroundOption == true){
        setintrbackgr = setInterval(function(){
            let randomNumber = Math.floor(Math.random()*imgsArray.length) ; 
            landingPage.style.backgroundImage = 'url("images/' +imgsArray[randomNumber]+ '")' ; 
        }
        ,1000) ; 

    }
}

randomizeimg() ; 

// Select Skills Selector

let ourSkill = document.querySelector('.skills'); 

window.onscroll = function(){

    // Skill Offset Top
    let skillOffsetTop = ourSkill.offsetTop ; 

    // Skills Outer Height 
    let skillsOuterHeight = ourSkill.offsetHeight ; 

    // window Height

    let windowHeight = this.innerHeight; 

    // Window Scroll Top 
    let windowScrollTop = this.pageYOffset ; 

    if(windowScrollTop > (skillOffsetTop + skillsOuterHeight - windowHeight - 100)){
       
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })

    } else{
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');

        allSkills.forEach(skill => {
            skill.style.width = '0' ; 
        })

    }

    


}


// Create popup with images 

let ourGallary = document.querySelectorAll('.gallary img') ; 

ourGallary.forEach(img => {
    img.addEventListener('click' , (e) => {
        // Create overlay element
        let overlay = document.createElement('div') ; 

        // add class name on element
        overlay.className = 'popup-overlay' ; 

        // add element to the body 
        document.body.appendChild(overlay) ; 

        // Create Popup
        let popupBox = document.createElement('div') ; 

        // Add Class to popup box
        popupBox.className = 'popup-box' ; 

        if(e.target.alt !== null){
            // Create Heading
            let imgHeading = document.createElement('h3');

            // create Heading Text
            let imgText = document.createTextNode(e.target.alt);

            // Add heading Text to Heading element
            imgHeading.appendChild(imgText) ; 

            // Add Heading to popup box

            popupBox.appendChild(imgHeading) ; 
            
            

        }

        // Create the Image
        let popupImage = document.createElement('img') ; 

        // Set Image Source 
        popupImage.src = e.target.src ; 

        // Add Image to Popup Box

        popupBox.appendChild(popupImage) ; 

        // Append PopupBox yo Body

        document.body.appendChild(popupBox) ; 

        // Create The Close Span
        let closeButton = document.createElement('span') ; 

        // Create text span
        let textSpan = document.createTextNode('X') ; 

        // Append Text Span to close Span 

        closeButton.appendChild(textSpan) ;
        
        //Add Class to close button 
        closeButton.className = 'close-button' ; 

        // Add Close Button to the Popup Box
        popupBox.appendChild(closeButton) ; 


        

       


    })
})

// Close Popup

document.addEventListener('click',function(e){
    // remove popup
    if(e.target.className == 'close-button'){
        e.target.parentElement.remove() ; 

    // remove popup overlay
    document.querySelector('.popup-overlay').remove() ;     

    }
})


// Select All Bullets

const allBullets = document.querySelectorAll('.nav-bullets .bullet')  ;



// Select All Links

const allLinks = document.querySelectorAll('.landing-page .links li a')  ;


function scrollToSomewhere(element){
    element.forEach(ele => {
        ele.addEventListener('click',(e)=>{
            e.preventDefault() ; 
            document.querySelector(e.target.getAttribute('data-section')).scrollIntoView({
                behavior:'smooth',
    
            });
        })
    });
};


scrollToSomewhere(allBullets) ; 

scrollToSomewhere(allLinks) ; 


// handle active State

function handleActive(ev){
    // Remove Active class from all children

    ev.target.parentElement.querySelectorAll('.active').forEach(function(el){
        el.classList.remove('active') ; 
    });

    // add active class on Self
    ev.target.classList.add('active'); 
}


let bulletSpan = document.querySelectorAll('.bullet-options span') ; 

let bulletContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem('bullets-option'); 

if(bulletLocalItem !== null){

    bulletSpan.forEach(span => {
        span.classList.remove('active') ; 

    })

    if(bulletLocalItem == 'block'){

        document.querySelector('.bullet-options .yes').classList.add('active') ; 

    } else{
        
        document.querySelector('.bullet-options .no').classList.add('active') ;
    }



}


bulletSpan.forEach(span => {
   span.addEventListener('click' , (e) => {
    if (e.target.getAttribute('data-display') == 'show'){

        bulletContainer.style.display = 'block' ; 
        localStorage.setItem('bullets-option','block') ; 

    } else{
        
        bulletContainer.style.display = 'none' ; 
        localStorage.setItem('bullets-option','none') ; 
    }

    handleActive(e);  

   })
})

// Reset Button

document.querySelector('.reset-options').onclick = function(){

    localStorage.clear();
   // localStorage.removeItem('background-option');
   // localStorage.removeItem('color-option');
   // localStorage.removeItem('bullets-option');

   // Reload Window
    window.location.reload(); 

};


// Toggle Menu

let toggleBtn = document.querySelector('.toggle-menu')  ;
let tlinks  = document.querySelector('.links') ; 
let span = document.querySelectorAll('.toggle-menu span') ; 

/*span.forEach(span=>{
    span.addEventListener('click',function(e){
        e.stopPropagation() ; 
       
    })
})*/

toggleBtn.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle('menu-active') ; 
    tlinks.classList.toggle('open') ; 


}


// Click Any Where outside Menu and Toglle Button

document.addEventListener('click',function(e){
    if(e.target !== toggleBtn && e.target !== tlinks){
        
        // Check if menu is open 
        if(tlinks.classList.contains('open')){
            toggleBtn.classList.toggle('menu-active') ; 
            tlinks.classList.toggle('open') ; 
        }

    }
})

// Stop Propagation on Menu

tlinks.onclick = function(e){
    e.stopPropagation(); 
}
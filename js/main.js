document.addEventListener("DOMContentLoaded", function () {
  // width document
  var widthDoc = document.querySelector("body");
  
  // dark mode
  var toggleSwitch = document.querySelector(
    '.Switcher input[type="checkbox"]'
  );

  //  LeftColumn
  var leftColumn = document.querySelector('#LeftColumn');


  const app = {
    // su ly cac su kien
    handleEvent: function () {
      const _this = this;

      // dark mode
      if(toggleSwitch){
        const currentTheme = localStorage.getItem("theme");
        
        if (currentTheme) {
          document.documentElement.setAttribute("data-theme", currentTheme);
        
          if (currentTheme === "dark") {
            toggleSwitch.checked = true;
          }
        }
        
        function switchTheme(e) {
          if (e.target.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
          } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
          }
        }
        
        toggleSwitch.addEventListener("change", switchTheme, false);
      }


      // LeftColumn
      if(leftColumn){
        var searchInput = leftColumn.querySelector('.SearchInput');
        var stateBack = leftColumn.querySelector('.animated-menu-icon');
        var dropdownMenu = leftColumn.querySelector('.DropdownMenu');
        var newChat = leftColumn.querySelector('.NewChatButton');
        var transitionSlide1 = leftColumn.querySelector('#slide-1');
        var transitionSlide2 = leftColumn.querySelector('#slide-2');
        
        searchInput.querySelector('#telegram-search-input').onfocus = function(){
          searchInput.classList.add('has-focus');
          stateBack.classList.add('state-back');
          if(transitionSlide1 && transitionSlide2){
            transitionSlide1.classList.remove('active')
            transitionSlide2.classList.add('active');
             _this.slideTabList();
             if(transitionSlide2.matches('.active')){
              newChat.querySelector('#create-chat').style.display = 'none'
            }

          }
        }




        searchInput.querySelector('#telegram-search-input').onblur = function(){
          if(searchInput.classList.contains('has-focus')){
            searchInput.classList.remove('has-focus');
            newChat.querySelector('#create-chat').style.display = 'block'
          }
        }



        if(dropdownMenu){
          dropdownMenu.querySelector('.Button.has-ripple').onclick = function(){
            if(stateBack.classList.contains('state-back')){
              stateBack.classList.remove('state-back');
              if(transitionSlide1 && transitionSlide2){
                transitionSlide1.classList.add('active')
                transitionSlide2.classList.remove('active');
                 _this.slideTabList();
    
              }
            }else {
              dropdownMenu.querySelector('.bubble.menu-container').classList.toggle('open')
              dropdownMenu.querySelector('.bubble.menu-container').classList.toggle('shown')
            }
          }
        }




        leftColumn.onmouseover = function(){
          newChat.classList.add('revealed')
        }
        leftColumn.onmouseout = function(){
          newChat.classList.remove('revealed')
        }
      }



      



      // hide cac element khi click ra ngoai
      document.addEventListener("click", function (e) {
        if (dropdownMenu) {
          if (
            !dropdownMenu.querySelector('.bubble.menu-container').contains(e.target) &&
            !e.target.matches(".Button.has-ripple")
          ) {
            dropdownMenu.querySelector('.bubble.menu-container').classList.remove('open')
            dropdownMenu.querySelector('.bubble.menu-container').classList.remove('shown')
          }
        }
      });
    },
    // slide tab list
    slideTabList:function(){
      $(".TabList")
        .not(".slick-initialized")
        .slick({
          slidesToShow: 6,
          slidesToScroll: 1,
          arrows: false,
          asNavFor: '.Tab-content',
          focusOnSelect: true,
          infinite: false,
        });
      $(".Tab-content").not(".slick-initialized").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.TabList',
        infinite: false,
        dots: false,
        fade: true,
        arrows: false,
      });
    },
    // window scroll
    windowScroll: function () {
      var _this = this;
      window.onscroll = function () {

      };
    },
    // khoi tao function start
    start: function () {
      // su ly cac su kien
      this.handleEvent();
      // window scroll
      this.windowScroll();
      // slide tablist
      // this.slideTabList();
    },
  };

  app.start();
});

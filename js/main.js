document.addEventListener("DOMContentLoaded", function () {
  // width document
  var widthDoc = document.querySelector("body");

  // dark mode
  var toggleSwitch = document.querySelector('.Switcher input[type="checkbox"]');

  //
  var main = document.querySelector("#Main");

  var leftColumn = document.querySelector("#LeftColumn");

  var middleColumn = document.querySelector("#MiddleColumn");

  var rightColumn = document.querySelector("#RightColumn-wrapper");

  var popupAddContact = document.querySelectorAll("#popup-add-contact");

  var popupNewContact = document.querySelectorAll("#popup-new-contact");

  const app = {
    // su ly cac su kien
    handleEvent: function () {
      const _this = this;

      // dark mode
      if (toggleSwitch) {
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme) {
          document.documentElement.setAttribute("data-theme", currentTheme);

          if (currentTheme === "dark") {
            toggleSwitch.checked = true;
            document.querySelector("#MiddleColumn").classList.add("theme-dark");
          }
        }

        function switchTheme(e) {
          if (e.target.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            document.querySelector("#MiddleColumn").classList.add("theme-dark");
            localStorage.setItem("theme", "dark");
          } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            document
              .querySelector("#MiddleColumn")
              .classList.remove("theme-dark");
          }
        }

        toggleSwitch.addEventListener("change", switchTheme, false);
      }

      // LeftColumn
      if (leftColumn) {
        var searchInput = leftColumn.querySelector(".SearchInput");

        var stateBack = leftColumn.querySelector(".animated-menu-icon");

        var dropdownMenu = leftColumn.querySelector(".DropdownMenu");

        var newChat = leftColumn.querySelector(".NewChatButton");

        var transitionSlide1 = leftColumn.querySelector("#slide-1");

        var transitionSlide2 = leftColumn.querySelector("#slide-2");

        var transitionSlide3 = leftColumn.querySelector("#slide-3");

        var createChat = leftColumn.querySelector("#create-chat");

        var chatItems = leftColumn.querySelectorAll(".chat-item");

        var settingBlock = leftColumn.querySelector(".setting-wrapper");

        var editSettingBlock = leftColumn.querySelector(".edit-setting-wrapper");

        var showGeneral = leftColumn.querySelector(".GeneralSetting");

        var generalSettingBlock = leftColumn.querySelector(".general-setting-wrapper");

        var showSetting = leftColumn.querySelector(".submenu-setting");

        var pushSlide = leftColumn.querySelector(".push-slide");

        var closeLeftColumn = leftColumn.querySelectorAll(".close-left-column");

        var showEditSetting = leftColumn.querySelector(".open-edit-setting");
        
        var showExtendSetting = leftColumn.querySelector(".LeftHeader__open-extend");

        var extendSettingBlock = leftColumn.querySelector('.settings-more-menu');



        searchInput.querySelector("#telegram-search-input").onfocus =
          function () {
            searchInput.classList.add("has-focus");
            stateBack.classList.add("state-back");
            if (transitionSlide1 && transitionSlide2) {
              transitionSlide1.classList.remove("active");
              transitionSlide2.classList.add("active");
              _this.slideTabList();
              if (transitionSlide2.matches(".active")) {
                newChat.querySelector("#create-chat").style.display = "none";
              }
            }
          };

        searchInput.querySelector("#telegram-search-input").onblur =
          function () {
            if (searchInput.classList.contains("has-focus")) {
              searchInput.classList.remove("has-focus");
              newChat.querySelector("#create-chat").style.display = "block";
            }
          };




          // 
        if (dropdownMenu) {
          var submenuContact = document.querySelector(".submenu-contact");
          var dropdownMenuContainer = document.querySelector(".sub-menu");
          var addChat = document.querySelector("#add-chat");
          var showSubMenu = document.querySelector(".ripple-container");
          var parentSubMenu = dropdownMenu.querySelector(".Menu");
          showSubMenu.onclick = function () {
            if (!stateBack.matches(".state-back")) {
              parentSubMenu.classList.toggle("open");
            } else {
              stateBack.classList.remove("state-back");
              parentSubMenu.classList.remove("open");
              addChat.style.display = "none";
              createChat.style.display = "block";
              if (transitionSlide1 && transitionSlide2) {
                transitionSlide1.classList.add("active");
                transitionSlide2.classList.remove("active");
                _this.slideTabList();
              }
            }

            // show contact
            if (submenuContact) {
              submenuContact.onclick = function () {
                if (transitionSlide1.matches(".active")) {
                  transitionSlide1.classList.remove("active");
                  transitionSlide2.classList.remove("active");
                  transitionSlide3.classList.add("active");
                  parentSubMenu.classList.remove("open");
                  stateBack.classList.add("state-back");
                }
                createChat.style.display = "none";
                addChat.style.display = "block";
              };
            }
          };
          if (transitionSlide1.matches(".active")) {
            addChat.style.display = "none";
          }
        }






        //
        if (createChat) {
          var btnCreate = createChat.firstElementChild;
          btnCreate.onclick = function () {
            if (
              btnCreate.firstElementChild.getAttribute("class") == "fas fa-pen"
            ) {
              btnCreate.firstElementChild.setAttribute("class", "fas fa-times");
            } else {
              btnCreate.firstElementChild.setAttribute("class", "fas fa-pen");
            }
            createChat
              .querySelector(".sub-dropdown-chat")
              .classList.toggle("open");
          };
        }

        leftColumn.onmouseover = function () {
          newChat.classList.add("revealed");
        };
        leftColumn.onmouseleave = function () {
          newChat.classList.remove("revealed");
          if (createChat) {
            if (
              createChat.firstElementChild.firstElementChild.getAttribute(
                "class"
              ) == "fas fa-times"
            ) {
              btnCreate.firstElementChild.setAttribute("class", "fas fa-pen");
            }
            if (createChat.lastElementChild.classList.contains("open")) {
              createChat.lastElementChild.classList.remove("open");
            }
          }
        };



        // 
        if (middleColumn) {
          var conversation = middleColumn.querySelector("#messages-layout");
          var backBtn = middleColumn.querySelectorAll(".back-btn");
          chatItems.forEach(function (a) {
            a.onclick = function () {
              if (document.querySelector(".chat-item.selected") != null) {
                document
                  .querySelector(".chat-item.selected")
                  .classList.remove("selected");
              }
              this.classList.add("selected");
              conversation.classList.add("shown");
              main.classList.add("middle-column-open");
            };
          });
        }
        backBtn.forEach(function (a) {
          a.onclick = function () {
            main.classList.remove("middle-column-open");
          };
        });
         
        showSetting.onclick = function(){
          if(pushSlide.matches('.active')){
            pushSlide.classList.remove('active');
            main.classList.add("left-column-open");
            settingBlock.classList.add("shown");
          }
        }


        // general setting
        showGeneral.onclick = function(){
          if(settingBlock.matches('.shown')){
            settingBlock.classList.remove('shown');
            generalSettingBlock.classList.add("shown");
          }
        }

        // 
        if(closeLeftColumn){
          closeLeftColumn.forEach(function(a){
            a.onclick = function(){
              if(main.matches('.left-column-open')){
                main.classList.remove('left-column-open');
                pushSlide.classList.add('active');
              }
            }
          })
        }



        // 
        if(showEditSetting){
          showEditSetting.onclick = function(){
            if(settingBlock.matches('.shown')){
              settingBlock.classList.remove('shown');
              editSettingBlock.classList.add('shown')
            }
          }
        }



        // 
        if(showExtendSetting){
          showExtendSetting.onclick = function(){
            extendSettingBlock.firstElementChild.classList.toggle('open')
          }
        }
      }

      // middle column
      if (middleColumn) {
        middleColumn.querySelector(".AttachMenu").onmouseover = function () {
          middleColumn
            .querySelector("#attach-menu-controls")
            .firstElementChild.classList.add("open");
          middleColumn
            .querySelector("#attach-menu-controls")
            .firstElementChild.classList.add("shown");
        };
        middleColumn.querySelector(".AttachMenu").onmouseleave = function () {
          middleColumn
            .querySelector("#attach-menu-controls")
            .firstElementChild.classList.remove("open");
          middleColumn
            .querySelector("#attach-menu-controls")
            .firstElementChild.classList.remove("shown");
        };
        // nhap text
        var inputText = middleColumn.querySelector("#editable-message-text");
        var placeholderText = middleColumn.querySelector(".placeholder-text");
        inputText.addEventListener("input", function () {
          if (inputText.innerHTML == "") {
            placeholderText.style.display = "block";
            middleColumn.querySelector(".icon-send").style.display = "none";
            middleColumn.querySelector(".icon-microphone").style.display =
              "block";
          } else {
            placeholderText.style.display = "none";
            middleColumn.querySelector(".icon-microphone").style.display =
              "none";
            middleColumn.querySelector(".icon-send").style.display = "block";
          }
        });

        // show extend submenu
        middleColumn.querySelector(".hearder-tool__icon").onclick =
          function () {
            middleColumn
              .querySelector(".hearder-tool__dropdown")
              .classList.toggle("open");
          };
      }

      // right column
      if (rightColumn) {
        // focus
        rightColumn.querySelector(".SearchInput .form-control").onfocus =
          function () {
            rightColumn
              .querySelector(".SearchInput")
              .classList.add("has-focus");
          };

        // blur
        rightColumn.querySelector(".SearchInput .form-control").onblur =
          function () {
            rightColumn
              .querySelector(".SearchInput")
              .classList.remove("has-focus");
          };

        if (middleColumn) {
          // show search right column
          var searchHeaderMiddle = middleColumn.querySelector(
            ".header-tool__search"
          );
          var rightColumnSearch = rightColumn.querySelector(
            ".RightColumn__Search"
          );

          var headerInfo = middleColumn.querySelector(".header-chat-info");
          var rightColumnProfile = rightColumn.querySelector(
            ".RightColumn__Profile"
          );
          var rightColumnEdit = rightColumn.querySelector(".RightColumn__Edit");
          var showEditProfile = rightColumn.querySelector(".open-edit-profile");

          // show search right column
          searchHeaderMiddle.onclick = function () {
            main.classList.toggle("right-column-open");
            rightColumnSearch.classList.add("shown");
            rightColumnEdit.classList.remove("shown");
            if (rightColumnProfile.classList.contains("shown")) {
              rightColumnProfile.classList.remove("shown");
            }
          };

          // show profile right column
          headerInfo.onclick = function () {
            _this.slideTabListProfile();
            main.classList.add("right-column-open");
            rightColumnProfile.classList.add("shown");
            if (rightColumnSearch.classList.contains("shown")) {
              rightColumnSearch.classList.remove("shown");
            }
          };
          showEditProfile.onclick = function () {
            rightColumnEdit.classList.add("shown");
            if (
              rightColumnProfile.matches(".shown") ||
              rightColumnSearch.matches(".shown")
            ) {
              rightColumnProfile.classList.remove("shown");
              rightColumnSearch.classList.remove("shown");
            }
          };
        }

        var closeRightColumn = rightColumn.querySelectorAll(
          ".close-right-column"
        );
        closeRightColumn.forEach(function (a) {
          a.onclick = function () {
            main.classList.remove("right-column-open");
          };
        });
      }

      // popup add contact
      if(main){
        var addContact = main.querySelectorAll('.AddContact');
        if(popupAddContact){
          popupAddContact.forEach(function(a){
            var showPopupAddContact = a.querySelector('.NewContactModal');
            addContact.forEach(function(b){
              b.onclick = function(){
                showPopupAddContact.classList.add('open');
                showPopupAddContact.classList.add('shown');
              }
            })
  
            var cancelAddContact = a.querySelector('.Cancel');
            cancelAddContact.onclick = function(){
              showPopupAddContact.classList.remove('open');
              showPopupAddContact.classList.remove('shown');
            }
          })
        }

      }


      // popup new contact
      if(main){
        var newContact = main.querySelectorAll('.NewContact');
        if(popupNewContact){
          popupNewContact.forEach(function(a){
            var showPopupNewContact = a.querySelector('.NewContactModal');
            newContact.forEach(function(b){
              b.onclick = function(){
                showPopupNewContact.classList.add('open');
                showPopupNewContact.classList.add('shown');
              }
            })
  
            var cancelNewContact = a.querySelector('.Cancel');
            cancelNewContact.onclick = function(){
              showPopupNewContact.classList.remove('open');
              showPopupNewContact.classList.remove('shown');
            }
          })
        }

      }
      // hide cac element khi click ra ngoai
      document.addEventListener("click", function (e) {
        if (dropdownMenu) {
          if (
            !showSubMenu.contains(e.target) &&
            !e.target.matches(".Button.has-ripple")
          ) {
            parentSubMenu.classList.remove("open");
          }
        }

        if (middleColumn) {
          if (
            !middleColumn
              .querySelector(".hearder-tool__dropdown")
              .contains(e.target) &&
            !e.target.matches(".hearder-tool__icon")
          ) {
            middleColumn
              .querySelector(".hearder-tool__dropdown")
              .classList.remove("open");
          }
        }
      });
    },
    // slide tab list
    slideTabList: function () {
      $(".TabList").not(".slick-initialized").slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: ".Tab-content",
        focusOnSelect: true,
        infinite: false,
      });
      $(".Tab-content").not(".slick-initialized").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".TabList",
        infinite: false,
        dots: false,
        fade: true,
        arrows: false,
      });
    },
    // slide tab list profile
    slideTabListProfile: function () {
      $(".RightColumn__TabList").not(".slick-initialized").slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: ".RightColumn__Tab-content",
        focusOnSelect: true,
        infinite: false,
      });
      $(".RightColumn__Tab-content").not(".slick-initialized").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".RightColumn__TabList",
        infinite: false,
        dots: false,
        fade: true,
        arrows: false,
      });
    },
    // window scroll
    windowScroll: function () {
      var _this = this;
      window.onscroll = function () {};
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

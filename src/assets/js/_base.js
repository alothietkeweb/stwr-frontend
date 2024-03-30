var Base = {
    config: {
    },
    option: {        
        tabs:{
            tabQuery: 'data-tab',
            tabOpt: 'data-opt',
            tabAct: 'data-active'
        }
    },    
    /**
     * Quy Tắc
     * data-tab="nav-band" id của content
     * data-opt="hover" loại tab sử dụng hover hay click
     * data-active="true" trạng thái ban đầu
     * Quy Tắc Gom nhóm : 
     * mỗi nhóm Tab sẽ được quy định là data-tab="[name]-*"
     * ví dụ : data-tab="nav-*"=>nav-a, nav-b, data-tab="product-*"=> product-a, product-b
    */
    Tabs: function () {
        let config = this.config.tabs;
        let targetEls = document.querySelectorAll(`[${config.tabQuery}]`);
        targetEls.forEach(targetEl => {
            var rest = function (tEl) {
                let tElContent = document.getElementById(tEl.getAttribute(config.tabQuery));               
                let tElActive = tEl.getAttribute(config.tabAct);
                if (tElActive == 'false') {
                    tElContent.style.display = 'none';
                } else {
                    tElContent.style.display = 'block';
                }
            }
            rest(targetEl);      
            let eventHover = function(_this){
                /**
                 * tim trong chuỗi ví dụ data-tab="nav-band"
                 * tách ra để lấy nhóm data-tab="nav-*" nếu muốn rào thêm ký tự cuối thì thêm [data-id$="-brand"]
                */
                let getGroup = _this.getAttribute(config.tabQuery).split("-");
                let elsGruop = document.querySelectorAll(`[${config.tabQuery}^="${getGroup[0]}-"]`);
                elsGruop.forEach(_tEl => {
                    _tEl.setAttribute(config.tabAct, 'false');
                    document.getElementById(_tEl.getAttribute(config.tabQuery)).style.display = 'none';
                }); 
                _this.setAttribute(config.tabAct, 'true')
                document.getElementById(_this.getAttribute(config.tabQuery)).style.display = 'block';   
            }       
            if(targetEl.getAttribute(config.tabOpt) == 'hover'){   
                targetEl.addEventListener("mouseenter", function() {
                    // Xử lý khi con trỏ chuột đi vào phần tử                    
                    eventHover(this);                    
                });
                targetEl.addEventListener("mouseleave", function() {
                    // Xử lý khi con trỏ chuột rời khỏi phần tử
                    eventHover(this);  
                });
            }
            if(targetEl.getAttribute(config.tabOpt) == 'click'){                  
                targetEl.addEventListener('click', function () {                
                    eventHover(this); 
                })
            }
            
        });
    },   
    menuDesktop: function(element,translate) {//menu top  
        const targetEls = document.querySelectorAll('['+element+']');   
        targetEls.forEach(targetEl => {
            let id = targetEl.getAttribute(element);
            let active = document.querySelector('['+element+'="'+id+'"]');
            let divEl = document.getElementById(id);            
            if (divEl !== null) {   
                let divElScroll = function(){                                        
                    divEl = document.getElementById(id); 
                    targetEl = document.querySelector('['+element+'="'+id+'"]');
                    //kiểm tra xem #nav-menu-top có sử dụng postion fixed không
                    let navMenuTop = document.getElementById('nav-menu-top'); 
                    let computedStyles = window.getComputedStyle(navMenuTop);              
                    if (computedStyles.position === 'fixed' || computedStyles.position === 'sticky' ) {                  
                        //có dùng xử lý postion cho menu con
                        divEl.style.position = 'fixed';
                        divEl.classList.remove('hidden');
                        divEl.style.top = targetEl.getBoundingClientRect().bottom + 'px';                        
                    }else{                       
                        //ko dùng xử lý postion cho menu con
                        divEl.style.position = 'absolute';
                        divEl.classList.remove('hidden');
                        divEl.style.top = null;
                    }
                } 
                var scrollPosition = window.scrollY || window.pageYOffset;    
                if(scrollPosition > 0){//giữa chừng mà user ấn F5   
                    setTimeout(divElScroll, 500); 
                }else{
                    divElScroll();
                }                
                //khi quay con lăn gọi
                window.addEventListener('scroll', divElScroll);

                //xử lý loại menu là dạng sổ hay dạng bảng
                if(divEl.hasAttribute('dropdown-list')){
                    //list thì bắt vị trí hover để đưa block tới
                    divEl.style.left = targetEl.offsetLeft + 'px';
                }else{  
                }
                /*
                * nếu action true thì hiện menu
                * nếu action false thì ẩn menu
                */
                let toggleCheck = function(action){
                    divEl= document.getElementById(id);
                    if(action){
                        divEl.classList.remove(translate);
                        active.setAttribute('data-nav','open'); 
                    }else{                        
                        divEl.classList.add(translate);
                        active.setAttribute('data-nav','close');
                    } 
                } 
                /*
                * check theo điều kiện attrib menu sở hữu
                */
                let toggleAttrib = function(action){
                    divEl= document.getElementById(id);
                    if (divEl.classList.contains(translate)){
                        divEl.classList.remove(translate);
                        active.setAttribute('active','true'); 
                    }else{
                        divEl.classList.add(translate);
                        active.removeAttribute('active');
                    }   
                }               
                //hover cho thẻ a
                targetEl.addEventListener('mouseenter', function(event) {
                    toggleCheck(true);           
                });
                targetEl.addEventListener('mouseleave', function(event) {
                    toggleCheck(false);
                });
                //hover cho sub menu                
                divEl.addEventListener('mouseenter', function(event) {
                    toggleCheck(true);              
                });
                divEl.addEventListener('mouseleave', function(event) {
                    toggleCheck(false);
                });
                //sự kiện touchstart & click
                if(navigator.maxTouchPoints === 1){//cho màn cảm ứng
                    targetEl.addEventListener('touchstart', function(event) {
                        toggleAttrib();                 
                    });
                }else{
                    targetEl.addEventListener('click', function(event) {
                        toggleAttrib();            
                    });
                }                
            }
        });
    },  
    Process : function() {    
        var config_tmp = {};
        for (var key in this.option) {
          if (this.option.hasOwnProperty(key)) {
            config_tmp[key] = this.option[key];
          }
        }
        for (var key in this.config) {
          if (this.config.hasOwnProperty(key)) {
            config_tmp[key] = this.config[key];
          }
        }
        this.config = config_tmp;
      }
};
Base.Process();
Base.Tabs();
Base.menuDesktop("dropdown","-translate-y-full");
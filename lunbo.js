window.onload = function(){
    var banner = document.querySelector(".banner");
    var bannerImg = banner.querySelector(".banner_img");
    var indicator = banner.querySelector("ul:last-of-type");

    var first = bannerImg.querySelector("li:first-of-type");
    var last = bannerImg.querySelector("li:last-of-type");
    //克隆
    bannerImg.appendChild(first.cloneNode(true));
    bannerImg.insertBefore(last.cloneNode(true),bannerImg.firstChild);

    var lis = bannerImg.querySelectorAll("li");
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;

    //初始化
    bannerImg.style.width = count * bannerWidth + "px";
    for(var i = 0; i < count; i++) {
        lis[i].style.width = bannerWidth;
    }
    bannerImg.style.left = -bannerWidth + "px";
    var index = 1;

    //屏幕变化
    window.onresize = function(){
        clearInterval(timerId);
        bannerWidth = banner.offsetWidth;
        bannerImg.style.width = count * bannerWidth + "px";
        for(var i = 0; i < count; i++) {
            lis[i].style.width = bannerWidth;
        }
        bannerImg.style.left = -index * bannerWidth + "px";
        autoLunbo();
    }
    //轮播
    var timerId;
    var autoLunbo = function(){
        timerId = setInterval(function(){
            index++;
            bannerImg.style.transition = "left 0.5s";
            bannerImg.style.left = -index * bannerWidth + "px";
        },1000);
    }
    autoLunbo();
    //滑动
    var startX,moveX,distanceX;
    var isEnd = true;

    bannerImg.addEventListener("touchstart", function(e){
        clearInterval(timerId);
       startX = e.targetTouches[0].clientX;
    });
    bannerImg.addEventListener("touchmove", function(e){
        if(isEnd == true){
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            bannerImg.style.transition = "none";
            bannerImg.style.left= -index * bannerWidth + distanceX + "px";
        }
    });
    bannerImg.addEventListener("touchend",function(e){
        isEnd = false;
       if(Math.abs(distanceX) > 100) {
         if(distanceX > 0) {
             index--;
         } else if(distanceX < 0) {
             index++;
         }
       }
        bannerImg.style.transition = "left 0.5s";
        bannerImg.style.left= -index * bannerWidth + "px";
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });

    bannerImg.addEventListener("webkitTransitionEnd",function(){
        if(index == count - 1) {
            index = 1;
            bannerImg.style.transition = "none";
            bannerImg.style.left= -index * bannerWidth + "px";
        } else if(index == 0) {
            index = count - 2;
            bannerImg.style.transition = "none";
            bannerImg.style.left= -index * bannerWidth + "px";
        }
        setIndicator(index);
        setTimeout(function(){
            isEnd = true;
            clearInterval(timerId);
            autoLunbo();
        },100);
    });
    var setIndicator = function(index){
        var indicators = indicator.querySelectorAll("li");
        for(var i = 0;i < indicators.length; i++){
            indicators[i].classList.remove("active");
        }
        indicators[index - 1].classList.add("active");
    }
}
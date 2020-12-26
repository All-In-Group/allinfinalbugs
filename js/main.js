$(document).ready(function () {
    window.onload = (event) => {
        $(".wrap-loader").hide();
    };

    $(document).on("click", '.navbar-nav>li>a[href^="#"]', function (e) {
        let id = $(this).attr("href");
        let $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();
        let pos = $id.offset().top;

        $("body, html").animate({ scrollTop: pos });
    });

    $(".intro-slider").slick({
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: false,
    });

    $(".slick-slider-works").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 576, // mobile breakpoint
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 425, // mobile breakpoint
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    });

    $("#tabs").tabs();

    $("#mobile-tabs").accordion({
        heightStyle: "content",
    });

    $(".slick-slider-team").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    dots: false,
                    arrows: false,
                },
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: false,
                    dots: false,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: false,
                    dots: false,
                },
            },
        ],
    });

    $(".slick-slider-works .slick-arrow").hide();
    $(".intro-slider .slick-arrow").hide();

    window.onscroll = function () {
        fixing_navbar();
    };

    function fixing_navbar() {
        let header = $(".navbar");
        let windowHeight = window.pageYOffset;

        if (windowHeight > 0) {
            header.addClass("navbar-fixed");
            $(".navbar-brand img").hide("slide", { direction: "up" }, 1000);
            $(".navbar-brand p").show("slide", { direction: "down" }, 1000);
        } else {
            header.removeClass("navbar-fixed");
            $(".navbar-brand img").show("slide", { direction: "up" }, 1000);
            $(".navbar-brand p").hide("slide", { direction: "down" }, 1000);
        }
    }

    $(".navbar-default .navbar-collapse ul li").click(function () {
        $(".navbar-default .navbar-collapse").removeClass("in");
    });

    // statistics

    function number_to(className, from, to, duration) {
        let element = $("." + className);
        let start = new Date().getTime();
        setTimeout(function () {
            let now = new Date().getTime() - start;
            let progress = now / duration;
            let result = Math.floor((to - from) * progress + from);
            element.html(progress < 1 ? result + "+" : to + "+");
            if (progress < 1) setTimeout(arguments.callee, 10);
        }, 10);
    }

    window.addEventListener("scroll", function f() {
        if ($(".statistic").offset().top - $(window).scrollTop() - $(window).height() + 200 <= 0) {
            number_to("counter1", 1, 300, 1500);
            number_to("counter2", 1, 27, 1500);
            number_to("counter3", 1, 54, 1500);
            number_to("counter4", 1, 350, 1500);
            window.removeEventListener("scroll", f);
        }
    });
});

// data from json

function chnageLanguages(x) {
    fetch("https://api.allin.am/data/allin-" + x)
        .then((response) => response.json())
        .then((data) => {
            // menu
            var menu = document.getElementsByClassName("navbar-nav")[0];
            var menuLi = menu.getElementsByTagName("li");

            var menuValue = [];
            Object.keys(data.menu).forEach((key) => {
                menuValue.push(data.menu[key]);
            });
            var varmenuLi = 0;
            menuLi.forEach((el) => {
                el.getElementsByTagName("a")[0].innerHTML = menuValue[varmenuLi];
                varmenuLi++;
            });

            // slides
            var slide = document.getElementsByClassName("slick-content");
            var slideValue = [];
            Object.keys(data.slides).forEach((key) => {
                slideValue.push(data.slides[key]);
            });

            var varSlide = 0;
            slide.forEach((el) => {
                el.getElementsByTagName("h1")[0].innerHTML = slideValue[varSlide].text;
                el.getElementsByTagName("button")[0].innerHTML = `<a  href=${slideValue[varSlide].buttonUrl}></a>`;
                el.getElementsByTagName("a")[0].innerHTML = slideValue[varSlide].button;
                varSlide++;
            });

            var slideImg = document.getElementsByClassName("sl-img");

            var varSlideImg = 0;
            slideImg.forEach((el) => {
                el.getElementsByTagName("img")[0].src = slideValue[varSlideImg].image;
                varSlideImg++;
            });

            // mini services
            var miniServices = document.getElementsByClassName("caption");
            var miniServicesValue = [];
            Object.keys(data["mini-services"]).forEach((key) => {
                miniServicesValue.push(data["mini-services"][key]);
            });

            var varminiServices = 0;
            miniServices.forEach((el) => {
                el.getElementsByTagName("h2")[0].innerHTML = miniServicesValue[varminiServices].text;
                el.getElementsByTagName("p")[0].innerHTML = miniServicesValue[varminiServices].description;
                el.getElementsByTagName("button")[0].innerHTML = `<a  href=${slideValue[varminiServices].buttonUrl}></a>`;
                el.getElementsByTagName("a")[0].innerHTML = slideValue[varminiServices].button;
                varminiServices++;
            });

            var miniServicesImg = document.getElementsByClassName("thm-img");

            var varminiServicesImg = 0;
            miniServicesImg.forEach((el) => {
                el.getElementsByTagName("img")[0].src = miniServicesValue[varminiServicesImg].image;
                varminiServicesImg++;
            });

            // about us
            var aboutUs1 = document.getElementsByClassName("item1")[0];
            var aboutUs2 = document.getElementsByClassName("item2")[0];
            var aboutUsValue = [];
            Object.keys(data["about-us"]).forEach((key) => {
                aboutUsValue.push(data["about-us"][key]);
            });

            aboutUs1.getElementsByTagName("img")[0].src = aboutUsValue[3];
            aboutUs2.getElementsByTagName("h1")[0].innerHTML = aboutUsValue[0];
            aboutUs2.getElementsByTagName("h4")[0].innerHTML = aboutUsValue[4];

            var aboutUs3 = document.getElementsByClassName("item3")[0];

            aboutUs3.getElementsByTagName("p")[0].innerHTML = aboutUsValue[5];

            var aboutUs3DivImg = document.getElementsByClassName("col-md-1");

            var varaboutUs3DivImg = 0;
            aboutUs3DivImg.forEach((el) => {
                el.innerHTML = aboutUsValue[6][varaboutUs3DivImg].image;
                varaboutUs3DivImg++;
            });

            var aboutUs3DivText = document.getElementsByClassName("col-md-11");
            var varAboutUs3DivText = 0;
            aboutUs3DivText.forEach((el) => {
                el.getElementsByTagName("p")[0].innerHTML = aboutUsValue[6][varAboutUs3DivText].text;
                varAboutUs3DivText++;
            });

            aboutUs3DivText[2].getElementsByTagName("button")[0].innerHTML = `<a  href=${aboutUsValue[2]}></a>`;
            aboutUs3DivText[2].getElementsByTagName("button")[0].innerHTML = aboutUsValue[1];

            //services
            var services = document.getElementById("tabs");
            var servicesLi = services.getElementsByTagName("li");
            var servicesValue = [];
            Object.keys(data["services"]).forEach((key) => {
                servicesValue.push(data["services"][key]);
            });

            var varServices = 0;
            servicesLi.forEach((el) => {
                el.getElementsByTagName("img")[0].src = servicesValue[varServices].image;
                el.getElementsByTagName("h3")[0].innerHTML = servicesValue[varServices].title;
                varServices++;
            });

            var servicesContent = document.getElementsByClassName("tabs_content");
            var varServicesContent = 0;
            servicesContent.forEach((el) => {
                el.getElementsByTagName("h4")[0].innerHTML = servicesValue[varServicesContent].contentTitle;
                el.getElementsByTagName("div")[0].innerHTML = servicesValue[varServicesContent].content;
                varServicesContent++;
            });

            var servicesImg = document.getElementsByClassName("tabs-content-img");
            var varServicesImg = 0;
            servicesImg.forEach((el) => {
                el.getElementsByTagName("img")[0].src = servicesValue[varServicesImg].contentImage;
                varServicesImg++;
            });
        });
}

chnageLanguages("arm");

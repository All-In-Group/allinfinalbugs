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

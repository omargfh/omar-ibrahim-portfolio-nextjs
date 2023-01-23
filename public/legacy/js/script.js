$(document).ready(function() {

    // Prespective on hover
    document.querySelectorAll('.prsp').forEach(function(card) {
        card.addEventListener('mousemove', prespectiveOnHover);
        card.addEventListener('mouseout', turnOffPrespective);
    });

    // Brings sub-menus to Bootstrap 4 (by Gerhard Gotz on StackOverFlow)
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        var $subMenu = $(this).next('.dropdown-menu');
        $subMenu.toggleClass('show');


        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass('show');
        });


        return false;
    });

    // General variables to avoid calling the DOM
    doc_height = $(document).height();
    win_height = $(window).height();

    // Custom script for (index.html) and pages other than (index.html)
    if (window.location.pathname !== "/index.html" && window.location.pathname !== "/") {
        if (window.location.pathname === "/arts.html") {
            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                autoplay: true,
                autoplayTimeout: 5000,
                margin: 50,
                center: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 5
                    }
                }
            })
        }

        headerControl("onload");
        $('.navbar-toggler').click(function() {
            headerControl("onclick");
        });

        $(window).on('resize', function() {
            headerControl("onload");
        });

        $(window).on('scroll', function() {
            headerControl("onscroll");
        });
    } else {
        $('.count').scroll();

        headerControl("onload", "index");
        $('.navbar-toggler').click(function() {
            headerControl("onclick", "index");
        });
        $(window).on('resize', function() {
            headerControl("onload", "index");
            changeText("#right-down", 767, "To the right, you can see a picture of me during the last STEM Model UN!", "If you look down, you can see a picture of me during the last STEM Model UN!");
        });

        $(window).on('scroll', function() {
            headerControl("onscroll", "index");
            showElements('#section-1-nav', 'section-1');
            $('.event').each(function(i, el) {
                showElements(el, 'timeline');
            })
        });
    }

    // Loader
    var hideLoader = setInterval(() => {
        if (document.readyState === 'complete') {
            hideLoading();
            clearInterval(autoHideLoader);
        }
    }, 100);
    var autoHideLoader = setInterval(() => {
        hideLoading();
        clearInterval(hideLoader);
    }, 15000);

    function hideLoading() {
        $('.holder').fadeTo(1000, 0);
        setTimeout(() => {
            $('.holder').css({ "display": "none" });
            clearInterval(hideLoader);
        }, 1000);
    }

    // Particle Js
    // particlesJS("particles-js", { "particles": { "number": { "value": 260, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 1, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 4, "size_min": 0.3, "sync": false } }, "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 600 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3 }, "repulse": { "distance": 400, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });
    // particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});

    // Activate Carousel
    $('.carousel').carousel({
        interval: 5000
    });

    $(window).on('scroll', function() {
        $('.gallery-item').each(function(i, el) {
            el = $(el);
            if (isElementInViewport(el)) {
                el.addClass('gallery-item-hover');
            } else {
                el.removeClass('gallery-item-hover');
            }
        });

        // Uncolor (depends on jQuery plugin colormatrix.js)
        $('.color').each(function(i, el) {
            var color = $(el);
            if (isElementInViewport(color)) {
                color.removeClass('grayscale');
            }
        });

        // Hides scroll botton
        var scrollbtn = $('.scroll-btn');
        if ($(document).scrollTop() <= 385 && !scrollbtn.hasClass("notshown")) {
            scrollbtn.addClass("notshown").fadeTo("slow", 0);
        } else if ($(document).scrollTop() > 385 && scrollbtn.hasClass("notshown")) {
            scrollbtn.fadeTo(0, 1).removeClass("notshown");
        }

        // // Progress Bar
        // var scrolled = $(window).scrollTop() / (doc_height - win_height);
        // $('.progress-bar').css("width", scrolled * 100 + "%");

        // Count.js
        $(".count").each(function(i, el) {
            _el = $(el);
            if (isElementInViewport(el) && !_el.hasClass("counted")) {
                _el.addClass("counted");
                str = el.innerHTML;
                step = _el.data("step");
                num = Number(str);
                time = 1 * 1000 / num * step;
                time = _el.data("time") ? _el.data("time") * time : 2 * time;
                html = "";
                for (let i = 0, c = 0; Number((i).toFixed(1)) <= num; i += step, c++) {
                    if (_el.hasClass("count-float")) {
                        val = str.split(".");
                        n = val[0].length + val[1].length;
                        html = "";
                        if (i.toPrecision(n).length === n + 1) {
                            html = i.toPrecision(n);
                        } else {
                            html = i.toPrecision(n - 1);
                        }
                    } else {
                        html = i;
                    };
                    count(el, html, c, time);
                }
            }
        });
    });

    // Check for scroll/resize statuses to update DOM
    $('.scroll-behavior').scroll();
    $('.resize-behvior').resize();
    $('.color').scroll();

    // GreenStock Animations
    try {
        gsap.registerPlugin(ScrollTrigger);
        gsap.defaults({ ease: "power3.inOut" });
        $('.reveal').each(function(i, el) {
            _el = $(el);
            x = 0;
            y = 0;
            d = 0.25;
            s = "top bottom";
            if (_el.hasClass("reveal-from-right")) {
                x = 100;
            } else if (_el.hasClass("reveal-from-left")) {
                x = -100;
            }
            if (_el.hasClass("reveal-from-bottom")) {
                y = 100;
            } else if (_el.hasClass("reveal-from-top")) {
                y = -100;
            }
            if (_el.hasClass("delay")) {
                d = 0.25;
            }
            if (_el.hasClass("start")) {
                s = "-80px bottom";
            }
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    toggleActions: "play pause resume reset",
                    start: s,
                    end: "bottom 60px"
                },
                x: x,
                y: y,
                duration: 1,
                opacity: 0,
                delay: d,
                stagger: 0.25,
            });
        });

        gsap.from('.card', {
            scrollTrigger: {
                trigger: '.card',
                toggleActions: "play none none none"
            },
            onEnter: () => {
                $('.card').addClass("card-animate");
                setTimeout(() => $('.card').removeClass("card-animate"), 1000);
            },
            delay: 1
        });

        gsap.from(".menu .fa-2x", {
            scrollTrigger: ".fas .fa-feather-alt",
            duration: 2,
            scale: 0.5,
            opacity: 0,
            delay: 0.3,
            stagger: 0.2,
            ease: "elastic.inOut",
            force3D: true
        });

        gsap.set(".card-container, .quote h1", { y: 100 });
        // gsap.set(".category-card", { opacity: 0, y: 100 });

        ScrollTrigger.batch(".card-container, .quote h1, .entry-card", {
            toggleActions: "play pause resume reset",
            interval: 0.1,
            onEnter: batch => gsap.to(batch, { duration: 0.5, opacity: 1, y: 0, stagger: { each: 0.15, grid: [1, 3] }, overwrite: true }),
            onLeave: batch => gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
            onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
            onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, overwrite: true })
        });

        const loader = $('.page-title');
        loader.each(function() {
            gsap.from(this, {
                scrollTrigger: {
                    trigger: this,
                    scrub: 1,
                },
                x: -3000,
                delay: 1,
                ease: "power3"
            })
        });
        // ScrollTrigger.batch(".category-card", {
        //     interval: 0.1,
        //     onLeave: batch => gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
        //     onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
        //     onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, overwrite: true })
        // });

        ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".card-container, .quote h1, .category-card, .entry-card", { y: 0 }));

        gsap.from('.quotation-mark', {
            scrollTrigger: { trigger: '.quotation-mark', toggleActions: "play reset play reset" },
            x: -50,
            y: 50,
            ease: "bounce",
            duration: 1
        });

        gsap.from(".para-reveal", {
            scrollTrigger: {
                trigger: ".para-reveal.trigger",
                toggleActions: "play pause resume reset",
                start: "-80px bottom",
                end: "bottom 60px"
            },
            opacity: 0,
            delay: 0.25,
            y: -100,
            stagger: { each: 0.15, grid: [1, 3] },
            overwrite: true
        });
    } catch (err) {
        console.log(err);
    }
    // Expand
    $('.expand').click(function() {
        _el = $(this);
        target = $("#" + _el.data("target"));
        target.hasClass("expanded") ? unexpand(_el, target) : expand(_el, target);

        function expand(_el, target) {
            target.addClass("expanded");
            setTimeout(() => {
                _el.css("animation", "float-rotated 6s ease-in-out infinite");
                _el.parent().css("opacity", 0.7);
            }, 700);
        }

        function unexpand(_el, target) {
            target.removeClass("expanded");
            setTimeout(() => {
                _el.css("animation", "float 6s ease-in-out infinite")
                _el.parent().css("opacity", 1);
            }, 700);
        }
    });

    // Projects Carousel
    var locked = false;
    $('.projects-control').click(function(event) {
        if (this.hash !== "" && locked == false) {
            event.preventDefault();
            var action = $(this).data("slide");
            var selector = "." + this.hash.replace("#", "");
            var active = ".projects-active";
            var changes = [selector + "-image", selector + "-item"]
            changes.forEach(function(change, i) {
                _el = $(change + active);
                if (action == "next") {
                    change = _el.next(".projects-variables").length == 0 ? $($(change).get(0)) : _el.next(change);
                } else {
                    change = _el.prev(".projects-variables").length == 0 ? $($(change).last()) : _el.prev(change);
                }
                if (change.length !== 0) {
                    if (i === 0) {
                        // Exectue Animation on Image
                        if (_el.children().is("video")) {
                            _el.children()[0].pause();
                        }
                        locked = animate(_el, change, action);
                    } else {
                        // Instantly change side text
                        _el.animate({ opacity: 0 }, 500, "swing", function() {
                            _el.removeClass(active.replace(".", ""));
                            change.addClass(active.replace(".", "")).css("opacity", "0").animate({ opacity: 1 }, 500, "swing");
                        });
                    }
                }
            });

            function animate(_el, change, action) {
                // Make both items active
                _el.addClass(active.replace(".", ""));
                change.addClass(active.replace(".", ""));
                // Check for the direction
                if (action == "next") {
                    // Make object absolute and animated
                    _el.addClass("absolute projects-animate");
                    // Return everything to normal
                    locked = true;
                    setTimeout(() => {
                        _el.removeClass("absolute projects-animate projects-animate-reverse");
                        _el.removeClass(active.replace(".", ""));
                        locked = false;
                    }, 600);
                } else {
                    // Make object absolute and animated
                    change.addClass("absolute projects-animate-reverse");
                    // Return everything to normal
                    setTimeout(() => {
                        change.removeClass("absolute projects-animate-reverse projects-animate");
                        _el.removeClass(active.replace(".", ""));
                        locked = false;
                    }, 1000);
                }
                if (change.children().is("video")) {
                    locked = true;
                    change.children()[0].load();
                    change.children()[0].currentTime = 1;
                    setTimeout(() => {
                        change.children()[0].play();
                        locked = false;
                    }, 500);
                }
                return locked;
            }
        }
    });

    // Smooth-scrolling
    $('.scroll').click(function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
        }
        $('html, body').animate({
            scrollTop: ($(hash).offset().top - 60)
        }, 800, function() {
            history.pushState({}, '', hash);
        });
    });

    // Image gallery (on "arts.html")
    $('.gallery-item').each(function(i, el) {
        el = $(el);
        el.mouseover(function() {
            if (el.children().prop('naturalWidth') >= el.width()) {
                // Extract data
                var image = new Image();
                image.src = el.children()[0].dataset.hover;
                image.onload = function() {
                    var update = $('.show-gallery-item-on-hover');
                    update.each(function(i, up) {
                        update = $(up);
                        update.css({
                            opacity: 0
                        });
                        update.html("");
                        update.html(image);
                        setTimeout(() => {
                            // Adjust preview dimensions (responsive)
                            var nH = update.children().prop('naturalHeight');
                            var nW = update.children().prop('naturalWidth');
                            if (update.children().prop('naturalWidth') > 2 * el.width() && nW >= nH) {
                                update.children().width(2 * el.width());
                                update.children().height(nH * ((2 * el.width()) / nW));
                            } else if (update.children().prop('naturalHeight') > 2 * el.width()) {
                                update.children().height(2 * el.width());
                                update.children().width(nW * ((2 * el.height()) / nH));
                            }

                            // Calculate new position
                            pos = el.parent().offset();
                            pos.right = Math.round(pos.left + el.width());
                            pos.bottom = Math.round(el.height() + pos.top);
                            pos.width = update.children().width() !== 0 ? update.children().width() : nW;
                            pos.height = update.children().height() !== 0 ? update.children().height() : nH;
                            pos.midY = (pos.top + pos.bottom) / 2;
                            pos.midX = (pos.left + pos.right) / 2;
                            pos.newY = Math.round(pos.midY - (pos.height / 2) - $('.navbar').offset().top) <= 72.5 ?
                                pos.top : pos.midY - pos.height / 2 >= 0 ?
                                pos.midY - pos.height / 2 : 0;
                            pos.newX = Math.round(pos.right - $(window).width()) >= -20 ?
                                pos.right - pos.width : pos.midX - pos.width / 2 >= 0 ?
                                pos.midX - pos.width / 2 : 0;

                            // Update elements

                            update.parent()[0].dataset.content = el.children()[0].dataset.popup;
                            update.parent()[0].dataset.flairs = el.children()[0].dataset.flairs;
                            if (el.children()[0].dataset.type === "XHTML") {
                                update.parent()[0].dataset.type = el.children()[0].dataset.type;
                            } else {
                                update.parent()[0].dataset.type = "image";
                            }
                            update.css({
                                top: pos.newY,
                                left: pos.newX,
                                zIndex: 10,
                                boxShadow: "0px 0px 10px rgba(32, 32, 32, 0.6)",
                                opacity: 0
                            });
                            update.animate({
                                opacity: 1
                            }, 600);
                            setTimeout(() => {
                                $('.show-gallery-item-on-hover').mouseleave();
                            }, 30000);
                        }, 50);
                    });
                }
            }

        });
        $('.show-gallery-item-on-hover').mouseleave(function(event) {
            this.innerHTML = "";
        });
    });

    // DOM Manipulation based on hover
    $('.img-bar').each(function(i, el) {
        var el_dom = $(el);
        el_dom.hover(function() {
            data = el.dataset;
            $('.img-bar').removeClass('active');
            el_dom.addClass('active');
            $('#program').html(el.alt);
            $('#years').html(data.years + "+ years");
            $('#projects').html("Notable projects: " + data.prj);
            $('.experience-bar-after').width(el.dataset.exp + "%");
        });
    });
    $('#img-active').mouseover();
    // Pop-ups
    $(function() {
        var popupcontent = $("#pop-up-content");
        var popupwindow = $("#pop-up-window");
        var popupclose = $("#pop-up-close");
        var flair = $('.flair');
        $('.pop-up-call').each(function(i, el) {
            $(el).click(function() {
                $('#pop-up').removeClass('remove');
                popupwindow.addClass('pop-up-window-animate');
                if (el.dataset.type === "XHTML") {
                    $('#close-image').removeClass('close-image');
                    popupcontent.html('<div style="display: flex; flex: 100%; width: 100%; height: 100%; align-items: center; justify-content: center;"><img src="https://i.stack.imgur.com/oQ0tF.gif" width="40px" alt="load"></div>');
                    $.ajax({
                        type: 'GET',
                        url: el.dataset.content,
                        success: function(data) {
                            popupcontent.html(data);
                        },
                        error: function(a, b) {
                            setTimeout(() => {
                                popupclose.click();
                            }, 1000)
                        }
                    });
                    $(window).resize(function(event) {
                        event.preventDefault();
                        popupwindow.width("90%");
                    });
                    $(window).resize();
                } else if (el.dataset.type === "image") {
                    var img = new Image();
                    img.src = el.dataset.content;
                    popupwindow.addClass('image-display').css("background-image", "url(./" + el.dataset.content + ")");
                    // Loop through flairs and append them
                    if (el.dataset.flairs !== "") {
                        var flairs = el.dataset.flairs.split(" ");
                        flairs.forEach(function(el, i) {
                            if (i % 2 == 0) {
                                $('.' + el).removeClass('remove');
                            } else {
                                $('.group').removeClass('remove');
                                $('.' + flairs[i - 1]).children()[0].href = el;
                            }
                        });
                    }
                    // Adjusts placement of "X" button and other flairs
                    img.onload = function() {
                        $(window).resize(function(event) {
                            var newWidth = img.width;
                            var newHeight = img.height;
                            if (img.height > 0.9 * win_height && $(window).width() > 568) {
                                newWidth = img.width * (0.9 * win_height / img.height);
                                popupwindow.width(newWidth);
                                if ($(window).width() < newWidth) {
                                    popupwindow.width("90%");
                                }
                            } else {
                                popupwindow.width("90%");
                            }
                            if (newWidth > 0.9 * $(window).width()) {
                                flair.addClass('flair-bottom');
                            } else {
                                flair.removeClass('flair-bottom');
                            }
                        });
                        $(window).resize();
                    }
                }
            });
        });
        popupclose.click(function() {
            // Remove the intro animation
            popupwindow.removeClass('pop-up-window-animate');
            // Animate the window close (delay for CSS render)
            setTimeout(() => {
                popupwindow.addClass('pop-up-window-close-animate');
            }, 200);
            setTimeout(() => {
                // Hide pop-up from workflow
                $('#pop-up').addClass('remove');
                // Remove content for XHTML pop-up calls
                popupcontent.html("");
                // Remove classes from window body
                popupwindow.removeClass('pop-up-window-close-animate').removeClass('image-display').width("90vh").css("background-image", "");
                // Hide flairs
                flair.addClass('remove');
                $('#close-image').addClass('close-image');
            }, 1200);
        });
        // Add change-on-hover effect
        $('.change-on-hover').each(function(i, el) {
            $(el).mouseover(function() {
                this.children[0].src = this.children[0].src.replace(".png", "-hover.png");
            });
            $(el).mouseleave(function() {
                this.children[0].src = this.children[0].src.replace("-hover.png", ".png");
            });
        });
    });
    // Highlights
    $('.highlights__card').click(function() {
        let $this = $(this)[0];
        let $active = $highlightsCard.filter('.active');
        let $test = $active;
        if ($this != $active[0]) {
            let mv = -280;
            let x = 1;
            let $send = $($this).prev();
            while ($test.next()[0] != $this) {
                mv -= 280;
                $test = $test.next();
                if ($test.length != 1) {
                    mv = 280;
                    x = 1;
                    $test = $active;
                    $send = $($this).next();
                    while ($test.prev()[0] != $this) {
                        mv += 280;
                        $test = $test.prev();
                        if ($test.length != 1) {
                            break;
                        }
                    }
                    break;
                }
            }
            $active.removeClass('active');
            switchCard(x, $send, mv);
        }
    });
    let callHighlightsForward = function() {
        window.highlightsInterval = setInterval(() => {
            if (!document.hidden) {
                switchCard(-1);
            }
        }, 8000);
    };
    ScrollTrigger.batch('.highlights_parent', {
        onEnter: callHighlightsForward(),
        onLeave: clearInterval(callHighlightsForward)
    });
    // News Carousel
    showNews();
    $('.posts-wrapper .post').click(function() {
        selectNews($('.post').filter(this).index());
    })
});

function isElementInViewport(el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (win_height || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function showElements(check, el) {
    check = typeof check === 'string' ? document.querySelector(check) : check;
    if (isElementInViewport(check)) {
        let elements = document.getElementsByClassName(el);
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('visible-mobile')) {
                elements[i].classList.toggle('visible-mobile');
                var string = el + '-animate';
                elements[i].classList.toggle(string);
            } else {
                break;
            }
            setTimeout(() => { elements[i].classList.toggle(string) }, 900);
        }
    }
}

function changeText(el, wd, lg, sm) {
    let docref = $(el)[0];
    if (window.innerWidth <= wd) {
        docref.innerHTML = sm;
    } else {
        docref.innerHTML = lg;
    }
}

function headerControl(n, m) {
    var navbar = $('.navbar');
    var navbarbg = $('.navbar-bg');
    var chpic = $('#ch-pic');
    var headerflex = $('header-flex');
    var logo = $('#logo');
    if (n === "onclick") {
        navbarbg.toggleClass('hidden');
        if (m === "index") {
            chpic.removeClass('ch-pic-transit');
            $('#btn-learn-more-content').toggleClass('btn');
        }
        if (window.innerWidth < 991) {
            headerflex.toggleClass('visible-desktop');
        } else {
            headerflex.removeClass('hidden');
        }
    } else if (n === "onload") {
        if (m === "index") {
            let header = $('.workflow-header')[0];
            let img = $('#img-bg')[0];
            let header_height = img.clientHeight;
            header.style.height = parseInt(header_height) + "px";
        }
    } else if (n === "onscroll") {
        // Controls responsive behavior to scrolling
        navbarbg.addClass('hidden');
        $('#navbarSupportedContent').removeClass('show');
        headerflex.removeClass('visible-desktop');
        // Controls special behavior on index page
        if (m === "index") {
            chpic.addClass('ch-pic-transit');
            $('#btn-learn-more-content').addClass('btn');
        }
        // Controls color and logo of banner
        let rect = $('.bg')[0].getBoundingClientRect();
        var j = 400;
        if (m === "index") {
            j = 650;
        }
        if (rect.bottom <= j) {
            var scroll = $('.scroll');
            navbar.addClass('bg-light-onscroll');
            if (m === "index") {
                logo.addClass('logo-small');
            } else if (window.location.pathname !== "/" && window.location.pathname !== "/") {
                URI = "legacy/images/title-" + logo[0].dataset.alt + ".png";
                logo[0].src = URI;
                logo.css("max-height", "50px");
                if (["/code", "/development", "/code.html"].includes(window.location.pathname)) {
                    navbar.addClass('bg-green');
                    // scroll.fadeTo("fast", 1);
                }
            }
        } else {
            logo[0].src = "legacy/images/logo-sm-wh.png";
            logo.css("max-height", "45px")
                .removeClass('logo-small')
                .removeClass("morphed");
            navbar.removeClass('bg-light-onscroll');
            navbar.removeClass('bg-green');
        }
    }
}

function count(el, html, c, time) {
    setTimeout(function() {
        el.innerHTML = html;
    }, time + time * c);
}

let highlights_tl = gsap.timeline();
let $highlightsCard = $('.highlights__card')

function switchCard(x, $currentCard = $highlightsCard.filter('.active'), mv = 280) {
    x = x * mv;
    let $cards = $('.highlights');
    $currentCard.removeClass('active');
    $alter = x < 0 ? $currentCard.next() : $currentCard.prev();
    if ($alter.length != 1) {
        if (x < 0) {
            $alter = $highlightsCard.first();
            x = ($highlightsCard.length - 1) * mv;
        } else {
            $alter = $highlightsCard.last();
            x = ($highlightsCard.length - 1) * -mv;
        }
    }
    highlights_tl.to($cards, { x: `+=${x}`, duration: 0.7, ease: "power3.inOut", onStart: () => { $alter.addClass('active') } });
}
window.switchCard = switchCard;

// News Carousel by Juan on Codepen
function showNews(i = 0, postIndex = 0) {
    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {

        $('.progress-bar__fill').css({ 'width': 0 });
        $('.post').removeClass('post--active');
        $('.main-post').removeClass('main-post--active').addClass('main-post--not-active');
        let mainPosts = $(".main-post");
        let posts = $(".post");

        let currentPost = posts[postIndex];
        let currentMainPost = mainPosts[postIndex];

        let progressInterval = setInterval(progress, 100); // 180
        window.progressInterval = progressInterval;

        function progress() {

            window.postIndex = postIndex;
            if (i === 100) {
                i = -5;
                // reset progress bar
                currentPost.querySelector(".progress-bar__fill").style.width = 0;
                document.querySelector(
                    ".progress-bar--primary .progress-bar__fill"
                ).style.width = 0;
                currentPost.classList.remove("post--active");

                postIndex++;

                currentMainPost.classList.add("main-post--not-active");
                currentMainPost.classList.remove("main-post--active");

                // reset postIndex to loop over the slides again
                if (postIndex === posts.length) {
                    postIndex = 0;
                }

                currentPost = posts[postIndex];
                currentMainPost = mainPosts[postIndex];
            } else {
                i++;
                currentPost.querySelector(".progress-bar__fill").style.width = `${i}%`;
                document.querySelector(
                    ".progress-bar--primary .progress-bar__fill"
                ).style.width = `${i}%`;
                currentPost.classList.add("post--active");

                currentMainPost.classList.add("main-post--active");
                currentMainPost.classList.remove("main-post--not-active");
            }
        }
    }
}

function selectNews(index) {
    clearInterval(window.progressInterval);
    showNews(0, index);
};

function prespectiveOnHover(mouseEvent) {
    let $this = $(this);
    let $parent = $this.parent();
    let $parentWidth = $parent.width();
    let $parentHeight = $parent.height();
    let $parentOffset = $parent.offset();
    let $parentOffsetLeft = $parentOffset.left;
    let $parentOffsetTop = $parentOffset.top;
    let $parentCenterX = $parentOffsetLeft + $parentWidth / 2;
    let $parentCenterY = $parentOffsetTop + $parentHeight / 2;
    let $mouseX = mouseEvent.pageX;
    let $mouseY = mouseEvent.pageY;
    let $mouseXFromCenter = $mouseX - $parentCenterX;
    let $mouseYFromCenter = $mouseY - $parentCenterY;
    let $perspective = 1000;
    let $rotateY = $mouseXFromCenter / $perspective;
    let $rotateX = -$mouseYFromCenter / $perspective;
    let $translateZ = Math.abs($mouseXFromCenter) / 100 + Math.abs($mouseYFromCenter) / 100;
    $parent.css({
        "transform": "perspective(" + $perspective / 5 + "px) rotateX(" + $rotateX + "deg) rotateY(" + $rotateY + "deg) translateZ(" + $translateZ + "px)"
    });
}

function turnOffPrespective(mouseEvent) {
    let $this = $(this);
    let $parent = $this.parent();
    $parent.css({
        "transition": "all 0.5s ease",
        "transform": "perspective(100px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    });
}

window.news = selectNews;
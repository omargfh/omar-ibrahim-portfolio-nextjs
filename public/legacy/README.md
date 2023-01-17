# Omar Ibrahim Portfolio
This website is designed to serve as an expanded portfolio, including highlights, projects made, and courses taken. It is designed in HTML, CSS, Javascript, and JSON, while it also uses Bootstrap 4, GreenSock Animation Platform, Particles JS, jQuery, and Ajax. The website is live on <https:www.omaribrahim.tech> hosted on GitHub Pages and linked to a domain provided by *Name.com*.

# Landing Page
The landing page [index.html](https://www.omaribrahim.tech) is organized using the Bootstrap Grid system and also uses other Bootstrap components including navigation bar (used in other pages) and [contact form](https://www.omaribrahim.tech/index.html#footer). In this page, the Bootstrap carousel is modified to add an overlay effect instead of the classic title style provided natively by Bootstrap. Icons on the page are divided between Bootstrap Web Font icons and Font Awesome [not the best decision, but the shift was made late in the project so I replaced Bootstrap Web Font icons with their SVG components instead of loading the entire font file]. The page introduces custom Javascript component that is used as a counter in the page (see counter.js below).

# Creative Writing Page
The [creative writing page](https://www.omaribrahim.tech/writing.html) is a blog-like website with an app style. This page was the last to be designed and involved a lot of work in the making. The page natively houses creative writing categories, and when a category is clicked, an Ajax call is fired to load the respective *.json* file from the `/data` directory. Each *.json* file is dynamically created from a SQL *.db* in Python. The conversion was done to keep the website static and to minimize processing power, instead of dealing with SQL on the client-side, which can be very exhaustive. Whenever a category or an article is clicked, the URL, website title, and URL are changed to reflect the current page and register it in the user's history (see `/js/writing-blog-app.js` for the code). If the URL, which happens to be formatted in a similar style to the GET request format, is used to reach the page, a code is used to parse the URL and direct the user to the requested page. Ultimately, the objective here is to achieve similar effects to these seen from dynamically-generated server-based websites without a server, even if it comes with numerous caveats.

# Graphic Design Page
The [graphic design page](https://www.omaribrahim.tech/art.html) is a gallery page with multiple section, preceded with a header. Aside from native HTML and bootstrap, a dynamic *software* section is generated using Javascript. This page introduces two custom Javascript elements, which are the jQuery Gallery (see jQuery-Gallery below) and the Ajax Pop-up (see Pop-Up below). The jQuery gallery uses three images, a small and cropped `.webp` image with dimension of *450px ✕ 450px*, a full version of the cropped picture with the smallest dimension set to *450px* while the other is calculated to keep the aspects ratio, and a full-quality image. The choice of using three pictures instead of one comes to the fact that this website is a client-based static website, and generating various variations of the picture on the client side means the client have to load over 60MB of data and wait for a lengthy process of image processing to occur. Using two small pictures, however, lightens the data load by *lazyloading* the hover pictures. Since this process takes time, a python code [(see here)](https://github.com/omargfh/jQ-gallery-generator) was used to automate the process.

# Programming Page
The [programming page](https://www.omaribrahim.tech/code.html) is a developer portfolio page, which includes a brief, a courses section, and a projects section. The courses sections consists of cards displayed in Masonry Layout, a layout in which each row does not have a specific height across adjacent elements. This is achieved using three `flexbox` elements each set to `flex-direction: column;` and housed in a Bootstrap Column `<div class="col-md-4">`. The courses section is collapsed by default, and since its height is dynamically created, the transition is creating by add a hypothetical `max-height` value and following it with a `transition: max-height 1s ease-in-out` on the man `div` in the CSS code. The second part of the page is a carousel, and since I wanted to add extra functionality to the native Bootstrap carousel, I recreated it in jQuery with control on external elements (the side captions), modified image `div` container which supports both overlay and scale transitions, and support for videos. 

# Counter.js
Counter.js is a simple Javascript counter. In this project, it is invoked using `isElementInViewport();`; however, it could be invoked using a different trigger by changing the `trigger` variable below. 

```
$(".count").each(function(i, el) {
    var trigger = {{your trigger goes here, return true to trigger the event}}
    _el = $(el);
    if (trigger && !_el.hasClass("counted")) {
        _el.addClass("counted");
        str = el.innerHTML;
        step = _el.data("step") ? _el.data("step") : 1;
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

function count(el, html, c, time) {
    setTimeout(function() {
        el.innerHTML = html;
    }, time + time * c);
}
```

This function is ideally placed inside `$(window).scroll();` parent or `window.onscroll` to constantly check for the trigger, similar to the way it functions in the website.

The function provides two classes: `count` which must be included in all subject elements and `count-float` which is only needed when dealing with floating point numbers. It also requires a step value using the `data-step` HTML attribute *(uses a step of 1 by default)*. *counted* items animate at various speeds, depending on the step size and the target value, ensuring that all elements reach their final states at the same time of `2 seconds`; however, the optional HTML attribute `data-time` can be used to alter this value, where its input is in seconds. Finally, the content is provided from the DOM property `innerHTML`, so the `class="count"` must be placed on the element which **contains** the number to be counter and only the number to be counted.

# jQuery Gallery
The jQuery Gallery is seen multiple times on the [graphic design page](https://www.omaribrahim.tech/art.html) and it consists of two components: the hover element and the pop-up (see Ajax Pop-Up below). The gallery uses three images, a small and cropped `.webp` image with dimension of *450px ✕ 450px*, a full version of the cropped picture with the smallest dimension set to *450px* while the other is calculated to keep the aspects ratio, and a full-quality image. However, using three images is not compulsory since you can use the same image twice or in all three instances (that would not be a good decision since the base image must be a 450px square image). To construct a jQuery gallery in html, the following code is used (involved Bootstrap):

```
<div class="gallery">
    <div class="row no-gutters">
        <div class="col-md">
            <div class="gallery-item img-gradient">
                <img src="{{small-image}}" alt="alt text" data-hover="{{hover-image}}" data-popup="{{pop-up-image}}" data-flairs="{{flair-name} {{flair-link}}" width="450" height="450">
            </div>
        </div>
    </div>
</div>
```

The three image URLs/URIs are placed in the `{{small-image}}`, `{{hover-image}}`, and `{{pop-up-image}}` respectively. Optional flairs (buttons placed on the pop-up picture) can be specified using the `data-flairs` attribute and formatted like `data-flairs="behance www.behance.com"`. Flairs must also be declared in the hover `div` and the Cascading Style Sheet file. More on flairs in Ajax Pop-Up below.

To use the gallery, an additional floating hover element is added to be modified in jQuery. It is placed at the top of the `<body>` tag.

```
<div class="pop-up-call" data-type="image">
    <div class="show-gallery-item-on-hover"></div>
</div>
```

Additionally, some CSS is required to provide the final look of the hover element. It is found in lines 413—557 of commit `55545e4`, while the hover location is dynamically generated using Javascript to calculate size responsively and deal with corner cases such as images on the side of the page and images that could be obstructed with the navigation bar. The Javascript code for the hover element is starts on line 369 of commit `55545e4`. 

# Ajax Pop-Up
The Ajax Pop-Up is invoked as part of the jQuery gallery or independent of it. The basic construction for the Ajax Pop-up appends this code to the top of the `<body>` tag.

```
<div id="pop-up" class="pop-up remove">
    <div id="pop-up-window" class="pop-up-window">
        <div id="close-image" class="close-image">
            <div id="pop-up-close" class="pop-up-flair pop-up-close">✕</div>
                <div class="group flair">
                    <div id="behance" class="pop-up-flair behance remove"><a href="#" target="_blank">Bē</a></div>
                </div>
            </div>
            <div id="pop-up-content" class="pop-up-content">
        </div>
    </div>
</div>
```

The only element of interest is the pop-up `<div id="{{flair-name}} class="pop-up-flair {{flair-name}} remove">` which announces a new flair. The remove class is a basic `display: none;` CSS attribute, which is toggled by the pop-up flair function in the Javascript file.

The pop-up can be displayed in two forms, depending on the type of data being passed. For XHTML requests (requires `data-type="XHTML"` in the caller), a white scrollable page is displayed with the response; however, for image requests (requires `data-type="image"` in the caller), it displays the image and the respective flairs.

To add a flair, you must append `data-flairs="{{flair-name}} {{href}} {{flair-name}} {{href}}"` to your caller element, leaving **a single space** between the flair name and the link or the link and the following flair name.

# Performance Decisions
The following decisions were made to ensure best possible performance
* Most images are encoded in `webp`
* The jQuery uses three images per entry, *lazyloading* two of which, and only loading 1.3MB for the whole image content of the page
* Images of the courses section on `courses.html` in the collapsed zone are lazyloaded
* The modified header is embedded in *inline CSS* instead of through separate files to minimize the amount of GET calls in loading the website content
* Each category of the creative writing app is stored in a separate *.json* file to minimize the load per call. The other *.json* are called while the user interact with any single category
* No animation fires as the page load except if it was in a scrolled state (and the quote on `writing.html`)
* Animation was done using light-weight library GSAP
* Bootstrap Popper was not included
* jQuery Plugin Colormatrix CSS is inlined

# License
[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)
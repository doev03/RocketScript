var $ = window.jQuery;
$(document).ready(function () {
    function addPlugins() {
        var scrpt = document.createElement('script');
        scrpt.type = "text/javascript";
        scrpt.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js";
        document.head.prepend(scrpt);
        scrpt = document.createElement('script');
        scrpt.type = "text/javascript";
        scrpt.src = "/js/jqueryrotate.2.1.js";
        document.head.prepend(scrpt);
    }

    var move = true;
    var prevFrameTicks;
    var currFrameTicks;
    var rocket;
    var rocketPics = new Array();
    rocketPics[0] = 'https://i.ibb.co/HY2jXRC/rocket1.png';
    rocketPics[1] = 'https://i.ibb.co/w7zMCxn/rocket2.png';
    rocketPics[2] = 'https://i.ibb.co/bgb2rrW/rocket3.png';
    rocketPics[3] = 'https://i.ibb.co/dBXRykV/rocket4.png';
    rocketPics[4] = 'https://i.ibb.co/VwmFGjY/rocket5.png';
    rocketPics[5] = 'https://i.ibb.co/X8d9QqD/rocket6.png';
    rocketPics[6] = 'https://i.ibb.co/sj62bwj/rocket7.png';
    rocketPics[7] = 'https://i.ibb.co/yYX0j8S/rocket8.png';
    rocketPics[8] = 'https://i.ibb.co/V25hRSN/rocket9.png';
    rocketPics[9] = 'https://i.ibb.co/3N5pL6q/rocket10.png';
    rocketPics[10] = 'https://i.ibb.co/27G9zFD/rocket11.png';
    rocketPics[11] = 'https://i.ibb.co/12mv6b8/rocket12.png';

    var speed = 0;
    var defaultSpeed = 1 / 3;
    var avgWindowSize = Math.max(window.innerWidth, window.innerHeight);
    function forward(e) {
        var cs = window.getComputedStyle(rocket);
        prevFrameTicks = currFrameTicks;
        currFrameTicks = new Date().getTime();
        var left;
        var top;
        var dist = Math.sqrt((mouseX - rocket.x - rocket.clientWidth / 2) ** 2 + (mouseY - rocket.y - rocket.clientHeight / 2) ** 2);
        if (move && dist <= rocket.clientHeight / 2 + avgWindowSize / 4) {
            speed = dist / (avgWindowSize / 4 + rocket.height / 2) * defaultSpeed;
        }
        else if (move) {
            if (speed < defaultSpeed) {
                speed += 0.01;
            }
        }
        else {
            if (speed > 0) {
                speed -= 0.01;
            }
        }
        if (move && dist >= rocket.clientHeight / 2 + 10) {
            left = parseFloat(cs.left);
            top = parseFloat(cs.top);
            rocket.style.top = top - speed * (currFrameTicks - prevFrameTicks) * Math.cos(rocketAngle * (Math.PI / 180)) + "px";
            rocket.style.left = left + speed * (currFrameTicks - prevFrameTicks) * Math.sin(rocketAngle * (Math.PI / 180)) + "px";
            animate();
        }
        else if (move && dist <= rocket.clientHeight / 2 + 5) {
            left = parseFloat(cs.left);
            top = parseFloat(cs.top);
            rocket.style.top = top + defaultSpeed / 5 * (currFrameTicks - prevFrameTicks) * Math.cos(rocketAngle * (Math.PI / 180)) + "px";
            rocket.style.left = left - defaultSpeed / 5 * (currFrameTicks - prevFrameTicks) * Math.sin(rocketAngle * (Math.PI / 180)) + "px";
            animate();
        }
        else {
            animate();
        }

        //setTimeout(function () { forward(e); }, 20);
    }
    let timer;
    function moveRect(e) {
        switch (e.keyCode) {
            case 16:
                if (e.location == 1) {
                    move = !move;
                    //clearInterval(timer);
                    currFrameTicks = new Date().getTime();
                }
                break;
            case 17:
                if (e.location == 2) {
                    rocket.style.top = mousePageY - rocket.height / 2 + "px";
                    rocket.style.left = mouseX - rocket.width / 2 + "px";
                } else {
                    createDot();
                }
                break;


        }
    }

    //Анимация двигателя
    var timeoutId = 0;
    var imagesPointer = 0;
    function animate() {
        var newPointer = rocketPics.length - parseInt(speed * rocketPics.length / defaultSpeed);
        if (newPointer >= 0 && newPointer < rocketPics.length) {
            rocket.src = rocketPics[newPointer];
        }
    }

    function handleClick(e) {
        console.log(rocket.x);
        console.log("screenY: " + e.screenY);
        console.log("clientX: " + e.clientX);
        console.log("clientY: " + e.clientY);
    }


    function mouseMove(e) {
        var x1 = e.screenX;
        var y1 = e.screenY;
        var x2 = rocket.x;
        var y2 = rocket.y;
        var alpha = (x1 * x2 + y1 * y2) / (Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2));
    }

    function createDot() {
        let dot = document.createElement('img');
        dot.id = "dot";
        dot.src = 'https://i.ibb.co/gyGmgVQ/dot-PNG29.png';
        dot.style.top = - dot.height / 2 + rocket.offsetTop + rocket.height / 2 - (rocket.height / 2 + 5) * Math.cos(rocketAngle * (Math.PI / 180)) + "px";
        dot.style.left = - dot.width / 2 + rocket.offsetLeft + rocket.width / 2 + (rocket.height / 2 + 5) * Math.sin(rocketAngle * (Math.PI / 180)) + "px";
        let dotAngle = rocketAngle;
        dot.style.position = "absolute";
        document.body.append(dot);

        let currDotTicks = new Date().getTime();
        let prevDotTicks;
        let dotTimer = setTimeout(function moveDot() {
            if (dot.offsetTop < 0 || dot.offsetTop > document.body.offsetHeight || dot.offsetLeft < 0 || dot.offsetLeft > document.body.offsetWidth) {
                clearTimeout(dotTimer);
                dot.parentNode.removeChild(dot);
                return;
            }

            let removeElement = document.elementFromPoint(dot.x + dot.width / 2 + (dot.height) * Math.sin(dotAngle * (Math.PI / 180)),
                dot.y + dot.height / 2 - (dot.height) * Math.cos(dotAngle * (Math.PI / 180)));
            if (removeElement && removeElement != rocket && removeElement.classList.contains("ASTEROID")) {
                //bangAnimation(removeElement.style.left, removeElement.style.top);
                prepareElement(removeElement, dotAngle);
                //removeElement.style.backgroundColor = "blue";
                clearTimeout(dotTimer);
                dot.parentNode.removeChild(dot);
                return;
            }

            prevDotTicks = currDotTicks;
            currDotTicks = new Date().getTime();
            dot.style.top = dot.offsetTop - 1 / 2 * (currDotTicks - prevDotTicks) * Math.cos(dotAngle * (Math.PI / 180)) + "px";
            dot.style.left = dot.offsetLeft + 1 / 2 * (currDotTicks - prevDotTicks) * Math.sin(dotAngle * (Math.PI / 180)) + "px";
            dotTimer = setTimeout(moveDot, 20);
        }, 20);
    }

    function prepareElement(elem, dotAngle) {
        let elementAngle = dotAngle;
        elem.style.top = elem.offsetTop + "px";
        elem.style.left = elem.offsetLeft + "px";
        elem.style.position = "absolute";
        elem.style.zIndex = 1000;
        let currElementTicks = new Date().getTime();
        let prevElementTicks;

        let elementTimer = setTimeout(function moveElement() {
            prevElementTicks = currElementTicks;
            currElementTicks = new Date().getTime();

            elem.style.top = parseFloat(elem.style.top)- 1 / 3 * (currElementTicks - prevElementTicks) * Math.cos(elementAngle * (Math.PI / 180)) + "px";
            elem.style.left = parseFloat(elem.style.left) + 1 / 3 * (currElementTicks - prevElementTicks) * Math.sin(elementAngle * (Math.PI / 180)) + "px";
            console.log(elem.offsetTop + " " + elem.offsetLeft + "\n\n");
            if (elem.offsetTop < 0 || elem.offsetTop > document.body.offsetHeight || elem.offsetLeft < 0 || elem.offsetLeft > document.body.offsetWidth) {
                elem.remove();
                clearTimeout(elementTimer);
                return;
            }
            elementTimer = setTimeout(moveElement, 20);
        }, 20);
    }

    function bangAnimation(x, y){
        let bang = document.createElement('img');
        bang.id = "bang";
        bang.src = 'https://i.ibb.co/sHPVYNZ/WXfF.gif';
        bang.style.top = y;
        bang.style.left = x;
        bang.style.width = 30 + "px";
        bang.style.position = "absolute";
        document.body.append(bang);

        let startingBangTicks = new Date().getTime();
        let bangTimer = setInterval(function () {
            if (new Date().getTime() - startingBangTicks> 1000){
                bang.remove();
                clearInterval(bangTimer);
            }
        }, 20)
    }

    function createAsteroids(){
        let spanElems = document.querySelectorAll('span');
        spanElems.forEach(span => {
            span.classList.add("ASTEROID");
        });
        let imgElems = document.querySelectorAll('img');
        imgElems.forEach(img => {
            img.classList.add("ASTEROID");
        })
        let aElems = document.querySelectorAll('a');
        aElems.forEach(a => {
            a.classList.add("ASTEROID");
        })
    };

    var mouseX;
    var mouseY;
    var mousePageY;
    var rocketAngle = 0;
    (function () {
        addPlugins();
        document.querySelector('body').removeAttribute('style');
        
        rocket = document.createElement('img');
        rocket.id = "rocket";
        rocket.src = rocketPics[11];
        rocket.width = "55.302";
        rocket.height = "100";
        rocket.style.left = 30 + "px";
        rocket.style.top = 30 + "px";
        rocket.style.position = "absolute";
        rocket.style.zIndex = -1;
        document.body.append(rocket);

        createAsteroids();

        //addEventListener("click", handleClick)
        addEventListener("keydown", moveRect);
        setInterval(function () { forward(); }, 20);

        var jQuery = window.jQuery;

        //Поворот за курсором
        jQuery(document).rotate({
            bind:
            {
                mousemove: function (e) {
                    var x2 = e.pageX;
                    mouseX = x2;
                    var y2 = e.clientY;
                    mouseY = y2;
                    mousePageY = e.pageY;
                    var x1Center = rocket.x + rocket.clientWidth / 2;
                    var y1Center = rocket.y + rocket.clientHeight / 2;
                    rocketAngle = Math.atan2(e.clientX - x1Center, - (e.clientY - y1Center)) * (180 / Math.PI);
                    jQuery("#rocket").rotate({ angle: rocketAngle });
                }
            }
        });
    })();
});
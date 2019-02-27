// Add some style to the login page.
(function ($) {
    $(document).ready(function () {
        if (typeof anime !== 'undefined') {
            $('#mautic-eb-login-container form').submit(function(){
                $(this).find(':submit:first')
                    .addClass('btn-active')
                    .animate({opacity: .2}, 60)
                    .animate({opacity: 1}, 100)
                    .animate({opacity: .2}, 150)
                    .animate({opacity: 1}, 200);
                $('body').append('<div id="login-animation-container"><div id="login-animation"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 800"><g fill="none" fill-rule="evenodd"><path stroke="#467ca2" d="M781 489v70l-2 2-135-1-3 2-40 39a6 6 0 0 1-3 1h-75a2 2 0 0 1-2-2v-33"/><path stroke="#d9e4ec" d="M675 356l45-46a5 5 0 0 0 2-3v-10l-2-4-43-43a2 2 0 0 1 0-3l83-82a6 6 0 0 1 3-1h45l3-2L953 23M507-77v266a4 4 0 0 0 4 4h55l2 2v147l-1 4-48 47a5 5 0 0 0-2 3c0 3 1 4 2 5l53 53 3 2v72l-1 2h-86l-4 1-1 1a6 6 0 0 1-4 2h-9"/><path stroke="#2a84c5" d="M8 128v391a4 4 0 0 0 4 4l129 1M894 374l50-49a6 6 0 0 1 3-2h93l3 2 27 27"/><path stroke="#d9e4ec" d="M894 374l50-49a6 6 0 0 1 3-2h93l3 2 27 27"/><path stroke="#2a84c5" d="M755 214h71l3-1 92-91a6 6 0 0 1 3-2h77l-71-72a5 5 0 0 1-1-3V17M262-52l11 11 1 3v33L157 111l-86 85a5 5 0 0 0-1 3v101l2 2h50l2 2v27l2 2h336l2 2v37l-43 43a6 6 0 0 1-3 2h-33M565 550v17l-2 4-181 180a6 6 0 0 1-3 1H270l-2 2v23l-2 2h-84l-2 2v46l2 2h30l2 2v51l2 3 10 11 3 1h112l1 1m141-242h148"/><path stroke="#2a84c5" d="M441 246l-32 31a6 6 0 0 1-4 2h-62l-3 1-3 4H72l-3-2-47-47a6 6 0 0 0-4-1h-57l-1-35-2-3-66-66"/><path stroke="#d9e4ec" d="M705 222h8l4 1 45 46 2 3v14l1 2 1 2v122l-2 2H628l-3-2-12-12a6 6 0 0 0-4-1h-46a2 2 0 0 0-2 2v26l-1 4-9 8a6 6 0 0 1-4 2h-26l-4 1-48 48a6 6 0 0 1-3 1h-96l-3 2-146 146a5 5 0 0 1-4 1H31"/><path stroke="#cb4641" d="M145 99l145 145 3 1h147l3 1 32 32 1 3v193l-1 3-8 8a6 6 0 0 1-3 1h-21l-20 21-3 3-131 130a5 5 0 0 0-1 3v178"/><path stroke="#2a84c5" d="M319 381h95l3 1 15 15 3 1h73l4 2 58 58 4 2h103l2-2v-15l-2-2h-47a2 2 0 0 1-2-2v-57l-1-3-15-15a5 5 0 0 1-1-3v-17l-2-4-12-12a6 6 0 0 0-3-1h-18l-3-2-42-41a6 6 0 0 0-3-2h-42"/><path stroke="#d9e4ec" d="M855 194h60l2 2v29l1 3 51 51 2 3v102l105 104"/><path stroke="#2a84c5" d="M638 306l13-13v-2l-31-32v-2l18-19a6 6 0 0 1 4-1h160l423 1 2 2v71"/><path stroke="#cb4641" d="M439 486h-19l-3-1-75-75a6 6 0 0 0-4-1h-38l-4-2-47-46h-36l-57 71a5 5 0 0 0-2 4v24"/><path stroke="#d9e4ec" d="M882 359l-47 47a6 6 0 0 1-3 1h-95l-3-1-31-31a6 6 0 0 0-3-1h-35l-4 1-29 30a6 6 0 0 1-3 1l-15-14a6 6 0 0 0-3-2H454l-4 1-28 28a6 6 0 0 1-3 1H-24l-88 1-13 12"/><path stroke="#2a84c5" d="M293 644l59-59a6 6 0 0 1 4-2h24l3-1 47-46a6 6 0 0 1 3-2h187l2-2V420l-1-3-39-39a5 5 0 0 1-1-3v-52l-2-3-110-110a6 6 0 0 0-3-1H285"/><path stroke="#2a84c5" d="M484 549h-37l-3 1-69 69v2l28 28 3 2h63"/><path stroke="#467ca2" d="M521 562v-5l-2-2h-13l-4-1-43-43a5 5 0 0 1-1-4V317l1-3 21-21a5 5 0 0 0 1-3v-96l-1-3L292 5v-41l-2-4-11-11"/><path stroke="#cb4641" d="M276 745h99l3-1 175-173a6 6 0 0 1 3-2h47l3-1 52-51a5 5 0 0 0 1-4V311l-1-3-52-51a6 6 0 0 0-4-2h-17a2 2 0 0 1-2-2v-44l-2-2h-89a2 2 0 0 1-2-2v-19l-1-4L310 5"/><path stroke="#2a84c5" d="M1003 124h-76l-4 1-92 92a6 6 0 0 1-4 1H696l-4 1-52 52v2l22 21 1 4v15M673 438h54l3 1 49 49 4 1h45l3-1 83-83a6 6 0 0 1 4-1h42l3 1 101 100"/><path stroke="#2a84c5" d="M673 434h55l4 2 49 49 3 1h42l3-2 62-61a5 5 0 0 0 2-4V151l-2-3-100-99a6 6 0 0 0-3-2H423l-4 2-159 157a6 6 0 0 1-3 2H127l-3 1-37 37a5 5 0 0 0-1 3v185"/><path stroke="#cb4641" d="M410 714l18 17 3 2h42l3-2 26-26h124"/><path stroke="#2a84c5" d="M307 907v-1H108a2 2 0 0 1-2-2V744l2-2h265l3-2 24-23v-3l-81-80c-1-1-1-2 1-2h137l3-1 54-53a6 6 0 0 1 3-2h89l3-1 56-55a5 5 0 0 0 1-4V410l2-2h29l4-1 43-43a6 6 0 0 1 3-2h7l3-1 53-53a6 6 0 0 1 3-1h14l3 1 63 62 3 1h74l4 2 94 93"/><path stroke="#2a84c5" d="M648 429v-33l-2-4-31-31a6 6 0 0 0-4-1h-37l-3 1-74 74a6 6 0 0 1-4 1h-52a2 2 0 0 1-2-1v-72l-2-2H9l-3 1-38 38a6 6 0 0 1-3 1h-57l-4 2-13 13a6 6 0 0 1-3 1h-13"/><path stroke="#2a84c5" d="M220 357h221l2 2v72l2 2h46l4-2 74-74a6 6 0 0 1 3-1h193l3-1 44-44a6 6 0 0 1 3-1h11l3 1 63 62 3 2h74l3 1 94 94h10l3-1 104-89a2 2 0 0 1 2 0l7 6"/><path stroke="#2a84c5" d="M600 564a7 7 0 0 0 4-1l48-48a7 7 0 0 0 2-4V314l-2-4-48-48a7 7 0 0 0-4-1h-98a7 7 0 0 0-4 1l-48 48a7 7 0 0 0-2 4v197l2 4 48 48a7 7 0 0 0 4 1h98z"/><path stroke="#cb4641" d="M648 527v33l-1 4-88 87 1 1h71M476 273v-19l-1-3-31-31a6 6 0 0 0-4-1H275"/><path stroke="#d9e4ec" d="M923 373V119l-1-3L757-48a6 6 0 0 0-3-1H352l-4 1-37 38"/><path stroke="#467ca2" d="M317-50l-13 13a6 6 0 0 0-1 3v22a5 5 0 0 0 1 3l189 188 2 3v19l2 2h88l2 2v34c0 1 0 2 2 2h23l3 2 46 45 2 4v223l-2 3-53 53a6 6 0 0 1-4 2h-46l-3 1-174 173a6 6 0 0 1-4 1H112l-2 2v94l-1 2h-225"/><path stroke="#467ca2" d="M415 613l63-63a6 6 0 0 1 4-1h124l4-2 28-27a5 5 0 0 0 1-4v-38l2-2h53l2-2v-52l1-3 30-30a5 5 0 0 0 1-3v-76l2-2h38a4 4 0 0 0 4-4v-29l2-4 35-35"/><path stroke="#cb4641" d="M893 375l-45 45a6 6 0 0 1-4 1H619l-4-1-81-81a6 6 0 0 0-4-1H384l-3 1-17 17"/><path stroke="#2a84c5" d="M289 640h-47l-2 2v27l-2 2h-90"/><path stroke="#000" d="M281 230l10 9 3 2 147-1 3 2 116 114v3l-37 37a2 2 0 0 0 0 2l50 50 3 1h139l3 1 37 37 4 2h21"/><path stroke="#2a84c5" d="M-116 842h217l2-2V740l2-2h266l3-1 20-20v-3l-78-78a5 5 0 0 1-2-4v-1l2-2h140l3-2 54-53a5 5 0 0 1 2-1l2-2v-7"/><path stroke="#d9e4ec" d="M318 258l73 72 1 4v45l2 3 12 12 3 2h10l4-2 6-6a6 6 0 0 1 3-1h86l3-2 63-62a6 6 0 0 1 4-2h161l2 2v179l-1 3-11 12a6 6 0 0 1-4 1H529a2 2 0 0 1-2-2v-73l-2-2h-88a2 2 0 0 1-2-2v-32c0-2-1-2-2-2l-4-2-8-7"/><path stroke="#2a84c5" d="M650-78v211l2 3 47 47 1 3v36h-3l-2 1-19 18a5 5 0 0 0-1 4v117l1 3 47 47a5 5 0 0 1 1 3v30l-1 4-5 5a6 6 0 0 1-3 1H600c-2 0-2 1-2 2v36l-2 2h-93l-4 1-19 20a6 6 0 0 1-3 1h-64"/><path stroke="#cb4641" d="M281 745v84l-1 2h-58l-2 2v11l-2 2H111"/><path stroke="#000" d="M11 362l113 113 4 1h36l3 2 206 204 3 1h92l4 2 16 16 3 1h135"/><path stroke="#467ca2" d="M276 590l24-24a6 6 0 0 1 4-1h121l4 1 34 34 3 2h55M633 279l-21-21a5 5 0 0 1-1-4V-79"/><path stroke="#2a84c5" d="M754 192v20l-2 2h-94l-3 1-51 50a5 5 0 0 0-1 4v56l1 4 11 10 1 3v122l-2 2H430l-4-2-21-21-16 15a6 6 0 0 1-3 2H282l-3 1-62 61a6 6 0 0 1-4 2h-70l-3 1-68 68a6 6 0 0 1-4 1H34l-3 2-62 61a5 5 0 0 0-1 3v98l-2 2h-31l-3 1-49 48"/><path stroke="#d9e4ec" d="M185 422v34l-2 3-56 56a6 6 0 0 1-4 2H-35"/><path stroke="#cb4641" d="M980 417l-15-15a6 6 0 0 0-3-2h-46l-4 2-14 14c-1 1-2 1-2-1v-34l-1-4-2-2"/><path stroke="#2a84c5" d="M827 238v55l1 3 87 86 3 1h99l3-1 22-23a5 5 0 0 1 4-1h106l2-2v-96l2-2h39l2 2v49"/><path stroke="#467ca2" d="M13 361H8l-4-1-17-18a6 6 0 0 0-4-1h-16l-4-2-56-55a6 6 0 0 0-3-1h-15"/><path stroke="#2a84c5" d="M959 126l19 19 4 2h177l2 1v101a3 3 0 0 0 3 3h37l2 2v55M33 799h242l2-2V673l-2-2h-30a2 2 0 0 1-2-2v-27l-2-2h-21M458 496h10l3-1 49-48a6 6 0 0 1 3-2h24l4 2 23 23 3 1h111l2-2v-54l-1-3-20-20-3-3-1-1a6 6 0 0 0-4-2h-11a2 2 0 0 1-2-2v-73c0-1 0-2 2-2h77"/><path stroke="#2a84c5" d="M-35 402v111l1 4 50 48 3 2h22l3 1 113 112 3 2h171l2 2v60"/></g></svg></div></div>');
                var pathEls = document.querySelectorAll('#login-animation path');
                for (var i = 0; i < pathEls.length; i++) {
                    var pathEl = pathEls[i];
                    var offset = anime.setDashoffset(pathEl);
                    pathEl.setAttribute('stroke-dashoffset', offset);
                    anime({
                        targets: pathEl,
                        strokeDashoffset: [offset, 0],
                        duration: anime.random(300, 2000),
                        delay: anime.random(0, 3000),
                        loop: true,
                        direction: 'alternate',
                        easing: 'easeInOutSine',
                        autoplay: true
                    });
                }
            });
        }
    });
})(mQuery);
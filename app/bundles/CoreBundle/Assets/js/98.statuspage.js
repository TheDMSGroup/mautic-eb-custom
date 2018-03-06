// Add a statuspage.io widget to the footer.
(function ($) {
    $(document).ready(function () {
        var $footer = $('footer#app-footer .row .text-right:first');
        if ($footer.length) {
            var $widget = $footer.append('<a id="widget-statuspage" href="http://status.dmsengage.com" target="_blank"><span class="color-dot"></span><span class="color-description"></span></a>').find('#widget-statuspage:first');
            if ($widget.length) {

                var script = document.createElement('script');
                var prior = document.getElementsByTagName('script')[0];
                script.async = 1;
                script.onload = script.onreadystatechange = function (_, isAbort) {
                    if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                        script.onload = script.onreadystatechange = null;
                        script = undefined;

                        if (!isAbort) {
                            var sp = new StatusPage.page({page: 'bqc7czqgqwxm'});
                            sp.summary({
                                success: function (data) {
                                    $("<style type='text/css'>" +
                                        "@keyframes color-dot {\n" +
                                        "    0% { opacity: 0.4; }\n" +
                                        "    50% { opacity: 1; }\n" +
                                        "    100% { opacity: 0.4; }\n" +
                                        "}" +
                                        "@-webkit-keyframes color-dot {\n" +
                                        "    0% { opacity: 0.4; }\n" +
                                        "    50% { opacity: 1; }\n" +
                                        "    100% { opacity: 0.4; }\n" +
                                        "}" +
                                        ".color-dot {" +
                                        "    -webkit-animation: color-dot 1s infinite ease-in-out;\n" +
                                        "    -o-animation: color-dot 1s infinite ease-in-out;\n" +
                                        "    -ms-animation: color-dot 1s infinite ease-in-out; \n" +
                                        "    -moz-animation: color-dot 1s infinite ease-in-out; \n" +
                                        "    animation: color-dot 1s infinite ease-in-out;" +
                                        "}\n"+
                                        "</style>").appendTo('head');

                                    // Adds the text description.
                                    $widget.find('.color-description').text(data.status.description);
                                    // Appends the status indicator as a class
                                    // name so we can use the right color for
                                    // the status light thing.
                                    $widget.find('.color-dot').addClass(data.status.indicator);
                                }
                            });
                        }
                    }
                };
                script.src = 'https://cdn.statuspage.io/se-v2.js';
                prior.parentNode.insertBefore(script, prior);
            }
        }
    });
})(mQuery);
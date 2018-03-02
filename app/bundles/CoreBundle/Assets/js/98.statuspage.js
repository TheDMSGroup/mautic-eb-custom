(function ($) {
    $(document).ready(function () {
        var $footer = $('footer#app-footer .row .text-right:first');
        if ($footer.length) {
            var $widget = $footer.append('<a id="widget-statuspage" href="http://status.dmsengage.com" target="_blank"><span class="color-dot"></span><span class="color-description"></span></a>').find('#widget-statuspage:first');
            if ($widget.length) {
                $.getScript('https://cdn.statuspage.io/se-v2.js', function () {
                    var sp = new StatusPage.page({page: '39qnmk3k9q7f'});
                    sp.summary({
                        success: function (data) {
                            // Adds the text description.
                            $widget.find('.color-description').fadeTo(0, 0).text(data.status.description).fadeTo(500, 1);
                            // Appends the status indicator as a class name so we can use the right color for the status light thing.
                            $widget.find('.color-dot').fadeTo(0, 0).addClass(data.status.indicator).fadeTo(500, 1).fadeTo(500, .2).fadeTo(500, 1).fadeTo(500, .2).fadeTo(500, 1);
                        }
                    });
                });
            }
        }
    });
})(mQuery);

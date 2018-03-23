// Force the New campaign button to actually clone campaign 1 (a template).
(function ($) {
    $(document).ready(function () {
        var $original = mQuery('#toolbar:first > div.std-toolbar.btn-group:first > a.btn.btn-default[href="/s/campaigns/new"]:first');
        if ($original.length && $original.find('.fa-plus').length) {

            // Create a new new button.
            var $new = $original.clone(true, true);
            $new.attr('href', '/s/campaigns/clone/1')
                .insertAfter($original);

            // Hide the original.
            $original.addClass('hide');
        }
    });
})(mQuery);

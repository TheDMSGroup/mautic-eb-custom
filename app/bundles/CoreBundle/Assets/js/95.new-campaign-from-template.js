// Force the New campaign button to actually clone campaign 1 (a template).
Mautic.campaignCloneNew = function () {
    var $original = mQuery('#toolbar:first > div.std-toolbar.btn-group:first > a.btn.btn-default[href="/s/campaigns/new"]:first:not(.hide)');
    if ($original.length && $original.find('.fa-plus').length) {

        // Create a new new button.
        var $new = $original.clone(true, true);
        $new.attr('href', '/s/campaigns/clone/16')
            .insertAfter($original);

        // Hide the original.
        $original.addClass('hide');
    }
};
mQuery(document).ready(function () {
    Mautic.campaignCloneNew();
});
mQuery(document).ajaxComplete(function (event, xhr, settings) {
    setTimeout(function(){
        Mautic.campaignCloneNew();
    }, 150);
});

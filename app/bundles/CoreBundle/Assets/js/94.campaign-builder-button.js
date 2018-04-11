// Force the New campaign button to actually clone campaign 1 (a template).
Mautic.campaignBuilderButton = function () {
    var viewurl = window.location.href.match(/\/campaigns\/view\//);
    if (viewurl && viewurl.length === 1) {
        mQuery('.std-toolbar.btn-group:first:not(.builder-checked)').each(function () {
            var href = mQuery(this).find('.btn:first').attr('href') + '#builder';
            mQuery(this).prepend('<a class="btn btn-default" href="' + href + '" data-toggle="ajax"><span><i class="fa fa-cube"></i> <span class="hidden-xs hidden-sm">Launch Campaign Builder</span></span></a>');
        }).addClass('builder-checked');
    }

    var editurl = window.location.href.match(/\/campaigns\/edit\//);
    if (editurl && editurl.length === 1 && window.location.hash === '#builder') {
        mQuery('#campaign_buttons_builder_toolbar:first:not(.builder-checked)').addClass('builder-checked').click();
        mQuery('.btn.btn-close-campaign-builder:first').click(function () {
            if (window.location.hash === '#builder') {
                history.pushState('', document.title, window.location.pathname + window.location.search);
            }
        });
    }
};
mQuery(document).ready(function () {
    Mautic.campaignBuilderButton();
});
mQuery(document).ajaxComplete(function (event, xhr, settings) {
    setTimeout(function(){
        Mautic.campaignBuilderButton();
    }, 150);
});

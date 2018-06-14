// hide all original daterange forms since we add our own in a custom widget
Mautic.campaignHideDateFilterForms = function () {
    mQuery('form[name="daterange"]:not(:first)').remove();
};

mQuery(document).ready(function () {
    Mautic.campaignHideDateFilterForms();
});
mQuery(document).ajaxComplete(function (event, xhr, settings) {
    setTimeout(function(){
        Mautic.campaignHideDateFilterForms();
    }, 150);
});
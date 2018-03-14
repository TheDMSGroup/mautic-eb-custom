/**
 * Generates the title of the current page
 *
 * @param route
 */
Mautic.generatePageTitle = function (route) {

    if (-1 !== route.indexOf('timeline')) {
        return;
    }
    else if (-1 !== route.indexOf('view')) {
        //loading view of module title
        var currentModule = route.split('/')[3];

        //check if we find spans
        var titleWithHTML = mQuery('.page-header h3').find('span.span-block');
        var currentModuleItem = '';

        if (1 < titleWithHTML.length) {
            currentModuleItem = titleWithHTML.eq(0).text() + ' - ' + titleWithHTML.eq(1).text();
        }
        else {
            currentModuleItem = mQuery('.page-header h3').text();
        }

        // Encoded entites are decoded by this process and can cause a XSS
        currentModuleItem = mQuery('<div>' + currentModuleItem + '</div>').text();

        mQuery('title').html(currentModule[0].toUpperCase() + currentModule.slice(1) + ' | ' + currentModuleItem + ' | engage');
    }
    else {
        //loading basic title
        mQuery('title').html(mQuery('.page-header h3').html() + ' | engage');
    }
};
(function ($) {
    $(document).ready(function () {
        var $global = $('#globalSearchContainer');
        if ($global.length) {
            $global.find('.search-button').click(function () {
                $('html:first').addClass('hidden-nav');
                $('body').on('click.globalsearch', function (event) {
                    var target = event.target;
                    if (!$(target).parents('#globalSearchContainer').length && !$(target).parents('#globalSearchDropdown').length) {
                        $('html:first').removeClass('hidden-nav');
                    }
                });
            });
        }
    });
})(mQuery);

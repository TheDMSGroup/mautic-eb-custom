// Add sums to all chart labels in Mautic.
Mautic.chartLabelSum = function () {
    if (
        typeof Mautic.chartObjects !== 'undefined'
        && Mautic.chartObjects.length
    ) {
        var total, numeric, updated, totalStr;
        mQuery.each(Mautic.chartObjects, function (i, chart) {
            updated = false;
            if (
                typeof chart.data.datasets !== 'undefined'
                && (
                    typeof chart.sumProcessed === 'undefined'
                    || chart.sumProcessed === false
                )
            ) {
                mQuery.each(chart.data.datasets, function (i, dataset) {
                    total = 0;
                    numeric = false;
                    if (
                        typeof dataset.data !== 'undefined'
                        && typeof dataset.label !== 'undefined'
                    ) {
                        mQuery.each(dataset.data, function (i, value) {
                            if (mQuery.isNumeric(value)) {
                                numeric = true;
                                total += Number(value);
                            }
                        });
                        if (numeric) {
                            total = +total.toFixed(2);
                            totalStr = ' (' + total + ')';
                            if (dataset.label.indexOf(totalStr) === -1) {
                                dataset.label += totalStr;
                                updated = true;
                            }
                        }
                    }
                });
            }
            if (updated) {
                chart.update();
            }
            chart.sumProcessed = true;
        });
    }
};

mQuery(document).ready(function () {
    Mautic.chartLabelSum();
});

mQuery(document).ajaxComplete(function (event, xhr, settings) {
    setTimeout(function () {
        Mautic.chartLabelSum();
    }, 150);
});
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

// Append dataTables to Charts on Campaign, Source and Client pages.
Mautic.appendTableToCharts = function () {
    var mauticContent;

    if ((["contactsource", "campaign", "contactclient"]).indexOf(mauticContent) > -1) {

        if (
            typeof Mautic.chartObjects !== 'undefined'
            && Mautic.chartObjects.length
        ) {
            mQuery.each(Mautic.chartObjects, function (index, chart) {

                if (
                    typeof chart.data.datasets !== 'undefined'
                    && (
                        typeof chart.tableAdded === 'undefined'
                        || chart.tableAdded === false
                    )
                ) {

                    // add the table element for datatables to use
                    mQuery(chart.canvas.parentElement).append('<table id="chart-' + index + '"></table>');

                    //convert chart dataset to dataTables json
                    var headers = ['Date'];
                    var rows = [];
                    var rowsCount = chart.data.labels.length;

                    for (c = 0; c < rowsCount; c++) {
                        mQuery.each(chart.data.datasets, function (i, dataset) {
                            headers.push(dataset.label);
                            row = [chart.data.labels[c]];
                            row.push(dataset.data[c]);
                        });
                        rows.push(row);
                    }

                    // invoke dataTables
                    mQuery("#chart-" + index).DataTable({
                        data: rows,
                        autoFill: true,
                        columns: headers,

                    });

                    // mark chart as table-added
                    chart.tableAdded = true;
                }
            });
        }
    }
};



mQuery(document).ready(function () {
    Mautic.chartLabelSum();
    Mautic.appendTableToCharts();
});

mQuery(document).ajaxComplete(function (event, xhr, settings) {
    setTimeout(function () {
        Mautic.chartLabelSum();
        Mautic.appendTableToCharts();
    }, 150);
});
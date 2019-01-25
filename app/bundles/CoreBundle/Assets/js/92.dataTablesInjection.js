// Add sums to all chart labels in Mautic.
Mautic.chartSum = function () {
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
                var totals = [];
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
                            totals.push(total);
                        }
                    }
                });
            }

            chart.totals = totals;
        });
    }
};

// Append dataTables to Charts on Campaign, Source and Client pages.
Mautic.appendTableToCharts = function () {
    if ((['contactsource', 'campaign', 'contactclient']).indexOf(mauticContent) > -1) {

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
                    mQuery(chart.chart.canvas.parentElement).closest('.chart-wrapper').append('<table id="tableForChart-' + index + '" class="table table-striped table-bordered no-footer"></table>');

                    //convert chart dataset to dataTables json
                    var headers = [{'title': 'Date'}];
                    var rows = [];
                    var rowsCount = chart.data.labels.length;
                    for (c = 0; c < rowsCount; c++) {
                        //Date field, variable format...
                        let row = [chart.data.labels[c]];
                        mQuery.each(chart.data.datasets, function (i, dataset) {
                            if (c === 0) {
                                headers.push({'title': dataset.label});
                            }
                            row.push(dataset.data[c]);
                        });

                        rows.push(row);
                    }

                    var chartTotals = chart.totals;

                    //setup datatables-moment
                    mQuery.fn.dataTable.moment('YYYY');
                    mQuery.fn.dataTable.moment('YYYY');
                    mQuery.fn.dataTable.moment('YYYY-MM-DD');
                    mQuery.fn.dataTable.moment('MMMM YYYY');
                    mQuery.fn.dataTable.moment('MMM D ha');
                    mQuery.fn.dataTable.moment('MMM D, YY');
                    mQuery.fn.dataTable.moment('[Week] W');
                    mQuery.fn.dataTable.moment('HH:mm');
                    mQuery.fn.dataTable.moment('HH:mm:ss');

                    // invoke dataTables
                    mQuery('#tableForChart-' + index).DataTable({
                        data: rows,
                        autoFill: true,
                        columns: headers,
                        searching: false,
                        paging: false,
                        info: false,
                        dom: '<r<B><t>>',
                        buttons: [
                            'excelHtml5',
                            'csvHtml5'
                        ],
                        footerCallback: function (tfoot, data, start, end, display) {
                            try {
                                var container = mQuery('#tableForChart-' + index);
                                var columns = data[0].length;
                                if (container.find('.detailPageTotal').length === 0) {
                                    var footer = mQuery('<tfoot></tfoot>');
                                    var tr = mQuery('<tr class=\'detailPageTotal\' style=\'font-weight: 600; background: #fafafa;\'></tr>');
                                    tr.append(mQuery('<td>Totals</td>'));
                                    for (var i = 0; i < columns - 1; i++) {
                                        tr.append(mQuery('<td class=\'td-right\'>' + chartTotals[i] + '</td>'));
                                    }
                                    footer.append(tr);
                                    container.append(footer);
                                }
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }

                    });

                    // mark chart as table-added
                    chart.tableAdded = true;

                    // add css to make wide tables scrollable
                    mQuery('#tableForChart-' + index).parent('div').css(
                        {
                            'overflow-x': 'scroll',
                            'margin': '0px -15px -15px -15px',
                            'min-width': '100%'
                        }
                    );

                    // right align the buttons
                    mQuery('#tableForChart-' + index + '_wrapper .dt-buttons.btn-group').css(
                        {
                            'float': 'right'
                        }
                    );
                }
            });
        }
    }
};

mQuery(document).ready(function () {
    Mautic.chartSum();
    Mautic.appendTableToCharts();
});

mQuery(document).ajaxComplete(function (event, xhr, settings) {
    setTimeout(function () {
        Mautic.chartSum();
        Mautic.appendTableToCharts();
    }, 150);
});

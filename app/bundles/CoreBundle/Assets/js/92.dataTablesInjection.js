// Append dataTables to Charts on Campaign, Source and Client pages.
Mautic.appendTableToCharts = function (force) {
    if (typeof force == 'undefined') {
        force = false;
    }
    // Check the context to ensure we are in a seciong of Mautic
    // that we wish to enhance with Datatables.
    if (force || (['contactsource', 'campaign', 'contactclient', 'media']).indexOf(mauticContent) > -1) {
        if (typeof window.appendTableToChartsMomentConfig == 'undefined') {
            window.appendTableToChartsMomentConfig = true;
            if (typeof mQuery.fn.dataTable.moment !== 'undefined') {
                mQuery.fn.dataTable.moment('YYYY');
                mQuery.fn.dataTable.moment('YYYY-MM-DD');
                mQuery.fn.dataTable.moment('MMMM YYYY');
                mQuery.fn.dataTable.moment('MMM D ha');
                mQuery.fn.dataTable.moment('MMM D, YY');
                mQuery.fn.dataTable.moment('[Week] W');
                mQuery.fn.dataTable.moment('HH:mm');
                mQuery.fn.dataTable.moment('HH:mm:ss');
            }
        }
        // Check if the current page has Mautic chart objects.
        if (
            typeof Mautic.chartObjects !== 'undefined'
            && Mautic.chartObjects.length
        ) {
            // Loop through the charts to generate totals with numerical data.
            let total, numeric, decimals;
            mQuery.each(Mautic.chartObjects, function (i, chart) {
                if (
                    typeof chart.data.datasets !== 'undefined'
                    && typeof chart.sumProcessed === 'undefined'
                ) {
                    chart.sumProcessed = true;
                    chart.decimals = 0;

                    let totals = [];
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
                                    decimals = (value + '.').split('.')[1].length;
                                    if (decimals > chart.decimals) {
                                        chart.decimals = decimals;
                                    }
                                    total += Number(value);
                                }
                            });
                            if (numeric) {
                                // total = +total.toFixed(2);
                                totals.push(total);
                            }
                        }
                    });
                    if (totals) {
                        chart.totals = totals;
                    }
                }
            });

            // Loop through charts with totals to generate tables.
            mQuery.each(Mautic.chartObjects, function (index, chart) {
                if (
                    typeof chart.tableProcessed === 'undefined'
                    && typeof chart.totals !== 'undefined'
                ) {
                    chart.tableProcessed = true;

                    // add the table element for datatables to use
                    let $table = mQuery(chart.chart.canvas.parentElement)
                        .closest('.chart-wrapper')
                        .append('<table id="tableForChart-' + index + '" class="table table-striped table-bordered no-footer" style="min-width: 100%;"></table>')
                        .find('table#tableForChart-' + index + ':first');
                    let $chartContainer = $table.parent('div');

                    //convert chart dataset to dataTables json
                    let headers = [{'title': 'Date'}],
                        rows = [],
                        rowsCount = chart.data.labels.length,
                        enumeratedColumns = [];
                    for (let c = 0; c < rowsCount; c++) {
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

                    for (let i = 1; i < headers.length; i++) {
                        enumeratedColumns.push(i);
                    }
                    // invoke dataTables
                    $table.DataTable({
                        data: rows,
                        autoFill: true,
                        columns: headers,
                        searching: false,
                        paging: false,
                        info: false,
                        dom: '<r<B><t>>',
                        buttons: {
                            buttons: [
                                {
                                    extend: 'copy',
                                    className: 'btn-sm pull-right'
                                },
                                {
                                    extend: 'excelHtml5',
                                    className: 'btn-sm pull-right'
                                },
                                {
                                    extend: 'csvHtml5',
                                    className: 'btn-sm pull-right'
                                }
                            ]
                        },
                        columnDefs: [
                            {
                                className: 'text-right',
                                targets: enumeratedColumns,
                                render: function (data, type, row) {
                                    return Number(data).toFixed(chart.decimals);
                                }
                            }
                        ],
                        footerCallback: function (tfoot, data, start, end, display) {
                            try {
                                if ($chartContainer.find('.detailPageTotal').length === 0) {
                                    let $footer = mQuery('<tfoot></tfoot>'),
                                        $tr = mQuery('<tr class=\'detailPageTotal\' style=\'font-weight: 600; background: #fafafa;\'></tr>');
                                    $tr.append(mQuery('<td>Totals</td>'));
                                    for (let i = 0; i < data[0].length - 1; i++) {
                                        $tr.append(mQuery('<td class=\'td-right text-right\'>' + Number(chart.totals[i]).toFixed(chart.decimals) + '</td>'));
                                    }
                                    $footer.append($tr);
                                    $table.append($footer);
                                }
                            }
                            catch (e) {
                                console.warn(e);
                            }
                        }
                    });
                    // Eat up the white space around the table.
                    $chartContainer.css(
                        {
                            'margin': '0px -16px -17px -15px',
                            'min-width': '100%',
                            'margin-top': '-17px'
                        }
                    );
                    // Align buttons to the right.
                    $chartContainer.find('.dt-buttons.btn-group')
                        .css({
                            'width': '100%',
                            'padding': '0 17px 5px 0'
                        });
                    // Reduce whitespace between the chart and table.
                    $chartContainer.find('.dataTables_wrapper:first').css({
                        'margin-top': '-24px'
                    });
                    // Side scroll the table on mobile devices.
                    $chartContainer.find('table:first').parent('div').css({
                        'overflow-x': 'scroll'
                    });
                }
            });
        }
    }
};

mQuery(document).ready(function () {
    Mautic.appendTableToCharts();
    mQuery(document).ajaxComplete(function (event, xhr, settings) {
        window.appendTableToChartsTimer = setTimeout(function () {
            Mautic.appendTableToCharts();
        }, 200);
    });
});

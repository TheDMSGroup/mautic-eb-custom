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
                        .addClass('upgraded')
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
                                if (typeof dataset.borderColor !== 'undefined') {
                                    headers.push({'title': '<span style="color: ' + dataset.borderColor + '">' + dataset.label + '</span>'});
                                }
                                else {
                                    headers.push({'title': dataset.label});
                                }
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
                                    extend: 'csvHtml5',
                                    text: '<i class="fa fa-download"></i> CSV',
                                    className: 'btn-default'
                                },
                                {
                                    text: '<i class="fa fa-download"></i> Excel',
                                    extend: 'excelHtml5',
                                    className: 'btn-default'
                                },
                                {
                                    text: '<i class="fa fa-copy"></i> Copy',
                                    extend: 'copy',
                                    className: 'btn-default'
                                },
                                {
                                    text: '<i class="fa fa-plus"></i> Expand',
                                    className: 'btn-success',
                                    action: function (e, dt, node, config) {
                                        let $t = mQuery(node).parent().parent().parent().find('table.dataTable:first');
                                        $t.toggleClass('expanded');
                                        if ($t.hasClass('expanded')) {
                                            mQuery(node).html('<i class="fa fa-minus"></i> Collapse');
                                        } else {
                                            mQuery(node).html('<i class="fa fa-plus"></i> Expand');
                                        }
                                    }
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
                                        $tr = mQuery('<tr class=\'detailPageTotal\'></tr>');
                                    $tr.append(mQuery('<td>Total</td>'));
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
        }, 150);
    });
});

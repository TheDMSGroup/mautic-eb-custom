// Add standard Jira support widget.
(function ($) {
    $(document).ready(function () {
        var script = document.createElement('script');
        var prior = document.getElementsByTagName('script')[0];
        script.async = true;
        script.src = 'https://thedmsgrp.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/-aef0j9/b/8/e73395c53c3b10fde2303f4bf74ffbf6/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=e569fc9a';
        prior.parentNode.insertBefore(script, prior);
    });
})(mQuery);
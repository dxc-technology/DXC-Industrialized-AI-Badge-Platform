const getJIRAResponse = async() => {

    let blankWindow = window.open("Raise support", "JIRACollector");
    let document = blankWindow?.document;
    document?.open();
    document?.write(`
    <html>
    <head>
    <script type="text/javascript" src="https://d1pid1qk5rv3eb.cloudfront.net/s/d41d8cd98f00b204e9800998ecf8427e-CDN/-u6mps7/805004/8a7fb8df62aade8b7149085f03c3e6ac/2.2.4.7/_/download/batch/com.atlassian.plugins.jquery:jquery/com.atlassian.plugins.jquery:jquery.js?collectorId=0e64ccb5"></script><script type="text/javascript" src="https://jira.dxc.com/s/9eeb53a28f9ecc909c6a0f03667f1123-T/-u6mps7/805004/8a7fb8df62aade8b7149085f03c3e6ac/4.0.0/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en&collectorId=0e64ccb5"></script>
    <script type="text/javascript">window.ATL_JQ_PAGE_PROPS = {
    "triggerFunction": function (showCollectorDialog) {
    jQuery(document).ready(function () {
    setTimeout(function () {
    showCollectorDialog();

    }, 50);
    });
    }
    };</script>
    </head>
    <body>
    </body>
    </html>
    `);
    document?.close();
   
    
}

export default getJIRAResponse;
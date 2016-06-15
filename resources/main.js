$(document).ready(function () {
    //SideNav functionality
    $('.button-collapse').sideNav({
        edge: 'right',
        closeOnClick: true
    });

    setPopupTarget();
});

function setPopupTarget() {
    $('#analytics-link').on('click', function() {
        var target = $('head meta[name=analytics-browser-action]').attr('content');
        chrome.storage.local.get('user', function(result) {
            window.open('../analytics/index.html?platform=GitHub&userName=' + result.user, target);
        })
    })
}

$(document).ready(function () {
    //SideNav functionality
    $('.button-collapse').sideNav({
        edge: 'right',
        closeOnClick: true
    });

    $('#analytics-link').on('click', function() {
        chrome.storage.local.get('user', function(result) {
            window.open('../analytics/index.html?platform=GitHub&userName=' + result.user, '_blank');
        })
    })
});

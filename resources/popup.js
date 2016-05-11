function switch_icon() {
    var text = document.getElementById('status_text');
    text.setText("Octopeer has chrashed!");
}

document.getElementById('icon_toggle').addEventListener('click',switch_icon);
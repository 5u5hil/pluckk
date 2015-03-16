var domain = "http://pluck-infini.cruxservers.in/";

function getMenu(url) {
    $.ajax({
        url: url,
        type: "POST",
        success: function (data) {
            $("sidebar-nav").html(data);
        }
    });
}




$(document).ready(function () {
    
    getMenu(domain + "getMenu");
    
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});




var domain = "http://pluck-infini.cruxservers.in/";
var app = angular.module('pluckk', ['ngResource', 'ngSanitize']);
app.controller('getMenu', function ($scope, $http) {
    var url = domain + "m/get-menu";
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.get(url, function (data) {

        $scope.$apply(function () {
            $scope.menu = data;
        });
        chkLogin();
    });
});
app.controller('homeList', function ($scope, $http) {

    url = domain + 'm/get-home-prods';
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.getJSON(url, function (data) {
        $scope.$apply(function () {
            $scope.categories = data;
        });
        $('#dvLoading').fadeOut(200);
        $(".ySave").each(function () {

            if ($(this).text() == 0) {
                $(this).parent().hide();
                $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().hide();
            } else {
                $(this).parent().show();
                $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().show();
            }
        });
        navigator.splashscreen.hide();
    });
});
app.controller('productList', function ($scope, $http) {

    url = domain + 'm/get-category-products/' + getUrlParameter('slug') + '?sort=' + (getUrlParameter('sort') ? getUrlParameter('sort') : 0);
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.getJSON(url, function (data) {
        $scope.$apply(function () {
            $scope.s = data.cat;
            $scope.count = data.count;
            $scope.products = data.prods;
            var decoded = $('<div/>').html(data.links).text();
            $scope.pagination = decoded;
        });
        $(".ySave").each(function () {

            if ($(this).text() == 0) {
                $(this).parent().hide();
                $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().hide();
            } else {
                $(this).parent().show();
                $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().show();
            }
        });
        $('#dvLoading').fadeOut(200);
    });
    $scope.getProds = function (url) {

        $.ajaxSetup({
            scriptCharset: "utf-8", //maybe "ISO-8859-1"
            contentType: "application/json; charset=utf-8"
        });
        $.get(url,
                function (data) {
                    $scope.$apply(function () {
                        $scope.products = data.prods;
                        var decoded = $('<div/>').html(data.links).text();
                        $scope.pagination = decoded;
                    });
                    $(".ySave").each(function () {

                        if ($(this).text() == 0) {
                            $(this).parent().hide();
                            $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().hide();
                        } else {
                            $(this).parent().show();
                            $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().show();
                        }
                    });
                });
    }

});
app.controller('sList', function ($scope, $http) {

    url = domain + 'm/search/' + getUrlParameter('s') + '?sort=' + (getUrlParameter('sort') ? getUrlParameter('sort') : 0);
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.getJSON(url, function (data) {
        $scope.$apply(function () {
            $scope.s = getUrlParameter('s');
            $scope.count = data.count;
            $scope.products = data.prods;
            var decoded = $('<div/>').html(data.links).text();
            $scope.pagination = decoded;
        });
        $(".ySave").each(function () {

            if ($(this).text() == 0) {
                $(this).parent().hide();
                $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().hide();
            } else {
                $(this).parent().show();
                $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().show();
            }
        });
        $('#dvLoading').fadeOut(200);
    });
    $scope.getProds = function (url) {

        $.ajaxSetup({
            scriptCharset: "utf-8", //maybe "ISO-8859-1"
            contentType: "application/json; charset=utf-8"
        });
        $.get(url,
                function (data) {
                    $scope.$apply(function () {
                        $scope.products = data.prods;
                        var decoded = $('<div/>').html(data.links).text();
                        $scope.pagination = decoded;
                    });
                    $(".ySave").each(function () {

                        if ($(this).text() == 0) {
                            $(this).parent().hide();
                            $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().hide();
                        } else {
                            $(this).parent().show();
                            $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().show();
                        }
                    });
                });
    }

});
app.controller('productDetails', function ($scope, $http, $location) {

    url = domain + 'm/get-product-details/' + getUrlParameter('id');
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.getJSON(url, function (data) {
        $scope.$apply(function () {
            $scope.product = data;
        });
        $(".ySave").each(function () {

            if ($(this).text() == 0) {
                $(this).parent().hide();
                $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().hide();
            } else {
                $(this).parent().show();
                $(".ssprice[data-id='" + $(this).attr("data-id") + "']").parent().show();
            }
        });
        $('#dvLoading').fadeOut(200);
    });
});
app.controller('orderList', function ($scope, $http, $location) {

    url = domain + 'm/get-orders/' + window.localStorage.getItem('id');
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.getJSON(url, function (data) {
        $scope.$apply(function () {
            $scope.orders = data;
        });
        $('#dvLoading').fadeOut(200);
    });
});
app.controller('odetails', function ($scope, $http, $location) {

    url = domain + 'm/order-details?id=' + getUrlParameter('id');
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.get(url, function (data) {
        a = $.parseHTML(data);
        data = $(a).find(".acc_right").html();
        console.log(data);
        $scope.$apply(function () {

            $scope.details = data;
        });
        $('#dvLoading').fadeOut(200);
    });
});
app.controller('offers', function ($scope, $http, $location) {

    url = domain + '/offers';
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.get(url, function (data) {
        a = $.parseHTML(data);
        data = $(a).find(".page_content_offset").html();
        $scope.$apply(function () {

            $scope.details = data;
        });
        $('#dvLoading').fadeOut(200);
    });
});
app.controller('cartList', function ($scope, $http) {

    url = domain + 'm/cart';
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.get(url,
            function (data) {
                $scope.$apply(function () {
                    $scope.cart = data.cart;
                    $scope.coupons = data.coupons;
                });
                $('#dvLoading').fadeOut(200);
            });
});
app.controller('login', function ($scope, $http) {
    $('#dvLoading').fadeOut(200);
});
app.controller('fpassword', function ($scope, $http) {
    $('#dvLoading').fadeOut(200);
});
app.controller('updt', function ($scope, $http) {
    updDetails();
    $('#dvLoading').fadeOut(200);
});
app.controller('reg', function ($scope, $http) {
    $('#dvLoading').fadeOut(200);
});
app.controller('finall', function ($scope, $http) {
    console.log(getUrlParameter('slot'));
    $scope.options = decodeURIComponent(getUrlParameter('slot'));
    $('#dvLoading').fadeOut(200);
});
app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function get_checkout() {
    var MinAmt = 100;
    if ($(".grandTotal").text() < MinAmt) {
        alert("Please place order of at least Rs. 100 (excluding Shipping Charges)");
    } else {
        if (window.localStorage.getItem('id') && window.localStorage.getItem('email') && window.localStorage.getItem('via')) {
            fbLogin(window.localStorage.getItem('email'), window.localStorage.getItem('id'), window.localStorage.getItem('firstname'), window.localStorage.getItem('lastname'), 'update-details.html');
        } else if (window.localStorage.getItem('id') && window.localStorage.getItem('email') && window.localStorage.getItem('password')) {
            login(window.localStorage.getItem('email'), window.localStorage.getItem('password'), 'update-details.html');
        } else {
            top.location.href = "login.html?route=confirm-details";
        }
    }

}

function fb_login() {
    var fbLoginSuccess = function (userData) {


        if (userData.authResponse) {
            facebookConnectPlugin.api('/me', null,
                    function (response) {
                        user_email = response.email; //get user email
                        user_id = response.id; //get user email
                        firstname = response.first_name; //get user email
                        lastname = response.last_name; //get user email
                        if (getUrlParameter('route') == "confirm-details") {
                            var rurl = "update-details.html";
                        } else {
                            var rurl = "index.html";
                        }

                        fbLogin(user_email, user_id, firstname, lastname, rurl);
                    });
        }
    }

    facebookConnectPlugin.login(["public_profile", "email"], fbLoginSuccess,
            function (error) {
                alert("Error " + JSON.stringify(error))
            }
    );
}

function fbLogin(user_email, user_id, firstname, lastname, rurl) {
    $.ajax({
        type: "GET",
        url: domain + "/fb_details",
        data: {email: user_email, user_id: user_id, firstname: firstname, lastname: lastname},
        cache: false,
        success: function (data)
        {
            $.ajax({
                url: domain + 'm/get-session',
                type: 'get',
                success: function (data) {
                    window.localStorage.setItem("id", data.id);
                    window.localStorage.setItem("via", "facebook");
                    window.localStorage.setItem("email", data.email);
                    window.localStorage.setItem("firstname", data.firstname);
                    window.localStorage.setItem("lastname", data.lastname);
                    window.localStorage.setItem("telephone", data.telephone);
                    window.localStorage.setItem("address1", data.address1);
                    window.localStorage.setItem("address2", data.address2);
                    window.localStorage.setItem("address3", data.address3);
                    window.localStorage.setItem("landmark", data.landmark);
                    window.localStorage.setItem("postal_code", data.postcode);
                    window.localStorage.setItem("city", data.city);
                    window.localStorage.setItem("country", data.country_id);
                    window.localStorage.setItem("zone", data.zone_id);

                    top.location.href = rurl;
                }
            });
        }

    });

}

function updDetails() {
    $("[ng-model]").each(function () {
        $(this).val(window.localStorage.getItem($(this).attr('name')));
    });
    $.ajax({
        url: domain + 'm/get-mini',
        type: 'get',
        success: function (data) {
            $("[name='pay_amt']").val(data[0]);
            $("[name='shippingAmount']").val(data[1]);
            $("[name='cart_content']").val(JSON.stringify(data[2]));
        }
    });
}

function login(uname, pass, rurl) {
    $.ajax({
        url: domain + 'check_user_login',
        type: 'get',
        data: {username: uname, password: pass},
        success: function (data) {
            if (data.match(/My Account/g)) {
                $.ajax({
                    url: domain + 'm/get-session',
                    type: 'get',
                    success: function (data) {
                        window.localStorage.setItem("id", data.id);
                        window.localStorage.setItem("email", data.email);
                        window.localStorage.setItem("password", pass);
                        window.localStorage.setItem("firstname", data.firstname);
                        window.localStorage.setItem("lastname", data.lastname);
                        window.localStorage.setItem("telephone", data.telephone);
                        window.localStorage.setItem("address1", data.address1);
                        window.localStorage.setItem("address2", data.address2);
                        window.localStorage.setItem("address3", data.address3);
                        window.localStorage.setItem("landmark", data.landmark);
                        window.localStorage.setItem("postal_code", data.postcode);
                        window.localStorage.setItem("city", data.city);
                        window.localStorage.setItem("country", data.country_id);
                        window.localStorage.setItem("zone", data.zone_id);
                        top.location.href = rurl;
                    }
                });
            } else {
                $('#dvLoading').hide();
                alert('Invalid Login, Please provide valid details or try to login again!');
                top.location.href = 'login.html';
            }
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function chkLogin() {


    if (window.localStorage.getItem('id') && window.localStorage.getItem('email') && (window.localStorage.getItem('password') || window.localStorage.getItem('via'))) {
        $(".nlogin").hide();
        $("ul.sidebar-nav").append("<li class='parent'><a href='update-details.html?route=home' ><i class='fa fa-user lf20'></i>  Hi " + capitalizeFirstLetter(window.localStorage.getItem('firstname')) + "</a></li>")
        $("ul.sidebar-nav").append("<li class='parent'><a href='update-details.html?route=home' ><i class='fa fa-caret-right fa-1x'></i> My Account</a></li>");
        $("ul.sidebar-nav").append("<li class='parent'><a href='myorders.html?id=" + window.localStorage.getItem('id') + "' ><i class='fa fa-caret-right fa-1x'></i> My Orders</a></li>")
        $("ul.sidebar-nav").append("<li class='parent'><a  href='#'  id='logoutMenueButton'><i class='fa fa-caret-right fa-1x'></i> Logout</a></li>")

    }

}

$(document).ready(function () {

    $("#sListt").on('click', 'a', function (e) {
        e.preventDefault();
        angular.element($("#sList")).scope().getProds($(this).attr('href'));
    });
    $(".pagination").on('click', 'a', function (e) {
        e.preventDefault();
        angular.element($("#pList")).scope().getProds($(this).attr('href'));
    });
    $("body").on("change", "select[name='sub_prod']", function () {
        $(this).parent().parent().find(".sprice").html($('option:selected', this).attr("data-sp"));
        var id = $(this).attr("data-id");
        $(".ySave[data-id='" + id + "']").html("<i class='fa fa-rupee'></i>" + $('option:selected', this).attr('data-saving'));
        $(".sprice[data-id='" + id + "']").html("<i class='fa fa-rupee'></i>" + $('option:selected', this).attr('data-sp'));
        $(".ssprice[data-id='" + id + "']").html("<i class='fa fa-rupee'></i>" + $('option:selected', this).attr('data-mrp'));
        $(".ySave[data-id='" + id + "']").parent().show();
        $(".ssprice[data-id='" + id + "']").parent().show();
        if ($('option:selected', this).attr('data-saving') == 0) {

            $(".ySave[data-id='" + id + "']").parent().hide();
        }

        if ($('option:selected', this).attr('data-sp') == $('option:selected', this).attr('data-mrp')) {

            $(".ssprice[data-id='" + id + "']").parent().hide();
        }




    });
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $("#wrapper").on('click', '.addToCart', function (e) {
        e.preventDefault();
        var formId = $(this).attr("form-id");
        url = $(this).attr('form-action') + "?" + $("#" + formId).serialize();
        $.ajaxSetup({
            scriptCharset: "utf-8", //maybe "ISO-8859-1"
            contentType: "application/json; charset=utf-8"
        });
        $.get((url),
                function (result) {
                    var cart_cont = result.split("||||||");
                    setTimeout(function () {
                        $(".navcart .badge").text(cart_cont[1]);
                    }, 1200)
                    //  alert("Product Added Successfully");
                });
    });
    $("#wrapper").on('click', '.pQty', function (e) {
        var val = parseInt($(this).siblings(".quantity").val());
        val++;
        $(this).siblings(".quantity").val(val);
    });
    $("#wrapper").on('click', '.mQty', function (e) {
        var val = parseInt($(this).siblings(".quantity").val());
        if (val > 1) {
            val--;
            $(this).siblings(".quantity").val(val);
        }
    });
    var ordertlt = $(".grandTotal").text();
    var url = domain + "m/get-cart-count";
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });
    $.get(url, function (data) {
        $("a.navcart span.badge").html(data);
    });
    if (ordertlt < 250)
    {
        var total_pay_ship = parseInt(ordertlt) + 30;
        $(".orderAmt").val(total_pay_ship);
    }


    $("body").on('change', ".qty", function () {
        var qty = $(this).val();
        var rowid = $(this).attr("prod-id");
        var productId = $(this).attr("product-id");
        if (qty !== "" && qty > 0) {
            $(".savQty").text(qty);
            $.ajax({
                url: domain + "cart/edit-cart",
                type: 'get',
                data: {rowid: rowid, qty: qty, productId: productId},
                success: function (data) {
                    if (data != "Specified quantity is not available") {
                        var totals = data.split("||||||||||");
                        $("." + rowid).html(totals[0]);
                        $(".ysave[ysave-id='" + rowid + "']").text(parseInt(parseInt($(".ysave[ysave-id='" + rowid + "']").attr("data-y")) * parseInt($(".qty[prod-id='" + rowid + "']").val())));
                        $(".grandTotal").html(totals[1]);
                        $(".TotalCartAmt").text(totals[1]);
                        $(".orderAmt").val(totals[1]);
                        var REQamt = parseInt(250);
                        if (totals[1] < REQamt) {
                            if ($(".shippingValue").text() == 0) {
                                $(".shippingValue").text(30);
                                var ship = '30';
                                $(".TotalCartAmt").text(parseInt(totals[1]) + parseInt(ship));
                                $(".orderAmt").val(parseInt(totals[1]) + parseInt(ship));
                            } else {
                                var ship = '30';
                                $(".TotalCartAmt").text(parseInt(totals[1]) + parseInt(ship));
                                $(".orderAmt").val(parseInt(totals[1]) + parseInt(ship));
                            }
                        } else if (totals[1] >= REQamt && $(".shippingValue").text() == 30) {
                            $(".shippingValue").text(0);
                        }
                        if ($(".userCouponCode").val() !== "") {
                            $("#couponApply").click();
                        }
                    } else {
                        alert("Specified quantity is not available");
                    }

                }
            });
        }
    });
    $("body").on("click", ".clearCoup", function () {
        var couponCode = '';
        var CartAmt = $(".TotalCartAmt").text();
        $.ajax({
            url: domain + "check_coupon",
            type: 'get', data: {couponCode: couponCode, orderAmount: $(".orderAmt").val()},
            cache: false,
            success: function (msg) {
                $(".cMsg").css("display", "block");
                var Cmsg = msg.split(":-")[0];
                if (msg.split(":-")[1].length > 0) {

                    var newCartAmt = parseInt(CartAmt) + parseInt(Math.round(msg.split(":-")[1]));
                    if (newCartAmt < '250')
                    {
                        var aa = parseInt(newCartAmt) + 30;
                    } else
                    {
                        var aa = parseInt(newCartAmt);
                    }

                    $(".TotalCartAmt").text(newCartAmt);
                    $(".orderAmt").val(aa);
                }
                $(".couponUsedAmount").text("0");
                $(".cMsg").html("Coupon Removed!");
                $("#couponApply").removeAttr("disabled");
                $(".userCouponCode").removeAttr("disabled");
            }});
    });
    $("#couponApply").click(function () {
        var couponCode = $(".userCouponCode").val();
        var CartAmt = $(".grandTotal").text();
        if ($(".userCouponCode").val() != "") {
            $.ajax({
                url: domain + "check_coupon",
                type: 'get',
                data: {couponCode: couponCode, orderAmount: CartAmt},
                cache: false, success: function (msg) {
                    $(".cMsg").css("display", "block");
                    $(".emptyCouponError").css("display", "none");
                    var Cmsg = msg.split(":-")[0];
                    if (msg.split(":-")[0] != "Coupon Not Valid") {
                        $("#couponApply").attr("disabled", "disabled");
                        $(".userCouponCode").attr("disabled", "disabled");
                        Cmsg = "<span style='color:green;'>Coupon Applied!</span> <a href='javascript:void();' style='border-bottom: 1px dashed;' class='clearCoup'>Remove!</a>";
                        if ($(".shippingValue").text() == '30') {
                            var CouponVal = parseInt(Math.round(msg.split(":-")[1])) + parseInt($(".shippingValue").text());
                        } else {
                            var CouponVal = parseInt(Math.round(msg.split(":-")[1]));
                        }


                        var usedCouponAmount = Math.round(msg.split(":-")[3]);
                        $(".TotalCartAmt").text(CouponVal);
                        $(".orderAmt").val(CouponVal);
                        $(".couponUsedAmount").text(usedCouponAmount);
                        $(".cMsg").html(Cmsg);
                    } else {

                        if (msg.split(":-")[1].length > 0) {
                            var newCartAmt = parseInt(CartAmt) + parseInt(Math.round(msg.split(":-")[1]));
                            $(".TotalCartAmt").text(newCartAmt);
                            $(".orderAmt").val(newCartAmt);
                        }
                        $(".couponUsedAmount").text("0");
                        $("#couponApply").removeAttr("disabled");
                        $(".userCouponCode").removeAttr("disabled");
                        $(".cMsg").html("Coupon Code Invalid OR Not applicable on current cart value.");
                    }


                }
            });
        } else {

            $(".emptyCouponError").show();
            $(".cMsg").html("");
            $(".emptyCouponError").html("Please enter valid coupon code.");
        }


        return false;
    });
    $("body").on('click', ".deleteCart", function (e) {
        e.preventDefault();
        var url = domain + $(this).attr('href');
        var rowid = $(this).attr("prod-id");
        var productId = $(this).attr("product-id");
        $.ajax({
            url: url,
            type: 'get',
            success: function (data) {
                top.location.href = top.location.href

            }
        });
    });
    $(".updtBtn").click(function (e) {
        e.preventDefault();
        var error = 0;

        if ($("[name='firstname']").val() == "") {
            alert("Please Enter a valid Firstname");
        } else if ($("[name='lastname']").val() == "") {
            alert("Please Enter a valid Lastname");
        } else if ($("[name='address1']").val() == "") {
            alert("Please Enter a valid Address Line No 1");
        } else if ($("[name='postal_code']").val() == "") {
            alert("Please Enter a valid Pincode");
        } else if (!validatephonenumber($("[name='telephone']").val())) {
            alert("Please Enter a valid Contact number");
        } else {
            $('#dvLoading').show();
            $.ajax({
                url: domain + 'secure',
                type: 'get',
                data: $(this).parent().parent().serialize(),
                success: function (data) {
                    if (getUrlParameter('route') == "home") {
                        top.location.href = "index.html";
                    } else {
                        if (data.match(/COD not available for your selected Pincode/g)) {
                            $('#dvLoading').hide();
                            alert("COD not available for your selected Pincode!");
                        } else {
                            a = $.parseHTML(data);
                            top.location.href = "final.html?slot=" + encodeURIComponent($(a).find("select.optAvlSlot").html());
                        }
                    }
                }
            });
        }
        
    });
    $(".regBtn").click(function (e) {
        e.preventDefault();
        if ($("[name='firstname']").val() == "" || $("[name='lastname']").val() == "" || $("[name='password']").val() == "" || $("[name='cpassword']").val() == "" || $("[name='email']").val() == "") {
            alert("All fields are mandatory!");
        }
        else if (!validateEmail($("[name='email']").val())) {
            alert("Please Enter a Valid Email!");
        } else if ($("[name='password']").val() != $("[name='cpassword']").val()) {
            alert("Passwords did not match!");
        } else {
            $('#dvLoading').show();
            $.ajax({
                url: domain + 'm/m-save-user',
                type: 'get',
                data: $(this).parent().parent().serialize(), success: function (data) {
                    if (data != "The email address you have entered is already registered.") {
                        var dataValues = jQuery.parseJSON(data);
                        if (getUrlParameter('route') == "confirm-details") {
                            var rurl = "update-details.html";
                        } else {
                            var rurl = "index.html";
                        }
                        login(dataValues.email, dataValues.password, rurl);
                    } else {
                        $('#dvLoading').hide();
                        alert("The email address you have entered is already registered.");
                    }

                }
            });
        }
    });
    $(".finalStep").click(function (e) {
        e.preventDefault();

        if ($("[name='delSlot']").val() === null) {
            alert("Please Select a Delivery Slot");
        } else {
            $('#dvLoading').show();
            $.ajax({
                url: domain + 'order_cash_on_delivery', type: 'get',
                //data: $(this).parent().parent().serialize(),

                data: $("#slotForm").serialize(),
                success: function (data) {


                    if (data.match(/thank/g)) {
                        $('#dvLoading').hide();
                        location.href = "thankyou.html";
                    } else {
                        // alert("Something went wrong! Try again Later!");
                        $('#dvLoading').hide();
                        location.href = "thankyou.html";
                    }

                }
            });
        }
    });
    $(".loginBtn").click(function (e) {
        e.preventDefault();
        $('#dvLoading').show();
        if ($("[name='username']").val() == "" || $("[name='password']").val() == "") {
            $('#dvLoading').hide();
            alert("Please Enter Valid Email ID & Password!");
        } else {
            if (getUrlParameter('route') == "confirm-details") {
                var rurl = "update-details.html";
            } else {
                var rurl = "index.html";
            }
            login($("[name='username']").val(), $("[name='password']").val(), rurl);
        }
    });
    $("body").on("click", ".reOrder", function (e) {
        e.preventDefault();
        $('#dvLoading').show();
        $.ajax({
            url: domain + $(this).attr('href'), type: 'get',
            success: function (data) {
                top.location.href = 'cart.html';
            }
        });
    });
    $("#sList #ssort").change(function () {
        if ($(this).val() !== "") {
            top.location.href = "search.html?s=" + getUrlParameter("s") + "&sort=" + $(this).val();
        }
    });
    $("#pList #ssort").change(function () {
        if ($(this).val() !== "") {
            top.location.href = "category.html?slug=" + getUrlParameter("slug") + "&sort=" + $(this).val();
        }
    });
    ///madhuri
    $("body").on("click", "#logoutMenueButton", function () {
        localStorage.clear();
        top.location.href = "index.html";
    });
    $('body').on('click', '.addToCart', function () {
        var cart = $('.shopping-cart');
        var imgtodrag = $(this).closest('.citem').find("div.pimg");
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                    .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                    .css({
                        'opacity': '0.5',
                        'position': 'absolute',
                        'height': '150px',
                        'width': '150px',
                        'z-index': '100'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': cart.offset().top + 10,
                        'left': cart.offset().left + 10,
                        'width': 75,
                        'height': 75
                    }, 1000, 'easeInOutExpo');
            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
            }, 1500);
            imgclone.animate({
                'width': 0,
                'height': 0
            }, function () {
                $(this).detach()
            });
        }
    });
    $('body').on('click', '#searchicon', function (e) {
        e.preventDefault();
        $(this).toggleClass('searchpull');
    });
    if (getUrlParameter('sort')) {
        $('[name=sort]').val(getUrlParameter('sort'))
    }


    $(".fpasswdBtn").click(function (e) {
        e.preventDefault();
        $('#dvLoading').show();
        if ($("[name='username']").val() == "" || !validateEmail($("[name='username']").val())) {
            $('#dvLoading').hide();
            alert("Please Enter Valid Email ID");
        } else {
            $.ajax({
                url: domain + "m/check-mail-password",
                type: 'get',
                data: {email: $("[name='username']").val()},
                success: function (data) {
                    $('#dvLoading').hide();
                    if (data.match(/A Link to reset your password has been sent. Please check your email./g)) {
                        alert("A Link to reset your password has been sent. Please check your email.");
                    } else {
                        alert("Sorry!This email isn't registered with us!");
                    }
                }
            });

        }
    });
});
function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}

function validatephonenumber(inputtxt) {
    var phoneno = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    if ((phoneno.test(inputtxt))) {
        return true;
    } else {
        return false;
    }
}
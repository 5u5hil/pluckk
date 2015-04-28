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
        navigator.splashscreen.hide();


    });

});

app.controller('productList', function ($scope, $http) {

    url = domain + 'm/get-category-products/' + getUrlParameter('slug');

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON(url, function (data) {
        $scope.$apply(function () {
            $scope.products = data.prods;
            var decoded = $('<div/>').html(data.links).text();
            $scope.pagination = decoded;

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

app.controller('cartList', function ($scope, $http) {

    url = domain + 'm/cart';

    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.get(url,
            function (data) {
                $scope.$apply(function () {
                    $scope.cart = data;
                });
                $('#dvLoading').fadeOut(200);

            });

});

app.controller('login', function ($scope, $http) {
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
        alert("Please place order of at least Rs. 100");

    } else {
        if (window.localStorage.getItem('id') && window.localStorage.getItem('email') && window.localStorage.getItem('password')) {
            login(window.localStorage.getItem('email'), window.localStorage.getItem('password'), 'update-details.html');
        } else {
            top.location.href = "login.html?route=confirm-details";

        }
    }

}

function fb_login() {
    var fbLoginSuccess = function (userData) {
        alert("UserInfo: " + JSON.stringify(userData));
    }

    facebookConnectPlugin.login(["public_profile", "email"], fbLoginSuccess,
            function (error) {
                alert("" + error)
            }
    );
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
                alert('Invalid Login, Please provide valid details or try to login again!');
                top.location.href = 'login.html';
            }
        }
    });
}

function chkLogin() {
    if (window.localStorage.getItem('id') && window.localStorage.getItem('email') && window.localStorage.getItem('password')) {
        $(".nlogin").hide();
        $("ul.sidebar-nav").append("<li class='parent'><a href='#' >Hi " + window.localStorage.getItem('firstname').toUpperCase() + "</a></li>")
        $("ul.sidebar-nav").append("<li class='parent'><a href='update-details.html?route=home' ><i class='fa fa-user'> My Account</a></li>");
        $("ul.sidebar-nav").append("<li class='parent'><a href='myorders.html?id=" + window.localStorage.getItem('id') + "' ><i class='fa fa-dashboard'> My Orders</a></li>")
    }
}

$(document).ready(function () {


    $(".pagination").on('click', 'a', function (e) {
        e.preventDefault();
        angular.element($("#pList")).scope().getProds($(this).attr('href'));
    });


    $("body").on("change", "select[name='sub_prod']", function () {
        $(this).parent().parent().find(".sprice").html($('option:selected', this).attr("data-sp"));
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
                    $(".navcart .badge").text(cart_cont[1]);
                    alert("Product Added Successfully");
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
            }
        });
    });
    $("#couponApply").click(function () {
        var couponCode = $(".userCouponCode").val();

        var CartAmt = $(".grandTotal").text();
        if ($(".userCouponCode").val() != "") {
            $.ajax({
                url: domain + "check_coupon",
                type: 'get',
                data: {couponCode: couponCode, orderAmount: CartAmt},
                cache: false,
                success: function (msg) {
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
    });

    $(".regBtn").click(function (e) {
        e.preventDefault();
        $('#dvLoading').show();
        $.ajax({
            url: domain + 'm/m-save-user',
            type: 'get',
            data: $(this).parent().parent().serialize(),
            success: function (data) {
                if (data != "The email address you have entered is already registered.") {
                    var dataValues = jQuery.parseJSON(data);
                    if (getUrlParameter('route') == "confirm-details") {
                        var rurl = "update-details.html";
                    } else {
                        var rurl = "index.html";
                    }
                    login(dataValues.email, dataValues.password, rurl);
                } else {
                    alert("The email address you have entered is already registered.");
                    //top.location.href = 'login.html';
                }

            }
        });
    });


    $(".finalStep").click(function (e) {
        e.preventDefault();
        $('#dvLoading').show();
        $.ajax({
            url: domain + 'order_cash_on_delivery', type: 'get',
            data: $(this).parent().parent().serialize(),
            success: function (data) {
                if (data.match(/thank/g)) {
                    $('#dvLoading').hide();
                    top.location.href = "thankyou.html";
                } else {
                    alert("Something went wrong! Try again Later!");
                }

            }
        });
    });



    $(".loginBtn").click(function (e) {
        e.preventDefault();
        $('#dvLoading').show();

        if ($("[name='username']").val() == "" || $("[name='password']").val() == "") {
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
            url: domain + $(this).attr('href'),
            type: 'get',
            success: function (data) {
                top.location.href = 'cart.html';
            }
        });
    });

});
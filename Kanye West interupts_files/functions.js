$script(['//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js', '/js/bootstrap-star-rating/js/star-rating.min.js'], 'voting', function () {
	$(document).ready(function() {
		$("#input-id").rating({ 'size': 'xs' });
		var $input = $('.item_boards input.rating');
		if ($input.length) {
			$input.removeClass('rating-loading').addClass('rating-loading').rating();
		}
		
		$input.rating('refresh', {showClear:false, disabled:true, showCaption:false});
		$input.each(function() {
			var vote = $(this).data('vote');
			$(this).prev().css('width', vote + '%');
		});
	});
});
$(document).ready(function() {
	
	function instapopup(a) {
		$("#myModal_message").html(a);
		$("#myModal").modal("show");
		setTimeout(function() {
			$("#myModal").modal("hide")
		}, 3E3);
		
		return false;
	}
		
	$.fn.serializeObject = function() {
		var a, b;
		a = this.serializeArray();
		b = {};
		$.each(a, function() {
			var a;
			a = null != this.value ? this.value : "";
			null != b[this.name] ? (b[this.name].push || (b[this.name] = [b[this.name]]), b[this.name].push(a)) : b[this.name] = a
		});
		return b
	};
	$(function() {
		$('a[href="#top"]').unbind("click").click(function(a) {
			a.stopPropagation();
			a.preventDefault();
			$.mobile.silentScroll(100)
		})
	});

	if ($('#btnLogin').length > 0) {
		var $btn = $('#btnLogin');
	} else if ($('#btnRegUser').length > 0){
		var $btn = $('#btnRegUser');
	} else if ($('#btnRetrievePassword').length > 0){
		var $btn = $('#btnRetrievePassword');
	} else if ($('#btnSearch').length > 0){
		var $btn = $('#btnSearch');
	}
	
	if (typeof $btn !== 'undefined') {
		var $form = $btn.parents('#form1');

		$form.keypress(function(e){
			if (e.which == 13 && e.target.type != 'textarea') {
				if ($btn[0].type == 'submit')
					$btn[0].click();
				else
					eval($btn[0].href);
				return false;
			}
		});
	}
	
	$('.side_out .contains').click(function() {
		if ($(this).next("ul").hasClass("expanded")){
			$(this).find("span").removeClass("glyphicon-menu-up");
			$(this).find("span").addClass("glyphicon-menu-down");
			$(this).next("ul").hide();
			$(this).next("ul").removeClass("expanded");
		} else {
			$('.side_out .contains').each(function(index,item){
				$(item).find("span").removeClass("glyphicon-menu-up");
				$(item).find("span").addClass("glyphicon-menu-down");
				$(item).next("ul").hide();
				$(item).next("ul").removeClass("expanded");
			});
		
			$(this).find("span").removeClass("glyphicon-menu-down");
			$(this).find("span").addClass("glyphicon-menu-up");
			$(this).next("ul").show();
			$(this).next("ul").addClass("expanded");
		}
	});
	
	if(window.devicePixelRatio >= 1.2){
		$("[data-2x]").each(function(){
			if(this.tagName == "IMG"){
				$(this).attr("src",$(this).attr("data-2x"));
			} else {
				$(this).css({"background-image":"url("+$(this).attr("data-2x")+")"});
			}
		});
	}
});

function openpopup(a) {
    return $('<div class="ui-loader ui-corner-all ui-body-e ui-loader-verbose ui-loader-textonly"><span class="ui-icon ui-icon-loading"></span><h1><strong>' + a + "</strong></h1></div>").css({
        display: "block",
        opacity: .96,
        top: $(window).scrollTop() + 100
    }).appendTo($("body"))
}

function closepopup(a) {
    $(a).fadeOut(500, function() {
        $(this).remove()
    })
}
function selectImage(a) {
    $("#ulFileList").find("li").css({
        border: "solid 2px #fff"
    });
    var b = "a_" + a.replace(".", "_");
    $("#" + b).closest("li").css({
        border: "solid 2px #555"
    });
    $(".txtImageFile").val(a);
    $(".txtHidGalleryStat").val("1");
    $(".imgUpload").val("")
}

function guidGenerator() {
    var a = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
    };
    return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
}

function getrandomnumber() {
    return Math.floor(1500 * Math.random())
}

function addRules(a) {
    for (item in a) $("#" + item).rules("add", a[item])
}

function removeRules(a) {
    for (item in a) $("#" + item).rules("remove")
}

function checkemail(a) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(a) ? !0 : !1
}

function openpopup(a) {
    return $('<div class="ui-loader ui-corner-all ui-body-e ui-loader-verbose ui-loader-textonly"><span class="ui-icon ui-icon-loading"></span><h1><strong>' + a + "</strong></h1></div>").css({
        display: "block",
        opacity: .96,
        top: $(window).scrollTop() + 100
    }).appendTo($("body"))
}

function closepopup(a) {
    $(a).fadeOut(500, function() {
        $(this).remove()
    })
}

function instasearch() {
    var a;
    a = '<div><h1>Search in soundboard</h1>    <p><label for="txtSearchPopup">Enter keywords</label>    <input type="text" name="txtSearchPopup" id="txtSearchPopup" data-role="text" data-theme="c" />';
    a += "    </p><p>";
    a += '        <input id="abtnSearch" name="abtnSearch" type="submit" value="Search" data-inline="true" data-theme="b" /> ';
    a += '        <a id="abtnCancelSearch" href="#" data-role="button" data-inline="true" data-theme="b">Back</a>';
    a += "    </p>";
    a += "</div>";
    $("<div id='searchDialog' class='ui-loader ui-overlay-shadow ui-body-d ui-corner-all' style='width:300px;'>" +
        a + "</div>").css({
        display: "block",
        opacity: .96,
        top: $(window).scrollTop() + 100
    }).appendTo($("body")).page();
    $("#abtnCancelSearch").live("click", function(a) {
        $("#searchDialog").remove()
    });
    var b = $("#abtnSearch"),
        d = $("#txtSearchPopup");
    $("#searchDialog").height("250");
    d.focus();
    d.bind("keyup", function(a) {
        13 == a.keyCode && (window.location = "/search.aspx?q=" + d.val());
        "" == this.value ? b.button("disable") : b.button("enable")
    }).trigger("keyup");
    b.click(function(a) {
        a.preventDefault();
        if ("" == $("#txtSearchPopup").val()) return $("#txtSearchPopup").focus(), !1;
        window.location = "/search.aspx?q=" + $("#txtSearchPopup").val()
    })
}

function truncate(a) {
    var b = $(a).text().trim().split(" ").slice(0, -1).join(" ") + "",
        d = b.substring(0, 100),
        e = 100 < b.length ? b.substring(100) : "";
    100 < b.length && ($(a).html("<span>" + d + '<a class="readmore" href="#">read more</a></span>'), $(a).append('<span class="readmore_hiddentext">' + e + '<a class="readless" href="#">read less</a></span>'))
}

function truncate2(a) {
    $(a + " p").css({
        display: "inline"
    });
    var b = $(a).html(),
        d, e = '<span class="revealText">',
        g = 0,
        f, l = [],
        k = !1,
        b = b.replace(/[\s\n\r]{2,}/g, " "),
        b = b.replace(/(<[^<>]+>)/g, "|*|SPLITTER|*|$1|*|SPLITTER|*|"),
        b = b.replace(/(\|\*\|SPLITTER\|\*\|)(\s*)\|\*\|SPLITTER\|\*\|/g, "$1$2"),
        b = b.replace(/^[\s\t\r]*\|\*\|SPLITTER\|\*\||\|\*\|SPLITTER\|\*\|[\s\t\r]*$/g, ""),
        b = b.split(/\|\*\|SPLITTER\|\*\|/),
        m;
    for (m in b) {
        d = b[m];
        f = l[l.length - 1];
        if (d.match(/<[^<>]+>/)) d.match(/<br>|<BR>/) || (d.match(/\//) ? (d.match(/<\/(\w+)>/)[1] ==
            l[l.length - 1][1] && l.pop(), d.match(/<\/[pP]>/) && (e += '<span class="paragraphBreak"><br> <br> </span>')) : l.push(d.match(/<(\w+)(\s*[^>]*)>/)));
        else if (f && " " == d.charAt(0) && !f[1].match(/span|SPAN/) && (d = d.substr(1)), !k && (g += d.length, 80 <= g)) {
            for (var k = d.length - 1, c = k - (g - 80); c != k && !d.charAt(c).match(/[\s\t\n]/) && c != k;) c++;
            c != k && c--;
            var n = "",
                h = "";
            f && (n = "</" + f[1] + ">", h = "<" + f[1] + f[2] + ">");
            f = '<span class="readMore"><span class="ellipsis">...</span><span class="readMoreText"> [Read More] </span></span>' + n + '</span><span class="hiddenText">' +
                h;
            e += c == k ? d.substr(0) + f : d.substr(0, c + 1) + f + d.substr(c + 1).replace(/^\s/, "&nbsp;");
            k = !0;
            continue
        }
        e += d
    }
    e += "</span>";
    $(a).html(e)
}

function showmsg(a, b, d) {
    null == d && (d = !0);
    b = "<div style='padding:20px;text-align:center'>" + b + " <br /><br /></div>";
    $("<div>").simpledialog2({
        mode: "blank",
        themeDialog: "a",
        headerText: a,
        headerClose: !0,
        callbackOpen: function() {
            d && setTimeout(function() {
                $.mobile.sdCurrentDialog && $.mobile.sdCurrentDialog.close()
            }, 3E3)
        },
        blankContent: b + "<a rel='close' data-role='button' data-theme='b' href='#'>Close</a>"
    })
}

function isSpecial(a) {
    for (var b = 0; b < a.length; b++)
        if (-1 != "!@#$%^&*()+=[]\\';,./{}|\":<>?".indexOf(a.charAt(b))) return !0;
    return !1
}

function goForSearch(a) {
    if ("" == $("." + a + " .txtSearchTop").val() || "Find sounds..." == $("." + a + " .txtSearchTop").val()) return $("." + a + " .txtSearchTop").focus(), !1;
    location.href = "/search.aspx?keyword=" + encodeURIComponent($("." + a + " .txtSearchTop").val());
    return !1
}

function homePageSearch() {
    var a = $("#txtSliderSearchTop").val();
    if ("" == a || a == $("#hdnSliderSoundString").val()) return $("#txtSliderSearchTop").focus(), !1;
    location.href = "/search.aspx?keyword=" + encodeURIComponent(a);
    return !1
}

function getParameterByName(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    a = (new RegExp("[\\?&]" + a + "=([^&#]*)")).exec(window.location.search);
    return null == a ? "" : decodeURIComponent(a[1].replace(/\+/g, " "))
}

function addBoardToCart(boardid) {

	jQuery.ajax({
		type: 'post',
		url: '/handler/TAddBoardToCart.ashx',
		data: { boardid: boardid },
		dataType: "json",
		success: function (result) {
			if (result.JSON[0].status == "success") {
				//$(".cartinfo").html("cart (" + result.JSON[0].total + ")");
				$(".cartinfo span").text("Cart (" + result.JSON[0].total + ")");

				openPopupCart(result.JSON[0].message);
				return false;
			}
			else {
				openPopupCart(result.JSON[0].message);
			}
			return false;
		}
	});
	return false;
}

function addItemToCart(trackid) {

	jQuery.ajax({
		type: 'post',
		url: '/handler/TAddToCart.ashx',
		data: { trackid: trackid },
		dataType: "json",
		success: function (response) {
			if (response.status == "success") {
				//$(".cartinfo").html("cart (" + result.JSON[0].total + ")");
				$(".cartinfo span").text("Cart (" + response.total + ")");

				openPopupCart(response.message);
				return false;
				
			}
			else {
				openPopupCart(response.message);
			}
			return false;
		}
	});
	return false;
}
function openPopupCart(_message) {
	var bodyhtml = "<div style='padding:10px;text-align:center'><h2><strong>" + _message + "</strong></h2>";
	bodyhtml += "<a rel='external' href='/cart/'>Checkout Now!</a> | ";
	bodyhtml += "<a href='javascript:void(0)' onclick='closePopupCart();return false;'>Keep Shopping</a>";
	bodyhtml += "</div>";
	instapopup(bodyhtml);
	return false;
}
function closePopupCart() {
	$("#divCartPopup").remove();
}
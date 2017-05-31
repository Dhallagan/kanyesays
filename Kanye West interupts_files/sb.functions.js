$(document).ready(function() {
	var	my_jPlayer = $("#jquery_jplayer");
	var	opt_play_first = false, opt_auto_play = true;
	var first_track = true;
	var current_index = 0;
	var playAll = false;

	// Instance jPlayer
	my_jPlayer.jPlayer({
		ready: function () {
			$("#jp_container_1 .track-default").click();
		},
		swfPath: "//cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.swf",
		cssSelectorAncestor: "#jp_container_1",
		supplied: "mp3",
		wmode: "window",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
	});

	// Create click handlers for the different tracks
	$("#jp_container_1 .track").click(function(e) {
		var ispaused = my_jPlayer.data("jPlayer").status.paused;
		//var trackid = $(this).parent("trackli").data("track-id");
		var index = parseInt($(this).attr("index"));
		if (index < 0) return;
		
		if (first_track){
			select_track(0);
		}
		
		
		if((opt_play_first && first_track) || (opt_auto_play && !first_track)) {
			if (current_index !== index) {
				select_track(index);
				my_jPlayer.jPlayer("play");
			} else {
				if (ispaused){
					my_jPlayer.jPlayer("play");
				} else {
					my_jPlayer.jPlayer("pause");
				}
			}
		}
		
		first_track = false;
		$(this).blur();
		return false;
	});
	$("#detachedTrackList .modaltrack").click(function(e) {
		var ispaused = my_jPlayer.data("jPlayer").status.paused;
		var index = parseInt($(this).attr("index"));
		if (index < 0) return;
		
		if (current_index !== index) {
			select_track(index);
			my_jPlayer.jPlayer("play");
		} else {
			if (ispaused){
				my_jPlayer.jPlayer("play");
			} else {
				my_jPlayer.jPlayer("pause");
			}
		}
		
		$(this).blur();
		return false;
	});

	$('#btnDownload').click(function (event) {
		event.stopPropagation();
		event.preventDefault();
		//alert(obj == null);
		//obj.buildDownloadLink();
		AuthClass.allowDownload_Or_OpenLogin();
		return false;
	});
	$('#btnTextaSound').click(function (event) {
		event.stopPropagation();
		event.preventDefault();
		//alert(obj == null);
		//obj.buildDownloadLink();
		AuthClass.allowTextaSound_Or_OpenLogin();
		return false;
	});
	$('#playlist').undelegate('taphold').delegate('li', 'taphold', function () {
		//event.stopPropagation();
		//event.preventDefault();
		//return false;
	});

	$("#jquery_jplayer").bind($.jPlayer.event.play, function() {
		my_jPlayer.jPlayer("pauseOthers");
		$('.playicon').find(".glyphicon-pause").removeClass('glyphicon-pause').addClass('glyphicon-play');
		$(".playpause_" + current_index + " span i.glyphicon-play").removeClass('glyphicon-play').addClass('glyphicon-pause');
	});

	$("#jquery_jplayer").bind($.jPlayer.event.pause, function() {
		$(".playpause_" + current_index + " span i.glyphicon-pause").removeClass('glyphicon-pause').addClass('glyphicon-play');
	});

	function select_track(index){
		my_jPlayer.jPlayer("setMedia", {
			mp3: "/handler/playTrack.ashx?id=" + $("#track_" + index).data("track-id")
		});
		
		current_index = index;
	}
});

var obj = new LoginClass();
function openShareInPopup(p_trackid, p_mp3, p_tracktitle, p_downloadurl) {
    p_tracktitle = p_tracktitle.replace("__", "'");
    $('#txtShareTrackId').val(p_trackid);
    $('#txtShareTrackTile').html(p_tracktitle);
    $('#aShareFB').attr('href', facebookUrl(p_trackid, p_mp3, p_tracktitle));
    //$('#aShareTW').attr('href', "https://twitter.com/share?url=" + encodeURIComponent(String(location.href.split("?")[0]) + '?trackid=' + p_trackid) + '&text=Check out ' + encodeURIComponent(p_tracktitle));
    $('#aShareTW').attr('href', "https://twitter.com/share?url=" + encodeURIComponent(p_downloadurl) + "&text=" + encodeURIComponent( "Check out " + p_tracktitle) );

    //alert($('#aShareTW').attr('href'));
    //$(document).delegate('#aShareTW', 'click', function (event) {
    //    var qry = encodeURIComponent(String(location.href.split("?")[0]) + '?trackid=' + p_trackid) + '&text=Check out ' + encodeURIComponent(p_tracktitle);
    //    window.location = "https://twitter.com/share?url=" + qry;
    //});
    $.mobile.changePage('#popup_share', { type: 'post', allowSamePageTransition: true, changeHash: true });
    return false;
}
function openWindow(windowname) {
    switch (windowname) {
        case "boardshare":
            $("#popup_boardshare").show();
            obj.cheakAuth2('openBoardShare(0,"")');
            // hide others.
            break;
    }
}
function resetWindow() {
    $("#pShareBoardShare").hide();
    $("#divShareLogin").hide('slow');
    $("#divShareBoardShare").hide('slow');
    $("#popup_boardshare").hide();
}
function BoardShare_Submit()
{
    
    var p_trackid = $("#cboTracks").val();
    var p_boardid = $("#cboMyBoardShare").val();
    var p_tracktitle = $("#cboTracks option:selected").text();

    if (p_trackid == "") {
        $("#lblAddToBoard").html("Please select a track");
        return;
    }

    if (p_boardid == "") {
        $("#lblAddToBoard").html("Please select your board to add the selected track");
        return;
    }

    $('#txtShareTrackId').val(p_trackid);
    
}
function openBoardShareInPopup(p_trackid, p_mp3, p_tracktitle) {
    $('#txtShareTrackId').val(p_trackid);
    $('#txtBSTrackTile').html(p_tracktitle);
    
    
    $.mobile.changePage('#popup_boardshare', { type: 'post', allowSamePageTransition: true, changeHash: true });
    return false;
}

function facebookUrl(p_trackid, p_mp3, p_trackcaption) {
    var url = "http://www.facebook.com/dialog/feed?";
    url += "app_id=" + ApplicationID;
    //url += "&link=" + SB.boardUrl + "?trackid=" + p_trackid;
    url += "&link=" + p_mp3;
    url += "&picture=http://www.soundboard.com/images5/sb-left.png";
    url += "&name=" + SB.boardName;
    url += "&caption=" + p_trackcaption;
    url += "&description=";
    url += "&source=" + p_mp3;
    url += "&redirect_uri=" + SB.boardUrl;
    return url;
}
function FaceBook_OnClick(p_trackid, p_mp3, p_trackcaption) {
    if (FB == null) return false;
    var linkToFB = String(location.href.split("?")[0]);
    linkToFB += '?trackid=' + p_trackid;
    //alert(p_trackcaption);
    //return;

    FB.login(function (response) {
        if (response.authResponse) {
            //            FB.api('/me/permissions', function (response) {
            //                console.log(response);
            //            });
            FB.ui({
                method: 'feed',
                type: 'mp3',
                title: p_trackcaption,
                artist: SB.boardName,
                album : '',
                display: 'page',
                picture: 'http://www.soundboard.com/images5/sb-left.png',
                source: p_mp3,
                name: SB.boardName + ' : '+ p_trackcaption,
                description:'' /*(SB.boardDescription)*/
            },
            function (response) {
                if (response && response.post_id) {
                    instapopup('Your share was published.');
                } else {
                    instapopup('Your share was not published.');
                }
            });

            return;

            //            FB.ui(
            //                {
            //                    method: 'feed',
            //                    //display: 'popup',
            //                    message: 'Post sound track from soundboard.com',
            //                    name: 'Share this sound to facebook',
            //                    caption: 'soundboard.com - Send sound from ' + p_trackcaption,
            //                    description: SB.boardDescription,
            //                    link: linkToFB,
            //                    picture: SB.photo,
            //                    actions: [{ name: SB.boardName, link: String(window.location.href)}],
            //                    user_message_prompt: 'Share your sound '
            //                },
            //                function (response) {
            //                    if (response && response.post_id) {
            //                        instapopup('Post was published.');
            //                    } else {
            //                        instapopup('Post was not published.');
            //                    }
            //                }
            //            );
        } else {
            instapopup('User cancelled login or did not fully authorize.');
        }
    }, { scope: 'user_likes,share_item,read_stream,publish_stream' });

    
    //return false;
}

var lineItemCount = 0;
function BoardShare_OnClick(p_trackid){

    var p_tracktitle = $('#li_' + p_trackid).find('a.tracktitle').text();

    obj.cheakAuth('openBoardShare('+p_trackid + ',"' + p_tracktitle +'")');
    //openBoardShare(p_trackid, p_tracktitle);
}

function openBoardShare(p_trackid, p_tracktitle) {
    // obj.populateMyBoards();
    $("#pShareBoardShare").hide();
    $("#divShareLogin").hide('slow');
    $("#divShareBoardShare").show('slow');

    
    if ($("#cboMyBoardShare option").length > 0) {
        openBoardShare_done(p_trackid, p_tracktitle);
        $('#cboMyBoardShare').val("0");
    }
    else
    {
        $('#cboMyBoardShare').empty();
        $('#cboMyBoardShare').append('<option value="0">Please select your board</option>');
        $.getJSON('/handler/GetBoardJson.ashx', function (data) {
            $.each(data.JSON, function (key, value) {
                var opt = '<option value=' + value.boardid + '>' + value.boardname + '</option>';
                $('#cboMyBoardShare').append(opt);
            });
            //openBoardShare_done();
        }).done(function () {
            $('#cboMyBoardShare').val("0");
            openBoardShare_done(p_trackid, p_tracktitle);
        });
    }    
}
function openBoardShare_done(p_trackid, p_tracktitle) {
    $('#txtTrackId').val(p_trackid);
    $('#txtTrackTile').val(p_tracktitle);
    $("#lblAddToBoard").html('');
    $('#aBoardShareSubmit').click(function (event){
    //$(document).undelegate('click').delegate('#aBoardShareSubmit', 'click', function (event) {

        var p_trackid = $("#cboTracks").val();
        if (p_trackid == "0" || p_trackid == "") {
            $("#lblAddToBoard").html("Please select track");
            return false;
        }

        if ($("#cboMyBoardShare").val() == "") {
            $("#lblAddToBoard").html("Please select your board to add the selected track");
            return false;
        }
        //var _trackid = $("#txtShareTrackId").val();
        var _boardid = $("#cboMyBoardShare option:selected").val();
        obj.addTrackToBoard(_boardid, p_trackid);

        //$.mobile.changePage('#commonpage', { type: 'post', allowSamePageTransition: true, changeHash: true });
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    //$.mobile.changePage('#popup_track', { type: 'post', allowSamePageTransition: true, changeHash: true });
}
function addToBoard(event) {
    // validation.......
    if ($("#cboMyBoardShare").val() == "") {
        $("#lblAddToBoard").html("Please select your board to add the selected track");
        return;
    }
    var _trackid = $("#txtShareTrackId").val();
    var _boardid = $("#cboMyBoardShare option:selected").val();
    //alert(_boardid);
    //return;

    obj.cheakAuth('obj.addTrackToBoard(' + _boardid + ',' + _trackid + ')');
    
    event.stopPropagation();
    event.preventDefault();
    return false;
}


function ShowLogin(_callbackFunc) {
    
    $('#popup_login input').on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == 13) {
            e.preventDefault();
            e.stopPropagation();
            $("#btnPopupLogin").click();
        }
    });

    //showmsg("Login to soundboard", $('#popup_login').html(), false);
    //$('#popuploginbox').simpledialog2();
    $.mobile.changePage('#popup_login', { type: 'post', allowSamePageTransition: true, changeHash: true });

    return false;
}
function ShowLogin2(_callbackFunc) {

    $('#popup_login input').on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 13) {
            e.preventDefault();
            e.stopPropagation();
            $("#btnPopupLogin").click();
        }
    });
    //showmsg("Login to soundboard", $('#popup_login').html(), false);
    //$.mobile.changePage('#popup_login', { type: 'post', allowSamePageTransition: true, changeHash: true });
    $("#pShareBoardShare").show();
    $("#divShareBoardShare").hide();
    $("#divShareLogin").show();
    return false;
}
function doLogin(p_CallBackFunc) {
    var $div = $('#popupmsg');

    if ($('#txtPop_Username').val() == "") {
        $div.text("Enter UserName");
        setTimeout(function () { $div.text(''); }, 5000);
        //alert("Enter UserName");
        return;
    }
    else if ($('#txtPop_Password').val() == "") {
        $div.text("Enter Password");
        setTimeout(function () { $div.text(''); }, 5000);
        //alert("Enter Password");
        return;
    }


    $.ajax({
        type: 'post',
        url: '/handler/LoginHandler.ashx',
        data: { Auth: "yes", UName: $('#txtPop_Username').val(), Passwd: $('#txtPop_Password').val() },
        success: function (data) {
            var result = data.split("|");

            if (result[0] == "true") {
                if (result[1] != "loggedin") {
                    __LOGGED_USERID = result[2];
                    $div.html("Login Successful");

                    openBoardShare(0, "");
                    return true;

                    if (p_CallBackFunc != null) {
                        p_CallBackFunc = p_CallBackFunc.replace("MEMBERID", result[2]);
                        eval(p_CallBackFunc);
                    }
                    if (obj.callbackFuncSuccess != null) {
                        eval(obj.callbackFuncSuccess);
                    }
                    else {
                        $.mobile.changePage($('#commonpage'), 'pop', false, true);
                    }

                    $('a.aLoginOrAccount').text("account");
                    $('a.aLoginOrAccount').attr("href", "/account/");
                    $('a.aBuildOrLogoff').text("logout");
                    $('a.aBuildOrLogoff').attr("href", "/logoff.aspx");

                    //$('.notloginbox').css("display", "none");
                    var logintxt = $('.loginbox').html();

                    $('.loginbox_fullname').html("" + result[1]);
                    //$('#btnLogin').attr("disabled","disabled");  
                    return true;
                }
            }
            else {
                $div.html(result[0]);
                setTimeout(function () { $div.html(''); }, 2000);

                return false;
            }
        }
    });
}
/* *********************** LoginClass ********************* */
$.extend(
{
    context: function (context) {
        var co =
    {
        callback: function (method) {
            if (typeof method == 'string') method = context[method];
            var cb = function () { method.apply(context, arguments); }
            return cb;
        }
    };
        return co;
    }
});
function LoginClass() {
    this.logged = false;
    this.callbackFuncSuccess = '';
    this.loginBoxInvokeRequired = true;
    this.cheakAuth = function (_callbackFunc) {
        this.callbackFuncSuccess = _callbackFunc;

        $.ajax({
            type: 'post',
            url: '/handler/LoginHandler.ashx',
            data: { Auth: "check" },
            success: $.context(this).callback('cheakAuth_callback')
        });
    }
    this.cheakAuth_callback = function (data) {

        if (data == "0") {
            this.logged = false;
            if (this.loginBoxInvokeRequired == true) {
                ShowLogin(this.callbackFuncSuccess);
            }
        }
        else {
            this.logged = true;
            eval(this.callbackFuncSuccess);
        }
    }

    this.cheakAuth2 = function (_callbackFunc) {
        this.callbackFuncSuccess = _callbackFunc;
        //alert(_callbackFunc);
        $.ajax({
            type: 'post',
            url: '/handler/LoginHandler.ashx',
            data: { Auth: "check" },
            success: $.context(this).callback('cheakAuth_callback2')
        });
    }
    this.cheakAuth_callback2 = function (data) {

        if (data == "0") {
            this.logged = false;
            ShowLogin2(this.callbackFuncSuccess);

        }
        else {
            this.showShareBox();
            eval(this.callbackFuncSuccess);
        }
    }
    this.showShareBox = function () {
        this.logged = true;
        $("#divShareBoardShare").show();
        $("#divShareLogin").hide();
    }
    this.checkAuthOnly = function (_callbackFunc) {
        this.callbackFuncSuccess = _callbackFunc;

        $.ajax({
            type: 'post', url: '/LoginHandler.ashx', data: { Auth: "check" },
            success: $.context(this).callback('checkAuthOnly_callback')
        });
    }
    this.checkAuthOnly_callback = function (data) {
        eval(this.callbackFuncSuccess);
    }

    this.addToFriend = function (username) {
        $.ajax({
            type: "GET", url: "../account/addfavs.aspx",
            data: { rnd: getrandomnumber(), cnt: username },
            success: function (msg) {
                showmsg("SoundBoard Alert!", msg);
            }
        });
    }


    this.addTrackToBoard = function (_boardid, _songid) {
        if (_SubscribedToSeeDownload == false) {
            $("#lblAddToBoard").html("Please unlock this board to subscribe and download everything");
            return false;
        }

        $.ajax({
            type: 'POST',
            url: "/handler/boardshare.ashx",
            data: { songid: _songid, boardid: _boardid },
            success: function (result) {
                $("#lblAddToBoard").html(result); //.delay(3000).fadeOut(400);
                alert(result);
                //$.mobile.changePage('#commonpage', { type: 'post', allowSamePageTransition: true, changeHash: true });
            }
        });
    }


    this.buildDownloadLink = function () {
        var p_trackid = $("#cboTracksForDownload").val();

        if (p_trackid == "") {
            $("#lblDownloadMessage").html("Please select a track and click download");
            //showmsg("SoundBoard Alert!", "Please select a track and click download");
            return false;
        }

        if (_SubscribedToSeeDownload == false) {
            $("#lblDownloadMessage").html("Please unlock this board to subscribe and download everything");
            //showmsg("SoundBoard Alert!", "Please unlock this board to subscribe and download everything");
            return false;
        }

        for (var i = 0; i < SB.internalData.length; i++) {
            if (SB.internalData[i].id == p_trackid) {
                //var downLoadUri = "/handler/DownLoadTrack.ashx?cliptitle=" + encodeURIComponent(TRACKJSON.JSON[i].cliptitle) + "&filename=" + TRACKJSON.JSON[i].mediafile;
                //$("#aDownload").attr("href", downLoadUri);
                var downloadUri = SB.internalData[i]["downloadurl"];
                window.location.href = downloadUri;
                return true;
            }
        }
        return false;
    }

}
/* ************************************************************ */
function addtofriend(username) {
    obj.cheakAuth('obj.addToFriend("' + username + '")');
}

var AuthClass = {
    loginForTextaSound: false,
    workInProgress: false,
    isLoggedIn: function () {
        return __LOGGED_USERID > 0 ? true : false;
    },

    /*********** Open Login Popup method ********/

    openLogin: function () {
		var form = $( "#form1" );
		form.validate();
		
        $('#mfppopup_login_button').unbind().bind('click', function (e) {
			if (form.valid()){
				AuthClass.doLogin(null);
				e.preventDefault();
			}
        });
        $('#mfppopup_register_button').unbind().bind('click', function (e) {
			if (form.valid()){
				AuthClass.doReg(null);
				e.preventDefault();
			}

        });
        //$.magnificPopup.open({ items: { src: $('#mfppopup_login'), type: 'inline'} });
        $('#mfppopup_login').modal('show');
    },

    /*********** End of Function ********/
    /*********** Open Text a sound Popup method ********/

    openTextaSound: function () {
        $('#mfppopup_send_button').unbind().bind('click', function (e) {
            AuthClass.doTextaSound(null);
            e.preventDefault();
        });
        //        __MediaFileUrl=SB.getMediaUrlByTrackId( $('#cboTracksForTextaSound').val());
        $('#mfppopup_textasound_from').val(__LOGGED_USER_PHONENUMBER);
        $('#mfppopup_textasound_name').val(__LOGGED_USER_FullName);
        $('#mfppopup_textasound_body').val(__LOGGED_USER_FullName + " has sent you a sound via Soundboard.com, enjoy: http://www.soundboard.com/t/" + $('#cboTracksForTextaSound').val());
        //$.magnificPopup.open({ items: { src: $('#mfppopup_textasound'), type: 'inline'} });     
        $("#mfppopup_textasound").modal('show');
    },

    /*********** End of Function ********/
    /*********** check user login or not for download track ********/

    allowDownload_Or_OpenLogin: function () {
        if (AuthClass.isLoggedIn() == false) {
            AuthClass.openLogin();
        }
        else {
            AuthClass.buildDownloadLink();
        }
    },

    /*********** End of Function ********/
    /*********** check user login or not for sending text a sound ********/

    allowTextaSound_Or_OpenLogin: function () {
        $("#mfppopup_textasound_message").html("");
        $("#lblTextaSoundMessage").html("");
        var p_trackid = $("#cboTracksForTextaSound").val();

        if (p_trackid == "") {
            $("#lblTextaSoundMessage").html("Please select a track and click text a message");
            //showmsg("SoundBoard Alert!", "Please select a track and click download");
            return false;
        }
        if (AuthClass.isLoggedIn() == false) {
            AuthClass.loginForTextaSound = true;
            AuthClass.openLogin();
        }
        else {
            AuthClass.openTextaSound();
        }
    },

    /*********** End of Function ********/
    /*********** method for login ********/

    doLogin: function (p_CallBackFunc) {
        if (AuthClass.workInProgress == true) return;
        var $div = $('#mfppopup_login_message');

        if ($('#mfppopup_login_username').val() == "") {
            $div.text("Enter UserName");
            setTimeout(function () { $div.text(''); }, 5000);
            return;
        }
        else if ($('#mfppopup_login_password').val() == "") {
            $div.text("Enter Password");
            setTimeout(function () { $div.text(''); }, 5000);
            return;
        }
        $div.html("Processing Login, please wait ...");
        AuthClass.workInProgress = true;
        $.ajax({
            type: 'post',
            url: '/handler/LoginHandler.ashx',
            data: { Auth: "yes", UName: $('#mfppopup_login_username').val(), Passwd: $('#mfppopup_login_password').val() },
            success: function (data) {
                var result = data.split("|");
                if (result[0] == "true") {
                    if (result[1] != "loggedin") {
                        $div.html("Login Successful");
                        __LOGGED_USERID = result[2];
                        __LOGGED_USER_PHONENUMBER = result[3];
                        __LOGGED_USER_FullName = result[1];
                        openBoardShare(0, "");
                        if (p_CallBackFunc != null) eval(p_CallBackFunc);
                        $.magnificPopup.close();
                        if (AuthClass.loginForTextaSound == true) {
                            AuthClass.openTextaSound();
                            AuthClass.loginForTextaSound = false;
                        }
                        // instapopup("You have logged in successfully");

                    }
                }
                else {
                    $div.html(result[0]);
                    setTimeout(function () { $div.html(''); }, 2000);
                }
                AuthClass.workInProgress = false;
            }
        });
    },

    /*********** End of Function ********/
    /*********** method for registration ********/

    doReg: function (p_CallBackFunc) {
        if (AuthClass.workInProgress == true) return;
        var $div = $('#mfppopup_login_message');

        $div.html("Processing registration, please wait ...");
        AuthClass.workInProgress = true;

        window.setTimeout(function () {
            $.ajax({
                url: "/handler/LoginHandler.ashx",
                type: "POST", asyn: true, dataType: "json",
                data: { Auth: "reg", fullname: $('#mfppopup_reg_fullname').val(), uname: $('#mfppopup_reg_username').val(), passwd: $('#mfppopup_reg_password').val() },
                success: function (response, textStatus) {
                    if (response.Status == 1) {
                        __LOGGED_USERID = response.Context.userId;
                        openBoardShare(0, "");
                        if (p_CallBackFunc != null) eval(p_CallBackFunc);
                        $.magnificPopup.close();
                    }
                    else {

                    }
                    $div.html(response.Message);
                    instapopup(response.Message);
                    AuthClass.workInProgress = false;
                },
                error: function (response) {
                    instapopup(response.responseText);
                }
            }).done(function (msg) { });
        }, 500);
    },

    /*********** End of Function ********/
    /*********** method for sending message ********/

    doTextaSound: function (p_CallBackFunc) {
        if (AuthClass.workInProgress == true) return;
        var $div = $('#mfppopup_textasound_message');
        $div.html("");
        /*if ($('#mfppopup_textasound_from').val() == "") {
        $div.text("Enter From number");
        setTimeout(function () { $div.text(''); }, 5000);
        return;
        }*/
        if ($('#mfppopup_textasound_to').val() == "") {
            $div.text("Enter recipent's mobile number");
            setTimeout(function () { $div.text(''); }, 5000);
            return;
        }
        $div.html("Trying to send a message, please wait ...");
        AuthClass.workInProgress = true;
        var ticket = {
            From: "",
            To: $('#mfppopup_textasound_to').val(),
            Body: encodeURIComponent($('#mfppopup_textasound_body').val()),
            LoggedUserid: __LOGGED_USERID
        };

        $.post("/handler/TextaSoundHandler.ashx", ticket,
            function (msg, textStatus) {
                if (msg.Status == 1) {
                    ticket = msg.Context;
                    $div.html(msg.Message);
                    instapopup(msg.Message);
                    __LOGGED_USER_PHONENUMBER = $('#mfppopup_textasound_from').val();
                    $('#mfppopup_textasound_from').val("");
                    $('#mfppopup_textasound_to').val("");
                    $('#mfppopup_textasound_body').val("");

                    if (p_CallBackFunc != null) eval(p_CallBackFunc);
                    $("#mfppopup_textasound").modal('hide');

                }
                else {
                    $div.html(msg.Message);
                    instapopup(msg.Message);

                }
                AuthClass.workInProgress = false;
                //alert(msg.Message);

            },
        "json")
        .error(function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
            console.log("The following error occured: " + textStatus, errorThrown);
        });

    },

    /*********** End of Function ********/
    /*********** method for download track ********/

    buildDownloadLink: function () {
        var p_trackid = $("#cboTracksForDownload").val();

        if (p_trackid == "") {
            $("#lblDownloadMessage").html("Please select a track and click download");
            //showmsg("SoundBoard Alert!", "Please select a track and click download");
            return false;
        }

        if (_SubscribedToSeeDownload == false) {
            $("#lblDownloadMessage").html("Please unlock this board to subscribe and download everything");
            //showmsg("SoundBoard Alert!", "Please unlock this board to subscribe and download everything");
            return false;
        }

        for (var i = 0; i < SB.internalData.length; i++) {
            if (SB.internalData[i].id == p_trackid) {
                //var downLoadUri = "/handler/DownLoadTrack.ashx?cliptitle=" + encodeURIComponent(TRACKJSON.JSON[i].cliptitle) + "&filename=" + TRACKJSON.JSON[i].mediafile;
                //$("#aDownload").attr("href", downLoadUri);
                var downloadUri = SB.internalData[i]["downloadurl"];
                window.location.href = downloadUri;
                return true;
            }
        }
        return false;
    }

    /*********** End of Function ********/
};
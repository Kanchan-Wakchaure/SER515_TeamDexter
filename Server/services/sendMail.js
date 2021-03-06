var nodemailer = require('nodemailer');
var mailer = require('../services/mailer');
const User = require('../models/User');
const MovieList = require('../models/MovieList');
const keys = require("../config/keys");

module.exports.sendEmail = function (req, res) {
    var emailList = [];
    var sources = [];
    fetchID().then(function (IdList) {
        for (var i = 0; i < IdList.length; i++) {
            fetchPreferences(IdList[i]).then(function (users) {
                var email = users.email;
                var firstName = users.firstname;

                var myGenreList = [];
                var myActorList = [];

                for (var j = 0; j < users.genreList.length; j++) {
                    myGenreList.push(users.genreList[j].item_text);
                }
                for (var k = 0; k < users.actorsList.length; k++) {
                    myActorList.push(users.actorsList[k].item_text);
                }

                emailList.push(email);
                fetchMovies(myGenreList, myActorList).then(function (myMovies) {
                    for (var l = 0; l < myMovies.length; l++) {
                        var srcx = myMovies[l].poster_path;
                        sources.push(srcx);
                    }
                    var mailOptions = {
                        from: 'findmyshow1@gmail.com',
                        to: email,
                        subject: 'Find My Show - Notifications',
                        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"> 
                        <head> <meta charset="UTF-8"> <meta content="width=device-width, initial-scale=1" name="viewport"> <meta name="x-apple-disable-message-reformatting"> 
                        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta content="telephone=no" name="format-detection"> <title>New email</title> <!--[if (mso 16)]>
                        <style type="text/css"> a {text-decoration: none;} </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
                        <style type="text/css">@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } h1 a {
                        font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:13px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-button { font-size:16px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important }
                        table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }#outlook a {	padding:0;}.ExternalClass {	width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {	line-height:100%;}.es-button {	mso-style-priority:100!important;	text-decoration:none!important;}a[x-apple-data-detectors] {	color:inherit!important;	text-decoration:none!important;	font-size:inherit!important;	font-family:inherit!important;	font-weight:inherit!important;	line-height:inherit!important;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;	mso-hide:all;}</style> </head> <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"> <div class="es-wrapper-color" style="background-color:#F6F6F6;"> <!--[if gte mso 9]><v:background
                        xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background><![endif]--> 
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;"> 
                        <tr style="border-collapse:collapse;"> <td valign="top" style="padding:0;Margin:0;"> <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> 
                        <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"> <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;"> 
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tr style="border-collapse:collapse;"> 
                        <td width="600" valign="top" align="center" style="padding:0;Margin:0;"> <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;border-left:2px solid #959595;border-right:2px solid #959595;border-top:2px solid #959595;border-bottom:2px solid #959595;" width="100%" cellspacing="0" cellpadding="0"> 
                        <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"> <img class="adapt-img" src="https://hisgn.stripocdn.email/content/guids/CABINET_2b6a19284478381997d156b31ea0915a/images/23241540459763459.png" alt=""
                        style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" width="596"></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> 
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> 
                        <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"> <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> 
                        <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;"> <table width="100%" cellspacing="0" cellpadding="0"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tr style="border-collapse:collapse;"> 
                        <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                        <tr style="border-collapse:collapse;"> <td align="left" style="padding:0;Margin:0;padding-bottom:5px;">
                        <p><strong>Hello ${firstName}!!</strong></p>
                        <p>Here is a list of popular movies for this week. Find showtimes of your favourite movie at 
                        <a href="http://findmyshow.herokuapp.com">FindMyShow</a> and book your tickets now!!</p>
                        <div width=500px height=250px>
                            <ul>
                            <img src=${sources[0]}  width=150 height =250px/>
                            <img src=${sources[1]}  width=150 height =250px/>
                            <img src=${sources[2]}  width=150 height =250px/>
                            <img src=${sources[3]}  width=150 height =250px/>
                            <img src=${sources[4]}  width=150 height =250px/>
                            <img src=${sources[5]}  width=150 height =250px/>
                            </ul>
                        </div>
                        <div>
                        <p>Here is the genres you are subscribed to ${myGenreList} and the actors you are subscribed to are ${myActorList} </p>
                        </div>
                        <p>Thank You</p>
                        <p>Have a great weekend!!</p>
                        <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;"> <tr style="border-collapse:collapse;"> <td width="245" align="left" style="padding:0;Margin:0;"> 
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                        <tr style="border-collapse:collapse;"> <td class="es-m-txt-c" align="right" style="padding:0;Margin:0;padding-top:5px;"> 
                        <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tr style="border-collapse:collapse;"> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"> <img title="Facebook"
                        src="https://hisgn.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"> 
                        <img title="Twitter" src="https://hisgn.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"> 
                        <img title="Instagram" src="https://hisgn.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"> 
                        <img title="Youtube" src="https://hisgn.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!--[if mso]></td></tr></table><![endif]--></td> </tr> </table> </td> </tr> </table> 
                        <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"> 
                        <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#808080;"> 
                        <tr style="border-collapse:collapse;"> <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;"> <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tr style="border-collapse:collapse;"> <td width="560" valign="top" align="center" style="padding:0;Margin:0;"> 
                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> <tr style="border-collapse:collapse;"> <td align="center" style="padding:0;Margin:0;"> 
                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:150%;color:#FFFFFF;">FindMyShow</p><p
                        style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:150%;color:#FFFFFF;">All rights reserved&nbsp;2018</p> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </div> </body></html>`
                    };
                    mailer.sendEmail(mailOptions);
                })
            });
        }
    })
    res.json("Emails Sent Successfully");
}

function fetchID() {
    var listOfIDs = [];
    var query = User.find();
    return query.exec().then(function (users) {
        for (var x = 0; x < users.length; x++) {
            if (users[x].verified == true && users[x].role == 'User') {
                listOfIDs.push(users[x]._id);
            }
        }
        return listOfIDs;
    })
}

function fetchPreferences(myID) {
    var details = new User();
    var query = User.findById(myID);
    return query.exec().then(function (users) {
        details.email = users.email;
        details.genreList = users.genreList;
        details.actorsList = users.actorsList;
        details.firstname = users.firstname;
        details.lastname = users.lastname;
        details.city = users.city;
        details.role = users.role;
        details.verified = users.verified;
        return details;
    })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function fetchMovies(myGenreList, myActorList) {
    var mdetails = [];

    var lowerRangeDate = new Date();
    lowerRangeDate.setDate(lowerRangeDate.getDate() - 30);

    var upperRangeDate = new Date();
    upperRangeDate.setDate(upperRangeDate.getDate() + 10);

    if (myGenreList.length === 0 && myActorList.length === 0) {
        query = MovieList.find({
            release_date: {
                $gt: formatDate(lowerRangeDate),
                $lt: formatDate(upperRangeDate)
            },
            original_language: "en",
        }).sort({
            release_date: -1
        });
    } else {
        var query = MovieList.find({
            release_date: {
                $gt: formatDate(lowerRangeDate),
                $lt: formatDate(upperRangeDate)
            },
            original_language: "en",
            $or: [{
                    genre_list: {
                        $in: myGenreList
                    }
                },
                {
                    'cast.0.name': {
                        $in: myActorList
                    }
                }
            ]
        }).sort({
            release_date: -1
        }).limit(10);
    }
    return query.exec().then(function (movies) {
        for (var i = 0; i < movies.length; i++) {
            var details = {}
            if (movies[i].poster_path != null) {
                details["title"] = movies[i].title;
                details["poster_path"] = keys.imageBaseURL + movies[i].poster_path;
                details["release_date"] = movies[i].release_date;
                mdetails.push(details);
            }
        }
        return mdetails;
    })
}
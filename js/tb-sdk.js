"use strict";
var TB = TB || {};
TB.APIPrefix = document.getElementById("go-api-server") && document.getElementById("go-api-server").value;
var app = angular.module("Testbook", []);
app.service("sharedProperties", function() {
    var t = {};
    this.setValue = function(e, s) {
        return t[e] = s, 1
    }, this.getValue = function(e) {
        return t[e] ? t[e] : ""
    }
}), app.service("TB", ["$http", "$window", function(t, e) {
    this.setCookie = function(t, e, s) {
        var i = new Date;
        i.setTime(i.getTime() + 24 * s * 60 * 60 * 1e3);
        var n = "expires=" + i.toUTCString() + "; path=/";
        document.cookie = t + "=" + e + "; " + n
    }, this.getCookie = function(t) {
        for (var e, s, i = document.cookie.split(";"), n = 0; n < i.length; n++)
            if (e = i[n], s = i[n].split("="), s[0].trim() == t) return s[1] && s[1].trim() || "";
        return ""
    }, this.KEY_TOKEN = "tb_token", this.setToken = function(t, e) {
        this.setCookie(this.KEY_TOKEN, t, e / 86400), this.auth_code = this.getToken()
    }, this.getToken = function() {
        return this.getCookie(this.KEY_TOKEN)
    }, this.auth_code = this.getToken(), this.getQueryVariable = function(t) {
        for (var s = e.location.search.substring(1), i = s.split("&"), n = 0; n < i.length; n++) {
            var o = i[n].split("=");
            if (o[0] == t) return decodeURIComponent(o[1])
        }
        return ""
    };
    var s = "1.1.4",
        i = "web," + s,
        n = "X-Tb-Client";
    this.getAPIHelper = function(e, s, i) {
        var n = this;
        t.get(e).success(function(t, e, o, r) {
            n.handleResponse(!1, t, s, i, e)
        }).error(function(t, e, o, r) {
            n.handleResponse(!0, t, s, i, e)
        })
    }, this.postAPIHelperWithJSONBody = function(e, s, i, n) {
        var o = this;
        t.post(e, s).success(function(t, e, s, r) {
            o.handleResponse(!1, t, i, n, e)
        }).error(function(t, e, s, r) {
            o.handleResponse(!0, t, i, n, e)
        })
    }, this.postAPIHelper = function(e, s, i) {
        var n = this;
        t({
            method: "POST",
            dataType: "JSON",
            url: e
        }).success(function(t, e, o, r) {
            n.handleResponse(!1, t, s, i, e)
        }).error(function(t, e, o, r) {
            n.handleResponse(!0, t, s, i, e)
        })
    }, this.sendAjaxForPostWithMultipart = function(e, s, i, n) {
        var o = this;
        t.post(s, e, {
            withCredentials: !0,
            headers: {
                "Content-Type": void 0
            },
            transformRequest: angular.identity
        }).success(function(t, e, s, r) {
            o.handleResponse(!1, t, i, n, e)
        }).error(function(t, e, s, r) {
            o.handleResponse(!0, t, i, n, e)
        })
    }, this.handleResponse = function(t, e, s, i, n) {
        if (401 == n && ["/login", "/signup"].indexOf(window.location.pathname) == -1) return showAlert("Your session timedout. Please re-login and proceed", "error", "small", 3e3), setTimeout(function() {
            window.location.href = "/logout"
        }, 3e3), !1;
        if (t)
            if (i) i(e);
            else {
                hideLoader();
                var o = "";
                e && e.message ? o = e.message : (o = TB.API_DEFAULT_ERROR_MESSAGE, "undefined" != typeof Bugsnag && Bugsnag.notify("FailureCB", "Network call failed", {
                    breakpoint_values: {
                        url: window.location.href,
                        response: e
                    }
                })), showAlert(o, "error", "small", 3e3)
            } else e && e.success ? s ? s(e) : e.message && "" != e.message && (hideLoader(), showAlert(e.message, "success", 4e3)) : i ? i(e) : (hideLoader(), showAlert(e && e.message || "Unable to complete your request. Please try again.", "error", "small", 3e3))
    }, this.getEncodedURL = function(t, e, s) {
        var o = "",
            r = "";
        r = s ? TB.APIPrefix + e + "?" : e.indexOf("?") != -1 ? TB.APIPrefix + e + "&auth_code=" + this.auth_code : TB.APIPrefix + e + "?auth_code=" + this.auth_code, r += "?" == r[r.length - 1] ? "" : "&", r += n + "=" + i;
        for (var a in t) t.hasOwnProperty(a) && (o = "object" == typeof t[a] ? JSON.stringify(t[a]) : t[a], r += r.indexOf("?") != -1 ? "&" + a + "=" + encodeURIComponent(o) : "?" + a + "=" + encodeURIComponent(o));
        return r
    }, this.register = function(t, e, s) {
        var i = "v1/signon/register",
            n = {
                name: t.name,
                mobile: t.mobile,
                email: t.email,
                refLink: t.refLink,
                password: t.password,
                client: "web"
            },
            o = this,
            r = function(t) {
                o.setToken(t.data.token, t.data.tokenExpiry), e && e(t)
            },
            a = this.getEncodedURL(n, i, !0);
        this.postAPIHelper(a, r, s)
    }, this.login = function(t, e, s) {
        var i = "v1/signon/login",
            n = {
                emailOrUserNameOrMobile: t.emailOrUserNameOrMobile,
                password: t.password,
                client: "web"
            },
            o = this,
            r = function(t) {
                o.setToken(t.data.token, t.data.tokenExpiry), e && e(t)
            },
            a = this.getEncodedURL(n, i, !0);
        this.postAPIHelper(a, r, s)
    }, this.socialConnect = function(t, e, s) {
        var i = "v1/signon/social/connect",
            n = {
                token: t.token,
                network: t.network,
                email: t.email,
                refLink: t.refLink,
                redirect_uri: t.redirectURI,
                code: t.code,
                client: "web"
            },
            o = this,
            r = function(t) {
                o.setToken(t.data.token, t.data.tokenExpiry), e && e(t)
            },
            a = this.getEncodedURL(n, i, !0);
        this.postAPIHelper(a, r, s)
    }, this.forgotPassword = function(t, e) {
        var s = "v1/signon/password/forgot",
            i = {
                email: t.email || "",
                mobile: t.mobile || ""
            },
            n = this.getEncodedURL(i, s, !0);
        this.postAPIHelper(n, e)
    }, this.isOTPValidForForgotPassword = function(t, e) {
        var s = "v1/signon/verify/otp",
            i = {
                mobile: t.mobile,
                otp: t.otp
            },
            n = this.getEncodedURL(i, s, !1);
        this.postAPIHelper(n, e)
    }, this.updatePassword = function(t, e, s) {
        var i = "v1/signon/password/update",
            n = TB.APIPrefix + i + "?auth_code=" + t.token + "&password=" + encodeURIComponent(t.password) + "&otp=" + t.otp + "&mobile=" + t.mobile;
        this.postAPIHelper(n, e, s)
    }, this.saveProfile = function(t, e, s) {
        var i = "v1/students/me/partial",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.changePassword = function(t, e, s) {
        var i = "v1/students/me/password",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.deactivateAccount = function(t, e) {
        var s = "v1/students/me/deactivate",
            i = this.getEncodedURL({}, s, !1);
        this.postAPIHelper(i, t, e)
    }, this.uploadImg = function(t, e, s) {
        var i = "v1/students/me/picture",
            n = this.getEncodedURL({}, i, !1);
        this.sendAjaxForPostWithMultipart(t, n, e, s)
    }, this.updateMobile = function(t, e, s) {
        var i = "v1/students/me/mobile/getotp",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.verifyOtp = function(t, e, s) {
        var i = "v1/students/me/mobile/confirm",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.getPromotions = function(t, e, s) {
        var i = "v1.1/tests/" + t + "/promotions",
            n = this.getEncodedURL({
                test: t
            }, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.getProductDetails = function(t, e, s) {
        var i = "v1.1/courses/" + t + "/products",
            n = this.getEncodedURL({}, i, !0);
        this.getAPIHelper(n, e, s)
    }, this.getReleasePackProductDetails = function(t, e, s) {
        var i = "v1/products",
            n = this.getEncodedURL(t, i, !0);
        this.getAPIHelper(n, e, s)
    }, this.getStudentDetails = function(t, e, s, i, n) {
        var o = "v1.1/courses/" + e + "/students/" + t + "/products",
            r = this.getEncodedURL(s, o, !1);
        this.getAPIHelper(r, i, n)
    }, this.requestMoreTests = function(t, e) {
        var s = "v1/students/request/tests",
            i = this.getEncodedURL({}, s, !1);
        this.getAPIHelper(i, t, e)
    }, this.getExpiredAttemptedTests = function(t, e, s) {
        var i = "v1/tests",
            n = this.getEncodedURL(t, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.applyCoupon = function(t, e, s) {
        var i = "v1.1/coupon/validate",
            n = this.getEncodedURL(t, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.manageTransactions = function(t, e, s) {
        var i = "v1.1/payment/log",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.genOtpForPaytm = function(t, e, s) {
        var i = "v1/students/me/paytm/generateotp",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.verifyOtpForPaytm = function(t, e, s) {
        var i = "v1/students/me/paytm/validateotp",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.getPaymentLogs = function(t, e, s) {
        var i = "v1.1/payment/log",
            n = this.getEncodedURL(t, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.replaceEnglishTestsWithHindi = function(t, e, s) {
        var i = "v1/students/me/products",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.addPacksToMyTestsViaSubscription = function(t, e, s) {
        var i = "v1/students/me/products";
        t.source = "subscription";
        var n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.getReferralsInfo = function(t, e) {
        var s = "v1/students/me/referrals",
            i = this.getEncodedURL({}, s, !1);
        this.getAPIHelper(i, t, e)
    }, this.remindFriend = function(t, e, s) {
        var i = "v1/students/me/referrals/remind",
            n = this.getEncodedURL(t, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.getStudentTransactions = function(t, e) {
        var s = "v1/students/me/transactions",
            i = this.getEncodedURL({}, s, !1);
        this.getAPIHelper(i, t, e)
    }, this.saveStudentCAAppInfo = function(t, e, s) {
        var i = "v1/ca",
            n = this.getEncodedURL({}, i, !1);
        this.postAPIHelperWithJSONBody(n, t, e, s)
    }, this.getCouponDetails = function(t, e, s) {
        var i = "v1/ecards",
            n = this.getEncodedURL(t, i, !0);
        this.getAPIHelper(n, e, s)
    }, this.getAnalysis = function(t, e, s) {
        var i = "v1/tests/" + t + "/analysis",
            n = this.getEncodedURL({}, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.getLeaderboardInfo = function(t, e, s, i) {
        var n = "v1/tests/" + t + "/meritlist",
            o = this.getEncodedURL(e, n, !1);
        this.getAPIHelper(o, s, i)
    }, this.sendFeedback = function(t, e, s, i) {
        var n = "v1/tests/" + e + "/feedback",
            o = this.getEncodedURL({}, n, !1);
        this.postAPIHelperWithJSONBody(o, t, s, i)
    }, this.getInstructions = function(t, e, s) {
        var i = "v1/tests/" + t + "/instructions",
            n = this.getEncodedURL({}, i, !0);
        this.getAPIHelper(n, e, s)
    }, this.getTest = function(t, e, s) {
        var i = "v1/tests/" + t,
            n = this.getEncodedURL({}, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.getTestResponses = function(t, e, s) {
        var i = {
                random: Math.random()
            },
            n = "v1/tests/" + t + "/responses",
            o = this.getEncodedURL(i, n, !1);
        this.getAPIHelper(o, e, s)
    }, this.saveTestResponses = function(t, e, s, i) {
        var n = "v1/tests/" + t,
            o = this.getEncodedURL({}, n, !1);
        this.postAPIHelperWithJSONBody(o, e, s, i)
    }, this.getTestState = function(t, e, s) {
        var i = {
                client: "web",
                random: Math.random()
            },
            n = "v1/tests/" + t + "/state",
            o = this.getEncodedURL(i, n, !1);
        this.getAPIHelper(o, e, s)
    }, this.getAnswers = function(t, e, s) {
        var i = "v1/tests/" + t + "/answers",
            n = this.getEncodedURL({}, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.reportQuestion = function(t, e, s) {
        var i = "v1/questions/report",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.getReportedQuestions = function(t, e, s, i) {
        var n = "v1/students/" + t + "/vault",
            o = this.getEncodedURL(e, n);
        this.getAPIHelper(o, s, i)
    }, this.getQidsOrderArr = function(t, e, s, i) {
        var n = "v1/students/" + t + "/vault/qids",
            o = this.getEncodedURL(e, n);
        this.getAPIHelper(o, s, i)
    }, this.getMe = function(t, e) {
        var s = "v1/students/me",
            i = this.getEncodedURL({}, s, !1);
        this.getAPIHelper(i, t, e)
    }, this.getOffers = function(t, e, s) {
        var i = "v1/offers/products",
            n = this.getEncodedURL(t, i, !0);
        this.getAPIHelper(n, e, s)
    }, this.getPracticeTags = function(t, e, s) {
        var i = "v1/practice/" + t + "/chapters",
            n = this.getEncodedURL({}, i, !0);
        this.getAPIHelper(n, e, s)
    }, this.getPracticeQuestions = function(t, e, s, i, n) {
        var o = "v1/practice/" + t + "/" + e + "/questions",
            r = this.getEncodedURL(s, o, !0);
        this.getAPIHelper(r, i, n)
    }, this.getPracticeResponses = function(t, e, s, i) {
        var n = "v1/practice/" + t + "/" + e + "/responses",
            o = this.getEncodedURL({}, n, !1);
        this.getAPIHelper(o, s, i)
    }, this.getPracticeAnalysis = function(t, e, s) {
        var i = "v1/practice/" + t + "/analysis",
            n = this.getEncodedURL({}, i);
        this.getAPIHelper(n, e, s, !1)
    }, this.submitPracticeResponse = function(t, e, s, i, n, o) {
        var r = "v1/practice/" + e + "/" + s + "/responses",
            a = this.getEncodedURL(t, r, !1);
        this.postAPIHelperWithJSONBody(a, i, n, o)
    }, this.getCourseBookmarks = function(t, e, s, i) {
        var n = "v1/students/" + t + "/vault/chapters",
            o = this.getEncodedURL(e, n, !1);
        this.getAPIHelper(o, s, i)
    }, this.getChapterBookmark = function(t, e, s, i) {
        var n = "v1/students/" + t + "/vault",
            o = this.getEncodedURL(e, n, !1);
        this.getAPIHelper(o, s, i)
    }, this.saveBookmark = function(t, e, s, i, n) {
        s.client = "web";
        var o = "v1/students/" + t + "/vault/multiple",
            r = this.getEncodedURL(s, o, !1);
        this.postAPIHelperWithJSONBody(r, e, i, n)
    }, this.deleteBookmark = function(t, e, s, i) {
        var n = "v1/students/" + t + "/vault/delete",
            o = this.getEncodedURL(e, n, !1);
        this.postAPIHelper(o, s, i)
    }, this.getSitemap = function(t, e, s, i) {
        var n = "v1/practice/" + t + "/" + e + "/qurls",
            o = this.getEncodedURL({}, n, !1);
        this.getAPIHelper(o, s, i)
    }, this.razorPayCaptureCheckout = function(t, e, s) {
        var i = "v1.1/payment/razorpay",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.getBlogPosts = function(t, e, s, i) {
        var n = e ? "featured" : "notifications";
        if (t) {
            var o = "//testbook.com/blog/mobile_blog_api.php?type=2&skip=0&limit=6&examid=" + t + "&post_type=" + n;
            this.getAPIHelper(o, s, i)
        }
    }, this.getMyPortfolioSummary = function(t, e) {
        var s = "v1/students/me/portfolio/summary",
            i = this.getEncodedURL({}, s, !1);
        this.getAPIHelper(i, t, e)
    }, this.sendEmailForVerification = function(t, e, s) {
        var i = "v1/students/me/email/gettoken",
            n = this.getEncodedURL(t, i, !0);
        this.postAPIHelper(n, e, s)
    }, this.enrollInCourse = function(t, e, s) {
        var i = "v1/students/me/enroll",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.setCurrentCourse = function(t, e, s) {
        var i = "v1/students/me/currentcourse",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }, this.getSubsPlan = function(t, e, s) {
        var i = "v1/products",
            n = this.getEncodedURL(t, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.getStuSubsPlan = function(t, e, s) {
        var i = "v1/students/me/subscriptions",
            n = this.getEncodedURL(t, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.getStuProducts = function(t, e, s) {
        var i = "v1/students/me/subscriptions/products",
            n = this.getEncodedURL(t, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.getTags = function(t, e, s) {
        var i = "v1/tags",
            n = this.getEncodedURL(t, i, !1);
        this.getAPIHelper(n, e, s)
    }, this.getStuAcademicData = function(t, e, s) {
        var i = "v1/students/constants",
            n = this.getEncodedURL(t, i, !0);
        this.getAPIHelper(n, e, s)
    }, this.unEnrollFromCourse = function(t, e, s) {
        var i = "v1/students/me/enrollments/deactivate",
            n = this.getEncodedURL(t, i, !1);
        this.postAPIHelper(n, e, s)
    }
}]);
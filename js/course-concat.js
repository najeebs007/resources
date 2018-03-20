"use strict";
(function() {
    var r;
    r = angular.module("ui.bootstrap.showErrors", []), r.directive("showErrors", ["$timeout", "showErrorsConfig", "$interpolate", function(r, t, i) {
        var n, u, e;
        return u = function(r) {
            var i;
            return i = t.trigger, r && null != r.trigger && (i = r.trigger), i
        }, n = function(r) {
            var i;
            return i = t.showSuccess, r && null != r.showSuccess && (i = r.showSuccess), i
        }, e = function(t, e, s, F) {
            var o, h, a, l, c, g, f, D;
            if (o = !1, c = t.$eval(s.showErrors), g = n(c), D = u(c), h = e[0].querySelector(".form-control[name]"), l = angular.element(h), a = i(l.attr("name") || "")(t), !a) throw "show-errors element has no child input elements with a 'name' attribute and a 'form-control' class";
            return l.bind(D, function() {
                return o = !0, f(F[a].$invalid)
            }), t.$watch(function() {
                return F[a] && F[a].$invalid
            }, function(r) {
                if (o) return f(r)
            }), t.$on("show-errors-check-validity", function() {
                return f(F[a].$invalid)
            }), t.$on("show-errors-reset", function() {
                return r(function() {
                    return e.removeClass("has-error"), e.removeClass("has-success"), o = !1
                }, 0, !1)
            }), f = function(r) {
                if (e.toggleClass("has-error", r), g) return e.toggleClass("has-success", !r)
            }
        }, {
            restrict: "A",
            require: "^form",
            compile: function(r, t) {
                if (t.showErrors.indexOf("skipFormGroupCheck") === -1 && !r.hasClass("form-group") && !r.hasClass("input-group")) throw "show-errors element does not have the 'form-group' or 'input-group' class";
                return e
            }
        }
    }]), r.provider("showErrorsConfig", function() {
        var r, t;
        r = !1, t = "blur", this.showSuccess = function(t) {
            return r = t
        }, this.trigger = function(r) {
            return t = r
        }, this.$get = function() {
            return {
                showSuccess: r,
                trigger: t
            }
        }
    })
}).call(this);
var validateForms = angular.module("formValidations", []);
validateForms.service("userDetailValidations", function() {
    this.error = {}, this.propsWithLimitOnLength = {}, this.propsWithLimitOnMinLength = {}, this.isValidEmail = function(r) {
        var t = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return t.test(r)
    }, this.isValidDate = function(r) {
        return "Invalid Date" !== new Date(r) && !isNaN(new Date(r))
    }, this.limitOnMinLength = function(r, t, i) {
        return this.propsWithLimitOnMinLength[t] ? null : this.propsWithLimitOnMinLength[t] = i, !(!r[t] || !r[t].length) && i < r[t].length
    }, this.limitOnLength = function(r, t, i) {
        return this.propsWithLimitOnLength[t] ? null : this.propsWithLimitOnLength[t] = i, !!(r[t] && r[t].length && r[t].length > i) && (r[t] = r[t].slice(0, i), i == r[t].length)
    }, this.acceptOnlyNumber = function(r, t) {
        if (!(r && r[t] && r[t].length > 0)) return !0;
        var i = r[t][r[t].length - 1];
        isNaN(i) && (r[t] = r[t].slice(0, r[t].length - 1))
    }, this.isValid = function(r, t, i) {
        var n = "undefined" != typeof t[i] && "" != t[i] && !r[i].$error.required && !r[i].$error[i];
        return n &= "email" != i || this.isValidEmail(t[i]), n &= "dob" != i || this.isValidDate(t[i]), n &= !this.propsWithLimitOnLength[i] || t[i].length == this.propsWithLimitOnLength[i], n &= !this.propsWithLimitOnMinLength[i] || t[i].length >= this.propsWithLimitOnMinLength[i]
    }, this.setError = function(r, t) {
        this.error[r] = t
    }, this.hasError = function(r) {
        return !!this.error[r]
    }
});
var app = app || {};
app.controller("releasePlanCtrl", ["$scope", "$rootScope", "TB", "subscriptionService", function(t, e, s, a) {
    t.statusClass = "", t.notificationTextArr = a.notificationArr, t.featuresArr = [], e.$on("TOGGLE_RELEASE_PLAN_MODAL", function(e, s) {
        i(s.toOpen, s.toMature), t.extraFeatures = s.data || []
    }), e.$on("TOGGLE_RELEASE_PLAN_MATURITY", function(t, e) {
        o(e.toMature)
    });
    var o = function(e) {
            t.statusClass = e ? "in mature" : "in"
        },
        i = function(e) {
            t.statusClass = e ? "in" : "", e || a.handleMaturityOfModal(!0), a.handleBodyScroll()
        };
    t.hideReleasePlan = function() {
        i(!1)
    }, t.testPackBtnClicked = function(t, e) {
        t = validateArr(t);
        for (var s = [], o = 0; o < t.length; o++) s.push(t[o].pid || "");
        a.testPackBtnClicked(s.join(","), e)
    };
    var r = function(t) {
        return parseInt(t) != t && !isNaN(new Date(t).getTime())
    };
    t.isValidDate = function(t) {
        return r(t)
    }, t.getDateObj = function(t) {
        return new Date(t)
    }, t.sortFunction = function(t, e) {
        for (var s = 0; s < t.length; s++)
            for (var a = t[s].children || [], o = 0; o < a.length; o++) "datetime" == a[o].type.toLowerCase() && (t[s].sortValue = new Date(a[o].title).getTime() || (new Date).getTime());
        return sortFunction(t, "sortValue", "number", "asc")
    }
}]), app.controller("calculateSavingsCtrl", ["$scope", "$rootScope", "TB", "subscriptionService", function(t, e, s, a) {
    t.statusClass = !1, t.isShowCalc = !1, t.subsObj = {}, e.$on("TOGGLE_CALCULATE_SAVINGS_MODAL", function(e, s) {
        t.subsObj = s.subsObj, t.subscriptionTotal = {
            cost: 0,
            baseCost: 0,
            testCount: 0,
            baseTestCount: 0,
            eachTestCost: 0,
            tidsObj: {},
            commonTids: {}
        }, t.calcTotal = {
            cost: 0,
            baseCost: 0,
            testCount: 0,
            baseTestCount: 0,
            eachTestCost: 0,
            tidsObj: {},
            commonTids: {}
        }, t.isCalcBtnDisabled = !0, t.toggleModal(s.toOpen), t.calcData = i(s.data[0] || []), t.chooseCourseUIDS = o(s.data[1] || [])
    }), t.toggleModal = function(e) {
        t.statusClass = e ? t.statusClass ? "in mature" : "in" : "", e || a.handleMaturityOfModal(!0), a.handleBodyScroll()
    }, t.subscribeNowBtnClicked = function() {
        a.purchaseSubscriptionEventFire(t.subsObj)
    };
    var o = function(t) {
        for (var e = [], s = {}, a = 0, o = 0, i = 0; i < t.length; i++) {
            o = 0, a = Math.ceil(t[i].exams.length / 3), s = {}, s.course = t[i].course, s.isChecked = !1, s.examsUI = [];
            for (var r = 0; r < a; r++) s.examsUI.push([t[i].exams[o] && {
                title: t[i].exams[o].title,
                isChecked: !1
            } || {}, t[i].exams[o + 1] && {
                title: t[i].exams[o + 1].title,
                isChecked: !1
            } || {}, t[i].exams[o + 2] && {
                title: t[i].exams[o + 2].title,
                isChecked: !1
            } || {}]), o += 3;
            e.push(s)
        }
        return e
    };
    t.isPreferred = !0;
    var i = function(e) {
            for (var s = [], a = {}, o = 0; o < e.length; o++) a = {}, a.title = e[o].title, a.cost = e[o].cost, a.testCount = e[o].testCount, a.isChecked = e[o].isChecked || !1, a.testArrObj = e[o].testArrObj || [], s.push(a), c(t.subscriptionTotal, a.testArrObj, !0), t.subscriptionTotal.testCount = Object.keys(t.subscriptionTotal.tidsObj).length;
            return t.subscriptionTotal.cost = t.subsObj.hasOwnProperty("newCost") ? t.subsObj.newCost : t.subsObj.cost, t.subscriptionTotal.testCount = t.subscriptionTotal.baseTestCount - n(t.subscriptionTotal.commonTids || {}), t.subscriptionTotal.eachTestCost = Math.round(t.subscriptionTotal.cost / t.subscriptionTotal.testCount) || 0, s
        },
        r = function(t) {
            var e = 0;
            for (var s in t) e += t[s].cost * t[s].count;
            return e
        },
        n = function(t) {
            var e = 0;
            for (var s in t) e += t[s].count;
            return e
        },
        c = function(t, e, s) {
            for (var a = 0; a < e.length; a++) s ? (t.tidsObj.hasOwnProperty(e[a].tid) ? t.commonTids[e[a].tid] ? t.commonTids[e[a].tid].count += 1 : (t.commonTids[e[a].tid] = {}, t.commonTids[e[a].tid].cost = e[a].cost, t.commonTids[e[a].tid].count = 1) : t.tidsObj[e[a].tid] = e[a].cost, t.baseCost += e[a].cost, t.baseTestCount += 1) : t.tidsObj.hasOwnProperty(e[a].tid) && (t.commonTids[e[a].tid] ? t.commonTids[e[a].tid].count > 1 ? t.commonTids[e[a].tid].count -= 1 : delete t.commonTids[e[a].tid] : delete t.tidsObj[e[a].tid], t.baseCost -= e[a].cost, t.baseTestCount -= 1)
        };
    t.calculateTotal = function(e) {
        t.isCalcBtnDisabled = !u(), e.isChecked ? (c(t.calcTotal, e.testArrObj, e.isChecked), t.calcTotal.cost = t.calcTotal.baseCost - r(t.calcTotal.commonTids || {}), t.calcTotal.testCount = t.calcTotal.baseTestCount - n(t.calcTotal.commonTids || {})) : (c(t.calcTotal, e.testArrObj, e.isChecked), t.calcTotal.cost = t.calcTotal.baseCost - r(t.calcTotal.commonTids || {}), t.calcTotal.testCount = t.calcTotal.baseTestCount - n(t.calcTotal.commonTids || {})), t.calcTotal.eachTestCost = Math.round(t.calcTotal.cost / t.calcTotal.testCount) || 0, t.isPreferred = !t.calcTotal.cost || !(t.calcTotal.cost < t.subscriptionTotal.cost)
    };
    var l = function(t, e) {
        for (var s = 0; s < t.length; s++) t[s][0].isChecked = e, t[s][1].isChecked = e, t[s][2].isChecked = e
    };
    t.isCalcBtnDisabled = !0;
    var u = function() {
            for (var e = 0; e < t.calcData.length; e++)
                if (t.calcData[e].isChecked) return !0;
            return !1
        },
        d = function() {
            for (var e = 0; e < t.chooseCourseUIDS.length; e++)
                for (var s = 0; s < t.chooseCourseUIDS[e].examsUI.length; s++)
                    for (var a = 0; a < t.chooseCourseUIDS[e].examsUI[s].length; a++)
                        if (t.chooseCourseUIDS[e].examsUI[s][a].hasOwnProperty("isChecked") && t.chooseCourseUIDS[e].examsUI[s][a].isChecked) return !1;
            return !0
        };
    t.checkSelectedExam = function(e) {
        t.isCalcBtnDisabled = d();
        for (var s = 0; s < e.examsUI.length; s++)
            for (var a = 0; a < e.examsUI[s].length; a++)
                if (e.examsUI[s][a].hasOwnProperty("isChecked") && !e.examsUI[s][a].isChecked) return void(e.isChecked = !1);
        e.isChecked = !0, console.log(e)
    }, t.checkSelectedCourse = function(e) {
        e.isChecked ? l(e.examsUI, !0) : l(e.examsUI, !1), t.isCalcBtnDisabled = d()
    }, t.hideCalcSavings = function() {
        t.toggleModal(!1), a.handleMaturityOfModal(), t.isShowCalc = !1
    }, t.calculateSavingBtnClicked = function() {
        for (var e = 0; e < t.calcData.length; e++) {
            for (var s = 0; s < t.chooseCourseUIDS.length; s++)
                for (var a = 0; a < t.chooseCourseUIDS[s].examsUI.length; a++) t.chooseCourseUIDS[s].examsUI[a][0].title == t.calcData[e].title && (t.calcData[e].isChecked = t.chooseCourseUIDS[s].examsUI[a][0].isChecked), t.chooseCourseUIDS[s].examsUI[a][1].title == t.calcData[e].title && (t.calcData[e].isChecked = t.chooseCourseUIDS[s].examsUI[a][1].isChecked), t.chooseCourseUIDS[s].examsUI[a][2].title == t.calcData[e].title && (t.calcData[e].isChecked = t.chooseCourseUIDS[s].examsUI[a][2].isChecked);
            t.calcData[e].isChecked && t.calculateTotal(t.calcData[e])
        }
        t.isShowCalc = !0, scrollToTop(".modal-hero-content", 400)
    }
}]), app.controller("testPackCtrl", ["$scope", "$rootScope", "TB", "subscriptionService", function(t, e, s, a) {
    t.notificationTextArr = a.notificationArr, t.statusClass = "", t.ReleasePackDetails = [], e.$on("TOGGLE_TEST_PACK_MODAL", function(e, s) {
        i(s.toOpen, s.toMature), t.getReleasePackDetails(s.productIds, s.status || "released")
    }), e.$on("TOGGLE_TEST_PACK_MATURITY", function(t, e) {
        o(e.toMature)
    }), t.getReleasePackDetails = function(e, a) {
        var o = function(t) {
                t = validateArr(t);
                for (var e = 0, s = 0; s < t.length; s++) e += t[s].qCount || 0;
                return e || 0
            },
            i = function(t) {
                return {
                    title: t.title || "",
                    questionsCount: o(t.pattern && t.pattern.sections) || [],
                    releaseDate: new Date(t.availFrom),
                    availTillDate: new Date(t.availTill)
                }
            },
            r = function(t) {
                for (var e = {}, s = t.items || [], a = {
                        packName: t.title,
                        productMap: {}
                    }, o = 0; o < s.length; o++) {
                    var r = s[o].pattern || {};
                    e[r.title] || (e[r.title] = {
                        value: [],
                        patternName: r.title
                    }), e[r.title].value.push(i(s[o]))
                }
                return a.productMap = e, a
            },
            n = function(t) {
                for (var e = {}, s = 0; s < t.length; s++) {
                    t[s].items || [];
                    e[t[s]._id] = r(t[s])
                }
                return e
            },
            c = function(e) {
                t.testDetailsLoading = !1, t.releasePackDetails = n(e.data && e.data.products)
            },
            l = function(e) {
                t.testDetailsLoading = !1, t.releasePackDetails = {}, showAlert(e.message || "Something went wrong, Please try again.", "error", "sm", 5e3)
            };
        t.testDetailsLoading = !0, s.getReleasePackProductDetails({
            pids: e,
            status: a
        }, c, l)
    };
    var o = function(e) {
            t.statusClass = e ? "in mature" : "in"
        },
        i = function(e) {
            t.statusClass = e ? "in" : "", e || a.handleMaturityOfModal(!0), a.handleBodyScroll()
        };
    t.hideTestPack = function() {
        i(!1)
    }
}]), app.controller("renewPlanCtrl", ["$scope", "$rootScope", "TB", "subscriptionService", function(t, e, s, a) {
    t.statusClass = "", t.notificationTextArr = a.notificationArr, e.$on("TOGGLE_RENEW_SUBSCRIPTION_PLAN_MODAL", function(t, e) {
        i(e.toOpen)
    }), e.$on("TOGGLE_RENEW_SUBSCRIPTION_PLAN_MATURITY", function(t, e) {
        o(e.toMature)
    });
    var o = function(e) {
            t.statusClass = e ? "in mature" : "in"
        },
        i = function(e) {
            t.statusClass = e ? "in" : "", e || a.handleMaturityOfModal(!0), a.handleBodyScroll()
        };
    t.showCalculationPlan = function(t) {
        a.calcSavingsBtnClicked(t, t.calcData, t.courseSelectionDS)
    }, t.hideRenewPlanModal = function() {
        i(!1)
    }
}]), app.service("subscriptionService", ["$rootScope", "$timeout", function(t, e) {
    this.callDataLayerFunction = function() {
        e(function() {
            "undefined" != typeof dataLayer ? (dataLayer.push({
                event: "api.cb"
            }), console.log("data-layer called with argument {'event': 'api.cb'}")) : console.log("data-layer does not exist")
        }, 2e3)
    }, this.notificationArr = ["Check the test release and expiry date by clicking on the Test Release Plan link for all exams."], this.modalHeroPathStack = [], this.calcSavingsBtnClicked = function(e, s, a) {
        this.modalHeroPathStack.push("calculator"), t.$broadcast("TOGGLE_CALCULATE_SAVINGS_MODAL", {
            toOpen: !0,
            data: [s, a],
            subsObj: e
        }), this.handleMaturityOfModal(!1)
    }, this.releasePlanBtnClicked = function(e) {
        this.modalHeroPathStack.push("release-plan"), t.$broadcast("TOGGLE_RELEASE_PLAN_MODAL", {
            toOpen: !0,
            data: e
        }), this.handleMaturityOfModal(!1)
    }, this.testPackBtnClicked = function(e, s) {
        this.modalHeroPathStack.push("test-pack"), t.$broadcast("TOGGLE_TEST_PACK_MODAL", {
            toOpen: !0,
            productIds: e,
            status: 0 == s ? "released" : "upcoming"
        }), this.handleMaturityOfModal(!1)
    }, this.renewSubscriptionBtnClicked = function() {
        this.modalHeroPathStack.push("renew-subscription"), t.$broadcast("TOGGLE_RENEW_SUBSCRIPTION_PLAN_MODAL", {
            toOpen: !0
        }), this.handleMaturityOfModal(!1)
    }, this.toggleCalcMaturity = function(e) {
        t.$broadcast("", {
            toOpen: !0,
            toMature: e
        })
    }, this.toggleReleaseMaturity = function(e) {
        t.$broadcast("TOGGLE_RELEASE_PLAN_MATURITY", {
            toMature: e
        })
    }, this.toggleTestPackMaturity = function(e) {
        t.$broadcast("TOGGLE_TEST_PACK_MATURITY", {
            toMature: e
        })
    }, this.toggleRenewSubMaturity = function(e) {
        t.$broadcast("TOGGLE_RENEW_SUBSCRIPTION_PLAN_MATURITY", {
            toMature: e
        })
    }, this.purchaseSubscriptionEventFire = function(e) {
        t.$broadcast("PURCHASE_SUBSCRIPTION_FROM_CALCULATOR", {
            data: e
        })
    }, this.handleMaturityOfModal = function(t) {
        var e = "";
        if (t) this.modalHeroPathStack.pop(), e = this.modalHeroPathStack[this.modalHeroPathStack.length - 1];
        else {
            if (!(this.modalHeroPathStack.length > 1)) return;
            e = this.modalHeroPathStack[this.modalHeroPathStack.length - 2]
        }
        switch (e) {
            case "calculator":
                this.toggleCalcMaturity(!t);
                break;
            case "release-plan":
                this.toggleReleaseMaturity(!t);
                break;
            case "test-pack":
                this.toggleTestPackMaturity(!t);
                break;
            case "renew-subscription":
                this.toggleRenewSubMaturity(!t);
                break;
            case "subscription":
                this.toggleRenewSubMaturity(!t)
        }
    }, this.getCoursesString = function(t) {
        for (var e = "", s = 0; s < t.length; s++) e += t[s].name + " . ";
        return e
    }, this.isShowFromTbLogic = function(t, e, s) {
        for (var a = !1, o = 0; o < t.courses.length; o++)
            if (s[t.courses[o].id] && (this.getValidDays(s[t.courses[o].id].expiry) < 0 || s[t.courses[o].id].validity < t.validity)) {
                a = !0;
                break
            }
        return (t.courses.length > 1 && a || e.isActive) && e.cost > 0
    }, this.getDiscount = function(t, e) {
        return t >= e ? t - e : 0
    }, this.getPurchasedSubsMap = function(t) {
        var e = {};
        t = validateArr(t);
        for (var s = 0; s < t.length; s++) this.subsBundleIdToObjMap[t[s]._id] && (e[t[s]._id] = {
            expiryInDays: this.getValidDays(t[s].expiry),
            expiryInDaysString: "",
            expiryDate: new Date(t[s].expiry),
            purchaseDate: new Date(new Date(t[s].expiry) - this.convertNanosecToMillisec(this.subsBundleIdToObjMap[t[s]._id].validity)),
            courses: t[s].courses
        }, e[t[s]._id].expiryInDaysString = e[t[s]._id].expiryInDays > 1 ? e[t[s]._id].expiryInDays + " Days" : e[t[s]._id].expiryInDays + "Day");
        return e
    };
    var s = function(t) {
            for (var e = 0, s = 0; s < t.length; s++) e += t[s].cost;
            return e
        },
        a = {
            released: "released test packs",
            upcoming: "upcoming test packs",
            expected: "expected test packs"
        },
        o = function(t) {
            for (var e = [], o = {}, i = {}, r = 0; r < t.length; r++)
                if ((t[r].title.toLowerCase() == a.released || t[r].title.toLowerCase() == a.upcoming) && t[r].children)
                    for (var n = 0; n < t[r].children.length; n++)
                        for (var c = 1; c < t[r].children[n].children.length; c++) o = {}, o.title = t[r].children[n].children[c].children[0].title, i.hasOwnProperty(o.title) ? (o.testCount = parseInt(t[r].children[n].children[c].children[1].title) + e[i[o.title]].testCount, o.testArrObj = t[r].children[n].children[c].children[4].meta, o.cost = s(o.testArrObj) + e[i[o.title]].cost, o.testArrObj = o.testArrObj.concat(e[i[o.title]].testArrObj)) : (o.testCount = parseInt(t[r].children[n].children[c].children[1].title), o.testArrObj = t[r].children[n].children[c].children[4].meta, o.cost = s(o.testArrObj), i[o.title] = e.length), e[i[o.title]] = o;
            return e
        },
        i = function(t) {
            for (var e = [], s = {}, o = {}, i = {}, r = 0; r < t.length; r++)
                if ((t[r].title.toLowerCase() == a.released || t[r].title.toLowerCase() == a.upcoming) && t[r].children)
                    for (var n = 0; n < t[r].children.length; n++)
                        if (s = {}, s.course = t[r].children[n].meta.course, i.hasOwnProperty(s.course)) {
                            s.exams = e[i[s.course].pos].exams;
                            for (var c = 1; c < t[r].children[n].children.length; c++) o = {}, o.title = t[r].children[n].children[c].children[0].title, i[s.course].hasOwnProperty(o.title) || (i[s.course][o.title] = s.exams.length, s.exams[i[s.course][o.title]] = o);
                            e[i[s.course].pos] = s
                        } else {
                            i[s.course] = {
                                pos: e.length
                            }, s.exams = [];
                            for (var c = 1; c < t[r].children[n].children.length; c++) o = {}, o.title = t[r].children[n].children[c].children[0].title, i[s.course].hasOwnProperty(o.title) || (i[s.course][o.title] = s.exams.length, s.exams[i[s.course][o.title]] = o);
                            e.push(s)
                        }
            return e
        },
        r = function(t, e) {
            for (var s = 0, a = 0; a < e.length; a++) t.hasOwnProperty(e[a]) && s++;
            return s
        },
        n = function(t) {
            for (var e = [], s = {}, o = 0; o < t.length; o++)
                if ((t[o].title.toLowerCase() == a.released || t[o].title.toLowerCase() == a.upcoming) && t[o].children)
                    for (var i = 0; i < t[o].children.length; i++)
                        for (var r = 1; r < t[o].children[i].children.length; r++) {
                            e = t[o].children[i].children[r].children[4].meta;
                            for (var n = 0; n < e.length; n++) s[e[n].tid] = 1
                        }
                return s
        },
        c = function(t, e) {
            for (var s = 0, a = 0; a < t.courses.length; a++)
                if (e.hasOwnProperty(t.courses[a].id) && (s = new Date(e[t.courses[a].id].expiry).getTime(), s - (new Date).getTime() > 0)) return !0;
            return !1
        };
    this.processSubscriptionObject = function(t, e, s, a) {
        a = a ? a : [];
        var u = {};
        u.id = t._id || "-1", u.availTill = new Date(t.availTill) || new Date, u.category = t.category || "", u.cost = parseInt(this.calculateSubsBundleCost(t, e)) || 0, u.oldCost = t.oldCost || t.cost || 0, u.completePackCost = t.cost || 0, u.couponGoldenRatio = getRoundedFloat(u.cost / u.completePackCost, 2) || 1, u.coursesObjArr = t.courses || [], u.courseNamesArr = getSpecificKeyArrFromArrayOfObjects(t.courses, "name"), u.coupon = t.offerCoupon || {}, u.description = t.description || "", u.pattern = u.pattern || {}, u.title = t.title || "", u.recommendedFor = t.recommendedFor || "", u.offerText = 0 == t.cost ? "FREE" : u.discountText, u.type = t.type || "others", u.isActive = !!s[t._id], u.isShow = !t.isHidden || this.isShowFromTbLogic(t, u, e), u.specificExamObjArr = t.specificExams, u.cardClass = this.getSubscriptionCardClass(t), u.subTitle = "", u.coursesStr = this.getCoursesString(t.courses), u.feature = t.features && t.features[0] || "", u.items = t.items || [], u.discount = this.getDiscount(u.oldCost, u.cost), u.colorHex = l(t.colorHex), u.validity = this.getValidMonth(t.validity) || 0, u.validityInDays = 30 * u.validity || 0, u.subStrInSubCard = 12 == u.validity ? "For 1 Year" : u.validity > 1 ? "For " + u.validity + " Months" : "For " + u.validity + " Month", u.validityString = u.validity > 1 ? u.validity + " Months" : u.validity + " Month", u.extraFeatures = t.extraFeatures || [], u.totalTest = this.getTotalTestInBundle(t.extraFeatures), u.calcData = o(t.extraFeatures || []), u.courseSelectionDS = i(t.extraFeatures || []);
        var d = n(t.extraFeatures || []);
        return u.attemptedTest = r(d, a), u.isActive ? (u.isExpired = !(new Date(s[u.id].expiryDate).getTime() - (new Date).getTime() > 0), u.isExpired ? u.statusClass = "subs-expired" : (u.attemptedPercent = Math.round(100 * u.attemptedTest / u.totalTest).toString() + "%", u.statusClass = "subs-active")) : c(t, e) ? u.statusClass = "subs-inactive subs-upgrade" : u.statusClass = "subs-inactive", u
    };
    var l = function(t) {
        return t = t ? t : "ffffff", t.indexOf("#") != -1 ? t : "#" + t
    };
    this.mockTestSubsFilter = function(t, e, s) {
        var a = [],
            o = "";
        for (var i in e) e[i].expiryInDays <= 0 && (o += this.getCoursesString(e[i].courses));
        for (var r = 0; r < s.length; r++) e[s[r].id] && e[s[r].id].expiryInDays > 0 || o.trim() && s[r].coursesStr.toLowerCase().indexOf(t.toLowerCase()) != -1 && s[r].coursesStr.toLowerCase().indexOf(o.toLowerCase()) != -1 && a.push(s[r]);
        return console.log(o), a
    }, this.getTotalTestInBundle = function(t) {
        t = validateArr(t);
        for (var e = 0, s = 0; s < t.length; s++)
            if ((t[s].title.toLowerCase() == a.released || t[s].title.toLowerCase() == a.upcoming) && t[s].children)
                for (var o = 0; o < t[s].children.length; o++) e += parseInt(t[s].children[o].meta.testCount);
        return e
    }, this.getValidMonth = function(t) {
        var e = 2592e12;
        return Math.round(t / e)
    }, this.getValidDays = function(t) {
        var e = new Date(t).getTime() - (new Date).getTime();
        return Math.round(e / 864e5)
    }, this.getSubscriptionCardClass = function(t) {
        var e = "subs-inactive";
        return e
    }, this.getCoursesString = function(t) {
        for (var e = [], s = 0; s < t.length; s++) e.push(t[s].name);
        return e.join(" . ")
    }, this.subsBundleIdToObjMap = {}, this.convertNanosecToMillisec = function(t) {
        return t / 1e6
    }, this.calculateSubsBundleCost = function(t, e) {
        var s = {},
            a = 0,
            o = 1,
            i = t.validity,
            r = t.items || [],
            n = 0;
        if (r.length)
            for (var c = 0; c < r.length; c++) s = this.subsBundleIdToObjMap[r[c].id] || {}, n += s.cost, a += this.calculateSubsCost(s, e, i);
        else n = t.cost, a = t.cost;
        return o = t.cost / n, a * o
    }, this.calculateSubsCost = function(t, e, s) {
        if (t.courses && e.hasOwnProperty(t.courses[0].id)) {
            var a = e[t.courses[0].id].expiry - (new Date).getTime(),
                o = this.convertNanosecToMillisec(s);
            if (a > o) return 0;
            a < 0 && (a = 0);
            var i = 0;
            return o - a > 0 && (i = (o - a) / o), t.cost * i
        }
        return t.cost || 0
    }, this.getCourseToExpiryMap = function(t) {
        var e = {};
        t = validateArr(t);
        for (var s = 0; s < t.length; s++)
            for (var a = 0; a < t[s].courses.length; a++)
                if (e.hasOwnProperty(t[s].courses[a].id)) {
                    var o = e[t[s].courses[a].id].expiry,
                        i = new Date(t[s].expiry).getTime();
                    i > o && (e[t[s].courses[a].id].expiry = i, e[t[s].courses[a].id].subsId = t[s]._id)
                } else e[t[s].courses[a].id] = {}, e[t[s].courses[a].id].expiry = new Date(t[s].expiry).getTime(), e[t[s].courses[a].id].subsId = t[s]._id;
        return e
    }, this.handleBodyScroll = function() {
        this.modalHeroPathStack && this.modalHeroPathStack.length >= 1 ? $("body").addClass("modal-open") : $("body").removeClass("modal-open")
    }, this.getRoundedToTens = function(t) {
        return t = Math.floor(t), t += 9, t = 10 * Math.floor(t / 10), t = t % 10 >= 5 ? t + 10 : t
    }
}]);

function priceSlider() {
    $("#mocktestPriceSlider_1").slider({
        range: !0,
        tooltip_split: !0,
        natural_arrow_keys: !0,
        orientation: "horizontal"
    }), $("#mocktestPriceSlider_2").slider({
        range: !0,
        tooltip_split: !0,
        natural_arrow_keys: !0,
        orientation: "horizontal"
    })
}

function toggleScrollButtons(e) {
    var t = document.getElementById(e) || "",
        s = t.getElementsByClassName("js-scroll-element")[0];
    t && hasHorizontalScrollBar(s) ? (t.getElementsByClassName("js-scroll-btn")[0].style.display = "block", t.getElementsByClassName("js-scroll-btn")[1].style.display = "block") : t && (t.getElementsByClassName("js-scroll-btn")[0].style.display = "none", t.getElementsByClassName("js-scroll-btn")[1].style.display = "none")
}

function offerBannerSlider(e) {
    $(e + " li:last-child").hasClass("active") ? $(e + " li:first-child a").tab("show") : $(e + " .active").next().find("a").tab("show")
}

function varOffsetForMocktestTabs() {
    var e = $("#js-scholarship-banner").outerHeight() || 0;
    stickToParent(".js-mocktest-tabs", {
        offset_top: e,
        sticky_class: "stuck-to-parent",
        parent: $(".js-mocktest-content")
    })
}

function setViewMoreViewLess(e) {
    setTimeout(function() {
        var t = $(e);
        t.each(function(e, t) {
            var s = $(t),
                r = s.children(".mt-card").outerHeight(!0);
            s.outerHeight(!0) > r && (s.siblings(".js-view-more-less").show(), s.css({
                height: r
            }))
        })
    }, 500)
}

function setVerifyMobileInCart() {
    var e = 0,
        t = setInterval(function() {
            if (6 === e) clearInterval(t);
            else {
                var s = $(".js-mobile-conformation").outerHeight() || 0;
                $(".js-cart-body").css("margin-top", s), e += 1
            }
        }, 500)
}

function stickToParent(e, t) {
    $(e) && $(e).length && $(e).stick_in_parent(t)
}
var TB = TB || {};
TB.LS_KEY_TXN_TEST_COUNT = "txn_test_count", TB.LS_KEY_TXN_AMOUNT = "txn_amount", TB.LS_KEY_TXN_COUPON_USED = "txn_coupon";
var currentTimeInMS = "";
$(document).ready(function() {
    $(document).on("click", ".mocktest-filters .dropdown-menu", function(e) {
        e.stopPropagation()
    }), $(document).on("click", ".js-cart-checkout", function() {
        setVerifyMobileInCart()
    }), $(document).on("click", ".offer-controls span", function() {
        var e = $(this);
        $(".offer-controls span").removeClass("active"), e.addClass("active");
        var t = e.attr("data-id");
        $(".offer-banner .offer").removeClass("active"), $(".offer-banner ." + t).addClass("active")
    });
    var e = $(".faq-box .question");
    e.on("click", function() {
        var t = $(this).siblings(".answer");
        t.hasClass("active") ? (e.removeClass("active"), t.removeClass("active").slideUp()) : (e.removeClass("active"), $(this).addClass("active"), $(".faq-box .answer").removeClass("active").slideUp(), t.addClass("active").slideDown())
    }), $(document).on("click", ".js-view-more", function() {
        $(this).parent().prev().css("height", "auto"), $(this).hide().siblings(".js-view-less").show()
    }), $(document).on("click", ".js-view-less", function() {
        var e = $(this).parent().prev(),
            t = $(".js-mocktest-tabs").outerHeight() || 0,
            s = e.parents(".tests-sections").offset().top - t,
            r = e.children(".mt-card").outerHeight(!0);
        e.css({
            height: r
        }), $("html, body").animate({
            scrollTop: s
        }, 300), $(this).hide().siblings(".js-view-more").show()
    }), $(document).on("click", ".dropdown-toggle", function() {
        priceSlider()
    }), $(document).on("click", ".mobile-search-filters-btns .btn", function() {
        priceSlider()
    }), $(document).on("click", ".js-scholarship-enroll, .js-close-announcement-banner", function() {
        $(".js-mocktest-tabs").trigger("sticky_kit:detach"), varOffsetForMocktestTabs()
    }), varOffsetForMocktestTabs(), $(document).on("click", ".js-see-offers", function() {
        scrollToSpecificElement("#offeredTestsBox")
    });
    var t = ".js-banner-slide-nav";
    if ($(t) && $(t).length) {
        var s = setInterval(function() {
                offerBannerSlider(t)
            }, 5e3),
            r = 0;
        $(document).on("click", t + " li a", function() {
            clearTimeout(r), clearInterval(s);
            var e = function() {
                s = setInterval(function() {
                    offerBannerSlider(t)
                }, 5e3)
            };
            r = setTimeout(e, 5e3)
        })
    }
});
var slideToggleHeader = throttle(function() {
        var e = $(".tb-landing-banner").outerHeight(),
            t = $(window).scrollTop();
        t >= e ? $(".tb-main-header").addClass("slide-hide") : $(".tb-main-header").removeClass("slide-hide")
    }, 100),
    mocktestPageEvents = function() {
        $(window).scroll(function() {
            slideToggleHeader()
        })
    };
$(window).resize(function() {
    setViewMoreViewLess("#my_test_tab .tests-sections .packs-container"), setViewMoreViewLess("#attempted_test_tab .tests-sections .packs-container")
});
var app = angular.module("mocktestApp", ["Testbook", "formValidations"]);
app.controller("mocktestController", ["$scope", "$rootScope", "$timeout", "$interval", "$http", "TB", "$sce", "subscriptionService", function(e, t, s, r, a, o, i, n) {
    function c() {
        var t, s, r;
        e.isFreeTestsAvailable = !1, e.isPaidTestsAvailable = !1, e.isAllTestsAvailable = !1, e.isMyTestsAvailable = !1, e.isAttemptedTestsAvailable = !1, e.isTestsAvailable = !1;
        var a = e.allTestsObj.nonProducts,
            o = e.allTestsObj.packs,
            i = e.allTestsObj.comboPacks,
            n = e.myTestsArr,
            c = e.attemptedTestsArr;
        if (a && a.length)
            for (t = 0; t < a.length; t++)
                if (!a[t].isHide) {
                    e.isFreeTestsAvailable = !0;
                    break
                }
        if (o && o.length)
            for (t = 0; t < o.length; t++)
                if (r = o[t].value, r && r.length)
                    for (s = 0; s < r.length; s++)
                        if (!r[s].isHide) {
                            e.isPaidTestsAvailable = !0;
                            break
                        }
        if (i && i.length)
            for (t = 0; t < i.length; t++) {
                if (r = i[t], r.value && r.value.length)
                    for (s = 0; s < r.value.length; s++)
                        if (!r.value[s].isHide) {
                            e.isPaidTestsAvailable = !0;
                            break
                        }
                if (r.subsArr && r.subsArr.length)
                    for (s = 0; s < r.subsArr.length; s++)
                        if (r.subsArr[s].isShow && !r.subsArr[s].isActive) {
                            e.isPaidTestsAvailable = !0;
                            break
                        }
            }
        if (n && n.length)
            for (t = 0; t < n.length; t++)
                if (n[t].value && n[t].value.length) {
                    e.isMyTestsAvailable = !0;
                    break
                }
        if (c && c.length)
            for (t = 0; t < c.length; t++)
                if (!c[t].isHide) {
                    e.isAttemptedTestsAvailable = !0;
                    break
                }(e.isFreeTestsAvailable || e.isPaidTestsAvailable || e.isMyTestsAvailable || e.isAttemptedTestsAvailable) && (e.isTestsAvailable = !0), (e.isFreeTestsAvailable || e.isPaidTestsAvailable) && (e.isAllTestsAvailable = !0)
    }

    function l(t) {
        var s = {
                "557af9de0ea5ce31f052918a": ["58135074adafff45a35a5103", "557af9de0ea5ce31f0529187"],
                "561664f8cac3ae28e5213e87": ["578f5618995a2d5b4c3f6e9a", "557af9de0ea5ce31f0529187"],
                "55a5784fa7b57b49a29e2125": ["578f5618995a2d5b4c3f6e9a", "557af9de0ea5ce31f0529187"],
                "55a57ad3a7b57b49e58559ee": ["57ff175ee9f131722fde54d6", "578f5618995a2d5b4c3f6e9a", "557af9de0ea5ce31f0529187"],
                "55a57ad3a7b57b49e58559ed": ["57fe2e4f03282162c9764bee", "557af9de0ea5ce31f0529187"],
                "568a752485111b4193101101": ["557569e82a39650f6f395648", "568a751185111b4193101100", "569c9730995a2d097081cf8a", "566947a4a7b57b398faca54b", "5796d79e9389865c92bf0806"],
                "557af9de0ea5ce31f0529187": ["55a57ad3a7b57b49e58559ee", "557af9de0ea5ce31f052918a", "55a5784fa7b57b49a29e2125", "55a57ad3a7b57b49e58559ed", "561664f8cac3ae28e5213e87", "578f5618995a2d5b4c3f6e9a"],
                "569c9730995a2d097081cf8a": ["557569e82a39650f6f395648", "568a751185111b4193101100", "566947a4a7b57b398faca54b", "568a752485111b4193101101", "5796d79e9389865c92bf0806"],
                "557569e82a39650f6f395648": ["568a751185111b4193101100", "584ff379e9f131060a2edbfd", "569c9730995a2d097081cf8a", "566947a4a7b57b398faca54b", "5796d79e9389865c92bf0806"],
                "568a751185111b4193101100": ["557569e82a39650f6f395648", "584ff379e9f131060a2edbfd", "569c9730995a2d097081cf8a", "566947a4a7b57b398faca54b", "568a752485111b4193101101", "5796d79e9389865c92bf0806"],
                "566947a4a7b57b398faca54b": ["557569e82a39650f6f395648", "568a751185111b4193101100", "569c9730995a2d097081cf8a", "568a752485111b4193101101", "5796d79e9389865c92bf0806"],
                "58135074adafff45a35a5103": ["557af9de0ea5ce31f052918a", "578f5618995a2d5b4c3f6e9a", "557af9de0ea5ce31f0529187"],
                "57ff175ee9f131722fde54d6": ["55a57ad3a7b57b49e58559ee", "578f5618995a2d5b4c3f6e9a", "557af9de0ea5ce31f0529187"],
                "57fe2e4f03282162c9764bee": ["55a57ad3a7b57b49e58559ed", "578f5618995a2d5b4c3f6e9a", "557af9de0ea5ce31f0529187"],
                "5796d79e9389865c92bf0806": ["557569e82a39650f6f395648", "568a751185111b4193101100", "569c9730995a2d097081cf8a", "566947a4a7b57b398faca54b", "568a752485111b4193101101"],
                "578f5618995a2d5b4c3f6e9a": ["55a57ad3a7b57b49e58559ee", "557af9de0ea5ce31f052918a", "55a5784fa7b57b49a29e2125", "55a57ad3a7b57b49e58559ed", "561664f8cac3ae28e5213e87", "57ff175ee9f131722fde54d6"],
                "584ff379e9f131060a2edbfd": ["557569e82a39650f6f395648", "568a751185111b4193101100", "569c9730995a2d097081cf8a", "566947a4a7b57b398faca54b", "568a752485111b4193101101", "5796d79e9389865c92bf0806"],
                "5878cdbc995a2d421d498e6f": ["58135074adafff45a35a5103", "557af9de0ea5ce31f052918a", "557af9de0ea5ce31f0529187"],
                "5878cda4995a2d421d498df2": ["57fe2e4f03282162c9764bee", "55a57ad3a7b57b49e58559ed", "557af9de0ea5ce31f0529187"]
            },
            r = s[t] || [],
            a = $("#course_info") && $("#course_info").val() || "[]",
            o = JSON.parse(a),
            i = [],
            n = {
                id: "",
                name: "",
                url: ""
            };
        e.courseToCoursesArr = [], o.forEach(function(e) {
            if (e.isGroup)
                for (var t = 0; t < e.courses.length; t++) n = {
                    id: e.courses[t].id,
                    name: e.courses[t].abbr,
                    url: e.courses[t].URL
                }, r.indexOf(n.id) != -1 && i.push(n);
            else n = {
                id: e.id,
                name: e.abbr,
                url: e.URL
            }, r.indexOf(n.id) != -1 && i.push(n)
        }), e.courseToCoursesArr = i
    }
    e.registerationSkipped = !1, e.GK_CURRENT_AFFAIRS_COURSE_ID = "557af9de0ea5ce31f052918b", t.$on("MobileVerifiedSuccessfully", function() {
        e.isMobileVerified = !0, e.includeMobilVerificationBlock = !1
    }), t.$on("REMOVED_FROM_CART", function(t, s) {
        for (var r = 0; r < s.idsArr.length; r++)
            if (n.subsBundleIdToObjMap[s.idsArr[r]])
                for (var a = 0; a < n.subsBundleIdToObjMap[s.idsArr[r]].courses.length; a++) A.hasOwnProperty(n.subsBundleIdToObjMap[s.idsArr[r]].courses[a].name) && delete A[n.subsBundleIdToObjMap[s.idsArr[r]].courses[a].name];
        e.resetItemsForCartStatus(s.idsArr, !1)
    }), t.$on("SET_REMAINING_COINS", function(t, s) {
        e.mycoins = s.coins
    }), t.$on("PURCHASE_SUBSCRIPTION_FROM_CALCULATOR", function(t, s) {
        e.addToCart([s.data], !0, e.mycoins, !1)
    }), e.hideBodyScroll = !1, e.toggleBodyScroll = function(t) {
        e.hideBodyScroll = t
    }, e.setBannerBgImgUrl = function() {
        "557af9de0ea5ce31f052918b" == e.currentCourseId ? e.bannerBgImgUrl = "Banner-for-CA-course-1.jpg" : e.bannerBgImgUrl = "mocktest-banner-bg.jpg"
    }, e.setTimeForLiveTest = function() {
        for (var t = !1, s = 0; s < e.myTestsArr.length; s++)
            for (var r = e.myTestsArr[s].value, a = 0; a < r.length; a++) r[a].isLiveTest && (t = !0);
        t && e.setTimeForLiveTestHelper()
    }, e.setTimeForLiveTestHelper = function() {
        for (var t = !1, r = 0; r < e.myTestsArr.length; r++)
            for (var a = e.myTestsArr[r].value, o = 0; o < a.length; o++) a[o].isLiveTest && (a[o].liveTestTimer = e.getLiveTestTimeString(a[o]), t = e.checkToStartTimer());
        t && s(function() {
            e.setTimeForLiveTest()
        }, 1e3)
    }, e.checkToStartTimer = function() {
        for (var t = 0; t < e.myTestsArr.length; t++)
            for (var s = e.myTestsArr[t].value, r = 0; r < s.length; r++)
                if (1 == s[r].isLiveTest && !s[r].isPreLaunch && (s[r].myCardClass.search("lt-default-state") != -1 || s[r].myCardClass.search("lt-start-test") != -1)) return !0;
        return !1
    }, e.parseDateFromServer = function(t) {
        var s = new Date(Date.parse(t));
        return isNaN(s.getTime()) ? e.initialTimeTB : s
    }, e.getLiveTestTimeString = function(t) {
        var s = e.currentTime,
            r = (new Date(t.startTimeLive).getTime() - s) / 1e3,
            a = (new Date(t.endTimeLive).getTime() - s) / 1e3,
            o = 0,
            i = "";
        r > 0 ? (o = r, i = " To Start") : r < 0 && a > 0 && (o = a, i = "Ends in");
        var n = function(e) {
                return e < 10 ? "0" + e : "" + e
            },
            c = e.getDaysDiff(new Date(t.startTimeLive).getTime(), e.currentTime),
            l = Math.floor(o / 3600),
            d = Math.ceil((o - 3600 * l) / 60),
            u = Math.floor(o - 3600 * l - 60 * Math.floor((o - 3600 * l) / 60));
        t.myCardClass = e.getClassForMyTests(t);
        var f = c > 1 ? c + " days to go" : c + " day to go",
            m = l > 1 ? l + " hours to go" : l + " hour to go",
            p = d > 1 ? d + " minutes to go" : d + " minute to go",
            g = u > 1 ? u + " seconds to go" : u + " second to go",
            T = i + " " + n(l) + ":" + n(d) + ":" + n(u);
        return c && r > 0 ? f : parseInt(l) && r > 0 ? m : parseInt(d) + 1 && r > 0 ? p : parseInt(u) && r > 0 ? g : T
    }, e.getDaysDiff = function(e, t) {
        return e -= e % f, t -= t % f, (e - t) / f
    }, e.openMobileFilters = function(t) {
        e.showFiltersAllTests = !1, e.showFiltersMyTests = !1, "all" == t ? e.showFiltersAllTests = !0 : "my" == t && (e.showFiltersMyTests = !0), e.toggleBodyScroll(!0)
    }, e.closeMobileFilters = function() {
        e.showFiltersAllTests = !1, e.showFiltersMyTests = !1, e.toggleBodyScroll(!1)
    }, e.showSearchOnMobile = !1, e.toggleSearchOnMobile = function(t) {
        e.showSearchOnMobile = t, e.toggleBodyScroll(t)
    };
    var d = function() {
        var t = [],
            s = [],
            r = function(e, t) {
                e.indexOf(t) == -1 && e.push(t)
            },
            a = function(e, t) {
                e = validateArr(e), t = validateArr(t);
                for (var s = 0; s < t.length; s++)
                    if (e.indexOf(t[s]) != -1) return !0;
                return !1
            },
            o = function(e, t) {
                for (var s = 0; s < t.length; s++) r(e, t[s].id)
            };
        if (e.isPromotionsPage) {
            for (var i = 0; i < e.allTestsObj.packs.length; i++) e.allTestsObj.packs[i].isPartOfCart && r(s, e.allTestsObj.packs[i].id);
            for (var i = 0; i < e.allTestsObj.comboPacks.length; i++)(e.allTestsObj.comboPacks[i].isPartOfCart || a(s, e.allTestsObj.comboPacks[i].addedPids)) && (r(s, e.allTestsObj.comboPacks[i].id), a(s, e.allTestsObj.comboPacks[i].addedPids) || o(s, e.allTestsObj.comboPacks[i].items))
        } else {
            for (var i = 0; i < e.allTestsObj.packs.length; i++) {
                t = e.allTestsObj.packs[i].value || [];
                for (var n = 0; n < t.length; n++) t[n].isPartOfCart && r(s, t[n].id)
            }
            for (var i = 0; i < e.allTestsObj.comboPacks.length; i++) {
                t = e.allTestsObj.comboPacks[i].value || [];
                for (var n = 0; n < t.length; n++)(t[n].isPartOfCart || a(s, t[n].addedPids)) && (r(s, t[n].id), a(s, t[n].addedPids) || o(s, t[n].items))
            }
        }
        var c = function(s) {
            if (e.isPromotionsPage) {
                for (var r = 0; r < e.allTestsObj.packs.length; r++) e.allTestsObj.packs[r].cardClass = v(e.allTestsObj.packs[r], s, e.allTestsObj.packs[r].isPartOfCart, e.isSubscriptionActive);
                for (var r = 0; r < e.allTestsObj.comboPacks.length; r++) e.allTestsObj.comboPacks[r].cardClass = v(e.allTestsObj.comboPacks[r], s, e.allTestsObj.comboPacks[r].isPartOfCart)
            } else {
                for (var r = 0; r < e.allTestsObj.packs.length; r++) {
                    t = e.allTestsObj.packs[r].value || [];
                    for (var a = 0; a < t.length; a++) t[a].cardClass = v(t[a], s, t[a].isPartOfCart, e.isSubscriptionActive)
                }
                for (var r = 0; r < e.allTestsObj.comboPacks.length; r++) {
                    t = e.allTestsObj.comboPacks[r].value || [];
                    for (var a = 0; a < t.length; a++) t[a].cardClass = v(t[a], s, t[a].isPartOfCart, e.isSubscriptionActive)
                }
            }
        };
        c(s)
    };
    e.addPacksToMyTestsViaSubscription = function(t, r) {
        function a(a) {
            for (var o = [], i = 0; i < t.items.length; i++)
                if ("test" == t.items[i].type.toLowerCase()) t.items[i].myCardClass = e.getClassForMyTests(t.items[i]), o.push(t.items[i]);
                else if ("product" == t.items[i].type.toLowerCase())
                for (var n = t.items[i].id, l = e.mapPidToProduct[n] && e.mapPidToProduct[n].items || [], d = 0; d < l.length; d++) l[d].myCardClass = e.getClassForMyTests(l[d]), o.push(l[d]);
            r.splice(r.indexOf(t), 1), e.myTestsArr = e.resetMyTestsAfterAddingFreeTests(o), e.manageTabs("my"), c(), hideLoader(), (e.isCoursePage || e.isPromotionsPage) && (e.setTestsAddedStatus(!0), s(function() {
                e.setTestsAddedStatus(!1)
            }, 7e3))
        }

        function i(e) {
            hideLoader(), showAlert(e.message || "Something went wrong, Please try again.", "error", "sm", 3e3)
        }
        showLoader("Adding Tests To Your Account Please Wait."), o.addPacksToMyTestsViaSubscription({
            pid: t.id
        }, a, i)
    }, e.addSubsBtnClicked = function(t) {
        var s = e.subsArrMap[t] || {};
        s.statusClass.search("subs-inactive") != -1 || s.statusClass.search("subs-upgrade") != -1 ? e.addToCart([s], !0, e.mycoins, !1) : s.statusClass.search("subs-expired") != -1 && e.showRenewSubscriptionModal(s)
    }, e.addAllFreeTests = function(t) {
        for (var s = [], r = 0; r < t.length; r++) {
            var a = t[r].endTimeLive - e.currentTime;
            (0 == t[r].cost && t[r].isLiveTest && a > 0 || 0 == t[r].cost && !t[r].isLiveTest) && s.push(t[r])
        }
        e.addToCart(s, !1, e.mycoins, !1)
    }, e.addToCartHelper = function(t) {
        e.addToCart([t], !0, e.myCoins, !1)
    }, e.addToCart = function(s, r, a, o) {
        if (e.isCoursePage && s[0].cost > 0 && "-1" != e.sid) return window.location = "/" + e.curCourseURL + "/mocktest?pid=" + s[0].id, 0;
        if (e.isCoursePage && "-1" == e.sid) {
            var i = {};
            return i[REDIRECT_URL_KEY] = "/" + e.curCourseURL + "/mocktest?pid=" + s[0].id, i[COURSE_IDS_KEY] = e.currentCourseId, openSignUpSignInModal(i, !0), 0
        }
        for (var n = [], c = [], l = 0; l < s.length; l++) {
            var u = s[l];
            if (0 == u.cost) n.push(u);
            else {
                if (s[l].isPartOfCart = !0, "Subscription Bundle" == u.type) {
                    for (var f = !1, m = 0; m < u.coursesObjArr.length; m++) A.hasOwnProperty(u.coursesObjArr[m].name) && !f ? (showAlert("You can't add two products with atleast one course common", "warning", "medium", 5e3), f = !0) : A[u.coursesObjArr[m].name] = 1;
                    var p = {
                        id: u.id,
                        cost: u.cost,
                        title: u.title,
                        type: u.type,
                        items: e.getItemsIdsArrForProducts(u),
                        availTill: u.availTill,
                        validity: u.validity,
                        validityInString: u.validityString
                    }
                } else var p = {
                    id: u.id,
                    cost: u.cost,
                    title: u.title,
                    type: u.type,
                    items: e.getItemsIdsArrForProducts(u),
                    availTill: u.availTill
                };
                o ? o && e.mycoins >= p.cost && c.push(p) : c.push(p)
            }
        }
        if (n && n.length && e.addFreeTest(n), c && c.length) {
            var u = {};
            u = e.isPromotionsPage ? {
                cartItemsArr: c,
                isOpenFlyout: r,
                mycoins: a,
                isAddWithCoins: o,
                liveTestIdForPromotions: e.liveTestIdForPromotions,
                isSyncWithServer: !1,
                coinsPercentage: e.coinsPercentage
            } : {
                cartItemsArr: c,
                isOpenFlyout: r,
                mycoins: a,
                isAddWithCoins: o,
                isSyncWithServer: !0,
                coinsPercentage: e.coinsPercentage
            }, t.$broadcast("ADD_TO_CART", u)
        }
        setVerifyMobileInCart(), d()
    }, e.itemsInCartToggle = !1, e.toggleProductInCart = function(r) {
        if (r.isPartOfCart) {
            var a = [r.id];
            t.$broadcast("REMOVE_FROM_CART", {
                idsArr: a,
                isOpenFlyout: !1
            }), v(r, [], !1)
        } else e.addToCart([r], !1, e.mycoins, !1);
        e.itemsInCartToggle = !0, s(function() {
            e.itemsInCartToggle = !1
        }, 300)
    }, e.getItemsIdsArrForProducts = function(e) {
        var t = [];
        if (e.items && e.items.length && !e.isCombo) {
            for (var s = [], r = 0; r < e.items.length; r++) s.push(e.items[r].id);
            t.push({
                pid: e.id,
                tests: s
            })
        } else {
            for (var a = [], o = [], r = 0; r < e.items.length; r++) "test" == e.items[r].type ? a.push(e.items[r].id) : o.push(e.items[r].id);
            t.push({
                pid: e.id,
                tests: a,
                products: o
            })
        }
        return t
    }, e.freeTestsCountAdded = 0, e.freeTestAddedTitle = "", e.addFreeTest = function(t) {
        if ("-1" == e.sid || !e.sid) {
            var r = {};
            return r[REDIRECT_URL_KEY] = "/" + e.curCourseURL + "/mocktest", r[COURSE_IDS_KEY] = e.currentCourseId, openSignUpSignInModal(r, !0), 0
        }
        if (!t || !t.length || "-1" == e.sid || !e.sid) return 0;
        e.addFreeTestSCB = function(r) {
            hideLoader();
            for (var a = [], o = [], i = 0; i < e.allTestsObj.nonProducts.length; i++) {
                for (var n = !0, l = 0; l < t.length; l++)
                    if (t[l].id == e.allTestsObj.nonProducts[i].id) {
                        n = !1, t[l].myCardClass = e.getClassForMyTests(t[l]), t[l].cardClass ? t[l].cardClass = t[l].cardClass + " part-of-my-tests" : t[l].cardClass = "part-of-my-tests", setLocalStorageOnLiveTestAdd(t[l].id), o.push(t[l]);
                        break
                    }
                n && a.push(e.allTestsObj.nonProducts[i])
            }
            e.myTestsArr = e.resetMyTestsAfterAddingFreeTests(o), e.allTestsObj.nonProducts = a, e.setTimeForLiveTest(), e.freeTestsCountAdded = t.length, e.freeTestAddedTitle = t[0].title, e.setTestsAddedStatus(!0), s(function() {
                e.setTestsAddedStatus(!1)
            }, 7e3), e.isPromotionsPage || e.setFiltersMocktest(), c()
        }, e.closeFreeTestAdded = function() {
            e.setTestsAddedStatus(!1)
        };
        for (var a = [], i = [], n = 0; n < t.length; n++) t[n].items ? i.push(e.getProductObj(t[n])) : a.push(t[n].id);
        var l = {
            coins: 0,
            coupon: "",
            products: i || [],
            tests: a || []
        };
        l.livetestid = "";
        var d = {
            coins: 0,
            coupon: "",
            ismobile: !1,
            tests: a.join(",") || [],
            livetestid: ""
        };
        showLoader("Adding Free Tests. Please Wait."), o.manageTransactions(d, e.addFreeTestSCB)
    }, e.getProductObj = function(e) {
        for (var t = {
                pid: e.id,
                tests: []
            }, s = 0; s < e.items.length; s++) t.tests.push(e.items[s].id);
        return t
    }, e.resetMyTestsAfterAddingFreeTests = function(t) {
        for (var s = t || [], r = [], a = 0; a < e.myTestsArr.length; a++)
            for (var o = e.myTestsArr[a].value, i = 0; i < o.length; i++) s.push(o[i]);
        return r = e.getCompleteSortedCategorizedItemsArr(s, !1, "fromResetMyTestsAfterAddingFreeTests")
    }, e.resetItemsForCartStatus = function(t, s) {
        for (var r = 0; r < e.allTestsObj.nonProducts.length; r++) {
            var a = e.allTestsObj.nonProducts[r];
            t.indexOf(a.id) != -1 && (a.isPartOfCart = s, v(a, [], s))
        }
        if (e.isPromotionsPage)
            for (var r = 0; r < e.allTestsObj.packs.length; r++) t.indexOf(e.allTestsObj.packs[r].id) != -1 && (e.allTestsObj.packs[r].isPartOfCart = s, v(e.allTestsObj.packs[r], [], s));
        else
            for (var r = 0; r < e.allTestsObj.packs.length; r++)
                for (var o = e.allTestsObj.packs[r].value, i = 0; i < o.length; i++) t.indexOf(o[i].id) != -1 && (o[i].isPartOfCart = s, v(o[i], [], s));
        if (e.isPromotionsPage)
            for (var r = 0; r < e.allTestsObj.comboPacks.length; r++) t.indexOf(e.allTestsObj.comboPacks[r].id) != -1 && (e.allTestsObj.comboPacks[r].isPartOfCart = s, v(e.allTestsObj.comboPacks[r], s));
        else
            for (var r = 0; r < e.allTestsObj.comboPacks.length; r++)
                for (var o = e.allTestsObj.comboPacks[r].value, i = 0; i < o.length; i++) t.indexOf(o[i].id) != -1 && (o[i].isPartOfCart = s, v(o[i], s));
        d()
    };
    var u = new Date("0001-01-01T00:00:00Z").getTime(),
        f = 864e5;
    e.allCategoryObjByName = {}, e.allCategoryObjById = {}, e.setAllCategories = function(t) {
        var s = {
            _id: "-1",
            color: "",
            course: [],
            name: "Paused Tests",
            order: -1,
            sort: "pausedTestOrder",
            sortOrder: "asc",
            type: "category"
        };
        t.push(s), t = e.getSortedObjArrByKey(t, "order", "asc");
        for (var r = 0; r < t.length; r++) {
            var a = t[r].name,
                o = t[r]._id;
            e.allCategoryObjByName[a] = t[r], e.allCategoryObjById[o] = t[r]
        }
    }, e.getSortedObjArrByKey = function(e, t, s) {
        var r = [],
            a = [],
            o = "numeric";
        if (!(e && e.length && e[0])) return [];
        o = typeof e[0][t];
        for (var i = 0; i < e.length; i++) a.indexOf(e[i][t]) == -1 && a.push(e[i][t]);
        "string" == o ? a = a.sort() : "number" == o && (a = a.sort(function(e, t) {
            return e - t
        }));
        for (var i = 0; i < a.length; i++)
            for (var n = 0; n < e.length; n++) e[n][t] == a[i] && r.push(e[n]);
        if ("asc" == s) return r;
        for (var e = [], i = r.length - 1; i >= 0; i--) e.push(r[i]);
        return e
    }, e.freeTestsCount = 0, e.storeNonProducts = function(t, s, r) {
        e.freeTestsCount = s.length;
        for (var a = 0; a < r.length; a++)
            if (r[a].items && 1 == r[a].items.length || 0 == r[a].cost) {
                s.push(r[a]);
                for (var o = r[a].items || [], i = 0; i < o.length; i++) {
                    var n = e.getTestObj(o[i]);
                    e.testIdToTestMAP[n.id] = n
                }
            }
        for (var a = 0; a < s.length; a++) s[a] = e.getTestObj(s[a]);
        e.allTestsObj.nonProducts = e.getSortedObjArrByKey(s, "availFrom", "desc")
    }, e.getFreeTestsCount = function(t) {
        t = t && t.length && t || [];
        for (var s = 0, r = 0; r < t.length; r++)
            if (t[r].isLiveTest) {
                var a = t[r].endTimeLive - e.currentTime;
                a > 0 ? s += 1 : s = s
            } else 0 == t[r].cost && t[r].isShow && (s += 1);
        return s
    }, e.getTestObj = function(t) {
        var s = {};
        if (t.items) {
            var r = t.items && t.items.length && t.items[0].id || "";
            return t.isLiveTest = e.checkForLiveTest(t.items[0].info.startTime || u), t.solutionURL = t.isLiveTest ? "/" + e.curCourseURL + "/tests/" + t.id + "/promotions" : "/" + e.curCourseURL + "/tests/" + r + "#/solutions", t.analysisURL = t.isLiveTest ? "/" + e.curCourseURL + "/tests/" + t.id + "/promotions?from=analysis" : "/" + e.curCourseURL + "/tests/" + r + "/analysis", s.id = t.id || t._id, s.isPreLaunch = e.checkForPrelaunchTest(t.items[0].availFrom), s.availFrom = new Date(t.releaseDate).getTime() || u, s.availTill = new Date(t.items[0].availTill).getTime() || u, s.testExpiryInDays = e.getDaysDiff(s.availTill, (new Date).getTime()), s.category = t.category, s.categoryObj = e.allCategoryObjById[t.category] || "", s.description = t.description || "", s.pattern = t.pattern || {}, s.isLiveTest = t.isLiveTest, s.startTimeLive = new Date(t.items[0].info.startTime).getTime() || u, s.endTimeLive = new Date(t.items[0].info && t.items[0].info.endTime).getTime() || u, s.isLongLiveTest = e.getLiveTestTime(s), s.title = t.items[0].title || "", s.cost = t.cost || 0, s.offerText = t.discountText || "", s.recommendedFor = t.recommendedFor || "", s.oldCost = t.oldCost || 0, s.specificExams = e.getSpecificExamNamesArr(t.specificExams), s.cardClass = e.getNonProductCardClass(s), s.itemsCount = t.items.length || 0, s.offerText = 0 == t.cost ? "FREE" : t.discountText, s.course = t.course ? t.course.name : "", s.testDetails = e.getTestDetailsObj(t.items), s.type = t.type || "others", s.items = t.items, s.solutionURL = t.solutionURL, s.analysisURL = t.analysisURL, s.isShow = !0, s.isHide = t.isHidden || !1, s.isPartOfHiddenProduct = t.isHidden || !1, s.showAdmitCardExams = t.showAdmitCardExams || [], s.specificExamObjArr = t.specificExams, s
        }
        return t.isLiveTest = e.checkForLiveTest(t.info && t.info.startTime || u), t.solutionURL = t.isLiveTest ? "/" + e.curCourseURL + "/tests/" + (t.id || t._id) + "/promotions" : "/" + e.curCourseURL + "/tests/" + (t.id || t._id) + "#/solutions", t.analysisURL = t.isLiveTest ? "/" + e.curCourseURL + "/tests/" + (t.id || t._id) + "/promotions?from=analysis" : "/" + e.curCourseURL + "/tests/" + (t.id || t._id) + "/analysis", s.id = t.id || t._id, s.isPreLaunch = e.checkForPrelaunchTest(t.availFrom), s.availFrom = new Date(t.availFrom).getTime() || u, s.availTill = new Date(t.availTill).getTime() || u, s.testExpiryInDays = e.getDaysDiff(s.availTill, (new Date).getTime()), s.category = t.category, s.categoryObj = e.allCategoryObjById[t.category] || "", s.description = t.description || "", s.pattern = t.pattern || {}, s.isLiveTest = t.isLiveTest, s.startTimeLive = new Date(t.info && t.info.startTime).getTime() || u, s.endTimeLive = new Date(t.info && t.info.endTime).getTime() || u, s.isLongLiveTest = e.getLiveTestTime(s), s.title = t.title || "", s.cost = t.cost || 0, s.specificExams = e.getSpecificExamNamesArr(t.specificExams) || [], s.cardClass = e.getNonProductCardClass(s), s.itemsCount = 1, s.offerText = t.cost ? "" : "FREE", s.course = t.course ? t.course.name : "", s.testDetails = e.getTestDetailsObj([t]), s.type = t.type || "others", s.solutionURL = t.solutionURL, s.analysisURL = t.analysisURL, s.isShow = !0, s.isHide = !1, s.isPartOfHiddenProduct = s.isHide, s.showAdmitCardExams = t.showAdmitCardExams || [], s
    }, e.getLiveTestTime = function(e) {
        return e.endTimeLive - e.startTimeLive >= 60 * e.pattern.time * 1e3
    }, e.checkForPrelaunchTest = function(t) {
        var t = new Date(t);
        return t > e.currentTime
    }, e.getSpecificExamNamesArr = function(e) {
        e || (e = []);
        for (var t = [], s = 0; s < e.length; s++) t.indexOf(e[s]) == -1 && t.push(e[s].name || e[s].title || "");
        return t
    }, e.getNonProductCardClass = function(t) {
        var s = t.endTimeLive - e.currentTime,
            r = "";
        return t.offerText && (r = "has-offer"), t.cost || (r = r ? r + " is-free" : r + "is-free"), t.isLiveTest && (r = r ? r + " is-live" : r + "is-live"), t.itemsCount > 1 && (r = r ? r + " test-pack" : r + "test-pack"), t.isLongLiveTest && (r = r ? r + " has-more-window" : r + "has-more-window"), t.isLiveTest && s < 0 && (r = r ? r + " lt-time-over" : r + "lt-time-over"), new Date(t.availTill).getTime() < e.currentTime && (r = r ? r + " available" : r + "available"), t.specificExams && t.specificExams.length && (r = r ? r + " has-tags" : r + "has-tags"), r
    }, e.getSortedArrForRepeat = function(e) {
        for (var t = [], s = 0; s < e.length; s++)
            for (var r = e[s].value, a = 0; a < r.length; a++) t.push(r[a]);
        return t
    }, e.subsArr = [];
    var m = function(t) {
        t = t || [];
        for (var s = [], r = [], a = [], o = 0; o < t.length; o++) "subscription" == t[o].type.toLowerCase() || "subscription bundle" == t[o].type.toLowerCase() ? (r.push(), s.push(t[o])) : a.push(t[o]);
        if (e.sid != -1) g(s);
        else {
            n.subsBundleIdToObjMap = getCustomMap(s, "_id", "", !0);
            for (var o = 0; o < s.length; o++) {
                var i = n.processSubscriptionObject(s[o], {}, {}, []);
                e.subsArr.push(i), e.subsArrMap[i.id] = i || {}
            }
            h(e.subsArr)
        }
        return a
    };
    e.purchasedSubsMap = {}, e.subsArrMap = {}, e.courseIdToExpiryMap = {};
    var p = function(e) {
            for (var t in e) e[t].validity = e[t] && e[t].subsId && n.subsBundleIdToObjMap[e[t].subsId] && n.subsBundleIdToObjMap[e[t].subsId].validity;
            return e
        },
        g = function(t) {
            var s = function(s) {
                    if (s.data && s.success) {
                        var r = n.getCourseToExpiryMap(s.data.subscriptions);
                        e.courseIdToExpiryMap = r || {};
                        var a = s.data.subscriptions,
                            o = s.data.attemptedTests || [];
                        n.subsBundleIdToObjMap = getCustomMap(t, "_id", "", !0), p(r)
                    }
                    e.purchasedSubsMap = n.getPurchasedSubsMap(a) || {};
                    for (var i = 0; i < t.length; i++) {
                        var c = n.processSubscriptionObject(t[i], r, e.purchasedSubsMap, o);
                        e.subsArr.push(c), e.subsArrMap[c.id] = c || {}
                    }
                    if (e.isPromotionsPage)
                        for (var i = 0; i < e.subsArr.length; i++) {
                            var l = t[i].cost,
                                d = t[i].completePackCost,
                                u = getRoundedFloat(l / d, 2) || 1;
                            e.subsArr[i] = e.addPromotionsDetails(e.subsArr[i], u), h(e.subsArr)
                        }
                    C += 1, 2 == C && P(e.studentApiData)
                },
                r = function(e) {
                    console.log(e)
                };
            o.getStuSubsPlan({}, s, r)
        };
    e.getRoundedFloat = function(e, t) {
        return getRoundedFloat(e, t)
    }, e.isShowSubsCategoryForPromotionPage = function(e) {
        for (var t = 0; t < e.length; t++)
            if (e[t].isShow && "subs-active" != e[t].statusClass) return !0;
        return !1
    };
    var T = function() {
        for (var t = 0; t < e.subsArr.length; t++) {
            for (var s = !1, r = e.subsArr[t] || {}, a = 0; a < e.allTestsObj.comboPacks.length; a++)
                if (e.allTestsObj.comboPacks[a].subsArr || (e.allTestsObj.comboPacks[a].subsArr = []), e.allTestsObj.comboPacks[a].categoryId == e.subsArr[t].category) {
                    s = !0, e.allTestsObj.comboPacks[a].subsArr.push(e.subsArr[t]);
                    break
                }
            if (!s) {
                var o = r.category || "",
                    i = e.allCategoryObjById[o] || {},
                    n = {
                        categoryId: o,
                        categoryName: i.name || "",
                        categoryOrder: i.order,
                        orderBy: i.sort,
                        sortOrder: i.sortOrder,
                        value: [],
                        subsArr: [r]
                    };
                e.allTestsObj.comboPacks.push(n)
            }
        }
    };
    e.showSubReleasePlan = function(e) {
        n.releasePlanBtnClicked(e)
    }, e.showCalculationPlan = function(e) {
        n.calcSavingsBtnClicked(e, e.calcData, e.courseSelectionDS)
    }, e.filteredRenewItems = [], e.showRenewSubscriptionModal = function() {
        e.filteredRenewItems = n.mockTestSubsFilter(e.currentCourseName, e.purchasedSubsMap, e.subsArr), n.renewSubscriptionBtnClicked()
    }, e.isSubscriptionActive = !1;
    var h = function(t) {
        for (var s = 0; s < t.length; s++) t[s].isActive && !t[s].isExpired && (e.isSubscriptionActive = !0);
        var r = function(t) {
                for (var s = 0; s < e.allTestsObj[t].length; s++)
                    for (var r = e.allTestsObj[t][s].value || [], a = 0; a < r.length; a++) r[a].cardClass = v(r[a], [], !1, e.isSubscriptionActive)
            },
            a = function(t) {
                for (var s in e.courseIdToExpiryMap)
                    if (e.courseIdToExpiryMap.hasOwnProperty(s))
                        for (var r = e.allTestsObj[t], a = 0; a < r.length; a++) r[a].courses && r[a].courses[0] && s == r[a].courses[0].id && e.courseIdToExpiryMap[s].expiry - (new Date).getTime() > 0 && (r[a].cardClass = v(r[a], [], !1, !0))
            },
            o = function(t) {
                for (var s in e.courseIdToExpiryMap)
                    if (e.courseIdToExpiryMap.hasOwnProperty(s))
                        for (var r = 0; r < t.length; r++) t[r].courses && t[r].courses.length && s == t[r].courses[0].id && e.courseIdToExpiryMap[s].expiry - (new Date).getTime() > 0 && (t[r].cardClass = v(t, [], !1, !0))
            };
        e.isPromotionsPage ? (a("packs"), a("comboPacks")) : e.isCoursePage ? (o(e.packsArrForCourses), o(e.combosArrForCourses)) : (r("packs"), r("comboPacks"))
    };
    e.storeProducts = function(t, s) {
        for (var r = [], a = 0; a < t.length; a++) t[a].cost > 0 && t[a].items && t[a].items.length > 1 && r.push(t[a]);
        var o = e.getCompleteSortedCategorizedItemsArr(r, s, !0) || [];
        "pack" == s.toLowerCase() ? e.allTestsObj.packs = e.getSortedObjArrByKey(o, "categoryOrder", "asc") : "combo" == s.toLowerCase() && (e.allTestsObj.comboPacks = e.getSortedObjArrByKey(o, "categoryOrder", "asc")), e.isCoursePage && !e.sid && e.initializeCoursePage()
    }, e.freeTabClass = "", e.packsTabClass = "", e.comboTabClass = "", e.isShowTabsOnCoursesPage = !1, e.initializeCoursePage = function() {
        e.testsArrForCourses = e.getFreeTestsArrForCoursesPage(e.allTestsObj.nonProducts) || [], e.packsArrForCourses = e.getPacksForCoursesPage(e.allTestsObj.nonProducts, e.allTestsObj.packs) || [], e.combosArrForCourses = e.getArrFromCategoryArr(e.allTestsObj.comboPacks) || [], e.combosArrForCourses && e.combosArrForCourses.length || e.subsArr && e.subsArr.length ? (e.comboTabClass = "active", e.packsTabClass = "", e.freeTabClass = "", toggleScrollButtons("combos_tests_scroll")) : e.packsArrForCourses && e.packsArrForCourses.length ? (e.packsTabClass = "active", e.freeTabClass = "", e.comboTabClass = "", toggleScrollButtons("packs_tests_scroll")) : (e.freeTabClass = "active", e.packsTabClass = "", e.comboTabClass = "", toggleScrollButtons("free_tests_scroll")), setTimeout(function() {
            $(".tab-head>li.active").click()
        }, 1e3), (e.testsArrForCourses.length || e.packsArrForCourses.length || e.combosArrForCourses.length) && (e.isShowTabsOnCoursesPage = !0)
    }, e.enrollNowBtnClicked = function() {
        var t = function(e, t, s, r) {
            for (var a = window.location.href, o = !0, i = 0; i < e.length; i++)
                if (a.indexOf(e[i]) == -1) {
                    o = !1;
                    break
                }
            o && TBAnalytics.hooks.event(t, s, r, 1)
        };
        t(["/ssc-cgl"], "Button - Enroll Now", "Click", "SSC/CGL - Enroll Now");
        var s = {};
        s[REDIRECT_URL_KEY] = "/" + e.curCourseURL + "/mocktest", s[COURSE_IDS_KEY] = e.currentCourseId, openSignUpSignInModal(s, !1)
    }, e.getFreeTestsArrForCoursesPage = function(e) {
        for (var t = [], s = 0; s < e.length; s++) 0 != e[s].cost || e[s].isAlreadyPurchased || t.push(e[s]);
        return t
    }, e.getPacksForCoursesPage = function(t, s) {
        for (var r = [], a = 0; a < t.length; a++) t[a].cost > 0 && t[a].items && t[a].items.length > 1 && r.push(t[a]);
        return r = r.concat(e.getArrFromCategoryArr(s))
    }, e.getArrFromCategoryArr = function(e) {
        e = e && e.length && e || [];
        for (var t = [], s = 0; s < e.length; s++)
            for (var r = e[s].value, a = 0; a < r.length; a++) {
                var o = r[a];
                o.isAlreadyPurchased || o.isHide || t.push(o)
            }
        return t = t && t.length && t || []
    }, e.getCompleteSortedCategorizedItemsArr = function(t, s, r, a) {
        var o = [];
        for (var i in e.allCategoryObjById)
            if (e.allCategoryObjById.hasOwnProperty(i)) {
                for (var n = e.allCategoryObjById[i], c = {
                        categoryId: i,
                        categoryName: n.name,
                        categoryOrder: n.order,
                        orderBy: n.sort,
                        sortOrder: n.sortOrder,
                        value: []
                    }, l = 0; l < t.length; l++) {
                    var d = t[l],
                        u = d && d.category;
                    if (i == u) {
                        d.categoryObj = n;
                        var f = {};
                        f = "test" == s && r ? e.storeProductsHelper(t[l], s) : "pack" == s || "combo" == s && r ? e.storeProductsHelper(t[l], s) : t[l], f.id && c.value.push(f)
                    }
                }
                c.value.length && (c.alreadyPurchasedTestCount = e.getAlreadyPurchasedTestCount(c.value) || 0, c.remainingTestsCount = c.value.length - c.alreadyPurchasedTestCount, a ? c.value = e.getSortedObjArrByKey(c.value, c.orderBy, a) : c.value = e.getSortedObjArrByKey(c.value, c.orderBy, c.sortOrder), o.push(c))
            }
        return o
    }, e.getAlreadyPurchasedTestCount = function(t) {
        for (var s = 0, r = 0; r < t.length; r++) {
            var a = t[r].id;
            e.myTestsIdObjMAP[a] && (s += 1)
        }
        return s
    }, e.storeProductsHelper = function(t, s) {
        var r = e.checkForComboPack(t);
        if (r || "pack" != s) {
            if (r && "combo" == s) {
                var a = e.getAllTestsOfComboPacks(t.items),
                    o = {};
                return o.id = t._id, o.items = t.items, o.addedPids = b(t.items), o.categorizedSortedPackTests = e.getCompleteSortedCategorizedItemsArr(a, "test", !1, "asc"), o.availTill = new Date(t.availTill).getTime() || u, o.category = t.category, o.categoryObj = t.categoryObj, o.categoryOrder = t.categoryObj && t.categoryObj.order || 10, o.cost = t.cost, o.createdOn = t.createdOn, o.description = t.description || "", o.isCustom = t.isCustom, o.minPrice = t.minPrice, o.oldCost = t.oldCost || 0, o.availFrom = new Date(t.releaseDate).getTime(),
                    o.specificExams = e.getSpecificExamNamesArr(t.specificExams) || [], o.course = t.course ? t.course.name : "", o.courses = t.courses || [], o.stage = t.stage, o.title = t.title || "", o.offerText = "SAVE RS. " + (o.oldCost - o.cost), o.features = t.features || [], o.recommendedFor = t.recommendedFor || "", o.comboPackDetails = e.getComboPackDetailsObj(a), o.type = t.type || "others", o.isCombo = !0, o.comboPackTests = a, o.isHide = t.isHidden || !1, o.isShow = !o.isHide, o.isHighlight = t.isRecommended, o.cardClass = v(o, [], !1), o
            }
            return {}
        }
        var i = t.isHidden,
            n = e.getProcessedItems(t.items || [], i, t._id),
            o = {};
        return o.id = t._id, o.items = n, o.categorizedSortedPackTests = e.getCompleteSortedCategorizedItemsArr(n, "test", !1, "asc"), o.availTill = new Date(t.availTill).getTime() || u, o.category = t.category, o.categoryObj = t.categoryObj || {}, o.categoryOrder = t.categoryObj && t.categoryObj.order || 10, o.cost = t.cost || 0, o.createdOn = t.createdOn, o.description = t.description || "", o.isCustom = t.isCustom || !1, o.minPrice = t.minPrice || 0, o.oldCost = t.oldCost || 0, o.availFrom = new Date(t.releaseDate).getTime(), o.specificExams = e.getSpecificExamNamesArr(t.specificExams) || [], o.course = t.course ? t.course.name : "", o.courses = t.courses || [], o.stage = t.stage, o.title = t.title || "", o.offerText = t.discountText, o.packDetails = e.getTestDetailsObj(n), o.type = t.type || "others", o.isCombo = !1, o.isHide = !!(new Date(t.releaseDate) > new Date || t.isHidden), o.isShow = !o.isHide, o.cardClass = v(o, [], !1), o
    };
    var b = function(e) {
        for (var t = [], s = 0; s < e.length; s++) t.push(e[s].id);
        return t
    };
    e.getComboPackDetailsObj = function(t) {
        var s = {},
            r = e.getCompleteSortedCategorizedItemsArr(t, "test", !1);
        return s.alreadyPurchasedTestsCount = e.checkForPartialCombo(t), s.remainingTestsCount = t.length - s.alreadyPurchasedTestsCount, s.testsArr = r, s.total = t.length, s
    }, e.checkForPartialCombo = function(e) {
        for (var t = 0, s = 0; s < e.length; s++) e[s].isAlreadyPurchased && (t += 1);
        return t
    }, e.getAllTestsOfComboPacks = function(t) {
        for (var s = [], r = 0; r < t.length; r++)
            if ("test" != t[r].type || e.checkIfTestAlreadyExistInArr(s, t[r].id))
                for (var a = e.mapPidToItems[t[r].id] || [], o = 0; o < a.length; o++) e.checkIfTestAlreadyExistInArr(s, t[r].id) || (a[o].pid = t[r].id, s.push(a[o]));
            else s.push(e.getTestObj(t[r]));
        return s
    }, e.checkIfTestAlreadyExistInArr = function(e, t) {
        for (var s = 0; s < e.length; s++)
            if (e && e[s] && e[s].id == t) return !0;
        return !1
    }, e.getItemsOfPackFromId = function(t, s, r) {
        for (s = s && s.length ? s : [], r = r && r.length ? r : [], o = 0; o < s.length; o++) {
            var a = s[o];
            if (a.id == t) return [a]
        }
        if (e.isPromotionsPage) {
            for (var o = 0; o < r.length; o++)
                if (r[o].id == t) return r[o].items || []
        } else
            for (var o = 0; o < r.length; o++)
                for (var i = r[o].value, n = 0; n < i.length; n++)
                    if (i[n].id == t) return i[n].items || []; return []
    }, e.getProcessedItems = function(t, s, r) {
        t || (t = []);
        for (var a = 0; a < t.length; a++) t[a] = e.getTestObj(t[a]), t[a].testDetails = e.getTestDetailsObj([t[a]]), t[a].isPartOfHiddenProduct = s || !1, t[a].pid = r;
        return t
    }, e.getTestDetailsObj = function(t) {
        t = t ? t : [];
        for (var s = {
                questionsCount: 0,
                testsCount: t.length,
                time: 0,
                marks: 0
            }, r = 0; r < t.length; r++) {
            var a = t[r].pattern || {};
            s.questionsCount = s.questionsCount + e.getQuestionsCount(a && a.sections || [], "qCount"), s.time = s.time + (a.time || 0), s.marks = s.marks + e.getQuestionsCount(a.sections, "maxM")
        }
        return s
    }, e.getQuestionsCount = function(e, t) {
        e = e ? e : [];
        for (var s = 0, r = 0; r < e.length; r++) s += e[r][t];
        return s
    };
    var v = function(t, s, r, a) {
        s = s && s.length ? s : [];
        var o = "";
        return t.oldCost && (o = "has-old-price"), t.offerText && (o = o ? o + " has-offer" : o + "has-offer"), t.isHighlight && (o = o ? o + " complete-pack" : o + "complete-pack"), t.specificExams && t.specificExams.length && (o = o ? o + " has-tags" : o + "has-tags"), t.isRecommended && e.isPromotionsPage && (o = o ? o + " is-recommended" : o + "is-recommended"), t.isPartOfCart || s.indexOf(t.id) == -1 || (o = o ? o + " subset-already-added" : o + "subset-already-added"), r && (o = o ? o + " added-to-cart" : "added-to-cart"), a && (o = o ? o + " subs-active" : o + "subs-active"), o
    };
    e.checkForComboPack = function(e) {
        for (var t = e.items || [], s = 0; s < t.length; s++)
            if ("product" == t[s].type) return !0;
        return !1
    }, e.checkForLiveTest = function(e) {
        return e = new Date(e).getTime(), e > u
    }, e.testTypes = [], e.allTestsObj = {
        nonProducts: [],
        comboPacks: [],
        packs: []
    }, e.paidTestsOfExpiredProducts = [], e.totalAttemptedTests = 0, e.currentTime = new Date, e.testIdToTestMAP = {}, e.getProductDetailsSCB = function(t) {
        if (e.coinsPercentage = t && t.data && t.data.coinsPercentage || 0, e.setAllCategories(t.data.categories || []), e.currentTime = 1e3 * t.data.current_time, e.setTimerForCurrentTime(), e.makeMapOfPidToItems(t.data.products), e.isPromotionsPage) hideLoader(), e.promotionsMap = e.getPromotionsMap(t.data.live_promotion), t.data.products = m(t.data.products), e.processPromotions(t), n.callDataLayerFunction();
        else if (e.isCoursePage) {
            e.totalAttemptedTests = t.data.total_attempted_tests ? t.data.total_attempted_tests : 0, e.storeNonProducts(e.allTestsObj.nonProducts || [], t.data.tests || [], t.data.products || []), e.storeTestsOfExpiredProducts = t.data.paid_tests || [];
            var s = m(t.data.products);
            if (e.storeProducts(s || [], "pack"), e.storeProducts(s || [], "combo"), e.sid && "-1" != e.sid) {
                var r = {
                    medium: "web"
                };
                o.getStudentDetails(e.sid, e.currentCourseId, r, e.getStudentDetailsSCB)
            } else hideLoader(), e.makeTestIdToTestMap([]), e.getTotalCourseDetails(), e.initializeCoursePage(), n.callDataLayerFunction()
        } else {
            e.totalAttemptedTests = t.data.total_attempted_tests ? t.data.total_attempted_tests : 0, e.storeNonProducts(e.allTestsObj.nonProducts || [], t.data.tests || [], t.data.products || []), e.storeTestsOfExpiredProducts = t.data.paid_tests || [];
            var s = m(t.data.products);
            e.storeProducts(s || [], "pack"), e.storeProducts(s || [], "combo");
            var r = {
                medium: "web"
            };
            o.getStudentDetails(e.sid, e.currentCourseId, r, e.getStudentDetailsSCB)
        }
        scrollToLoc(), c()
    }, e.mapPidToItems = {}, e.mapPidToProduct = {}, e.makeMapOfPidToItems = function(t) {
        t = t && t.length ? t : [];
        for (var s = 0; s < t.length; s++) e.mapPidToItems[t[s]._id] || (e.mapPidToItems[t[s]._id] = t[s].items || []), e.mapPidToProduct[t[s]._id] = t[s] || {}
    }, e.allTestsObj = {}, e.allTestsObj.nonProducts = [], e.allTestsObj.packs = [], e.allTestsObj.comboPacks = [], e.promotionsMap = {}, e.promo = {
        title: "",
        description: ""
    }, e.showTestDetails = !0, e.processPromotions = function(t) {
        e.liveTestIdForPromotions = t.data.live_promotion.testId, e.promotionEndTime = t.data.live_promotion.expiresOn;
        var r = t.data.products || [],
            a = [],
            o = t.data.tests || [];
        e.currentTime = 1e3 * t.data.current_time, e.setTimerForCurrentTime(), e.promotionsTimer(), e.mycoins = t.data.coins, e.liveTestEndTime = t.data.live_test_end_time, e.promo.title = t.data.live_promotion.title || "", e.promo.description = t.data.live_promotion.description || "", new Date(e.liveTestEndTime).getTime() < e.currentTime && (e.showTestDetails = !1);
        for (var i = 0; i < r.length; i++) 0 == r[i].cost || r[i].items && 1 == r[i].items.length ? o.push(r[i]) : a.push(r[i]);
        for (var i = 0; i < o.length; i++) {
            var n = e.getTestObj(o[i]);
            n = e.addPromotionsDetails(n, 0), e.allTestsObj.nonProducts.push(n)
        }
        for (var i = 0; i < a.length; i++) {
            var n = a[i];
            if (!e.checkForComboPack(a[i])) {
                var c = e.storeProductsHelper(n, "pack");
                c = e.addPromotionsDetails(c, 0), c.cardClass = v(c, [], !1), e.allTestsObj.packs.push(c)
            }
        }
        for (var i = 0; i < a.length; i++) {
            var n = a[i];
            if (e.checkForComboPack(a[i])) {
                var c = e.storeProductsHelper(n, "combo");
                c = e.addPromotionsDetails(c, 0), c.cardClass = v(c, [], !1), e.allTestsObj.comboPacks.push(c)
            }
        }
        s(function() {
            initHorizontalScroll()
        }, 1e3)
    }, e.hasResultAnnounced = function() {
        var t = new Date(e.liveTestEndTime),
            s = new Date;
        return s.getTime() > t.getTime()
    }, e.promotionEndTime = "", e.promotionsTimerTime = "";
    var y = function(e) {
        return e < 10 ? "0" + e : "" + e
    };
    e.getTime = function(e) {
        var t = e,
            s = Math.floor(t / 60),
            r = Math.floor(s / 60),
            a = Math.floor(r / 24);
        return {
            secs: y(t % 60),
            mins: y(s % 60),
            hrs: y(r % 24),
            days: y(a)
        }
    }, e.renderTimer = function(t) {
        var s = e.getTime(t);
        e.promotionsTimerTime = s.hrs + ":" + s.mins + ":" + s.secs, s.days > 0 && (e.promotionsTimerTime = s.days + ":" + e.promotionsTimerTime)
    }, e.promotionsTimer = function() {
        var t = new Date(e.currentTime),
            s = (new Date(e.promotionEndTime) - t) / 1e3;
        s > 0 && r(function() {
            e.renderTimer(s--)
        }, 1e3, 0, !0)
    }, e.addPromotionsDetails = function(t, s) {
        s = s ? s : 1;
        var r = e.promotionsMap[t.id] || {};
        return t.oldCost = t.oldCost || 0, t.newCost = 0, r && r.discType && (t.newCost = Math.floor("percent" == r.discType ? t.cost - t.cost * r.discount / 100 * s : t.cost - r.discount * s), t.offerText = "SAVE RS. " + (t.oldCost - t.newCost), t.isRecommended = r.recommended, t.cost = t.newCost || 0), t
    }, e.getPromotionsMap = function(e) {
        for (var t = {}, s = e.products || [], r = e.tests || [], a = 0; a < s.length; a++) t[s[a].pid] = s[a];
        for (var a = 0; a < r.length; a++) t[r[a].tid] = r[a];
        return t
    }, e.setTimerForCurrentTime = function() {
        e.currentTime = e.currentTime + 1e3, currentTimeInMS = e.currentTime, s(function() {
            e.setTimerForCurrentTime()
        }, 1e3)
    }, e.promotionsArr = [], e.bannerClass = "show-normal-banner", e.getBannerDetails = function(t) {
        "557af9de0ea5ce31f052918b" == e.currentCourseId ? e.bannerClass = "show-special-banner" : t.promotions && (e.promotionsArr = t.promotions || [])
    }, e.totalQuestionsCount = 0, e.totalTestsCount = 0, e.getTotalCourseDetails = function() {
        e.totalTestsCount = e.getTotalTestCount(), e.totalQuestionsCount = e.getTotalQuestionsCount()
    }, e.getTotalTestCount = function() {
        e.myTestsIds = e.myTestsIds && e.myTestsIds.length && e.myTestsIds || [];
        var t = 0;
        for (var s in e.testIdToTestMAP) {
            var r = e.testIdToTestMAP[s];
            (!r.isPartOfHiddenProduct || r.isPartOfHiddenProduct && e.myTestsIds.indexOf(r.id) != -1 || r.isPartOfHiddenProduct && e.myProductIds.indexOf(r.pid) == -1) && (t += 1)
        }
        return t
    }, e.getTotalQuestionsCount = function() {
        e.myTestsIds = e.myTestsIds && e.myTestsIds.length && e.myTestsIds || [];
        var t = 0;
        for (var s in e.testIdToTestMAP) {
            var r = e.testIdToTestMAP[s];
            r && r.testDetails && (!r.isPartOfHiddenProduct || r.isPartOfHiddenProduct && e.myTestsIds.indexOf(r.id) != -1 || r.isPartOfHiddenProduct && e.myProductIds.indexOf(r.id) == -1) && (t += r.testDetails.questionsCount)
        }
        return t
    }, e.makeTestIdToTestMap = function(t) {
        e.testIdToTestMAP = {};
        for (var s = 0; s < e.allTestsObj.nonProducts.length; s++) e.allTestsObj.nonProducts[s].items && !e.allTestsObj.nonProducts[s].isHide ? e.makeTestIdToTestMapHelper(e.allTestsObj.nonProducts[s].items) : e.allTestsObj.nonProducts[s].items || e.makeTestIdToTestMapHelper([e.allTestsObj.nonProducts[s]]);
        for (var s = 0; s < e.allTestsObj.packs.length; s++)
            for (var r = e.allTestsObj.packs[s].value, a = 0; a < r.length; a++) r[a].isHide || e.makeTestIdToTestMapHelper(r[a].items);
        for (var s = 0; s < e.allTestsObj.comboPacks.length; s++)
            for (var r = e.allTestsObj.comboPacks[s].value, a = 0; a < r.length; a++) e.makeTestIdToTestMapHelper(r[a].comboPackTests);
        e.makeTestIdToTestMapHelper(t)
    }, e.makeTestIdToTestMapHelper = function(t) {
        if (!t || !t.length) return !1;
        for (var s = 0; s < t.length; s++) {
            var r = t[s];
            e.testIdToTestMAP[r.id] = r
        }
    }, e.mycoins = 0, e.myProductIds = [], e.appCourses = [], e.studentApiData = {};
    var C = 0;
    e.getStudentDetailsSCB = function(t) {
        hideLoader(), C += 1, e.studentApiData = t, 2 == C && P(e.studentApiData)
    };
    var P = function(s) {
        e.hindiTestsScope.askForProductChangeArr = s && s.data && s.data.askForProductChange || [], e.setResumableTests(s);
        var r = s.data.attemptedTests || [];
        e.myTestsIds = e.getAllTestIdsAssignedToStudent(s) || [], e.appCourses = s.data.appCourses || [], e.mycoins = s.data.coins, t.$broadcast("SET_MY_COINS", {
            mycoins: e.mycoins
        });
        var a = e.getAllTestsAssignedToStudent(s);
        e.setMyTests(a, r, s.data.attemptedTestsDetails), e.getBannerDetails(s.data), a.length || e.isCoursePage || e.manageTabs("all"), e.isCoursePage || e.initializeCartOnPageLoad(s), setViewMoreViewLess("#my_test_tab .tests-sections .packs-container"), e.isInit = !0, e.checkForCartProductInURL(), e.txnId || n.callDataLayerFunction();
        var i = s && s.data && s.data.attemptedTestsDetails || [],
            l = function(t) {
                var s = function(s) {
                        if (s && s.data && s.data.length) {
                            for (var r = [], a = 0; a < s.data.length; a++) r.push(e.getTestObj(s.data[a]));
                            var o = e.processAttemptedTests(r, i || []);
                            e.attemptedTestsArr = e.getSortedAttemptedTestsArr(o, t), e.attemptedCategorizedArr = e.getCompleteSortedCategorizedItemsArr(r, "test", !1), setViewMoreViewLess("#attempted_test_tab .tests-sections .packs-container")
                        }
                        c()
                    },
                    r = function(e) {
                        console.log(e)
                    },
                    a = {
                        courseId: e.currentCourseId,
                        tests: t.join(","),
                        isAttemptedCase: !0
                    };
                o.getExpiredAttemptedTests(a, s, r)
            };
        r && r.length && l(r), c(), h(e.subsArr)
    };
    e.resumableTestsMAP = {}, e.resumableTestsIdsArr = [], e.setResumableTests = function(t) {
        var s = t.data.resumableTests || [];
        e.resumableTestsIdsArr = s;
        for (var r = 0; r < s.length; r++) e.resumableTestsMAP[s[r]] = !0
    }, e.admitCardInfoMap = {}, e.makeSpecificExamIdMapForAdmitCardInfo = function(t) {
        for (var s = 0; s < t.length; s++) e.admitCardInfoMap[t[s]] = !0
    }, e.getAllTestIdsAssignedToStudent = function(t) {
        var s = [];
        if (t.data.tests && t.data.tests.length && (s = t.data.tests), t.data.products && t.data.products.length)
            for (var r = t.data.products || [], a = 0; a < r.length; a++)
                if (e.myProductIds.indexOf(r[a].pid) == -1 && e.myProductIds.push(r[a].pid), r[a].tests && r[a].tests.length && (s = s.concat(r[a].tests)), r[a].products && r[a].products.length)
                    for (var o = r[a].products || [], i = 0; i < o.length; i++) e.myProductIds.indexOf(o[i].pid) == -1 && e.myProductIds.push(o[i].pid), s = s.concat(o[i].tests);
        return s
    }, e.removeDupclicateItemsFromArr = function(e) {
        for (var t = {}, e = [], s = 0; s < e.length; s++) t[e[s]] = 0;
        for (var r in e) e.push(r);
        return e
    };
    var A = {};
    e.initializeCartOnPageLoad = function(s) {
        var r = [];
        if (s && s.data && s.data.cart && s.data.cart.products) {
            for (var a = {
                    cartItemsArr: s.data.cart.products,
                    isOpenFlyout: !1,
                    mycoins: e.mycoins,
                    isAddWithCoins: !1,
                    isSyncWithServer: !1,
                    coinsPercentage: e.coinsPercentage
                }, o = 0; o < a.cartItemsArr.length; o++) {
                if (r.push(a.cartItemsArr[o].pid), a.cartItemsArr[o].id = a.cartItemsArr[o].pid, a.cartItemsArr[o].items = [{
                        pid: a.cartItemsArr[o].pid
                    }], n.subsBundleIdToObjMap[a.cartItemsArr[o].id] && (a.cartItemsArr[o].validityInString = n.getValidMonth(a.cartItemsArr[o].validity) > 1 ? n.getValidMonth(a.cartItemsArr[o].validity) + " Months" : n.getValidMonth(a.cartItemsArr[o].validity) + " Month", a.cartItemsArr[o].exams))
                    for (var i = 0; i < a.cartItemsArr[o].exams.length; i++) A[a.cartItemsArr[o].exams[i]] = 1;
                a.cartItemsArr[o].products && (a.cartItemsArr[o].items[0].products = a.cartItemsArr[o].products), a.cartItemsArr[o].tests && (a.cartItemsArr[o].items[0].tests = a.cartItemsArr[o].tests), delete a.cartItemsArr[o].pid, delete a.cartItemsArr[o].products, delete a.cartItemsArr[o].tests
            }
            a && a.cartItemsArr && a.cartItemsArr.length && t.$broadcast("ADD_TO_CART", a)
        }
        r && r.length && e.resetItemsForCartStatus(r, !0)
    }, e.myTestsArr = [], e.attemptedTestsArr = [], e.attemptedCategorizedArr = [], e.resumableTestsArr = [], e.setMyTests = function(t, s, r) {
        for (var a = [], o = [], i = 0; i < t.length; i++)
            if (e.resumableTestsMAP[t[i].id]) {
                t[i].myCardClass = e.getClassForMyTests(t[i]), t[i].pattern.title = "Paused Tests";
                var n = t[i].categoryObj.name;
                t[i].categoryObj = e.allCategoryObjById[-1], t[i].categoryObj.name = n, t[i].pausedTestOrder = e.resumableTestsIdsArr.indexOf(t[i].id), e.resumableTestsArr.push(t[i])
            } else t && t[i] && "-1" != s.indexOf(t[i].id) ? (t[i].isAttempted = !0, t[i].isShow = !0, o.push(t[i])) : t && t[i] && "-1" != s.indexOf(t[i].id) ? (t[i].isAttempted = !0, t[i].isShow = !0, o.push(t[i])) : (t[i].myCardClass = e.getClassForMyTests(t[i]), a.push(t[i]));
        if (e.attemptedCategorizedArr = e.getCompleteSortedCategorizedItemsArr(o, "test", !1), a.length && (e.myTestsArr = e.getCompleteSortedCategorizedItemsArr(a, "test", !1), e.setTimeForLiveTest()), e.resumableTestsArr.length && e.myTestsArr.unshift({
                categoryId: "-1",
                categoryName: "Paused Tests",
                categoryOrder: -1,
                orderBy: "availFrom",
                sortOrder: "desc",
                value: e.getSortedObjArrByKey(e.resumableTestsArr, "pausedTestOrder", "asc")
            }), o.length) {
            var c = e.processAttemptedTests(o, r || []);
            e.attemptedTestsArr = e.getSortedAttemptedTestsArr(c, s)
        }
        e.setFiltersMocktest()
    }, e.getSortedAttemptedTestsArr = function(e, t) {
        for (var s = {}, r = [], a = 0; a < e.length; a++) s[e[a].id] = e[a];
        for (var a = 0; a < t.length; a++) s[t[a]] && r.push(s[t[a]]);
        return r
    }, e.getFilterDefaultObj = function(t) {
        var s = {};
        return s = "all" == t ? {
            courses: [],
            specificExams: [],
            packTypes: [],
            courseSpecObj: {},
            priceFilter: [{
                low: e.minPriceValue,
                high: e.maxPriceValue,
                selected: !0,
                value: e.minPriceValue + "-" + e.maxPriceValue
            }]
        } : {
            specificExams: [],
            testTypes: [],
            testStates: [],
            testTitle: ""
        }
    }, e.resetFilters = function(t) {
        "all" == t ? e.setFiltersForAllTests() : e.setFiltersForMyTests(), $("#mocktestPriceSlider_1").slider("refresh"), $("#mocktestPriceSlider_2").slider("refresh"), e.allFiltersTagsArr = [], e.myFiltersTagsArr = []
    }, e.scrollToFilterResults = function() {
        var e = $("#js-scholarship-banner").outerHeight() || 0;
        $("html, body").animate({
            scrollTop: $(".js-mocktest-tabs").offset().top + 1 - e
        }, 500)
    }, e.minPriceValueSelected = 0, e.maxPriceValueSelected = e.maxPriceValue, e.manageFilters = function(t, s, r) {
        if (e.filterResultExistsForAll = !1, e.filterResultExistsForMy = !1, e.searchedMyTestsCount = 0, e.searchedTestsMap = {}, "price_1" == t.value) {
            var a = document.getElementById("mocktestPriceSlider_1").value.split(",");
            e.minPriceValueSelected = a[0], e.maxPriceValueSelected = a[1]
        } else if ("price_2" == t.value) {
            var a = document.getElementById("mocktestPriceSlider_2").value.split(",");
            e.minPriceValueSelected = a[0], e.maxPriceValueSelected = a[1]
        }
        e.setFiltersTags(r)
    }, e.checkIfAllUnselected = function(e) {
        for (var t = !0, s = 0; s < e.length; s++) e[s].selected && (t = !1);
        return t
    }, e.setFiltersTags = function(t) {
        "my" == t ? e.setMyFiltersTags() : e.setAllFiltersTags()
    }, e.setFltersForSelectOnly = function(t, s, r) {
        2 == s.length && (s[0].selected = !0);
        for (var a = 0; a < s.length; a++) s[a].selected = s[a].value == t.value;
        e.setFiltersTags(r)
    }, e.removeFilter = function(t, s) {
        if (t.selected = !1, "priceFilter" == t.type) {
            for (var r = 0; r < e.allFiltersTagsArr.length; r++) "priceFilter" == e.allFiltersTagsArr[r].type && e.allFiltersTagsArr.splice(r, 1);
            $("#mocktestPriceSlider_1").slider("refresh"), $("#mocktestPriceSlider_2").slider("refresh"), e.maxPriceValueSelected = e.maxPriceValue, e.minPriceValueSelected = e.minPriceValue
        } else "all" == s ? e.manageFilters(t, e.filter[t.type], s) : e.manageFilters(t, e.myFilter[t.type], s)
    }, e.allFiltersTagsArr = [], e.setAllFiltersTags = function() {
        if (e.allFiltersTagsArr = [], e.filter.specificExams)
            for (var t = 0; t < e.filter.specificExams.length; t++) {
                var s = e.filter.specificExams[t];
                s.selected && (s.type = "specificExams", e.allFiltersTagsArr.push(s))
            }
        if (e.filter.packTypes)
            for (var t = 0; t < e.filter.packTypes.length; t++) {
                var s = e.filter.packTypes[t];
                s.selected && (s.type = "packTypes", e.allFiltersTagsArr.push(s))
            }
        if (e.minPriceValue != e.minPriceValueSelected || e.maxPriceValue != e.maxPriceValueSelected) {
            var s = {
                value: e.minPriceValueSelected + "-" + e.maxPriceValueSelected,
                selected: !0,
                type: "priceFilter"
            };
            e.allFiltersTagsArr.push(s)
        }
    }, e.myFiltersTagsArr = [], e.setMyFiltersTags = function() {
        if (e.myFiltersTagsArr = [], e.myFilter.specificExams)
            for (var t = 0; t < e.myFilter.specificExams.length; t++) {
                var s = e.myFilter.specificExams[t];
                s.selected && (s.type = "specificExams", e.myFiltersTagsArr.push(s))
            }
        if (e.myFilter.testTypes)
            for (var t = 0; t < e.myFilter.testTypes.length; t++) {
                var s = e.myFilter.testTypes[t];
                s.selected && (s.type = "testTypes", e.myFiltersTagsArr.push(s))
            }
        if (e.myFilter.testStates)
            for (var t = 0; t < e.myFilter.testStates.length; t++) {
                var s = e.myFilter.testStates[t];
                s.selected && (s.type = "testStates", e.myFiltersTagsArr.push(s))
            }
    }, e.setFiltersMocktest = function() {
        e.setFiltersForAllTests(), e.setFiltersForMyTests(), e.setMyFiltersTags("all"), e.setMyFiltersTags("my")
    }, e.myFilter = {}, e.setFiltersForMyTests = function() {
        e.myFilter = e.getFilterDefaultObj("my"), e.attemptedTestsArr.length && !e.checkIfObjectAlreadyExist(e.myFilter.testStates, "attempted") && e.myFilter.testStates.push({
            value: "Attempted",
            selected: !1
        }), e.myTestsArr.length && !e.checkIfObjectAlreadyExist(e.myFilter.testStates, "not-attempted") && e.myFilter.testStates.push({
            value: "Not Attempted",
            selected: !1
        });
        for (var t = 0; t < e.attemptedTestsArr.length; t++) {
            var s = e.attemptedTestsArr[t];
            if (s.specificExams && s.specificExams.length)
                for (var r = 0; r < s.specificExams.length; r++) s.specificExams && !e.checkIfObjectAlreadyExist(e.myFilter.specificExams, s.specificExams[r]) && e.myFilter.specificExams.push({
                    value: s.specificExams[r],
                    selected: !1
                });
            s.pattern && !e.checkIfObjectAlreadyExist(e.myFilter.testTypes, s.pattern.title) && s.pattern.title ? e.myFilter.testTypes.push({
                value: s.pattern.title,
                selected: !1
            }) : e.checkIfObjectAlreadyExist(e.myFilter.testTypes, "others") || e.myFilter.testTypes.push({
                value: "others",
                selected: !1
            })
        }
        for (var t = 0; t < e.myTestsArr.length; t++)
            for (var a = e.myTestsArr[t].value, o = 0; o < a.length; o++) {
                var s = a[o] || [];
                if (s.specificExams && s.specificExams.length)
                    for (var r = 0; r < s.specificExams.length; r++) s.specificExams && !e.checkIfObjectAlreadyExist(e.myFilter.specificExams, s.specificExams[r]) && e.myFilter.specificExams.push({
                        value: s.specificExams[r],
                        selected: !1
                    });
                s.pattern && !e.checkIfObjectAlreadyExist(e.myFilter.testTypes, s.pattern.title) && s.pattern.title ? e.myFilter.testTypes.push({
                    value: s.pattern.title,
                    selected: !1
                }) : e.checkIfObjectAlreadyExist(e.myFilter.testTypes, "others") || e.myFilter.testTypes.push({
                    value: "others",
                    selected: !1
                })
            }
    }, e.checkIfObjectAlreadyExist = function(e, t) {
        e = e || [];
        for (var s = 0; s < e.length; s++)
            if (e[s].value == t && t) return !0;
        return !1
    }, e.filter = {}, e.minPriceValue = 0, e.maxPriceValue = 0, e.priceValue = "", e.setFiltersForAllTests = function() {
        e.filter = e.getFilterDefaultObj("all");
        for (var t = 0; t < e.allTestsObj.nonProducts.length; t++) {
            var s = e.allTestsObj.nonProducts[t];
            if (e.minPriceValue = e.minPriceValue > s.cost ? s.cost : e.minPriceValue, e.maxPriceValue = e.maxPriceValue < s.cost ? s.cost : e.maxPriceValue, s && s.specificExams && s.specificExams.length && !s.isHide)
                for (var r = 0; r < s.specificExams.length; r++) s.specificExams && !e.checkIfObjectAlreadyExist(e.filter.specificExams, s.specificExams[r]) && e.filter.specificExams.push({
                    value: s.specificExams[r],
                    selected: !1
                });
            s && s.type && !e.checkIfObjectAlreadyExist(e.filter.packTypes, s.type) && !s.isHide ? e.filter.packTypes.push({
                value: s.type || "others",
                selected: !1
            }) : s.type || e.checkIfObjectAlreadyExist(e.filter.packTypes, "others") || e.filter.packTypes.push({
                value: "others",
                selected: !1
            })
        }
        for (t = 0; t < e.allTestsObj.packs.length; t++) {
            var a = e.allTestsObj.packs[t].value;
            for (r = 0; r < a.length; r++) {
                var s = a[r];
                if (e.minPriceValue = e.minPriceValue > s.cost ? s.cost : e.minPriceValue, e.maxPriceValue = e.maxPriceValue < s.cost ? s.cost : e.maxPriceValue, s.specificExams && s.specificExams.length && !s.isHide)
                    for (var o = 0; o < s.specificExams.length; o++) e.checkIfObjectAlreadyExist(e.filter.specificExams, s.specificExams[o]) || e.filter.specificExams.push({
                        value: s.specificExams[o],
                        selected: !1
                    });
                !s.type || e.checkIfObjectAlreadyExist(e.filter.packTypes, s.type) || s.isHide ? s.type || e.checkIfObjectAlreadyExist(e.filter.packTypes, "others") || e.filter.packTypes.push({
                    value: "others",
                    selected: !1
                }) : e.filter.packTypes.push({
                    value: s.type || "others",
                    selected: !1
                })
            }
        }
        for (t = 0; t < e.allTestsObj.comboPacks.length; t++)
            for (a = e.allTestsObj.comboPacks[t].value, r = 0; r < a.length; r++) {
                var s = a[r];
                if (s && s.cost && (e.minPriceValue = e.minPriceValue > s.cost ? s.cost : e.minPriceValue, e.maxPriceValue = e.maxPriceValue < s.cost ? s.cost : e.maxPriceValue), s && s.specificExams && s.specificExams.length && !s.isHide)
                    for (o = 0; o < s.specificExams.length; o++) e.checkIfObjectAlreadyExist(e.filter.specificExams, s.specificExams[o]) || e.filter.specificExams.push({
                        value: s.specificExams[o],
                        selected: !1
                    });
                s && s.type && !e.checkIfObjectAlreadyExist(e.filter.packTypes, s.type) && !s.isHide ? e.filter.packTypes.push({
                    value: s.type || "others",
                    selected: !1
                }) : !s || s.type || e.checkIfObjectAlreadyExist(e.filter.packTypes, "others") || e.filter.packTypes.push({
                    value: "others",
                    selected: !1
                })
            }
        e.minPriceValueSelected = e.minPriceValue, e.maxPriceValueSelected = e.maxPriceValue
    }, e.isEnableFilter = !1, e.filterResulteCount = 0, e.filterResultExistsForAll = !1, e.filterResultExistsForMy = !1, e.searchedMyTestsCount = 0, e.searchedTestsMap = {}, e.filterTest = function(t, s) {
        if ("allTests" == s) {
            var r = e.filterForSpecificExams(e.filter.specificExams, t),
                a = e.filterForPackTypes(e.filter.packTypes, t),
                o = e.filterForPrice(e.filter.priceFilter, t),
                i = !!(r && a && o);
            return t.isShow = i && !t.isHide, t.isShow && (e.filterResultExistsForAll = !0), t.isShow
        }
        if ("myTests" == s) {
            var n = e.filterForTestTitle(t, e.myFilter.testTitle),
                r = e.filterForSpecificExams(e.myFilter.specificExams, t),
                c = e.filterForTestTypes(e.myFilter.testTypes, t),
                l = e.filterForTestStates(e.myFilter.testStates, t, s),
                i = !!(n && r && c && l);
            return t.isShow = i, n && e.myFilter.testTitle && e.addToArrayForSuggestions(), t.isShow && (e.filterResultExistsForMy = !0), !e.searchedTestsMap[t.id] && i && (e.searchedMyTestsCount += 1, e.searchedTestsMap[t.id] = 1), !e.isEnableFilter && e.myFilter.testTitle ? (t.isShow = r && c && l, t.isShow) : t.isShow
        }
        return !1
    }, e.isShowSuggestions = !0, e.setTestTitleForSearch = function(t, s) {
        e.searchedMyTestsCount = 0, e.searchedTestsMap = {}, e.myFilter.testTitle = t, e.arrayForSuggestions = [], e.isShowSuggestions = s, e.isEnableFilter = !0, e.filterResultExistsForMy = !1
    }, e.setTestTitleForSearchOnChange = function(t, s) {
        e.myFilter.testTitle = t, e.arrayForSuggestions = [], e.isShowSuggestions = s, e.isEnableFilter = !1
    }, e.setTestTitleByEnter = function(t, s) {
        13 == t.which && e.setTestTitleForSearch(s, !1)
    }, e.clearMySearch = function() {
        e.myFilter.testTitle = "", e.arrayForSuggestions = []
    }, e.arrayForSuggestions = [], e.addToArrayForSuggestions = function() {
        var t = {};
        if (e.arrayForSuggestions = [], e.myFilter.testTitle)
            for (var s = 0; s < e.myTestsArr.length; s++)
                for (var r = e.myTestsArr[s].value, a = 0; a < r.length; a++) t = r[a], e.filterForTestTitle(t, e.myFilter.testTitle) && !e.checkIfTestAlreadyExistInArr(e.arrayForSuggestions, t.id) && e.arrayForSuggestions.push(t)
    }, e.showCategory = function(e) {
        e = validateArr(e);
        for (var t = 0; t < e.length; t++)
            if (e && e[t] && e[t].isShow && !e[t].isHide) return !0
    }, e.showCategoryForMyTests = function(e) {
        e = validateArr(e);
        for (var t = 0; t < e.length; t++)
            if (e && e[t] && e[t].isShow) return !0
    }, e.showComboCategory = function(e, t) {
        e = validateArr(e), t = validateArr(t);
        for (var s = 0; s < e.length; s++)
            if (e && e[s] && e[s].isShow) return !0;
        for (var s = 0; s < t.length; s++)
            if (t && t[s] && t[s].isShow && t[s].statusClass.search("subs-active") == -1) return !0;
        return !1
    }, e.showPackCategory = function(e) {
        e = validateArr(e);
        for (var t = 0; t < e.length; t++)
            if (e && e[t] && e[t].isShow && !e[t].isHide) return !0;
        return !1
    }, e.searchString = function(e, t) {
        return e.search(t) == -1
    }, e.showCategoryParent = function(e) {
        for (var t = 0; t < e.length; t++) {
            var s = e[t].value || [];
            if (s.length) return !0
        }
        return !1
    }, e.filterForTestTitle = function(t, s) {
        return !e.myFilter.testTitle || t.title.toLowerCase().search(s.toLowerCase()) != -1
    }, e.filterForTestStates = function(t, s, r) {
        if (!t || !t.length) return !0;
        if (e.checkIfAllUnselected(t)) return !0;
        r = "attemptedTests" == r ? "Attempted" : "Not Attempted";
        for (var a = 0; a < t.length; a++)
            if (t[a].selected && r == t[a].value) return !0;
        return !1
    }, e.filterForSpecificExams = function(t, s) {
        if (!t || !t.length) return !0;
        if (e.checkIfAllUnselected(t)) return !0;
        for (var r = !1, a = 0; a < t.length; a++)
            if (t[a].selected && s.specificExams && s.specificExams.indexOf(t[a].value) != -1) {
                r = !0;
                break
            }
        return r
    }, e.filterForPackTypes = function(t, s) {
        if (!t || !t.length) return !0;
        if (e.checkIfAllUnselected(t)) return !0;
        for (var r = !1, a = 0; a < t.length; a++)
            if (t[a].selected && s.type == t[a].value) {
                r = !0;
                break
            }
        return r
    }, e.filterForTestTypes = function(t, s) {
        if (!t || !t.length) return !0;
        if (e.checkIfAllUnselected(t)) return !0;
        for (var r = !1, a = 0; a < t.length; a++)
            if (t[a].selected && s.pattern && s.pattern.title == t[a].value) {
                r = !0;
                break
            }
        return r
    }, e.filterForPrice = function(t, s) {
        return s.cost >= e.minPriceValueSelected && s.cost <= e.maxPriceValueSelected
    }, e.filterResetAllTests = function() {
        for (var t = 0; t < e.allTestsObj.nonProducts.length; t++) e.allTestsObj.nonProducts[t].isShow = !1
    }, e.processAttemptedTests = function(t, s) {
        for (var r = function(e, t) {
                return e = e <= t ? e : t, Math.floor(e / 60) + ":" + y(e % 60)
            }, a = 0; a < t.length; a++) {
            for (var o = 0; o < s.length; o++) t[a].id == s[o].tid && (t[a].studentAttemptedDetails = {}, t[a].studentAttemptedDetails.questionsCount = s[o].attempted, t[a].studentAttemptedDetails.marks = Math.round(100 * s[o].marks) / 100, t[a].studentAttemptedDetails.time = r(s[o].time, 60 * t[a].testDetails.time), t[a].show_promotions = s[o].show_promotions, t[a].show_result = s[o].show_result);
            t[a].attemptedClass = e.getClassForAttemptedTest(t[a]), t[a].promotionsURL = "/" + e.curCourseURL + "/tests/" + t[a].id + "/promotions"
        }
        return t
    }, e.getClassForMyTests = function(t) {
        var s = "",
            r = t.startTimeLive - e.currentTime,
            a = t.endTimeLive - e.currentTime;
        if (t.isLiveTest ? (s = "live-test-card", s += r > f ? " lt-default-state" : r <= f && r > 0 ? " lt-default-state" : r <= 0 && a >= 0 ? " lt-start-test" : a <= 0 ? " lt-time-over" : " lt-default-state") : (s = "fst-test-card", s += t.isPreLaunch ? " test-prelaunch" : " nt-default-state"), t.description && (s = s ? s + " has-syll-info" : str + "has-syll-info"), t.specificExams && t.specificExams.length && (s = s ? s + " has-tags" : s + "has-tags"), e.resumableTestsMAP[t.id] && (s = s ? s + " test-resumable" : s + "test-resumable"), t && t.sourceId) {
            var o = e.subsArrMap[t.sourceId] || {};
            s = s ? s + " " + o.statusClass : o.statusClass
        }
        return s
    }, e.getClassForAttemptedTest = function(e) {
        var t = "";
        return e.specificExams && e.specificExams.length && (t = "has-tags"), !e.show_promotions && e.show_result || (t += " check-promotions"), e.description && (t += " has-syll-info"), t
    }, e.myTestsIdObjMAP = {}, e.getAllTestsAssignedToStudent = function(t) {
        var s = -1e7,
            r = t.data.products || [],
            a = t.data.tests || [],
            o = [],
            i = {},
            c = e.courseIdToExpiryMap[e.currentCourseId] && e.currentCourseId && n.getValidDays(e.courseIdToExpiryMap[e.currentCourseId].expiry);
        if (a && a.length && e.allTestsObj.nonProducts && e.allTestsObj.nonProducts.length)
            for (var l = 0; l < e.allTestsObj.nonProducts.length; l++) {
                var d = e.allTestsObj.nonProducts[l];
                a && a.length && a.indexOf(d.id) != -1 && !e.checkIfTestAlreadyExistInArr(o, d.id) && (d.subsExpiryInDays = -1e7, d.subsExpiryInDaysString = "", o.push(d), i[d.id] = {
                    isPartOfCombo: !1,
                    comboId: ""
                })
            }
        if (r || r.length)
            for (var l = 0; l < r.length; l++)
                for (var d = r[l], u = e.getTestsOfProduct(d), f = 0; f < u.length; f++) {
                    var d = u[f];
                    i[d.id] = {
                        isPartOfCombo: !1,
                        comboId: ""
                    }, d.myCardClass = e.getClassForMyTests(d), d.source = r[l].source, d.sourceId = r[l].sourceId || "", d.subsExpiryInDays = e.purchasedSubsMap && e.purchasedSubsMap[d.sourceId] && e.purchasedSubsMap[d.sourceId].expiryInDays || s, d.subsExpiryInDaysString = c > 0 ? c > 1 ? c + " days To dxpire subscription" : c + " day To expire subscription" : -c > 1 ? "Subscription expired " + -c + " days ago" : "Subscription expired " + -c + " day ago", e.checkIfTestAlreadyExistInArr(o, d.sourceId) || o.push(d)
                }
        for (var m = [], p = [], l = 0; l < r.length; l++) {
            var g = [];
            if (i[r[l].pid] = {
                    isPartOfCombo: !1,
                    comboId: ""
                }, r[l].products && r[l].products.length)
                for (var f = 0; f < r[l].products.length; f++) g.push(r[l].products[f].pid), i[r[l].products[f].pid] = {
                    isPartOfCombo: !0,
                    comboId: r[l].pid
                };
            m = r[l].pid, p = p.concat(e.getTestsOfComboPacksForMyTests(m, r[l].source, r[l].sourceId))
        }
        for (var l = 0; l < p.length; l++) {
            var d = p[l];
            d.myCardClass = e.getClassForMyTests(d), e.checkIfTestAlreadyExistInArr(o, d.id) || e.myTestsIds.indexOf(d.id) == -1 || o.push(d)
        }
        for (var l = 0; l < r.length; l++) r[l].tests && a.push(r[l].pid);
        for (var l = 0; l < r.length; l++) {
            if (r[l].products && r[l].products.length)
                for (var f = 0; f < r[l].products.length; f++) a = a.concat(r[l].products[f].tests);
            r[l].tests && r[l].tests.length && (a = a.concat(r[l].tests))
        }
        for (var l = 0; l < e.storeTestsOfExpiredProducts.length; l++)
            if (a.indexOf(e.storeTestsOfExpiredProducts[l].id) != -1 && !e.checkIfTestAlreadyExistInArr(o, e.storeTestsOfExpiredProducts[l].id)) {
                var d = e.getTestObj(e.storeTestsOfExpiredProducts[l]);
                d.myCardClass = e.getClassForMyTests(d), d.subsExpiryInDays = e.purchasedSubsMap && e.purchasedSubsMap[d.sourceId] && e.purchasedSubsMap[d.sourceId].expiryInDays || s, d.subsExpiryInDaysString = c > 0 ? c > 1 ? c + " days To dxpire subscription" : c + " day To expire subscription" : -c > 1 ? "Subscription expired " + -c + " days ago" : "Subscription expired " + -c + " day ago", o.push(d)
            }
        e.makeTestIdToTestMap(o), e.getTotalCourseDetails();
        for (var l = 0; l < o.length; l++) {
            var T = o[l].id;
            e.myTestsIdObjMAP[T] = o[l]
        }
        return e.isCoursePage && e.initializeCoursePage(), e.processAllTests(i), o
    }, e.processAllTests = function(t) {
        for (var s = e.allTestsObj.nonProducts.length - 1; s >= 0; s--) {
            var r = e.allTestsObj.nonProducts[s];
            t[r.id] && !t[r.id].isPartOfCombo && e.isCoursePage ? (r.isPartOfMyTests = !0, r.cardClass ? r.cardClass = r.cardClass + " part-of-my-tests" : r.cardClass = "part-of-my-tests") : !t[r.id] || t[r.id].isPartOfCombo || e.isCoursePage ? t[r.id] && t[r.id].isPartOfCombo && e.allTestsObj.nonProducts.splice(s, 1) : e.allTestsObj.nonProducts.splice(s, 1)
        }
        for (var s = e.allTestsObj.packs.length - 1; s >= 0; s--) {
            for (var a = e.allTestsObj.packs[s].value, o = a.length - 1; o >= 0; o--) {
                var r = a[o];
                t[r.id] && !t[r.id].isPartOfCombo && e.isCoursePage ? (a[o].isPartOfMyTests = !0, a[o].cardClass ? a[o].cardClass = a[o].cardClass + " part-of-my-tests" : a[o].cardClass = "part-of-my-tests") : !t[r.id] || t[r.id].isPartOfCombo || e.isCoursePage ? t[r.id] && t[r.id].isPartOfCombo && a.splice(o, 1) : a.splice(o, 1)
            }
            a.length < 1 && e.allTestsObj.packs.splice(s, 1)
        }
        for (var s = e.allTestsObj.comboPacks.length - 1; s >= 0; s--) {
            for (var a = e.allTestsObj.comboPacks[s].value, o = a.length - 1; o >= 0; o--) {
                var r = a[o];
                if (t[r.id] && e.isCoursePage) a[o].isPartOfMyTests = !0, a[o].isAlreadyPurchased = !0, a[o].cardClass ? a[o].cardClass = a[o].cardClass + " part-of-my-tests" : a[o].cardClass = "part-of-my-tests", a[o] = e.processObjForComboUpgrade(a[o], t);
                else if (t[r.id] && !e.isCoursePage) a.splice(o, 1);
                else
                    for (var i = a[o].items, n = 0; n < i.length; n++)
                        if (t[i[n].id] && t[i[n].id].comboId != a[o].id || e.checkIfHasCommonTestsWithMyTests(r.comboPackTests)) {
                            a[o].isPartialPurchasedProduct = !0, a[o] = e.processObjForComboUpgrade(a[o], t), (a[o].cost <= 0 || a[o].comboPackDetails.remainingTestsCount <= 0) && a.splice(o, 1);
                            break
                        }
            }
            a.length < 1 && e.allTestsObj.comboPacks.splice(s, 1)
        }
        T()
    }, e.checkIfHasCommonTestsWithMyTests = function(t) {
        for (var s = 0; s < t.length; s++) {
            var r = t[s].id;
            if (e.myTestsIdObjMAP[r]) return !0
        }
        return !1
    }, e.processObjForComboUpgrade = function(t, s) {
        for (var r = t.items || [], a = t.comboPackTests || [], o = {}, i = 0; i < a.length; i++) {
            var n = a[i].id;
            o[n] = a[i]
        }
        for (var c = (t.cost, 0), l = 0, i = 0; i < r.length; i++) {
            var d = r[i].id;
            e.mapPidToProduct && e.mapPidToProduct[d] && (c += e.mapPidToProduct[d].cost), s && s[d] && e.mapPidToProduct[d] && (l += e.mapPidToProduct[d].cost)
        }
        for (var i = 0; i < a.length; i++) {
            var n = a[i].id;
            e.myTestsIdObjMAP[n] && (a[i].isAlreadyPurchased = !0)
        }
        for (var u = 0, f = 0, i = 0; i < a.length; i++) a[i].isAlreadyPurchased ? u += 1 : f += 1;
        u > 0 && 0 == f && (t.cardClass ? t.cardClass = t.cardClass + " part-of-my-tests" : t.cardClass = "part-of-my-tests"), t.isPartialPurchasedProduct = !0;
        var m = 1 - l / c;
        return t.cost = m * t.cost, t.cost = t.cost + 9, t.cost = 10 * Math.floor(t.cost / 10), t.oldCost = m * t.oldCost, t.oldCost = t.oldCost + 9, t.oldCost = 10 * Math.floor(t.oldCost / 10), t.oldCost % 10 >= 5 && (t.oldCost = t.oldCost + 10), t.oldCost = 10 * Math.floor(t.oldCost / 10), t.offerText = "SAVE RS. " + getRoundedFloat(t.oldCost - t.cost, 0), t.comboPackDetails = e.getComboPackDetailsObj(a), t.categorizedSortedPackTests = e.getCompleteSortedCategorizedItemsArr(a, "test", !1, "asc"), t
    }, e.resetAllTestsPacksAndCombos = function() {
        for (var t = e.allTestsObj.nonProducts.length - 1; t >= 0; t--) e.allTestsObj.nonProducts[t].isPartOfMyTests && (e.allTestsObj.nonProducts.splice(t, 1), s[r].isPartOfMyTests = !0, s[r].isAlreadyPurchased = !0, s[r].cardClass ? s[r].cardClass = s[r].cardClass + " part-of-my-tests" : s[r].cardClass = "part-of-my-tests");
        for (var t = e.allTestsObj.packs.length - 1; t >= 0; t--) {
            for (var s = e.allTestsObj.packs[t].value, r = s.length - 1; r >= 0; r--) s[r].isPartOfMyTests && s.splice(r, 1);
            s.length < 1 && e.allTestsObj.packs.splice(t, 1)
        }
        for (var t = e.allTestsObj.comboPacks.length - 1; t >= 0; t--) {
            for (var s = e.allTestsObj.comboPacks[t].value, r = s.length - 1; r >= 0; r--) s[r].isPartOfMyTests && s.splice(r, 1);
            s.length < 1 && e.allTestsObj.comboPacks.splice(t, 1)
        }
    }, e.getTestsOfComboPacksForMyTests = function(t, s, r) {
        for (var a = [], o = 0; o < e.allTestsObj.comboPacks.length; o++)
            for (var i = e.allTestsObj.comboPacks[o].value, c = 0; c < i.length; c++) {
                var l = t.indexOf(i[c].id);
                l != -1 && (a = a.concat(i[c].comboPackTests))
            }
        for (var d = n.getValidDays(e.courseIdToExpiryMap[e.currentCourseId] && e.courseIdToExpiryMap[e.currentCourseId].expiry), o = 0; o < a.length; o++) a[o].source = s || "", a[o].sourceId = r || "", a[o].subsExpiryInDays = e.purchasedSubsMap && e.purchasedSubsMap[r] && e.purchasedSubsMap[r].expiryInDays || -1e7, a[o].subsExpiryInDaysString = d > 0 ? d > 1 ? d + " days To expire subscription" : d + " day to expire subscription" : -d > 1 ? "Subscription expired " + -d + " days ago" : "Subscription expired " + -d + " day ago";
        return a
    }, e.getTestsOfProduct = function(t) {
        for (var s = [], r = e.allTestsObj.packs.length - 1; r >= 0; r--)
            for (var a = e.allTestsObj.packs[r].value, o = a.length - 1; o >= 0; o--) t.pid == a[o].id && (s = a[o].items || []);
        for (var r = e.allTestsObj.nonProducts.length - 1; r >= 0; r--)
            for (var r = e.allTestsObj.nonProducts.length - 1; r >= 0; r--) e.allTestsObj.nonProducts[r].id == t.pid && (e.allTestsObj.nonProducts[r].id = e.allTestsObj.nonProducts[r].items[0].id, s.push(e.allTestsObj.nonProducts[r]) || []);
        return s
    }, e.checkIfProductExistsInCombo = function(t) {
        for (var s = e.allTestsObj.comboPacks || [], r = 0; r < s.length; r++)
            for (var a = s[r].value, o = 0; o < a.length; o++)
                for (var i = a[o].items, n = 0; n < i.length; n++) i[n].id == t && (a[o].isPartOfMyTests = !0, a[o].isAlreadyPurchased = !0)
    }, e.checkForProductsWithCoins = function() {
        t.$broadcast("GET_REMAINING_COINS", {})
    }, e.remCoins = 0, e.checkForProductsWithCoinsCallBack = function(t) {
        e.remCoins = t;
        for (var s = [], r = 0; r < e.allTestsObj.nonProducts.length; r++) {
            var a = e.allTestsObj.nonProducts[r];
            a.cost > 0 && (a.cardClass = e.manageClassToPurchaseProductWithCoins(t, a))
        }
        for (r = 0; r < e.allTestsObj.packs.length; r++) {
            s = e.allTestsObj.packs[r].value;
            for (var o = 0; o < s.length; o++) s[o].cardClass = e.manageClassToPurchaseProductWithCoins(t, s[o])
        }
        for (r = 0; r < e.allTestsObj.comboPacks.length; r++)
            for (s = e.allTestsObj.comboPacks[r].value, o = 0; o < s.length; o++) s[o].cardClass = e.manageClassToPurchaseProductWithCoins(t, s[o])
    }, e.manageClassToPurchaseProductWithCoins = function(e, t) {
        var s = t.cardClass;
        return t.cost > e ? (s = s.replace(" purchase-with-coins", ""), s = s.replace("purchase-with-coins", "")) : t.cost <= e && s.search("added-to-cart") == -1 && (s += s ? " purchase-with-coins" : "purchase-with-coins"), s
    }, e.closeTBModal = function() {
        $("#" + S).modal("hide")
    }, e.toggleModal = function(e, t) {
        $("#" + e).modal(t)
    }, e.DOB = "", e.rollNoStudent = "", e.isStudentInfoUpdatedStatusShow = !1, e.region = "", e.regionArr = ["Eastern Region", "Western Region", "Southern Region", "Central Region", "North Western Region", "Northern Region", "Madhya Pradesh Region", "Karnataka/Kerala Region", "North Eastern Region"], e.saveAdmitCardInfo = function(t) {
        if (e.isAllowSkip) {
            var s = {
                specificExamId: e.specificExamIdAdmitCard,
                skipAppId: !0
            };
            o.saveProfile(s, e.syncSkipInfoWithServerSCB, function() {
                return 0
            })
        }
        if (e.isAllowSkip) return 0;
        var r = document.getElementsByClassName("birthDay")[0].value;
        if (!t) return showAlert("Please enter valid roll number.", "error", "sm", 3e3), 0;
        if (!r) return showAlert("Please select valid date of birth.", "error", "sm", 3e3), 0;
        if (!e.region && "56d6f293995a2d45a8735bb5" == e.courseSelectedForAdmitCardId) return showAlert("Please select valid region.", "error", "sm", 3e3), 0;
        r = ISODateString(new Date(r));
        var s = {
            appId: t,
            dob: r,
            year: "2016",
            specificExamId: e.specificExamIdAdmitCard,
            region: e.region
        };
        showLoader("Please Wait. Saving Your Info."), o.saveProfile(s, e.saveAdmitCardInfoSCB)
    }, e.setRegionValue = function(t) {
        e.region = t
    }, e.saveAdmitCardInfoSCB = function(t) {
        if (hideLoader(), t.success) return e.isStudentAppIdUpdated = !0, e.isShowTestInfoForCurExam = !1, e.isStudentInfoUpdatedStatusShow = !1, e.isInvalidDOBOrAppID = !1, forceSessionRefresh(), e.startTestHelper(), 0
    }, e.toggleScrollButtons = function(e) {
        s(function() {
            toggleScrollButtons(e)
        }, 1e3)
    }, e.requestTestsState = 0, e.requestMoreTests = function() {
        e.requestMoreTestsSCB = function(t) {
            hideLoader(), e.requestTestsState = 1, setLocalStorage(I, 1, 3), e.isLSExistForReqMoreBlock = getLocalStorage(I)
        }, e.requestMoreTestsFCB = function(t) {
            e.requestTestsState = 2, hideLoader(), showAlert(t && t.message || TB.API_DEFAULT_ERROR_MESSAGE, "error", "sm", 1e4)
        }, showLoader("Submitting Request, Please Wait."), o.requestMoreTests(e.requestMoreTestsSCB, e.requestMoreTestsFCB)
    }, e.bannerButtonClass = "", e.getBannerButtonsClass = function() {
        return 0 == e.getMyTestsCount() && e.getFreeTestsCount() > 0 ? e.bannerButtonClass = "cta-get-started-for-free" : 0 == e.myTestsArr.length && 0 == e.getFreeTestsCount() && e.paidTestsAvailableToBuy() ? e.bannerButtonClass = "cta-get-started" : 0 != e.myTestsArr.length || 0 != e.getFreeTestsCount() || e.paidTestsAvailableToBuy() ? e.getMyTestsCount() > 3 || e.getMyTestsCount() > 0 && !e.paidTestsAvailableToBuy() ? e.bannerButtonClass = "cta-take-tests" : e.getMyTestsCount() <= 3 && e.paidTestsAvailableToBuy() ? e.bannerButtonClass = "cta-purchase-more-tests" : 0 != e.getMyTestsCount() || e.paidTestsAvailableToBuy() || (e.bannerButtonClass = "cta-request-for-more") : e.bannerButtonClass = "cta-request-for-more", e.bannerButtonClass
    }, e.getMyTestsCount = function() {
        for (var t = 0, s = 0; s < e.myTestsArr.length; s++) t += e.myTestsArr[s].value.length;
        return t
    }, e.paidTestsAvailableToBuy = function() {
        for (var t = 0; t < e.allTestsObj.nonProducts.length; t++)
            if (e.allTestsObj.nonProducts[t].cost > 0) return !0;
        for (var t = 0; t < e.allTestsObj.packs.length; t++)
            if (e.allTestsObj.packs[t].value.length > 0) return !0;
        for (var t = 0; t < e.allTestsObj.comboPacks.length; t++)
            if (e.allTestsObj.comboPacks[t].value.length > 0) return !0;
        return !1
    }, e.checkForFreeTestsDivDisplay = function(e) {
        if (e && e.length)
            for (var t = 0; t < e.length; t++)
                if (e[t].isShow) return !0;
        return !1
    }, e.getFilteredClass = function(t, s) {
        return !s || e.minPriceValue == e.minPriceValueSelected && e.maxPriceValue == e.maxPriceValueSelected ? !s || e.minPriceValue != e.minPriceValueSelected && e.maxPriceValue != e.maxPriceValueSelected ? 0 == e.getSelectedFiltersCount(t) ? "" : "filtered" : "" : "filtered"
    }, e.getSelectedFiltersCount = function(e) {
        if (!e) return 0;
        for (var t = 0, s = 0; s < e.length; s++) e[s].selected && (t += 1);
        return t
    }, e.packToShowInfo = {};
    var S = "mtDetailsModal";
    e.modalToShow = "-1", e.MODAL_ENUM = {
        BUNDLE_DETAILS: 0,
        TEST_ADDED: 1,
        ADMIT_CARD: 2
    }, e.showPackInfo = function(t) {
        e.packToShowInfo = t, e.modalToShow = e.MODAL_ENUM.BUNDLE_DETAILS, s(function() {
            $("#" + S).modal("show")
        }, 50)
    }, e.isShowFreeTestsStatus = !1, e.setTestsAddedStatus = function(t) {
        e.isShowFreeTestsStatus = t
    }, e.showFreeTestAddedStatus = function() {
        return e.isShowFreeTestsStatus
    }, e.checkFOrMobileVerification = function() {
        e.isMobileVerified = parseInt(document.getElementById("mobile-verification-status").value), e.isMobileVerified || (e.includeMobilVerificationBlock = !0, t.$broadcast("TriggerMobileVerificationCode", {}))
    }, e.currentCourseId = "", e.currentCourseName = "", e.sid = "", e.txnId = "", e.curCourseURL = "", e.isPracticeOnApp = !1, e.appType = "", e.getPHPVariables = function() {
        document.getElementById("cur-course-id") && (e.currentCourseId = document.getElementById("cur-course-id").value), document.getElementById("cur-course-title") && (e.currentCourseName = document.getElementById("cur-course-title").value), document.getElementById("sid") && (e.sid = document.getElementById("sid").value), "" != getCookie("tb_txnid") && (e.txnId = getCookie("tb_txnid"), setCookie("tb_txnid", 1, -1)), document.getElementById("curCourseURL") && (e.curCourseURL = document.getElementById("curCourseURL").value || ""), document.getElementById("app-link") && (e.appType = document.getElementById("app-link").value || ""), document.getElementById("hasPractice") && (e.hasPractice = document.getElementById("hasPractice").value || 0)
    }, e.hindiTestsScope = {
        stage: 1,
        isHindi: !1,
        courseName: "",
        productName: "",
        productId: "",
        askForProductChangeArr: [!1]
    }, e.hindiTestsScope.showChangeLanguageModal = function(e) {
        return 0
    }, e.hindiTestsScope.setLanguage = function(t) {
        e.hindiTestsScope.setStage(2), e.hindiTestsScope.isHindi = t
    }, e.hindiTestsScope.setStage = function(t) {
        e.hindiTestsScope.stage = t
    }, e.hindiTestsScope.getCourseName = function(e) {
        e = validateArr(e);
        for (var t = ["57dc1c06995a2d66cc9845f6", "57dc1bf1995a2d66cc984595"], s = 0; s < e.length; s++)
            if (t.indexOf(e[s].id) != -1) return e[s].name || ""
    }, e.hindiTestsScope.replaceTests = function(t) {
        var s = function(t) {
                e.toggleModal("langSelectForPacks", "hide")
            },
            r = function(e) {
                showAlert("Something went wrong, Please check your internet connection and try again.", "error", "sm", 7e3)
            };
        t ? o.replaceEnglishTestsWithHindi({
            from: e.hindiTestsScope.productId
        }, s, r) : o.replaceEnglishTestsWithHindi({
            from: e.hindiTestsScope.productId,
            to: e.hindiTestsScope.productId
        }, s, r)
    }, e.getTransactionInfo = function(e) {
        var t = {
                txn_id: e
            },
            s = function(e) {
                for (var t = [], s = {
                        pid: "",
                        name: ""
                    }, r = 0; r < e.length; r++) e[r].pid && (s.pid = e[r].pid), e[r].name && (s.name = e[r].name), t.push(s);
                return t
            },
            r = function(e) {
                if (e.success) {
                    var t = e.data || {},
                        r = void 0 != t.coupons.coupon_code ? t.coupons.coupon_code : "",
                        a = void 0 != t.coins.amount ? t.coins.amount : 0,
                        o = s(t.bundles),
                        i = void 0 != t.payment.pg ? t.payment.pg : 0;
                    dataLayer.push({
                        txnId: t.txn_id,
                        products: o,
                        subtotal: t.cost,
                        paid: t.payment.amount,
                        coins: a,
                        couponCode: r,
                        page: i
                    }), n.callDataLayerFunction()
                }
            },
            a = function(e) {};
        o.getPaymentLogs(t, r, a)
    }, e.startTest = function(t) {
        e.testToStart = t, e.showAdmitCardModal(t.showAdmitCardExams) ? (e.modalToShow = e.MODAL_ENUM.ADMIT_CARD, s(function() {
            $("#" + S).modal("show")
        }, 1e3)) : e.startTestHelper()
    }, e.startTestHelper = function() {
        var t = "/" + e.curCourseURL + "/tests/" + e.testToStart.id;
        e.resumableTestsMAP[e.testToStart.id] && (t += "#/test"), window.location = t
    }, e.specificExamIdAdmitCard = "", e.admitCardSkipCount = 0, e.specificExamAdmitCard = "", e.courseSelectedForAdmitCardId = "", e.showAdmitCardModal = function(t) {
        for (var s = {}, r = 0; r < e.appCourses.length; r++) {
            var a = e.appCourses[r].exam || "";
            s[a] = e.appCourses[r]
        }
        for (var r = 0; r < t.length; r++) {
            var a = t[r].id;
            if (s[a]) return e.courseSelectedForAdmitCardId = t[r].id, e.specificExamAdmitCard = t[r].name || "", e.admitCardSkipCount = s[a].skipCount || 0, e.specificExamIdAdmitCard = t[r].id || "", !0
        }
        return !1
    }, e.isAllowSkip = !1, e.syncSkipInfoWithServer = function(t) {
        e.isAllowSkip = t
    }, e.syncSkipInfoWithServerSCB = function(t) {
        e.startTestHelper()
    }, e.checkForAdmitCardInfo = function(t) {
        for (var s = t.specificExamObjArr || [], r = 0; r < s.length; r++)
            if (e.admitCardInfoMap[s[r].id]) return !0;
        return !1
    }, e.showAddedTestStatus = function() {
        e.modalToShow = e.MODAL_ENUM.TEST_ADDED, s(function() {
            $("#" + S).modal("show")
        }, 1e3)
    }, e.setTabFromURL = function() {
        var t = getURLParameterValue("tab");
        "all" == t ? e.manageTabs("all") : "attempted" == t ? e.manageTabs("attempted") : e.manageTabs("my")
    }, e.checkForCartProductInURL = function() {
        var t = getURLParameterValue("pid"),
            s = {};
        if (t) {
            for (var r = 0; r < e.allTestsObj.nonProducts.length; r++) e.allTestsObj.nonProducts[r].id == t && (s = e.allTestsObj.nonProducts[r]);
            if (!s.id)
                for (var r = 0; r < e.allTestsObj.packs.length; r++)
                    for (var a = e.allTestsObj.packs[r].value, o = 0; o < a.length; o++) a[o].id == t && (s = a[o]);
            if (!s.id)
                for (var r = 0; r < e.allTestsObj.comboPacks.length; r++)
                    for (var a = e.allTestsObj.comboPacks[r].value, o = 0; o < a.length; o++) a[o].id == t && (s = a[o]);
            !s.id && e.subsArrMap[t] && (s = e.subsArrMap[t])
        }
        if (s && s.id) {
            var i = [s];
            e.addToCart(i, !0, e.mycoins, !1)
        } else if (t) {
            location.protocol + "//" + location.host + location.pathname;
            setLocalStorageOnLiveTestAdd(t), showAlert("Product with some same tests is already purchased or product not available now", "error", "sm", 7e3)
        }
    }, e.manageTabs = function(t) {
        e.currentActiveTab = t, "my" == t && setViewMoreViewLess("#my_test_tab .tests-sections .packs-container"), "attempted" == t && setViewMoreViewLess("#attempted_test_tab .tests-sections .packs-container")
    }, e.scrollGetStartedForFree = function() {
        var t = $("#js-scholarship-banner").outerHeight() || 0;
        e.manageTabs("all"), $("html, body").animate({
            scrollTop: $(".js-mocktest-tabs").offset().top + 1 - t
        }, 500)
    }, e.scrollTakeTests = function() {
        var t = $("#js-scholarship-banner").outerHeight() || 0,
            s = $(".js-mocktest-tabs").outerHeight() || 0;
        e.manageTabs("all"), $("html, body").animate({
            scrollTop: $("#my_test_tab").offset().top + 1 - t - s
        }, 500)
    }, e.scrollPurchaseMoreTests = function() {
        var t = $("#js-scholarship-banner").outerHeight() || 0,
            s = $(".js-mocktest-tabs").outerHeight() || 0;
        e.manageTabs("all"), $("html, body").animate({
            scrollTop: $(".tests-packs-container").offset().top - t - s
        }, 500)
    }, e.scrollGetStarted = function() {
        e.scrollPurchaseMoreTests()
    }, e.getCoinsPayableAmount = function(e) {
        return getRoundedFloat(.7 * e, 2)
    }, e.subheadingsMap = {
        "557af9de0ea5ce31f052918b": "Just don't take quiz - now read daily news and take quiz on our perfectly designed Current Affairs app",
        "557af9de0ea5ce31f052918a": "Graduate Aptitude Test in Engineering (Civil Engineering)",
        "561664f8cac3ae28e5213e87": "Graduate Aptitude Test in Engineering (Computer Science and Engineering)",
        "55a5784fa7b57b49a29e2125": "Graduate Aptitude Test in Engineering (Electronics and Communication Engineering)",
        "55a57ad3a7b57b49e58559ee": "Graduate Aptitude Test in Engineering (Electrical Engineering)",
        "55a57ad3a7b57b49e58559ed": "Graduate Aptitude Test in Engineering (Mechanical Engineering)",
        "568a751185111b4193101100": "IBPS Clerk, SBI Clerk, SBI Associate Clerk, IBPS RRB Office Assistant and other Clerical Cadre Exams",
        "557569e82a39650f6f395648": "IBPS PO, SBI PO, SBI Associate PO, and other PO/MT Cadre Exams",
        "568a752485111b4193101101": "LIC AAO, NICL AO and other Insurance Exams",
        "569c9730995a2d097081cf8a": "RRB NTPC and other Railways Exams",
        "566947a4a7b57b398faca54b": "SSC MTS, SSC CGL, SSC CHSL & Stenographer Exams",
        "557af9de0ea5ce31f0529187": "Campus Job Placements, MBA/Management Entrance Exams and General Aptitude",
        "578f5618995a2d5b4c3f6e9a": "Get your dream job as BSNL Junior Engineer. The skyâ€™s the limit to your success",
        "5796d79e9389865c92bf0806": "Get your dream job as reputed RBI Grade B officer. The skyâ€™s the limit to your success"
    }, e.showDatePickerTB = function() {
        $(".student-dob").birthdayPicker({
            monthFormat: "short",
            maxAge: 65,
            minAge: 18
        })
    }, e.DOB = "", e.rollNo = "", e.isStudentInfoUpdatedStatusShow = !1, e.updateStudentTestAppId = function(t) {
        var s = "2016",
            r = document.getElementsByClassName("birthDay")[0].value;
        return "" == t ? (showAlert("Please enter valid roll number.", "error", "sm", 2e3), 0) : "" == r ? (showAlert("Please enter valid date of birth.", "error", "sm", 2e3), 0) : (r = ISODateString(new Date(r)), void o.updateStudentTestAppIdAndDOB(t, r, s, e.currentCourseId, "Please wait, saving your info.", e.updateStudentTestAppIdSCB, e.updateStudentTestAppIdFCB))
    }, e.isStudentAppIdUpdated = !1, e.isInvalidDOBOrAppID = !1, e.updateStudentTestAppIdSCB = function(t) {
        if (t.success) return e.isStudentAppIdUpdated = !0, e.isShowTestInfoForCurExam = !1, e.isStudentInfoUpdatedStatusShow = !1, e.isInvalidDOBOrAppID = !1, forceSessionRefresh(), e.startTestHelper(), 0
    }, e.updateStudentTestAppIdFCB = function(t) {
        e.isInvalidDOBOrAppID = !0
    }, e.getFeaturedBlogPostsSCB = function(t) {
        var s = t.data;
        e.featuredBlogs = s;
        for (var r, a, o = (new Date).getTime(), i = 0; i < s.length; i++) a = 1e3 * s[i].date, r = (o - a) / 36e5, r < 1 ? s[i].timeStamp = "1 hour" : r < 24 ? s[i].timeStamp = Math.floor(r) + " hours" : r < 48 ? s[i].timeStamp = "1 day" : s[i].timeStamp = Math.floor(r / 24) + " days"
    }, e.getFeaturedBlogPostsFCB = function(e) {
        console.log(e)
    }, e.getBlogPostsSCB = function(t) {
        var s = t.data;
        e.newsBlogs = s;
        for (var r, a, o = (new Date).getTime(), i = 0; i < s.length; i++) a = 1e3 * s[i].date, r = (o - a) / 36e5, r < 1 ? s[i].timeStamp = "1 hour" : r < 24 ? s[i].timeStamp = Math.floor(r) + " hours" : r < 48 ? s[i].timeStamp = "1 day" : s[i].timeStamp = Math.floor(r / 24) + " days"
    }, e.getBlogPostsFCB = function(e) {
        console.log(e)
    }, e.mapCourseBlogUrl = function(t) {
        var s = {
            "557af9de0ea5ce31f052918a": "gate-ce",
            "561664f8cac3ae28e5213e87": "gate-cs",
            "55a5784fa7b57b49a29e2125": "gate-ec",
            "55a57ad3a7b57b49e58559ee": "gate-ee",
            "55a57ad3a7b57b49e58559ed": "gate-me",
            "568a752485111b4193101101": "insurance-exams",
            "55d44abaec7b2f0c210043c1": "placement-aptitude",
            "569c9730995a2d097081cf8a": "railway-rrb",
            "557569e82a39650f6f395648": "bank-po",
            "568a751185111b4193101100": "bank-clerk",
            "566947a4a7b57b398faca54b": "ssc-cgl",
            "58135074adafff45a35a5103": "ssc-je-civil-structural-ce",
            "57ff175ee9f131722fde54d6": "ssc-je-electrical-ee",
            "57fe2e4f03282162c9764bee": "ssc-je-mechanical-me",
            "5796d79e9389865c92bf0806": "rbi",
            "557af9de0ea5ce31f052918b": "current-affairs",
            "578f5618995a2d5b4c3f6e9a": "bsnl-tta",
            "584ff379e9f131060a2edbfd": "bank-so-specialist-officer",
            "5878cdbc995a2d421d498e6f": "coal-india-mt-cil",
            "5878cdd2995a2d421d498ea1": "coal-india-mt-cil",
            "5878cda4995a2d421d498df2": "coal-india-mt-cil"
        };
        t in s && (e.courseBlogUrl = s[t])
    }, e.isLSExistForReqMoreBlock = !1, e.isPromotionsPage = !1, e.isCoursePage = !1, e.init = function() {
        e.getPHPVariables(), e.setBannerBgImgUrl(), I = "req_more_tests_" + e.currentCourseId + "_" + e.sid, document.getElementById("pageName") && "promotionsPage" == document.getElementById("pageName").value ? (e.isPromotionsPage = !0, e.initPromotions()) : document.getElementById("pageName") && "coursePage" == document.getElementById("pageName").value ? (e.isCoursePage = !0, e.initCourses()) : e.initMocktest()
    }, e.testimonialsArr = [], e.selectionsArr = [], e.initCourses = function() {
        e.testimonialsArr = document.getElementById("testimonials") && JSON.parse(document.getElementById("testimonials").value), e.selectionsArr = document.getElementById("selections") && JSON.parse(document.getElementById("selections").value), e.mapCourseBlogUrl(e.currentCourseId), showLoader("Loading Tests, Please Wait."), o.getProductDetails(e.currentCourseId, e.getProductDetailsSCB), o.getBlogPosts(e.currentCourseId, !0, e.getFeaturedBlogPostsSCB, e.getFeaturedBlogPostsFCB), o.getBlogPosts(e.currentCourseId, !1, e.getBlogPostsSCB, e.getBlogPostsFCB), scrollToLoc()
    }, e.testId = "", e.initPromotions = function() {
        e.testId = document.getElementById("tid").value || "", e.isPromotionsPage = !0, showLoader("Loading Tests, Please Wait."), o.getPromotions(e.testId, e.getProductDetailsSCB)
    }, e.isFreeTestAdded = !1, e.isInit = !1;
    var O = function(e) {
            try {
                e()
            } catch (t) {
                console.log(t)
            }
        },
        I = "";
    e.initMocktest = function() {
        mocktestPageEvents(), l(e.currentCourseId), e.setTabFromURL(), e.isLSExistForReqMoreBlock = getLocalStorage(I), "" != e.txnId && (e.isFreeTestAdded = !1, e.testCountAdded = getLocalStorage(TB.LS_KEY_TXN_TEST_COUNT), e.amountPaid = getLocalStorage(TB.LS_KEY_TXN_AMOUNT), e.getTransactionInfo(e.txnId), e.showAddedTestStatus(), e.callAfiliate(e.txnId, e.amountPaid), TBAnalytics.hooks.checkoutEnd(e.txnId, e.amountPaid, getLocalStorage(TB.LS_KEY_TXN_COUPON_USED))), showLoader("Loading Tests, Please Wait."), o.getProductDetails(e.currentCourseId, e.getProductDetailsSCB)
    }, e.pushInfoToAfiliates = !1, e.callAfiliate = function(t, s) {
        if (!s) return !1;
        s = Number(s);
        var r = function() {
            goog_report_conversion ? goog_report_conversion(s) : console.log("No conversion code detected!!!")
        };
        O(r);
        var a;
        window.TapfiliateObject = a = "tap", window[a] = window[a] || function() {
            (window[a].q = window[a].q || []).push(arguments)
        }, tap("create", "1552-b82d64"), tap("conversion", t, s), e.couponRajaURL = i.trustAsResourceUrl("https://couponraja.go2cloud.org/aff_l?offer_id=261&adv_sub=" + t + "&amount=" + s), e.cashKaroURL = i.trustAsResourceUrl("https://traqkar.com/p.ashx?o=32&e=36&ect=" + s + "&t=" + t + "&p=" + s), e.couponRaniURL = i.trustAsResourceUrl("//couponkart.go2cloud.org/aff_l?offer_id=176&adv_sub=" + t + "&amount=" + s), e.pushInfoToAfiliates = !0
    }, e.init()
}]);
! function() {
    function a(a) {
        a.prev().addClass("top-card"), a.addClass("swipe-card-right"), setTimeout(function() {
            a.prev().addClass("active").removeClass("top-card"), a.removeClass("active swipe-card-right")
        }, 1e3);
        var s = a.attr("data-card-t"),
            t = $('.js-card-specific-scroll span[data-each-id="' + s + '"]');
        t.removeClass("active"), t.prev().addClass("active")
    }

    function s(a) {
        a.next().addClass("top-card"), a.addClass("swipe-card-left"), setTimeout(function() {
            a.next().addClass("active").removeClass("top-card"), a.removeClass("active swipe-card-left")
        }, 1e3);
        var s = a.attr("data-card-t"),
            t = $('.js-card-specific-scroll span[data-each-id="' + s + '"]');
        t.removeClass("active"), t.next().addClass("active")
    }

    function t(a) {
        c = $(".js-testimonials .each"), c.first().addClass("top-card"), a.addClass("swipe-card-left"), setTimeout(function() {
            c.first().addClass("active").removeClass("top-card"), a.removeClass("active swipe-card-left")
        }, 1e3);
        var s = a.attr("data-card-t");
        $('.js-card-specific-scroll span[data-each-id="' + s + '"]').removeClass("active"), $(".js-card-specific-scroll span:first-child").addClass("active")
    }

    function e(a) {
        c = $(".js-testimonials .each"), c.last().addClass("top-card"), a.addClass("swipe-card-right"), setTimeout(function() {
            c.last().addClass("active").removeClass("top-card"), a.removeClass("active swipe-card-right")
        }, 1e3);
        var s = a.attr("data-card-t");
        $('.js-card-specific-scroll span[data-each-id="' + s + '"]').removeClass("active"), $(".js-card-specific-scroll span:last-child").addClass("active")
    }
    var c = $(".js-testimonials .each"),
        i = setInterval(function() {
            var a = $(".js-testimonials .active"),
                e = $(".js-testimonials .each:last-child");
            e.hasClass("active") ? t(a) : s(a)
        }, 1e4);
    $(document).on("click", ".js-card-scroll", function() {
        var c = $(this).attr("data-scroll"),
            d = $(".js-testimonials .active");
        $(".js-card-scroll").attr("disabled", "disabled"), setTimeout(function() {
            $(".js-card-scroll").removeAttr("disabled")
        }, 1e3), "left" == c && d.is(":not(:first-child)") ? a(d) : "left" == c && d.is(":first-child") && e(d), "right" == c && d.is(":not(:last-child)") ? s(d) : "right" == c && d.is(":last-child") && t(d), window.clearInterval(i)
    }), $(document).on("click", ".js-card-specific-scroll span", function() {
        var a, s = $(this).attr("data-each-id"),
            t = $('.js-testimonials .each[data-card-t="' + s + '"]'),
            e = $(".js-testimonials .active"),
            c = e.attr("data-card-t");
        a = s < c ? "swipe-card-right" : "swipe-card-left", $(".js-card-specific-scroll span").removeClass("active").attr("disabled", "disabled"), $(this).addClass("active"), t.addClass("top-card"), e.addClass(a), setTimeout(function() {
            t.addClass("active").removeClass("top-card"), e.removeClass("active " + a), $(".js-card-specific-scroll span").removeAttr("disabled")
        }, 1e3), window.clearInterval(i)
    })
}();
"use strict";

function _typeof(t) {
    return t && "undefined" != typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
}! function(t) {
    if ("function" == typeof define && define.amd) define(["jquery"], t);
    else if ("object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports) {
        var i;
        try {
            i = require("jquery")
        } catch (e) {
            i = null
        }
        module.exports = t(i)
    } else window && (window.Slider = t(window.jQuery))
}(function(t) {
    var i;
    return function(t) {
            function i() {}

            function e(t) {
                function e(i) {
                    i.prototype.option || (i.prototype.option = function(i) {
                        t.isPlainObject(i) && (this.options = t.extend(!0, this.options, i))
                    })
                }

                function o(i, e) {
                    t.fn[i] = function(o) {
                        if ("string" == typeof o) {
                            for (var a = s.call(arguments, 1), h = 0, l = this.length; h < l; h++) {
                                var r = this[h],
                                    p = t.data(r, i);
                                if (p)
                                    if (t.isFunction(p[o]) && "_" !== o.charAt(0)) {
                                        var d = p[o].apply(p, a);
                                        if (void 0 !== d && d !== p) return d
                                    } else n("no such method '" + o + "' for " + i + " instance");
                                else n("cannot call methods on " + i + " prior to initialization; attempted to call '" + o + "'")
                            }
                            return this
                        }
                        var c = this.map(function() {
                            var s = t.data(this, i);
                            return s ? (s.option(o), s._init()) : (s = new e(this, o), t.data(this, i, s)), t(this)
                        });
                        return !c || c.length > 1 ? c : c[0]
                    }
                }
                if (t) {
                    var n = "undefined" == typeof console ? i : function(t) {
                        console.error(t)
                    };
                    return t.bridget = function(t, i) {
                        e(i), o(t, i)
                    }, t.bridget
                }
            }
            var s = Array.prototype.slice;
            e(t)
        }(t),
        function(t) {
            function e(i, e) {
                function s(t, i) {
                    var e = "data-slider-" + i.replace(/_/g, "-"),
                        s = t.getAttribute(e);
                    try {
                        return JSON.parse(s)
                    } catch (o) {
                        return s
                    }
                }
                this._state = {
                    value: null,
                    enabled: null,
                    offset: null,
                    size: null,
                    percentage: null,
                    inDrag: !1,
                    over: !1
                }, "string" == typeof i ? this.element = document.querySelector(i) : i instanceof HTMLElement && (this.element = i), e = e ? e : {};
                for (var n = Object.keys(this.defaultOptions), a = 0; a < n.length; a++) {
                    var h = n[a],
                        l = e[h];
                    l = "undefined" != typeof l ? l : s(this.element, h), l = null !== l ? l : this.defaultOptions[h], this.options || (this.options = {}), this.options[h] = l
                }
                "vertical" !== this.options.orientation || "top" !== this.options.tooltip_position && "bottom" !== this.options.tooltip_position ? "horizontal" !== this.options.orientation || "left" !== this.options.tooltip_position && "right" !== this.options.tooltip_position || (this.options.tooltip_position = "top") : this.options.tooltip_position = "right";
                var r, p, d, c, u, m = this.element.style.width,
                    _ = !1,
                    v = this.element.parentNode;
                if (this.sliderElem) _ = !0;
                else {
                    this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
                    var f = document.createElement("div");
                    f.className = "slider-track", p = document.createElement("div"), p.className = "slider-track-low", r = document.createElement("div"), r.className = "slider-selection", d = document.createElement("div"), d.className = "slider-track-high", c = document.createElement("div"), c.className = "slider-handle min-slider-handle", c.setAttribute("role", "slider"), c.setAttribute("aria-valuemin", this.options.min), c.setAttribute("aria-valuemax", this.options.max), u = document.createElement("div"), u.className = "slider-handle max-slider-handle", u.setAttribute("role", "slider"), u.setAttribute("aria-valuemin", this.options.min), u.setAttribute("aria-valuemax", this.options.max), f.appendChild(p), f.appendChild(r), f.appendChild(d);
                    var g = Array.isArray(this.options.labelledby);
                    if (g && this.options.labelledby[0] && c.setAttribute("aria-labelledby", this.options.labelledby[0]), g && this.options.labelledby[1] && u.setAttribute("aria-labelledby", this.options.labelledby[1]), !g && this.options.labelledby && (c.setAttribute("aria-labelledby", this.options.labelledby), u.setAttribute("aria-labelledby", this.options.labelledby)), this.ticks = [], Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                        for (a = 0; a < this.options.ticks.length; a++) {
                            var y = document.createElement("div");
                            y.className = "slider-tick", this.ticks.push(y), f.appendChild(y)
                        }
                        r.className += " tick-slider-selection"
                    }
                    if (f.appendChild(c), f.appendChild(u), this.tickLabels = [], Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0)
                        for (this.tickLabelContainer = document.createElement("div"), this.tickLabelContainer.className = "slider-tick-label-container", a = 0; a < this.options.ticks_labels.length; a++) {
                            var b = document.createElement("div"),
                                k = 0 === this.options.ticks_positions.length,
                                E = this.options.reversed && k ? this.options.ticks_labels.length - (a + 1) : a;
                            b.className = "slider-tick-label", b.innerHTML = this.options.ticks_labels[E], this.tickLabels.push(b), this.tickLabelContainer.appendChild(b)
                        }
                    var x = function(t) {
                            var i = document.createElement("div");
                            i.className = "tooltip-arrow";
                            var e = document.createElement("div");
                            e.className = "tooltip-inner", t.appendChild(i), t.appendChild(e)
                        },
                        C = document.createElement("div");
                    C.className = "tooltip tooltip-main", C.setAttribute("role", "presentation"), x(C);
                    var w = document.createElement("div");
                    w.className = "tooltip tooltip-min", w.setAttribute("role", "presentation"), x(w);
                    var L = document.createElement("div");
                    L.className = "tooltip tooltip-max", L.setAttribute("role", "presentation"), x(L), this.sliderElem.appendChild(f), this.sliderElem.appendChild(C), this.sliderElem.appendChild(w), this.sliderElem.appendChild(L), this.tickLabelContainer && this.sliderElem.appendChild(this.tickLabelContainer), v.insertBefore(this.sliderElem, this.element), this.element.style.display = "none"
                }
                if (t && (this.$element = t(this.element), this.$sliderElem = t(this.sliderElem)), this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"), this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), o[this.options.scale] && (this.options.scale = o[this.options.scale]), _ === !0 && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "top", "width", "height"].forEach(function(t) {
                        this._removeProperty(this.trackLow, t), this._removeProperty(this.trackSelection, t), this._removeProperty(this.trackHigh, t)
                    }, this), [this.handle1, this.handle2].forEach(function(t) {
                        this._removeProperty(t, "left"), this._removeProperty(t, "top")
                    }, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function(t) {
                        this._removeProperty(t, "left"), this._removeProperty(t, "top"), this._removeProperty(t, "margin-left"), this._removeProperty(t, "margin-top"), this._removeClass(t, "right"), this._removeClass(t, "top")
                    }, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = m, this.options.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth"), this._setTooltipPosition(), Array.isArray(this.options.ticks) && this.options.ticks.length > 0 && (this.options.max = Math.max.apply(Math, this.options.ticks), this.options.min = Math.min.apply(Math, this.options.ticks)), Array.isArray(this.options.value) ? (this.options.range = !0, this._state.value = this.options.value) : this.options.range ? this._state.value = [this.options.value, this.options.max] : this._state.value = this.options.value, this.trackLow = p || this.trackLow, this.trackSelection = r || this.trackSelection, this.trackHigh = d || this.trackHigh, "none" === this.options.selection && (this._addClass(this.trackLow, "hide"), this._addClass(this.trackSelection, "hide"), this._addClass(this.trackHigh, "hide")), this.handle1 = c || this.handle1, this.handle2 = u || this.handle2, _ === !0)
                    for (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"), a = 0; a < this.ticks.length; a++) this._removeClass(this.ticks[a], "round triangle hide");
                var P = ["round", "triangle", "custom"],
                    T = P.indexOf(this.options.handle) !== -1;
                if (T)
                    for (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle), a = 0; a < this.ticks.length; a++) this._addClass(this.ticks[a], this.options.handle);
                this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos], this.setValue(this._state.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 1), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.mousedown = this._mousedown.bind(this), this.touchCapable && this.sliderElem.addEventListener("touchstart", this.mousedown, !1), this.sliderElem.addEventListener("mousedown", this.mousedown, !1), this.resize = this._resize.bind(this), window.addEventListener("resize", this.resize, !1), "hide" === this.options.tooltip ? (this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide")) : "always" === this.options.tooltip ? (this._showTooltip(), this._alwaysShowTooltip = !0) : (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1), this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1)), this.options.enabled ? this.enable() : this.disable()
            }
            var s = {
                    formatInvalidInputErrorMsg: function(t) {
                        return "Invalid input value '" + t + "' passed in"
                    },
                    callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
                },
                o = {
                    linear: {
                        toValue: function(t) {
                            var i = t / 100 * (this.options.max - this.options.min),
                                e = !0;
                            if (this.options.ticks_positions.length > 0) {
                                for (var s, o, n, a = 0, h = 1; h < this.options.ticks_positions.length; h++)
                                    if (t <= this.options.ticks_positions[h]) {
                                        s = this.options.ticks[h - 1], n = this.options.ticks_positions[h - 1], o = this.options.ticks[h], a = this.options.ticks_positions[h];
                                        break
                                    }
                                var l = (t - n) / (a - n);
                                i = s + l * (o - s), e = !1
                            }
                            var r = e ? this.options.min : 0,
                                p = r + Math.round(i / this.options.step) * this.options.step;
                            return p < this.options.min ? this.options.min : p > this.options.max ? this.options.max : p
                        },
                        toPercentage: function(t) {
                            if (this.options.max === this.options.min) return 0;
                            if (this.options.ticks_positions.length > 0) {
                                for (var i, e, s, o = 0, n = 0; n < this.options.ticks.length; n++)
                                    if (t <= this.options.ticks[n]) {
                                        i = n > 0 ? this.options.ticks[n - 1] : 0, s = n > 0 ? this.options.ticks_positions[n - 1] : 0, e = this.options.ticks[n], o = this.options.ticks_positions[n];
                                        break
                                    }
                                if (n > 0) {
                                    var a = (t - i) / (e - i);
                                    return s + a * (o - s)
                                }
                            }
                            return 100 * (t - this.options.min) / (this.options.max - this.options.min)
                        }
                    },
                    logarithmic: {
                        toValue: function(t) {
                            var i = 0 === this.options.min ? 0 : Math.log(this.options.min),
                                e = Math.log(this.options.max),
                                s = Math.exp(i + (e - i) * t / 100);
                            return s = this.options.min + Math.round((s - this.options.min) / this.options.step) * this.options.step, s < this.options.min ? this.options.min : s > this.options.max ? this.options.max : s
                        },
                        toPercentage: function(t) {
                            if (this.options.max === this.options.min) return 0;
                            var i = Math.log(this.options.max),
                                e = 0 === this.options.min ? 0 : Math.log(this.options.min),
                                s = 0 === t ? 0 : Math.log(t);
                            return 100 * (s - e) / (i - e)
                        }
                    }
                };
            if (i = function(t, i) {
                    return e.call(this, t, i), this
                }, i.prototype = {
                    _init: function() {},
                    constructor: i,
                    defaultOptions: {
                        id: "",
                        min: 0,
                        max: 10,
                        step: 1,
                        precision: 0,
                        orientation: "horizontal",
                        value: 5,
                        range: !1,
                        selection: "before",
                        tooltip: "show",
                        tooltip_split: !1,
                        handle: "round",
                        reversed: !1,
                        enabled: !0,
                        formatter: function(t) {
                            return Array.isArray(t) ? t[0] + " : " + t[1] : t
                        },
                        natural_arrow_keys: !1,
                        ticks: [],
                        ticks_positions: [],
                        ticks_labels: [],
                        ticks_snap_bounds: 0,
                        scale: "linear",
                        focus: !1,
                        tooltip_position: null,
                        labelledby: null
                    },
                    getElement: function() {
                        return this.sliderElem
                    },
                    getValue: function() {
                        return this.options.range ? this._state.value : this._state.value[0]
                    },
                    setValue: function(t, i, e) {
                        t || (t = 0);
                        var s = this.getValue();
                        this._state.value = this._validateInputValue(t);
                        var o = this._applyPrecision.bind(this);
                        this.options.range ? (this._state.value[0] = o(this._state.value[0]), this._state.value[1] = o(this._state.value[1]), this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0])), this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]))) : (this._state.value = o(this._state.value), this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))], this._addClass(this.handle2, "hide"), "after" === this.options.selection ? this._state.value[1] = this.options.max : this._state.value[1] = this.options.min), this.options.max > this.options.min ? this._state.percentage = [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), 100 * this.options.step / (this.options.max - this.options.min)] : this._state.percentage = [0, 0, 100], this._layout();
                        var n = this.options.range ? this._state.value : this._state.value[0];
                        return this._setDataVal(n), i === !0 && this._trigger("slide", n), s !== n && e === !0 && this._trigger("change", {
                            oldValue: s,
                            newValue: n
                        }), this
                    },
                    destroy: function() {
                        this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), t && (this._unbindJQueryEventHandlers(), this.$element.removeData("slider"))
                    },
                    disable: function() {
                        return this._state.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this
                    },
                    enable: function() {
                        return this._state.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this
                    },
                    toggle: function() {
                        return this._state.enabled ? this.disable() : this.enable(), this
                    },
                    isEnabled: function() {
                        return this._state.enabled
                    },
                    on: function(t, i) {
                        return this._bindNonQueryEventHandler(t, i), this
                    },
                    off: function(i, e) {
                        t ? (this.$element.off(i, e), this.$sliderElem.off(i, e)) : this._unbindNonQueryEventHandler(i, e)
                    },
                    getAttribute: function(t) {
                        return t ? this.options[t] : this.options
                    },
                    setAttribute: function(t, i) {
                        return this.options[t] = i, this
                    },
                    refresh: function() {
                        return this._removeSliderEventHandlers(), e.call(this, this.element, this.options), t && t.data(this.element, "slider", this), this
                    },
                    relayout: function() {
                        return this._layout(), this
                    },
                    _removeSliderEventHandlers: function() {
                        this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.showTooltip && (this.handle1.removeEventListener("focus", this.showTooltip, !1), this.handle2.removeEventListener("focus", this.showTooltip, !1)), this.hideTooltip && (this.handle1.removeEventListener("blur", this.hideTooltip, !1), this.handle2.removeEventListener("blur", this.hideTooltip, !1)), this.showTooltip && this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.hideTooltip && this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.mousedown, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1), window.removeEventListener("resize", this.resize, !1)
                    },
                    _bindNonQueryEventHandler: function(t, i) {
                        void 0 === this.eventToCallbackMap[t] && (this.eventToCallbackMap[t] = []), this.eventToCallbackMap[t].push(i)
                    },
                    _unbindNonQueryEventHandler: function(t, i) {
                        var e = this.eventToCallbackMap[t];
                        if (void 0 !== e)
                            for (var s = 0; s < e.length; s++)
                                if (e[s] === i) {
                                    e.splice(s, 1);
                                    break
                                }
                    },
                    _cleanUpEventCallbacksMap: function() {
                        for (var t = Object.keys(this.eventToCallbackMap), i = 0; i < t.length; i++) {
                            var e = t[i];
                            this.eventToCallbackMap[e] = null
                        }
                    },
                    _showTooltip: function() {
                        this.options.tooltip_split === !1 ? (this._addClass(this.tooltip, "in"), this.tooltip_min.style.display = "none", this.tooltip_max.style.display = "none") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in"), this.tooltip.style.display = "none"), this._state.over = !0
                    },
                    _hideTooltip: function() {
                        this._state.inDrag === !1 && this.alwaysShowTooltip !== !0 && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this._state.over = !1
                    },
                    _layout: function() {
                        var t;
                        if (t = this.options.reversed ? [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]] : [this._state.percentage[0], this._state.percentage[1]], this.handle1.style[this.stylePos] = t[0] + "%", this.handle1.setAttribute("aria-valuenow", this._state.value[0]), this.handle2.style[this.stylePos] = t[1] + "%", this.handle2.setAttribute("aria-valuenow", this._state.value[1]), Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                            var i = "vertical" === this.options.orientation ? "height" : "width",
                                e = "vertical" === this.options.orientation ? "marginTop" : "marginLeft",
                                s = this._state.size / (this.options.ticks.length - 1);
                            if (this.tickLabelContainer) {
                                var o = 0;
                                if (0 === this.options.ticks_positions.length) "vertical" !== this.options.orientation && (this.tickLabelContainer.style[e] = -s / 2 + "px"), o = this.tickLabelContainer.offsetHeight;
                                else
                                    for (n = 0; n < this.tickLabelContainer.childNodes.length; n++) this.tickLabelContainer.childNodes[n].offsetHeight > o && (o = this.tickLabelContainer.childNodes[n].offsetHeight);
                                "horizontal" === this.options.orientation && (this.sliderElem.style.marginBottom = o + "px")
                            }
                            for (var n = 0; n < this.options.ticks.length; n++) {
                                var a = this.options.ticks_positions[n] || this._toPercentage(this.options.ticks[n]);
                                this.options.reversed && (a = 100 - a), this.ticks[n].style[this.stylePos] = a + "%", this._removeClass(this.ticks[n], "in-selection"), this.options.range ? a >= t[0] && a <= t[1] && this._addClass(this.ticks[n], "in-selection") : "after" === this.options.selection && a >= t[0] ? this._addClass(this.ticks[n], "in-selection") : "before" === this.options.selection && a <= t[0] && this._addClass(this.ticks[n], "in-selection"), this.tickLabels[n] && (this.tickLabels[n].style[i] = s + "px", "vertical" !== this.options.orientation && void 0 !== this.options.ticks_positions[n] ? (this.tickLabels[n].style.position = "absolute", this.tickLabels[n].style[this.stylePos] = a + "%", this.tickLabels[n].style[e] = -s / 2 + "px") : "vertical" === this.options.orientation && (this.tickLabels[n].style.marginLeft = this.sliderElem.offsetWidth + "px", this.tickLabelContainer.style.marginTop = this.sliderElem.offsetWidth / 2 * -1 + "px"))
                            }
                        }
                        var h;
                        if (this.options.range) {
                            h = this.options.formatter(this._state.value), this._setText(this.tooltipInner, h), this.tooltip.style[this.stylePos] = (t[1] + t[0]) / 2 + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px"), "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
                            var l = this.options.formatter(this._state.value[0]);
                            this._setText(this.tooltipInner_min, l);
                            var r = this.options.formatter(this._state.value[1]);
                            this._setText(this.tooltipInner_max, r), this.tooltip_min.style[this.stylePos] = t[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_min, "margin-top", -this.tooltip_min.offsetHeight / 2 + "px") : this._css(this.tooltip_min, "margin-left", -this.tooltip_min.offsetWidth / 2 + "px"), this.tooltip_max.style[this.stylePos] = t[1] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_max, "margin-top", -this.tooltip_max.offsetHeight / 2 + "px") : this._css(this.tooltip_max, "margin-left", -this.tooltip_max.offsetWidth / 2 + "px")
                        } else h = this.options.formatter(this._state.value[0]), this._setText(this.tooltipInner, h), this.tooltip.style[this.stylePos] = t[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
                        if ("vertical" === this.options.orientation) this.trackLow.style.top = "0", this.trackLow.style.height = Math.min(t[0], t[1]) + "%", this.trackSelection.style.top = Math.min(t[0], t[1]) + "%", this.trackSelection.style.height = Math.abs(t[0] - t[1]) + "%", this.trackHigh.style.bottom = "0", this.trackHigh.style.height = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%";
                        else {
                            this.trackLow.style.left = "0", this.trackLow.style.width = Math.min(t[0], t[1]) + "%", this.trackSelection.style.left = Math.min(t[0], t[1]) + "%", this.trackSelection.style.width = Math.abs(t[0] - t[1]) + "%", this.trackHigh.style.right = "0", this.trackHigh.style.width = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%";
                            var p = this.tooltip_min.getBoundingClientRect(),
                                d = this.tooltip_max.getBoundingClientRect();
                            "bottom" === this.options.tooltip_position ? p.right > d.left ? (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = "", this.tooltip_max.style.bottom = "22px") : (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = this.tooltip_min.style.top, this.tooltip_max.style.bottom = "") : p.right > d.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = this.tooltip_min.style.top)
                        }
                    },
                    _resize: function(t) {
                        this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos], this._layout()
                    },
                    _removeProperty: function(t, i) {
                        t.style.removeProperty ? t.style.removeProperty(i) : t.style.removeAttribute(i)
                    },
                    _mousedown: function(t) {
                        if (!this._state.enabled) return !1;
                        this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos];
                        var i = this._getPercentage(t);
                        if (this.options.range) {
                            var e = Math.abs(this._state.percentage[0] - i),
                                s = Math.abs(this._state.percentage[1] - i);
                            this._state.dragged = e < s ? 0 : 1
                        } else this._state.dragged = 0;
                        this._state.percentage[this._state.dragged] = i, this._layout(), this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !0;
                        var o = this._calculateValue();
                        return this._trigger("slideStart", o), this._setDataVal(o), this.setValue(o, !1, !0), this._pauseEvent(t), this.options.focus && this._triggerFocusOnHandle(this._state.dragged), !0
                    },
                    _triggerFocusOnHandle: function(t) {
                        0 === t && this.handle1.focus(), 1 === t && this.handle2.focus()
                    },
                    _keydown: function(t, i) {
                        if (!this._state.enabled) return !1;
                        var e;
                        switch (i.keyCode) {
                            case 37:
                            case 40:
                                e = -1;
                                break;
                            case 39:
                            case 38:
                                e = 1
                        }
                        if (e) {
                            if (this.options.natural_arrow_keys) {
                                var s = "vertical" === this.options.orientation && !this.options.reversed,
                                    o = "horizontal" === this.options.orientation && this.options.reversed;
                                (s || o) && (e = -e)
                            }
                            var n = this._state.value[t] + e * this.options.step;
                            return this.options.range && (n = [t ? this._state.value[0] : n, t ? n : this._state.value[1]]), this._trigger("slideStart", n), this._setDataVal(n), this.setValue(n, !0, !0), this._setDataVal(n), this._trigger("slideStop", n), this._layout(), this._pauseEvent(i), !1
                        }
                    },
                    _pauseEvent: function(t) {
                        t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1
                    },
                    _mousemove: function(t) {
                        if (!this._state.enabled) return !1;
                        var i = this._getPercentage(t);
                        this._adjustPercentageForRangeSliders(i), this._state.percentage[this._state.dragged] = i, this._layout();
                        var e = this._calculateValue(!0);
                        return this.setValue(e, !0, !0), !1
                    },
                    _adjustPercentageForRangeSliders: function(t) {
                        if (this.options.range) {
                            var i = this._getNumDigitsAfterDecimalPlace(t);
                            i = i ? i - 1 : 0;
                            var e = this._applyToFixedAndParseFloat(t, i);
                            0 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[1], i) < e ? (this._state.percentage[0] = this._state.percentage[1], this._state.dragged = 1) : 1 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[0], i) > e && (this._state.percentage[1] = this._state.percentage[0], this._state.dragged = 0)
                        }
                    },
                    _mouseup: function() {
                        if (!this._state.enabled) return !1;
                        this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !1, this._state.over === !1 && this._hideTooltip();
                        var t = this._calculateValue(!0);
                        return this._layout(), this._setDataVal(t), this._trigger("slideStop", t), !1
                    },
                    _calculateValue: function(t) {
                        var i;
                        if (this.options.range ? (i = [this.options.min, this.options.max], 0 !== this._state.percentage[0] && (i[0] = this._toValue(this._state.percentage[0]), i[0] = this._applyPrecision(i[0])), 100 !== this._state.percentage[1] && (i[1] = this._toValue(this._state.percentage[1]), i[1] = this._applyPrecision(i[1]))) : (i = this._toValue(this._state.percentage[0]), i = parseFloat(i), i = this._applyPrecision(i)), t) {
                            for (var e = [i, 1 / 0], s = 0; s < this.options.ticks.length; s++) {
                                var o = Math.abs(this.options.ticks[s] - i);
                                o <= e[1] && (e = [this.options.ticks[s], o])
                            }
                            if (e[1] <= this.options.ticks_snap_bounds) return e[0]
                        }
                        return i
                    },
                    _applyPrecision: function(t) {
                        var i = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
                        return this._applyToFixedAndParseFloat(t, i)
                    },
                    _getNumDigitsAfterDecimalPlace: function(t) {
                        var i = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                        return i ? Math.max(0, (i[1] ? i[1].length : 0) - (i[2] ? +i[2] : 0)) : 0
                    },
                    _applyToFixedAndParseFloat: function(t, i) {
                        var e = t.toFixed(i);
                        return parseFloat(e)
                    },
                    _getPercentage: function(t) {
                        !this.touchCapable || "touchstart" !== t.type && "touchmove" !== t.type || (t = t.touches[0]);
                        var i = t[this.mousePos],
                            e = this._state.offset[this.stylePos],
                            s = i - e,
                            o = s / this._state.size * 100;
                        return o = Math.round(o / this._state.percentage[2]) * this._state.percentage[2], this.options.reversed && (o = 100 - o), Math.max(0, Math.min(100, o))
                    },
                    _validateInputValue: function(t) {
                        if ("number" == typeof t) return t;
                        if (Array.isArray(t)) return this._validateArray(t), t;
                        throw new Error(s.formatInvalidInputErrorMsg(t))
                    },
                    _validateArray: function(t) {
                        for (var i = 0; i < t.length; i++) {
                            var e = t[i];
                            if ("number" != typeof e) throw new Error(s.formatInvalidInputErrorMsg(e))
                        }
                    },
                    _setDataVal: function(t) {
                        this.element.setAttribute("data-value", t), this.element.setAttribute("value", t), this.element.value = t
                    },
                    _trigger: function(i, e) {
                        e = e || 0 === e ? e : void 0;
                        var s = this.eventToCallbackMap[i];
                        if (s && s.length)
                            for (var o = 0; o < s.length; o++) {
                                var n = s[o];
                                n(e)
                            }
                        t && this._triggerJQueryEvent(i, e)
                    },
                    _triggerJQueryEvent: function(t, i) {
                        var e = {
                            type: t,
                            value: i
                        };
                        this.$element.trigger(e), this.$sliderElem.trigger(e)
                    },
                    _unbindJQueryEventHandlers: function() {
                        this.$element.off(), this.$sliderElem.off()
                    },
                    _setText: function(t, i) {
                        "undefined" != typeof t.textContent ? t.textContent = i : "undefined" != typeof t.innerText && (t.innerText = i)
                    },
                    _removeClass: function(t, i) {
                        for (var e = i.split(" "), s = t.className, o = 0; o < e.length; o++) {
                            var n = e[o],
                                a = new RegExp("(?:\\s|^)" + n + "(?:\\s|$)");
                            s = s.replace(a, " ")
                        }
                        t.className = s.trim()
                    },
                    _addClass: function(t, i) {
                        for (var e = i.split(" "), s = t.className, o = 0; o < e.length; o++) {
                            var n = e[o],
                                a = new RegExp("(?:\\s|^)" + n + "(?:\\s|$)"),
                                h = a.test(s);
                            h || (s += " " + n)
                        }
                        t.className = s.trim()
                    },
                    _offsetLeft: function(t) {
                        return t.getBoundingClientRect().left
                    },
                    _offsetTop: function(t) {
                        for (var i = t.offsetTop;
                            (t = t.offsetParent) && !isNaN(t.offsetTop);) i += t.offsetTop, "BODY" !== t.tagName && (i -= t.scrollTop);
                        return i
                    },
                    _offset: function(t) {
                        return {
                            left: this._offsetLeft(t),
                            top: this._offsetTop(t)
                        }
                    },
                    _css: function(i, e, s) {
                        if (t) t.style(i, e, s);
                        else {
                            var o = e.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(t, i) {
                                return i.toUpperCase()
                            });
                            i.style[o] = s
                        }
                    },
                    _toValue: function(t) {
                        return this.options.scale.toValue.apply(this, [t])
                    },
                    _toPercentage: function(t) {
                        return this.options.scale.toPercentage.apply(this, [t])
                    },
                    _setTooltipPosition: function() {
                        var t = [this.tooltip, this.tooltip_min, this.tooltip_max];
                        if ("vertical" === this.options.orientation) {
                            var i = this.options.tooltip_position || "right",
                                e = "left" === i ? "right" : "left";
                            t.forEach(function(t) {
                                this._addClass(t, i), t.style[e] = "100%"
                            }.bind(this))
                        } else "bottom" === this.options.tooltip_position ? t.forEach(function(t) {
                            this._addClass(t, "bottom"), t.style.top = "22px"
                        }.bind(this)) : t.forEach(function(t) {
                            this._addClass(t, "top"), t.style.top = -this.tooltip.outerHeight - 14 + "px"
                        }.bind(this))
                    }
                }, t) {
                var n = t.fn.slider ? "bootstrapSlider" : "slider";
                t.bridget(n, i), t(function() {
                    t("input[data-provide=slider]")[n]()
                })
            }
        }(t), i
});
(function() {
    var t, i;
    t = this.jQuery || window.jQuery, i = t(window), t.fn.stick_in_parent = function(o) {
        var e, s, r, n, l, a, c, p, d, u, f, h, g;
        for (null == o && (o = {}), g = o.sticky_class, a = o.inner_scrolling, h = o.recalc_every, f = o.parent, d = o.offset_top, p = o.spacer, r = o.bottoming, null == d && (d = 0), null == f && (f = void 0), null == a && (a = !0), null == g && (g = "is_stuck"), e = t(document), null == r && (r = !0), u = function(t) {
                var i, o, e;
                return window.getComputedStyle ? (i = t[0], o = window.getComputedStyle(t[0]), e = parseFloat(o.getPropertyValue("width")) + parseFloat(o.getPropertyValue("margin-left")) + parseFloat(o.getPropertyValue("margin-right")), "border-box" !== o.getPropertyValue("box-sizing") && (e += parseFloat(o.getPropertyValue("border-left-width")) + parseFloat(o.getPropertyValue("border-right-width")) + parseFloat(o.getPropertyValue("padding-left")) + parseFloat(o.getPropertyValue("padding-right"))), e) : t.outerWidth(!0)
            }, n = function(o, s, n, l, c, y, k, m) {
                var v, b, w, _, x, P, V, F, C, z, I, A;
                if (!o.data("sticky_kit")) {
                    if (o.data("sticky_kit", !0), x = e.height(), V = o.parent(), null != f && (V = V.closest(f)), !V.length) throw "failed to find stick parent";
                    if (w = !1, v = !1, I = null != p ? p && o.closest(p) : t("<div />"), I && I.css("position", o.css("position")), F = function() {
                            var t, i, r;
                            if (!m) return x = e.height(), t = parseInt(V.css("border-top-width"), 10), i = parseInt(V.css("padding-top"), 10), s = parseInt(V.css("padding-bottom"), 10), n = V.offset().top + t + i, l = V.height(), w && (w = !1, v = !1, null == p && (o.insertAfter(I), I.detach()), o.css({
                                position: "",
                                top: "",
                                width: "",
                                bottom: ""
                            }).removeClass(g), r = !0), c = o.offset().top - (parseInt(o.css("margin-top"), 10) || 0) - d, y = o.outerHeight(!0), k = o.css("float"), I && I.css({
                                width: u(o),
                                height: y,
                                display: o.css("display"),
                                "vertical-align": o.css("vertical-align"),
                                "float": k
                            }), r ? A() : void 0
                        }, F(), y !== l) return _ = void 0, P = d, z = h, A = function() {
                        var t, u, f, b, C, A;
                        if (!m) return f = !1, null != z && (z -= 1, z <= 0 && (z = h, F(), f = !0)), f || e.height() === x || (F(), f = !0), b = i.scrollTop(), null != _ && (u = b - _), _ = b, w ? (r && (C = b + y + P > l + n, v && !C && (v = !1, o.css({
                            position: "fixed",
                            bottom: "",
                            top: P
                        }).trigger("sticky_kit:unbottom"))), b < c && (w = !1, P = d, null == p && ("left" !== k && "right" !== k || o.insertAfter(I), I.detach()), t = {
                            position: "",
                            width: "",
                            top: ""
                        }, o.css(t).removeClass(g).trigger("sticky_kit:unstick")), a && (A = i.height(), y + d > A && (v || (P -= u, P = Math.max(A - y, P), P = Math.min(d, P), w && o.css({
                            top: P + "px"
                        }))))) : b > c && (w = !0, t = {
                            position: "fixed",
                            top: P
                        }, t.width = "border-box" === o.css("box-sizing") ? o.outerWidth() + "px" : o.width() + "px", o.css(t).addClass(g), null == p && (o.after(I), "left" !== k && "right" !== k || I.append(o)), o.trigger("sticky_kit:stick")), w && r && (null == C && (C = b + y + P > l + n), !v && C) ? (v = !0, "static" === V.css("position") && V.css({
                            position: "relative"
                        }), o.css({
                            position: "absolute",
                            bottom: s,
                            top: "auto"
                        }).trigger("sticky_kit:bottom")) : void 0
                    }, C = function() {
                        return F(), A()
                    }, b = function() {
                        if (m = !0, i.off("touchmove", A), i.off("scroll", A), i.off("resize", C), t(document.body).off("sticky_kit:recalc", C), o.off("sticky_kit:detach", b), o.removeData("sticky_kit"), o.css({
                                position: "",
                                bottom: "",
                                top: "",
                                width: ""
                            }), V.position("position", ""), w) return null == p && ("left" !== k && "right" !== k || o.insertAfter(I), I.remove()), o.removeClass(g)
                    }, i.on("touchmove", A), i.on("scroll", A), i.on("resize", C), t(document.body).on("sticky_kit:recalc", C), o.on("sticky_kit:detach", b), setTimeout(A, 0)
                }
            }, l = 0, c = this.length; l < c; l++) s = this[l], n(t(s));
        return this
    }
}).call(this);
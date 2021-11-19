/*!
 Buttons for DataTables 1.7.1
 ©2016-2021 SpryMedia Ltd - datatables.net/license
*/
(function (e) {
    "function" === typeof define && define.amd
        ? define(["jquery", "datatables.net"], function (r) {
              return e(r, window, document);
          })
        : "object" === typeof exports
        ? (module.exports = function (r, q) {
              r || (r = window);
              if (!q || !q.fn.dataTable) q = require("datatables.net")(r, q).$;
              return e(q, r, r.document);
          })
        : e(jQuery, window, document);
})(function (e, r, q, l) {
    function t(a, b, c) {
        e.fn.animate ? a.stop().fadeIn(b, c) : (a.css("display", "block"), c && c.call(a));
    }
    function u(a, b, c) {
        e.fn.animate ? a.stop().fadeOut(b, c) : (a.css("display", "none"), c && c.call(a));
    }
    function w(a, b) {
        var c = new j.Api(a),
            d = b ? b : c.init().buttons || j.defaults.buttons;
        return new o(c, d).container();
    }
    var j = e.fn.dataTable,
        z = 0,
        A = 0,
        p = j.ext.buttons,
        o = function (a, b) {
            if (!(this instanceof o))
                return function (b) {
                    return new o(b, a).container();
                };
            "undefined" === typeof b && (b = {});
            !0 === b && (b = {});
            Array.isArray(b) && (b = { buttons: b });
            this.c = e.extend(!0, {}, o.defaults, b);
            b.buttons && (this.c.buttons = b.buttons);
            this.s = { dt: new j.Api(a), buttons: [], listenKeys: "", namespace: "dtb" + z++ };
            this.dom = { container: e("<" + this.c.dom.container.tag + "/>").addClass(this.c.dom.container.className) };
            this._constructor();
        };
    e.extend(o.prototype, {
        action: function (a, b) {
            var c = this._nodeToButton(a);
            if (b === l) return c.conf.action;
            c.conf.action = b;
            return this;
        },
        active: function (a, b) {
            var c = this._nodeToButton(a),
                d = this.c.dom.button.active,
                c = e(c.node);
            if (b === l) return c.hasClass(d);
            c.toggleClass(d, b === l ? !0 : b);
            return this;
        },
        add: function (a, b) {
            var c = this.s.buttons;
            if ("string" === typeof b) {
                for (var d = b.split("-"), e = this.s, c = 0, h = d.length - 1; c < h; c++) e = e.buttons[1 * d[c]];
                c = e.buttons;
                b = 1 * d[d.length - 1];
            }
            this._expandButton(c, a, e !== l, b);
            this._draw();
            return this;
        },
        container: function () {
            return this.dom.container;
        },
        disable: function (a) {
            a = this._nodeToButton(a);
            e(a.node).addClass(this.c.dom.button.disabled).attr("disabled", !0);
            return this;
        },
        destroy: function () {
            e("body").off("keyup." + this.s.namespace);
            var a = this.s.buttons.slice(),
                b,
                c;
            b = 0;
            for (c = a.length; b < c; b++) this.remove(a[b].node);
            this.dom.container.remove();
            a = this.s.dt.settings()[0];
            b = 0;
            for (c = a.length; b < c; b++)
                if (a.inst === this) {
                    a.splice(b, 1);
                    break;
                }
            return this;
        },
        enable: function (a, b) {
            if (!1 === b) return this.disable(a);
            var c = this._nodeToButton(a);
            e(c.node).removeClass(this.c.dom.button.disabled).removeAttr("disabled");
            return this;
        },
        name: function () {
            return this.c.name;
        },
        node: function (a) {
            if (!a) return this.dom.container;
            a = this._nodeToButton(a);
            return e(a.node);
        },
        processing: function (a, b) {
            var c = this.s.dt,
                d = this._nodeToButton(a);
            if (b === l) return e(d.node).hasClass("processing");
            e(d.node).toggleClass("processing", b);
            e(c.table().node()).triggerHandler("buttons-processing.dt", [b, c.button(a), c, e(a), d.conf]);
            return this;
        },
        remove: function (a) {
            var b = this._nodeToButton(a),
                c = this._nodeToHost(a),
                d = this.s.dt;
            if (b.buttons.length) for (var f = b.buttons.length - 1; 0 <= f; f--) this.remove(b.buttons[f].node);
            b.conf.destroy && b.conf.destroy.call(d.button(a), d, e(a), b.conf);
            this._removeKey(b.conf);
            e(b.node).remove();
            a = e.inArray(b, c);
            c.splice(a, 1);
            return this;
        },
        text: function (a, b) {
            var c = this._nodeToButton(a),
                d = this.c.dom.collection.buttonLiner,
                d = c.inCollection && d && d.tag ? d.tag : this.c.dom.buttonLiner.tag,
                f = this.s.dt,
                h = e(c.node),
                i = function (a) {
                    return "function" === typeof a ? a(f, h, c.conf) : a;
                };
            if (b === l) return i(c.conf.text);
            c.conf.text = b;
            d ? h.children(d).html(i(b)) : h.html(i(b));
            return this;
        },
        _constructor: function () {
            var a = this,
                b = this.s.dt,
                c = b.settings()[0],
                d = this.c.buttons;
            c._buttons || (c._buttons = []);
            c._buttons.push({ inst: this, name: this.c.name });
            for (var f = 0, h = d.length; f < h; f++) this.add(d[f]);
            b.on("destroy", function (b, d) {
                d === c && a.destroy();
            });
            e("body").on("keyup." + this.s.namespace, function (b) {
                if (!q.activeElement || q.activeElement === q.body) {
                    var c = String.fromCharCode(b.keyCode).toLowerCase();
                    a.s.listenKeys.toLowerCase().indexOf(c) !== -1 && a._keypress(c, b);
                }
            });
        },
        _addKey: function (a) {
            a.key && (this.s.listenKeys += e.isPlainObject(a.key) ? a.key.key : a.key);
        },
        _draw: function (a, b) {
            a || ((a = this.dom.container), (b = this.s.buttons));
            a.children().detach();
            for (var c = 0, d = b.length; c < d; c++) a.append(b[c].inserter), a.append(" "), b[c].buttons && b[c].buttons.length && this._draw(b[c].collection, b[c].buttons);
        },
        _expandButton: function (a, b, c, d) {
            for (var f = this.s.dt, h = 0, b = !Array.isArray(b) ? [b] : b, i = 0, k = b.length; i < k; i++) {
                var m = this._resolveExtends(b[i]);
                if (m)
                    if (Array.isArray(m)) this._expandButton(a, m, c, d);
                    else {
                        var g = this._buildButton(m, c);
                        g &&
                            (d !== l && null !== d ? (a.splice(d, 0, g), d++) : a.push(g),
                            g.conf.buttons && ((g.collection = e("<" + this.c.dom.collection.tag + "/>")), (g.conf._collection = g.collection), this._expandButton(g.buttons, g.conf.buttons, !0, d)),
                            m.init && m.init.call(f.button(g.node), f, e(g.node), m),
                            h++);
                    }
            }
        },
        _buildButton: function (a, b) {
            var c = this.c.dom.button,
                d = this.c.dom.buttonLiner,
                f = this.c.dom.collection,
                h = this.s.dt,
                i = function (b) {
                    return "function" === typeof b ? b(h, g, a) : b;
                };
            b && f.button && (c = f.button);
            b && f.buttonLiner && (d = f.buttonLiner);
            if (a.available && !a.available(h, a)) return !1;
            var k = function (a, b, c, d) {
                    d.action.call(b.button(c), a, b, c, d);
                    e(b.table().node()).triggerHandler("buttons-action.dt", [b.button(c), b, c, d]);
                },
                f = a.tag || c.tag,
                m = a.clickBlurs === l ? !0 : a.clickBlurs,
                g = e("<" + f + "/>")
                    .addClass(c.className)
                    .attr("tabindex", this.s.dt.settings()[0].iTabIndex)
                    .attr("aria-controls", this.s.dt.table().node().id)
                    .on("click.dtb", function (b) {
                        b.preventDefault();
                        !g.hasClass(c.disabled) && a.action && k(b, h, g, a);
                        m && g.trigger("blur");
                    })
                    .on("keyup.dtb", function (b) {
                        b.keyCode === 13 && !g.hasClass(c.disabled) && a.action && k(b, h, g, a);
                    });
            "a" === f.toLowerCase() && g.attr("href", "#");
            "button" === f.toLowerCase() && g.attr("type", "button");
            d.tag
                ? ((f = e("<" + d.tag + "/>")
                      .html(i(a.text))
                      .addClass(d.className)),
                  "a" === d.tag.toLowerCase() && f.attr("href", "#"),
                  g.append(f))
                : g.html(i(a.text));
            !1 === a.enabled && g.addClass(c.disabled);
            a.className && g.addClass(a.className);
            a.titleAttr && g.attr("title", i(a.titleAttr));
            a.attr && g.attr(a.attr);
            a.namespace || (a.namespace = ".dt-button-" + A++);
            d =
                (d = this.c.dom.buttonContainer) && d.tag
                    ? e("<" + d.tag + "/>")
                          .addClass(d.className)
                          .append(g)
                    : g;
            this._addKey(a);
            this.c.buttonCreated && (d = this.c.buttonCreated(a, d));
            return { conf: a, node: g.get(0), inserter: d, buttons: [], inCollection: b, collection: null };
        },
        _nodeToButton: function (a, b) {
            b || (b = this.s.buttons);
            for (var c = 0, d = b.length; c < d; c++) {
                if (b[c].node === a) return b[c];
                if (b[c].buttons.length) {
                    var e = this._nodeToButton(a, b[c].buttons);
                    if (e) return e;
                }
            }
        },
        _nodeToHost: function (a, b) {
            b || (b = this.s.buttons);
            for (var c = 0, d = b.length; c < d; c++) {
                if (b[c].node === a) return b;
                if (b[c].buttons.length) {
                    var e = this._nodeToHost(a, b[c].buttons);
                    if (e) return e;
                }
            }
        },
        _keypress: function (a, b) {
            if (!b._buttonsHandled) {
                var c = function (d) {
                    for (var f = 0, h = d.length; f < h; f++) {
                        var i = d[f].conf,
                            k = d[f].node;
                        if (i.key)
                            if (i.key === a) (b._buttonsHandled = !0), e(k).click();
                            else if (e.isPlainObject(i.key) && i.key.key === a && (!i.key.shiftKey || b.shiftKey))
                                if (!i.key.altKey || b.altKey) if (!i.key.ctrlKey || b.ctrlKey) if (!i.key.metaKey || b.metaKey) (b._buttonsHandled = !0), e(k).click();
                        d[f].buttons.length && c(d[f].buttons);
                    }
                };
                c(this.s.buttons);
            }
        },
        _removeKey: function (a) {
            if (a.key) {
                var b = e.isPlainObject(a.key) ? a.key.key : a.key,
                    a = this.s.listenKeys.split(""),
                    b = e.inArray(b, a);
                a.splice(b, 1);
                this.s.listenKeys = a.join("");
            }
        },
        _resolveExtends: function (a) {
            for (
                var b = this.s.dt,
                    c,
                    d,
                    f = function (c) {
                        for (var d = 0; !e.isPlainObject(c) && !Array.isArray(c); ) {
                            if (c === l) return;
                            if ("function" === typeof c) {
                                if (((c = c(b, a)), !c)) return !1;
                            } else if ("string" === typeof c) {
                                if (!p[c]) throw "Unknown button type: " + c;
                                c = p[c];
                            }
                            d++;
                            if (30 < d) throw "Buttons: Too many iterations";
                        }
                        return Array.isArray(c) ? c : e.extend({}, c);
                    },
                    a = f(a);
                a && a.extend;

            ) {
                if (!p[a.extend]) throw "Cannot extend unknown button type: " + a.extend;
                var h = f(p[a.extend]);
                if (Array.isArray(h)) return h;
                if (!h) return !1;
                c = h.className;
                a = e.extend({}, h, a);
                c && a.className !== c && (a.className = c + " " + a.className);
                var i = a.postfixButtons;
                if (i) {
                    a.buttons || (a.buttons = []);
                    c = 0;
                    for (d = i.length; c < d; c++) a.buttons.push(i[c]);
                    a.postfixButtons = null;
                }
                if ((i = a.prefixButtons)) {
                    a.buttons || (a.buttons = []);
                    c = 0;
                    for (d = i.length; c < d; c++) a.buttons.splice(c, 0, i[c]);
                    a.prefixButtons = null;
                }
                a.extend = h.extend;
            }
            return a;
        },
        _popover: function (a, b, c) {
            var d = this.c,
                f = e.extend(
                    {
                        align: "button-left",
                        autoClose: !1,
                        background: !0,
                        backgroundClassName: "dt-button-background",
                        contentClassName: d.dom.collection.className,
                        collectionLayout: "",
                        collectionTitle: "",
                        dropup: !1,
                        fade: 400,
                        rightAlignClassName: "dt-button-right",
                        tag: d.dom.collection.tag,
                    },
                    c
                ),
                h = b.node(),
                i = function () {
                    u(e(".dt-button-collection"), f.fade, function () {
                        e(this).detach();
                    });
                    e(b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes()).attr("aria-expanded", "false");
                    e("div.dt-button-background").off("click.dtb-collection");
                    o.background(!1, f.backgroundClassName, f.fade, h);
                    e("body").off(".dtb-collection");
                    b.off("buttons-action.b-internal");
                };
            !1 === a && i();
            c = e(b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes());
            c.length && ((h = c.eq(0)), i());
            c = e("<div/>").addClass("dt-button-collection").addClass(f.collectionLayout).css("display", "none");
            a = e(a).addClass(f.contentClassName).attr("role", "menu").appendTo(c);
            h.attr("aria-expanded", "true");
            h.parents("body")[0] !== q.body && (h = q.body.lastChild);
            f.collectionTitle && c.prepend('<div class="dt-button-collection-title">' + f.collectionTitle + "</div>");
            t(c.insertAfter(h), f.fade);
            var d = e(b.table().container()),
                k = c.css("position");
            "dt-container" === f.align && ((h = h.parent()), c.css("width", d.width()));
            if ("absolute" === k) {
                var m = h.position(),
                    k = e(b.node()).position();
                c.css({ top: k.top + h.outerHeight(), left: m.left });
                var m = c.outerHeight(),
                    g = d.offset().top + d.height(),
                    g = k.top + h.outerHeight() + m - g,
                    j = k.top - m,
                    n = d.offset().top,
                    k = k.top - m - 5;
                (g > n - j || f.dropup) && -k < n && c.css("top", k);
                var k = d.offset().left,
                    d = d.width(),
                    d = k + d,
                    m = c.offset().left,
                    g = c.width(),
                    g = m + g,
                    j = h.offset().left,
                    n = h.outerWidth(),
                    l = j + n;
                c.hasClass(f.rightAlignClassName) || c.hasClass(f.leftAlignClassName) || "dt-container" === f.align
                    ? ((n = 0),
                      c.hasClass(f.rightAlignClassName) ? ((n = l - g), k > m + n && ((k -= m + n), (d -= g + n), (n = k > d ? n + d : n + k))) : ((n = k - m), d < g + n && ((k -= m + n), (d -= g + n), (n = k > d ? n + d : n + k))))
                    : ((d = h.offset().top), (n = 0), (n = "button-right" === f.align ? l - g : j - m));
                c.css("left", c.position().left + n);
            } else (d = c.height() / 2), d > e(r).height() / 2 && (d = e(r).height() / 2), c.css("marginTop", -1 * d);
            f.background && o.background(!0, f.backgroundClassName, f.fade, h);
            e("div.dt-button-background").on("click.dtb-collection", function () {});
            e("body")
                .on("click.dtb-collection", function (b) {
                    var c = e.fn.addBack ? "addBack" : "andSelf",
                        d = e(b.target).parent()[0];
                    ((!e(b.target).parents()[c]().filter(a).length && !e(d).hasClass("dt-buttons")) || e(b.target).hasClass("dt-button-background")) && i();
                })
                .on("keyup.dtb-collection", function (a) {
                    a.keyCode === 27 && i();
                });
            f.autoClose &&
                setTimeout(function () {
                    b.on("buttons-action.b-internal", function (a, b, c, d) {
                        d[0] !== h[0] && i();
                    });
                }, 0);
            e(c).trigger("buttons-popover.dt");
        },
    });
    o.background = function (a, b, c, d) {
        c === l && (c = 400);
        d || (d = q.body);
        a
            ? t(e("<div/>").addClass(b).css("display", "none").insertAfter(d), c)
            : u(e("div." + b), c, function () {
                  e(this).removeClass(b).remove();
              });
    };
    o.instanceSelector = function (a, b) {
        if (a === l || null === a)
            return e.map(b, function (a) {
                return a.inst;
            });
        var c = [],
            d = e.map(b, function (a) {
                return a.name;
            }),
            f = function (a) {
                if (Array.isArray(a)) for (var i = 0, k = a.length; i < k; i++) f(a[i]);
                else "string" === typeof a ? (-1 !== a.indexOf(",") ? f(a.split(",")) : ((a = e.inArray(a.trim(), d)), -1 !== a && c.push(b[a].inst))) : "number" === typeof a && c.push(b[a].inst);
            };
        f(a);
        return c;
    };
    o.buttonSelector = function (a, b) {
        for (
            var c = [],
                d = function (a, b, c) {
                    for (var e, f, h = 0, i = b.length; h < i; h++) if ((e = b[h])) (f = c !== l ? c + h : h + ""), a.push({ node: e.node, name: e.conf.name, idx: f }), e.buttons && d(a, e.buttons, f + "-");
                },
                f = function (a, b) {
                    var g,
                        h,
                        i = [];
                    d(i, b.s.buttons);
                    g = e.map(i, function (a) {
                        return a.node;
                    });
                    if (Array.isArray(a) || a instanceof e) {
                        g = 0;
                        for (h = a.length; g < h; g++) f(a[g], b);
                    } else if (null === a || a === l || "*" === a) {
                        g = 0;
                        for (h = i.length; g < h; g++) c.push({ inst: b, node: i[g].node });
                    } else if ("number" === typeof a) c.push({ inst: b, node: b.s.buttons[a].node });
                    else if ("string" === typeof a)
                        if (-1 !== a.indexOf(",")) {
                            i = a.split(",");
                            g = 0;
                            for (h = i.length; g < h; g++) f(i[g].trim(), b);
                        } else if (a.match(/^\d+(\-\d+)*$/))
                            (g = e.map(i, function (a) {
                                return a.idx;
                            })),
                                c.push({ inst: b, node: i[e.inArray(a, g)].node });
                        else if (-1 !== a.indexOf(":name")) {
                            var j = a.replace(":name", "");
                            g = 0;
                            for (h = i.length; g < h; g++) i[g].name === j && c.push({ inst: b, node: i[g].node });
                        } else
                            e(g)
                                .filter(a)
                                .each(function () {
                                    c.push({ inst: b, node: this });
                                });
                    else "object" === typeof a && a.nodeName && ((i = e.inArray(a, g)), -1 !== i && c.push({ inst: b, node: g[i] }));
                },
                h = 0,
                i = a.length;
            h < i;
            h++
        )
            f(b, a[h]);
        return c;
    };
    o.stripData = function (a, b) {
        if ("string" !== typeof a) return a;
        a = a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
        a = a.replace(/<!\-\-.*?\-\->/g, "");
        if (!b || b.stripHtml) a = a.replace(/<[^>]*>/g, "");
        if (!b || b.trim) a = a.replace(/^\s+|\s+$/g, "");
        if (!b || b.stripNewlines) a = a.replace(/\n/g, " ");
        if (!b || b.decodeEntities) (x.innerHTML = a), (a = x.value);
        return a;
    };
    o.defaults = {
        buttons: ["copy", "excel", "csv", "pdf", "print"],
        name: "main",
        tabIndex: 0,
        dom: {
            container: { tag: "div", className: "dt-buttons" },
            collection: { tag: "div", className: "" },
            button: { tag: "button", className: "dt-button", active: "active", disabled: "disabled" },
            buttonLiner: { tag: "span", className: "" },
        },
    };
    o.version = "1.7.1";
    e.extend(p, {
        collection: {
            text: function (a) {
                return a.i18n("buttons.collection", "Collection");
            },
            className: "buttons-collection",
            init: function (a, b) {
                b.attr("aria-expanded", !1);
            },
            action: function (a, b, c, d) {
                a.stopPropagation();
                d._collection.parents("body").length ? this.popover(!1, d) : this.popover(d._collection, d);
            },
            attr: { "aria-haspopup": !0 },
        },
        copy: function () {
            if (p.copyHtml5) return "copyHtml5";
        },
        csv: function (a, b) {
            if (p.csvHtml5 && p.csvHtml5.available(a, b)) return "csvHtml5";
        },
        excel: function (a, b) {
            if (p.excelHtml5 && p.excelHtml5.available(a, b)) return "excelHtml5";
        },
        pdf: function (a, b) {
            if (p.pdfHtml5 && p.pdfHtml5.available(a, b)) return "pdfHtml5";
        },
        pageLength: function (a) {
            var a = a.settings()[0].aLengthMenu,
                b = [],
                c = [];
            if (Array.isArray(a[0])) (b = a[0]), (c = a[1]);
            else
                for (var d = 0; d < a.length; d++) {
                    var f = a[d];
                    e.isPlainObject(f) ? (b.push(f.value), c.push(f.label)) : (b.push(f), c.push(f));
                }
            return {
                extend: "collection",
                text: function (a) {
                    return a.i18n("buttons.pageLength", { "-1": "Show all rows", _: "Show %d rows" }, a.page.len());
                },
                className: "buttons-page-length",
                autoClose: !0,
                buttons: e.map(b, function (a, b) {
                    return {
                        text: c[b],
                        className: "button-page-length",
                        action: function (b, c) {
                            c.page.len(a).draw();
                        },
                        init: function (b, c, d) {
                            var e = this,
                                c = function () {
                                    e.active(b.page.len() === a);
                                };
                            b.on("length.dt" + d.namespace, c);
                            c();
                        },
                        destroy: function (a, b, c) {
                            a.off("length.dt" + c.namespace);
                        },
                    };
                }),
                init: function (a, b, c) {
                    var d = this;
                    a.on("length.dt" + c.namespace, function () {
                        d.text(c.text);
                    });
                },
                destroy: function (a, b, c) {
                    a.off("length.dt" + c.namespace);
                },
            };
        },
    });
    j.Api.register("buttons()", function (a, b) {
        b === l && ((b = a), (a = l));
        this.selector.buttonGroup = a;
        var c = this.iterator(
            !0,
            "table",
            function (c) {
                if (c._buttons) return o.buttonSelector(o.instanceSelector(a, c._buttons), b);
            },
            !0
        );
        c._groupSelector = a;
        return c;
    });
    j.Api.register("button()", function (a, b) {
        var c = this.buttons(a, b);
        1 < c.length && c.splice(1, c.length);
        return c;
    });
    j.Api.registerPlural("buttons().active()", "button().active()", function (a) {
        return a === l
            ? this.map(function (a) {
                  return a.inst.active(a.node);
              })
            : this.each(function (b) {
                  b.inst.active(b.node, a);
              });
    });
    j.Api.registerPlural("buttons().action()", "button().action()", function (a) {
        return a === l
            ? this.map(function (a) {
                  return a.inst.action(a.node);
              })
            : this.each(function (b) {
                  b.inst.action(b.node, a);
              });
    });
    j.Api.register(["buttons().enable()", "button().enable()"], function (a) {
        return this.each(function (b) {
            b.inst.enable(b.node, a);
        });
    });
    j.Api.register(["buttons().disable()", "button().disable()"], function () {
        return this.each(function (a) {
            a.inst.disable(a.node);
        });
    });
    j.Api.registerPlural("buttons().nodes()", "button().node()", function () {
        var a = e();
        e(
            this.each(function (b) {
                a = a.add(b.inst.node(b.node));
            })
        );
        return a;
    });
    j.Api.registerPlural("buttons().processing()", "button().processing()", function (a) {
        return a === l
            ? this.map(function (a) {
                  return a.inst.processing(a.node);
              })
            : this.each(function (b) {
                  b.inst.processing(b.node, a);
              });
    });
    j.Api.registerPlural("buttons().text()", "button().text()", function (a) {
        return a === l
            ? this.map(function (a) {
                  return a.inst.text(a.node);
              })
            : this.each(function (b) {
                  b.inst.text(b.node, a);
              });
    });
    j.Api.registerPlural("buttons().trigger()", "button().trigger()", function () {
        return this.each(function (a) {
            a.inst.node(a.node).trigger("click");
        });
    });
    j.Api.register("button().popover()", function (a, b) {
        return this.map(function (c) {
            return c.inst._popover(a, this.button(this[0].node), b);
        });
    });
    j.Api.register("buttons().containers()", function () {
        var a = e(),
            b = this._groupSelector;
        this.iterator(!0, "table", function (c) {
            if (c._buttons) for (var c = o.instanceSelector(b, c._buttons), d = 0, e = c.length; d < e; d++) a = a.add(c[d].container());
        });
        return a;
    });
    j.Api.register("buttons().container()", function () {
        return this.containers().eq(0);
    });
    j.Api.register("button().add()", function (a, b) {
        var c = this.context;
        c.length && ((c = o.instanceSelector(this._groupSelector, c[0]._buttons)), c.length && c[0].add(b, a));
        return this.button(this._groupSelector, a);
    });
    j.Api.register("buttons().destroy()", function () {
        this.pluck("inst")
            .unique()
            .each(function (a) {
                a.destroy();
            });
        return this;
    });
    j.Api.registerPlural("buttons().remove()", "buttons().remove()", function () {
        this.each(function (a) {
            a.inst.remove(a.node);
        });
        return this;
    });
    var s;
    j.Api.register("buttons.info()", function (a, b, c) {
        var d = this;
        if (!1 === a)
            return (
                this.off("destroy.btn-info"),
                u(e("#datatables_buttons_info"), 400, function () {
                    e(this).remove();
                }),
                clearTimeout(s),
                (s = null),
                this
            );
        s && clearTimeout(s);
        e("#datatables_buttons_info").length && e("#datatables_buttons_info").remove();
        t(
            e('<div id="datatables_buttons_info" class="dt-button-info"/>')
                .html(a ? "<h2>" + a + "</h2>" : "")
                .append(e("<div/>")["string" === typeof b ? "html" : "append"](b))
                .css("display", "none")
                .appendTo("body")
        );
        c !== l &&
            0 !== c &&
            (s = setTimeout(function () {
                d.buttons.info(!1);
            }, c));
        this.on("destroy.btn-info", function () {
            d.buttons.info(!1);
        });
        return this;
    });
    j.Api.register("buttons.exportData()", function (a) {
        if (this.context.length) {
            var b = new j.Api(this.context[0]),
                c = e.extend(
                    !0,
                    {},
                    {
                        rows: null,
                        columns: "",
                        modifier: { search: "applied", order: "applied" },
                        orthogonal: "display",
                        stripHtml: !0,
                        stripNewlines: !0,
                        decodeEntities: !0,
                        trim: !0,
                        format: {
                            header: function (a) {
                                return o.stripData(a, c);
                            },
                            footer: function (a) {
                                return o.stripData(a, c);
                            },
                            body: function (a) {
                                return o.stripData(a, c);
                            },
                        },
                        customizeData: null,
                    },
                    a
                ),
                a = b
                    .columns(c.columns)
                    .indexes()
                    .map(function (a) {
                        var d = b.column(a).header();
                        return c.format.header(d.innerHTML, a, d);
                    })
                    .toArray(),
                d = b.table().footer()
                    ? b
                          .columns(c.columns)
                          .indexes()
                          .map(function (a) {
                              var d = b.column(a).footer();
                              return c.format.footer(d ? d.innerHTML : "", a, d);
                          })
                          .toArray()
                    : null,
                f = e.extend({}, c.modifier);
            b.select && "function" === typeof b.select.info && f.selected === l && b.rows(c.rows, e.extend({ selected: !0 }, f)).any() && e.extend(f, { selected: !0 });
            for (var f = b.rows(c.rows, f).indexes().toArray(), h = b.cells(f, c.columns), f = h.render(c.orthogonal).toArray(), h = h.nodes().toArray(), i = a.length, k = [], m = 0, g = 0, q = 0 < i ? f.length / i : 0; g < q; g++) {
                for (var n = [i], p = 0; p < i; p++) (n[p] = c.format.body(f[m], g, p, h[m])), m++;
                k[g] = n;
            }
            a = { header: a, footer: d, body: k };
            c.customizeData && c.customizeData(a);
            return a;
        }
    });
    j.Api.register("buttons.exportInfo()", function (a) {
        a || (a = {});
        var b;
        var c = a;
        b = "*" === c.filename && "*" !== c.title && c.title !== l && null !== c.title && "" !== c.title ? c.title : c.filename;
        "function" === typeof b && (b = b());
        b === l || null === b ? (b = null) : (-1 !== b.indexOf("*") && (b = b.replace("*", e("head > title").text()).trim()), (b = b.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "")), (c = v(c.extension)) || (c = ""), (b += c));
        c = v(a.title);
        c = null === c ? null : -1 !== c.indexOf("*") ? c.replace("*", e("head > title").text() || "Exported data") : c;
        return { filename: b, title: c, messageTop: y(this, a.message || a.messageTop, "top"), messageBottom: y(this, a.messageBottom, "bottom") };
    });
    var v = function (a) {
            return null === a || a === l ? null : "function" === typeof a ? a() : a;
        },
        y = function (a, b, c) {
            b = v(b);
            if (null === b) return null;
            a = e("caption", a.table().container()).eq(0);
            return "*" === b ? (a.css("caption-side") !== c ? null : a.length ? a.text() : "") : b;
        },
        x = e("<textarea/>")[0];
    e.fn.dataTable.Buttons = o;
    e.fn.DataTable.Buttons = o;
    e(q).on("init.dt plugin-init.dt", function (a, b) {
        if ("dt" === a.namespace) {
            var c = b.oInit.buttons || j.defaults.buttons;
            c && !b._buttons && new o(b, c).container();
        }
    });
    j.ext.feature.push({ fnInit: w, cFeature: "B" });
    j.ext.features && j.ext.features.register("buttons", w);
    return o;
});

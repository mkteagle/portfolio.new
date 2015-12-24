/*! ng-flow 2.6.1 */
!function (a, b, c) {
    "use strict";
    function d(b) {
        if (this.support = !("undefined" == typeof File || "undefined" == typeof Blob || "undefined" == typeof FileList || !Blob.prototype.slice && !Blob.prototype.webkitSlice && !Blob.prototype.mozSlice), this.support) {
            this.supportDirectory = /WebKit/.test(a.navigator.userAgent), this.files = [], this.defaults = {
                chunkSize: 1048576,
                forceChunkSize: !1,
                simultaneousUploads: 3,
                singleFile: !1,
                fileParameterName: "file",
                progressCallbacksInterval: 500,
                speedSmoothingFactor: .1,
                query: {},
                headers: {},
                withCredentials: !1,
                preprocess: null,
                method: "multipart",
                testMethod: "GET",
                uploadMethod: "POST",
                prioritizeFirstAndLastChunk: !1,
                target: "/",
                testChunks: !0,
                generateUniqueIdentifier: null,
                maxChunkRetries: 0,
                chunkRetryInterval: null,
                permanentErrors: [404, 415, 500, 501],
                successStatuses: [200, 201, 202],
                onDropStopPropagation: !1
            }, this.opts = {}, this.events = {};
            var c = this;
            this.onDrop = function (a) {
                c.opts.onDropStopPropagation && a.stopPropagation(), a.preventDefault();
                var b = a.dataTransfer;
                b.items && b.items[0] && b.items[0].webkitGetAsEntry ? c.webkitReadDataTransfer(a) : c.addFiles(b.files, a)
            }, this.preventEvent = function (a) {
                a.preventDefault()
            }, this.opts = d.extend({}, this.defaults, b || {})
        }
    }

    function e(a, b) {
        this.flowObj = a, this.file = b, this.name = b.fileName || b.name, this.size = b.size, this.relativePath = b.relativePath || b.webkitRelativePath || this.name, this.uniqueIdentifier = a.generateUniqueIdentifier(b), this.chunks = [], this.paused = !1, this.error = !1, this.averageSpeed = 0, this.currentSpeed = 0, this._lastProgressCallback = Date.now(), this._prevUploadedSize = 0, this._prevProgress = 0, this.bootstrap()
    }

    function f(a, b, c) {
        this.flowObj = a, this.fileObj = b, this.fileObjSize = b.size, this.offset = c, this.tested = !1, this.retries = 0, this.pendingRetry = !1, this.preprocessState = 0, this.loaded = 0, this.total = 0;
        var d = this.flowObj.opts.chunkSize;
        this.startByte = this.offset * d, this.endByte = Math.min(this.fileObjSize, (this.offset + 1) * d), this.xhr = null, this.fileObjSize - this.endByte < d && !this.flowObj.opts.forceChunkSize && (this.endByte = this.fileObjSize);
        var e = this;
        this.event = function (a, b) {
            b = Array.prototype.slice.call(arguments), b.unshift(e), e.fileObj.chunkEvent.apply(e.fileObj, b)
        }, this.progressHandler = function (a) {
            a.lengthComputable && (e.loaded = a.loaded, e.total = a.total), e.event("progress", a)
        }, this.testHandler = function () {
            var a = e.status(!0);
            "error" === a ? (e.event(a, e.message()), e.flowObj.uploadNextChunk()) : "success" === a ? (e.tested = !0, e.event(a, e.message()), e.flowObj.uploadNextChunk()) : e.fileObj.paused || (e.tested = !0, e.send())
        }, this.doneHandler = function () {
            var a = e.status();
            if ("success" === a || "error" === a)e.event(a, e.message()), e.flowObj.uploadNextChunk(); else {
                e.event("retry", e.message()), e.pendingRetry = !0, e.abort(), e.retries++;
                var b = e.flowObj.opts.chunkRetryInterval;
                null !== b ? setTimeout(function () {
                    e.send()
                }, b) : e.send()
            }
        }
    }

    function g(a, b) {
        var c = a.indexOf(b);
        c > -1 && a.splice(c, 1)
    }

    function h(a, b) {
        return "function" == typeof a && (b = Array.prototype.slice.call(arguments), a = a.apply(null, b.slice(1))), a
    }

    function i(a, b) {
        setTimeout(a.bind(b), 0)
    }

    function j(a) {
        return k(arguments, function (b) {
            b !== a && k(b, function (b, c) {
                a[c] = b
            })
        }), a
    }

    function k(a, b, c) {
        if (a) {
            var d;
            if ("undefined" != typeof a.length) {
                for (d = 0; d < a.length; d++)if (b.call(c, a[d], d) === !1)return
            } else for (d in a)if (a.hasOwnProperty(d) && b.call(c, a[d], d) === !1)return
        }
    }

    var l = a.navigator.msPointerEnabled;
    d.prototype = {
        on: function (a, b) {
            a = a.toLowerCase(), this.events.hasOwnProperty(a) || (this.events[a] = []), this.events[a].push(b)
        }, off: function (a, b) {
            a !== c ? (a = a.toLowerCase(), b !== c ? this.events.hasOwnProperty(a) && g(this.events[a], b) : delete this.events[a]) : this.events = {}
        }, fire: function (a, b) {
            b = Array.prototype.slice.call(arguments), a = a.toLowerCase();
            var c = !1;
            return this.events.hasOwnProperty(a) && k(this.events[a], function (a) {
                c = a.apply(this, b.slice(1)) === !1 || c
            }, this), "catchall" != a && (b.unshift("catchAll"), c = this.fire.apply(this, b) === !1 || c), !c
        }, webkitReadDataTransfer: function (a) {
            function b(a) {
                g += a.length, k(a, function (a) {
                    if (a.isFile) {
                        var e = a.fullPath;
                        a.file(function (a) {
                            c(a, e)
                        }, d)
                    } else a.isDirectory && a.createReader().readEntries(b, d)
                }), e()
            }

            function c(a, b) {
                a.relativePath = b.substring(1), h.push(a), e()
            }

            function d(a) {
                throw a
            }

            function e() {
                0 == --g && f.addFiles(h, a)
            }

            var f = this, g = a.dataTransfer.items.length, h = [];
            k(a.dataTransfer.items, function (a) {
                var f = a.webkitGetAsEntry();
                return f ? void(f.isFile ? c(a.getAsFile(), f.fullPath) : f.createReader().readEntries(b, d)) : void e()
            })
        }, generateUniqueIdentifier: function (a) {
            var b = this.opts.generateUniqueIdentifier;
            if ("function" == typeof b)return b(a);
            var c = a.relativePath || a.webkitRelativePath || a.fileName || a.name;
            return a.size + "-" + c.replace(/[^0-9a-zA-Z_-]/gim, "")
        }, uploadNextChunk: function (a) {
            var b = !1;
            if (this.opts.prioritizeFirstAndLastChunk && (k(this.files, function (a) {
                    return !a.paused && a.chunks.length && "pending" === a.chunks[0].status() && 0 === a.chunks[0].preprocessState ? (a.chunks[0].send(), b = !0, !1) : !a.paused && a.chunks.length > 1 && "pending" === a.chunks[a.chunks.length - 1].status() && 0 === a.chunks[0].preprocessState ? (a.chunks[a.chunks.length - 1].send(), b = !0, !1) : void 0
                }), b))return b;
            if (k(this.files, function (a) {
                    return a.paused || k(a.chunks, function (a) {
                        return "pending" === a.status() && 0 === a.preprocessState ? (a.send(), b = !0, !1) : void 0
                    }), b ? !1 : void 0
                }), b)return !0;
            var c = !1;
            return k(this.files, function (a) {
                return a.isComplete() ? void 0 : (c = !0, !1)
            }), c || a || i(function () {
                this.fire("complete")
            }, this), !1
        }, assignBrowse: function (a, c, d, e) {
            "undefined" == typeof a.length && (a = [a]), k(a, function (a) {
                var f;
                "INPUT" === a.tagName && "file" === a.type ? f = a : (f = b.createElement("input"), f.setAttribute("type", "file"), j(f.style, {
                    visibility: "hidden",
                    position: "absolute"
                }), a.appendChild(f), a.addEventListener("click", function () {
                    f.click()
                }, !1)), this.opts.singleFile || d || f.setAttribute("multiple", "multiple"), c && f.setAttribute("webkitdirectory", "webkitdirectory"), k(e, function (a, b) {
                    f.setAttribute(b, a)
                });
                var g = this;
                f.addEventListener("change", function (a) {
                    g.addFiles(a.target.files, a), a.target.value = ""
                }, !1)
            }, this)
        }, assignDrop: function (a) {
            "undefined" == typeof a.length && (a = [a]), k(a, function (a) {
                a.addEventListener("dragover", this.preventEvent, !1), a.addEventListener("dragenter", this.preventEvent, !1), a.addEventListener("drop", this.onDrop, !1)
            }, this)
        }, unAssignDrop: function (a) {
            "undefined" == typeof a.length && (a = [a]), k(a, function (a) {
                a.removeEventListener("dragover", this.preventEvent), a.removeEventListener("dragenter", this.preventEvent), a.removeEventListener("drop", this.onDrop)
            }, this)
        }, isUploading: function () {
            var a = !1;
            return k(this.files, function (b) {
                return b.isUploading() ? (a = !0, !1) : void 0
            }), a
        }, _shouldUploadNext: function () {
            var a = 0, b = !0, c = this.opts.simultaneousUploads;
            return k(this.files, function (d) {
                k(d.chunks, function (d) {
                    return "uploading" === d.status() && (a++, a >= c) ? (b = !1, !1) : void 0
                })
            }), b && a
        }, upload: function () {
            var a = this._shouldUploadNext();
            if (a !== !1) {
                this.fire("uploadStart");
                for (var b = !1, c = 1; c <= this.opts.simultaneousUploads - a; c++)b = this.uploadNextChunk(!0) || b;
                b || i(function () {
                    this.fire("complete")
                }, this)
            }
        }, resume: function () {
            k(this.files, function (a) {
                a.resume()
            })
        }, pause: function () {
            k(this.files, function (a) {
                a.pause()
            })
        }, cancel: function () {
            for (var a = this.files.length - 1; a >= 0; a--)this.files[a].cancel()
        }, progress: function () {
            var a = 0, b = 0;
            return k(this.files, function (c) {
                a += c.progress() * c.size, b += c.size
            }), b > 0 ? a / b : 0
        }, addFile: function (a, b) {
            this.addFiles([a], b)
        }, addFiles: function (a, b) {
            var c = [];
            k(a, function (a) {
                if ((!l || l && a.size > 0) && (a.size % 4096 !== 0 || "." !== a.name && "." !== a.fileName) && !this.getFromUniqueIdentifier(this.generateUniqueIdentifier(a))) {
                    var d = new e(this, a);
                    this.fire("fileAdded", d, b) && c.push(d)
                }
            }, this), this.fire("filesAdded", c, b) && k(c, function (a) {
                this.opts.singleFile && this.files.length > 0 && this.removeFile(this.files[0]), this.files.push(a)
            }, this), this.fire("filesSubmitted", c, b)
        }, removeFile: function (a) {
            for (var b = this.files.length - 1; b >= 0; b--)this.files[b] === a && (this.files.splice(b, 1), a.abort())
        }, getFromUniqueIdentifier: function (a) {
            var b = !1;
            return k(this.files, function (c) {
                c.uniqueIdentifier === a && (b = c)
            }), b
        }, getSize: function () {
            var a = 0;
            return k(this.files, function (b) {
                a += b.size
            }), a
        }, sizeUploaded: function () {
            var a = 0;
            return k(this.files, function (b) {
                a += b.sizeUploaded()
            }), a
        }, timeRemaining: function () {
            var a = 0, b = 0;
            return k(this.files, function (c) {
                c.paused || c.error || (a += c.size - c.sizeUploaded(), b += c.averageSpeed)
            }), a && !b ? Number.POSITIVE_INFINITY : a || b ? Math.floor(a / b) : 0
        }
    }, e.prototype = {
        measureSpeed: function () {
            var a = Date.now() - this._lastProgressCallback;
            if (a) {
                var b = this.flowObj.opts.speedSmoothingFactor, c = this.sizeUploaded();
                this.currentSpeed = Math.max((c - this._prevUploadedSize) / a * 1e3, 0), this.averageSpeed = b * this.currentSpeed + (1 - b) * this.averageSpeed, this._prevUploadedSize = c
            }
        }, chunkEvent: function (a, b, c) {
            switch (b) {
                case"progress":
                    if (Date.now() - this._lastProgressCallback < this.flowObj.opts.progressCallbacksInterval)break;
                    this.measureSpeed(), this.flowObj.fire("fileProgress", this, a), this.flowObj.fire("progress"), this._lastProgressCallback = Date.now();
                    break;
                case"error":
                    this.error = !0, this.abort(!0), this.flowObj.fire("fileError", this, c, a), this.flowObj.fire("error", c, this, a);
                    break;
                case"success":
                    if (this.error)return;
                    this.measureSpeed(), this.flowObj.fire("fileProgress", this, a), this.flowObj.fire("progress"), this._lastProgressCallback = Date.now(), this.isComplete() && (this.currentSpeed = 0, this.averageSpeed = 0, this.flowObj.fire("fileSuccess", this, c, a));
                    break;
                case"retry":
                    this.flowObj.fire("fileRetry", this, a)
            }
        }, pause: function () {
            this.paused = !0, this.abort()
        }, resume: function () {
            this.paused = !1, this.flowObj.upload()
        }, abort: function (a) {
            this.currentSpeed = 0, this.averageSpeed = 0;
            var b = this.chunks;
            a && (this.chunks = []), k(b, function (a) {
                "uploading" === a.status() && (a.abort(), this.flowObj.uploadNextChunk())
            }, this)
        }, cancel: function () {
            this.flowObj.removeFile(this)
        }, retry: function () {
            this.bootstrap(), this.flowObj.upload()
        }, bootstrap: function () {
            this.abort(!0), this.error = !1, this._prevProgress = 0;
            for (var a = this.flowObj.opts.forceChunkSize ? Math.ceil : Math.floor, b = Math.max(a(this.file.size / this.flowObj.opts.chunkSize), 1), c = 0; b > c; c++)this.chunks.push(new f(this.flowObj, this, c))
        }, progress: function () {
            if (this.error)return 1;
            if (1 === this.chunks.length)return this._prevProgress = Math.max(this._prevProgress, this.chunks[0].progress()), this._prevProgress;
            var a = 0;
            k(this.chunks, function (b) {
                a += b.progress() * (b.endByte - b.startByte)
            });
            var b = a / this.size;
            return this._prevProgress = Math.max(this._prevProgress, b > .9999 ? 1 : b), this._prevProgress
        }, isUploading: function () {
            var a = !1;
            return k(this.chunks, function (b) {
                return "uploading" === b.status() ? (a = !0, !1) : void 0
            }), a
        }, isComplete: function () {
            var a = !1;
            return k(this.chunks, function (b) {
                var c = b.status();
                return "pending" === c || "uploading" === c || 1 === b.preprocessState ? (a = !0, !1) : void 0
            }), !a
        }, sizeUploaded: function () {
            var a = 0;
            return k(this.chunks, function (b) {
                a += b.sizeUploaded()
            }), a
        }, timeRemaining: function () {
            if (this.paused || this.error)return 0;
            var a = this.size - this.sizeUploaded();
            return a && !this.averageSpeed ? Number.POSITIVE_INFINITY : a || this.averageSpeed ? Math.floor(a / this.averageSpeed) : 0
        }, getType: function () {
            return this.file.type && this.file.type.split("/")[1]
        }, getExtension: function () {
            return this.name.substr((~-this.name.lastIndexOf(".") >>> 0) + 2).toLowerCase()
        }
    }, f.prototype = {
        getParams: function () {
            return {
                flowChunkNumber: this.offset + 1,
                flowChunkSize: this.flowObj.opts.chunkSize,
                flowCurrentChunkSize: this.endByte - this.startByte,
                flowTotalSize: this.fileObjSize,
                flowIdentifier: this.fileObj.uniqueIdentifier,
                flowFilename: this.fileObj.name,
                flowRelativePath: this.fileObj.relativePath,
                flowTotalChunks: this.fileObj.chunks.length
            }
        }, getTarget: function (a, b) {
            return a += a.indexOf("?") < 0 ? "?" : "&", a + b.join("&")
        }, test: function () {
            this.xhr = new XMLHttpRequest, this.xhr.addEventListener("load", this.testHandler, !1), this.xhr.addEventListener("error", this.testHandler, !1);
            var a = h(this.flowObj.opts.testMethod, this.fileObj, this), b = this.prepareXhrRequest(a, !0);
            this.xhr.send(b)
        }, preprocessFinished: function () {
            this.preprocessState = 2, this.send()
        }, send: function () {
            var a = this.flowObj.opts.preprocess;
            if ("function" == typeof a)switch (this.preprocessState) {
                case 0:
                    return this.preprocessState = 1, void a(this);
                case 1:
                    return
            }
            if (this.flowObj.opts.testChunks && !this.tested)return void this.test();
            this.loaded = 0, this.total = 0, this.pendingRetry = !1;
            var b = this.fileObj.file.slice ? "slice" : this.fileObj.file.mozSlice ? "mozSlice" : this.fileObj.file.webkitSlice ? "webkitSlice" : "slice", c = this.fileObj.file[b](this.startByte, this.endByte, this.fileObj.file.type);
            this.xhr = new XMLHttpRequest, this.xhr.upload.addEventListener("progress", this.progressHandler, !1), this.xhr.addEventListener("load", this.doneHandler, !1), this.xhr.addEventListener("error", this.doneHandler, !1);
            var d = h(this.flowObj.opts.uploadMethod, this.fileObj, this), e = this.prepareXhrRequest(d, !1, this.flowObj.opts.method, c);
            this.xhr.send(e)
        }, abort: function () {
            var a = this.xhr;
            this.xhr = null, a && a.abort()
        }, status: function (a) {
            return this.pendingRetry || 1 === this.preprocessState ? "uploading" : this.xhr ? this.xhr.readyState < 4 ? "uploading" : this.flowObj.opts.successStatuses.indexOf(this.xhr.status) > -1 ? "success" : this.flowObj.opts.permanentErrors.indexOf(this.xhr.status) > -1 || !a && this.retries >= this.flowObj.opts.maxChunkRetries ? "error" : (this.abort(), "pending") : "pending"
        }, message: function () {
            return this.xhr ? this.xhr.responseText : ""
        }, progress: function () {
            if (this.pendingRetry)return 0;
            var a = this.status();
            return "success" === a || "error" === a ? 1 : "pending" === a ? 0 : this.total > 0 ? this.loaded / this.total : 0
        }, sizeUploaded: function () {
            var a = this.endByte - this.startByte;
            return "success" !== this.status() && (a = this.progress() * a), a
        }, prepareXhrRequest: function (a, b, c, d) {
            var e = h(this.flowObj.opts.query, this.fileObj, this, b);
            e = j(this.getParams(), e);
            var f = h(this.flowObj.opts.target, this.fileObj, this, b), g = null;
            if ("GET" === a || "octet" === c) {
                var i = [];
                k(e, function (a, b) {
                    i.push([encodeURIComponent(b), encodeURIComponent(a)].join("="))
                }), f = this.getTarget(f, i), g = d || null
            } else g = new FormData, k(e, function (a, b) {
                g.append(b, a)
            }), g.append(this.flowObj.opts.fileParameterName, d, this.fileObj.file.name);
            return this.xhr.open(a, f, !0), this.xhr.withCredentials = this.flowObj.opts.withCredentials, k(h(this.flowObj.opts.headers, this.fileObj, this, b), function (a, b) {
                this.xhr.setRequestHeader(b, a)
            }, this), g
        }
    }, d.evalOpts = h, d.extend = j, d.each = k, d.FlowFile = e, d.FlowChunk = f, d.version = "2.9.0", "object" == typeof module && module && "object" == typeof module.exports ? module.exports = d : (a.Flow = d, "function" == typeof define && define.amd && define("flow", [], function () {
        return d
    }))
}(window, document), angular.module("flow.provider", []).provider("flowFactory", function () {
    "use strict";
    this.defaults = {}, this.factory = function (a) {
        return new Flow(a)
    }, this.events = [], this.on = function (a, b) {
        this.events.push([a, b])
    }, this.$get = function () {
        var a = this.factory, b = this.defaults, c = this.events;
        return {
            create: function (d) {
                var e = a(angular.extend({}, b, d));
                return angular.forEach(c, function (a) {
                    e.on(a[0], a[1])
                }), e
            }
        }
    }
}), angular.module("flow.init", ["flow.provider"]).controller("flowCtrl", ["$scope", "$attrs", "$parse", "flowFactory", function (a, b, c, d) {
    var e = angular.extend({}, a.$eval(b.flowInit)), f = a.$eval(b.flowObject) || d.create(e), g = function (b) {
        var c = Array.prototype.slice.call(arguments);
        c.shift();
        var d = a.$broadcast.apply(a, ["flow::" + b, f].concat(c));
        return {
            progress: 1,
            filesSubmitted: 1,
            fileSuccess: 1,
            fileError: 1,
            complete: 1
        }[b] && a.$apply(), d.defaultPrevented ? !1 : void 0
    };
    f.on("catchAll", g), a.$on("$destroy", function () {
        f.off("catchAll", g)
    }), a.$flow = f, b.hasOwnProperty("flowName") && (c(b.flowName).assign(a, f), a.$on("$destroy", function () {
        c(b.flowName).assign(a)
    }))
}]).directive("flowInit", [function () {
    return {scope: !0, controller: "flowCtrl"}
}]), angular.module("flow.btn", ["flow.init"]).directive("flowBtn", [function () {
    return {
        restrict: "EA", scope: !1, require: "^flowInit", link: function (a, b, c) {
            var d = c.hasOwnProperty("flowDirectory"), e = c.hasOwnProperty("flowSingleFile"), f = c.hasOwnProperty("flowAttrs") && a.$eval(c.flowAttrs);
            a.$flow.assignBrowse(b, d, e, f)
        }
    }
}]), angular.module("flow.dragEvents", ["flow.init"]).directive("flowPreventDrop", function () {
    return {
        scope: !1, link: function (a, b) {
            b.bind("drop dragover", function (a) {
                a.preventDefault()
            })
        }
    }
}).directive("flowDragEnter", ["$timeout", function (a) {
    return {
        scope: !1, link: function (b, c, d) {
            function e(a) {
                var b = !1, c = a.dataTransfer || a.originalEvent.dataTransfer;
                return angular.forEach(c && c.types, function (a) {
                    "Files" === a && (b = !0)
                }), b
            }

            var f, g = !1;
            c.bind("dragover", function (c) {
                e(c) && (g || (b.$apply(d.flowDragEnter), g = !0), a.cancel(f), c.preventDefault())
            }), c.bind("dragleave drop", function () {
                a.cancel(f), f = a(function () {
                    b.$eval(d.flowDragLeave), f = null, g = !1
                }, 100)
            })
        }
    }
}]), angular.module("flow.drop", ["flow.init"]).directive("flowDrop", function () {
    return {
        scope: !1, require: "^flowInit", link: function (a, b, c) {
            function d() {
                a.$flow.assignDrop(b)
            }

            function e() {
                a.$flow.unAssignDrop(b)
            }

            c.flowDropEnabled ? a.$watch(c.flowDropEnabled, function (a) {
                a ? d() : e()
            }) : d()
        }
    }
}), !function (a) {
    "use strict";
    function b(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }

    var c = a.module("flow.events", ["flow.init"]), d = {
        fileSuccess: ["$file", "$message"],
        fileProgress: ["$file"],
        fileAdded: ["$file", "$event"],
        filesAdded: ["$files", "$event"],
        filesSubmitted: ["$files", "$event"],
        fileRetry: ["$file"],
        fileError: ["$file", "$message"],
        uploadStart: [],
        complete: [],
        progress: [],
        error: ["$message", "$file"]
    };
    a.forEach(d, function (d, e) {
        var f = "flow" + b(e);
        "flowUploadStart" == f && (f = "flowUploadStarted"), c.directive(f, [function () {
            return {
                require: "^flowInit", controller: ["$scope", "$attrs", function (b, c) {
                    b.$on("flow::" + e, function () {
                        var e = Array.prototype.slice.call(arguments), g = e.shift();
                        if (b.$flow === e.shift()) {
                            var h = {};
                            a.forEach(d, function (a, b) {
                                h[a] = e[b]
                            }), b.$eval(c[f], h) === !1 && g.preventDefault()
                        }
                    })
                }]
            }
        }])
    })
}(angular), angular.module("flow.img", ["flow.init"]).directive("flowImg", [function () {
    return {
        scope: !1, require: "^flowInit", link: function (a, b, c) {
            var d = c.flowImg;
            a.$watch(d, function (b) {
                if (b) {
                    var d = new FileReader;
                    d.readAsDataURL(b.file), d.onload = function (b) {
                        a.$apply(function () {
                            c.$set("src", b.target.result)
                        })
                    }
                }
            })
        }
    }
}]), angular.module("flow.transfers", ["flow.init"]).directive("flowTransfers", [function () {
    return {
        scope: !0, require: "^flowInit", link: function (a) {
            a.transfers = a.$flow.files
        }
    }
}]), angular.module("flow", ["flow.provider", "flow.init", "flow.events", "flow.btn", "flow.drop", "flow.transfers", "flow.img", "flow.dragEvents"]);
/**
 * Created by i68066 on 12/8/15.
 */

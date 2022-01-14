"use strict";
/* vinzeUtilities */
/* created by Patryk Surmacz */
/* github.com/vinze-ps */
Object.defineProperty(exports, "__esModule", { value: true });
var Vinze = /** @class */ (function () {
    function Vinze() {
        var _this = this;
        this.isMobileDevice = function () { return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)); };
        this.doInSomeTime = function (since, to, fn, elsefn) {
            if (elsefn === void 0) { elsefn = null; }
            var date = new Date();
            var sinceNumber = +(since.split(":")[0] + since.split(":")[1]);
            var toNumber = +(to.split(":")[0] + to.split(":")[1]);
            var currentTimeNumber = +(date.getHours().toString() + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString());
            if (sinceNumber < toNumber) {
                if (currentTimeNumber >= sinceNumber && currentTimeNumber <= toNumber) {
                    fn();
                }
                else {
                    if (elsefn) {
                        elsefn();
                    }
                }
            }
            else if (sinceNumber > toNumber) {
                if (currentTimeNumber >= sinceNumber && currentTimeNumber >= toNumber) {
                    fn();
                }
                else {
                    if (elsefn) {
                        elsefn();
                    }
                }
            }
            else {
                fn();
            }
        };
        this.timeout = function (action, name, duration, fn) {
            if (name === void 0) { name = null; }
            if (duration === void 0) { duration = 0; }
            if (fn === void 0) { fn = null; }
            switch (action) {
                case "set":
                    var indexOfTimeout = -1;
                    if (_this.timeouts.length > 0) {
                        for (var i = 0; i <= _this.timeouts.length - 1; i++) {
                            indexOfTimeout = _this.timeouts[i].indexOf(name);
                            if (indexOfTimeout !== -1) {
                                _this.timeouts[i][1] = setTimeout(function () {
                                    if (fn)
                                        fn();
                                }, duration);
                            }
                            else if (indexOfTimeout === -1 && i === _this.timeouts.length - 1) {
                                _this.timeouts.push([
                                    name,
                                    setTimeout(function () {
                                        if (fn)
                                            fn();
                                    }, duration),
                                ]);
                            }
                        }
                    }
                    else {
                        _this.timeouts.push([
                            name,
                            setTimeout(function () {
                                if (fn)
                                    fn();
                            }, duration),
                        ]);
                    }
                    return indexOfTimeout;
                case "isset":
                    for (var i = 0; i <= _this.timeouts.length - 1; i++)
                        if (_this.timeouts[i][0] === name)
                            return true;
                    return false;
                case "clear":
                    for (var i = 0; i <= _this.timeouts.length - 1; i++)
                        if (_this.timeouts[i][0] === name) {
                            clearTimeout(_this.timeouts[i][1]);
                            _this.timeouts.splice(i, 1);
                        }
                    return -1;
                case "clearAll":
                    for (var i = 0; i <= _this.timeouts.length - 1; i++) {
                        clearTimeout(_this.timeouts[i][1]);
                        _this.timeouts = new Array();
                    }
                    return -1;
                default:
                    return -1;
            }
        };
        this.interval = function (action, name, tick, fn) {
            if (name === void 0) { name = null; }
            if (tick === void 0) { tick = 0; }
            if (fn === void 0) { fn = null; }
            switch (action) {
                case "set":
                    var indexOfInterval = -1;
                    if (_this.intervals.length > 0) {
                        for (var i = 0; i <= _this.intervals.length - 1; i++) {
                            indexOfInterval = _this.intervals[i].indexOf(name);
                            if (indexOfInterval !== -1) {
                                _this.intervals[i][1] = setTimeout(function () {
                                    if (fn)
                                        fn();
                                }, tick);
                            }
                            else if (indexOfInterval === -1 && i === _this.intervals.length - 1) {
                                _this.intervals.push([
                                    name,
                                    setTimeout(function () {
                                        if (fn)
                                            fn();
                                    }, tick),
                                ]);
                            }
                        }
                    }
                    else {
                        _this.intervals.push([
                            name,
                            setTimeout(function () {
                                if (fn)
                                    fn();
                            }, tick),
                        ]);
                    }
                    return indexOfInterval;
                case "isset":
                    for (var i = 0; i <= _this.intervals.length - 1; i++)
                        if (_this.intervals[i][0] === name)
                            return true;
                    return false;
                case "clear":
                    for (var i = 0; i <= _this.intervals.length - 1; i++)
                        if (_this.intervals[i][0] === name) {
                            clearInterval(_this.intervals[i][1]);
                            _this.intervals.splice(i, 1);
                        }
                    return -1;
                case "clearAll":
                    for (var i = 0; i <= _this.intervals.length - 1; i++) {
                        clearInterval(_this.intervals[i][1]);
                        _this.intervals = new Array();
                    }
                    return -1;
                default:
                    return -1;
            }
        };
        this.stringToHTML = function (value) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(value, "text/html");
            return doc.body;
        };
        this.timeouts = [];
        this.intervals = [];
        this.events = [];
    }
    Vinze.prototype.objectAssign = function (target) {
        var _this = this;
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        sources.forEach(function (source) {
            Object.keys(source).forEach(function (key) {
                var s_val = source[key];
                var t_val = target[key];
                target[key] = t_val && s_val && typeof t_val === "object" && typeof s_val === "object" ? _this.objectAssign(t_val, s_val) : s_val;
            });
        });
        return target;
    };
    Vinze.prototype.throttle = function (name, func, delay) {
        var _this = this;
        if (this.timeout("isset", name))
            return;
        func();
        this.timeout("set", name, delay, function () {
            _this.timeout("clear", name);
        });
    };
    Vinze.prototype.select = function (selector) {
        var _this = this;
        if (selector === null)
            return undefined;
        var nodeList;
        if (typeof selector === "string")
            nodeList = document.querySelectorAll(selector);
        else
            nodeList = [selector];
        return {
            elements: nodeList,
            length: nodeList.length,
            addClass: function (className) {
                nodeList.forEach(function (element) {
                    element.classList.add(className);
                });
                return _this.select(selector);
            },
            removeClass: function (className) {
                nodeList.forEach(function (element) {
                    element.classList.remove(className);
                });
                return _this.select(selector);
            },
            toggleClass: function (className) {
                nodeList.forEach(function (element) {
                    if (element.classList.contains(className))
                        element.classList.remove(className);
                    else
                        element.classList.add(className);
                });
                return _this.select(selector);
            },
            hasClass: function (className) {
                if (nodeList.length === 0)
                    return false;
                if (className === "")
                    return nodeList[0].classList.value;
                else
                    return nodeList[0].classList.contains(className);
            },
            parent: function (layer) {
                if (nodeList.length === 0)
                    return _this.select(selector);
                if (typeof layer === "number") {
                    var currentElement = nodeList[0];
                    for (var i = 0; i < layer; i++) {
                        if (currentElement !== null) {
                            currentElement = currentElement.parentElement;
                        }
                        else
                            break;
                    }
                    return _this.select(currentElement);
                }
                else
                    return _this.select(nodeList[0].parentElement);
            },
            prepend: function (value) {
                if (nodeList.length === 0)
                    return _this.select(selector);
                nodeList.forEach(function (element) {
                    element.prepend(_this.stringToHTML(value).children[0]);
                });
            },
            append: function (value) {
                if (nodeList.length === 0)
                    return _this.select(selector);
                nodeList.forEach(function (element) {
                    element.append(_this.stringToHTML(value).children[0]);
                });
            },
            on: function (types, listener, useCapture, id) {
                if (useCapture === void 0) { useCapture = false; }
                if (id === void 0) { id = null; }
                if (nodeList.length === 0)
                    return _this.select(selector);
                // Check whether event with passed id already exists.
                if (id !== null)
                    for (var i = 0; i < _this.events.length; i++)
                        if (_this.events[i].id === id)
                            return false;
                var typesArray = types.split(" ");
                // Loop through all elements.
                nodeList.forEach(function (element) {
                    // Loop through all passed types.
                    typesArray.forEach(function (type) {
                        var addEvent = true;
                        // Loop through all existing events.
                        for (var i = 0; i < _this.events.length; i++) {
                            if (_this.events[i].type.search(type) !== -1 &&
                                _this.events[i].listener.toString() === listener.toString() &&
                                _this.events[i].useCapture === useCapture) {
                                addEvent = false;
                                break;
                            }
                            else {
                                // End of the loop.
                                if (i - 1 === _this.events.length)
                                    addEvent = true;
                            }
                        }
                        // Add a new event.
                        if (addEvent) {
                            element.addEventListener(type, listener, useCapture);
                            _this.events.push({
                                element: element,
                                type: type,
                                listener: listener,
                                useCapture: useCapture,
                                id: id,
                            });
                        }
                    });
                });
                return _this.select(selector);
            },
            off: function (types, listener, useCapture, id) {
                if (listener === void 0) { listener = null; }
                if (useCapture === void 0) { useCapture = null; }
                if (id === void 0) { id = null; }
                if (nodeList.length === 0)
                    return _this.select(selector);
                // If id was passed, remove event directly.
                if (id !== null)
                    for (var i = 0; i < _this.events.length; i++)
                        if (_this.events[i].id === id) {
                            _this.events[i].element.removeEventListener(_this.events[i].type, _this.events[i].listener, _this.events[i].useCapture);
                            _this.events.splice(i, 1);
                        }
                if (types === null)
                    return _this.select(selector);
                var typesArray = types.split(" ");
                // Filer exists events.
                var _events = _this.events.filter(function (event) {
                    // Types.
                    if (typesArray.indexOf(event.type) === -1)
                        return false;
                    // Listener.
                    if (listener !== null)
                        if (listener.toString() !== event.listener.toString())
                            return false;
                    // Use capture.
                    if (useCapture !== null)
                        if (useCapture !== event.useCapture)
                            return false;
                    return true;
                });
                // Remove events.
                _events.forEach(function (event, index) {
                    event.element.removeEventListener(event.type, event.listener, event.useCapture);
                    _this.events.splice(index, 1);
                });
                return _this.select(selector);
            },
            // parents: (_selector: string) => {
            //   if (nodeList.length === 0)
            //     return this.select(selector);
            //     let currentElement: HTMLElement | null = nodeList[0];
            //     while (currentElement.parentElement !== null) {
            //         currentElement = currentElement.parentElement;
            //         // if (currentElement.classList.contains())
            //     }
            //     return this.select(currentElement);
            // }
        };
    };
    return Vinze;
}());
exports.default = Vinze;

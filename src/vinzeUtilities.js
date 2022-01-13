"use strict";
/* vinzeUtilities */
/* created by Patryk Surmacz */
/* github.com/vinze-ps */
Object.defineProperty(exports, "__esModule", { value: true });
class Vinze {
    constructor() {
        this.isMobileDevice = () => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        this.doInSomeTime = (since, to, fn, elsefn = null) => {
            let date = new Date();
            let sinceNumber = +(since.split(":")[0] + since.split(":")[1]);
            let toNumber = +(to.split(":")[0] + to.split(":")[1]);
            let currentTimeNumber = +(date.getHours().toString() + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString());
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
        this.timeout = (action, name = null, duration = 0, fn = null) => {
            switch (action) {
                case "set":
                    let indexOfTimeout = -1;
                    if (this.timeouts.length > 0) {
                        for (let i = 0; i <= this.timeouts.length - 1; i++) {
                            indexOfTimeout = this.timeouts[i].indexOf(name);
                            if (indexOfTimeout !== -1) {
                                this.timeouts[i][1] = setTimeout(() => {
                                    if (fn)
                                        fn();
                                }, duration);
                            }
                            else if (indexOfTimeout === -1 && i === this.timeouts.length - 1) {
                                this.timeouts.push([
                                    name,
                                    setTimeout(() => {
                                        if (fn)
                                            fn();
                                    }, duration),
                                ]);
                            }
                        }
                    }
                    else {
                        this.timeouts.push([
                            name,
                            setTimeout(() => {
                                if (fn)
                                    fn();
                            }, duration),
                        ]);
                    }
                    return indexOfTimeout;
                case "isset":
                    for (let i = 0; i <= this.timeouts.length - 1; i++)
                        if (this.timeouts[i][0] === name)
                            return true;
                    return false;
                case "clear":
                    for (let i = 0; i <= this.timeouts.length - 1; i++)
                        if (this.timeouts[i][0] === name) {
                            clearTimeout(this.timeouts[i][1]);
                            this.timeouts.splice(i, 1);
                        }
                    return -1;
                case "clearAll":
                    for (let i = 0; i <= this.timeouts.length - 1; i++) {
                        clearTimeout(this.timeouts[i][1]);
                        this.timeouts = new Array();
                    }
                    return -1;
                default:
                    return -1;
            }
        };
        this.interval = (action, name = null, tick = 0, fn = null) => {
            switch (action) {
                case "set":
                    let indexOfInterval = -1;
                    if (this.intervals.length > 0) {
                        for (let i = 0; i <= this.intervals.length - 1; i++) {
                            indexOfInterval = this.intervals[i].indexOf(name);
                            if (indexOfInterval !== -1) {
                                this.intervals[i][1] = setTimeout(() => {
                                    if (fn)
                                        fn();
                                }, tick);
                            }
                            else if (indexOfInterval === -1 && i === this.intervals.length - 1) {
                                this.intervals.push([
                                    name,
                                    setTimeout(() => {
                                        if (fn)
                                            fn();
                                    }, tick),
                                ]);
                            }
                        }
                    }
                    else {
                        this.intervals.push([
                            name,
                            setTimeout(() => {
                                if (fn)
                                    fn();
                            }, tick),
                        ]);
                    }
                    return indexOfInterval;
                case "isset":
                    for (let i = 0; i <= this.intervals.length - 1; i++)
                        if (this.intervals[i][0] === name)
                            return true;
                    return false;
                case "clear":
                    for (let i = 0; i <= this.intervals.length - 1; i++)
                        if (this.intervals[i][0] === name) {
                            clearInterval(this.intervals[i][1]);
                            this.intervals.splice(i, 1);
                        }
                    return -1;
                case "clearAll":
                    for (let i = 0; i <= this.intervals.length - 1; i++) {
                        clearInterval(this.intervals[i][1]);
                        this.intervals = new Array();
                    }
                    return -1;
                default:
                    return -1;
            }
        };
        this.timeouts = [];
        this.intervals = [];
    }
    objectAssign(target, ...sources) {
        sources.forEach((source) => {
            Object.keys(source).forEach((key) => {
                const s_val = source[key];
                const t_val = target[key];
                target[key] = t_val && s_val && typeof t_val === "object" && typeof s_val === "object" ? this.objectAssign(t_val, s_val) : s_val;
            });
        });
        return target;
    }
    throttle(name, func, delay) {
        if (this.timeout("isset", name))
            return;
        func();
        this.timeout("set", name, delay, () => {
            this.timeout("clear", name);
        });
    }
}
exports.default = Vinze;

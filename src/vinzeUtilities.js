/* vinzeUtilities */
/* created by Patryk Surmacz */
/* github.com/vinze-ps */

export class Vinze {
  constructor() {
    this.timeouts = [];
    this.intervals = [];
  }

  isMobileDevice = () => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  
  doInSomeTime = (since, to, fn, elsefn = null) => {
  
    let date = new Date();
  
    since = since.split(":");
    to = to.split(":");
    let sinceTime = parseInt(since[0] + since[1], 10),
      toTime = parseInt(to[0] + to[1], 10),
      currentTime = date.getHours().toString();
    if (date.getMinutes() < 10) {
      currentTime += "0" + date.getMinutes().toString();
    } else {
      currentTime += date.getMinutes().toString();
    }
    currentTime = parseInt(currentTime, 10);
    if (sinceTime < toTime) {
      if (currentTime >= sinceTime && currentTime <= toTime) {
        fn();
      } else {
        if (elsefn) {
          elsefn();
        }
      }
    } else if (sinceTime > toTime) {
      if (currentTime >= sinceTime && currentTime >= toTime) {
        fn();
      } else {
        if (elsefn) {
          elsefn();
        }
      }
    } else {
      fn();
    }
  };
  
  timeoutCustom = (action, name = false, duration = 0, fn = false) => {
    switch (action) {
      //sets new timeout by name
      case "set":
        let checkExistTimeout;
        if (this.timeouts.length > 0) {
          for (let i = 0; i <= this.timeouts.length - 1; i++) {
            checkExistTimeout = this.timeouts[i].indexOf(name);
            if (checkExistTimeout !== -1) {
              this.timeouts[i][1] = setTimeout(() => {
                fn();
              }, duration);
              return -1;
            }
            if (checkExistTimeout === -1 && i === this.timeouts.length - 1) {
              this.timeouts.push([
                name,
                setTimeout(() => {
                  fn();
                }, duration),
              ]);
              return -1;
            }
          }
        } else {
          this.timeouts.push([
            name,
            setTimeout(() => {
              fn();
            }, duration),
          ]);
        }
        break;
      //check if
      case "isset":
        for (let i = 0; i <= this.timeouts.length - 1; i++) {
          if (this.timeouts[i][0] === name) {
            return true;
          }
        }
        return false;
      //clear timeout by name
      case "clear":
        for (let i = 0; i <= this.timeouts.length - 1; i++) {
          if (this.timeouts[i][0] === name) {
            clearTimeout(this.timeouts[i][1]);
            this.timeouts.splice(i, 1);
          }
        }
        return undefined;
      //clear all this.timeouts
      case "clearAll":
        for (let i = 0; i <= this.timeouts.length - 1; i++) {
          clearTimeout(this.timeouts[i][1]);
          this.timeouts = new Array();
        }
        break;
      default:
        return undefined;
    }
  };
  
  intervalCustom = (action, name = false, tick = 0, fn = false) => {
    switch (action) {
      case "set":
        let checkExistInterval;
        if (this.intervals.length > 0) {
          for (let i = 0; i <= this.intervals.length - 1; i++) {
            checkExistInterval = this.intervals[i].indexOf(name);
            if (checkExistInterval !== -1) {
              this.intervals[i][1] = setInterval(() => {
                fn();
              }, tick);
              return -1;
            }
            if (checkExistInterval === -1 && i === this.intervals.length - 1) {
              this.intervals.push([
                name,
                setInterval(() => {
                  fn();
                }, tick),
              ]);
              return -1;
            }
          }
        } else {
          this.intervals.push([
            name,
            setInterval(() => {
              fn();
            }, tick),
          ]);
        }
        break;
      case "isset":
        for (let i = 0; i <= this.intervals.length - 1; i++) {
          if (this.intervals[i][0] === name) {
            return true;
          }
        }
        return false;
      case "clear":
        for (let i = 0; i <= this.intervals.length - 1; i++) {
          if (this.intervals[i][0] === name) {
            clearInterval(this.intervals[i][1]);
            this.intervals.splice(i, 1);
          }
        }
        return undefined;
        break;
      case "clearAll":
        for (let i = 0; i <= this.intervals.length - 1; i++) {
          clearInterval(this.intervals[i][1]);
          this.intervals = new Array();
        }
        break;
      default:
        return undefined;
    }
  };
  
  objectAssign(target, ...sources) {
    sources.forEach((source) => {
      Object.keys(source).forEach((key) => {
        const s_val = source[key];
        const t_val = target[key];
        target[key] = t_val && s_val && typeof t_val === "object" && typeof s_val === "object" ? objectAssign(t_val, s_val) : s_val;
      });
    });
    return target;
  }
  
  throttle(name, func, delay) {
    if (timeoutCustom("isset", name)) return;
  
    func();
  
    timeoutCustom("set", name, delay, () => {
      timeoutCustom("clear", name);
    });
  };

}
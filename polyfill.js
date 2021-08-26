var intervalMap = []
intervalId = 0

function createSetIntervalPolyfill() {
    function setIntervalPolyfill(callbackFn, delay = 0, timeOut) {
        if (typeof callbackFn != 'function') {
            throw new TypeError("Invalid callback")
        }
        var id = intervalId++;

        function repeatcall() {
            intervalMap[id] = setTimeout(() => {
                callbackFn(timeOut)
                if (intervalMap[id]) { repeatcall(); }
            }, delay);
            console.log(intervalMap);
        }
        repeatcall()
        return id
    }

    function clearIntervalPolyfill(intervalId) {
        clearTimeout(intervalMap[intervalId]);
        delete intervalMap[intervalId];
    }
    return {
        setIntervalPolyfill,
        clearIntervalPolyfill
    }
}

const {
    setIntervalPolyfill,
    clearIntervalPolyfill
} = createSetIntervalPolyfill()
let ctr = 0

function myFun(timeout = 10) {
    ctr++
    if (ctr >= timeout) {
        clearIntervalPolyfill(intervalId)
    }
    console.log("Logging");

}

intervalId = setIntervalPolyfill(myFun, 1000, 2)
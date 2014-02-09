var BufferLoader = (function() {
    function BufferLoader(context, urlList, callback) {
        var self = this;
        self.context = context;
        self.urlList = urlList;
        self.onload = callback;
        self.bufferList = new Array();
        self.loadCount = 0;
    };

    BufferLoader.prototype.loadBuffer = function (url, index) {
        var self = this;

        // Load buffer asynchronously
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = (function () {
    // Asynchronously decode the audio file data in request.response
    self.context.decodeAudioData(request.response, (function (buffer) {
    if (!(buffer)) {
        alert(("error decoding file data: " + url));
        return;
    }
    self.bufferList[index] = buffer;
    (self.loadCount += 1);
    console.debug("Loaded", url, self.loadCount, "/", self.urlList.length);
    if ((self.loadCount == self.urlList.length)) {
        self.onload(self.bufferList);
    }
}), (function (error) {
    console.error("decodeAudioData error", error);
}));
});

        request.onerror = (function () {
    alert("BufferLoader: XHR error");
});

        request.send();
    };

    BufferLoader.prototype.load = function () {
        var self = this;

        var i;
        for (var k = 0; k < (function () {
    var a = [];
    for (var _i1 = 0; 0 < (self.urlList.length - 1) ? _i1 <= (self.urlList.length - 1) : _i1 >= (self.urlList.length - 1); 0 <= (self.urlList.length - 1) ? _i1++ : _i1--) { a.push(_i1) }
    return a;
})().length; k += 1) {
            i = (function () {
    var a = [];
    for (var _i1 = 0; 0 < (self.urlList.length - 1) ? _i1 <= (self.urlList.length - 1) : _i1 >= (self.urlList.length - 1); 0 <= (self.urlList.length - 1) ? _i1++ : _i1--) { a.push(_i1) }
    return a;
})()[k];
            self.loadBuffer(self.urlList[i], i);
        }
    };

    return BufferLoader;
})();

var context = 0;
var source = 0;

var randomTime = function () {
    var time = (Math.random() * 500000);
    time = (Math.floor((time / 100)) * 100);
    return time;
};

var playSound = function (buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
};

var finishedLoading = function (bufferList) {
    console.log("Finished loading");
    // Create two sources and play them both together.

    var buffer;
    for (var k = 0; k < bufferList.length; k += 1) {
        buffer = bufferList[k];
        var play = (function (b) {
    return (function () {
    playSound(b, 0);
});
});
        var i;
        for (var _k1 = 0; _k1 < (function () {
    var a = [];
    for (var _i1 = 0; _i1 <= 100; _i1++) { a.push(_i1) }
    return a;
})().length; _k1 += 1) {
            i = (function () {
    var a = [];
    for (var _i1 = 0; _i1 <= 100; _i1++) { a.push(_i1) }
    return a;
})()[_k1];
            setTimeout(play(buffer), randomTime());
        }
    }
};

var init = function () {
    // Fix up prefixing
    (window.AudioContext = window.AudioContext || window.webkitAudioContext);
    context = new window.AudioContext();
    var files = [];
    var i;
    for (var k = 0; k < (function () {
    var a = [];
    for (var _i1 = 1; _i1 <= 16; _i1++) { a.push(_i1) }
    return a;
})().length; k += 1) {
        i = (function () {
    var a = [];
    for (var _i1 = 1; _i1 <= 16; _i1++) { a.push(_i1) }
    return a;
})()[k];
        files.push((("sounds/pianobell_" + i) + ".ogg"));
        files.push((("sounds/woody_" + i) + ".ogg"));
    }
    var bufferLoader = new BufferLoader(context, files, finishedLoading);

    bufferLoader.load();
};

window.onload = init;
var bufferLoader = 0;

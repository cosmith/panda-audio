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
    if ((self.loadCount == self.urlList.length)) {
        self.onload(self.bufferList);
    }
    console.log("Load count:", self.loadCount, "of:", self.urlList.length);
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

var finishedLoading = function (bufferList) {
    console.log("Finished loading");
    // Create two sources and play them both together.
    var source1 = context.createBufferSource();
    var source2 = context.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];

    source1.connect(context.destination);
    source2.connect(context.destination);
    source1.start(0);
    source2.start(0);
};

var init = function () {
    // Fix up prefixing
    (window.AudioContext = window.AudioContext || window.webkitAudioContext);
    context = new window.AudioContext();
    var files = ["./c.m4a", "./c.m4a"];
    var bufferLoader = new BufferLoader(context, files, finishedLoading);

    bufferLoader.load();
};

window.onload = init;
var bufferLoader = 0;

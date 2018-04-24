'use strict';
var com;
(function (com) {
    var d_project;
    (function (d_project) {
        var text;
        (function (text) {
            var ByteArrayInputStream = com.d_project.io.ByteArrayInputStream;
            var Base64DecodeInputStream = com.d_project.io.Base64DecodeInputStream;
            function createStringToBytes(unicodeData, numChars) {
                function toBytes(s) {
                    var bytes = [];
                    for (var i = 0; i < s.length; i += 1) {
                        bytes.push(s.charCodeAt(i));
                    }
                    return bytes;
                }
                var unicodeMap = function () {
                    var bin = new Base64DecodeInputStream(new ByteArrayInputStream(toBytes(unicodeData)));
                    var read = function () {
                        var b = bin.readByte();
                        if (b == -1)
                            throw 'eof';
                        return b;
                    };
                    var count = 0;
                    var unicodeMap = {};
                    while (true) {
                        var b0 = bin.readByte();
                        if (b0 == -1)
                            break;
                        var b1 = read();
                        var b2 = read();
                        var b3 = read();
                        var k = String.fromCharCode((b0 << 8) | b1);
                        var v = (b2 << 8) | b3;
                        unicodeMap[k] = v;
                        count += 1;
                    }
                    if (count != numChars) {
                        throw count + '!=' + numChars;
                    }
                    return unicodeMap;
                }();
                var unknownChar = '?'.charCodeAt(0);
                return function (s) {
                    var bytes = [];
                    for (var i = 0; i < s.length; i += 1) {
                        var c = s.charCodeAt(i);
                        if (c < 128) {
                            bytes.push(c);
                        }
                        else {
                            var b = unicodeMap[s.charAt(i)];
                            if (typeof b == 'number') {
                                if ((b & 0xff) == b) {
                                    bytes.push(b);
                                }
                                else {
                                    bytes.push(b >>> 8);
                                    bytes.push(b & 0xff);
                                }
                            }
                            else {
                                bytes.push(unknownChar);
                            }
                        }
                    }
                    return bytes;
                };
            }
            text.createStringToBytes = createStringToBytes;
            ;
        })(text = d_project.text || (d_project.text = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC90ZXh0L2NyZWF0ZVN0cmluZ1RvQnl0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsWUFBWSxDQUFDO0FBQ2IsSUFBVSxHQUFHLENBOEVaO0FBOUVELFdBQVUsR0FBRztJQUFDLElBQUEsU0FBUyxDQThFdEI7SUE5RWEsV0FBQSxTQUFTO1FBQUMsSUFBQSxJQUFJLENBOEUzQjtRQTlFdUIsV0FBQSxJQUFJLEVBQUMsQ0FBQztZQUU1QixJQUFPLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBQ3BFLElBQU8sdUJBQXVCLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFTMUUsNkJBQ0UsV0FBb0IsRUFDcEIsUUFBaUI7Z0JBRWpCLGlCQUFpQixDQUFVO29CQUN6QixJQUFJLEtBQUssR0FBYyxFQUFFLENBQUM7b0JBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO29CQUMvQixDQUFDO29CQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztnQkFFRCxJQUFJLFVBQVUsR0FBRztvQkFDZixJQUFJLEdBQUcsR0FBRyxJQUFJLHVCQUF1QixDQUNuQyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBRSxDQUFFLENBQUM7b0JBQ3BELElBQUksSUFBSSxHQUFHO3dCQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDdkIsRUFBRSxDQUFDLENBQUMs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QUosY0FBSSxRQThFM0I7SUFBRCxDQUFDLEVBOUVhLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQThFdEI7QUFBRCxDQUFDLEVBOUVTLEdBQUcsS0FBSCxHQUFHLFFBOEVaIiwiZmlsZSI6ImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC90ZXh0L2NyZWF0ZVN0cmluZ1RvQnl0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW8vQnl0ZUFycmF5SW5wdXRTdHJlYW0udHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2lvL0Jhc2U2NERlY29kZUlucHV0U3RyZWFtLnRzXCIgLz5cbid1c2Ugc3RyaWN0Jztcbm5hbWVzcGFjZSBjb20uZF9wcm9qZWN0LnRleHQge1xuXG4gIGltcG9ydCBCeXRlQXJyYXlJbnB1dFN0cmVhbSA9IGNvbS5kX3Byb2plY3QuaW8uQnl0ZUFycmF5SW5wdXRTdHJlYW07XG4gIGltcG9ydCBCYXNlNjREZWNvZGVJbnB1dFN0cmVhbSA9IGNvbS5kX3Byb2plY3QuaW8uQmFzZTY0RGVjb2RlSW5wdXRTdHJlYW07XG5cbiAgLyoqXG4gICAqIGNyZWF0ZVN0cmluZ1RvQnl0ZXNcbiAgICogQGF1dGhvciBLYXp1aGlrbyBBcmFzZVxuICAgKiBAcGFyYW0gdW5pY29kZURhdGEgYmFzZTY0IHN0cmluZyBvZiBieXRlIGFycmF5LlxuICAgKiBbMTZiaXQgVW5pY29kZV0sWzE2Yml0IEJ5dGVzXSwgLi4uXG4gICAqIEBwYXJhbSBudW1DaGFyc1xuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ1RvQnl0ZXMoXG4gICAgdW5pY29kZURhdGEgOiBzdHJpbmcsXG4gICAgbnVtQ2hhcnMgOiBudW1iZXJcbiAgKSA6IChzIDogc3RyaW5nKSA9PiBudW1iZXJbXSB7XG4gICAgZnVuY3Rpb24gdG9CeXRlcyhzIDogc3RyaW5nKSA6IG51bWJlcltdIHtcbiAgICAgIHZhciBieXRlcyA6IG51bWJlcltdID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYnl0ZXMucHVzaChzLmNoYXJDb2RlQXQoaSkgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gICAgLy8gY3JlYXRlIGNvbnZlcnNpb24gbWFwLlxuICAgIHZhciB1bmljb2RlTWFwID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYmluID0gbmV3IEJhc2U2NERlY29kZUlucHV0U3RyZWFtKFxuICAgICAgICBuZXcgQnl0ZUFycmF5SW5wdXRTdHJlYW0odG9CeXRlcyh1bmljb2RlRGF0YSkgKSApO1xuICAgICAgdmFyIHJlYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGIgPSBiaW4ucmVhZEJ5dGUoKTtcbiAgICAgICAgaWYgKGIgPT0gLTEpIHRocm93ICdlb2YnO1xuICAgICAgICByZXR1cm4gYjtcbiAgICAgIH07XG4gICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgdmFyIHVuaWNvZGVNYXAgOiB7IFtjaCA6IHN0cmluZ10gOiBudW1iZXI7IH0gPSB7fTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBiMCA9IGJpbi5yZWFkQnl0ZSgpO1xuICAgICAgICBpZiAoYjAgPT0gLTEpIGJyZWFrO1xuICAgICAgICB2YXIgYjEgPSByZWFkKCk7XG4gICAgICAgIHZhciBiMiA9IHJlYWQoKTtcbiAgICAgICAgdmFyIGIzID0gcmVhZCgpO1xuICAgICAgICB2YXIgayA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIChiMCA8PCA4KSB8IGIxKTtcbiAgICAgICAgdmFyIHYgPSAoYjIgPDwgOCkgfCBiMztcbiAgICAgICAgdW5pY29kZU1hcFtrXSA9IHY7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoY291bnQgIT0gbnVtQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgY291bnQgKyAnIT0nICsgbnVtQ2hhcnM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5pY29kZU1hcDtcbiAgICB9KCk7XG5cbiAgICB2YXIgdW5rbm93bkNoYXIgPSAnPycuY2hhckNvZGVBdCgwKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihzIDogc3RyaW5nKSA6IG51bWJlcltdIHtcbiAgICAgIHZhciBieXRlcyA6IG51bWJlcltdID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIGMgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgICAgYnl0ZXMucHVzaChjKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgYiA9IHVuaWNvZGVNYXBbcy5jaGFyQXQoaSldO1xuICAgICAgICAgIGlmICh0eXBlb2YgYiA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaWYgKCAoYiAmIDB4ZmYpID09IGIpIHtcbiAgICAgICAgICAgICAgLy8gMWJ5dGVcbiAgICAgICAgICAgICAgYnl0ZXMucHVzaChiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIDJieXRlc1xuICAgICAgICAgICAgICBieXRlcy5wdXNoKGIgPj4+IDgpO1xuICAgICAgICAgICAgICBieXRlcy5wdXNoKGIgJiAweGZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnl0ZXMucHVzaCh1bmtub3duQ2hhcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==

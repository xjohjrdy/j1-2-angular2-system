'use strict';
var test;
(function (test) {
    var QRCode = com.d_project.qrcode.QRCode;
    var ErrorCorrectLevel = com.d_project.qrcode.ErrorCorrectLevel;
    var QRNumber = com.d_project.qrcode.QRNumber;
    var QRAlphaNum = com.d_project.qrcode.QRAlphaNum;
    var QR8BitByte = com.d_project.qrcode.QR8BitByte;
    var QRKanji = com.d_project.qrcode.QRKanji;
    function run() {
        var qr = new QRCode();
        qr.setTypeNumber(5);
        qr.setErrorCorrectLevel(ErrorCorrectLevel.L);
        qr.addData(new QRNumber('0123'));
        qr.addData(new QRAlphaNum('AB5678CD'));
        qr.addData(new QR8BitByte('[8BitByte :)]'));
        qr.addData('[here is 8BitByte too]');
        qr.addData(new QRKanji('漢字'));
        qr.make();
        var img = document.createElement('img');
        img.setAttribute('src', qr.toDataURL());
        document.body.appendChild(img);
        document.body.appendChild(createCanvas(qr, 2));
    }
    test.run = run;
    function createCanvas(qr, cellSize, margin) {
        if (cellSize === void 0) { cellSize = 2; }
        if (margin === void 0) { margin = cellSize * 4; }
        var canvas = document.createElement('canvas');
        var size = qr.getModuleCount() * cellSize + margin * 2;
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#000000';
        for (var row = 0; row < qr.getModuleCount(); row += 1) {
            for (var col = 0; col < qr.getModuleCount(); col += 1) {
                if (qr.isDark(row, col)) {
                    ctx.fillRect(col * cellSize + margin, row * cellSize + margin, cellSize, cellSize);
                }
            }
        }
        return canvas;
    }
})(test || (test = {}));
window.onload = function () {
    test.run();
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxZQUFZLENBQUE7QUFDWixJQUFVLElBQUksQ0EyRGI7QUEzREQsV0FBVSxJQUFJLEVBQUMsQ0FBQztJQUVkLElBQU8sTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QyxJQUFPLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xFLElBQU8sUUFBUSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNoRCxJQUFPLFVBQVUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEQsSUFBTyxVQUFVLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BELElBQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUU5QztRQUtFLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7UUFDdEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixFQUFFLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBRSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUUsQ0FBQztRQUN4QyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFFLENBQUM7UUFDN0MsRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQztRQUMvQixFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFHVixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBRSxDQUFDO1FBQ3pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRy9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUUsQ0FBQztJQUNsRCxDQUFDO0lBdEJlLFFBQUcsTUFzQmxCLENBQUE7SUFFRCxzQkFBc0IsRUFBVyxFQUFFLFFBQVksRUFBRSxNQUFxQjtRQUFuQyx3QkFBWSxHQUFaLFlBQVk7UUFBRSxzQkFBcUIsR0FBckIsU0FBUyxRQUFRLEdBQUcsQ0FBQztRQUVwRSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR2xDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFHL0IsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3RELEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDdEQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN6QixHQUFHLENBQUMsUUFBUSxDQUNWLEdBQUcsR0FBRyxRQUFRLEdBQUcsTUFBTSxFQUN2QixHQUFHLEdBQUcsUUFBUSxHQUFHLE1BQU0sRUFDdkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDLEVBM0RTLElBQUksS0FBSixJQUFJLFFBMkRiO0FBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRztJQUNkLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNiLENBQUMsQ0FBQyIsImZpbGUiOiJhcHAvc2hhcmVkL3FyY29kZS1nZW5lcmF0b3IvdHMvc3JjL3RzL3Rlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiY29tL2RfcHJvamVjdC9xcmNvZGUvUVJDb2RlXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb20vZF9wcm9qZWN0L3FyY29kZS9FcnJvckNvcnJlY3RMZXZlbFwiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiY29tL2RfcHJvamVjdC9xcmNvZGUvUVJOdW1iZXJcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvbS9kX3Byb2plY3QvcXJjb2RlL1FSQWxwaGFOdW1cIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvbS9kX3Byb2plY3QvcXJjb2RlL1FSOEJpdEJ5dGVcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvbS9kX3Byb2plY3QvcXJjb2RlL1FSS2FuamlcIiAvPlxuXG4ndXNlIHN0cmljdCdcbm5hbWVzcGFjZSB0ZXN0IHtcblxuICBpbXBvcnQgUVJDb2RlID0gY29tLmRfcHJvamVjdC5xcmNvZGUuUVJDb2RlO1xuICBpbXBvcnQgRXJyb3JDb3JyZWN0TGV2ZWwgPSBjb20uZF9wcm9qZWN0LnFyY29kZS5FcnJvckNvcnJlY3RMZXZlbDtcbiAgaW1wb3J0IFFSTnVtYmVyID0gY29tLmRfcHJvamVjdC5xcmNvZGUuUVJOdW1iZXI7XG4gIGltcG9ydCBRUkFscGhhTnVtID0gY29tLmRfcHJvamVjdC5xcmNvZGUuUVJBbHBoYU51bTtcbiAgaW1wb3J0IFFSOEJpdEJ5dGUgPSBjb20uZF9wcm9qZWN0LnFyY29kZS5RUjhCaXRCeXRlO1xuICBpbXBvcnQgUVJLYW5qaSA9IGNvbS5kX3Byb2plY3QucXJjb2RlLlFSS2Fuamk7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJ1bigpIDogdm9pZCB7XG5cbiAgICAvLyB1bmNvbW1lbnQgaWYgVVRGLTggc3VwcG9ydCBpcyByZXF1aXJlZC5cbiAgICAvL1FSQ29kZS5zdHJpbmdUb0J5dGVzID0gY29tLmRfcHJvamVjdC50ZXh0LnN0cmluZ1RvQnl0ZXNfVVRGODtcblxuICAgIHZhciBxciA9IG5ldyBRUkNvZGUoKTtcbiAgICBxci5zZXRUeXBlTnVtYmVyKDUpO1xuICAgIHFyLnNldEVycm9yQ29ycmVjdExldmVsKEVycm9yQ29ycmVjdExldmVsLkwpO1xuICAgIHFyLmFkZERhdGEobmV3IFFSTnVtYmVyKCcwMTIzJykgKTsgLy8gTnVtYmVyIG9ubHlcbiAgICBxci5hZGREYXRhKG5ldyBRUkFscGhhTnVtKCdBQjU2NzhDRCcpICk7IC8vIEFscGhhYmV0IGFuZCBOdW1iZXJcbiAgICBxci5hZGREYXRhKG5ldyBRUjhCaXRCeXRlKCdbOEJpdEJ5dGUgOildJykgKTsgLy8gbW9zdCB1c2VmdWwgZm9yIHVzdWFsIHB1cnBvc2UuXG4gICAgcXIuYWRkRGF0YSgnW2hlcmUgaXMgOEJpdEJ5dGUgdG9vXScpO1xuICAgIHFyLmFkZERhdGEobmV3IFFSS2FuamkoJ+a8ouWtlycpICk7IC8vIEthbmppKFNKSVMpIG9ubHlcbiAgICBxci5tYWtlKCk7XG4gIFxuICAgIC8vIGltZ1xuICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBxci50b0RhdGFVUkwoKSApO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgXG4gICAgLy8gY2FudmFzXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjcmVhdGVDYW52YXMocXIsIDIpICk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVDYW52YXMocXIgOiBRUkNvZGUsIGNlbGxTaXplID0gMiwgbWFyZ2luID0gY2VsbFNpemUgKiA0KSB7XG5cbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdmFyIHNpemUgPSBxci5nZXRNb2R1bGVDb3VudCgpICogY2VsbFNpemUgKyBtYXJnaW4gKiAyO1xuICAgIGNhbnZhcy53aWR0aCA9IHNpemU7XG4gICAgY2FudmFzLmhlaWdodCA9IHNpemU7XG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgLy8gZmlsbCBiYWNrZ3JvdW5kXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7XG5cbiAgICAvLyBkcmF3IGNlbGxzXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBxci5nZXRNb2R1bGVDb3VudCgpOyByb3cgKz0gMSkge1xuICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgcXIuZ2V0TW9kdWxlQ291bnQoKTsgY29sICs9IDEpIHtcbiAgICAgICAgaWYgKHFyLmlzRGFyayhyb3csIGNvbCkgKSB7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgY29sICogY2VsbFNpemUgKyBtYXJnaW4sXG4gICAgICAgICAgICByb3cgKiBjZWxsU2l6ZSArIG1hcmdpbixcbiAgICAgICAgICAgIGNlbGxTaXplLCBjZWxsU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxufVxuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRlc3QucnVuKCk7XG59O1xuIl19

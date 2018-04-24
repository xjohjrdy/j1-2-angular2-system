'use strict';
var com;
(function (com) {
    var d_project;
    (function (d_project) {
        var qrcode;
        (function (qrcode) {
            var QRMath = (function () {
                function QRMath() {
                    throw 'error';
                }
                QRMath.glog = function (n) {
                    if (n < 1) {
                        throw 'log(' + n + ')';
                    }
                    return QRMath.LOG_TABLE[n];
                };
                QRMath.gexp = function (n) {
                    while (n < 0) {
                        n += 255;
                    }
                    while (n >= 256) {
                        n -= 255;
                    }
                    return QRMath.EXP_TABLE[n];
                };
                QRMath.initialize = function () {
                    QRMath.EXP_TABLE = [];
                    QRMath.LOG_TABLE = [];
                    for (var i = 0; i < 256; i += 1) {
                        QRMath.EXP_TABLE.push(i < 8 ? 1 << i :
                            QRMath.EXP_TABLE[i - 4] ^
                                QRMath.EXP_TABLE[i - 5] ^
                                QRMath.EXP_TABLE[i - 6] ^
                                QRMath.EXP_TABLE[i - 8]);
                        QRMath.LOG_TABLE.push(0);
                    }
                    for (var i = 0; i < 255; i += 1) {
                        QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
                    }
                }();
                return QRMath;
            }());
            qrcode.QRMath = QRMath;
        })(qrcode = d_project.qrcode || (d_project.qrcode = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvUVJNYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiLElBQVUsR0FBRyxDQWdEWjtBQWhERCxXQUFVLEdBQUc7SUFBQyxJQUFBLFNBQVMsQ0FnRHRCO0lBaERhLFdBQUEsU0FBUztRQUFDLElBQUEsTUFBTSxDQWdEN0I7UUFoRHVCLFdBQUEsTUFBTSxFQUFDLENBQUM7WUFNOUI7Z0JBRUU7b0JBQ0UsTUFBTSxPQUFPLENBQUM7Z0JBQ2hCLENBQUM7Z0JBcUJhLFdBQUksR0FBbEIsVUFBbUIsQ0FBVTtvQkFDM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztvQkFDekIsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztnQkFFYSxXQUFJLEdBQWxCLFVBQW1CLENBQVU7b0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUNiLENBQUMsSUFBSSxHQUFHLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzt3QkFDaEIsQ0FBQyxJQUFJLEdBQUcsQ0FBQztvQkFDWCxDQUFDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDO2dCQS9CYyxpQkFBVSxHQUFHO29CQUMxQixNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztvQkFDdEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDaEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRSxDQUFDLElBQUksQ0FBQzs0QkFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLENBQUM7b0JBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNoQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzdDLENBQUM7Z0JBQ0gsQ0FBQyxFQUFFLENBQUM7Z0JBa0JOLGFBQUM7WUFBRCxDQXpDQSxBQXlDQyxJQUFBO1lBekNZLGFBQU0sU0F5Q2xCLENBQUE7UUFDSCxDQUFDLEVBaER1QixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQWdEN0I7SUFBRCxDQUFDLEVBaERhLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWdEdEI7QUFBRCxDQUFDLEVBaERTLEdBQUcsS0FBSCxHQUFHLFFBZ0RaIiwiZmlsZSI6ImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9xcmNvZGUvUVJNYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubmFtZXNwYWNlIGNvbS5kX3Byb2plY3QucXJjb2RlIHtcblxuICAvKipcbiAgICogUVJNYXRoXG4gICAqIEBhdXRob3IgS2F6dWhpa28gQXJhc2VcbiAgICovXG4gIGV4cG9ydCBjbGFzcyBRUk1hdGgge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aHJvdyAnZXJyb3InO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIEVYUF9UQUJMRSA6IG51bWJlcltdO1xuICAgIHByaXZhdGUgc3RhdGljIExPR19UQUJMRSA6IG51bWJlcltdO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgUVJNYXRoLkVYUF9UQUJMRSA9IFtdO1xuICAgICAgUVJNYXRoLkxPR19UQUJMRSA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkgKz0gMSkge1xuICAgICAgICBRUk1hdGguRVhQX1RBQkxFLnB1c2goaSA8IDg/IDEgPDwgaSA6XG4gICAgICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gNF0gXlxuICAgICAgICAgIFFSTWF0aC5FWFBfVEFCTEVbaSAtIDVdIF5cbiAgICAgICAgICBRUk1hdGguRVhQX1RBQkxFW2kgLSA2XSBeXG4gICAgICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gOF0pO1xuICAgICAgICBRUk1hdGguTE9HX1RBQkxFLnB1c2goMCk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NTsgaSArPSAxKSB7XG4gICAgICAgIFFSTWF0aC5MT0dfVEFCTEVbUVJNYXRoLkVYUF9UQUJMRVtpXSBdID0gaTtcbiAgICAgIH1cbiAgICB9KCk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdsb2cobiA6IG51bWJlcikgOiBudW1iZXIge1xuICAgICAgaWYgKG4gPCAxKSB7XG4gICAgICAgIHRocm93ICdsb2coJyArIG4gKyAnKSc7XG4gICAgICB9XG4gICAgICByZXR1cm4gUVJNYXRoLkxPR19UQUJMRVtuXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdleHAobiA6IG51bWJlcikgOiBudW1iZXIge1xuICAgICAgd2hpbGUgKG4gPCAwKSB7XG4gICAgICAgIG4gKz0gMjU1O1xuICAgICAgfVxuICAgICAgd2hpbGUgKG4gPj0gMjU2KSB7XG4gICAgICAgIG4gLT0gMjU1O1xuICAgICAgfVxuICAgICAgcmV0dXJuIFFSTWF0aC5FWFBfVEFCTEVbbl07XG4gICAgfVxuICB9XG59XG4iXX0=

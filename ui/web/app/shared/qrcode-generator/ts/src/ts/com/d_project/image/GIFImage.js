'use strict';
var com;
(function (com) {
    var d_project;
    (function (d_project) {
        var image;
        (function (image) {
            var ByteArrayOutputStream = com.d_project.io.ByteArrayOutputStream;
            var Base64 = com.d_project.io.Base64;
            var GIFImage = (function () {
                function GIFImage(width, height) {
                    this.width = width;
                    this.height = height;
                    var size = width * height;
                    this.data = [];
                    for (var i = 0; i < size; i += 1) {
                        this.data.push(0);
                    }
                }
                GIFImage.prototype.setPixel = function (x, y, pixel) {
                    if (x < 0 || this.width <= x)
                        throw '!' + x;
                    if (y < 0 || this.height <= y)
                        throw '!' + y;
                    this.data[y * this.width + x] = pixel;
                };
                GIFImage.prototype.getPixel = function (x, y) {
                    if (x < 0 || this.width <= x)
                        throw '!' + x;
                    if (y < 0 || this.height <= y)
                        throw '!' + y;
                    return this.data[y * this.width + x];
                };
                GIFImage.prototype.write = function (out) {
                    out.writeByte('G'.charCodeAt(0));
                    out.writeByte('I'.charCodeAt(0));
                    out.writeByte('F'.charCodeAt(0));
                    out.writeByte('8'.charCodeAt(0));
                    out.writeByte('7'.charCodeAt(0));
                    out.writeByte('a'.charCodeAt(0));
                    this.writeWord(out, this.width);
                    this.writeWord(out, this.height);
                    out.writeByte(0x80);
                    out.writeByte(0);
                    out.writeByte(0);
                    out.writeByte(0x00);
                    out.writeByte(0x00);
                    out.writeByte(0x00);
                    out.writeByte(0xff);
                    out.writeByte(0xff);
                    out.writeByte(0xff);
                    out.writeByte(','.charCodeAt(0));
                    this.writeWord(out, 0);
                    this.writeWord(out, 0);
                    this.writeWord(out, this.width);
                    this.writeWord(out, this.height);
                    out.writeByte(0);
                    var lzwMinCodeSize = 2;
                    var raster = this.getLZWRaster(lzwMinCodeSize);
                    out.writeByte(lzwMinCodeSize);
                    var offset = 0;
                    while (raster.length - offset > 255) {
                        out.writeByte(255);
                        this.writeBytes(out, raster, offset, 255);
                        offset += 255;
                    }
                    out.writeByte(raster.length - offset);
                    this.writeBytes(out, raster, offset, raster.length - offset);
                    out.writeByte(0x00);
                    out.writeByte(';'.charCodeAt(0));
                };
                GIFImage.prototype.getLZWRaster = function (lzwMinCodeSize) {
                    var clearCode = 1 << lzwMinCodeSize;
                    var endCode = (1 << lzwMinCodeSize) + 1;
                    var bitLength = lzwMinCodeSize + 1;
                    var table = new LZWTable();
                    for (var i = 0; i < clearCode; i += 1) {
                        table.add(String.fromCharCode(i));
                    }
                    table.add(String.fromCharCode(clearCode));
                    table.add(String.fromCharCode(endCode));
                    var byteOut = new ByteArrayOutputStream();
                    var bitOut = new BitOutputStream(byteOut);
                    try {
                        bitOut.write(clearCode, bitLength);
                        var dataIndex = 0;
                        var s = String.fromCharCode(this.data[dataIndex]);
                        dataIndex += 1;
                        while (dataIndex < this.data.length) {
                            var c = String.fromCharCode(this.data[dataIndex]);
                            dataIndex += 1;
                            if (table.contains(s + c)) {
                                s = s + c;
                            }
                            else {
                                bitOut.write(table.indexOf(s), bitLength);
                                if (table.getSize() < 0xfff) {
                                    if (table.getSize() == (1 << bitLength)) {
                                        bitLength += 1;
                                    }
                                    table.add(s + c);
                                }
                                s = c;
                            }
                        }
                        bitOut.write(table.indexOf(s), bitLength);
                        bitOut.write(endCode, bitLength);
                    }
                    finally {
                        bitOut.close();
                    }
                    return byteOut.toByteArray();
                };
                GIFImage.prototype.writeWord = function (out, i) {
                    out.writeByte(i & 0xff);
                    out.writeByte((i >>> 8) & 0xff);
                };
                GIFImage.prototype.writeBytes = function (out, bytes, off, len) {
                    for (var i = 0; i < len; i += 1) {
                        out.writeByte(bytes[i + off]);
                    }
                };
                GIFImage.prototype.toDataURL = function () {
                    var bout = new ByteArrayOutputStream();
                    this.write(bout);
                    bout.close();
                    var s = '';
                    var bytes = Base64.encode(bout.toByteArray());
                    for (var i = 0; i < bytes.length; i += 1) {
                        s += String.fromCharCode(bytes[i]);
                    }
                    return 'data:image/gif;base64,' + s;
                };
                return GIFImage;
            }());
            image.GIFImage = GIFImage;
            var LZWTable = (function () {
                function LZWTable() {
                    this.map = {};
                    this.size = 0;
                }
                LZWTable.prototype.add = function (key) {
                    if (this.contains(key)) {
                        throw 'dup key:' + key;
                    }
                    this.map[key] = this.size;
                    this.size += 1;
                };
                LZWTable.prototype.getSize = function () {
                    return this.size;
                };
                LZWTable.prototype.indexOf = function (key) {
                    return this.map[key];
                };
                LZWTable.prototype.contains = function (key) {
                    return typeof this.map[key] != 'undefined';
                };
                return LZWTable;
            }());
            var BitOutputStream = (function () {
                function BitOutputStream(out) {
                    this.out = out;
                    this.bitLength = 0;
                }
                BitOutputStream.prototype.write = function (data, length) {
                    if ((data >>> length) != 0) {
                        throw 'length over';
                    }
                    while (this.bitLength + length >= 8) {
                        this.out.writeByte(0xff &
                            ((data << this.bitLength) | this.bitBuffer));
                        length -= (8 - this.bitLength);
                        data >>>= (8 - this.bitLength);
                        this.bitBuffer = 0;
                        this.bitLength = 0;
                    }
                    this.bitBuffer = (data << this.bitLength) | this.bitBuffer;
                    this.bitLength = this.bitLength + length;
                };
                BitOutputStream.prototype.flush = function () {
                    if (this.bitLength > 0) {
                        this.out.writeByte(this.bitBuffer);
                    }
                    this.out.flush();
                };
                BitOutputStream.prototype.close = function () {
                    this.flush();
                    this.out.close();
                };
                return BitOutputStream;
            }());
        })(image = d_project.image || (d_project.image = {}));
    })(d_project = com.d_project || (com.d_project = {}));
})(com || (com = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9pbWFnZS9HSUZJbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxZQUFZLENBQUM7QUFDYixJQUFVLEdBQUcsQ0F5UVo7QUF6UUQsV0FBVSxHQUFHO0lBQUMsSUFBQSxTQUFTLENBeVF0QjtJQXpRYSxXQUFBLFNBQVM7UUFBQyxJQUFBLEtBQUssQ0F5UTVCO1FBelF1QixXQUFBLEtBQUssRUFBQyxDQUFDO1lBRzdCLElBQU8scUJBQXFCLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDdEUsSUFBTyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBTXhDO2dCQU1FLGtCQUFZLEtBQWMsRUFBRSxNQUFlO29CQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQ3JCLElBQUksSUFBSSxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUM7b0JBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNmLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFTSwyQkFBUSxHQUFmLFVBQWdCLENBQVUsRUFBRSxDQUFVLEVBQUUsS0FBYztvQkFDcEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFLLENBQUMsQ0FBQzt3QkFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7d0JBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDeEMsQ0FBQztnQkFFTSwyQkFBUSxHQUFmLFVBQWdCLENBQVUsRUFBRSxDQUFVO29CQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUssQ0FBQyxDQUFDO3dCQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2dCQUVNLHdCQUFLLEdBQVosVUFBYSxHQUFrQjtvQkFLN0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7b0JBQ2xDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO29CQUNsQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztvQkFDbEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7b0JBQ2xDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO29CQUNsQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztvQkFLbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRWpDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBTWpCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBR3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBS3BCLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO29CQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQVFqQixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBRS9DLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBRTlCLElBQUksTUFBTSxHQUFZLENBQUMsQ0FBQztvQkFFeEIsT0FBTyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDcEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDMUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztvQkFDaEIsQ0FBQztvQkFFRCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztvQkFDN0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFJcEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQ3BDLENBQUM7Z0JBRU8sK0JBQVksR0FBcEIsVUFBcUIsY0FBdUI7b0JBRTFDLElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxjQUFjLENBQUM7b0JBQ3BDLElBQUksT0FBTyxHQUFLLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxTQUFTLEdBQUcsY0FBYyxHQUFHLENBQUMsQ0FBQztvQkFHbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztvQkFFM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUN0QyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztvQkFDckMsQ0FBQztvQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUUsQ0FBQztvQkFDM0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFFLENBQUM7b0JBRXpDLElBQUksT0FBTyxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxNQUFNLEdBQUksSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTNDLElBQUksQ0FBQzt3QkFHSCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFFbkMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDbEQsU0FBUyxJQUFJLENBQUMsQ0FBQzt3QkFFZixPQUFPLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUNwQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDbEQsU0FBUyxJQUFJLENBQUMsQ0FBQzs0QkFDZixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQ3pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNkLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dDQUMxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQ0FDNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBRSxDQUFDLENBQUMsQ0FBQzt3Q0FDekMsU0FBUyxJQUFJLENBQUMsQ0FBQztvQ0FDakIsQ0FBQztvQ0FDRCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDbkIsQ0FBQztnQ0FDRCxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNSLENBQUM7d0JBQ0gsQ0FBQzt3QkFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBRzFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUVuQyxDQUFDOzRCQUFTLENBQUM7d0JBQ1QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNqQixDQUFDO29CQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQy9CLENBQUM7Z0JBRU8sNEJBQVMsR0FBakIsVUFBa0IsR0FBa0IsRUFBRSxDQUFVO29CQUM5QyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDeEIsR0FBRyxDQUFDLFNBQVMsQ0FBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFFTyw2QkFBVSxHQUFsQixVQUNFLEdBQWtCLEVBQ2xCLEtBQWdCLEVBQUUsR0FBWSxFQUFFLEdBQVk7b0JBRTVDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDaEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLENBQUM7Z0JBQ0gsQ0FBQztnQkFFTSw0QkFBUyxHQUFoQjtvQkFDRSxJQUFJLElBQUksR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDYixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ1gsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUUsQ0FBQztvQkFDL0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDekMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLHdCQUF3QixHQUFHLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztnQkFDSCxlQUFDO1lBQUQsQ0F0TEEsQUFzTEMsSUFBQTtZQXRMWSxjQUFRLFdBc0xwQixDQUFBO1lBRUQ7Z0JBS0U7b0JBSFEsUUFBRyxHQUFrQyxFQUFFLENBQUM7b0JBQ3hDLFNBQUksR0FBWSxDQUFDLENBQUM7Z0JBRzFCLENBQUM7Z0JBRU0sc0JBQUcsR0FBVixVQUFXLEdBQVk7b0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7b0JBQ3pCLENBQUM7b0JBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUMxQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDakIsQ0FBQztnQkFFTSwwQkFBTyxHQUFkO29CQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNuQixDQUFDO2dCQUVNLDBCQUFPLEdBQWQsVUFBZSxHQUFZO29CQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztnQkFFTSwyQkFBUSxHQUFmLFVBQWdCLEdBQVk7b0JBQzFCLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDO2dCQUM3QyxDQUFDO2dCQUNILGVBQUM7WUFBRCxDQTNCQSxBQTJCQyxJQUFBO1lBRUQ7Z0JBTUUseUJBQVksR0FBa0I7b0JBQzVCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO29CQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixDQUFDO2dCQUVNLCtCQUFLLEdBQVosVUFBYSxJQUFhLEVBQUUsTUFBZTtvQkFFekMsRUFBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxhQUFhLENBQUM7b0JBQ3RCLENBQUM7b0JBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSTs0QkFDckIsQ0FBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFFLENBQUM7d0JBQ2pELE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQy9CLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztvQkFDckIsQ0FBQztvQkFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUMzQyxDQUFDO2dCQUVNLCtCQUFLLEdBQVo7b0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JDLENBQUM7b0JBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQztnQkFFTSwrQkFBSyxHQUFaO29CQUNFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDYixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0F6Q0EsQUF5Q0MsSUFBQTtRQUNILENBQUMsRUF6UXVCLEtBQUssR0FBTCxlQUFLLEtBQUwsZUFBSyxRQXlRNUI7SUFBRCxDQUFDLEVBelFhLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXlRdEI7QUFBRCxDQUFDLEVBelFTLEdBQUcsS0FBSCxHQUFHLFFBeVFaIiwiZmlsZSI6ImFwcC9zaGFyZWQvcXJjb2RlLWdlbmVyYXRvci90cy9zcmMvdHMvY29tL2RfcHJvamVjdC9pbWFnZS9HSUZJbWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9pby9PdXRwdXRTdHJlYW0udHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2lvL0J5dGVBcnJheU91dHB1dFN0cmVhbS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vaW8vQmFzZTY0LnRzXCIgLz5cbid1c2Ugc3RyaWN0Jztcbm5hbWVzcGFjZSBjb20uZF9wcm9qZWN0LmltYWdlIHtcblxuICBpbXBvcnQgT3V0cHV0U3RyZWFtID0gY29tLmRfcHJvamVjdC5pby5PdXRwdXRTdHJlYW07XG4gIGltcG9ydCBCeXRlQXJyYXlPdXRwdXRTdHJlYW0gPSBjb20uZF9wcm9qZWN0LmlvLkJ5dGVBcnJheU91dHB1dFN0cmVhbTtcbiAgaW1wb3J0IEJhc2U2NCA9IGNvbS5kX3Byb2plY3QuaW8uQmFzZTY0O1xuXG4gIC8qKlxuICAgKiBHSUYgSW1hZ2UgKEIvVylcbiAgICogQGF1dGhvciBLYXp1aGlrbyBBcmFzZVxuICAgKi9cbiAgZXhwb3J0IGNsYXNzIEdJRkltYWdlIHtcblxuICAgIHByaXZhdGUgd2lkdGggOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBoZWlnaHQgOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBkYXRhIDogbnVtYmVyW107XG5cbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCA6IG51bWJlciwgaGVpZ2h0IDogbnVtYmVyKSB7XG4gICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIHZhciBzaXplID0gd2lkdGggKiBoZWlnaHQ7XG4gICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRQaXhlbCh4IDogbnVtYmVyLCB5IDogbnVtYmVyLCBwaXhlbCA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgIGlmICh4IDwgMCB8fCB0aGlzLndpZHRoICA8PSB4KSB0aHJvdyAnIScgKyB4O1xuICAgICAgaWYgKHkgPCAwIHx8IHRoaXMuaGVpZ2h0IDw9IHkpIHRocm93ICchJyArIHk7XG4gICAgICB0aGlzLmRhdGFbeSAqIHRoaXMud2lkdGggKyB4XSA9IHBpeGVsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQaXhlbCh4IDogbnVtYmVyLCB5IDogbnVtYmVyKSA6IG51bWJlciB7XG4gICAgICBpZiAoeCA8IDAgfHwgdGhpcy53aWR0aCAgPD0geCkgdGhyb3cgJyEnICsgeDtcbiAgICAgIGlmICh5IDwgMCB8fCB0aGlzLmhlaWdodCA8PSB5KSB0aHJvdyAnIScgKyB5O1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YVt5ICogdGhpcy53aWR0aCArIHhdO1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZShvdXQgOiBPdXRwdXRTdHJlYW0pIDogdm9pZCB7XG5cbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBHSUYgU2lnbmF0dXJlXG5cbiAgICAgIG91dC53cml0ZUJ5dGUoJ0cnLmNoYXJDb2RlQXQoMCkgKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoJ0knLmNoYXJDb2RlQXQoMCkgKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoJ0YnLmNoYXJDb2RlQXQoMCkgKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoJzgnLmNoYXJDb2RlQXQoMCkgKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoJzcnLmNoYXJDb2RlQXQoMCkgKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoJ2EnLmNoYXJDb2RlQXQoMCkgKTtcblxuICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIC8vIFNjcmVlbiBEZXNjcmlwdG9yXG5cbiAgICAgIHRoaXMud3JpdGVXb3JkKG91dCwgdGhpcy53aWR0aCk7XG4gICAgICB0aGlzLndyaXRlV29yZChvdXQsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgb3V0LndyaXRlQnl0ZSgweDgwKTsgLy8gMmJpdFxuICAgICAgb3V0LndyaXRlQnl0ZSgwKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoMCk7XG5cbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBHbG9iYWwgQ29sb3IgTWFwXG5cbiAgICAgIC8vIGJsYWNrXG4gICAgICBvdXQud3JpdGVCeXRlKDB4MDApO1xuICAgICAgb3V0LndyaXRlQnl0ZSgweDAwKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoMHgwMCk7XG5cbiAgICAgIC8vIHdoaXRlXG4gICAgICBvdXQud3JpdGVCeXRlKDB4ZmYpO1xuICAgICAgb3V0LndyaXRlQnl0ZSgweGZmKTtcbiAgICAgIG91dC53cml0ZUJ5dGUoMHhmZik7XG5cbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBJbWFnZSBEZXNjcmlwdG9yXG5cbiAgICAgIG91dC53cml0ZUJ5dGUoJywnLmNoYXJDb2RlQXQoMCkgKTtcbiAgICAgIHRoaXMud3JpdGVXb3JkKG91dCwgMCk7XG4gICAgICB0aGlzLndyaXRlV29yZChvdXQsIDApO1xuICAgICAgdGhpcy53cml0ZVdvcmQob3V0LCB0aGlzLndpZHRoKTtcbiAgICAgIHRoaXMud3JpdGVXb3JkKG91dCwgdGhpcy5oZWlnaHQpO1xuICAgICAgb3V0LndyaXRlQnl0ZSgwKTtcblxuICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIC8vIExvY2FsIENvbG9yIE1hcFxuXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgLy8gUmFzdGVyIERhdGFcblxuICAgICAgdmFyIGx6d01pbkNvZGVTaXplID0gMjtcbiAgICAgIHZhciByYXN0ZXIgPSB0aGlzLmdldExaV1Jhc3RlcihsendNaW5Db2RlU2l6ZSk7XG5cbiAgICAgIG91dC53cml0ZUJ5dGUobHp3TWluQ29kZVNpemUpO1xuXG4gICAgICB2YXIgb2Zmc2V0IDogbnVtYmVyID0gMDtcblxuICAgICAgd2hpbGUgKHJhc3Rlci5sZW5ndGggLSBvZmZzZXQgPiAyNTUpIHtcbiAgICAgICAgb3V0LndyaXRlQnl0ZSgyNTUpO1xuICAgICAgICB0aGlzLndyaXRlQnl0ZXMob3V0LCByYXN0ZXIsIG9mZnNldCwgMjU1KTtcbiAgICAgICAgb2Zmc2V0ICs9IDI1NTtcbiAgICAgIH1cblxuICAgICAgb3V0LndyaXRlQnl0ZShyYXN0ZXIubGVuZ3RoIC0gb2Zmc2V0KTtcbiAgICAgIHRoaXMud3JpdGVCeXRlcyhvdXQsIHJhc3Rlciwgb2Zmc2V0LCByYXN0ZXIubGVuZ3RoIC0gb2Zmc2V0KTtcbiAgICAgIG91dC53cml0ZUJ5dGUoMHgwMCk7XG5cbiAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBHSUYgVGVybWluYXRvclxuICAgICAgb3V0LndyaXRlQnl0ZSgnOycuY2hhckNvZGVBdCgwKSApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TFpXUmFzdGVyKGx6d01pbkNvZGVTaXplIDogbnVtYmVyKSA6IG51bWJlcltdIHtcblxuICAgICAgdmFyIGNsZWFyQ29kZSA9IDEgPDwgbHp3TWluQ29kZVNpemU7XG4gICAgICB2YXIgZW5kQ29kZSAgID0gKDEgPDwgbHp3TWluQ29kZVNpemUpICsgMTtcbiAgICAgIHZhciBiaXRMZW5ndGggPSBsendNaW5Db2RlU2l6ZSArIDE7XG5cbiAgICAgIC8vIFNldHVwIExaV1RhYmxlXG4gICAgICB2YXIgdGFibGUgPSBuZXcgTFpXVGFibGUoKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGVhckNvZGU7IGkgKz0gMSkge1xuICAgICAgICB0YWJsZS5hZGQoU3RyaW5nLmZyb21DaGFyQ29kZShpKSApO1xuICAgICAgfVxuICAgICAgdGFibGUuYWRkKFN0cmluZy5mcm9tQ2hhckNvZGUoY2xlYXJDb2RlKSApO1xuICAgICAgdGFibGUuYWRkKFN0cmluZy5mcm9tQ2hhckNvZGUoZW5kQ29kZSkgKTtcblxuICAgICAgdmFyIGJ5dGVPdXQgPSBuZXcgQnl0ZUFycmF5T3V0cHV0U3RyZWFtKCk7XG4gICAgICB2YXIgYml0T3V0ICA9IG5ldyBCaXRPdXRwdXRTdHJlYW0oYnl0ZU91dCk7XG5cbiAgICAgIHRyeSB7XG5cbiAgICAgICAgLy8gY2xlYXIgY29kZVxuICAgICAgICBiaXRPdXQud3JpdGUoY2xlYXJDb2RlLCBiaXRMZW5ndGgpO1xuXG4gICAgICAgIHZhciBkYXRhSW5kZXggPSAwO1xuICAgICAgICB2YXIgcyA9IFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5kYXRhW2RhdGFJbmRleF0pO1xuICAgICAgICBkYXRhSW5kZXggKz0gMTtcblxuICAgICAgICB3aGlsZSAoZGF0YUluZGV4IDwgdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBjID0gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmRhdGFbZGF0YUluZGV4XSk7XG4gICAgICAgICAgZGF0YUluZGV4ICs9IDE7XG4gICAgICAgICAgaWYgKHRhYmxlLmNvbnRhaW5zKHMgKyBjKSApIHtcbiAgICAgICAgICAgICAgcyA9IHMgKyBjO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiaXRPdXQud3JpdGUodGFibGUuaW5kZXhPZihzKSwgYml0TGVuZ3RoKTtcbiAgICAgICAgICAgIGlmICh0YWJsZS5nZXRTaXplKCkgPCAweGZmZikge1xuICAgICAgICAgICAgICBpZiAodGFibGUuZ2V0U2l6ZSgpID09ICgxIDw8IGJpdExlbmd0aCkgKSB7XG4gICAgICAgICAgICAgICAgYml0TGVuZ3RoICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGFibGUuYWRkKHMgKyBjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMgPSBjO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJpdE91dC53cml0ZSh0YWJsZS5pbmRleE9mKHMpLCBiaXRMZW5ndGgpO1xuXG4gICAgICAgIC8vIGVuZCBjb2RlXG4gICAgICAgIGJpdE91dC53cml0ZShlbmRDb2RlLCBiaXRMZW5ndGgpO1xuXG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBiaXRPdXQuY2xvc2UoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJ5dGVPdXQudG9CeXRlQXJyYXkoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdyaXRlV29yZChvdXQgOiBPdXRwdXRTdHJlYW0sIGkgOiBudW1iZXIpIHtcbiAgICAgIG91dC53cml0ZUJ5dGUoaSAmIDB4ZmYpO1xuICAgICAgb3V0LndyaXRlQnl0ZSggKGkgPj4+IDgpICYgMHhmZik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3cml0ZUJ5dGVzKFxuICAgICAgb3V0IDogT3V0cHV0U3RyZWFtLFxuICAgICAgYnl0ZXMgOiBudW1iZXJbXSwgb2ZmIDogbnVtYmVyLCBsZW4gOiBudW1iZXJcbiAgICApIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgb3V0LndyaXRlQnl0ZShieXRlc1tpICsgb2ZmXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvRGF0YVVSTCgpIDogc3RyaW5nIHtcbiAgICAgIHZhciBib3V0ID0gbmV3IEJ5dGVBcnJheU91dHB1dFN0cmVhbSgpO1xuICAgICAgdGhpcy53cml0ZShib3V0KTtcbiAgICAgIGJvdXQuY2xvc2UoKTtcbiAgICAgIHZhciBzID0gJyc7XG4gICAgICB2YXIgYnl0ZXMgPSBCYXNlNjQuZW5jb2RlKGJvdXQudG9CeXRlQXJyYXkoKSApO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsJyArIHM7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgTFpXVGFibGUge1xuXG4gICAgcHJpdmF0ZSBtYXAgOiB7IFtrZXkgOiBzdHJpbmddIDogbnVtYmVyOyB9ID0ge307XG4gICAgcHJpdmF0ZSBzaXplIDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGQoa2V5IDogc3RyaW5nKSA6IHZvaWQge1xuICAgICAgaWYgKHRoaXMuY29udGFpbnMoa2V5KSApIHtcbiAgICAgICAgdGhyb3cgJ2R1cCBrZXk6JyArIGtleTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWFwW2tleV0gPSB0aGlzLnNpemU7XG4gICAgICB0aGlzLnNpemUgKz0gMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2l6ZSgpIDogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgcHVibGljIGluZGV4T2Yoa2V5IDogc3RyaW5nKSA6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBba2V5XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29udGFpbnMoa2V5IDogc3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLm1hcFtrZXldICE9ICd1bmRlZmluZWQnO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIEJpdE91dHB1dFN0cmVhbSB7XG5cbiAgICBwcml2YXRlIG91dCA6IE91dHB1dFN0cmVhbTtcbiAgICBwcml2YXRlIGJpdExlbmd0aCA6IG51bWJlcjtcbiAgICBwcml2YXRlIGJpdEJ1ZmZlciA6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKG91dCA6IE91dHB1dFN0cmVhbSkge1xuICAgICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgICB0aGlzLmJpdExlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlKGRhdGEgOiBudW1iZXIsIGxlbmd0aCA6IG51bWJlcikgOiB2b2lkIHtcblxuICAgICAgaWYgKCAoZGF0YSA+Pj4gbGVuZ3RoKSAhPSAwKSB7XG4gICAgICAgIHRocm93ICdsZW5ndGggb3Zlcic7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0aGlzLmJpdExlbmd0aCArIGxlbmd0aCA+PSA4KSB7XG4gICAgICAgIHRoaXMub3V0LndyaXRlQnl0ZSgweGZmICZcbiAgICAgICAgICAoIChkYXRhIDw8IHRoaXMuYml0TGVuZ3RoKSB8IHRoaXMuYml0QnVmZmVyKSApO1xuICAgICAgICBsZW5ndGggLT0gKDggLSB0aGlzLmJpdExlbmd0aCk7XG4gICAgICAgIGRhdGEgPj4+PSAoOCAtIHRoaXMuYml0TGVuZ3RoKTtcbiAgICAgICAgdGhpcy5iaXRCdWZmZXIgPSAwO1xuICAgICAgICB0aGlzLmJpdExlbmd0aCA9IDA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYml0QnVmZmVyID0gKGRhdGEgPDwgdGhpcy5iaXRMZW5ndGgpIHwgdGhpcy5iaXRCdWZmZXI7XG4gICAgICB0aGlzLmJpdExlbmd0aCA9IHRoaXMuYml0TGVuZ3RoICsgbGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBmbHVzaCgpIDogdm9pZCB7XG4gICAgICBpZiAodGhpcy5iaXRMZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMub3V0LndyaXRlQnl0ZSh0aGlzLmJpdEJ1ZmZlcik7XG4gICAgICB9XG4gICAgICB0aGlzLm91dC5mbHVzaCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpIDogdm9pZCB7XG4gICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICB0aGlzLm91dC5jbG9zZSgpO1xuICAgIH1cbiAgfVxufVxuIl19

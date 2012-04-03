//#target InDesign-7.0
//#include "./qrcode.js"

QRise = this.QRise = {};
QRise.OPT = {
  typeNumber	: -1,
  correctLevel	: QRErrorCorrectLevel.H
};

QRise.makeQRCodeData = function(txt,opt){
  var ret = [];
  var qrcode = new QRCode(opt.typeNumber, opt.correctLevel);
  qrcode.addData(txt);
  qrcode.make();

  for(var r=0; r<qrcode.getModuleCount(); r++){
    var row = [];
    for(var c=0; c<qrcode.getModuleCount(); c++){
      row.push(qrcode.isDark(r,c));
    }
    ret.push(row);
  }
  return ret;
}

QRise.createRects = function(page,y,x,d){
  var rect = null;
  if(d===true){
    rect = page.rectangles.add();     
    rect.geometricBounds = [y,x,y+1,x+1];
    rect.fillColor = "Black";
  }
  return rect;
}

QRise.makeQRCode = function(page,y,x,txt){
  var grp = [];
  var data = this.makeQRCodeData(txt, this.OPT);
  for(var i=0; i<data.length; i++){
    var d = data[i];
    var _y = y+(i*1);
    for(var j=0; j<d.length; j++){
      var _x = x+(j*1);
      var rc = this.createRects(page, _y, _x, d[j]);
      grp.push(rc);
    }
  }
  page.groups.add(grp);
};

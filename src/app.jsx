//= require qrcode
//= require QRise

// sample usage:
if(app.documents.length!==0){
  if(app.activeDocument.selection.length!==0){
    for(var i=0; i<app.activeDocument.selection.length; i++){
      var sel = app.activeDocument.selection[i];
      var bounds = sel.geometricBounds;
      var content = sel.contents;
      
      if(content!==""){
        // default: QRise.createRects
        // QRise.makeQRCode(app.activeDocument.pages[0], bounds[0], bounds[1], content);
        
        // use your own qrcode drawing function
        QRise.makeQRCode(app.activeDocument.pages[0], bounds[0], bounds[1], content, function(page,y,x,d){
          var ovl = null;
          if(d===true){
            ovl = page.ovals.add();     
            ovl.geometricBounds = [y,x,y+1,x+1];
            ovl.fillColor = "Black";
          }
          return ovl;
        });
        
        sel.remove();
      }else{
        alert("選択したオブジェクトに文字列がありません");
      }
    }
  }else{
    alert("なにか選択しておいてね");
  }
  
}else{
  alert("ドキュメントないよ");
  exit();
}
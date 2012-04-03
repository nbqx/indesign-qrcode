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
        QRise.makeQRCode(app.activeDocument.pages[0], bounds[0], bounds[1], content);
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
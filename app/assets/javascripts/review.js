$(function() {
  if($(".reviews-show").length == 0) return;

  var viewer2d;
  var viewer3d;
  var options = {
      env: 'AutodeskProduction',
      accessToken: authToken
  };
  var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2UtamF2YS1zYW1wbGUtYXBwLTdpdGw0a2dobmticGZhNjdzcTZxbGRla3d0dHJtYmR2L215LXNhbXBsdC5ydnQ';
  Autodesk.Viewing.Initializer(options, function onInitialized(){
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });

  /**
  * Autodesk.Viewing.Document.load() success callback.
  * Proceeds with model initialization.
  */
  function onDocumentLoadSuccess(doc) {
      window.d = doc;
      // A document contains references to 3D and 2D viewables.
      var viewables2d = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry', 'role': '2d'}, true);
      var viewables3d = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry', 'role': '3d'}, true);
      if (viewables2d.length === 0 || viewables3d === 0) {
          console.error('Document contains no viewables.');
          return;
      }

      // Choose any of the avialble viewables
      var initialViewable2d = viewables2d[0];
      var initialViewable3d = viewables3d[0];
      var svfUrl2d = doc.getViewablePath(initialViewable2d);
      var svfUrl3d = doc.getViewablePath(initialViewable3d);
      var modelOptions = {
          sharedPropertyDbPath: doc.getPropertyDbPath()
      };

      var viewerDiv2d = document.getElementById('Viewer2dDiv');
      var viewerDiv3d = document.getElementById('Viewer3dDiv');
      viewer2d = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv2d);
      viewer2d.start(svfUrl2d, modelOptions, onLoadModelSuccess, onLoadModelError);
      viewer3d = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv3d);
      viewer3d.start(svfUrl3d, modelOptions, onLoadModelSuccess, onLoadModelError);

      console.log(viewables2d);
      $.each(viewables2d, function(index, viewable) {
          $('#SheetPane').append('<li><a href="#" data-viewable="'+ index +'" class="sheet-link">'+ viewable["name"] +'</a></li>');
      });

      $('.sheet-link').on('click', function(e) {
        var sheetIdx = $(this).attr('data-viewable');
        var newSvfUrl = doc.getViewablePath(viewables2d[sheetIdx]);
        viewer2d.loadModel(newSvfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
        console.log('jeuy')
        e.preventDefault();
      });
  }

  /**
   * Autodesk.Viewing.Document.load() failuire callback.
   */
  function onDocumentLoadFailure(viewerErrorCode) {
      console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
  }

  /**
   * viewer.loadModel() success callback.
   * Invoked after the model's SVF has been initially loaded.
   * It may trigger before any geometry has been downloaded and displayed on-screen.
   */
  function onLoadModelSuccess(model) {
      console.log('onLoadModelSuccess()!');
      console.log(model);
  }

  /**
   * viewer.loadModel() failure callback.
   * Invoked when there's an error fetching the SVF file.
   */
  function onLoadModelError(viewerErrorCode) {
      console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
  }
});
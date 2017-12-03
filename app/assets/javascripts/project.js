window.loadView = function(urn, authToken, viewerId) {
  var viewer;
  var options = {
      env: 'AutodeskProduction',
      accessToken: authToken
  };
  var documentId = 'urn:' + urn;
  Autodesk.Viewing.Initializer(options, function onInitialized(){
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });

  /**
  * Autodesk.Viewing.Document.load() success callback.
  * Proceeds with model initialization.
  */
  function onDocumentLoadSuccess(doc) {

      // A document contains references to 3D and 2D viewables.
      var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry', 'role': '3d'}, true);
      if (viewables.length === 0) {
          console.error('Document contains no viewables.');
          return;
      }

      // Choose any of the avialble viewables
      var initialViewable = viewables[0];
      var svfUrl = doc.getViewablePath(initialViewable);
      var modelOptions = {
          sharedPropertyDbPath: doc.getPropertyDbPath()
      };

      var viewerDiv = document.getElementById(viewerId);
      viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
      viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
  }

  function onDocumentLoadFailure(viewerErrorCode) {
  }

  function onLoadModelSuccess(model) {
  }

  function onLoadModelError(viewerErrorCode) {
  }
};

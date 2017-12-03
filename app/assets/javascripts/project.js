$(function() {
  var modelA = "";
  var modelB = "";

  window.viewer = null;
  window.viewer2d = null;
  var lmvDoc;

  function launchViewer(urn) {
    var options = {
      env: 'AutodeskProduction',
      accessToken: authToken
    };
    var documentId = urn;
    if (viewer == null) {
      Autodesk.Viewing.Initializer(options, function onInitialized() {
        // Create Viewer instance and load model.
        var viewerDiv = document.getElementById('Viewer3dDiv');
        viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
        var errorCode = viewer.start();

        viewer2d = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('Viewer2dDiv'));
        viewer2d.start();

        // Check for initialization errors.
        if (errorCode) {
          console.error('viewer.start() error - errorCode:' + errorCode);
          return;
        }

        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
      });
    }
    else {
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    }
  }

  /**
   * Autodesk.Viewing.Document.load() success callback.
   * Proceeds with model initialization.
   */
  function onDocumentLoadSuccess(doc) {
    // A document contains references to 3D and 2D viewables.
    var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type': 'geometry', 'role': '3d'}, true);
    if (viewables.length === 0) {
      console.error('Document contains no viewables.');
      return;
    }

    var initialViewable = viewables[0];
    var svfUrl = doc.getViewablePath(initialViewable);
    var modelOptions = {
      sharedPropertyDbPath: doc.getPropertyDbPath()
    };
    viewer.loadModel(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);


    // A document contains references to 3D and 2D viewables.
    viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type': 'geometry', 'role': '2d'}, true);
    window.viewables2d = viewables;
    if (viewables.length === 0) {
      console.error('Document contains no viewables.');
      return;
    }

    initialViewable = viewables[2];
    svfUrl = doc.getViewablePath(initialViewable);
    modelOptions = {
      sharedPropertyDbPath: doc.getPropertyDbPath()
    };
    viewer2d.loadModel(svfUrl, modelOptions, onLoadModel2dSuccess, onLoadModelError);

    if(!window.loaded2d) {
      window.loaded2d = true;
      $.each(viewables, function(index, viewable) {
          $('#SheetPane').append('<a href="#" data-viewable="'+ index +'" class="sheet-link">'+ viewable["name"] +'</a>');
      });

      $('.sheet-link').on('click', function(e) {
        var sheetIdx = $(this).attr('data-viewable');
        var newSvfUrl = doc.getViewablePath(window.viewables2d[sheetIdx]);
        viewer2d.loadModel(newSvfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
        e.preventDefault();
      });
    }
  }

  /**
   * Autodesk.Viewing.Document.load() failuire callback.
   */
  function onDocumentLoadFailure(viewerErrorCode) {}

  /**
   * viewer.loadModel() success callback.
   * Invoked after the model's SVF has been initially loaded.
   * It may trigger before any geometry has been downloaded and displayed on-screen.
   */
  var models = [];
  function onLoadModelSuccess(model) {
    models.push(model);
    if (models.length==2)
      window.viewer.loadExtension('Autodesk.Forge.Samples.VersionChanges', {'modelA': models[0], 'modelB': models[1], 'viewer': window.viewer});
  }

  var models2d = [];
  function onLoadModel2dSuccess(model) {
    models2d.push(model);
    if (models2d.length==2)
      window.viewer2d.loadExtension('Autodesk.Forge.Samples.VersionChanges', {'modelA': models[0], 'modelB': models[1], 'viewer': window.viewer2d});
  }


  /**
   * viewer.loadModel() failure callback.
   * Invoked when there's an error fetching the SVF file.
   */
  function onLoadModelError(viewerErrorCode) {}

  launchViewer('urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2UtamF2YS1zYW1wbGUtYXBwLTdpdGw0a2dobmticGZhNjdzcTZxbGRla3d0dHJtYmR2L215LXNhbXBsdC5ydnQ');
  launchViewer("urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2UtamF2YS1zYW1wbGUtYXBwLTdpdGw0a2dobmticGZhNjdzcTZxbGRla3d0dHJtYmR2L215LXNhbXBsZS1vbGQucnZ0");

});

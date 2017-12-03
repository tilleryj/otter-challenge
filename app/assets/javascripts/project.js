window.loadProject = function(project, authToken) {
  if($(".project-show").length == 0) return;
  var viewer, viewer2d;

  var modelsLoading = 0;
  var models = [];
  var latestDocument;;
  function onDocumentLoad(doc, latest) {
    modelsLoading++;
    if (latest) { latestDocument = doc; }

    var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type': 'geometry', 'role': '3d'}, true);
    var svfUrl = doc.getViewablePath(viewables[0]);
    var changes = {
      added: {},
      removed: {},
      modified: {}
    };
    viewer.loadModel(svfUrl, { sharedPropertyDbPath: doc.getPropertyDbPath() }, function(model) {
      models.push(model);
      if (--modelsLoading > 0) { return; }

      viewer.loadExtension('Autodesk.Forge.Samples.VersionChanges', {
        'modelA': models[0], 
        'modelB': models[1], 
        'viewer': viewer, 
        'changes': changes
      });

      var viewables2d = Autodesk.Viewing.Document.getSubItemsWithProperties(latestDocument.getRootItem(), {'type': 'geometry', 'role': '2d'}, true);
      var svfUrl = latestDocument.getViewablePath(viewables2d[0]);
      var modelOptions = { sharedPropertyDbPath: latestDocument.getPropertyDbPath() };

      var highlightDiffs = function(model) {
        viewer2d.currentModel = model;
        viewer2d.changes = changes;
      };
      viewer2d.loadExtension('Autodesk.Forge.Samples.ColorizeChanges', {
        'viewer': viewer2d
      });

      viewer2d.loadModel(svfUrl, modelOptions, highlightDiffs);

      $.each(viewables2d, function(index, viewable) {
          $('#SheetPane').append('<li><a href="#" data-viewable="'+ index +'" class="sheet-link">'+ viewable["name"] +'</a></li>');
      });

      $('.sheet-link').on('click', function(e) {
        var sheetIdx = $(this).attr('data-viewable');
        var newSvfUrl = latestDocument.getViewablePath(viewables2d[sheetIdx]);
        viewer2d.impl.unloadCurrentModel();
        viewer2d.loadModel(newSvfUrl, modelOptions, highlightDiffs);
        e.preventDefault();
      });
    });
  }

  Autodesk.Viewing.Initializer({ env: 'AutodeskProduction', accessToken: authToken }, function onInitialized() {
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('Viewer3dDiv'));
    viewer.start();
    viewer2d = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('Viewer2dDiv'));
    viewer2d.start();

    Autodesk.Viewing.Document.load(project.versions[0].urn, function(doc) {
      onDocumentLoad(doc, true);
    });
    if (project.versions.length > 1) {
      Autodesk.Viewing.Document.load(project.versions[1].urn, onDocumentLoad);
    }
  });
};

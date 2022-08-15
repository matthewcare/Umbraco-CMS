angular.module("umbraco")
  .controller("Umbraco.Editors.ContentTypeContainers.RenameController",
    function ($scope, $injector, navigationService, notificationsService, localizationService) {
      var notificationHeader;

      function reportSuccessAndClose(treeName) {
        var lastComma = $scope.currentNode.path.lastIndexOf(","),
          path = lastComma === -1
            ? $scope.currentNode.path
            : $scope.currentNode.path.substring(0, lastComma - 1);

        navigationService.syncTree({
          tree: treeName,
          path: path,
          forceReload: true,
          activate: true
        });

        localizationService.localize(
          "renamecontainer_folderWasRenamed",
          [$scope.currentNode.name, $scope.model.folderName])
          .then(function (msg) {
            notificationsService.showNotification({
              type: 0,
              header: notificationHeader,
              message: msg
            });
          });

        navigationService.hideMenu();
      }

      localizationService.localize("renamecontainer_renamed")
        .then(function (s) { notificationHeader = s; });



      //'contentTypeResource', 'documentTypes'
      var resource = $injector.get('contentTypeResource');


      resource.getContainer($scope.currentNode.id).then(function (res) {
        console.log(res);
        $scope.model = {
          folderName: res.Name,
          aliasPrefix: res.AliasPrefix
        }
      });

      $scope.renameContainer = function (resourceKey, treeName) {
        var resource = $injector.get(resourceKey);

        resource.editContainer($scope.currentNode.id, $scope.model.folderName, $scope.model.aliasPrefix)
          .then(function () {
            reportSuccessAndClose(treeName);
          }, function (err) {
            $scope.error = err;
          });
      }
    }
  );

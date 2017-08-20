define('pagination', ['app', 'css!directives/pagination/style.css'], function (app) {
  app.directive('kPagination', function () {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        click: '&',
        total: '=',
        pages: '=',
        current: '='
      },
      templateUrl: 'directives/pagination/index.html',
      link: function (scope, elements, attrs) {
        var pages = [];
        scope.getPages = function () {
          pages.splice(0, pages.length);
          if (scope.pages < 9) {
            for (var i = 1; i < scope.pages; i++) {
              pages.push(i);
            }
          } else {
            pages.push(+scope.current);
            for (var i = 0; i < 9; i ++) {
              if (i % 2) {
                if (pages[0] > 1) {
                  pages.unshift(pages[0] - 1);
                } else if (pages[pages.length - 1] < scope.pages){
                  pages.push(pages[pages.length - 1] + 1);
                }
              } else {
                if (pages[pages.length - 1] < scope.pages) {
                  pages.push(pages[pages.length - 1] + 1);
                } else if (pages[0] > 1) {
                  pages.unshift(pages[0] - 1);
                }
              }
            }
          }
          return pages;
        }
      }
    }
  });
});
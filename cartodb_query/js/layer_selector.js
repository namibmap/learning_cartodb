      // create layer selector
      function createSelector(layer) {
        var sql = new cartodb.SQL({ user: 'namibmap' });

        var $options = $('#layer_selector li');
        $options.click(function(e) {
          // get the area of the selected layer
          var $li = $(e.target);
          var lic_type = $li.attr('data');

          // deselect all and select the clicked one
          $options.removeClass('selected');
          $li.addClass('selected');

          // create query based on data from the layer
          var query = "SELECT * FROM hydrocarbon_licences";

          if(lic_type !== 'all') {
            query = "SELECT * FROM hydrocarbon_licences where lic_type = '" + lic_type + "'";
          }

          // change the query in the layer to update the map
          layer.setSQL(query);
        });
      }

      function main() {
        cartodb.createVis('map', 'https://namibmap.cartodb.com/api/v2/viz/70737590-77f8-11e5-8145-0e3ff518bd15/viz.json', {
          tiles_loader: true,
          zoom: 5
        })
        .done(function(vis, layers) {
          // layer 0 is the base layer, layer 1 is cartodb layer
          var subLayer = layers[1].getSubLayer(0);
          createSelector(subLayer);
        })
        .error(function(err) {
          console.log(err);
        });
      }

      window.onload = main;
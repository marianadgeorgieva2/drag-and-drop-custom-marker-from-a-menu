$( document ).ready( function() {
	var markers = [], // an array containing all the markers added to the map
		markersCount = 0; // the number of the added markers

	var initMap = function () {
		// create a map in the "map" div, set the view to a given place and zoom
	    map = new L.Map( 'map', { zoomControl: false } ).setView( [ 42.7, 23.33 ], 15 );

	    // add a tile layer
	    L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    }).addTo( map );
	}

	// Dragging and dropping the markers to the map
	var addMarkers = function () {
		// The position of the marker icon
		var posTop = $( '.draggable-marker' ).css( 'top' ),
		posLeft = $( '.draggable-marker' ).css( 'left' );

		$( '.draggable-marker' ).draggable({
			stop: function ( e, ui ) {
				// returning the icon to the menu
				$( '.draggable-marker' ).css( 'top', posTop );
				$( '.draggable-marker' ).css( 'left', posLeft );

				var coordsX = event.clientX - 50, // 50 is the width of the menu
					coordsY = event.clientY + 20, // 20 is the half of markers height
					point = L.point( coordsX, coordsY ), // createing a Point object with the given x and y coordinates
					markerCoords = map.containerPointToLatLng( point ), // getting the geographical coordinates of the point

					// Creating a custom icon
					myIcon = L.icon({
						iconUrl: 'images/marker-icon.png', // the url of the img
						iconSize: [20, 40],
						iconAnchor: [10, 40] // the coordinates of the "tip" of the icon ( in this case must be ( icon width/ 2, icon height )
					});

				// Creating a new marker and adding it to the map
				markers[ markersCount ] = L.marker( [ markerCoords.lat, markerCoords.lng ], {
					draggable: true,
					icon: myIcon
				}).addTo( map );

				markersCount++;
			}
		});
	}

	initMap();
	addMarkers();
});
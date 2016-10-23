// Initial Array Data to be entered into observable Array
var places = [
    {
        name: "Green's",
        lat: 30.240521,
        lng: 75.850654,
        show: true,
        selected: false,
        id: "53f70b5a498e3179cfedb5b7",
        cat: "food"
    },
    {
        name: "LC",
        lat: 30.250387,
        lng: 75.836217,
        show: true,
        selected: false,
        id: "53df47bf498ec77445ee8cd9",
        cat: "food"
    },
    {
        name: "Dominos",
        lat: 30.256071,
        lng: 75.854212,
        show: true,
        selected: false,
        id: "549d4e64498e5892fb6e122d",
        cat: "food"
    },
    {
        name: "Fun Square",
        lat: 30.309328,
        lng: 75.838817,
        show: true,
        selected: false,
        id: "4e5a587d8877c8a76df148b3",
        cat: "fun"
    },
    {
        name: "Ranbir Club",
        lat: 30.244312,
        lng: 75.837644,
        show: true,
        selected: false,
        id: "4fa68c68e4b00f7195ef238e",
        cat: "fun"
    },
    {
        name: "Banasar Baag",
        lat: 30.244662,
        lng: 75.847947,
        show: true,
        selected: false,
        id: "517d4f68e4b0c2c020e8daeb",
        cat: "fun"
    },
    {
        name: "Civil Hospital",
        lat: 30.252076,
        lng: 75.836328,
        show: true,
        selected: false,
        id: "4cf390ae6195721ef4694dc1",
        cat: "medicine"
    },
    {
        name: "Garcha Clinic",
        lat: 30.256901,
        lng: 75.840913,
        show: true,
        selected: false,
        id: "4e5b20c1b99373257a004979",
        cat: "medicine"
    },
    {
        name: "Bansal Hospital",
        lat: 30.257225,
        lng: 75.839947,
        show: true,
        selected: false,
        id: "514a9748e4b0fa923c72ed56",
        cat: "medicine"
    }
];

var ViewModel = function(){
    var self = this;
    self.markerList = [];
    self.currentMarker;
    places.forEach(function(marker){
        self.markerList.push(new google.maps.Marker({
           position: {lat: marker.lat, lng: marker.lng},
           map: map,
           name: marker.name,
           selected: ko.observable(marker.selected),
           show: ko.observable(marker.show),
           animation: google.maps.Animation.DROP,
           venueid: marker.id,
           cat: marker.cat

         })
       );

     self.markerList[self.markerList.length-1].setVisible(marker.show);
    });
     self.markersListLength = self.markerList.length;
     self.errorDisplay = ko.observable("");


    self.animateMarker = function(marker){
        marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){ marker.setAnimation(null); }, 900);
    };

    // Calling FourSquare API to add additional info to the marker
    self.addInfo = function(marker){
        $.ajax({
	            url: "https://api.foursquare.com/v2/venues/" + marker.venueid + '?client_id=UY0K32WCJ503LQBYW5TIWTREYRRXLSEY1QVEVHTC23PZQJZS&client_secret=2Y5SYABWWQU0HECCZSXMKY3MV5GUMDURHKSXMEAC5CNOLKII&v=20160619',
	            dataType: "json",
	            success: function (data) {
	                var result = data.response.venue;

	                marker.likes = result.hasOwnProperty('likes') ? result.likes.summary : "";
	                marker.rating = result.hasOwnProperty('rating') ? result.rating : "";
	            },
	            error: function (e) {
	            	self.errorDisplay("Foursquare data is unavailable. Please try again later.");
	            }
        });

    };
    // Loop to add the foursquare ratings and likes to the marker
    for(var i=0; i < self.markersListLength; i++){
      (function(marker) {
          self.addInfo(marker);
          marker.addListener('click', function(){
				self.setSelected(marker);
			});

      })(self.markerList[i])
    };
    // varable for search text
    self.searchText = ko.observable("");
    // function to perform the search
    self.search = function(){
        markerInfo.close();
        var text = self.searchText();
        if(text.length === 0){
            self.showAll(true);
        }
        else{
            for(var i = 0; i < self.markersListLength; i++){
                if(self.markerList[i].name.toLowerCase().indexOf(text.toLowerCase()) > -1 ){
                    self.markerList[i].setVisible(true);
                    self.markerList[i].show(true);
                }
                else{
                    self.markerList[i].setVisible(false);
                    self.markerList[i].show(false);
                }
            }
        }
        markerInfo.close();

    };
    // function to make all the markers visible
    self.showAll = function(showStatus){
        for(var i = 0; i < self.markersListLength; i++){
            self.markerList[i].setVisible(showStatus);
            self.markerList[i].show(showStatus);
        }
    };
    // function to make all the markers unselected.
    self.unselectAll = function(){
        for(var i = 0; i < self.markersListLength; i++){
            self.markerList[i].selected(false);
        }
    };
    // function to make a particular marker selected, open its info window and show its rating obtainted from foursquare.
    self.setSelected = function(location) {
		self.unselectAll();
        location.selected(true);

        self.currentMarker = location;

        formatLikes = function() {
        	if (self.currentMarker.likes === "" || self.currentMarker.likes === undefined) {
        		return "No likes";
        	} else {
        		return self.currentMarker.likes;
        	}
        };

        formatRating = function() {
        	if (self.currentMarker.rating === "" || self.currentMarker.rating === undefined) {
        		return "No rating";
        	} else {
        		return "Rating: " + self.currentMarker.rating + "/10";
        	}
        };

        var formatMarkerInfo = "<h5>" + self.currentMarker.name + "</h5>" + "<div>" + formatLikes() + "</div>" + "<div>" + formatRating() + "</div>";

		markerInfo.setContent(formatMarkerInfo);

        markerInfo.open(map, location);
        self.animateMarker(location);
	};


};
// Setting for responsive experience
var width = $(window).width();
if( width <= 1000){
    $(".mob-justified").removeClass("btn-group-justified");
}

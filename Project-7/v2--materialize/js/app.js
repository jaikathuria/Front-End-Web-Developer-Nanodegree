$(".button-collapse").sideNav();
//--------------------------------------
var map,markerInfo;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 30.337663, lng: 76.394095},
  zoom: 15
});
markerInfo = new google.maps.InfoWindow();
ko.applyBindings(new displayMarker());
}
function googleError(){
    document.getElementById('map').innerHTML = "Map didnt Worked!"
}
var locations = [
    {
        name: "Omaxe",
        lat: 30.337663, 
        lng: 76.394095,
        selected: false,
        visibility: true,
        fsid: "4ca73b2a931bb60c17e29ae2"
    },
    {
        name: "Gopal Sweets",
        lat: 30.330436,
        lng: 76.389943,
        selected: false,
        visibility: true,
        fsid: "4e6378501495676d562c0c60"
    },
    {
        name: "Jaggi Sweets",
        lat: 30.326588,
        lng: 76.399094,
        selected: false,
        visibility: true,
        fsid: "4e9189eb8231d8feae694cc2"
    },
    {
        name: "22 No Fatak",
        lat: 30.339781,
        lng: 76.38688,
        selected: false,
        visibility: true,
        fsid: "4e171c5ec65be9c55e8b6c76"
    },
    {
        name: "KFC",
        lat:  30.335206,
        lng:  76.385134,
        selected: false,
        visibility: true,
        fsid: "4ef74302f9ab2e6681df337d"
    }
];

function displayMarker(){
    var self = this;
    self.errorMessage = ko.observable();
    self.searchText = ko.observable();
    self.markers = [];
    locations.forEach(function(place){
        self.markers.push(new google.maps.Marker({
            position: {lat: place.lat,lng: place.lng},
            map: map,
            name: place.name,
            animation: google.maps.Animation.DROP,
            selected: ko.observable(place.selected),
            show: ko.observable(place.visibility),
            foursquareid: place.fsid
        })
      );
        self.markers[self.markers.length-1].setVisible(self.markers[self.markers.length-1].show());
   });
      
    self.addMarkerInfo = function(marker){
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/" + marker.foursquareid + '?client_id=0ZLAAGGJ3SUXHBBPQ0XHDUE0AI5DAUHYHZPFAOQFEKE3WSSL&client_secret=DTANRQV2YY4KAM0UPZ50VILWPBVTXJZLMJNJYCOKWNECMB14&v=20161016',
            dataType: "json",
            success: function( response ){
                result = response.response.venue;
                if(result.hasOwnProperty('rating')){
                    marker.rating = result.rating
                }
                else{
                    marker.rating = "Error in fetching rating!"
                }
            },
            error: function( e ){
                self.errorMessage("FourSquare is unable to send data !!")
            }
            
        });
            
    };
    for(var i = 0;i<self.markers.length;i++){
        console.log(i);
        (function(marker){
            self.addMarkerInfo(marker);
            marker.addListener('click',function(){
               self.setSelected(marker)
            });
        })(self.markers[i]);
    }
    self.animateMarker = function(marker){
        marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){ marker.setAnimation(null); }, 900);
    };
    self.search = function(){
        markerInfo.close();
        var text = self.searchText();
        if(text.length === 0){
            self.showAll(true);
        }
        else{
            for(var i = 0; i < self.markers.length; i++){
                if(self.markers[i].name.toLowerCase().indexOf(text.toLowerCase()) > -1 ){
                    self.markers[i].setVisible(true);
                    self.markers[i].show(true);
                }
                else{
                    self.markers[i].setVisible(false);
                    self.markers[i].show(false);
                }
            }
        }
        markerInfo.close();  
    };
    self.showAll = function(show){
        for(var i = 0; i < self.markers.length; i++){
            self.markers[i].setVisible(show);
            self.markers[i].show(show);
        }
    };
    self.unselectAll = function(){
        for(var i = 0; i < self.markers.length; i++){
            self.markers[i].selected(false);
        }
    };
    self.setSelected = function(marker) {
		self.unselectAll();
        marker.selected(true);
        self.currentMarker = marker;
        format_rating = function() {
        	if (self.currentMarker.rating === "" || self.currentMarker.rating === undefined) {
        		return "No rating";
        	} else {
        		return "Rating: " + self.currentMarker.rating + "/10";
        	}
        };

        var format_marker_info = "<h5>" + self.currentMarker.name + "</h5>" + "<div>" + format_rating() + "</div>";

		markerInfo.setContent(format_marker_info);

        markerInfo.open(map, marker);
        self.animateMarker(marker);
	};
}
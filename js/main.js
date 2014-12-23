

var ww = document.body.clientWidth;

$(document).ready(function() {
	$(".nav li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("parent");
		};
	})
	
	$(".toggleMenu").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".nav").toggle();
	});
	adjustMenu();
	parseDataFromJsonFile();
})

$(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	adjustMenu();
});

var adjustMenu = function() {
	if (ww < 768) {
		$(".toggleMenu").css("display", "inline-block");
		if (!$(".toggleMenu").hasClass("active")) {
			$(".nav").hide();
		} else {
			$(".nav").show();
		}
		$(".nav li").unbind('mouseenter mouseleave');
		$(".nav li a.parent").unbind('click').bind('click', function(e) {
			// must be attached to anchor element to prevent bubbling
			e.preventDefault();
			$(this).parent("li").toggleClass("hover");
		});
	} 
	else if (ww >= 768) {
		$(".toggleMenu").css("display", "none");
		$(".nav").show();
		$(".nav li").removeClass("hover");
		$(".nav li a").unbind('click');
		$(".nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	$(this).toggleClass('hover');
		});
	}
}

function parseDataFromJsonFile() {	
    $.ajax({
      url: "https://api.forecast.io/forecast/35dedcc43de09617fdd79cdf0de8451b/45.348391,-75.757045?units=ca",
	  dataType: "jsonp",
	  crossDomain:true,
      xhrFields: {
      	withCredentials: true
      }
	}).done( function( weatherData ) {
		displayDataFromJsonFile( weatherData );
	  })
}

function displayDataFromJsonFile( weatherData ) {
	var daySummary;
	var dayIcon;
	var currentTime;
	var currentDate;
	var currentHour;
	var hourTimeHour;
	var hourSummary;
	var hourIcon;
	var hourTemperature;
	var hourHumidity;
	var hourWindSpeed;
	var hourCloudCover; 
	var htmltop = "";
	
	daySummary = weatherData.hourly.summary;
	dayIcon = weatherData.hourly.data[0].icon;
	dateStamp = new Date(weatherData.currently.time * 1000);
	currentDate = (dateStamp.getMonth() + 1) + '/' + dateStamp.getDate() + '/' + dateStamp.getFullYear();
	currentHour = dateStamp.getHours();
	currentTemp = (weatherData.hourly.data[0].temperature).toFixed(0);

	htmltop += '<div class="top-part">';
	htmltop += '		<div class="main-content">';
	htmltop += '			<div class="col-container">';
	htmltop += ' 			<div class="col-2">';
	htmltop += '					<div id="daySummaryIcon" class="' + dayIcon + '"></div>';					
	htmltop += '				</div>';
	htmltop += ' 			<div class="col-2">';
	htmltop += '					<div id="daySummaryDate">';
	htmltop += '						<p>' + currentDate + '</p>';
	htmltop += '					</div>';
	htmltop += '					<div id="dayCurrentTemp">';
	htmltop += '						<p>' + currentTemp + '&deg;</p>';
	htmltop += '					</div>';
	htmltop += '				</div>';
	htmltop += '			</div>';
	htmltop += '			<div class="col-footer">';
	htmltop += '				<div id="daySummary">';
	htmltop += '					<p>' + daySummary + '</p>';
	htmltop += '					<ul><li>Temp. &deg;C</li><li>Location: Algonquin College</li></ul>';
	htmltop += '			</div>';
	htmltop += '		</div>';
	htmltop += '</div>';
	//htmltop += '<div class="bottom-part">';
	//htmltop += '		<div class="lower-content">';
	//htmltop += '			<ul><li>Temp. &deg;C</li><li>Location: Algonquin College</li>';
	//htmltop += '		</div>';
	//htmltop += '</div>';
	
	
	$(".weather-forecast").append(htmltop);
}







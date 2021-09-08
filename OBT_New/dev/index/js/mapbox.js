function Mapbox() {
    this.container = 'mapboxMap'
    this.__mapboxSelectBtnActive = function (longitude, latitude, placeName) {
        $('.mapbox-ctrl-selectBtn-custom').addClass('active').attr('longitude', longitude).attr('latitude', latitude).attr('placeName', placeName);
    }
    this.__mapboxSelectBtnInactive = function () {
        $('.mapbox-ctrl-selectBtn-custom').removeClass('active').removeAttr('longitude').removeAttr('latitude').attr('placeName');
    }
    this.__mapboxClose = function () {
        $('#' + this.container).empty();
        $('#' + this.container).hide();
    }
    this.__setMapLocation = function () {
        var longitude = $('.mapbox-ctrl-selectBtn-custom').attr('longitude');
        var latitude = $('.mapbox-ctrl-selectBtn-custom').attr('latitude');
        var placeName = $('.mapbox-ctrl-selectBtn-custom').attr('placeName');
        if (longitude && latitude && placeName) {

            $('#hotelAddress').attr('longitude', longitude);
            $('#hotelAddress').attr('latitude', latitude);
            $('#hotelAddress').val(placeName);
        }
    }
    this.initMapBox = function (options) {
        this.container = options.container || 'mapboxMap'
        //中文文档：https://www.mapbox.cn/mapbox-gl-js/api/#map#removecontrol
        var longitude, latitude, that = this;
        var centerLng = parseFloat(options.centerLng);
        var centerLat = parseFloat(options.centerLat);
        var minX = centerLng - 0.5;
        var minY = centerLat - 0.5;
        var maxX = centerLng + 0.5;
        var maxY = centerLat + 0.5;
        var zoom = options.zoom || 12
        console.log(minX, minY, maxX, maxY)
        mapboxgl.accessToken =
            "pk.eyJ1IjoicmF5bW9uZGppYW5nIiwiYSI6ImNrbnF2NDF5bzA5dDAyd283d2lqZWtrMDcifQ.IO_SHBICUatb4wCvsk21jw";
        var map = new mapboxgl.Map({
            container: this.container,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [centerLng, centerLat],
            zoom: zoom,
        });
        map.dragRotate.disable();
        var geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            language: obtLanguage,
            // localGeocoder: coordinatesGeocoder, //搜经纬度
            // countries: "hk", //限制城市
            bbox: [minX, minY, maxX, maxY], //限制搜索边界
            zoom: 12, //地图缩放比例
            placeholder: "Please input location",    //搜索框内容
            mapboxgl: mapboxgl
        });
        map.addControl(geocoder, 'top-left');
        if ($('#hotelAddress').val()) {
            $('.mapboxgl-ctrl-geocoder--input').val($('#hotelAddress').val())
        }
        if (options.defaultMarker) {
            var marker = new mapboxgl.Marker()
                .setLngLat([centerLng, centerLat])
                .addTo(map);

        }
        if (options.addPoint) {
            options.addPoint.map(function (item) {
                var el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage = 'url(../index/images/icon-location.svg)'
                el.style.backgroundSize = '30px 60px'
                el.style.width = '30px'
                el.style.height = '60px'
                console.log(item)
                var popUp = new mapboxgl.Popup({ offset: [0, -15] })
                    .setHTML('<h3>' + item.HotelName + '</h3><p>' + item.HotelAddress
                        + ' <button class="mapboxViewDetailBtn" hotelId="'+item.ID+'" cityCode="'+item.CityCode+'" HotelType="'+item.HotelType+'" LocationType="'+item.LocationType+'">View Details</button></p>')
                new mapboxgl.Marker(el)
                    .setLngLat([parseFloat(item.Longitude), parseFloat(item.Laitude)])
                    .setPopup(popUp)
                    .addTo(map);
            })
        }
        map.on("load", function () {
            // Listen for the `result` event from the Geocoder
            // `result` event is triggered when a user makes a selection
            //  Add a marker at the result's coordinates
            geocoder.on("result", function (e) {    //搜索结果点击事件
                // https://docs.mapbox.com/help/tutorials/local-search-geocoding-api/?size=n_10_n
                console.log(e);
                longitude = e.result.geometry.coordinates[0]
                latitude = e.result.geometry.coordinates[1]
                placeName = e.result['place_name_' + obtLanguage];
                that.__mapboxSelectBtnActive(longitude, latitude, placeName);
            });
        });
        if ($('.mapbox-ctrl-selectBtn-custom').length == 0) {
            $('.mapboxgl-ctrl-top-left').append('\
                <div class="mapboxgl-ctrl mapbox-ctrl-selectBtn-custom">Select this location</div>\
                <div class="mapboxgl-ctrl mapbox-ctrl-cancelBtn-custom active">Cancel</div>\
            ');
        }
        if (options.hideSearchBar) {
            $('.mapboxgl-ctrl-top-left').hide()
        }
        $('.mapboxgl-ctrl-geocoder--icon-close').on('click', function () {
            that.__mapboxSelectBtnInactive();
        })
        $('.mapbox-ctrl-cancelBtn-custom').on('click', function () {
            that.__mapboxClose();
        })
        $('.mapboxgl-ctrl-geocoder--input').bind('input propertychange', function () {
            if (!$(this).val()) {
                that.__mapboxSelectBtnInactive();
            }
        })
        $('.mapbox-ctrl-selectBtn-custom').on('click', function () {
            if ($(this).hasClass('active')) {
                that.__setMapLocation();
                that.__mapboxClose();
            }
        })
    }
}
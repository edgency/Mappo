/*
 *  This module provides a list of public tile providers.
 *  It is based on and adapted from https://github.com/seelmann/leaflet-providers
 */

Cat.define('map-providers', function(context) {
		var baseLayers = {
				// 'OpenStreetMap Default': osm,
				'OpenStreetMap German Style': L.tileLayer.provider('OpenStreetMap.DE'),
				'OpenStreetMap Black and White': L.tileLayer.provider('OpenStreetMap.BlackAndWhite'),
				'Thunderforest OpenCycleMap': L.tileLayer.provider('Thunderforest.OpenCycleMap'),
				'Thunderforest Transport': L.tileLayer.provider('Thunderforest.Transport'),
				'Thunderforest Landscape': L.tileLayer.provider('Thunderforest.Landscape'),
				'MapQuest OSM': L.tileLayer.provider('MapQuestOpen.OSM'),
				'MapQuest Aerial': L.tileLayer.provider('MapQuestOpen.Aerial'),
				'MapBox Example': L.tileLayer.provider('MapBox.examples.map-zr0njcqy'),
				'Stamen Toner': L.tileLayer.provider('Stamen.Toner'),
				'Stamen Terrain': L.tileLayer.provider('Stamen.Terrain'),
				'Stamen Watercolor': L.tileLayer.provider('Stamen.Watercolor'),
				'Esri WorldStreetMap': L.tileLayer.provider('Esri.WorldStreetMap'),
				'Esri DeLorme': L.tileLayer.provider('Esri.DeLorme'),
				'Esri WorldTopoMap': L.tileLayer.provider('Esri.WorldTopoMap'),
				'Esri WorldImagery': L.tileLayer.provider('Esri.WorldImagery'),
				'Esri WorldTerrain': L.tileLayer.provider('Esri.WorldTerrain'),
				'Esri WorldShadedRelief': L.tileLayer.provider('Esri.WorldShadedRelief'),
				// uncomment these lines if your screen is really large
			//	'Esri WorldPhysical': L.tileLayer.provider('Esri.WorldPhysical'),
			//	'Esri OceanBasemap': L.tileLayer.provider('Esri.OceanBasemap'),
			//	'Esri NatGeoWorldMap': L.tileLayer.provider('Esri.NatGeoWorldMap'),
			//	'Esri WorldGrayCanvas': L.tileLayer.provider('Esri.WorldGrayCanvas'),
				'Nokia Normal Day': L.tileLayer.provider('Nokia.normalDay'),
			//	'Nokia Normal Day Grey': L.tileLayer.provider('Nokia.normalGreyDay'),
			//	'Nokia Satellite': L.tileLayer.provider('Nokia.satelliteNoLabelsDay'),
			//	'Nokia Satellite (Labeled)': L.tileLayer.provider('Nokia.satelliteYesLabelsDay'),
				'Nokia Terrain': L.tileLayer.provider('Nokia.terrainDay'),
				'Acetate': L.tileLayer.provider('Acetate')
			};

			var overlayLayers = {
				'OpenSeaMap': L.tileLayer.provider('OpenSeaMap'),
				'OpenWeatherMap Clouds': L.tileLayer.provider('OpenWeatherMap.Clouds'),
				'OpenWeatherMap CloudsClassic': L.tileLayer.provider('OpenWeatherMap.CloudsClassic'),
				'OpenWeatherMap Precipitation': L.tileLayer.provider('OpenWeatherMap.Precipitation'),
				// uncomment these lines if your screen is really large
				//'OpenWeatherMap PrecipitationClassic': L.tileLayer.provider('OpenWeatherMap.PrecipitationClassic'),
				//'OpenWeatherMap Rain': L.tileLayer.provider('OpenWeatherMap.Rain'),
				//'OpenWeatherMap RainClassic': L.tileLayer.provider('OpenWeatherMap.RainClassic'),
				//'OpenWeatherMap Pressure': L.tileLayer.provider('OpenWeatherMap.Pressure'),
				//'OpenWeatherMap PressureContour': L.tileLayer.provider('OpenWeatherMap.PressureContour'),
				//'OpenWeatherMap Wind': L.tileLayer.provider('OpenWeatherMap.Wind'),
				//'OpenWeatherMap Temperature': L.tileLayer.provider('OpenWeatherMap.Temperature'),
				'OpenWeatherMap Snow': L.tileLayer.provider('OpenWeatherMap.Snow')
			};


		return {
			ready: function(map) {
				map.addLayer(L.tileLayer.provider('OpenStreetMap.DE'));
				/* map.addControl(new L.Control.Layers(baseLayers, '', {
					collapsed: true
				}));*/
			}
		};
	});
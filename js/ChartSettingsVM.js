ChartSettingsVM = Class.extend({

	timePeriods: ['1d','5d','10d','1m','2m','3m','6m','1y','2y','5y','max'],
	defaultTimePeriod: '2m',

	scales: [ 'Log', 'Lin' ],
	chartType: 'candle',

	init: function(conf) {
		this.onChange = conf.onChange;
		this.timePeriod = ko.observable(this.defaultTimePeriod);
		this.scale = ko.observable('');
		this.chartProvider = ko.observable(new ChartProvider.BigCharts());
		this.chartProviders = [
			this.chartProvider(),
			new ChartProvider.Yahoo()
		];
	},

	buildChartLink: function(index, size) {
		return this.chartProvider().getChartUrl({
			index: index,
			timeParam: this.timePeriod(),
			chartType: this.chartType,
			scale: this.scale(),
			size: size
		});

	},

	onChartSpecChanged: function() {
		this.onChange.apply();
	}


});


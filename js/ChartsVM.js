var ChartsVM = Class.extend({

	init: function(conf) {

		this.charts = ko.observableArray();
		this.largeChart = ko.observable();
		this.largeChartSettings = ko.observable();

		this.chartSettings = new ChartSettingsVM({
			onChange: this.onChartSpecChanged.bind(this)
		});

		this.boundOnCloseChartClick = this.onCloseChartClick.bind(this);

		this.buildCharts();
	},

	onChartSpecChanged: function() {
		this.buildCharts();
	},

	buildChartLink: function(index, size) {
		return this.chartSettings.buildChartLink(index, size);
	},

	buildCharts: function() {
		this.charts.removeAll();
		var size = 'small';

		_.each(this.chartSettings.chartProvider().indices, function(index) {
			var link = this.buildChartLink(index);
			this.charts.push(new ChartVM(link, index, size, this.chartSettings));
		}, this);

	},

	onCloseChartClick: function(chartVM) {
		this.largeChart(false);
	},

	onLargeChartSettingsChanged: function(chartVM) {

	},


});


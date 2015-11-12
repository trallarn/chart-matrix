/**
 * A chart.
 */
ChartVM = Class.extend({

	init: function(link, indexDO, size, chartSettings) {
		this.chartSettings = chartSettings;
		this.link = ko.observable(link);
		this.indexDO = indexDO;
		this.index = this.getSymbol();
		this.name = indexDO.name || indexDO;
		this.isLoading = ko.observable(false);
		this.size = ko.observable(size);
	},

	getSymbol: function() {
		return this.indexDO.symbol || this.indexDO;
	},

	updateLink: function(link) {
		this.link(link);
		this.isLoading(true);
		setTimeout(function() {
			this.isLoading(false);
		}.bind(this), 100);
	},

	onChartClicked: function() {
		this.updateLink(this.chartSettings.buildChartLink(this.getSymbol(), this.size()));
	},

	openExternalChart: function(chartVM){
		var url = this.chartSettings.chartProvider().getExternalUrl(_.extend({
			chartType: this.chartSettings.chartType,
			timeParam: this.chartSettings.timePeriod()
		}, chartVM));

		window.open(url, '_blank'); 
	},


});


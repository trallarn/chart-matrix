LargeChartControlVM = Class.extend({

	size: 'large',

	init: function(chartVM) {

		this.chartSettings = new ChartSettingsVM({
			onChange: this.onChartSettingsChanged.bind(this)
		});

		var link = chartVM.chartSettings.buildChartLink(chartVM.getSymbol(), this.size);
		this.chartVM = new ChartVM(link, chartVM.getSymbol(), this.size, this.chartSettings);

	},

	onChartSettingsChanged: function() {
		var link = this.chartVM.chartSettings.buildChartLink(this.chartVM.getSymbol(), this.size);
		this.chartVM.link(link);
	}

});

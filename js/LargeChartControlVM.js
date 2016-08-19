LargeChartControlVM = Class.extend({

	size: 'large',

	init: function(chartVM) {

		this.chartSettings = new ChartSettingsVM({
			onChange: this.onChartSettingsChanged.bind(this)
		});

		var link = chartVM.chartSettings.buildChartLink(chartVM.indexDO, this.size);
		this.chartVM = new ChartVM(link, chartVM.indexDO, this.size, this.chartSettings);

	},

	onChartSettingsChanged: function() {
		var link = this.chartVM.chartSettings.buildChartLink(this.chartVM.indexDO, this.size);
		this.chartVM.link(link);
	}

});

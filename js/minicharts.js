Minicharts = Class.extend({

	init: function(container) {

		this.chartsControl = ko.observable(new ChartsVM());

		this.largeChartControl = ko.observable();

		this.boundOnLargeChartClick = this.onLargeChartClick.bind(this);
		this.boundOnCloseChartClick = this.onCloseChart.bind(this);

		ko.applyBindings(this, container);

	},

	onLargeChartClick: function(chartVM) {
		this.largeChartControl(new LargeChartControlVM(chartVM));
	},

	onCloseChart: function(chartVM) {
		if (chartVM.size() === 'large') {
			this.largeChartControl(false);
		}
	}

});

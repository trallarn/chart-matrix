ChartProvider = Class.extend({

	getSymbol: function(index) {
		return index.symbol || index;
	}

});

ChartProvider.BigCharts = ChartProvider.extend({
	name: 'BigCharts',

	chartTypeMap: {
		candle: 4
	},

	indices: [
		'SE:OMXSPI',
		'XX:OMXS30',
        'DJIA',
		{symbol:'SPX',name:'S&P 500'},
		{symbol:'COMP',name:'Nasdaq'},
		'USDSEK',
        {symbol: 'UK:BRENT CRUDE', name:'Brent oil'},
		'DX:DAX',
		{symbol: 'FR:PX1',name:'France'},
		{symbol: 'UK:UKX',name:'FTSE 100'},
		{symbol: 'CH:SMI', name: 'Switzerland'},
		{symbol: 'HK:HSI', name: 'Hang Seng'},
		{symbol: 'CN:SHCOMP', name: 'Shanghai'},
		{symbol: 'IN:1', name: 'BSE Sensex' },
		'JP:NIK',
		{symbol: 'BR:BVSP', name: 'Sao-Paolo'},
		{symbol: 'AR:MERV', name: 'Buenos Aires'},
		{symbol: 'NO:OSEAX', name: 'Oslo'},
		{symbol: 'XX:TWII', name: 'Taiwan'}
	],

	getFrequency: function(timeParam) {
		var tp = timeParam;
		var p = timeParam[timeParam.length-1];
		return timeParam === 'max' ? 3
			: tp === '1d' ? 7
				: p === 'd' ? 8
					: p === 'm' ? 1
						: tp === '2y' || tp === '1y' ? 2
							: p === 'y' ? 3
								: 1; 
	},

	times: {
		'1d': 1,
		'5d': 3,
		'10d': 18,
		'1m': 4,
		'2m': 5,
		'3m': 6,
		'6m': 7,
		'1y': 8,
		'2y': 9,
		'5y': 12,
		'max': 20
	},

	getSize: function(size) {
		return size === 'large' ? 4
		    : size === 'medium' ? 3
				: 1;
	},

	getChartUrl: function(settings) {

		var linkTemplate = _.template('http://bigcharts.marketwatch.com/kaavio.Webhost/charts/big.chart?symb=<%= index %>&uf=0&type=<%= chartType %>&size=<%= size %>&style=350&freq=<%= timeFrequency %>&time=<%= timePeriod %>&ma=0&maval=200&lf=5&lf2=0&lf3=0&mocktick=1&random=<%= rand %>');

		var chartType = uo.defaultFirst(settings.chartType, this.chartTypeMap);

		return linkTemplate({
			index: this.getSymbol(settings.index),
			timeFrequency: this.getFrequency(settings.timeParam), 
			timePeriod: uo.defaultFirst(settings.timeParam, this.times),
			chartType: chartType,
			scale: settings.scale,
			size: this.getSize(settings.size),
			rand: ut.now() 
		});

	},

	getExternalUrl: function(settings) {
		var targetTemplate = _.template('http://bigcharts.marketwatch.com/advchart/frames/frames.asp?show=&insttype=Index&symb=<%= index %>&time=8&freq=1&compidx=aaaaa%3A0&comptemptext=&comp=none&ma=0&maval=200&uf=0&lf=1&lf2=0&lf3=0&type=4&style=350&size=4&x=52&y=5&timeFrameToggle=false&compareToToggle=false&indicatorsToggle=false&chartStyleToggle=false&state=11');
		return targetTemplate(settings);
	}
});

ChartProvider.Yahoo = ChartProvider.extend({
	name: 'Yahoo',

	chartTypeMap: {
		candle: 'c'
	},

	indices: [
		'^OMXSPI',
		'^IXIC',
		'^GSPC',
		'^GDAXI',
		'^FTSE',
		{symbol: '000001.SS', name: 'Shanghai'},
		{symbol: '^HSI', name: 'Hang Seng'},
		'^BSESN',
		'^N225',
		'^NZ50',
		{symbol: '^TWII', name: 'Taiwan'},
		'^BVSP',
		'^MERV',
		'^OSEAX',
		'^SSMI',
		'^ATX'
	],

	getChartUrl: function(settings) {

		var linkTemplate = _.template('https://chart.finance.yahoo.com/z?s=<%= index %>&t=<%= timeParam %>&q=<%= chartType %>&l=<%= scale %>&z=l&a=v&p=s&lang=en-IN&region=IN&width=400');

		return linkTemplate({
			index: this.getSymbol(settings.index),
			timeParam: settings.timeParam,
			chartType: settings.chartType,
			scale: this.getScaleValue(settings.scale)
		});

	},

	getExternalUrl: function(settings) {
		var targetTemplate = _.template('https://in.finance.yahoo.com/q/bc?s=<%= index %>&t=<%= timeParam %>&l=on&z=l&q=<%= chartType %>&c=');
		return targetTemplate(settings);
	},

	getScaleValue: function(scale) {
		return scale === 'Log' ? '' : 'off';
	}
});

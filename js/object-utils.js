/**
 * Object utils.
 */
uo = {
	defaultFirst: function(key, map) {
		return map[key] || _.values(map)[0];
	}
};

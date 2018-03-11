const url = require('url');

function calcRate(req, res) {
    var requestUrl = url.parse(req.url, true);

	console.log('Query parameters: ' +
				 JSON.stringify(requestUrl.query) + ' ' +
				 JSON.stringify(requestUrl.pathname));

    var weight = Number(requestUrl.query.weight);
    console.log('Weight: ' + String(weight));
    var p_t = requestUrl.query.pack_type;

    if (weight != null && p_t != null) {
        compute(res, weight, p_t, requestUrl);
    }
}

function computeLetS (weight, cost) {
    if (weight < 1) {
        cost = 0.50;
    } else if (weight < 2) {
        cost = 0.71;
    } else if (weight < 3) {
        cost = 0.92;
    } else if (weight < 3.5) {
        cost = 1.13;
    } else {
        cost = computeFlats(weight, cost);
    }
    return cost;
}

function computeLetM (weight, cost) {
    if (weight < 1) {
        cost = 0.47;  
    } else if (weight < 2) {
        cost = 0.68;
    } else if (weight < 3) {
        cost = 0.89;
    } else if (weight < 3.5) {
        cost = 1.10;
    } else {
        cost = computeFlats(weight, cost);
    }
    return cost;
}

function computeFlats (weight, cost) {
    if (weight < 1) {
        cost = 1.00;  
    } else if (weight < 2) {
        cost = 1.21;
    } else if (weight < 3) {
        cost = 1.42;
    } else if (weight < 4) {
        cost = 1.63;
    } else if (weight < 5) {
        cost = 1.84;
    } else if (weight < 6) {
        cost = 2.05;
    } else if (weight < 7) {
        cost = 2.26;
    } else if (weight < 8) {
        cost = 2.47;
    } else if (weight < 9) {
        cost = 2.68;
    } else if (weight < 10) {
        cost = 2.89;
    } else if (weight < 11) {
        cost = 3.10;
    } else if (weight < 12) {
        cost = 3.31;
    } else if (weight < 13) {
        cost = 3.52;
    } else {
        cost = 0;
    }
    return cost;
}

function computeFirst (weight, cost) {
    if (weight < 1) {
        cost = 3.50;  
    } else if (weight < 2) {
        cost = 3.50;
    } else if (weight < 3) {
        cost = 3.50;
    } else if (weight < 4) {
        cost = 3.50;
    } else if (weight < 5) {
        cost = 3.75;
    } else if (weight < 6) {
        cost = 3.75;
    } else if (weight < 7) {
        cost = 3.75;
    } else if (weight < 8) {
        cost = 3.75;
    } else if (weight < 9) {
        cost = 4.10;
    } else if (weight < 10) {
        cost = 4.45;
    } else if (weight < 11) {
        cost = 4.80;
    } else if (weight < 12) {
        cost = 5.15;
    } else if (weight < 13) {
        cost = 5.50;
    } else {
        cost = 0;
    }
    return cost;
}

function compute(res, weight, p_t, url) {
    var cost = 0;
    console.log('Entered compute(). Weight: ' + String(weight) + ' Cost: ' + String(cost));

    if (p_t == "let_s") {
        p_t = "Letters (Stamped)";
        cost = computeLetS(weight, cost);
        console.log('Entered computeLetS(). Weight: ' + String(weight) + ' Cost: ' + String(cost));
	} else if (p_t == "let_m") {
        p_t = "Letters (Metered)";
        cost = computeLetM(weight, cost);
        console.log('Entered computeLetM(). Weight: ' + String(weight) + ' Cost: ' + String(cost));	
	} else if (p_t == "flats") {
        p_t = "Large Envelopes (Flats)";
        cost = computeFlats(weight, cost);
        console.log('Entered computeFlats(). Weight: ' + String(weight) + ' Cost: ' + String(cost));
	} else if (p_t == "first") {
        p_t = "First-Class Package Service--Retail";
        cost = computeFirst(weight, cost);
        console.log('Entered computeFirst(). Weight: ' + String(weight) + ' Cost: ' + String(cost));
	} else {
		// It would be best here to redirect to an "unknown operation"
		// error page or something similar.
	}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = { title: 'Calculated Rate', weight: weight, pack_type: p_t, cost: cost };

	if (url.pathname == '/getRate') {
		// Render the response, using the EJS page "getRate.ejs" in the pages directory
		// Makes sure to pass it the parameters we need.
        res.render('pages/getRate', params);
        console.log('End Weight: ' + String(weight) + ' End Cost: ' + String(cost));
	}
}

module.exports = { calcRate: calcRate };
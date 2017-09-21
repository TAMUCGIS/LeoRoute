function showResult()
{
	/**************************************
		CREATE TABLE RESULT
	***************************************/
	var trans_total = parseFloat(trans_car_conv('year')) + parseFloat(trans_bus_conv('year')) + parseFloat(trans_bart_conv('year')) + parseFloat(trans_airplane_conv('year'));
	var party_total = parseFloat(partying_conv('year'));
	var cons_total = parseFloat(consumption_textbook_conv('year')) + parseFloat(consumption_clothing_conv('year')) + parseFloat(consumption_cellphone_conv('year')) + parseFloat(consumption_eReader_conv('year')) + parseFloat(consumption_plastic_bottle_conv('year')) + parseFloat(consumption_ipod_conv('year')) +  parseFloat(consumption_coffee_conv('year'));
	var energy_total= parseFloat(energy_audit_dorm_conv('year')) + parseFloat(energy_baseline_conv('year')) + parseFloat(energy_gas_baseline_conv('year'));
	var food_total = parseFloat(food_conv('year'));
	var waste_total = parseFloat(waste_conv('year'));
	var water_total = parseFloat(water_conv('year'));
	
	var graph_trans_total = parseFloat(trans_total.toFixed(1));
	var graph_party_total = parseFloat(party_total.toFixed(1));
	var graph_cons_total = parseFloat(cons_total.toFixed(1));
	var graph_energy_total = parseFloat(energy_total.toFixed(1));
	var graph_food_total = parseFloat(food_total.toFixed(1));
	var graph_waste_total = parseFloat(waste_total.toFixed(1));
	var graph_water_total = parseFloat(water_total.toFixed(1));
	

	
	var carbon_num_total = trans_total + party_total + cons_total + energy_total + food_total + waste_total + water_total;
	var graph_carbon_total = parseFloat(carbon_num_total.toFixed(2));
	
	$("#transportation_tab_total").html(trans_total.toFixed(2));
	$("#partying_tab_total").html(party_total.toFixed(2));
	$("#consumption_tab_total").html(cons_total.toFixed(2));
	$("#energy_tab_total").html(energy_total.toFixed(2));
	$("#food_tab_total").html(food_total.toFixed(2));
	$("#waste_tab_total").html(waste_total.toFixed(2));
	$("#water_tab_total").html(water_total.toFixed(2));
	$("#carbon_total").html(carbon_num_total.toFixed(2));
	
	$("#transportation_tab_percentage").html((trans_total/carbon_num_total*100).toFixed(2));
	$("#partying_tab_percentage").html((party_total/carbon_num_total*100).toFixed(2));
	$("#consumption_tab_percentage").html((cons_total/carbon_num_total*100).toFixed(2));
	$("#energy_tab_percentage").html((energy_total/carbon_num_total*100).toFixed(2));
	$("#food_tab_percentage").html((food_total/carbon_num_total*100).toFixed(2));
	$("#waste_tab_percentage").html((waste_total/carbon_num_total*100).toFixed(2));
	$("#water_tab_percentage").html((water_total/carbon_num_total*100).toFixed(2));
	$("#carbon_total_percentage").html((1*100).toFixed(2));
	/*******************************END OF TABLE RESULT ***************************/
	
	/*******************************START GRAPH ***************************/
	var chart;
	
	chart = new Highcharts.Chart({
		chart: { renderTo: 'pie_container', plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false},
		title: { text: ''},
		tooltip: {	formatter: function() {return '<b>'+ this.point.name +'</b>: '+ this.y +' kg';}},
		plotOptions: {
			pie: {
				allowPointSelect: true,	cursor: 'pointer',
				dataLabels: {enabled: true, color: '#000000', connectorColor: '#000000',
					formatter: function() {	return '<b>'+ this.point.name +'</b>: '+ this.y +' kg';	}
				}
			}
		},
		credits: {enabled: false},
		series: [{type: 'pie',	name: 'Carbon Footprint',
			data: [
					['Transportation', graph_trans_total],
					['Party', graph_party_total],
					['Consumption', graph_cons_total],
					['Energy', graph_energy_total],
					['Food', graph_food_total],
					['Waste', graph_waste_total],
					['Water', graph_water_total]
				  ]
				}]
	});	
	/*******************************END OF Graph ***************************/
	
	
	var bar_chart;
	chart = new Highcharts.Chart({
		title: { text: ''},
		chart: { renderTo: 'result_bar', defaultSeriesType: 'bar'},
		legend: {enabled: false},
		xAxis: {
         categories: ['<b>You</b>','Brazil', 'Burkina Faso', 'China', 'U.S.', 'France'],
         title: {text: null}
      },
		yAxis: { min: 0, title: {text: 'Carbon (kg CO2e)', align: 'high'}, allowDecimals : true},
		credits: {enabled: false},
		series:[{name: 'carbon usage', data:[graph_carbon_total, 1758, 107, 4486, 17584, 5291]}]
		});
	
}

/*******************************************
	Calculator page handler
*******************************************/

function display_question(action, field_name)
{
	if (action=="show"){$("#"+field_name+"_q").show(500);}
	else if (action=="hide")
	{
		$("#"+field_name+"_q").hide(500);
		$("#"+field_name).val('');
	}
}

function display_tabs(action)
{
	if (action=="show")
	{
		$("#transportation_tab").show(500);
		$("#partying_tab").show(700);
		$("#consumption_tab").show(900);
		$("#energy_tab").show(1100);
		$("#food_tab").show(1300);
		$("#waste_tab").show(1500);
		$("#water_tab").show(1700);
		$("#ethics_tab").show(1900);
		$("#result_tab").show(1900);
	}
	else if (action=="hide")
	{
		$("#transportation_tab").hide();
		$("#partying_tab").hide();
		$("#consumption_tab").hide();
		$("#energy_tab").hide();
		$("#food_tab").hide();
		$("#waste_tab").hide();
		$("#water_tab").hide();
		$("#ethics_tab").hide();
		$("#result_tab").hide();
	}
}

function display_comment(location, message)
{
	$("#"+location).show();
	$("#"+location).html(message);	
}

/*******************************************
	TRANSPORTATION
*******************************************/

function trans_car_select_handler()
{
	car_type= $("#trans_select_car").val();
	if (car_type=="no_car"){display_question('hide','trans_input_car_miles');}
	else {display_question('show','trans_input_car_miles');}
}

function trans_car_conv(input)
{
	var result=0;
	var year_or_day=0;
	var car_type= $("#trans_select_car").val();
	if (input=='year') {year_or_day=33;} else {year_or_day = 1/7;}
	if(car_type=="small")		 {	result = $("#trans_input_car_miles").val() * 0.32990 / 4 * year_or_day; }
	else if (car_type=="average"){	result = $("#trans_input_car_miles").val() * 0.40935 / 4 * year_or_day; }
	else if (car_type=="suv")    {	result = $("#trans_input_car_miles").val() * 0.56964 / 4 * year_or_day; }
	else if (car_type=="hybrid") {	result = $("#trans_input_car_miles").val() * 0.22767 / 4 * year_or_day; }
	return result;
}

function trans_bus_conv(input)
{
	var result=0;
	var year_or_day=0;
	if (input=='year') {year_or_day=33;} else {year_or_day = 1/7;}
	result = $("#trans_input_bus_miles").val() * (1 / 0.62137) * 0.18891 * (1/4) * year_or_day;
	return result;
}

function trans_bart_conv(input)
{
	var result=0;
	var year_or_day=0;
	if (input=='year') {year_or_day=33;} else {year_or_day = 1/7;}
	result = $("#trans_input_train_miles").val() * (1 / 0.62137) * 0.08761 * (1/4) * year_or_day;
	return result;
}

function trans_airplane_conv(input)
{
	var result=0;
	var year_or_day=0;
	if (input=='year') {year_or_day=33;} else {year_or_day = 1/7;}
	result = $("#trans_input_plane_miles").val() * (1 / 0.62137) * 1.09 * 0.20515 * (1/4) * year_or_day;
	return result;
}



/*******************************************
	PARTY
*******************************************/
function partying_conv(input)
{
	var result=0;
	var year_or_day=0;
	var red_cups=0;
	var beer=0
	if (input=='year') {year_or_day=33;} else {year_or_day = 1/7;}
	red_cups = $("#amount_red_cups").val();
	beers = $("#partying_beers").val();
	result = $("#nights_partying").val() * (( red_cups* 0.085) + (beers * 0.5314))* year_or_day;
	return result;
}



/*******************************************
	CONSUMPTION
*******************************************/
function consumption_textbook_conv(input)
{
	var result=0;
	var year_or_day=0;
	var soft_cover = $("#soft_cover_per_quarter").val();
	var hard_cover = $("#hard_cover_per_quarter").val();
	if (input=='year') {year_or_day=3;} else {year_or_day = 1/7 * 1/33;}
	result = ((soft_cover* 5)+(hard_cover*10.2)) * year_or_day;
	return result;
}

function consumption_clothing_conv(input)
{
	var result=0;
	var year_or_day=0;
	var amount_clothes = $("#clothing_per_month").val();
	if (input=='year') {year_or_day=33;} else {year_or_day = 1/7;}
	result = amount_clothes * .2756 * 6.5 / 4 * year_or_day;
	return result;
}

function consumption_cellphone_conv(input)
{
	var year_or_day = 0;
	var result = 0;
	var years_owned = $("#duration_owning_cell_phone").val();
	if (input=='year') {year_or_day=1/33;} else {year_or_day = 1/7 * 1/33;}
	var which_cell = $("input[name='is_phone']:checked").val();
	if (which_cell == "smart_phone"){result = 27 + ( 28 / 4 * years_owned * year_or_day);}
	else if (which_cell =="mobile_phone"){result = 60 + ( 88 / 4 * years_owned * year_or_day);}
	return result;
}

function consumption_eReader_conv(input)
{
	var year_or_day = 0;
	var result = 0;
	var years_owned = $("#duration_owning_eReader").val();
	if (input=='year') {year_or_day=1/33;} else {year_or_day = 1/7 * 1/33;}
	var which_cell = $("input[name='is_eReader']:checked").val();
	if (which_cell == "iPad"){result = 65 + ( 65 / 4 * years_owned * year_or_day);}
	else if (which_cell =="kindle"){result = 84 + ( 84 / 4 * years_owned * year_or_day);}
	return result;
}

function consumption_ipod_conv(input)
{
	var result=0;
	var year_or_day = 0;
	var ipod_duration = 0;
	var owned_ipod =0;
	
	ipod_duration = $("#consumption_ipod_duration").val();
	if (input=='year') {year_or_day=1/ 33;} else {year_or_day=1/3 * 1/7;}
	if ($("input[name='consumption_radio_ipod']:checked").val() =='yes') {owned_ipod=1;}
	
	result = (23 + (23 * ipod_duration /4 * year_or_day))*owned_ipod;
	return result;
}

function consumption_plastic_bottle_conv(input)
{
	var result=0;
	var year_or_day = 0;
	var total_bottles = 0;
	total_bottles = $("#consumption_plastic_bottle").val();
	if (input=='year') {year_or_day=7 * 33;} else {year_or_day=1/7;}
	
	result = total_bottles * 0.445 * year_or_day;
	return result;
}

function consumption_coffee_conv(input)
{
	var result=0;
	var year_or_day = 0;
	var coffee_frequency= 0;
	var coffee_type_num = 0;
	var coffee_type=$("#food_coffee_type").val();
	
	coffee_frequency = $("#food_coffee_frequency").val();
	if (input=='year') {year_or_day=33;} else {year_or_day=1/7;}
	
	if (coffee_type=='black_coffee'){coffee_type_num = 284;}
		else if (coffee_type=='cream_sugar'){coffee_type_num=300;}
		else if (coffee_type=='latte'){coffee_type_num=380;}
	
	result = coffee_type_num * coffee_frequency * 1 / 1000 * year_or_day;
	return result;
}


/*******************************************
	ENERGY
*******************************************/

function energy_audit_dorm_conv(input)
{
	year_or_day=0;
	result = 0;
	total_appliance = 20;
	iteration = 1;
	if (input=='year') {year_or_day=7 * 33;} else {year_or_day = 1;}
	while (iteration < (total_appliance + 1))
	{
		appliance_total= $("#appliance_"+iteration+"_total").val();
		if (appliance_total <0.1) {appliance_total = 0;}
		appliance_watts = $("#appliance_"+iteration+"_watts").val();
		appliance_usage = $("#appliance_"+iteration+"_usage").val();
		if (appliance_usage <0.1) {appliance_usage = 0;}
		
		result += appliance_total * appliance_watts * 0.001 * appliance_usage * 0.354224 * year_or_day;
		iteration ++;
	}
	return result;

}

function energy_dorms_kwh()
{
	var dorms = $("#energy_campus_resident").val();
	var dorms_value=0;
	var result = 0;

	if (dorms =="swig"){dorms_value= 16037.67 * 0.1;}
		else if (dorms=="sobrato"){dorms_value=22289.59 * 0.26; }
		else if (dorms=="sanfilippo"){dorms_value=4871.47 *0.10;}
		else if (dorms=="walsh"){dorms_value=8520.72 * 0.1;}
		else if (dorms=="graham"){dorms_value=8256.18 * 0.1;}
		else if (dorms=="dunne"){dorms_value=12063.22 * 0.1;}
		else if (dorms=="casa"){dorms_value=21153.32 * 0.26;}
		else if (dorms=="campisi"){dorms_value=10783.56 * 0.26;}
		else if (dorms=="clare"){dorms_value=2786.199 * 0.33;}
		else if (dorms=="nobili"){dorms_value=5572.396 * 0.1;}
		else if (dorms=="bellarmine"){dorms_value=3446.634 * 0.1;}
		else if (dorms=="none") {dorm_value=0;}
	
	result = dorms_value * 33;
	return result;
}

function energy_baseline_conv(input)
{
	var year_or_day = 0;
	var result =0;
	var user_type= $("input[name='radio_commuter']:checked").val();
	var user_num = 0;
	
	if (input=='year') {year_or_day=1;} else {year_or_day = 1/ (7 * 33);}
	if (user_type =="on_campus") {user_num= 1;}
		else if (user_type =="full_commuter") {user_num = 0.75;}
		else if (user_type =="part_commuter") {user_num = 0.5;}

	
	result = ((28873922.81 * user_num) + energy_dorms_kwh()) / 10524 * 0.354224 * year_or_day;
	
	return result;
}

function energy_gas_baseline_conv(input)
{
	var apt_therms = 29.178;
	var year_or_day = 0;
	var result =0;
	var user_type= $("input[name='radio_commuter']:checked").val();
	var user_num=0;
	
	if (input=='year') {year_or_day=33;} else {year_or_day = 1/ 7;}
	if (user_type =="on_campus") {user_num= 1.074;}
		else if (user_type =="full_commuter") {user_num = 0.75;}
		else if (user_type =="part_commuter") {user_num = 0.5;}
	
	result = ((939439 * user_num / 10524) + apt_therms) / 52 * year_or_day * 11.7 / 2.204;
	
	return result;	
}


/*******************************************
	FOOD
*******************************************/
function food_coffee_select_handler()
{
	coffee_type= $("#food_coffee_type").val();
	if (coffee_type=="none"){display_question('hide','food_coffee_frequency');}
	else {display_question('show','food_coffee_frequency');}
}

function food_conv(input)
{
	var result;
	year_or_day = 0;
	if (input=='year') {year_or_day=7*33;} else {year_or_day=1;}
	diet_type_input= $("input[name='is_diet']:checked").val();
	diet_type=0;
	if (diet_type_input =="vegan"){diet_type=2029;}
		else if (diet_type_input =="vegetarian"){diet_type=3427;} 
		else if (diet_type_input =="meat_eater"){diet_type=6904;}
		else if (diet_type_input =="carnivore"){diet_type=7964;}
	meal_plan_input = $("input[name='is_meal']:checked").val();
	meal_type=0;
	if (meal_plan_input =="preferred"){meal_type=0;}
		else if (meal_plan_input =="basic"){meal_type = 0.15;}
		else if (meal_plan_input =="junior_senior"){meal_type = 0.42;}
	result = (diet_type - (meal_type*diet_type))*1/1000*year_or_day;
	return result;
}


/*******************************************
	WASTE
*******************************************/
function waste_conv(input)
{
	var year_or_day = 0;
	var commuter_input= $("input[name='radio_commuter']:checked").val();
	var recycle_input= $("input[name='radio_recycle']:checked").val();
	var trash_input = $("input[name='radio_trash']:checked").val();
	
	var commuter_num = 0;
	var recycle_num =0;
	var trash_num=0;
	var result1 = 0;
	var result2 = 0;
	var result3 = 0;
	var result = 0;
	
	if (input=='year') {year_or_day=33;} else {year_or_day=1/7;}	
	
	if (commuter_input =="on_campus")	{commuter_num= 1;}
		else if (commuter_input =="full_commuter") {commuter_num = 0.75;}
		else if (commuter_input =="part_commuter") {commuter_num = 0.5;}
	
	if (recycle_input =="below_avg"){recycle_num = 0.07;}
		else if (recycle_input =="avg"){recycle_num = 0.17;}
		else{recycle_num = 0.27;}
	
	result1 = 1451.91 / 10524 * recycle_num * commuter_num / 52 * year_or_day * 2.79 * 1000;
	result2 = 1451.91 / 10524 * (1 - recycle_num) * commuter_num / 52 * year_or_day * 1.34 * 1000;
	result3 = 1451.91 / 10524 * commuter_num * 0.1 / 52 * year_or_day * 1.34 * 1000;
	result = result1 + result2;
	
	if (trash_input =="less_4lb") {result = result - result3;}
			else if (trash_input =="more_4lb"){result = result + result3;}
	return result;	
}


/*******************************************
	WATER
*******************************************/
function water_conv(input)
{
	var year_or_day = 0;
	var baseline =0;
	var multiplier = 1;
	result =1;
	
	var user_type = $("input[name='radio_commuter']:checked").val();
	var shower_duration = $("#water_showers_duration").val();
	var total_shower = $("#water_showers_times").val();
	var total_laundry = $("#water_laundry").val();
	var total_flush = $("#water_flush").val();
	var total_cups = $("#water_cups").val();
	
	
	if (input=='year') {year_or_day=33;} else {year_or_day=1/7; multiplier = 1/231;}
	
	if(user_type =="student"){baseline = 10538.709 * multiplier;}
		else if (user_type =="full_commuter") {baseline = 7904.031 * multiplier;}
		else if (user_type =="part_commuter") {baseline = 5269.354 * multiplier;}
	
	result = baseline + (total_shower * 1.5 * year_or_day) + (13.1 * total_laundry / 4 * year_or_day) + (1.6*total_flush * 7 * year_or_day) + (total_cups * 0.0625 * 7 * year_or_day);
	result = (result * 3.785 * 0.000001 * 352 );
	
	return result;
}

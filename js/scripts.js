$(function(){

	var API_KEY_WalMart = 'xe9cbmn3npg823fhg3p8y6ct';

	function hit_API(url, callback) {
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: function(res) {
				callback(res);
			}
		})
	}
	function hit_API_json(url, callback) {
		$.ajax({
			url: url,
			dataType: "json",
			success: function(res) {
				callback(res);
			}
		})
	}


	var food_reward = [];
	var clothes_reward = [];
	var increments = 41;

	$('.value_total').html('$' + increments)


	function distanceToClothesReward(DB) {
		var until_reward = DB.total_spending/100 % increments;
		until_reward = until_reward === 0 ? 100 : until_reward;

		$(".cloth-bar .progress-bar__inner").css("height", until_reward + "%");
		$(".cloth-bar .progress-bar__value").css("bottom", until_reward + "%").html(until_reward + "%");
	}
	function distanceToFoodReward(DB) {
		var until_reward = DB.total_spending/100 % increments;
		until_reward = until_reward === 0 ? 100 : until_reward;

		$(".food-bar .progress-bar__inner").css("height", until_reward + "%");
		$(".food-bar .progress-bar__value").css("bottom", until_reward + "%").html(until_reward + "%");
	}

	function checkRewards(DB) {
		if(DB.total_spending/100 % increments === 0){
			var itemId = DB.current_reward_clothes || 'ED122I01T-113';
 			var url = "https://api.zalando.com/articles/" + itemId;
			hit_API_json(url, function(clothes_reward){ 
				console.log(clothes_reward)

				$('#modal2__title').html('Clothes Reward')
				$('#modal2__name').html(clothes_reward.name + " - " + clothes_reward.units[0].price.value)
				$('#modal2__url').html('<a href=' + clothes_reward.shopUrl + '>Link to Claim</a>')
			});

			console.log("You've achieved clothes reward")
		}

		if(DB.total_spending/100 % increments === 0){
			var itemId = DB.current_reward_food;
			var url = "http://api.walmartlabs.com/v1/items/" + itemId + "?apiKey=" + API_KEY_WalMart;
			hit_API(url, function(food_reward) {
				console.log(food_reward)

				$('#modal__title').html('Food Reward')
				$('#modal__name').html(food_reward.name + " - " + food_reward.value)
				$('#modal__url').html('<a href=' + food_reward.addToCartUrl + '>Link to Claim</a>')
			});

			console.log("You've achieved food award");
		}
	}

	function historicPurchases(DB) {
		items = DB.historic_items.split(',');
		console.log(items)
		//items are an array -> go display each one
		_.forEach(items, function(item) {
			console.log($('.purchase'), item)
			$('.purchase').append('<h3>' + item + '</h3>')
		})
	}

	//Leader board generation issues...
	function generateLeaderboards() {
		var url = "http://45.55.4.47/ranked_list";
		hit_API_json(url, function(d){
			console.log($('#users-table tr:last'))
			_.forEach(d.names, function(person) {
				//$('#users-table tr:last').after('<tr><td><div class="user-logo"></div></td><td><div class="user-name">' + person.name + '</div></td><td><div class="user-start">$' + person.total_spending + '</div></td></tr>');
				$('#users-table').append('<tr><td><div class="user-logo"></div></td><td><div class="user-name">' + person.name + '</div></td><td><div class="user-start">$' + person.total_spending + '</div></td></tr>');
			})
		})
	}
	generateLeaderboards()

	function loadSpecificUser(user) {
		var url = "http://45.55.4.47/get_name/" + user;

		hit_API_json(url, function(d) {
			console.log(d)
			console.log(d.total_spending);

			//Hit these end points once information is recieved
			distanceToClothesReward(d);
			distanceToFoodReward(d);
			checkRewards(d)
			historicPurchases(d)
		})
	}
	loadSpecificUser("Jerry Smith")


});


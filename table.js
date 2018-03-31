//以下的代码实现的功能：将后台传来的餐厅店主的信息（分为四种情况：A:只有一个餐厅店主，且只有一辆车，一套房。B:yige餐厅店主，多辆车多台套房。C:两个店主，四套房。四辆车。D:liangge店主。多套房车、）用户展示在页面上。
						
		


//餐厅店主基本信息
	var url = "/mmcredit-console/loanBorrowerRest.shtml?projectId="+$("#projectId").val();
	$.get(url, function(data, status){
		if(status == "success")
		{
			if(data["code"] == 0)
			{
				var result = data["result"];
				var totalCount = result["totalCount"];
				var i = result["index"];
				var s = result["size"];
				var list = result["data"];
				var countBorrower = 0;
				$.each(list, function(n, obj){	
					
					//店主基本信息
					countBorrower++;  
					var borrowerDivId = 'borrowerCarHouse'+countBorrower;
					if(countBorrower == 1){   //注意：不能写成countBorrower = 1 ,否则即使countBorrower=2，countBorrower = 1也成立，为true    						
						$('.borrowerCarHouse').attr('id',borrowerDivId);
						$("#"+borrowerDivId+" #"+"borrower_basic_name").html(obj['name']);
					}else{
						if(countBorrower >= 2){
							$(".restau_info").before($('.borrowerCarHouse').eq(0).clone().attr('id',borrowerDivId));	
							$("#"+borrowerDivId+" #"+"borrower_basic_name").html(obj['name']);
							console.log(countBorrower);	
						}
					}
					
					//车产
					var urlCar = "/mmcredit-console/loanOwnerCarRest.shtml?ownerType=borrower&ownerId="+obj['id'];
					$.get(urlCar, function(data, status){
						if(status == "success")
						{
							if(data["code"] == 0)
							{
								var result = data["result"];
								var totalCount = result["totalCount"];
								var i = result["index"];
								var s = result["size"];
								var list = result["data"];
								var countCar = 0;
								var basicNewDivId = borrowerDivId;
								$.each(list, function(n, obj){	
									countCar++;
									var carNewDivId = 'carInfo'+countCar;
									if(countCar == 1){	
										$("#"+basicNewDivId+' .carInfo').attr('id',carNewDivId);
										$("#"+basicNewDivId+" #"+carNewDivId+" #"+"car_car_price").html(obj['purchasePrice']);  //先给第一份车产填数据再clone()																
									}else{
										if(countCar >= 2){
											var countDecrease = countCar - 1;
											var beforeCarId = 'carInfo' + countDecrease;
											$("#"+basicNewDivId+" #"+beforeCarId).after($("#"+beforeCarId).eq(0).clone().attr('id',carNewDivId));
											$("#"+basicNewDivId+" #"+carNewDivId+" #"+"car_car_price").html(obj['purchasePrice']);	
										}
									}				
									console.log(obj['purchasePrice']);
								});	
							}							
						}		
					}); 
					
					//房产
					var urlHouse = "/mmcredit-console/loanOwnerPropertyRest.shtml?ownerType=borrower&ownerId="+obj['id'];
					$.get(urlHouse, function(data, status){
						if(status == "success")
						{
							if(data["code"] == 0)
							{
								var result = data["result"];
								var totalCount = result["totalCount"];
								var i = result["index"];
								var s = result["size"];
								var list = result["data"];
								/*console.log(result["data"][1]["type"])*/
								var countHouse = 0;
								var houseTotalId = borrowerDivId;
								$.each(list, function(n, obj){
									countHouse++;
									var houseNewDivId = 'houseInfo' + countHouse;
									if(countHouse == 1){	
										$("#"+houseTotalId+' .houseInfo').attr('id',houseNewDivId);
										$("#"+houseTotalId+" #"+houseNewDivId+" #"+"property_house_price").html(obj['purchasePrice']);  //先给第一份车产填数据再clone()																
									}else{
										if(countHouse >= 2){
											var countDecrease = countHouse - 1;
											var beforeHouseId = 'houseInfo' + countDecrease;
											$("#"+houseTotalId+" #"+beforeHouseId).after($("#"+beforeHouseId).eq(0).clone().attr('id',houseNewDivId));
											$("#"+houseTotalId+" #"+houseNewDivId+" #"+"property_house_price").html(obj['purchasePrice']);	
										}
									}				
									console.log(obj['purchasePrice']);
								});
							}
						}		
					}); 
					
					
					/*$("#borrower_basic_phone").html(obj['phone']);
					$("#borrower_share_ratio").html(obj['shares']);
					$("#borrower_id_card").html(obj['identityCard']);
					$("#borrower_account_place").html(obj['residenceAddress']);
					$("#borrower_current_address").html(obj['livingAddress']);
					$("#borrower_social_insurance").html(obj['socialSecurity']);
					$("#borrower_insurance_years").html(obj['socialSecurityYear']);
					$("#borrower_education").html(obj['education']);
					$("#borrower_school").html(obj['school']);
					$("#borrower_profession").html(obj['major']);
					$("#borrower_spouse_contact").html(obj['spouseContact']);
					$("#borrower_spouse_name").html(obj['spouseName']);
					$("#borrower_marry").html(obj['marriage']);
					$("#borrower_spouse_card").html(obj['spouseIDCard']);
					$("#borrower_child_num").html(obj['childrenNum']);
					$("#borrower_fertility").html(obj['giveBirth']);
					$("#borrower_info_inquire").html(obj['executionInfo']);
					$("#borrower_platform_inquire").html(obj['litigationInfo']);*/					

				});
				
			}
		}		
	}); 
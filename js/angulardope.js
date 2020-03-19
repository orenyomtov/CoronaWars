if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

// dealer names
var maleFirstNames = ['Aidan', 'Alphonso', 'Anthony', 'Avon', 'Ben', 'Billy', 'Bobby', 'Bojack', 'Bret', 'Bruce', 'Cedric', 'Charles', 'Charlie', 'Chris', 'Clarence', 'Clark', 'Dave', 'David', 'Dexter', 'Drexyl', 'Eddie', 'Floyd', 'Frank', 'Freddie', 'Gerald', 'Gordon', 'Ilka', 'James', 'Jeff', 'Jethro', 'Jimmy', 'John', 'Ken', 'Kingston', 'Larry', 'Laurence', 'Leeroy', 'Lester', 'Malcolm', 'Marty', 'Maxwell', 'Michael', 'Mike', 'Paul', 'Pete', 'Randy', 'Ray', 'Reggie', 'Rick', 'Robert', 'Roland', 'Ron', 'Ronnie', 'Ross', 'Sean', 'Spencer', 'Spike', 'Steve', 'Stevie', 'Stringer', 'Stu', 'Stuart', 'Terry', 'Thomas', 'Tommy', 'Tony', 'William', 'Brian'];
var femaleFirstNames = ['Alicia', 'Amanda', 'Ashley', 'Barbara', 'Becky', 'Beverly', 'Catriona', 'Charlotte', 'Debbie', 'Eve', 'Fiona', 'Francesca', 'Geraldine', 'Harriet', 'Jacki', 'Jane', 'Jenny', 'Jessica', 'Joanne', 'Jodie', 'Josie', 'Julia', 'June', 'Kate', 'Kim', 'Kimmy', 'Laura', 'Lisa', 'Liz', 'Louisa', 'Louise', 'Margaret', 'Martina', 'Mary', 'Muriel', 'Natasha', 'Nicki', 'Pam', 'Patricia', 'Rachel', 'Rebecca', 'Rebel', 'Rhonda', 'Riley', 'Rose', 'Ruby', 'Samantha', 'Sarah', 'Scarlet', 'Shannon', 'Sharon', 'Sophie', 'Stacy', 'Stephanie', 'Susie', 'Tabitha', 'Tanya', 'Toni', 'Tracy', 'Tricia', 'Trish', 'Vera', 'Victoria', 'Yolanda', 'Michelle', 'Felicity'];
var lastNames = ['Adams', 'Barksdale', 'Baxter', 'Bell', 'Braxton', 'Bronson', 'Cray', 'Diamond', 'Edwards', 'Findus', 'Ford', 'Fox', 'Franklin', 'French', 'Gentworth', 'George', 'Gibson', 'Gittins', 'Grey', 'Grimes', 'Harrison', 'Hogan', 'Hopkins', 'Jackson', 'Jenkins', 'Jones', 'Lee', 'Lloyd', 'Long', 'Mackintosh', 'Manero', 'Marshall', 'Matrix', 'McGrath', 'McLaren', 'Mills', 'Moreno', 'Murphy', 'Page', 'Palmer', 'Perry', 'Plant', 'Potts', 'Reed', 'Rhoades', 'Rico', 'Roper', 'Savage', 'Scott', 'Smith', 'Somerville', 'Stevens', 'Stewart', 'Sulley', 'Templeton', 'Thompson', 'Tull', 'Washington', 'Willis', 'Wilson', 'Worley', 'Young', 'Merchant', 'Rodriguez', 'Gonzalez', 'King'];
var nicknames = ['Ace', 'Babyface', 'Beefsteak', 'Big dog', 'Birdy', 'Blaster', 'Boffin', 'Bones', 'Brains', 'Brandy', 'Brick', 'Bubbles', 'Bug Eye', 'Butter', 'California', 'Cheese', 'Chips', 'Coffee', 'Corky', 'Crusher', 'Doc', 'Dolamite', 'Egg', 'Fingers', 'Fletch', 'Foxy', 'Frosty', 'G', 'Ghost', 'Goat', 'Grafter', 'Hollywood', 'Ice', 'Jellybean', 'Linebacker', 'Lucky', 'Maniac', 'Muscles', 'Papa', 'Psycho', 'Scarface', 'Shooter', 'Silencer', 'Slim', 'Snoop', 'Space Cadet', 'Spud', 'The Face', 'The Hat', 'The Kid', 'The Mouth', 'Unit', 'Upgrayedd', 'Vampire', 'Wheezy', 'Wonder'];

// constants
var treeUpgradeBasePrice = 1000;
var treeUpgradePriceMulti = 1.95;
var treeUpgradeWeedMulti = 1.2;

var territoryUpgradePriceMulti = 3.1;
var territoryUpgradeBasePrice = 2000;

function DealerUpgrade(name, tooltip, price, volumeMod, priceMod, secondaryMod, synopsis) {
    this.name = name;
    this.tooltip = tooltip;
    this.price = price;
    this.volumeMod = volumeMod;
    this.priceMod = priceMod;
    this.secondaryMod = secondaryMod;
	this.synopsis = synopsis;
}

var dealerUpgrades = [
    new DealerUpgrade('Baseball bat', 'Handy in a street fight and helps to scare away the competition. Allows the salesperson to sell items for 10% more money', 150, 1, 1.1, 0, '+10% margin'),
    new DealerUpgrade('Bicycle', 'The cheapest and most basic form of personal transportation. Allows the salesperson to sell an extra 10% volume', 600, 1.1, 1, 0, '+10% volume'),
    new DealerUpgrade('iPhone 11 Pro', 'A state of the art smartphone. Allows the salesperson to sell a small amount of other items on the side', 900, 1, 1, 0.1, '+10% secondary sales'),
    new DealerUpgrade('Superbike', 'One of the fastest ways to get around the urban jungle. Allows the salesperson to sell an extra 20% volume', 25000, 1.2, 1, 0, '+20% volume'),
    new DealerUpgrade('Propaganda Agency', 'A small but deadly russian agency, spreads misinformation and fear across the internet. Allows the salesperson to sell items for 20% more money', 5000, 1, 1.2, 0, '+20% margin'),
    new DealerUpgrade('Personal Assistant', 'A personal assistant to take your calls. Allows the salesperson to sell even more items on the side', 85000, 1, 1, 0.2, '+20% secondary sales'),
    new DealerUpgrade('Hacker', 'A hacker who eliminates the competitios\'s critical infrastructure. Allows the salesperson to sell items for 20% more money', 150000, 1, 1.2, 0, '+20% margin'),
    new DealerUpgrade('Ferrari 458 Italia', 'A fine Italian supercar. Allows the salesperson to sell an extra 30% volume', 575000, 1.3, 1, 0, '+30% volume'),
    new DealerUpgrade('AW119 Ke Koala', 'A personal helicopter for transporting you around town! Allows the salesperson to sell an extra 60% volume', 1890000, 1.6, 1, 0, '+60% volume')
];

var silkRoadUpgrade = {type:'SilkRoad',name:'Develop Silk Road',tooltip:'Develop the Silk Road dark web site to allow you to your items in bulk lots of 1000 pieces',price:141592,glyph:'glyphicon-cloud'};
var prestigeDealerUpgrade = {type:'PrestigeDealer',name:'Natural Salesperson',tooltip:'Recruit a natural salesperson with perfect attributes. This will reset your progress!',price:5000000,glyph:'glyphicon-tower'};

function ProductionUpgrade(name, tooltip, price, producer, upVal, drug) {
    this.type = 'ProductionUpgrade';
    this.name = name;
    this.tooltip = tooltip;
    this.price = price;
    this.producer = producer;
    this.upVal = upVal;
    this.drug = drug;
    this.glyph = 'glyphicon-circle-arrow-up';
}
function DrugUnlock (name,tooltip,price,drug) {
    this.type = 'DrugUnlock';
    this.name = name;
    this.tooltip = tooltip;
    this.price = price;
    this.drug = drug;
    this.glyph = 'glyphicon-tint';
}

function formatMoney(input) {
	if (!input) input = 0;
	var symbol = '$';
	if (input >= 1000000000000)
		return symbol + (input / 1000000000000).toFixed(2) + 'T';
	if (input >= 1000000000)
		return symbol + (input / 1000000000).toFixed(2) + 'B';
	if (input >= 1000000)
		return symbol + (input / 1000000).toFixed(2) + 'M';
	if (input >= 1000)
		return symbol + (input / 1000).toFixed(2) + 'K';

	return symbol + input.toFixed(2);
}

var productionUpgradesMaster = [
    new ProductionUpgrade('Aloe Vera', 'Dillute alcogel with cheap and ineffective aloe vera, increases the amount of alcogel produced by your factories by 30%!', 500, 'Algogel Factory', 1.3, 'Alcogel'),
    new ProductionUpgrade('Move to China', 'High tech industrial systems, and low wages. Increases the amount of alcogel produced by your factories by 50%!', 6500, 'Algogel Factory', 1.5, 'Alcogel'),

    new ProductionUpgrade('Auto Hygrometer', 'An automatically controlled humidity system, increases the amount of toilet paper produced by your factories by 50%!', 5000, 'Toilet Paper Mill', 1.5, 'Toilet Paper'),
    new ProductionUpgrade('Rolling system', 'An computer controlled rolling system, increases the amount of toilet paper rolls produced by your factories by 50%!', 25000, 'Toilet Paper Mill', 1.5, 'Toilet Paper'),

    new ProductionUpgrade('Recycled Ingredients', 'Increases the amount of face masks made by your factories by 50%!', 40000, 'Face Mask Factory', 1.5, 'Face Mask'),
    new ProductionUpgrade('Lower Fiber Density', 'Increases the amount of face masks made by your factories by 50%!', 130000, 'Face Mask Factory', 1.5, 'Face Mask'),

    new ProductionUpgrade('Lower Wages', 'Increases the amount of N95 respirators produced by your factories by 60%!', 75000, 'N95 Factory', 1.4, 'N95 Respirator'),
    new ProductionUpgrade('Implement ERP System', 'Increases the amount of N95 respirators produced by your factories by 50%!', 190000, 'N95 Factory', 1.5, 'N95 Respirator'),

    new ProductionUpgrade('Nitrile Rubber', 'Increases the amount of gloves made by your factories by 50%!', 80000, 'Gloves Factory', 1.5, 'Sterile Gloves'),
    new ProductionUpgrade('Polyvinyl Chloride', 'Increases the amount of gloves made by your factories by 50%!', 120000, 'Gloves Factory', 1.5, 'Sterile Gloves'),

    new ProductionUpgrade('Hire Wartime CEO', 'Increases the amount of suits made by your factories by 50%!', 145000, 'Suit Factory', 1.5, 'Biohazard Suit'),
    new ProductionUpgrade('FDA Payoff', 'Get the feds off your back to increase the amount of suits made by your factories by 45%!', 280000, 'Suit Factory', 1.45, 'Biohazard Suit'),

    new ProductionUpgrade('Chemical Research', 'Increases the amount of testing kits made by your testing labs by 50%!', 190000, 'Testing Lab', 1.5, 'Testing Kit'),
    new ProductionUpgrade('Mass Spectrometer', 'Increases the amount of testing kits made by your testing labs by 70%!', 550000, 'Testing Lab', 1.7, 'Testing Kit'),

    new ProductionUpgrade('Humidification Equipment', 'Increases the amount of ventilators made by your factories by 50%!', 210000, 'Ventilator Factory', 1.5, 'Ventilator'),
    new ProductionUpgrade('Gas Blender', 'Increases the amount of ventilators made by your factories by 50%!', 750000, 'Ventilator Factory', 1.5, 'Ventilator'),

    new ProductionUpgrade('Recycled Pulp', 'Increases the amount of wet wipes made by your factories by 60%!', 250000, 'Wet Wipes Factory', 1.6, 'Wet Wipes'),
    new ProductionUpgrade('Advanced Fiber', 'Increases the amount of wet wipes made by your factories by 40%!', 1000000, 'Wet Wipes Factory', 1.4, 'Wet Wipes'),

    new ProductionUpgrade('Plastic Parts', 'Increases the amount of bidets made by your factories by 30%!', 350000, 'Bidet Factory', 1.3, 'Bidet'),
    new ProductionUpgrade('Seat Heater', 'Increases the amount of bidets made by your factories by 80%!', 1500000, 'Bidet Factory', 1.8, 'Bidet'),
    new ProductionUpgrade('Warm Air Dryer', 'Increases the amount of bidets made by your factories by 50%!', 2500000, 'Bidet Factory', 1.5, 'Bidet')];

function Drug(name, pricePerGram, costToUnlock) {
    this.name = name;
    this.pricePerGram = pricePerGram;
    this.qty = 0;
    this.total = 0;
    this.selected = true;
    this.costToUnlock = costToUnlock;
    this.totalCash = 0;
	this.drugUnlock = new DrugUnlock('Research ' + this.name, 'Spend money to research production of a new item, ' + this.name + '. Your customers will love it!', this.costToUnlock, this.name);
}

var drugsMaster = [
    new Drug('Alcogel', 4.4, 0),
    new Drug('Toilet Paper', 6, 2000),
    new Drug('Face Mask', 10, 7000),
    new Drug('N95 Respirator', 15, 20000),
    new Drug('Sterile Gloves', 20, 40000),
    new Drug('Biohazard Suit', 30, 75000),
    new Drug('Testing Kit', 40, 90000),
    new Drug('Ventilator', 50, 120000),
    new Drug('Wet Wipes', 60, 180000),
    new Drug('Bidet', 70, 250000)];
    
function Producer(name, basePrice, drug, priceMulti, prodPerUnit) {
    this.name = name;
    this.basePrice = basePrice;
    this.qty = 0;
    this.drug = drug;
    this.priceMulti = priceMulti;
    this.prodPerUnit = prodPerUnit;
}

var productionMaster = [
    new Producer('Algogel Factory', 15, 'Alcogel', 1.12, 0.2),
    new Producer('Toilet Paper Mill', 150, 'Toilet Paper', 1.15, 0.3),
    new Producer('Face Mask Factory', 1000, 'Face Mask', 1.2, 0.5),
    new Producer('N95 Factory', 2500, 'N95 Respirator', 1.21, 0.4),
    new Producer('Gloves Factory', 5000, 'Sterile Gloves', 1.22, 0.5),
    new Producer('Suit Factory', 10000, 'Biohazard Suit', 1.23, 0.5),
    new Producer('Testing Lab', 20000, 'Testing Kit', 1.24, 0.4),
    new Producer('Ventilator Factory', 30000, 'Ventilator', 1.25, 0.5),
    new Producer('Wet Wipes Factory', 40000, 'Wet Wipes', 1.26, 0.45),
    new Producer('Bidet Factory', 50000, 'Bidet', 1.27, 0.3)];


function Dealer(seed) {
    this.seed = seed;
    Math.seedrandom(seed);
    this.volume = Math.random() + 0.5;
    this.price = Math.random() + 0.5;
	
	this.originalVolume = this.volume;
	this.originalPrice = this.price;
	
    this.sideVolume = 0;

    this.male = true;
    this.name = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
    if (Math.random() > 0.7) {
        this.male = false;
        this.name = femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    }
    if (Math.random() > 0.9) {
        this.name = this.name + ' "' + nicknames[Math.floor(Math.random() * nicknames.length)] + '"';
    }
    this.name = this.name + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
    this.cashEarned = 0;
    this.selected = true;
    this.drug = "Alcogel";
	this.drugIndex = 0;
    this.upgrades = [];
    this.cashOneSecondAgo = 0;
    this.cashPerSecond = 0;
}

function getActualDealerPrice(dealer, drug) { return dealer.price * drug.pricePerGram; }

function getActualDealerVolume(dealer, drug) {
	if (dealer.arrested) return 0;
    if (drug == dealer.drug || drug.name == dealer.drug)
        return dealer.volume * 3;
    else
        return dealer.sideVolume * dealer.volume * 3;
}

function GameModel() {
    this.drugs = [drugsMaster[0]];
    this.upgrades = [];
    this.currencyCode = '$';
    this.cash = 100;
    this.totalCashEarned = 0;
    this.treeUpgrades = 0;
    this.dealers = [];
    this.production = [productionMaster[0]];
    this.territoryUpgrades = 0;
    this.workMode = false;
    this.lastDealerRefresh = 0;
    this.silkRoadUnlocked = false;
    this.autoSilk = false;
}

angular.module('dopewarsremakeApp', ['ngSanitize', 'ngAnimate','jg.progressbar'])
	.animation('.dealer-hire-anim', function() {
		return { 
			enter : function(element, done) {
	    	    element.hide().slideDown(1000,done);
	        },
			leave: function (element, done) {
				element.slideUp(1000,done);
			}
  		};
	})
	.animation('.drug-anim', function() {
		return { 
			enter : function(element, done) {
	    	    element.hide().fadeIn(done);
	        },
			leave: function (element, done) {
				element.fadeOut(done);
			}
  		};
	})
	.animation('.research-anim', function() {
		return { 
			enter : function(element, done) {
	    	    element.hide().fadeIn(done);
	        },
			leave: function (element, done) {
				element.fadeOut(done);
			}
  		};
	})
    .animation('.content-open', function () {
        return {
            enter: function (element, done) {
                //run the animation here and call done when the animation is complete
                return function (cancelled) {
                    //this (optional) function will be called when the animation
                    //completes or when the animation is cancelled (the cancelled
                    //flag will be set to true if cancelled).
                };
            },
            beforeAddClass: function (element, className, done) {
                element.css('display', 'none');
                done();
            },
            //animation that can be triggered after the class is added
            addClass: function (element, className, done) {
                element.slideDown(done);
				$(window).trigger('resize');
            },

            //animation that can be triggered after the class is added
            beforeRemoveClass: function (element, className, done) {
                element.slideUp(done);
            }
        };
    })
    .filter('weight', function () {
        return function (input) {
            if (input >= 1000)
                return (input / 1000).toFixed(2) + 'kg';

            return input.toFixed(2) + "g";
        };
    })
    .filter('money', function () {
        return formatMoney;
    })
    .controller('DopeController', ['$scope', '$document', '$window', '$sce', '$interval', '$timeout', '$animate', function ($scope, $document, $window, $sce, $interval, $timeout, $animate) {

        var lastUpdate = 0;
        var lastSaved = 0;
        var interval;
        var cashOneSecond = 0;
        var timeOneSecond = 0;

        $scope.log = [];

        $scope.gameModel = new GameModel();
		$scope.prestigeDealers = [];
        $scope.cashPerSecond = 0;
        $scope.hireDealers = [];
        $scope.toggleWorkMode = function () { $scope.gameModel.workMode = !$scope.gameModel.workMode;};
        $scope.priceOfTerritory = function () { return territoryUpgradeBasePrice * Math.pow(territoryUpgradePriceMulti, $scope.gameModel.territoryUpgrades); };
        $scope.cashPercentage = function (value) { return Math.min(100, $scope.gameModel.cash / value * 100); };
        $scope.productionPrice = function (production) { return production.basePrice * Math.pow(production.priceMulti, production.qty); };
        $scope.availableUpgrades = [];
		$scope.dealerSort = 'none';

        $scope.getDrugByName = function (name) {
            for (var i = 0; i < $scope.gameModel.drugs.length; i++) {
                if ($scope.gameModel.drugs[i].name == name)
                    return $scope.gameModel.drugs[i];
            }
            return null;
        };

        $scope.sellOnSilkRoad = function (drug) {
            if (drug.qty > 1000) {
                drug.qty -= 1000;
                var cashEarned = $scope.drugStreetPrice(drug) * 900;
                $scope.gameModel.cash += cashEarned;
                $scope.gameModel.totalCashEarned += cashEarned;
            }
        };

        $scope.actualDealerVolume = function (dealer, drug) { return getActualDealerVolume(dealer, drug); };
		
        $scope.actualDealerPrice = function (dealer, drug) {
            if (drug === undefined) {
                drug = $scope.getDrugByName(dealer.drug);
            }
			
            return dealer.price * $scope.drugStreetPrice(drug);
        };

        $scope.drugStreetPrice = function (drug) {
            if ($scope.gameModel.buff && $scope.gameModel.buff.drugname == drug.name)
                return drug.pricePerGram * $scope.gameModel.buff.modifier;

            return drug.pricePerGram;
        };
		
		$scope.updateDealerDrugIndex = function(){
			for (var i=0; i< $scope.gameModel.drugs.length; i++) {
				for (var j=0; j < $scope.gameModel.dealers.length; j++) {
					if ($scope.gameModel.dealers[j].drug == $scope.gameModel.drugs[i].name) {
						$scope.gameModel.dealers[j].drugIndex = i;
					}
				}
			}
		};
		
        $scope.upgradeUnlocked = function (upgrade) {
            var upgradeUnlocked = false;
            for (var j = 0; j < $scope.gameModel.upgrades.length; j++) {
                if ($scope.gameModel.upgrades[j].name == upgrade.name)
                    upgradeUnlocked = true;
            }
            return upgradeUnlocked;
        };

        $scope.otherUpgradesForThisDrugUnlocked = function (upgrade) {

            for (var i = 0; i < productionUpgradesMaster.length; i++) {
                if (productionUpgradesMaster[i].drug == upgrade.drug) {
                    if (productionUpgradesMaster[i].name == upgrade.name)
                        return true;

                    if (!$scope.upgradeUnlocked(productionUpgradesMaster[i]))
                        return false;
                }
            }
            return true;
        };

        $scope.toggleAutoSilk = function () {
            if ($scope.gameModel.autoSilk)
                $scope.gameModel.autoSilk = false;
            else
                $scope.gameModel.autoSilk = true;
        };
		
		$scope.getUpgradesForDrug = function(drug) {
			var upgradesForDrug = [];
			for (var i=0; i<$scope.availableUpgrades.length;i++){
				if ($scope.availableUpgrades[i].drug == drug.name)
					upgradesForDrug.push($scope.availableUpgrades[i]);
			}
			return upgradesForDrug;
		};

        $scope.calculateAvailableUpgrades = function () {
            $scope.availableUpgrades = [];
            $scope.drugResearch = [];
			$scope.dealerResearch = [];
			
            for (var i = 0; i < drugsMaster.length; i++) {
                var drugUnlocked = false;

                if ($scope.getDrugByName(drugsMaster[i].name) !== null)
                    drugUnlocked = true;

                if (!drugUnlocked && (i > 0 && $scope.getDrugByName(drugsMaster[i - 1].name) !== null) && $scope.gameModel.totalCashEarned > (drugsMaster[i].costToUnlock * 1.5)) {
                    $scope.drugResearch.push(drugsMaster[i].drugUnlock);
                }
            }
            for (i = 0; i < productionUpgradesMaster.length; i++) {

                if (!$scope.upgradeUnlocked(productionUpgradesMaster[i]) && $scope.getDrugByName(productionUpgradesMaster[i].drug) !== null && $scope.gameModel.totalCashEarned > (productionUpgradesMaster[i].price * 1.5) && $scope.otherUpgradesForThisDrugUnlocked(productionUpgradesMaster[i])) {
                    $scope.availableUpgrades.push(productionUpgradesMaster[i]);
                }
            }
            if ($scope.gameModel.totalCashEarned > (silkRoadUpgrade.price * 1.5) && !$scope.gameModel.silkRoadUnlocked)
                $scope.dealerResearch.push(silkRoadUpgrade);
			
			if ($scope.gameModel.totalCashEarned > (prestigeDealerUpgrade.price * 1.5))
                $scope.dealerResearch.push(prestigeDealerUpgrade);
			
			$timeout(function(){$(window).trigger('resize');},0);
        };

        $scope.purchaseUpgrade = function (upgrade) {
            if ($scope.gameModel.cash < upgrade.price)
                return;

			var i = 0;
            switch (upgrade.type) {
				case 'PrestigeDealer':
					$scope.prestigeDealerPrice = prestigeDealerUpgrade.price;
					$('#prestigeDealerModal').modal('show');
					return;
                case 'SilkRoad':
                    $scope.gameModel.silkRoadUnlocked = true;
                    break;
                case 'DrugUnlock':
                    for (i = 0; i < drugsMaster.length; i++) {
                        if (drugsMaster[i].name == upgrade.drug) {
                            $scope.gameModel.drugs.push(drugsMaster[i]);
                        }
                    }
                    for (i = 0; i < productionMaster.length; i++) {
                        if (productionMaster[i].drug == upgrade.drug) {
                            $scope.gameModel.production.push(productionMaster[i]);
                        }
                    }
                    break;
                case 'ProductionUpgrade':
                    for (i = 0; i < $scope.gameModel.production.length; i++) {
                        if ($scope.gameModel.production[i].name == upgrade.producer) {
                            $scope.gameModel.production[i].prodPerUnit *= upgrade.upVal;
                            $scope.gameModel.upgrades.push(upgrade);
                        }
                    }
                    break;
            }
            $scope.gameModel.cash -= upgrade.price;
			$scope.calculateAvailableUpgrades();
            writeToCookie();
        };

        $scope.increaseProduction = function (production) {
            if ($scope.gameModel.cash > $scope.productionPrice(production)) {
                $scope.gameModel.cash = $scope.gameModel.cash - $scope.productionPrice(production);
                production.qty++;
                writeToCookie();
            }
        };

        $scope.producersForDrug = function (drug) {
            var producers = [];
            for (var i = 0; i < $scope.gameModel.production.length; i++) {
                if ($scope.gameModel.production[i].drug == drug.name)
                    producers.push($scope.gameModel.production[i]);
            }
            return producers;
        };

        function readFromCookie() {
            if (typeof (Storage) == "undefined") {
                return;
            }
            if (localStorage.getItem("gameModel") !== null) $scope.gameModel = JSON.parse(localStorage.getItem("gameModel"));
			if (localStorage.getItem("prestigeDealers") !== null) $scope.prestigeDealers = JSON.parse(localStorage.getItem("prestigeDealers"));
        }

        function writeToCookie() {
            if (typeof (Storage) == "undefined") {
                return;
            }
            localStorage.setItem("gameModel", JSON.stringify($scope.gameModel));
			localStorage.setItem("prestigeDealers", JSON.stringify($scope.prestigeDealers));
        }

        $scope.drugMadePerSecond = function(drug) {
            var producers = $scope.producersForDrug(drug);
            var qty = 0;
            for (var j = 0; j < producers.length; j++) {
                qty += producers[j].qty * producers[j].prodPerUnit;
            }
            return qty;
        };

        $scope.drugSoldPerSecond = function (drug) {
            var qty = 0;
            for (var j = 0; j < $scope.gameModel.dealers.length; j++) {
                qty += getActualDealerVolume($scope.gameModel.dealers[j], drug);
            }
            return qty;
        };

        $scope.resetGame = function () {
			localStorage.removeItem('gameModel');
            window.location.reload();
        };

        $scope.selectDrug = function (drug) {
            drug.selected = !drug.selected;                
        };

        $scope.selectDealer = function (dealer) {
            dealer.selected = !dealer.selected;
        };

        $scope.getStars = function (number, max) {
            var stars = "<span class='glyphicon glyphicon-star'></span>";
            for (var i = 0; i < Math.round((number - 0.5) * (max - 1)) ; i++) {
                stars = stars + "<span class='glyphicon glyphicon-star'></span>";
            }
            return stars;
        };

        $scope.dealerHired = function (dealerId) {
            for (var i = 0; i < $scope.gameModel.dealers.length; i++) {
                if ($scope.gameModel.dealers[i].seed == dealerId)
                    return true;
            }
            return false;
        };

        $scope.availableDealerUpgrades = [];
        var upgradeDealer;

        $scope.dealerUpgradeModal = function (dealer) {
            
            $scope.calculateAvailableDealerUpgrades(dealer);
			
			$('#upgradeDealerModal').on('shown.bs.modal', function (e) {
				var height = 0;

				$('#upgradeDealerModal .height-match').each(function(){

					if ($(this).height() > height)
						height = $(this).height();
				});
				
				$('#upgradeDealerModal .height-match').each(function(){
					if (height > $(this).height())
						$(this).find('button').css('margin-top',(height - $(this).height()) + 'px');
				});
			});
            $('#upgradeDealerModal').modal('show');
        };
		
		$scope.upgradeDealer = function(){return upgradeDealer;};

        $scope.calculateAvailableDealerUpgrades = function(dealer) {
            upgradeDealer = dealer;
            $scope.availableDealerUpgrades = [];

            for (var i = 0; i < dealerUpgrades.length; i++) {
                var alreadyBought = false;
                for (var j = 0; j < dealer.upgrades.length; j++) {
                    if (dealer.upgrades[j].name == dealerUpgrades[i].name)
                        alreadyBought = true;
                }
				dealerUpgrades[i].realPrice = dealerUpgrades[i].price;
				
				if (dealer.type == 'Prestige') dealerUpgrades[i].realPrice = dealerUpgrades[i].price * 6;
				
				if (!alreadyBought && $scope.gameModel.totalCashEarned > dealerUpgrades[i].price - 2000)
                    $scope.availableDealerUpgrades.push(dealerUpgrades[i]);
            }
        };

        $scope.purchaseDealerUpgrade = function (upgrade) {
            if ($scope.gameModel.cash < upgrade.realPrice)
                return;
            
            $scope.gameModel.cash -= upgrade.realPrice;
            upgradeDealer.upgrades.push(upgrade);
            upgradeDealer.volume *= upgrade.volumeMod;
            upgradeDealer.price *= upgrade.priceMod;
            upgradeDealer.sideVolume += upgrade.secondaryMod;
            $scope.calculateAvailableDealerUpgrades(upgradeDealer);
            writeToCookie();
        };

		var dealerRefreshRate = 60000;
        $scope.secondsToDealerRefresh = 0;

        $scope.refreshDealers = function () {
            if (!$scope.gameModel.lastDealerRefresh)
                $scope.gameModel.lastDealerRefresh = 0;

            var currentTime = new Date().getTime();
            if (currentTime > $scope.gameModel.lastDealerRefresh + dealerRefreshRate) {
                $scope.gameModel.lastDealerRefresh = currentTime;
            }
            $scope.hireDealers = [new Dealer($scope.gameModel.lastDealerRefresh), new Dealer($scope.gameModel.lastDealerRefresh - 25000), new Dealer($scope.gameModel.lastDealerRefresh - 45000)];

			$scope.hireDealers.push.apply($scope.hireDealers, $scope.prestigeDealers);
            writeToCookie();
        };

        $scope.hireDealerModal = function () {
            if ($scope.hireDealers.length === 0) {
				$scope.refreshDealers();
				$animate.enabled(false);
				$timeout(function(){$animate.enabled(true);},1000);
			}

            $('#hireDealerModal').modal('show');
        };

        $scope.hireDealer = function (dealer) {
            $('#hireDealerModal').modal('hide');
            if ($scope.gameModel.dealers.length < 1 + $scope.gameModel.territoryUpgrades && !$scope.dealerHired(dealer.seed)) {
				dealer.drug='Alcogel';
                $scope.gameModel.dealers.push(dealer);
                writeToCookie();
            } else {
                $timeout(function () {
                    $window.alert('You already have the maximum number of salespeople working for you. Either fire a salesperson or buy additional real estate to hire another.');
                });
            }
        };
        
        $scope.fireDealerModal = function (dealer) {
            $scope.dealerToFire = dealer;
            $scope.dealerToFire.kids = (2 + Math.random() * 6).toFixed();
            $('#fireDealerModal').modal('show');
        };
		
		$scope.payBail = function(dealer) {
			if ($scope.gameModel.cash >= dealer.bail) {
				$scope.gameModel.cash -= dealer.bail;
				dealer.arrested = false;
				dealer.bail = 0;
				dealer.arrestMessage = false;
			}
		};

        $scope.fireDealerConfirm = function () {
            for (var i = 0; i < $scope.gameModel.dealers.length; i++) {
                if ($scope.gameModel.dealers[i].seed == $scope.dealerToFire.seed) {
                    $scope.gameModel.dealers.splice(i,1);
		            writeToCookie();
        		    $('#fireDealerModal').modal('hide');
					return;
                }
            }
        };
		
        $scope.fireDealerCancel = function () {
            $('#fireDealerModal').modal('hide');
        };

        $scope.expandTerritory = function () {
            var upgradeCost = territoryUpgradeBasePrice * Math.pow(territoryUpgradePriceMulti, $scope.gameModel.territoryUpgrades);
            if ($scope.gameModel.cash > upgradeCost) {
                $scope.gameModel.cash = $scope.gameModel.cash - upgradeCost;
                $scope.gameModel.territoryUpgrades++;
                writeToCookie();
            }
        };

        function update() {
            var updateTime = new Date().getTime();
            var timeDiff = (Math.min(1000, Math.max(updateTime - lastUpdate,0))) / 1000;

            var cashEarned = 0;
			
			var dealers = $scope.gameModel.dealers.concat().sort(function(a,b){return b.price - a.price;});

            if ($scope.gameModel.buff && $scope.gameModel.buff.expires <= updateTime) {
                $scope.gameModel.buff = undefined;
                $scope.buffMsg = undefined;
            }

            if ($scope.gameModel.lastDealerRefresh)
                $scope.secondsToDealerRefresh = (($scope.gameModel.lastDealerRefresh + dealerRefreshRate - updateTime) / 1000).toFixed();

            if ($scope.gameModel.buff)
                $scope.buffMsg = $scope.gameModel.buff.msg.format((($scope.gameModel.buff.expires - updateTime) / 1000).toFixed());
                        
            for (var i = 0; i < $scope.gameModel.drugs.length; i++) {
                var drug = $scope.gameModel.drugs[i];

                if ($scope.gameModel.autoSilk && drug.qty > 1000) {
                    drug.qty -= 1000;
                    cashEarned += $scope.drugStreetPrice(drug) * 900;
                }
				
				var j = 0;

                var producers = $scope.producersForDrug(drug);
                for (j = 0; j < producers.length; j++) {
                    drug.qty += producers[j].qty * producers[j].prodPerUnit * timeDiff;
                    drug.total += producers[j].qty * producers[j].prodPerUnit * timeDiff;
                }

                for (j = 0; j < dealers.length; j++) {
                    if (dealers[j].drug == drug.name && drug.qty >= getActualDealerVolume(dealers[j], drug) * timeDiff) {
                        cashEarned += $scope.actualDealerPrice(dealers[j], drug) * getActualDealerVolume(dealers[j], drug) * timeDiff;
                        drug.qty -= getActualDealerVolume(dealers[j], drug) * timeDiff;
                        dealers[j].cashEarned += $scope.actualDealerPrice(dealers[j], drug) * getActualDealerVolume(dealers[j], drug) * timeDiff;
                    }
                }

                for (j = 0; j < dealers.length; j++) {
                    if (dealers[j].drug != drug.name && drug.qty >= getActualDealerVolume(dealers[j], drug) * timeDiff) {
                        cashEarned += $scope.actualDealerPrice(dealers[j], drug) * getActualDealerVolume(dealers[j], drug) * timeDiff;
                        drug.qty -= getActualDealerVolume(dealers[j], drug) * timeDiff;
                        dealers[j].cashEarned += $scope.actualDealerPrice(dealers[j], drug) * getActualDealerVolume(dealers[j], drug) * timeDiff;
                    }
                }
            }

            $scope.gameModel.cash += cashEarned;
            $scope.gameModel.totalCashEarned += cashEarned;

            lastUpdate = updateTime;
            if (updateTime - timeOneSecond >= 1000) {
                timeOneSecond = updateTime;
                $scope.cashPerSecond = $scope.gameModel.cash - cashOneSecond;
                cashOneSecond = $scope.gameModel.cash;

                for (i = 0; i < dealers.length; i++) {
                    dealers[i].cashPerSecond = dealers[i].cashEarned - dealers[i].cashOneSecondAgo;
                    dealers[i].cashOneSecondAgo = dealers[i].cashEarned;
                }
            }

            if (lastSaved < updateTime - 30000) {
				if (Math.random() > 0.96 && $scope.gameModel.totalCashEarned > 30000) {
					var dealerToArrest = $scope.gameModel.dealers[Math.floor(Math.random() * $scope.gameModel.dealers.length)];
					if (!dealerToArrest.arrested) {
						var bailValue = dealerToArrest.cashPerSecond * 95;
						dealerToArrest.arrested = true;
						dealerToArrest.bail = bailValue;
						dealerToArrest.arrestMessage = dealerToArrest.name + ' has caught coronavirus and is sick! The medical bills are ' + formatMoney(bailValue) + '.';
					}
				}
                if (Math.random() > 0.9 && !$scope.gameModel.buff) {
                    var buffDrug = $scope.gameModel.drugs[Math.floor(Math.random() * $scope.gameModel.drugs.length)];
   	                var percentage = 2 + (Math.random() * 3);
       	            var time = 60 + (Math.random() * 100);
           	        $scope.gameModel.buff = {
						drugname: buffDrug.name, 
						modifier: percentage, 
						expires: new Date().getTime() + (time * 1000), 
						msg: "One of your rivals has been boycotted in social media. The lack of competition is causing " + buffDrug.name + " to sell for " + (percentage * 100).toFixed() + "% of the normal price for the next {0} seconds!" };						
                }
                writeToCookie();
                lastSaved = updateTime;
                $scope.calculateAvailableUpgrades();
                
            }
        }

        $document.ready(function () {
			scrollMenu();
            readFromCookie();
			
			for (var i=0; i < $scope.prestigeDealers.length; i++) {
				for (var j=0; j < $scope.gameModel.dealers.length; j++) {
					if ($scope.prestigeDealers[i].seed == $scope.gameModel.dealers[j].seed) {
						$scope.prestigeDealers[i] = $scope.gameModel.dealers[j];
					}
				}
			}
			
            $scope.calculateAvailableUpgrades();
			$scope.updateDealerDrugIndex();
			prestigeDealerUpgrade.price = 5000000 * Math.pow(1.4, $scope.prestigeDealers.length);
            $interval(update, 200);
        });
		
		$scope.prestigeDealerConfirm = function() {
			if ($scope.gameModel.cash >= prestigeDealerUpgrade.price) {
				var prestigeDealer = new Dealer($scope.prestigeDealers.length + 1);
				prestigeDealer.name = $scope.prestigeDealerName;
				prestigeDealer.price = 1.5;
				prestigeDealer.originalPrice = 1.5;
				prestigeDealer.volume = 1.5;
				prestigeDealer.originalVolume = 1.5;
				prestigeDealer.type= 'Prestige';
				$scope.prestigeDealers.push(prestigeDealer);
				localStorage.removeItem('gameModel');
				localStorage.setItem("prestigeDealers", JSON.stringify($scope.prestigeDealers));
				window.location.reload();
			}
			$('#prestigeDealerModal').modal('hide');
		};
		
		$scope.prestigeDealerCancel = function(){
			$('#prestigeDealerModal').modal('hide');
		};

    }]);

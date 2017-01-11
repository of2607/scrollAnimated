


<!DOCTYPE HTML>
<html lang="zh-tw">

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0" /> 
		<link rel="stylesheet" href="css/basic.css"> 
		<link rel="stylesheet" href="common/scrollanimate/animate.css">
		<title>scrolling Animate</title>
	</head>

	<body>

		
		<style>
			.item {width:33.33334%;height:80vh;background:#efefef;border:1px solid #000;}
		</style>

		<div class="Bbox flex flex-between">
		<? for($i=1;$i<=70;$i++){?>
			<div class="item"><?=$i;?></div>
		<? } ?>
		</div>



		<script src="js/jquery-2.1.4.min.js"></script>		
		<script src="common/scrollanimate/animate.js"></script>
		<script>
			$(".item").each(function(index){
				$(this).scrollAnimate({delay:index/3*300});
			});

		</script>

		
	</body>
</html>
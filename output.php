	<div id="page-wrap">
		<h1>Form Results</h1>		
        <?php           
            $answer1 = $_POST['secure-form-answer'];        
            $totalCorrect = 0;           
            if ($answer1 == "Human") { $totalCorrect++; }            
            echo "<div id='results'>$totalCorrect /  1 correct</div>";           
        ?><br>
	<a href="./index.html">enter this website</a>
	</div>

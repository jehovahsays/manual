<body bgcolor="gray">

<p style="background-color:gray;color:white;">


<a href="./index.htm">
<div 
	   id="&#x70;&#x61;&#x67;&#x65;&#x2D;&#x77;&#x72;&#x61;&#x70;">		
	
<input type="button" onclick="alert('Click Ok to say you are human.')" value="Are you human?" required
		
	
		autocomplete="&#x6F;&#x66;" 
		action="./index.htm" 
		method="&#x70;&#x6F;&#x73;&#x74;" 
		id="&#x73;&#x65;&#x63;&#x75;&#x72;&#x65;&#x2D;&#x66;&#x6F;&#x72;&#x6D;" 
		required		               
                                      
                   
                        input 
						autocomplete="&#x6F;&#x66;" 
						type="radio" 
						name="secure-form-answer" 
						id="&#x73;&#x65;&#x63;&#x75;&#x72;&#x65;&#x2D;&#x66;&#x6F;&#x72;&#x6D;&#x2D;&#x61;&#x6E;&#x73;&#x77;&#x65;&#x72;&#x2D;&#x48;&#x75;&#x6D;&#x61;&#x6E;" 
						value="&#x48;&#x75;&#x6D;&#x61;&#x6E;" 
						required />
                            
    
	</form>
		</div>
	</button>
</a>
</br>
</br>
<?php
	// the following script will not work in this site for security reasons.
	// but it will work in your website or in your local development server (ex. WampServer)

	// check for https
	$protocol = !empty($_SERVER['HTTPS']) ? 'https://' : 'http://';
	// sets the full address
	$url = $protocol. $_SERVER['HTTP_HOST']. $_SERVER['REQUEST_URI'];
	echo $url;
?>
</br></br>
	<form action="/index.php?action=post" method="post">
       <input type="text" name="username" placeholder="C:\sql.log"\>	 
</form>
</br>
<iframe color="gray" width="300px" height="100px" src="./sql.log" frameborder="0">
</iframe>
</p>
	
</body>
</html>


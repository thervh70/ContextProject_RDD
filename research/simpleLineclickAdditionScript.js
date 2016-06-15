var blobLines = document.getElementsByClassName("blob-code");
for(var i = 0; i < blobLines.length; i++) { 
	blobLines[i].addEventListener("click", 
		(function (r) { 
			return function (e) { 
				console.log(r + " klicked") 
			} 
		})(i), false)
}
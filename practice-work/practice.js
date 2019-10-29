function crazyCaps(text) {
  text.toLowerCase();
  for(let i = 1; i < text.length(); i++) {
    text[i].toUpperCase();
  }
  return text;
}

function countdown(n) {
	if(n > 0) {
		console.log(n);
		setTimeout(countdown, 1000, (n - 1));
		//OR setTimeout(() => {countdown(n - 1)}, (n - 1));
	} else {
		console.log("Go!");
	}
}
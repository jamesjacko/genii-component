class Random{
  constructor(seed){
    if(typeof seed === "number")
      this.seed = seed;
    else
      this.seed = this.hashString(seed);
  }
  random() {
  	var x = Math.sin(this.seed++) * 10000;
  	return x - Math.floor(x);
  }
  hashString(seed) {
  	var hash = 0,
  		i, chr, len;
  	if (seed.length === 0) return hash;
  	for (i = 0, len = seed.length; i < len; i++) {
  		chr = seed.charCodeAt(i);
  		hash = ((hash << 5) - hash) + chr;
  		hash |= 0; // Convert to 32bit integer
  	}
  	return hash;
  };
}
export default Random;

$(document).ready(function() {
  var month = (new Date()).getMonth() + 1;
  if (month!=1 && month!=12) return;

	var $canvas = $('<canvas/>');
	var width = $('#img').width();
	$canvas.attr('width',width)
    .attr('height',300)
		.css({
			position:'absolute',
			top:0,
			left:0
		});
	$('#img').prepend($canvas);



	/* HTML5 Snow effect
	 *
	 * Written by Sonic1980 <Sonic1980 at gmail dot com>
	 * Last revision: 2009-07-14
	 *
	 */
	var w = width;
	var h = 300;
	var c = null; // canvas
	var b = null; // buffer
	var pi2 = Math.PI*2;

	var mp = 50; // maxparticles
	var p = new Array(mp); // particles

	function r(n) { return Math.round(n*Math.random()); }
	function fr(n) { return n*Math.random(); }
	function sn(a) { return Math.sin(a); }

	function setup() {
	  c = $canvas.get(0).getContext('2d');
	  for (var i=0; i<mp; i++) {
	    p[i]=new Array(fr(w),fr(h),1+fr(4));
	  }
	}

	var a = 0;
	function update() {
	  a+=0.01;
	  var s=sn(a);
	  for (var i=0; i<mp; i++) {
	    var pn=p[i];
	    var s2 = sn(4*a+i);
	    pn[1]+=pn[2]/2+(1+s2);
	    pn[0]+=6*(s+(s2/2))/(10/pn[2]);
	    if ((pn[1]>h+10)||(pn[0]>w+10)||(pn[0]<-10)) {
	      p[i]=(i%3>0)?(Array(fr(w),-10,pn[2])):((s>0)?(Array(-5,fr(h),pn[2])):(Array(w+5,fr(h),pn[2])));
	    }
	  }
	}

	function draw() {
	//  c.fillStyle = "#000";
	//  c.fillRect(0,0,w,h);
	  c.clearRect(0,0,w,h);
	  c.fillStyle = "rgba(255,255,255,0.8)";
	  c.strokeStyle="none";
	  c.beginPath();
	  for (var i=0; i<mp; i++) {
	    c.moveTo(p[i][0],p[i][1]);
	    c.arc(p[i][0],p[i][1],p[i][2],0,pi2,true);
	  }
	  c.fill();
	  update();
	}
	setup();
	setInterval(draw,30);

});
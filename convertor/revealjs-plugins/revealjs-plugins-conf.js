menu: {
	side: 'right',
	openSlideNumber: true,
	numbers: true,
},
keyboard: {
	    67: function() { RevealChalkboard.toggleNotesCanvas() },	// toggle notes canvas when 'c' is pressed
	    66: function() { RevealChalkboard.toggleChalkboard() },	// toggle chalkboard when 'b' is pressed
	    46: function() { RevealChalkboard.clear() },	// clear chalkboard when 'DEL' is pressed
	     8: function() { RevealChalkboard.reset() },	// reset chalkboard data on current slide when 'BACKSPACE' is pressed
		68: function() { RevealChalkboard.download() },	// downlad recorded chalkboard drawing when 'd' is pressed,
		70: function() { RevealChalkboard.colorNext() },	// cycle colors forward when 'f' is pressed
	    71: function() { RevealChalkboard.colorPrev() },	// cycle colors backward when 'g' is pressed

},
chalkboard: { 
	toggleChalkboardButton: { left: "60px", bottom: "30px", top: "auto", right: "auto" },
	toggleNotesButton: { left: "90px", bottom: "30px", top: "auto", right: "auto" },
	readOnly: false,
	theme: 'whiteboard'
}

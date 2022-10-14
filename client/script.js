$(document).ready(function() {
	let structure = {
		"team": undefined,
		"name": undefined
	}
	document.getElementById('play').onclick = function() {
		if (document.getElementById('0').selected == true) {
			alert('You have not chosen a team.')
		} else if (document.getElementById('input_username').value.length < 2) {
			alert('You have not entered a name.')
		} else {
			if (document.getElementById('1').selected == true) {
				structure.team = 'red'
			}
			if (document.getElementById('2').selected == true) {
				structure.team = 'blue'
			}
			structure.name = document.getElementById('input_username').value;
            document.getElementsByClassName('menu')[0].remove();
            document.getElementsByClassName('game')[0].style.visibility = 'visible';
            document.getElementsByClassName('header')[0].innerHTML = `You are team ${structure.team}`
			var socket = io();
			socket.emit('packet', 1, structure)
		}
        document.getElementsByClassName('click_button')[0].onclick = function() {
            socket.emit('packet', 2)
        }
        socket.on('scores', (data) => {
            document.getElementsByClassName('clicks_blue')[0].innerHTML = data.blue;
            document.getElementsByClassName('clicks_red')[0].innerHTML = data.red;
        })
	}
});
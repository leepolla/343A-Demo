/*jshint -W038 */
/*jshint -W098 */
/*jshint -W038 */


//Lee Polla
//CSE 154 AI
//2-10-16
//
//implemented a win feature
//Fifteen js manages a 15 puzzle game taking place on a html page
//solution involves no rows or columns
(function() {
      "use strict";

        window.onload = function() {
            document.getElementById("spawnbutton").onclick = spawn;
			document.getElementById("erasebutton").onclick = erase;
        };

                function erase() {
                document.getElementById("puzzlearea").innerHTML = "";
        }
		
			function spawn() {
				var box = document.createElement("div");
				var r = Math.floor(Math.random() * 256);
				var g = Math.floor(Math.random() * 256);
				var b = Math.floor(Math.random() * 256);
				
				var x = Math.floor(Math.random() * 500);
				var y = Math.floor(Math.random() * 500);
				document.getElementById("puzzlearea").appendChild(box);
				box.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
				
			}




        function selected() {
            this.classList.add("selected");
        }

        function unselect() {
            this.classList.remove("selected");
        }

       
})();
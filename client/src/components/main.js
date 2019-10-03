import * as view from './view.js';

export default function overall(){
	var main_canvas = document.getElementById('canvas');
	var context = main_canvas.getContext('2d');

	view.setup_canvas(main_canvas);
	var screen_width = main_canvas.width;
	var screen_height = main_canvas.height;


	console.log(main_canvas);
	console.log(screen_width);
	console.log(screen_height);

	//draw_hex(300, 300, context, 100, "#000000");
	//19.05 * radius = screen height
	view.draw_field_layout(screen_width/2, screen_height/2, screen_height/19.2, context, "#000000");
}
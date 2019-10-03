function setup_canvas(canvas){
	console.log('hi');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.8;
}

function coordinate(x, y){
	this.x = x;
	this.y = y;
}

function get_dimensions(canvas){
	return (canvas.width, canvas.height);
}

function draw_hex(center_coordinate, context, radius, colour){
	var x = center_coordinate.x;
	var y = center_coordinate.y;
	var angle = 1.0472; //value in radians of angle from x axis to top left corner (acute angle), this is 60 degrees in rad
	var bottom_left = new coordinate(x - (radius * Math.cos(angle)), y + (radius * Math.sin(angle)));
	var bottom_right = new coordinate(x + (radius * Math.cos(angle)), y + (radius * Math.sin(angle)));
	var mid_left = new coordinate(x - (radius), y);
	var mid_right = new coordinate(x + (radius), y);
	var top_left = new coordinate(x - (radius * Math.cos(angle)), y - (radius * Math.sin(angle)));
	var top_right = new coordinate(x + (radius * Math.cos(angle)), y - (radius * Math.sin(angle)));
	
	
	draw_line(top_left, top_right, context, colour);
	draw_line(top_right, mid_right, context, colour);
	draw_line(mid_right, bottom_right, context, colour);
	draw_line(bottom_right, bottom_left, context, colour);
	draw_line(bottom_left, mid_left, context, colour);
	draw_line(mid_left, top_left, context, colour);
	console.log("done");
}

function draw_line(coordinate1, coordinate2, context, colour){
	context.beginPath();
	context.moveTo(coordinate1.x, coordinate1.y);
	context.lineTo(coordinate2.x, coordinate2.y);
	context.strokeStyle = colour;
	context.lineWidth = 2;
	context.stroke();
}

function draw_field_layout(world_center_x, world_center_y, radius, context, colour){
	var angle = 1.0472; //60 degrees in radians, perfect hexagon angle
	var max_vertical_radius =5; //in units of hexes
	var max_horizontal_radius = 6;
	var hex_height = radius * 2 * Math.sin(angle);
	var hex_edge_length = radius * 2 * Math.cos(angle);
	var horizontal_shift = hex_edge_length/2 + radius;
	var offset;
	
	for(offset = 0; offset < max_horizontal_radius; offset += 2){
		draw_hex_column_odd(world_center_x + (horizontal_shift * offset), world_center_y, max_vertical_radius - offset/2, hex_height, colour, radius, context);
		draw_hex_column_odd(world_center_x - (horizontal_shift * offset), world_center_y, max_vertical_radius - offset/2, hex_height, colour, radius, context);
		draw_hex_column_even(world_center_x + horizontal_shift * (offset+1), world_center_y, max_vertical_radius - offset/2, hex_height, colour, radius, context);
		draw_hex_column_even(world_center_x - horizontal_shift * (offset+1), world_center_y, max_vertical_radius - offset/2, hex_height, colour, radius, context);
	}
}

function draw_hex_column_odd(world_center_x, world_center_y, column_height, hex_height, colour, radius, context){
	var vertical_hex_num;
	for (vertical_hex_num = column_height; vertical_hex_num >= -column_height ; vertical_hex_num --){
		var hex_center = new coordinate(world_center_x, world_center_y - (vertical_hex_num*hex_height));
		draw_hex(hex_center, context, radius, colour);
	}
}

function draw_hex_column_even(world_center_x, world_center_y, column_height, hex_height, colour, radius, context){
	var vertical_hex_num;
	for (vertical_hex_num = column_height; vertical_hex_num > -column_height ; vertical_hex_num --){
		var hex_center = new coordinate(world_center_x, world_center_y - (vertical_hex_num*hex_height) + (hex_height/2));
		draw_hex(hex_center, context, radius, colour);
	}
}


export {draw_field_layout, get_dimensions, setup_canvas};
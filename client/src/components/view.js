class field_drawer{
	constructor(context, canvas){
		this.context = context;
		this.canvas = canvas;
		this.angle = 1.0472;//value in radians of angle from x axis to top left corner (acute angle), this is 60 degrees in rad
		
		this.radius = 0; //ideally screen_height/19.2
		this.max_vertical_radius =0; //in units of hexes
		this.max_horizontal_radius = 0;
		this.hex_height = 0;
		this.hex_edge_length = 0;
		this.horizontal_shift = 0;
		this.world_center_x = 0;
		this.world_center_y = 0
	}
	
	draw_line(coordinate1, coordinate2, colour){
		this.context.beginPath();
		this.context.moveTo(coordinate1.x, coordinate1.y);
		this.context.lineTo(coordinate2.x, coordinate2.y);
		this.context.strokeStyle = colour;
		this.context.lineWidth = 2;
		this.context.stroke();
	}
	
	draw_hex(center_coordinate, colour){
		var x = center_coordinate.x;
		var y = center_coordinate.y;
		
		var bottom_left = new coordinate(x - (this.radius * Math.cos(this.angle)), y + (this.radius * Math.sin(this.angle)));
		var bottom_right = new coordinate(x + (this.radius * Math.cos(this.angle)), y + (this.radius * Math.sin(this.angle)));
		var mid_left = new coordinate(x - (this.radius), y);
		var mid_right = new coordinate(x + (this.radius), y);
		var top_left = new coordinate(x - (this.radius * Math.cos(this.angle)), y - (this.radius * Math.sin(this.angle)));
		var top_right = new coordinate(x + (this.radius * Math.cos(this.angle)), y - (this.radius * Math.sin(this.angle)));
		
		
		this.draw_line(top_left, top_right, colour);
		this.draw_line(top_right, mid_right, colour);
		this.draw_line(mid_right, bottom_right, colour);
		this.draw_line(bottom_right, bottom_left, colour);
		this.draw_line(bottom_left, mid_left, colour);
		this.draw_line(mid_left, top_left, colour);
	}
	
	recalculate(){
		this.max_vertical_radius =5; //in units of hexes
		this.max_horizontal_radius = 6;
		this.hex_height = this.radius * 2 * Math.sin(this.angle);
		this.hex_edge_length = this.radius * 2 * Math.cos(this.angle);
		this.horizontal_shift = this.hex_edge_length/2 + this.radius;
		
		var dim = get_dimensions(this.canvas);
		this.world_center_x = dim.x/2;
		this.world_center_y = dim.y/2;
	}

	draw_field_layout(colour){
		this.recalculate();
		var offset;
		
		for(offset = 0; offset < this.max_horizontal_radius; offset += 2){
			this.draw_hex_column_odd(this.world_center_x + (this.horizontal_shift * offset), this.world_center_y, this.max_vertical_radius - offset/2, colour);
			this.draw_hex_column_odd(this.world_center_x - (this.horizontal_shift * offset), this.world_center_y, this.max_vertical_radius - offset/2, colour);
			this.draw_hex_column_even(this.world_center_x + this.horizontal_shift * (offset+1), this.world_center_y, this.max_vertical_radius - offset/2, colour);
			this.draw_hex_column_even(this.world_center_x - this.horizontal_shift * (offset+1), this.world_center_y, this.max_vertical_radius - offset/2, colour);
		}
	}
	
	set_radius(radius){
		this.radius = radius;
	}

	draw_hex_column_odd(center_x, center_y, column_height, colour){
		var vertical_hex_num;
		for (vertical_hex_num = column_height; vertical_hex_num >= -column_height ; vertical_hex_num --){
			var hex_center = new coordinate(center_x, center_y - (vertical_hex_num*this.hex_height));
			//////////////////////////////////////////
			console.log("the x possition is");
			console.log(Math.round((center_x - this.world_center_x)/this.horizontal_shift));
			console.log("the y possition is");
			console.log(vertical_hex_num);
			//////////////////////////////////////////
			this.draw_hex(hex_center, colour);
		}
		console.log("done this one");
	}

	draw_hex_column_even(center_x, center_y, column_height, colour){
		var vertical_hex_num;
		for (vertical_hex_num = column_height; vertical_hex_num > -column_height ; vertical_hex_num --){
			var hex_center = new coordinate(center_x, center_y - (vertical_hex_num*this.hex_height) + (this.hex_height/2));
			//////////////////////////////////////////
			console.log("the x possition is");
			console.log(Math.round((center_x - this.world_center_x)/this.horizontal_shift));
			console.log("the y possition is");
			console.log(vertical_hex_num);
			//////////////////////////////////////////
			this.draw_hex(hex_center, colour);
		}
		console.log("done this one");
	}
}

class unit_drawer{
	constructor(context){
		this.context = context;
	}
}

function setup_canvas(canvas){
	console.log('hi');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.8;
}

class coordinate{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}

function get_dimensions(canvas){
	var dimensions = new coordinate(canvas.width, canvas.height);
	return (dimensions);
}



export {field_drawer, get_dimensions, setup_canvas};
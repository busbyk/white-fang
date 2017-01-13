var UI      = UI        || {}

//////////////////////////////////////////////////////////////////////////////////
//              Constructor                                                     //
//////////////////////////////////////////////////////////////////////////////////

/**
 * create a plane on which we map 2d text
 */
UI.OverlaySprite        = function(){
        var width = 1200
        var height = 1000

	var canvas	= document.createElement( 'canvas' )
	canvas.width	= width
	canvas.height	= height
        this.canvas	= canvas

	//Store width and height
	this.textureWidth = width;
	this.textureHeight = height;


	var context	= canvas.getContext( '2d' )
	this.context	= context

	var texture	= new THREE.Texture(canvas)
	this.texture = texture

        // Create the object
        var material = new THREE.SpriteMaterial({
                transparent: true,
                map     : texture
        });
        THREE.Sprite.call( this, material )

        this.scale.set(3,2,2)
}

UI.OverlaySprite.prototype = Object.create( THREE.Sprite.prototype );

/**
 * Draw the cartouche
 * @param  {Object} params [description]
 */
UI.OverlaySprite.prototype.draw = function(params){
	var context	= this.context
	var canvas	= this.canvas
  var texture     = this.texture
  this.avatarState = params.state;

	context.save()

        // clear texture
	context.clearRect(0,0,this.canvas.width, this.canvas.height)

        // Draw white background
	// var cornerRadius = 10;
	// context.fillStyle = 'rgba(255,255,255,0.5)';
	// context.fillRect(0+(cornerRadius/2), 0+(cornerRadius/2), canvas.width-cornerRadius, canvas.height-cornerRadius);

  //       // Draw background outlining
	// context.lineJoin = 'round';
	// context.lineWidth = cornerRadius;
	// context.strokeStyle = '#1054B5';
	// context.strokeRect(0+(cornerRadius/2), 0+(cornerRadius/2), canvas.width-cornerRadius, canvas.height-cornerRadius);

  // Write description
  var desc = params.task.description;
  var strings = [];
  var line = "";
  for(var i=0; i<desc.length; i++) {
    line += desc[i];

    if(line.length == 26) {
      strings.push(line);
      line = "";
    } else if(i == desc.length - 1) {
      strings.push(line);
    }
  }

  for(var i=0; i<strings.length; i++) {
    writeText(strings[i],20,(i + 1) * 80,80,'normal');
  }

  // // Draw white background
  // var cornerRadius = 10;
  // context.fillStyle = 'rgba(255,255,255,0.5)';
  // // context.fillRect(0+(cornerRadius/2), 0+(cornerRadius/2), canvas.width-cornerRadius * .4, canvas.height-cornerRadius * .4);
  // context.fillRect(0, 0, canvas.width, strings.length * 60);

	// Draw avatar
	var avatarObject = new Image();
	avatarObject.width = canvas.width;
	avatarObject.height = canvas.height;
	avatarObject.style.width = canvas.width + 'px';
	avatarObject.style.height = canvas.height + 'px';
	avatarObject.onload = function() {
		context.drawImage(avatarObject, 0, strings.length * 80 + 50, canvas.width * .8, canvas.height * .5);
        	// make the texture as .needsUpdate
        	texture.needsUpdate	= true;
	};
	avatarObject.src = params.img;
	avatarObject.crossOrigin = 'Anonymous';

	// // draw avatar outlining
	// context.rect(10,10,200,200);
	// context.lineWidth = 20;
	// context.strokeStyle = '#1054B5';
	// context.stroke();


  //

	// writeText(params.task.description,0,100,50,'normal');
	// // write Last Name
	// writeText(params.lastName,250,110,45,'bold');


	// Write role label
	// writeText(params.role,270,215,50,'normal');
  //
	// // Draw role icon
	// var iconObject = new Image();
	// iconObject.width = 50;
	// iconObject.height = 50;
	// iconObject.style.width = 50+'px';
	// iconObject.style.height = 50+'px';
	// iconObject.onload = function() {
	// 	context.drawImage(iconObject, 220, 170, 50, 50);
  //
  //       	// make the texture as .needsUpdate
  //       	texture.needsUpdate	= true;
	// }
	// if(params.role.toLowerCase() === 'developer'){
	// 	iconObject.src = '/examples/contact-sharing-in-ar/role-icons/developer.png';
	// }else if(params.role.toLowerCase() === 'designer'){
	// 	iconObject.src = '/examples/contact-sharing-in-ar/role-icons/designer.png';
	// }else if(params.role.toLowerCase() === 'industry'){
	// 	iconObject.src = '/examples/contact-sharing-in-ar/role-icons/industry.png';
	// }else{
	// 	iconObject.src = '/examples/contact-sharing-in-ar/role-icons/other.png';
	// }



        // retore context
	context.restore()

	// make the texture as .needsUpdate
	texture.needsUpdate	= true;

        return

	function writeText(text, positionX, positionY,size,weight){
		context.font = weight+' '+size+'px Arial';

    // context.font = weight +' '+ (size + 2) +'px Arial';

    context.fillStyle	= '#000';
		context.fillText(text, positionX+4, positionY-4);
		context.fillText(text, positionX-4, positionY+4);
		context.fillText(text, positionX-4, positionY-4);
		context.fillText(text, positionX+4, positionY+4);


    context.fillStyle	= '#1054B5';
		context.fillText(text, positionX, positionY);
	}
}

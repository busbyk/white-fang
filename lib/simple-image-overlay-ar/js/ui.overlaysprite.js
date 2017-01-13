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

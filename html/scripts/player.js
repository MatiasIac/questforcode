var player = {
	id: "player",
	visible: true,
	currentDraw: null,
	x: 400, callOutTimer: {}, showCallout: false,
	
	init: function () {
		jsGFwk.Sprites.charRight.reset();
		jsGFwk.Sprites.charLeft.reset();
		jsGFwk.Sprites.charRight.next();
		this.currentDraw = jsGFwk.Sprites.charRight.sprite.image;
		
		var self = this;
		this.callOutTimer = new jsGFwk.Timer({
			action: function () {
				self.showCallout = !self.showCallout;
			}, tickTime: 10
		});
	},
	update: function (delta) {
		this.callOutTimer.tick(delta);
	
		if (jsGFwk.IO.keyboard._activeKey[68]) {
			jsGFwk.Sprites.charRight.next();
			this.currentDraw = jsGFwk.Sprites.charRight.sprite.image;
			this.x++;
		}
		
		if (jsGFwk.IO.keyboard._activeKey[65]) {
			jsGFwk.Sprites.charLeft.next();
			this.currentDraw = jsGFwk.Sprites.charLeft.sprite.image;
			this.x--;
		}
		
		if (this.x < 15) {
			this.x = 15;
		}
		
		if (this.x > 578 && this.x < 610 && 
			!this.key && !this.llave &&
			!this.abrir && !player.open &&
			this.visible) {
			this.x = 578;
		}
	},
	draw: function (context) {
		context.save();
			context.drawImage(this.currentDraw, this.x, 110);
			
			if (this.showCallout) {
				if (this.drunk || this.borracho ||
					player.drink || player.tomar) {
					context.drawImage(jsGFwk.Sprites.calloutEnd.image, this.x + 10, 45);
				} else {
					context.drawImage(jsGFwk.Sprites.callout.image, this.x + 10, 45);
				}
			}

		context.restore();
	}
};
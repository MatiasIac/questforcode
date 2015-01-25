var environment = {
	id: "environment",
	visible: true, transparent: 0,
	gameOverTimer: {}, noOverTimer: {},
	init: function () {
		var self = this;
		this.gameOverTimer = new jsGFwk.Timer({
			action: function () {
				if (self.transparent < 1) {
					self.transparent += 0.1;
				}
			}, tickTime: 0.1
		});
		
		this.noOverTimer = new jsGFwk.Timer({
			action: function () {
				if (self.transparent > 0) {
					self.transparent -= 0.1;
				}
			}, tickTime: 0.1
		});
	},
	update: function (delta) {
		if (player.drunk || player.borracho ||
			player.drink || player.tomar) {
			this.gameOverTimer.tick(delta);
		} else {
			this.noOverTimer.tick(delta);
		}
	
	},
	draw: function (context) {
		context.save();
			context.drawImage(jsGFwk.Sprites.platform.image, 10, 80);
			context.drawImage(jsGFwk.Sprites.holder.image, 10, 200);
			
			if (player.key || player.llave) {
				context.drawImage(jsGFwk.Sprites.key.image, 15, 203);
			}
			
			if (player.key || player.llave || player.abrir || player.open) {
				context.drawImage(jsGFwk.Sprites.door.spriteBag[0].image, 600, 83);
			} else {
				context.drawImage(jsGFwk.Sprites.door.spriteBag[1].image, 600, 83);
			}
			
			if (!player.drunk && !player.borracho &&
				!player.drink && !player.tomar) {
				context.drawImage(jsGFwk.Sprites.potion.image, 650, 110);
			}
			
			context.fillStyle = "rgba(255,255,255," + this.transparent + ")";
			context.fillRect(0, 0, 800, 300);
		context.restore();
	}
};
class Player {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;

        this.dy = 0;
        this.originalHight = h;
        this.jumpForce = 15;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

    Animate() {
        //jump
        if (keys['KeyW']) {
            this.Jump();
        } else {
            this.jumpTimer = 0;
        }

        if (isMobile) {
            window.addEventListener('touchstart', function () {
                isTouch = true;
            })
            window.addEventListener('touchend', function () {
                isTouch = false;
            })
            if (isTouch) {
                this.Jump();
            } else {
                this.jumpTimer = 0;
            }
        }

        //squat
        if (keys['KeyS'] && this.grounded) {
            this.h = this.originalHight / 2;
            this.y = canvas.height - this.h;
        } else {
            this.h = this.originalHight
        }

        this.y += this.dy

        //gravity
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        this.Draw();
    }

    Jump() {
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        }
        else if (this.jumpTimer > 0 && this.jumpTimer < 8) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50);
        }
    }
}

class Obstacle {
    constructor(x, y, w, h, c, t, b) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.t = t; //type
        this.b = b; //buff

        this.dx = -gameSpeed; //direction x
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

    Update() {
        this.x += this.dx;
        this.Draw();
    }
}

class Text {
    constructor(t, x, y, c, a, s) {
        this.t = t;
        this.x = x;
        this.y = y;
        this.c = c;
        this.a = a;
        this.s = s;
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.font = this.s + "px sans-serif";
        ctx.textAlign = this.a;
        ctx.fillText(this.t, this.x, this.y);
        ctx.closePath();
    }
}
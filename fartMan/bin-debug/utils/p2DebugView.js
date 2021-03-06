var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//////////////////////////////////////////////////////////////////////////////////////
//
//这是物理引擎调试库，仅供调试用
//
//////////////////////////////////////////////////////////////////////////////////////
var p2DebugDraw = (function () {
    function p2DebugDraw(world) {
        this.COLOR_D_SLEEP = 0x999999;
        this.COLOR_D_WAKE = 0xe5b2b2;
        this.COLOR_K = 0x7f7fe5;
        this.COLOR_S = 0x7fe57f;
        this.world = world;
    }
    p2DebugDraw.prototype.setSprite = function (sprite) {
        this.sprite = sprite;
    };
    p2DebugDraw.prototype.drawDebug = function () {
        this.sprite.graphics.clear();
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var body = this.world.bodies[i];
            for (var j = 0; j < body.shapes.length; j++) {
                var shape = body.shapes[j];
                if (shape instanceof p2.Convex) {
                    this.drawConvex(shape, body);
                }
                else if (shape instanceof p2.Circle) {
                    this.drawCircle(shape, body);
                }
                else if (shape instanceof p2.Line) {
                    this.drawLine(shape, body);
                }
                else if (shape instanceof p2.Particle) {
                    this.drawParticle(shape, body);
                }
                else if (shape instanceof p2.Plane) {
                    this.drawPlane(shape, body);
                }
                else if (shape instanceof p2.Capsule) {
                    this.drawCapsule(shape, body);
                }
            }
        }
    };
    p2DebugDraw.prototype.drawCircle = function (shape, b) {
        var color = this.getColor(b);
        var g = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(b.position[0], b.position[1], shape.radius);
        var edge = new Array();
        b.toWorldFrame(edge, [shape.radius, 0]);
        g.moveTo(b.position[0], b.position[1]);
        g.lineTo(edge[0], edge[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawCapsule = function (shape, b) {
        var color = this.getColor(b);
        var len = shape.length;
        var radius = shape.radius;
        var p1 = new Array(), p2 = new Array(), p3 = new Array(), p4 = new Array();
        var a1 = new Array(), a2 = new Array();
        b.toWorldFrame(p1, [-len / 2, -radius]);
        b.toWorldFrame(p2, [len / 2, -radius]);
        b.toWorldFrame(p3, [len / 2, radius]);
        b.toWorldFrame(p4, [-len / 2, radius]);
        b.toWorldFrame(a1, [len / 2, 0]);
        b.toWorldFrame(a2, [-len / 2, 0]);
        var g = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(a1[0], a1[1], radius);
        g.endFill();
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(a2[0], a2[1], radius);
        g.endFill();
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.moveTo(p1[0], p1[1]);
        g.lineTo(p2[0], p2[1]);
        g.lineTo(p3[0], p3[1]);
        g.lineTo(p4[0], p4[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawLine = function (shape, b) {
        var color = this.getColor(b);
        var len = shape.length;
        var p1 = new Array(), p2 = new Array();
        b.toWorldFrame(p1, [-len / 2, 0]);
        b.toWorldFrame(p2, [len / 2, 0]);
        var g = this.sprite.graphics;
        g.lineStyle(1, color);
        g.moveTo(p1[0], p1[1]);
        g.lineTo(p2[0], p2[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.drawParticle = function (shape, b) {
        var color = this.getColor(b);
        var g = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(b.position[0], b.position[1], 1);
        g.endFill();
        g.lineStyle(1, color);
        g.drawCircle(b.position[0], b.position[1], 5);
        g.endFill();
    };
    p2DebugDraw.prototype.drawConvex = function (shape, b) {
        // var color: number = this.getColor(b);
        // var l: number = shape.vertices.length;
        // var g: egret.Graphics = this.sprite.graphics;
        // g.lineStyle(1, color);
        // g.beginFill(color, 0.5);
        // var worldPoint: number[] = new Array();
        // b.toWorldFrame(worldPoint, shape.vertices[0]);
        // // g.moveTo(worldPoint[0], worldPoint[1]);
        // g.moveTo(b.position[0], b.position[1]);
        // g.lineTo(worldPoint[0], worldPoint[1]);
        // for (var i: number = 1; i <= l; i++) {
        //     b.toWorldFrame(worldPoint, shape.vertices[i % l]);
        //     g.lineTo(worldPoint[0], worldPoint[1]);
        // }
        // g.endFill();
    };
    p2DebugDraw.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    p2DebugDraw.prototype.drawPlane = function (shape, b) {
        console.log(shape, b);
        var color = this.COLOR_D_SLEEP;
        var g = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 1);
        var start = new Array();
        var end = new Array();
        b.toWorldFrame(start, [-1200, 0]);
        g.moveTo(start[0], start[1]);
        b.toWorldFrame(end, [1200, 0]);
        g.lineTo(end[0], end[1]);
        b.toWorldFrame(end, [1200, -1200]);
        g.lineTo(end[0], end[1]);
        b.toWorldFrame(end, [-1200, -1200]);
        g.lineTo(end[0], end[1]);
        b.toWorldFrame(end, [-1200, -0]);
        g.lineTo(end[0], end[1]);
        g.endFill();
    };
    p2DebugDraw.prototype.getColor = function (b) {
        var color = this.COLOR_D_SLEEP;
        if (b.type == p2.Body.KINEMATIC) {
            color = this.COLOR_K;
        }
        else if (b.type == p2.Body.STATIC) {
            color = this.COLOR_S;
        }
        else if (b.sleepState == p2.Body.AWAKE) {
            color = this.COLOR_D_WAKE;
        }
        return color;
    };
    return p2DebugDraw;
}());
__reflect(p2DebugDraw.prototype, "p2DebugDraw");

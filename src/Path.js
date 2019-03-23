import React from 'react';
import Point from './Point';
import Gene from './Gene';

class Path{
  static AdjustMode = {
    "RANDOM": 1,
    "EQUAL": 2
  }

	static centerPoint(a, b){
		return new Point(
			(b.x - a.x) / 2 + a.x,
			(b.y - a.y) / 2 + a.y
		)
	}

  constructor(prefs){
    this.num = prefs.dataLength;
    this.size = prefs.size;
    this.random = prefs.random;
		this.padding = prefs.size.padding;
		this.data = prefs.data;
		this.groups = this.data.reduce(function (acc, curr) {
		  if (typeof acc[curr.group] == 'undefined') {
		    acc[curr.group] = 1;
		  } else {
		    acc[curr.group] += 1;
		  }

		  return acc;
		}, {});
		let max = Math.max(...Object.values(this.groups));
		let total = Object.values(this.groups).length;
		this.groups.max = max;
		this.groups.total = total;
		this.gene = prefs.gene;
		if(this.gene.path_mode === Gene.path_mode.RING){
			this.path = this.generateRingPath();
		} else if (this.gene.path_mode === Gene.path_mode.CUBE_SPIRAL){
			this.path = this.generateCubeSpiralPath();
		} else {
			this.path = this.generateLinePath(this.gene.path_mode === Gene.path_mode.INLINE_HALF);
		}

  }


	generateCubeSpiralPath(){
		let longestSide = Math.ceil(Math.sqrt(this.data.length + 1));
		let smallestSize = Math.min(this.size.width, this.size.height);
		let segSize = (smallestSize - this.padding * 2) / (longestSide + 2);
		let p1, p2, a, b, path = [], curCount = 1, curCounter = 1, steps = 2, mult = 1;
		for (var i = 0; i < this.data.length; i++) {
			if(i === 0){
				p1 = new Point(this.size.width / 2, this.size.height/ 2 );
				p2 = new Point(this.size.width / 2, this.size.height/ 2 );
			} else {

				if(steps === 1){
					a = (path[i-1].b.x + segSize * mult)
					b = path[i-1].b.y;
					if(curCounter < curCount){
						curCounter++;
					} else {
						curCounter = 1;
						steps++;
					}
				} else {
					a = path[i-1].b.x;
					b = (path[i-1].b.y + segSize * mult);
					if(curCounter < curCount){
						curCounter ++;
					} else {
						steps = 1;
						curCount++;
						mult*=-1;
						curCounter = 1;
					}
				}

				p1 = path[i-1].b;
				p2 = new Point(a, b);

			}
			path.push({a: p1, b: p2, dist: Point.distance(p1, p2)});
		}

		return path;
	}

	generateRingPath(){
		let smallestSize = Math.min(this.size.width, this.size.height);
		let radius = (smallestSize - this.padding * 6) / 2;
		let center = smallestSize / 2;
		let angle = (360 / this.num) * (Math.PI / 180);
		let total = this.getMean(this.data).total;
		let path = [];
		let centerMarginx = this.size.width / 2;
		let centerMarginy = this.size.height / 2;
		let p1, p2, dist;
		for (var i = 0; i < this.num; i++) {
			if(this.gene.path_points === Gene.path_points.EVEN){
				p1 = new Point(
					(Math.cos(angle * i) * radius) + centerMarginx,
					(Math.sin(angle * i) * radius) + centerMarginy
				);
				p2 = new Point(
					(Math.cos(angle * (i + 1)) * radius) + centerMarginx,
					(Math.sin(angle * (i + 1)) * radius) + centerMarginy
				);

			} else {
				if(i === 0){
					p1 = new Point(
						(Math.cos(angle * i) * radius) + centerMarginx,
						(Math.sin(angle * i) * radius) + centerMarginy
					);
				}
				else {
					p1 = path[i-1].b;
				}
				let portion = (360 * (this.data[i].value / total)) * (Math.PI / 180);
				let addition = Math.atan2(p1.y - center, p1.x - center)

				angle = addition + portion;

				p2 = new Point(
					(Math.cos(angle) * radius) + centerMarginx,
					(Math.sin(angle) * radius) + centerMarginy
				);
			}

			dist = Point.distance(p1, p2);
			path.push({a: p1, b: p2, dist: dist})
		}
		return path;
	}

	generateLinePath(half){
		let path = this.generatePath(half);
		if(this.gene.path_mode !== Gene.path_mode.INLINE && this.gene.path_mode !== Gene.path_mode.INLINE_HALF){
			path = this.adjustPath({
				path: path,
				mode: this.gene.path_mode,
				data: this.data
			});
		}
		if(this.gene.path_rotation !== Gene.path_rotation.NONE){
			path = this.rotatePath(path);
		}
		return path;
	}

	/**
	 * Use a and b instead of x and y as the dimensions may be flipped
	*/
  generatePath(half){
		let smallestSize = Math.min(this.size.width, this.size.height);
    let mult = (half)? 0.5 : 1;
    let returner = [], b, aVal;
		if(this.gene.path_grouping === Gene.path_grouping.DATA_GROUP){
			b = (this.size.height - this.padding * this.groups.total) / this.groups.total;
			aVal = (this.size.width * mult - this.padding * 2) / this.groups.max;
		} else {
	    b = (this.size.height - this.padding * 2) / 2 + this.padding;
			aVal = (this.size.width * mult - this.padding * (2 * mult)) / this.num;
		}

		let total = this.getMean(this.data).total, p1, p2;
		let count = 0, group = 0, xVal;
    for(var i = 0; i < this.num; i++, count++){
			let bMult = (this.gene.path_grouping === Gene.path_grouping.DATA_GROUP)? this.data[i].group + 1: 1;
			if(this.gene.path_points === Gene.path_points.VALUE_DEPENDANT)
				aVal = (this.size.width * mult  - this.padding * 2) * (this.data[i].value / total);
			if(i === 0)
				p1 = new Point(i * aVal + this.padding + ((half)? (this.size.width - this.padding * 2) * 0.5: 0), b * bMult);
			else{
				if(count >= this.groups[group] && this.gene.path_grouping === Gene.path_grouping.DATA_GROUP){
					xVal = this.padding;
					group++;
					count = 0;
				} else {
					xVal = returner[i-1].b.x;
				}
				p1 = new Point(xVal, b * bMult)
			}

			p2 = new Point(p1.x + aVal, b * bMult);
      const dist = Point.distance(p1, p2);
      returner.push({a: p1, b: p2, dist: dist});
    }
    return returner;
  }

	adjustPath(prefs){
		const adjustment = 10;
		const mean = this.getMean(prefs.data).mean;
		for (var i = 0; i < prefs.path.length; i++) {
			if(i===0){
				if(!prefs.mode){
					prefs.path[i].a.y += this.random.random() * this.size.height / adjustment - this.areaSize / (adjustment * 2);
				}
			} else{
				prefs.path[i].a.y = prefs.path[i-1].b.y;
			}
			if(prefs.mode === Gene.path_mode.MEAN_DEVIATION){
				var adj = this.size.height / (adjustment * 2);
				var meanDeviation = Math.abs(prefs.data[i].value - mean);
				adj = prefs.data[i].value < mean ? adj : -adj;
				const sel = (i > 0)? i - 1 : i;
				prefs.path[i].b.y = prefs.path[sel].b.y + (adj * meanDeviation);
			} else {
				prefs.path[i].b.y = this.random.random() * this.size.height;
				prefs.path[i].b.x = this.random.random() * this.size.width;
			}
			prefs.path[i].dist = Point.distance(prefs.path[i].a, prefs.path[i].b);
		}
		return prefs.path;
	}

  adjustPoint(p){
    switch (this.path_mode) {
      case Gene.path_mode.RANDOM:
        p.x += this.random.random() * this.size.width;
        p.y += this.random.random() * this.size.height;
        console.log(p);
        break;
      case 2:
        p.y = p.x;
        break;
      default:
    }
    return p;
  }

	rotatePath(path){
		let center = new Point(this.areaSize / 2, this.areaSize / 2);
		let rotation = 0;
		if(this.gene.path_rotation === Gene.path_rotation.MEAN_DEPENDANT){
			let mean = 0;
			for (var i = 0; i < this.data.length; i++) {
				mean += this.data[i].value;
			}
			mean /= this.data.length;
			rotation = 360 * (mean);
		} else {
			rotation = 360 * (this.random.random());
		}
		for (i = 0; i < path.length; i++) {
			path[i] = this.rotateSegment(path[i], center, rotation);
		}
		return path;
	}

	rotateSegment(seg, center, angle){
		seg.a = this.rotatePoint(seg.a, center, angle);
		seg.b = this.rotatePoint(seg.b, center, angle);
		seg.dist = Point.distance(seg.a, seg.b);
		return seg;
	}

	rotatePoint(point, center, angle){
		let radians = (Math.PI / 180) * angle,
				cos = Math.cos(radians),
				sin = Math.sin(radians);
		return new Point(
			(
				(cos * (point.x - center.x)) +
				(sin * (point.y - center.y)) +
				center.x
			),
			(
				(cos * (point.y - center.y)) +
				(sin * (point.x - center.x)) +
				center.y
			)
		);
	}

	getMean(data){
		const total = data.reduce((a, c) => a + c.value, 0);
		const mean = total / data.length;
		return {
			mean: mean,
			total: total
		};
	}

	static getAngle(p1, p2){
		return Math.atan2(p2.y - p1.y, p2.x - p1.x);
	}

	static orthogonalCenterPoint(p1, p2, dist){
		var center = new Point(
			(p2.x - p1.x) / 2 + p1.x,
			(p2.y - p1.y) / 2 + p1.y
		)
		var angle = this.getAngle(p1, p2);

		return new Point(
			Math.sin(angle) * dist + center.x,
			-Math.cos(angle) * dist + center.y
		)
	}
	static renderDebugInfo(pointA, pointB, debug){
		if(debug === Gene.debugging.ON){
			return(
				<g id="debug">
					<circle r='3' cx={ pointA.x } cy={ pointA.y } fill="black" />
					<circle r='3' cx={ pointB.x } cy={ pointB.y } fill="black" />
					<line x1={ pointA.x } y1={ pointA.y } x2={ pointB.x } y2={ pointB.y }
						stroke="black" strokeWidth="1" strokeDasharray="4" />
				</g>
			)
		} else {
			return;
		}
	}

}

export default Path;

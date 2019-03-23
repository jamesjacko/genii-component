class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  static distance(a, b){
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }
}

export const getAngle = (screenPoint, center) => {
    let dx = screenPoint.x - center.x;
    // Minus to correct for coord re-mapping
    let dy = -(screenPoint.y - center.y);

    let inRads = Math.atan2(dy, dx);

    // We need to map to coord system when 0 degree is at 3 O'clock, 270 at 12 O'clock
    if (inRads < 0)
        inRads = Math.abs(inRads);
    else
        inRads = 2 * Math.PI - inRads;

    return inRads * (180 / Math.PI) - 90;
}


export default Point;
